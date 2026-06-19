---
_provenance:
  writtenBy: stardust:uplift
  writtenAt: 2026-06-19T05:14:00Z
  againstInput: https://dala.craftedbygc.com/
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/brand-review.html
    - stardust/uplift-improvements.md
    - stardust/uplift-questions.md
---

# Direction — uplift presales redesign of https://dala.craftedbygc.com/

Three differentiated variants. Mode A pinned: palette (#000000 / #ffffff /
#8052ff / #9a9a9a) and typography (PP Neue Montreal, weights 200/400/600)
from the captured brand surface. No invented colors, no fonts outside the
captured surface.

## Cinematic register selection (variant C)

Captured PRODUCT.md register = `brand`; personality = cinematic · editorial ·
restrained · aspirational · human-warm-over-premium-dark.

Two registers fire on the selection heuristic: `editorial` (direct trait
match) and `arrival` (documented default for a `brand`-register marketing
surface that introduces an entity). Resolved to **`arrival`**:

- The captured signature — `generative-particle-hero` + `scrollytelling-reveal`
  + a 112px hero headline + the "Motion as narrative" design principle — maps
  one-to-one onto arrival's signature moves (hero parallax, rising plate,
  staggered per-section entrances, hero-text enterUp stagger). Editorial's
  quiet crossfades would underuse the brand's single most distinctive asset.
- The only tiebreak against arrival is its refusal of editorial-airy padding
  (>96px desktop) vs. Dala's captured 120px sections. That dissolves under
  direct's density floor: an 8-section brand page is capped at ≤64px
  `sectionPadding.desktop` in the target, so the captured 120px does not carry
  forward and the conflict is moot.

registerSource: auto (heuristic; no `--cinematic-register` override supplied).

## Variant A — Faithful + improvements

Role: risk-averse green-light. "Yes, that's us, with the obvious fixes."
Composition: same IA as captured (hero → mission → decisions/confidence →
lightbulb → better-world → team → investors → closing CTA).
Motion: static (no cinematic layer).
Improvements applied (from uplift-improvements.md):
1. Hero gains a concrete product moment alongside the manifesto headline
   (retires the stealth-teaser pattern) while keeping "Request Access" as the
   single conversion path.
2. Numbered section eyebrows + clearer hierarchy across the 12 headings.
3. Hierarchy from weight + a tightened scale, not size alone.
4. Replace the decorative investor logo-PNG strip and generic slider with a
   restrained, on-brand treatment; fix the content-free `"here"` link label.
5. Reprise the constellation motif lightly past the hero (a quiet recurring
   accent) so the brand's thesis asset is not abandoned.

## Variant B — What if type *was* the interface?

Role: design-team motivator. The brand's underused capability foregrounded.
What if: "What if type was the interface — a strict modular scale and the full
PP Neue Montreal weight range (200→600) the site owns but never exercises,
doing all the structural work?"
Captured trait amplified: display-typography signature (one private typeface
carrying the whole brand).
Evidence: `_brand-extraction.json#type` — single family across display/body/UI;
weights 200/400/600 captured but headings render at 400 only; scale is ad-hoc.
Composition: rebuild on a strict modular scale (retires `T-scale`); Light 200
atmospheric lead-ins vs SemiBold 600 structural heads; numbered section
eyebrows; oversized type — not imagery — is the layout. Same content set,
re-typeset IA.
Motion: static (no cinematic layer).

## Variant C — What if motion was part of the identity?

Role: visionary pitch. The brand's third dimension — kinetic.
What if: "What if the generative constellation stopped being a hero backdrop
and became the brand's structural voice — threading from the first viewport
through every section and resolving in the footer wordmark?"
Cinematic register: arrival (auto-picked from PRODUCT.md Brand Personality).
Captured trait amplified: signature-gesture extension — the
`generative-particle-hero` constellation (the literal product thesis: scattered
fragments resolving into shared knowledge).
Evidence: `motifs.patterns.generative-particle-hero` present at hero only; the
rest of the page is motif-free prose.
Composition: identical IA to A; the bet is motion, not layout.
Motion: cinematic, register `arrival` — particles parallax, sections rise and
stagger in, the constellation seeds section dividers and a footer wordmark
wipe. Every motion element neutralized under `prefers-reduced-motion: reduce`.

---

# Direct — per-variant resolution & reasoning trace (appended 2026-06-19)

_Written by stardust:direct (Phase 4). The uplift-authored direction above is
authoritative and unchanged; this section records direct's resolution of that
direction into the target spec files._

## Mode & fork

- **Mode A (brand-faithful), pinned.** Brand signal stamped `signal-strong`
  (palette ≥3 distinct after clustering — black/white/purple/gray — and named
  type family PP Neue Montreal). No rebrand trigger. Mode A by precedence step 1.
- **ia-fidelity: reimagined** → A + B + C role-differentiated fork (Phase 2.6).
- Density tier: **balanced**. Multi-audience hard floor fires (8 captured
  sections > 5), so `sectionPadding.desktop` is capped at **64px** (down from the
  captured 120px) in ALL variants including C.

