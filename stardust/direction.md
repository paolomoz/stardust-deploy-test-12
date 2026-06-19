---
_provenance:
  writtenBy: stardust:uplift (Phase 3)
  writtenAt: 2026-06-19
  againstInput: https://www.duolingo.com/
  readArtifacts:
    - stardust/uplift-improvements.md
    - stardust/uplift-questions.md
    - stardust/current/PRODUCT.md
    - stardust/current/_brand-extraction.json
---

# Direction — Duolingo uplift (3 variants)

**Mode A (brand-faithful).** Palette pinned to the captured Duolingo tokens
(owl-green `#58CC02`, macaw `#1CB0F6`, fox `#FF9600`, cardinal `#FF4B4B`,
bee `#FFC800`, beetle `#CE82FF`, eel `#4B4B4B`, navy `#100F3E`). Type pinned
to Feather Bold (display) + DIN-round geometric sans (body). No invented
colors or fonts.

**Cinematic register for C:** `arrival` — selected per
`motion-registers.md` § Selection heuristic. Duolingo's homepage is a
`brand`-register marketing surface introducing the brand; `arrival` is the
default for that class and is the register that naturally amplifies C's
candidate (signature-gesture extension) through motion. `kinetic-display`
was the runner-up (Feather is a display-type signature) but is held back
from C deliberately so it does not collide with B's static type bet.

---

## Variant A — Faithful + improvements

Role: risk-averse green-light. "Yes, that's us, with the obvious fixes."
Composition: same IA as captured (hero → feature claims → app download →
Super → products → closing CTA → green footer).
Motion: static (no cinematic layer).
Improvements applied (from `uplift-improvements.md`):
1. Hero `<h1>` promoted to the top of the type ladder (64px Feather, owl-green) so the core promise out-ranks the section headings.
2. Break the all-identical alternating rows — lead claim goes hero-scale, the rest compress.
3. Cluster the three product cross-sells (English Test / Schools / ABC) into one compact "more from Duolingo" band.
4. Surface the missing proof: a learner-count + gamification stat band (streaks, XP, "#1 way to learn").
5. One unmistakable primary pushable CTA per viewport; sign-in + language demoted to quiet links.

## Variant B — What if we amplified Feather Bold?

Role: design-team motivator. The brand's underused typographic capability foregrounded.
What if: "What if Feather Bold stopped being a heading font and became the page's structure — poster-scale lowercase type carrying the whole composition?"
Captured trait amplified: **Display-typography amplification** (candidate 1).
Evidence: `feather` (Feather Bold 700), a proprietary rounded display face, used only as ordinary 48–64px headings.
Composition: type-as-layout. Oversized lowercase Feather headlines (clamp up to ~140px) become the structural grid; claims set as huge type with the illustration as a supporting accent rather than a 50/50 partner. An indexed, editorial-poster cadence replaces the alternating rows.
Motion: static (no cinematic layer).

## Variant C — What if motion was part of the identity?

Role: visionary pitch. The brand's third dimension — kinetic.
What if: "What if the pushable button and Duo stopped being decorations and became a kinetic system — the page itself springs, rises, and counts up like a lesson you're leveling through?"
Cinematic register: `arrival` (auto-picked from PRODUCT.md Brand Personality).
Captured trait amplified: **Signature-gesture extension** (candidate 4) — the pushable 3D button + the mascot/character clusters.
Evidence: pushable button (`box-shadow: 0 4px 0 shade`, compress on press) and floating Duo + cast illustration clusters, both used only incidentally on the captured page.
Composition: identical IA to A; the bet is motion, not layout.
Motion: cinematic, register `arrival` — parallaxing illustration clusters, per-section rising-plate entrances with stagger, hero text enterUp stagger, count-up gamification numerals (learners / streak / XP), depress-on-press buttons everywhere, green-footer wordmark wipe-up. Bouncy/overshoot easing tuned to honor Duolingo's springy delight. Full `prefers-reduced-motion` neutralization.

---

## Differentiation (≥2 changes per pair)

- **A vs B:** type scale (modest → poster), layout primitive (alternating rows → type-as-structure indexed cadence). ✓
- **A vs C:** motion layer (static → arrival cinematic), gesture system (incidental → kinetic pushable/mascot), count-up stat treatment. ✓
- **B vs C:** axis of the bet (static typographic composition vs. motion gesture), composition (poster type-grid vs. same-as-A IA + motion). ✓
