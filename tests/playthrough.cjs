// A bot plays whole runs of the game (index.html) at speed and reports each town: how long it took, whether winter
// came first, how often the tunnel ran out, how many ants were lost. For tuning; not part of `npm test`.
// Usage: node tests/playthrough.cjs [runs=3]
const { open, sleep } = require('./_page.cjs');
const RUNS = +process.argv[2] || 3;
const BOT = `
  // (Time runs on the bot's clock: the frame is driven by hand, timers by the game's own clock.)
  window.requestAnimationFrame = () => 0;
  const q = []; window.setTimeout = (fn, ms) => { q.push({ at: clock + (ms || 0) / 1000, fn }); return q.length; };
  let fake = performance.now(); last = fake;
  const B = window.B = { target: null, tries: 0, lastDraw: -99, skip: new Set(), towns: [], cur: null, runouts: 0 };
  const said = caption; caption = (text, ...r) => { if (/Out of tunnel/.test(text)) B.runouts++; return said(text, ...r); };
  const newTown = () => { B.cur = { n: townN, kind: ['hamlet', 'village', 'market', 'mill', 'city'][Math.min(4, stageN)], start: clock, falls: [], lost0: stats.lost, runouts0: B.runouts, houses: towers.length, goal: goal.n }; B.target = null; B.skip.clear(); };
  const draw = (pts) => { hand = { id: 0, x0: pts[0][0], y0: pts[0][1], pts, t0: performance.now() - 1000, still: performance.now(), hx: pts[0][0], hy: pts[0][1], below: true, len: 300, holdR: 0 }; finishHand(); };
  function think() {
    if (card || fallen) return;
    const up = towers.filter((t) => !t.fall && t.rise >= 1 && !B.skip.has(t));
    let T = B.target;
    if (!T || T.fall || !towers.includes(T)) { T = B.target = up.sort((a, b) => Math.abs(a.x + a.w / 2 - EX) - Math.abs(b.x + b.w / 2 - EX))[0] || null; B.tries = 0; B.lastDraw = -99; }
    if (!T || (toDig > 20 && clock - B.lastDraw < 30) || clock - B.lastDraw < 12) return;
    if (B.tries >= 5) { B.skip.add(T); B.target = null; return; }
    const o = B.tries * 5, x = T.x, w = T.w, d = T.d;
    if (d.city) { const ps = T.piles || []; if (ps.length) { const y = Math.max(...ps.map((p) => p.tip || 304)) + 6 + o; draw([[ps[0].x - 10, y], [ps[ps.length - 1].x + 10, y]]); } }
    else if (T.cellar && !T.breached) draw([[x + w * 0.5, 34], [x + w * 0.5, 15]]);
    else if (d.kind === 'hut') draw([[x + w * 0.15, 15 + o], [x + w * 0.9, 15 + o]]);
    else draw([[x + w * 0.08, 13 + o], [x + w * 0.92, 13 + o], [x + w * 0.92, 19 + o], [x + w * 0.08, 19 + o]]);
    B.tries++; B.lastDraw = clock;
  }
  window.botRun = (frames) => {
    for (let k = 0; k < frames; k++) {
      if (card) {
        const c = card.title;
        if (/ is gone/.test(c)) { B.cur.end = 'down'; B.cur.time = Math.round(clock - B.cur.start); B.cur.lost = stats.lost - B.cur.lost0; B.cur.runouts = B.runouts - B.cur.runouts0; B.towns.push(B.cur); card.buttons[0].fn(); newTown(); continue; }
        if (/Winter|wiped/.test(c)) { B.cur.end = /Winter/.test(c) ? 'winter' : 'wiped'; B.cur.time = Math.round(clock - B.cur.start); B.cur.lost = stats.lost - B.cur.lost0; B.cur.runouts = B.runouts - B.cur.runouts0; B.cur.downs = downed; B.towns.push(B.cur); return 'over'; }
        card = null;
      }
      fake += 50; frame(fake);
      for (let i = q.length - 1; i >= 0; i--) if (q[i].at <= clock) { const f = q[i].fn; q.splice(i, 1); try { f(); } catch (e) {} }
      if (k % 40 === 0) { think(); if (B.cur && !B.cur.falls.length || true) { if (B.cur) B.cur.falls = B.cur.falls.slice(0, 20); } }
      if (B.cur && downed > B.cur.falls.length) B.cur.falls.push(Math.round(clock - B.cur.start));
      if (townN > 6) return 'far';
    }
    return 'on';
  };
  newGame(); card = null; newTown(); 0`;
(async () => {
  const all = [];
  for (let r = 0; r < RUNS; r++) {
    const { browser, errors, ev } = await open({ debug: true, page: 'index.html' });
    await ev(BOT);
    let st = 'on', guard = 0;
    while (st === 'on' && guard++ < 2000) st = await ev('botRun(400)');
    const towns = JSON.parse(await ev('JSON.stringify(B.towns)'));
    console.log(`run ${r + 1}: ${st}, score ${await ev('score')}, errors ${errors.length}`);
    for (const t of towns) console.log(`  town ${t.n + 1} ${t.kind.padEnd(7)} ${t.end.padEnd(6)} in ${String(t.time).padStart(3)}s  falls at [${t.falls.join(', ')}]  goal ${t.goal}/${t.houses}  out-of-tunnel ${t.runouts}  ants lost ${t.lost}`);
    all.push(towns); await browser.close();
  }
})();
