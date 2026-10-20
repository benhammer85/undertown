// Every place worth going: can the colony find a way there from where it starts? (Through tunnel, earth, or
// chewed pipe and brick; never water or the subway's open air.) Fails if any can't be reached.
const { open } = require('./_page.cjs');
const PLACES = [['bakery cellar', 158, 22], ['cold store', 360, 22], ['street tree aphids', 'trees[0].x', 26], ['sewer silt', 446, 202],
  ['station', 300, 540], ['undercroft', 60, 380], ['crumbs', 380, 594], ['old town well', 280, 800], ['river walkway', 200, 866],
  ['below the river', 300, 950], ['harbour cargo', 200, 1194], ['tram', 430, 1330], ['mine gallery', 200, 1467], ['lower gallery', 300, 1587],
  ['cave pool', 420, 1880], ['clay', 300, 2150], ['other colony', 200, 1310], ['chalk', 300, 2750], ['water table', 300, 3150],
  ['bedrock', 300, 3420], ['warm rock', 300, 3600], ['left edge', 10, 1200], ['right edge', 595, 1700]];
(async () => {
  const { browser, errors, ev } = await open({ debug: true });
  await ev('chunk(4); fields(); 0');
  let bad = 0;
  for (const [name, x, y] of PLACES) {
    const r = await ev(`(() => { const t = gi(${x}, ${y}), way = findWay(colonyCells(), t); if (!way) return null; return { len: way.length, chew: way.filter((i) => soil[i] === 2 || soil[i] === 3).length, wet: way.filter((i) => water[i] > 0.5).length }; })()`);
    if (!r || r.wet) bad++;
    console.log(name.padEnd(20), r ? `ok, ${r.len} cells, ${r.chew} chewed` : 'NO WAY');
  }
  await browser.close();
  if (bad || errors.length) { console.error(bad, 'unreachable', errors); process.exit(1); }
})();
