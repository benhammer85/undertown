// The plate's shape: an opening card with the goal; buildings standing until undermined; the ground surveyed only
// so deep; the city's weapons by plate; a fallen town's card (print saved, next plate); a lost colony's card.
const { open, sleep } = require('./_page.cjs');
(async () => {
  const { browser, page, errors, ev } = await open({ debug: true });
  await ev('plateCard(); 0'); await sleep(300);
  const opening = await ev('card && card.title');
  await ev('card = null; 0'); await sleep(8000);
  const standing = await ev('towers.every((t) => !t.fall)');
  await ev('camY = 1e6; clampCam(); 0');
  const surveyOk = await ev('camY + (IN.y + IN.h - G) / SZ() <= surveyed() + 41');
  await ev('camY = 0; clampCam(); alarm = 99; pestCool = 0; 0'); await sleep(400);
  const plateOneWeapon = await ev('pest && pest.kind');
  await ev('pest = null; alarm = 0; downed = goal.n; checkCity(); 0'); await sleep(9000);
  const fallen = await ev('card && card.title');
  await ev('card.buttons[1].fn(); 0'); await sleep(1500);
  const next = await ev('[era, card && card.title]');
  await ev('card = null; loseQueen(); 0'); await sleep(3000);
  const lost = await ev('card && card.title');
  console.log({ opening, standing, surveyOk, plateOneWeapon, fallen, next, lost, errors: errors.length });
  await browser.close();
  if (!opening || !standing || !surveyOk || plateOneWeapon !== 'bait' || !/brought down/.test(fallen || '') || next[0] !== 1 || !/wiped out/.test(lost || '') || errors.length) process.exit(1);
})();
