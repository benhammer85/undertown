# Undertown

A two-colour screen print that plays. An ant colony lives under a town, and the ground above slowly sinks into
whatever the ants dig out. Bring the town down before winter. Each town that falls is built again, bigger and
cleverer: a hamlet of huts, a stone village, a paved market town, a mill town, then a city on piles.

**Play:** open `index.html` in a phone browser, or the published site (see below). One file, no build, no server.

## How it plays

- **Drag** to draw a tunnel; the ants dig it. **Tap** a pencilled tunnel to rub it out. **Two fingers** to look
  around. **Tap the town's name** to pause.
- Whatever the ants dig out, the ground above sinks into. A tunnel they stop using closes from the top; deep clay
  never settles. A house sinks, leans, cracks and comes down in pieces.
- The colony can keep only so much tunnel open: a drawn line stops where that runs out.
- Each town must come down before winter, while it builds more houses. A town that falls is built again:
  - **hamlet:** timber huts on soft ground;
  - **village:** stone cottages, whose footings span a narrow tunnel, and a lorry that fills your holes;
  - **market town:** a paved street, tall houses on cellars, a well full of water, a cement mixer;
  - **mill town:** brick terraces that fall in a row, a mill worth two, a sewer running full, a steam pump;
  - **city:** towers on piles down to the clay, a gas main, a train tunnel and station, and the city's own
    defences: poison bait, gas and concrete.
- No numbers while you play; the end card has the score, and your best. Towns you've reached can be started
  from the title.

## Files

- `index.html` — the game.
- `classic.html` — the first version: one city on a deep, layered world, a richer colony to manage.
- `settle.html` — the old address of the test that became the game; it sends you to `index.html`.
- `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `favicon.png`, `manifest.webmanifest` — the icon and the
  settings a phone uses when the site is added to its home screen (the icon is drawn by `sketches/icon/icon.html`).
- `sketches/` — earlier studies: the print-style mockup (`plates.html`) and the Spiral City prototype.
- `tests/` — headless checks (Playwright + Chromium). `run.cjs` checks the game: a new run, a tunnel laid out and
  dug, starting in the city, saving. The rest check `classic.html`: `smoke.cjs` (loads, frame rate, no errors),
  `reach.cjs` (every location reachable), `ground.cjs` (stones drop, wide rooms cave in), `plates.cjs` (goal,
  survey, weapons by plate, endings), `save.cjs` (save, reload, Continue), `colony.cjs` (the colony grows; taps
  work). Run with `npm test`. `playthrough.cjs` is a bot that plays whole runs at speed and reports each town
  (time, winter or not, tunnel run-outs, ants lost), for tuning: `node tests/playthrough.cjs 3`.
- `HISTORY.md` — what changed, when.

## Publishing

GitHub Pages serves the repository root from `main`: every push updates the site.
