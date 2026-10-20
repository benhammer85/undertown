# Undertown

A two-colour screen print that plays. Under an invented old town, a cross-section of the ground — the street's
pipes and cables, a subway, a buried river, an old harbour, mine workings, clay, chalk, warm rock — and an ant
colony you direct. Hollow the ground under the town until it gives way; keep the queen alive while the city
fights back with bait, smoke and concrete. Each town that falls is buried, and a newer one is built on top.

**Play:** open `index.html` in a phone browser, or the published site (see below). One file, no build, no server.

## How it plays

The game opens on a title: **Continue** (it saves itself as you play), **New game**, **How to play**. Each town's
card gives the goal: knock down so many of its buildings. The first town walks you through it in three steps.

- **Drag** to draw a tunnel; the ants dig it, finding a way round water and the subway.
- **Hold** to make a room.
- **Tap anything** (the queen, a room, a dotted tunnel, the water pipe, a tunnel) for what you can do there:
  move the queen, make a room a nursery or a food store, cancel a tunnel, burst the pipe, post guards.
- **Two fingers** to scroll and zoom. **Tap the town's name** at the top to pause.
- The city fights back: poison bait, then (from town two) gas, then (from town three) concrete. Keep the queen
  deep, out of their reach. Wide rooms can cave in; loose rocks drop when you dig under them.

## Files

- `index.html` — the game.
- `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `favicon.png`, `manifest.webmanifest` — the icon and the
  settings a phone uses when the site is added to its home screen (the icon is drawn by `sketches/icon/icon.html`).
- `sketches/` — earlier studies: the print-style mockup (`plates.html`) and the Spiral City prototype.
- `tests/` — headless checks (Playwright + Chromium): `smoke.cjs` (loads, frame rate, no errors), `reach.cjs`
  (every location reachable), `ground.cjs` (stones drop, wide rooms cave in), `plates.cjs` (goal, survey, weapons by plate, endings), `save.cjs` (save, reload, Continue), `colony.cjs` (the colony
  grows; taps work). Run with `npm test`.
- `HISTORY.md` — what changed, when.

## Publishing

GitHub Pages serves the repository root from `main`: every push updates the site.
