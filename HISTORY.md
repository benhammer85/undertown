# History

## 2026-10-20 — its own project
Moved out of the scratch prototypes into its own repository, with tests and a published site.

Where it stands:
- **The print**: two inks (green, pink) on cream, every plate pulled with ink spread, halftone, misregistration.
- **The town**: invented names (Tallow Row, Lanternmarket, …); gabled and mansard houses, civic halls; no
  real city. Buildings go up behind hoardings with scaffolds and a working tower crane; they lean and are taken
  into the ground when undermined; a fallen town is buried and a newer one built over it.
- **The ground**, top to bottom: shop cellars and street-tree roots; water, gas, telecom and power runs; the
  sewer; the subway (crossed on foot: vent, track bed, floor gully; trains are a hazard); the old hall's
  undercroft; the station; the old town; the lost river in its culvert; the old harbour and a sunken boat; mine
  workings; clay; another colony; chalk and flint; the water table; bedrock; warm rock.
- **The colony**: brood (egg, larva, pupa, ant), faster in clay and warm rock; rooms by use; guards; a second
  queen; the queen moved by tap; worn tracks in busy tunnels; loads shown by what they are.
- **The city fights back**: bait (spoils below 50 m), smoke (sinks no further than 80 m), concrete (pumped no
  deeper than 30 m), grout for holes; cordons and engineers.
- **Way-finding**: drawn routes are joined to the colony by the cheapest way through tunnel, earth, or chewed
  pipe and brick, never water or the subway's open air. Every location checked reachable (`tests/reach.cjs`).

Fixed on the way here: the burying of a fallen town crashed (a name reused); the subway's floor gully was sealed
by one row; idle ants loitered on the track and were run over.

## 2026-10-20 — the long dig works
A route drawn deep (to the other colony, ~330 m) sat as faint pencil and never arrived. Causes, all fixed:
- deep diggers were carrying spoil to the street (a check read the wrong cell after the bite chain);
- a digger finding the face already dug gave up its job instead of waiting for the way on;
- routes started from the subway track, so diggers commuted along it and trains took them;
- a single bait crumb killed two and a half ants: now one;
- tunnels passing a cave pool drained it into the dig face (standing water now stays put);
- what a mole or a cave-in fills is now marked to be dug out again.
Now: the other colony is reached in about three minutes from a fresh start. The plate's head shows how many
metres are left to dig; drawn routes are darker; the other colony's ants are larger and plainly pink.

## 2026-10-20 — the other colony, within reach
- Moved up from ~330 m to ~170 m, below the old harbour: reached in under a minute.
- Where the digging is: a pencilled ring at the dig face; out of view, a note ("↓ digging, 120 m below · tap
  to look") that takes you there.
- A route not yet dug can be rubbed out by tapping its pencil line (with the way found to it).
- Long captions set smaller to fit the plate; the page now says how wide a phone is (for its own site).

## 2026-10-20 — the ground pushes back (after Doug Dug)
- **Rooms can cave in.** Each ground holds a roof so wide: common earth ~18 cells, chalk ~26, clay and rock any
  span. A wider room strains: zigzag cracks run up from its roof, grains start to fall, then its upper half comes
  in on whatever's there (ants, brood). Small rooms are safe; big ones are a gamble unless dug in clay or rock.
- **Loose stones.** Set in the ground: over the subway, over the sunken boat's cargo, over the other colony's
  main room, in the chalk and below. Dig out what's under one and it shivers, then drops: crushing what's below,
  bursting the main, cracking the gas line, or breaking through the subway's roof. Stones can't be chewed.
- New test, `tests/ground.cjs`.

## 2026-10-20 — what's happening, and what for
- **Fixed:** two buildings fell on their own at the start: the cellars and the tree-root pockets under them were
  counted as hollowing. Hollows the ground comes with no longer count.
- **A goal for each plate**, on an opening card ("Bring down 3 of its 5 buildings") and as pips by the plate's
  name in the head of the frame.
- **Footings shown**: each standing building's footing pencilled under the street, with "N% hollowed" (red past
  two-thirds) and a bar.
- **The game comes in plate by plate**: plate I, bait only, the ground surveyed to the lost river; II, smoke,
  surveyed to the harbour; III, concrete and guards, to the mine workings; IV on, everything (the other colony,
  moles, stones), and the ground to the bottom. Each plate's card says what's new.
- **Endings**: a fallen town's card (time, buildings down, depth, ants, losses), with "Save the print" (a PNG of
  the plate) and "Next plate"; a lost colony's card with "A new queen". The world holds still under a card.
- **A status line** over the key: ants, young (the brood: eggs, larvae, pupae), food, metres left to dig.
- New test, `tests/plates.cjs`.

