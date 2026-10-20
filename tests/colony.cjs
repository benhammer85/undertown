// The colony left alone for a minute and a half: it should hold its numbers or grow, lay brood, and answer
// taps (guards posted, a room's use changed, the queen sent).
const { open, sleep } = require('./_page.cjs');
(async () => {
  const { browser, page, errors, ev } = await open({ debug: true });
  const G = await ev('G'), S = await ev('S'), at = (x, y) => page.mouse.click(22 + x * S, G + y * S);
  const start = await ev('ants.length');
  await at(548, 150); await sleep(400);
  const guards = await ev('plugs.length');
  const [lx, ly] = await ev('(() => { const c = chambers.find((c) => c.role === "larder"); return [c.x, c.y]; })()');
  await at(lx, ly); await sleep(400);
  const changed = await ev('chambers.some((c) => c.role === "nursery" && Math.abs(c.x - ' + lx + ') < 2)');
  await at(lx, ly); await at(lx, ly); await at(lx, ly); await sleep(400);
  const [qx, qy] = await ev('[QUEEN.x, QUEEN.y]'); await at(qx, qy); await sleep(300); await at(lx, ly); await sleep(300);
  const sent = await ev('!!QUEEN.go');
  await ev('togglePlug(' + 548 + ', 150); 0');
  await sleep(90000);
  const [end, brood] = await ev('[ants.length, brood.length]');
  console.log({ start, end, brood, guards, changed, sent, errors: errors.length });
  await browser.close();
  if (errors.length || !guards || !changed || !sent || end + brood < start) process.exit(1);
})();
