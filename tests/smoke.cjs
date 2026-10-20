// Loads the game, measures the frame rate, scrolls down through the layers. Fails on any page error.
const { open, sleep } = require('./_page.cjs');
(async () => {
  const { browser, page, errors } = await open();
  const fps = await page.evaluate(() => new Promise((res) => { let n = 0; const t = performance.now(); const f = () => { n++; if (performance.now() - t < 2000) requestAnimationFrame(f); else res(n / 2); }; requestAnimationFrame(f); }));
  await page.mouse.move(200, 500);
  for (let k = 0; k < 60; k++) { await page.mouse.wheel(0, 60); await sleep(30); }
  await sleep(1500);
  console.log('fps', fps, 'errors', errors.length);
  await browser.close();
  if (errors.length) { console.error(errors); process.exit(1); }
  if (fps < 45) { console.error('slow'); process.exit(1); }
})();
