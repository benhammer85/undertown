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
