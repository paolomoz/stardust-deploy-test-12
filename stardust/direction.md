---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19
  againstInput: https://superhuman.com/
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/uplift-improvements.md
    - stardust/uplift-questions.md
---

# Direction — Superhuman uplift (3 variants)

Mode A (brand-faithful). Palette + typography pinned to the captured surface:
cream `#f2f0eb` ground, warm ink `#292827`/`#141413`, purple primary `#714cb6`,
mulberry `#421d24` + teal `#0c4243` accents, Super Sans VF / Super Serif VF.

## Variant A — Faithful + improvements

Role: risk-averse green-light. "Yes, that's us, with the obvious fixes."
Composition: same IA as captured (hero → suite → per-product bands → manifesto
→ trusted-by → footer).
Motion: static (no cinematic layer).
Improvements applied:
- Calm the hero: retire the glassy floating chat-cards; let the portrait and
  headline own the fold (fixes #1, #4).
- Differentiate suite-overview from per-product deep-dives so the page stops
  repeating one structural unit five times (#2).
- Raise secondary-ink and logo-wall contrast to AA (#3).

## Variant B — What if we amplified the editorial photography?

Role: design-team motivator. The brand's underused capability foregrounded.
What if: "The painterly photography breathes at full-bleed editorial scale —
image as layout, not backdrop."
Captured trait amplified: Photography re-foregrounding (candidate 2).
Evidence: `homepage-tonal-flower.webp` (2560w) and "Girl drafting a Superhuman
manifesto" — art-directed, not stock.
Composition: full-bleed hero photograph with type set in the lower band;
per-product sections become photo-first editorial spreads with the product
accent color drawn from the image; the manifesto becomes a full-width plate.
Motion: static (no cinematic layer).

## Variant C — What if motion was part of the identity?

Role: visionary pitch. The brand's third dimension — kinetic type.
What if: "The bespoke variable typeface is alive — weight, optical size and
display headlines animate as the page moves."
Cinematic register: `kinetic-display` (auto-picked: Super Sans VF is a
display-typography signature; tie-break over `editorial` favors the bespoke
variable family).
Captured trait amplified: Display-typography amplification (candidate 1) — the
trait `kinetic-display` naturally amplifies through motion.
Evidence: Super Sans VF variable axes (weights 460→700), `--line-height-display`
1.1, 64px hero — axes captured but never animated.
Composition: identical IA to A; the bet is motion, not layout.
Motion: cinematic, register `kinetic-display` — variable-weight reveals,
scroll-linked optical-size shifts, large-type kinetic headlines. Reduced-motion
fallback neutralizes all of it.
