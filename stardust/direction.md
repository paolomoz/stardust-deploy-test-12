---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19
  againstInput: https://www.apple.com/
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/uplift-improvements.md
    - stardust/uplift-questions.md
---

# Direction — apple.com uplift (presales, three variants)

Mode A (brand-faithful). Palette pinned to the captured Apple surface
(`#1d1d1f` text, `#ffffff` / `#f5f5f7` grounds, `#0071e3` primary). Typography
pinned to SF Pro Display (headings) / SF Pro Text (body), with a
`-apple-system, system-ui` production fallback. No invented colors, no fonts
outside the captured surface.

Cinematic register for C: **kinetic-display**, auto-picked from PRODUCT.md Brand
Personality. Apple fires on `display-typography-signature` (→ kinetic-display)
and `modular-catalogue` (→ kinetic-grid); the tie-break "defining typographic
signature present → kinetic-display" resolves to kinetic-display. Executed in
the restrained Apple-faithful subset (type reveals + scroll-scale), not the
departure-board/marquee signage moves.

## Variant A — Faithful + improvements

Role: risk-averse green-light. "Yes, that's us, with the obvious fixes."
Composition: same bento IA as captured (globalnav, hero, product tiles,
entertainment, footer).
Motion: static (no cinematic layer).
Improvements applied:
1. Break the equal-weight 2-up grid: re-rank tiles so iPhone hero is followed by
   one secondary focal tile (Mac), then a quieter services row. Hierarchy by
   scale, not a flat peer grid.
2. Differentiate the CTA pair: primary action (Buy/Shop) becomes the solid blue
   pill; secondary (Learn more) becomes a quiet text link with chevron. Stop
   giving both equal weight.
3. Lift benefit-copy contrast: subhead moves from `#6e6e73` to `#1d1d1f` on light
   tiles so the one selling line is legible.
4. Drop the region/consent strip from the first viewport.

## Variant B — What if we amplified the first-party photography?

Role: design-team motivator. The brand's underused capability foregrounded.
What if: "What if every product got the full-bleed editorial canvas on the home
that it gets on its own product page?"
Captured trait amplified: first-party product photography (3008×692 renders
cropped into grid tiles).
Evidence: `pages/home.json#media`; `uniform-tile flatten` tension.
Composition: dissolve the uniform 2-up grid into a vertical stack of full-bleed
editorial sections. Each product photo runs edge-to-edge at hero scale; the
headline + one benefit line sit in the image's quiet band; CTA pair below.
Alternating light/dark grounds carried from the captured tile tones.
Motion: static (no cinematic layer).

## Variant C — What if motion was part of the identity?

Role: visionary pitch. The brand's third dimension, kinetic.
What if: "What if SF Pro Display stopped being a polite caption and became the
page, scaling and resolving as you scroll?"
Cinematic register: kinetic-display (auto-picked from PRODUCT.md Brand
Personality).
Captured trait amplified: SF Pro Display held at polite single-weight scale.
Evidence: `_brand-extraction.json#type`; `typographic-restraint-ceiling` tension.
Composition: identical bento IA to A (same sections, same order). The bet is
motion and type-scale, not layout.
Motion: cinematic, register kinetic-display. Oversized product-name headlines
reveal with blur-to-sharp + scale settle on scroll; section heads wipe in;
reduced-motion neutralizes every move to a static legible state.

## Differentiation ledger

- A vs B: grid-of-tiles → full-bleed editorial stack (layout primitive change) +
  photo at hero scale vs thumbnail (≥2 changes). ✓
- A vs C: static → kinetic type reveals + oversized scroll-scaled headlines (≥2
  changes). ✓
- B vs C: B is photo-led, static, layout-changed; C is type-led, kinetic,
  IA-faithful. Differentiated by axis (photo vs type, static vs motion). ✓