## Resolved shared tokens (PRODUCT.md + DESIGN.md/json — shared across variants)

- Palette (pinned, hex): `#000000` ink-black · `#ffffff` paper-white ·
  `#8052ff` electric-purple · `#9a9a9a` muted-gray. No fourth color in any
  variant.
- Type (pinned): PP Neue Montreal, weights 200 / 400 / 600 (all exercised; the
  captured site used 400 only).
- Modular scale: base + A + C use **1.25** (minor third); **B overrides to
  1.333** (perfect fourth) to amplify the display signature. Retires the captured
  ad-hoc scale (T-scale).
- sectionPadding (density floor): desktop **64px** / tablet 48px / mobile 32px.
- Radius: pill **22.5px**, md 24px, circle 50% (from captured borderRadius mode).

## Divergence (brand-faithful mode)

| dimension     | status     | value |
|---------------|------------|-------|
| decade        | rolled     | 2025-now |
| craft         | anchored   | generative-computational (captured constellation) |
| register      | inherited  | manifesto / premium-dark |
| ground-family | inherited  | pure-black (Mode C override = brand-faithful) |
| font deck     | inherited  | PP Neue Montreal stack |
| palette       | inherited  | existing 4-color set |

Brand-faithful inversions logged in `DESIGN.json.extensions.divergence.brand_faithful_inversions`:
pure-#000000 (no-pure-black waived), pure-#ffffff (no-pure-white waived), hex
color format (OKLCH-only waived — Stitch round-trip, no P3), single-family type
(two-families reflex relaxed — identity preservation).

## Per-variant resolution

### Variant A — faithful + improvements (DESIGN-A.{md,json})
Role: risk-averse green-light. Strict Mode A; static (no motion block). Applies
all five items from `stardust/prototypes/home-improvements.md` exactly: hero
product moment (single CTA kept), numbered eyebrows, weight+modular-scale
hierarchy, restrained investor/team treatment + fixed bare-"here" link, light
constellation reprise. IA + section sequence identical to capture.

### Variant B — display-typography amplified (DESIGN-B.{md,json})
Role: design-team motivator. Captured trait amplified: display-typography
signature. Static (no motion block). 1.333 modular scale; full 200→600 weight
range (Light 200 body, SemiBold 600 heads); type-led hero (no product panel);
mid-page type-specimen ladder replaces investor strip + team slider;
constellation suppressed. North Star "The Specimen in the Dark".

### Variant C — signature-gesture extension (DESIGN-C.{md,json})
Role: visionary pitch. Captured trait amplified: generative-particle
constellation. **Cinematic — only variant with `extensions.motion`, register
`arrival`, registerSource `auto`.** IA identical to A; the bet is motion. Three
structural deltas vs A (so C is not "A under different chrome"): live-particle
hero composition, constellation-divider system, footer-wordmark constellation
wipe. North Star "The Constellation as Spine". All motion gated behind
`prefers-reduced-motion`.

## Validators (Phase 4)

- **Mode A pinning** — PASS. Palette + type identical across base/A/B/C; B
  changes only scale ratio (still a captured weight/family).
- **IA-priority preservation audit** — PASS. Single `Request Access` → Typeform
  funnel preserved in all variants; hero stays first viewport; closing CTA stays
  terminal. Recorded in each `extensions.iaPriorities`.
- **Density floor** — PASS. Resolved `sectionPadding.desktop = 64px` in every
  variant; captured 120px reduced.
- **Anti-toolbox audit** — PASS. No editorial-register costume vocabulary; no
  invented color/font; eyebrows are mixed-case numbered wayfinding, not
  tracked-uppercase scaffolding.
- **Variant differentiation (≥2 substantive changes per pair)** — PASS.
  A↔B: hero layout strategy + mid-page section layout/presence + type scale.
  A↔C: hero composition + constellation-divider system (new) + footer-wordmark
  treatment (motion scaffolding is structural). B↔C: amplified trait (type vs
  motif) + hero composition + scale ratio + motion presence.
- **C-cliff refusal check** — PASS. C is defined against the captured
  generative-particle-constellation trait, not "B but more" / size-as-personality
  / padding-as-personality. Recorded in `DESIGN-C.json.extensions.cCliffCheck`.

## extensions.motion (DESIGN-C.json only)

```json
{
  "register": "arrival",
  "registerSource": "auto",
  "registerRationale": "PRODUCT.md Brand Personality is brand-register with a cinematic/aspirational formal voice introducing an entity; arrival is the heuristic default + maps one-to-one onto the captured signature moves. No --cinematic-register override supplied.",
  "easings":   { "entrance": "cubic-bezier(0.25, 0.46, 0.45, 0.94)", "transition": "cubic-bezier(0.42, 0, 0, 1)" },
  "durations": { "enter": 700, "stagger": 90 },
  "parallax":  { "translate": 35, "fade": 0.55, "rangeStart": 0, "range": 80 }
}
```

Variants A and B carry no `extensions.motion` block (static).
