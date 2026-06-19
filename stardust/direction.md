---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19T00:00:00Z
  againstInput: https://elevenlabs.io/
  mode: uplift (three variants)
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/uplift-improvements.md
    - stardust/uplift-questions.md
---

# Direction — ElevenLabs uplift (presales, three variants)

Mode A (brand-faithful) is pinned across all three variants: palette
from the captured surface (warm off-white `#fdfcfc`, black ink,
warm neutrals, the red accent ramp), typography from the captured
surface (Waldenburg display · Inter body · Geist Mono labels), pill
geometry (`9999px`). No invented colours, no fonts outside the
captured surface. IA priority preserved: product split + signup path
stay above the fold.

## Variant A — Faithful + improvements

Role: risk-averse green-light. "Yes, that's us, with the obvious fixes."
Composition: same IA as captured (hero → social proof → two-platform
split → creative suite → agents → API → research → footer).
Motion: static (no cinematic layer).
Improvements applied (from uplift-improvements.md):
1. Resolve the competing first-viewport CTAs into one clear primary
   (`Get started`) + one secondary, demote auth to nav only.
2. Differentiate the 5× `Learn more` into destination-named CTAs
   ("Explore ElevenAgents", "Read the research", …).
3. Collapse `Talk to sales` / `Contact sales` to one canonical
   `Contact sales`.
4. Adopt a single modular type scale (perfect-fourth) for heading
   rhythm; verify muted text meets AA on the warm ground.
5. Keep the monochrome restraint; tidy spacing to a 4px scale.

## Variant B — What if we amplified the reserved colour ladder?

Role: design-team motivator. The brand's suppressed colour identity
foregrounded.
What if: "What if ElevenLabs' reserved colour — the gradient-orb
spectrum and the research red — became the page's primary surface
instead of a rare event?"
Captured trait amplified: Color-ladder re-weighting
Evidence: accent ramp + gradient orbs appear in <1% of computed
surface; ground is monochrome (`#fdfcfc` 29,224 occ vs accent 9 occ).
Composition: colour-flooded hero band using the gradient spectrum;
orbs scaled up as section anchors; a saturated research/CTA band.
Typography + IA identical to A; the bet is colour proportion, not
layout or motion.
Motion: static (no cinematic layer).

## Variant C — What if motion was part of the identity?

Role: visionary pitch. The brand's third dimension — kinetic type as
sound resolving into speech.
What if: "What if Waldenburg stopped whispering — the light display
cut became kinetic, type assembling like sound resolving into speech?"
Cinematic register: `kinetic-display` (auto-picked from PRODUCT.md
Brand Personality — display-typography signature; registerSource:
heuristic)
Captured trait amplified: Display-typography amplification (the one
`kinetic-display` naturally amplifies)
Evidence: Waldenburg is a private cut used almost entirely at the hero
in weight 300; uppercase mono labels already act as a structural label
system.
Composition: identical IA to A; the bet is motion, not layout.
Motion: cinematic, register `kinetic-display` — letter-by-letter hero
+ section-head reveals (clip-path / blur), waveform-as-reveal mechanic,
model-version numerals flip/count in, signage marquee between bands.
Reduced-motion fallback neutralises every motion element.

## Differentiation (axis, not intensity)

- A vs B: colour proportion (monochrome → colour-flooded) + CTA/IA fixes ≥2 changes ✓
- A vs C: motion identity (static → kinetic-display) + reveal mechanics ≥2 changes ✓
- B vs C: colour-composition bet vs type-motion bet — different axes ≥2 changes ✓
