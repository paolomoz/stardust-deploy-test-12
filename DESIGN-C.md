# DESIGN-C — Live telemetry as the kinetic hero

Inherits shared Mode A (DESIGN.md). Same IA as A — the bet is **motion**, not
layout. Register: `live-systems`.

- **Hero**: the live-trace panel promoted into hero adjacency. Streaming trace
  rows (`HH:MM:SS · op · latency · $cost`) tick in; count-up numerals on
  latency/cost; refresh-pulse status dots; a "LIVE" indicator.
- **Behaviors**: B01..B25 cards resolve from `detected → grouped` — a stagger
  that lights cards as they're "found", honoring "evals that write themselves".
- **Numerals**: count-up on key metrics (traces ingested, behaviors grouped,
  regressions caught).
- **Restraint**: one register only; type stays Akkurat-led (not B's serif);
  the serif close remains the single display beat.
- Reduced-motion: every animated element neutralizes to its resting state
  under `prefers-reduced-motion: reduce` (static rows, final numerals, no pulse).

C-cliff guard: C is A + a coherent live-motion layer, NOT "B but bigger".
Layout parity with A; differentiation is the kinetic telemetry.
