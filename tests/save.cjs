// Saving and coming back: a game saved, the page reloaded, Continue on the title, and it's all there.
// (Served over http, as the site is: storage works the way it will on a phone.)
const http = require('http'), fs = require('fs'), path = require('path');
const { sleep } = require('./_page.cjs');
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
(async () => {
  const root = path.join(__dirname, '..');
  const page0 = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace('  layout();\n  bg.setTransform', '  window.__ev = (q) => eval(q);\n  layout();\n  bg.setTransform');
  const srv = http.createServer((q, r) => { const f = q.url.split('?')[0]; if (f === '/' ) { r.writeHead(200, { 'content-type': 'text/html' }); r.end(page0); return; } const p2 = path.join(root, f); if (fs.existsSync(p2)) { r.writeHead(200); r.end(fs.readFileSync(p2)); } else { r.writeHead(404); r.end(); } }).listen(0);
  const port = srv.address().port, exe = process.env.CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined);
  const browser = await chromium.launch(exe ? { executablePath: exe } : {}), page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = []; page.on('pageerror', (e) => errors.push(e.message));
  const ev = (q) => page.evaluate((q) => window.__ev(q), q);
  await page.goto(`http://localhost:${port}/`); await sleep(3500);
  const title = await ev('card && card.title');
  await ev('newGame(); card = null; linkToNest(300, 600); 0'); await sleep(6000);
  const state = 'JSON.stringify([era, towers.length, chambers.length, Math.round(QUEEN.y), (() => { let n = 0; for (let i = 0; i < GW * GH; i++) if (soil[i] === 0) n++; return n > 1000; })()])';
  const before = await ev(state); await ev('saveGame(); 0'); await sleep(1200);
  await page.reload(); await sleep(3500);
  const cont = await ev('card.buttons.some((b) => b.label === "Continue")');
  await ev('continueGame(); 0').catch(() => {}); await sleep(4500);
  const after = await ev(state);
  console.log({ title, cont, before, after, errors: errors.length });
  await browser.close(); srv.close();
  if (title !== 'Undertown' || !cont || before !== after || errors.length) process.exit(1);
})();
