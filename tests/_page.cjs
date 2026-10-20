// Opens the game in headless Chromium at phone size. With { debug: true } it serves a copy with a hook,
// window.__ev(code), that evaluates code inside the game's closure, so a test can read and poke its state.
const fs = require('fs'), os = require('os'), path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

async function open({ debug = false } = {}) {
  let file = path.join(__dirname, '..', 'index.html');
  if (debug) {
    const src = fs.readFileSync(file, 'utf8').replace('  layout();\n  bg.setTransform', '  window.__ev = (q) => eval(q);\n  layout();\n  bg.setTransform');
    if (!src.includes('window.__ev')) throw new Error('could not place the debug hook');
    file = path.join(os.tmpdir(), 'undertown-debug.html'); fs.writeFileSync(file, src);
  }
  const exe = process.env.CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined);
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => m.type() === 'error' && !/Failed to load resource/.test(m.text()) && errors.push(m.text())); // (the debug copy runs from a temp folder, without the icons beside it)
  await page.goto('file://' + file); await page.waitForTimeout(3500);
  const ev = (q) => page.evaluate((q) => window.__ev(q), q);
  // (The plate's opening card waits for a tap; a test begins straight away.)
  if (debug) await ev('card = null; 0');
  return { browser, page, errors, ev };
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
module.exports = { open, sleep };
