# Undertown

A two-colour screen print that plays. Under an invented old town, a cross-section of the ground — the street's
pipes and cables, a subway, a buried river, an old harbour, mine workings, clay, chalk, warm rock — and an ant
colony you direct. Hollow the ground under the town until it gives way; keep the queen alive while the city
fights back with bait, smoke and concrete. Each town that falls is buried, and a newer one is built on top.

**Play:** open `index.html` in a phone browser, or the published site (see below). One file, no build, no server.

## How it plays

- **Draw** a line underground: the ants dig it. Where it can't go straight (water, the subway), they find a way.
  Tap a pencilled route to rub it out; when the digging is out of view, a note at the bottom takes you there.
- **Hold** to make a room. **Tap** a room to change it: larder, nursery, fungus garden, sump.
- **Tap the queen**, then a room, to move her. Below the smoke line (80 m) nothing can reach her.
- **Mind the ground.** Wide rooms crack and cave in (clay and rock hold any span). Dig under a loose stone
  and it drops on whatever is below: aim it.
- **Tap a tunnel** to post guards. **Tap the water main** to burst it. **Two fingers** to scroll and zoom.

## Files

- `index.html` — the game.
- `sketches/` — earlier studies: the print-style mockup (`plates.html`) and the Spiral City prototype.
- `tests/` — headless checks (Playwright + Chromium): `smoke.cjs` (loads, frame rate, no errors), `reach.cjs`
  (every location reachable), `ground.cjs` (stones drop, wide rooms cave in), `colony.cjs` (the colony
  grows; taps work). Run with `npm test`.
- `HISTORY.md` — what changed, when.

## Publishing

GitHub Pages serves the repository root from `main`: every push updates the site.
