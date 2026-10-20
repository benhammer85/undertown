// What holds the ground up: a stone undermined drops (through the subway's roof; onto the other colony), and a
// room too wide for its ground cracks and caves in.
const { open, sleep } = require('./_page.cjs');
(async () => {
  const { browser, errors, ev } = await open({ debug: true });
  const hollowAt = (x0, x1, y0, y1) => ev(`(() => { for (let y = ${y0}; y <= ${y1}; y += 3) for (let x = ${x0}; x <= ${x1}; x += 3) { const i = gi(x, y); if (i >= 0 && soil[i] === 1) soil[i] = 0; } dirty = true; return 0; })()`);
  await ev('chunk(2); 0'); await sleep(800);
  const stable = await ev('stones.every((s) => !s.falling && s.wob < 0.5)');
  await hollowAt(116, 140, 198, 219); await sleep(2500);
  const subway = await ev('tubeBroken');
  await ev('RIV.ants.forEach((r) => { r.x = 205 + (Math.random() - 0.5) * 20; r.y = 1308; r.tx = r.x; r.ty = r.y; r.wait = 5; }); 0');
  const before = await ev('RIV.ants.length'); await hollowAt(197, 213, 1269, 1300); await sleep(2500);
  const crushed = before - (await ev('RIV.ants.length'));
  await ev(`(() => { for (let a = 0; a < TAU; a += 0.15) for (let r = 0; r < 30; r += 2) { const i = gi(300 + Math.cos(a) * r * 1.4, 640 + Math.sin(a) * r * 0.6); if (i >= 0 && soil[i] === 1) soil[i] = 0; } chambers.push({ x: 300, y: 640, r: 28, role: 'larder' }); return 0; })()`);
  await sleep(20000);
  const cavedIn = await ev('chambers[chambers.length - 1].r < 28');
  console.log({ stable, subway, crushed, cavedIn, errors: errors.length });
  await browser.close();
  if (!stable || !subway || crushed < 5 || !cavedIn || errors.length) process.exit(1);
})();
