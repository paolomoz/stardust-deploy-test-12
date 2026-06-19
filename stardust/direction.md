---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19T04:10:09.299Z
  againstInput: https://www.adaline.ai/
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/_brand-extraction.json
    - stardust/uplift-improvements.md
    - stardust/uplift-questions.md
---

# Resolved direction — Adaline uplift (presales, three variants)

Mode A (brand-faithful). Palette and typography pinned to the captured surface:
paper `#FBFDF6`, ink `#0A1D08`, sage surfaces, forest-green primary `#203B14`;
Akkurat (body/headings), Fragment Mono (labels/telemetry), Instrument Serif
(display). No invented colors or fonts.

## Cinematic register for C

**Register: `live-systems`** (auto-picked).
Rationale: PRODUCT.md Brand Personality reads `product` + heavily
`operationally-transparent / data-led / dashboard-register` — the page's
defining asset is live operational telemetry (trace rows, behavior taxonomy,
eval generation with latency + cost). Of the three plausible registers
(`kinetic-grid` for product, `kinetic-display` for the serif, `live-systems`
for the telemetry), `live-systems` honors the single most load-bearing
captured surface and the core product claim — a system that improves *in real
time*. Tie-break: `live-systems`' refuses-clause does not conflict with any
captured trait, whereas `kinetic-display` would over-amplify a face used once.

## Variant A — Faithful + improvements

Role: risk-averse green-light. "Yes, that's us, with the obvious fixes."
Composition: same IA as captured (nav → hero → understand → evals → synthetic
data → positioning → testimonials → security → footer-CTA).
Motion: static (no cinematic layer).
Improvements applied (from uplift-improvements.md):
1. Hero promoted — larger headline, single dominant primary CTA, "Read Docs"
   demoted to secondary; keep the restraint, fix the hierarchy.
2. Connective density between proof sections — remove dead vertical space,
   add one-line narration above each panel.
3. Trusted-by row strengthened — larger, higher-contrast logo lockup with a
   labeled "Trusted by teams at" frame.
4. Live panels narrated — each gets a plain-language caption interpreting the
   machinery ("behaviors = recurring agent patterns Adaline groups for you").
5. Security signals surfaced as discrete badges (SOC 2 II · GDPR · HIPAA ·
   SSO/SAML) instead of one run-on sentence.

## Variant B — What if we amplified Instrument Serif?

Role: design-team motivator. The brand's underused display face foregrounded.
What if: "What if the serif Adaline trusts for one closing line carried the
whole argument?"
Captured trait amplified: Instrument Serif (display) — used once today.
Evidence: `headings[3]` Instrument Serif 104px, single occurrence;
`_brand-extraction.json § type`.
Composition: every section headline becomes Instrument Serif at editorial
scale (hero, "Truly understand your agents", "Evals that write themselves",
positioning, close). Akkurat retreats to body and UI; Fragment Mono keeps the
telemetry. Larger type ladder, more editorial column rhythm, serif-led
section openers. The page gains a literary, confident register without a new
font.
Motion: static (no cinematic layer).

## Variant C — What if motion was part of the identity?

Role: visionary pitch. The brand's third dimension — kinetic.
What if: "What if you could watch your agents self-improve — telemetry
streaming, behaviors lighting up as they're detected, evals writing
themselves — live in the hero?"
Cinematic register: `live-systems` (auto-picked from PRODUCT.md Brand
Personality).
Captured trait amplified: Live operational telemetry (Live-data promotion) —
the trace / behavior / eval panels, today static and below the fold.
Evidence: `landmarks[3,4,5]`, trace rows + B01..B25 behavior codes.
Composition: identical IA to A; the bet is motion, not layout. The live-trace
panel is promoted into hero adjacency.
Motion: cinematic, register `live-systems` — streaming trace rows, count-up
latency/cost numerals, refresh-pulse status dots, behavior cards that resolve
from detected → grouped, reduced-motion fallback neutralizes all of it.

## Differentiation contract

- A vs B: ≥2 changes (type system — serif-led vs grotesque-led; hero
  composition). ✓
- A vs C: ≥2 changes (live motion layer; telemetry promoted to hero). ✓
- B vs C: ≥2 changes (axis — typography/composition vs live-data/motion;
  serif-led vs telemetry-led hero). ✓
