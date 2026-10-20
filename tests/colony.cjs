// The colony left alone for a minute and a half: it should hold its numbers or grow, and lay young. And the
// tap menus: the queen's ("Move the queen", then a room), a room's (nursery or food store), guards (town three on).
const { open, sleep } = require('./_page.cjs');
(async () => {
  const { browser, page, errors, ev } = await open({ debug: true });
  const G = await ev('G'), S = await ev('S'), at = (x, y) => page.mouse.click(22 + x * S, G + y * S);
  const items = () => ev('menu ? menu.items.map((i) => i.label) : []');
  const choose = async (label) => { const k = (await items()).indexOf(label); if (k < 0) return false; const h = await ev(`menu.hits[${k}]`); await page.mouse.click(h.x + 20, h.y + h.h / 2); await sleep(300); return true; };
  const start = await ev('ants.length');
  const [lx, ly] = await ev('(() => { const c = chambers.find((c) => c.role === "larder"); return [c.x, c.y]; })()');
  await at(lx, ly); await sleep(300);
  const changed = (await choose('Make it a nursery')) && (await ev(`chambers.some((c) => c.role === "nursery" && Math.abs(c.x - ${lx}) < 2)`));
  const [qx, qy] = await ev('[QUEEN.x, QUEEN.y]'); await at(qx, qy); await sleep(300);
  const sent = (await choose('Move the queen')) && (await at(lx, ly), await sleep(300), await ev('!!QUEEN.go'));
  await ev('era = 2; 0'); await at(548, 150); await sleep(300);
  const guards = (await choose('Post guards here')) && (await ev('plugs.length')) === 1;
  await ev('era = 0; togglePlug(548, 150); 0');
  await sleep(90000);
  const [end, brood] = await ev('[ants.length, brood.length]');
  console.log({ start, end, brood, guards, changed, sent, errors: errors.length });
  await browser.close();
  if (errors.length || !guards || !changed || !sent || end + brood < start) process.exit(1);
})();