## 2026-10-20 — plain English
Every word a player reads rewritten plainly: "Town One: Tallow Row", "Goal: knock down 3 of its 5 buildings",
"Drag to dig · Hold to make a room", "The city is pumping gas into your tunnels", "Food store", "Nursery: eggs
and young", "Mushroom farm: turns 1 food into 3", "Drain: soaks up water", "gas can't reach below here",
"Locked: you can dig deeper in later towns", "34% dug out". Card text set upright, not italic; town numbers
spelled out (the display face's old-style 1 reads as an i).

## 2026-10-20 — on the home screen
An icon in the print's two inks: one ant walking its tunnel through the pink earth, in a green frame. With a web manifest and the iPhone's tags, so "Add to Home Screen" gives the icon and opens the
game full screen. (Drawn by `sketches/icon/icon.html`.)

(The icons first went up missing: `.gitignore` excluded every PNG, to keep test screenshots out. Now only those.)

## 2026-10-20 — simpler, and kept
- **Simpler:** two kinds of room (nursery, food store); guards from town three; the sewer's floods and the old
  mine's cave-ins rare.
- **Tap for options:** a tap opens a small menu of what can be done there (move the queen, make it a nursery or a
  food store, cancel this tunnel, burst the water pipe, post or remove guards). The key now says just that.
- **The first town, step by step:** "Dig under this one" over a building and "Ants' way in" at the entrance; then
  "keep going until 100% dug out"; then "it fell, knock down N more".
- **Saved as you play** (every few seconds, and when the phone puts the page away), in the browser's own
  storage. A **title** opens the game: Continue, New game, How to play. **Tap the town's name** to pause.
  A continued game prints its ground again exactly as it first was (each fallen town's layer too), then puts back
  the dug ground and everything in it. New test, `tests/save.cjs`.

## 2026-10-20 — an audit, and what it found
Played by a bot for minutes at a time, on five screen sizes. Fixed:
- **A new colony was gutted in its first ten seconds.** The way-finder ran tunnels along the underside of the road
  (the cheapest earth), which opened the street; a hole then swallowed the whole entrance shaft, 16 m of it.
  Ways now keep a metre under the road and don't run along under the water pipe; a hole takes only the shaft's
  top; and the made ground gives way only under buildings (the open street is packed hard).
- **Digging stalled for good when earth fell into a tunnel** under a building: what falls in is now dug out again.
- **Landscape and wide screens** stretched the plate to a sliver of street: the plate keeps its portrait shape,
  centred.
- **Turning the phone mid-game** left the plate drawn for the old size: it now saves and reopens at the new one.
- The head of the frame set larger; the depth notes on a paper backing, clear of the print.
Frame rate held at 60, memory flat (8 to 12 MB), no errors over the long sessions.
- The key under the plate could run into the frame on a phone: the sheet was measured before its typeface loaded
  (which wraps the key a line longer). It's now laid out once the type is in.
- **Where things happen:** a caption about a place (a gas leak, a burst pipe, a cave-in, a sinkhole, a building
  falling, a mole, the other colony finding you…) is set in red, carries an arrow when the place is out of view,
  and puts a red ring on the plate there; tap the caption to go to it.
- **A building's fall:** instead of bricks thrown about, pieces of its face come away at the edges and drop,
  turning, breaking into dust on the street.

## 2026-10-20 — a test: the ground settles (`settle.html`)
A separate page trying one rule: whatever the ants dig out, the ground above slowly sinks into. A hamlet of four
timber huts on natural ground: topsoil and earth (soft), clay below (firm). In soft ground any open space with
earth over it takes a grain from above, so a tunnel closes from the top and comes out at the surface, which drops;
what the ants keep using holds; the clay never settles. A hut sinks and leans on what's left under each side, and
falls when it's sunk or leaning far enough. Its own save, apart from the game's. The main game is unchanged (the
test is the same source with one switch thrown).

## 2026-10-21 — the settling run becomes the game
The settling test grew into a whole run: hamlet, village, market town, mill town, city, each against winter,
each bringing one new thing (stone footings, paving and cellars and wells, terraces and the mill and the sewer,
piles and the gas main and the train tunnel and the city's defences), with machines rather than people fighting
back, houses that come apart in their own pieces, printed dust, a timber scaffold, a tunnel budget, a chalked
pencil line, and no numbers while you play. It is now `index.html`. The first game is kept as `classic.html`;
`settle.html` sends you on to the game.
- **Saving the run:** a game saved mid-town now comes back with its town, score and time to winter, its street
  (paving, wells, cellars), the works under it (sewer, gas main, train tunnel, piles), the wreck as it lay, and
  which tunnels the ants were using (without that, every tunnel would settle shut on a reload). New test,
  `tests/run.cjs`.

