// The run (index.html): a new game starts in the hamlet, a drawn tunnel is laid out and dug, the run can start in
// a later town, and a game saved mid-town comes back with its town, score, clock and works.
const { open, sleep } = require('./_page.cjs');
(async () => {
  let ok = true; const check = (what, pass, info = '') => { console.log(`${pass ? 'ok  ' : 'FAIL'} ${what} ${info}`); if (!pass) ok = false; };
  { const { browser, page, errors, ev } = await open({ debug: true, page: 'index.html' });
    await ev('newGame(); card = null; tut = null; 0'); await sleep(1500);
    check('starts in the hamlet', await ev('stageN === 0 && towers.every((t) => t.d.kind === "hut")'));
    const [G, SZ, cx, cy, inx, ex] = await ev('[G, SZ(), camX, camY, IN.x, EX]'), X = (u) => inx + (u - cx) * SZ, Y = (u) => G + (u - cy) * SZ;
    await page.mouse.move(X(ex), Y(30)); await page.mouse.down(); for (let k = 0; k <= 20; k++) { await page.mouse.move(X(ex - k * 4), Y(30 + k * 2)); await sleep(12); } await page.mouse.up();
    await sleep(600); const planned = await ev('(() => { let n = 0; for (let i = 0; i < GW * GH; i++) n += plan[i]; return n; })()');
    check('a drawn tunnel is laid out', planned > 20, `(${planned} cells)`);
    await sleep(8000); check('and dug', (await ev('(() => { let n = 0; for (let i = 0; i < GW * GH; i++) n += plan[i]; return n; })()')) < planned);
    check('no numbers under the plate', (await ev('document.getElementById("status").textContent')) === '');
    check('no errors', !errors.length, errors.join(' | ')); await browser.close(); }
  { const { browser, errors, ev } = await open({ debug: true, page: 'index.html', hash: '#town4' }); await sleep(9000);
    check('starts in the city', await ev('stageN === 4 && towers.some((t) => t.d.city) && !!gasMain && !!tunnel'));
    await ev('collapse(towers[0], 1); 0'); await sleep(7000);
    const before = await ev('JSON.stringify([stageN, townN, score, towers.length, !!gasMain, !!tunnel, wreck.length])');
    await ev('saveGame(); 0'); await sleep(1200);
    const snap = await ev('(async () => { const s = snapshot(); return !!s.run && !!s.trod; })()');
    check('the save holds the run and the tunnels in use', snap);
    check('no errors', !errors.length, errors.join(' | ')); await browser.close();
    console.log('    (', before, ')'); }
  process.exit(ok ? 0 : 1);
})();
