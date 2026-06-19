<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-06-19T06:36:00Z
  page:             home
  pageUrl:          https://dala.craftedbygc.com/
  variant:          B
  againstDirection: stardust/direction.md (Active 2026-06-19T05:20:00Z)
  consumedBy:       impeccable:craft
  readArtifacts:
    - stardust/current/pages/home.json
    - stardust/current/_brand-extraction.json
    - DESIGN-B.md
    - DESIGN-B.json
    - stardust/direction.md
  _provenance:
    capturedSourceLineage:
      - "header — site-wide system-component (carried from pages/home.json#landmarks[header] + nav)"
      - "hero — derived from captured landing section (children[0]); B re-typesets it type-led, no product panel, constellation suppressed"
      - "mission/confidence — derived from captured introduction + problem prose (children[1]+[2])"
      - "lightbulb — derived from captured 'Spark lightbulb moments' section (children[3])"
      - "better-world — derived from captured 'Build a better world of work' section (children[4])"
      - "specimen-ladder — derived from captured team section + investors block (children[5]); direction-authorized: replaces slider+strip with an oversized type-specimen ladder per DESIGN-B"
      - "team-credits — derived from captured team names/roles (children[5]); rendered as a typographic credit block, not a portrait grid"
      - "closing-cta — derived from captured footer head (children[6])"
      - "footer — site-wide system-component (carried from footer bar)"
    antiTemplatePass:
      - pattern: "hero composition"
        defaultReflex: "centered-stack hero / particle-cloud backdrop with overlaid headline"
        alternatives: ["captured particle hero", "type-led oversized headline owning the viewport, constellation suppressed", "split type + specimen sidebar"]
        picked: "type-led oversized headline owning the viewport, constellation suppressed"
        rationale: "B amplifies the captured single-family display-typography signature; the letterforms ARE the composition, so imagery is removed to let type own the first viewport (DESIGN-B North Star 'The Specimen in the Dark')"
      - pattern: "team portrait slider"
        defaultReflex: "horizontal portrait carousel (captured)"
        alternatives: ["captured slider", "static portrait grid (A's move)", "typographic credit block — names as oversized type, no portraits"]
        picked: "typographic credit block — names as oversized type, no portraits"
        rationale: "B's amplification is type-as-interface; founders render as oversized stepping names in the specimen ladder, differentiating structurally from A's portrait grid"
      - pattern: "investor logo strip"
        defaultReflex: "5-up decorative logo-PNG strip (captured)"
        alternatives: ["captured PNG strip", "restrained text list (A's move)", "specimen-ladder line — investor signal as one oversized typeset beat"]
        picked: "specimen-ladder line — investor signal as one oversized typeset beat"
        rationale: "the mid-page type-specimen ladder absorbs the investor beat as oversized type; no logos, no portraits — type carries it"
      - pattern: "mission prose blocks"
        defaultReflex: "uniform body-copy paragraphs at one weight (captured weight-400 flatness)"
        alternatives: ["captured uniform 400 prose", "Light-200 body with 600 heads (Full-Range Rule)", "all-caps tracked manifesto"]
        picked: "Light-200 body with 600 heads (Full-Range Rule)"
        rationale: "amplifies the captured-but-unexercised 200/400/600 weight range; Light 200 atmospheric body vs SemiBold 600 structural heads is the trait amplification, not all-caps costume"
    surpriseTier_typeScaleYields:
      - rule: "base modular scale 1.25"
        variantDominantDimension: "type/display-specimen-scale"
        capturedTraitAmplified: "single-family display-typography signature exercised across full weight range"
        yieldedTo: "1.333 (perfect fourth)"
        rationale: "DESIGN-B overrides the base 1.25 to 1.333 to give the display steps real drama while staying a fixed modular system; the captured ad-hoc scale is retired either way"
    voiceClassification:
      - { section: header, classification: captured-verbatim, source: "pages/home.json#landmarks[header]" }
      - { section: hero, classification: captured-verbatim, copy: "Unlock collective wisdom.", source: "pages/home.json hero" }
      - { section: mission-confidence, classification: captured-verbatim, source: "pages/home.json children[1]+[2]" }
      - { section: lightbulb, classification: captured-verbatim, source: "pages/home.json children[3]" }
      - { section: better-world, classification: captured-verbatim, source: "pages/home.json children[4]" }
      - { section: specimen-ladder, classification: captured-verbatim, copy: "investor names + mission beats re-typeset; copy unchanged", source: "pages/home.json children[5] investors + mission prose" }
      - { section: team-credits, classification: captured-verbatim, copy: "Haroun Hickman / Poppy Reid / Joel Kang + roles", source: "pages/home.json children[5]" }
      - { section: closing-cta, classification: captured-verbatim, copy: "Your workplace has the answer. Ask Dala to find it.", source: "pages/home.json children[6]" }
      - { section: footer, classification: captured-verbatim, source: "pages/home.json footer bar" }
      - { section: eyebrows, classification: "direction-authorized rewrite", copy: "01–06 numbered, tighter/smaller than A", source: "improvement #2 amplified per DESIGN-B" }
    substrateTransitions:
      default: "pure-black (#000000) across the entire page"
      exceptions: []
    compositionDelta_vs_A:
      - "hero-layout: type-led oversized-headline-only, no product panel, constellation suppressed (B) vs split manifesto-left + product-moment-right (A)"
      - "mid-page: type-specimen ladder of oversized stepping lines replacing investor strip + team slider (B) vs prose-with-eyebrows + static portrait grid + text investor list (A)"
      - "type-scale ratio: 1.333 perfect fourth (B) vs 1.25 minor third (A)"
      - "body weight: Light 200 atmospheric body (B) vs Regular 400 body (A)"
      - "team treatment: typographic credit block, names as oversized type (B) vs static portrait grid with photos (A)"
    compositionDelta_vs_C:
      - "amplified trait: display-typography signature, type-as-interface (B) vs generative-particle constellation, motion-as-identity (C)"
      - "hero: type-led static, constellation suppressed (B) vs live-particle generative field with parallax (C)"
      - "type-scale ratio: 1.333 (B) vs 1.25 inherited from A (C)"
      - "motion: static (B) vs cinematic arrival register (C)"
      - "mid-page: type-specimen ladder replacing slider+strip (B) vs A's IA preserved with constellation dividers added (C)"
  stardustVersion: 0.10.0
-->
---
slug: home
url: https://dala.craftedbygc.com/
variant: B
register: brand
surprise: medium
dominantDimension: type/display-specimen-scale
---

# Page shape: home — Variant B (Type as Interface)

Role: design-team motivator. Amplifies the captured display-typography
signature — one private typeface across the full 200→600 weight range on a
strict 1.333 modular scale. Oversized type, not imagery, is the layout. Same
content set, re-typeset IA. Static.

## Sections (in render order)

1. **header** (system-component role: `header`) — same chrome as A but eyebrow/
   nav type tighter; logo wordmark left, links + "Request Access" pill right.
2. **hero** — **type-led**. The manifesto headline "Unlock collective wisdom."
   at the top modular step (Display 600, clamp up to 9rem, line-height 0.96) is
   the entire composition — no product panel, constellation suppressed to a
   near-static faint backdrop (or absent). Eyebrow + subcopy in Light 200, single
   "Request Access" pill.
3. **mission-confidence** — eyebrow "02". "Make decisions with confidence"
   (Headline 600) over Light-200 problem prose. Full-Range Rule on display here.
4. **lightbulb** — eyebrow "03". "Spark lightbulb moments" + Light-200 solution
   prose.
5. **better-world** — eyebrow "04". "Build a better world of work" + Light-200
   mission prose; "being better." link → captured Medium article.
6. **specimen-ladder** (signature; replaces captured investor strip + team
   slider) — the mission/investor beats re-typeset as an oversized specimen
   ladder: each beat one line stepping down the 1.333 scale, weight shifting from
   SemiBold 600 heads to Light 200 body. Absorbs the "Our investors" beat
   (Seedcamp, Evening Fund, Valia Ventures + named operators) as oversized type.
   No logos. No portrait carousel.
7. **team-credits** — eyebrow "05 — Our team". Founders render as oversized
   stepping **names** (Haroun Hickman / Poppy Reid / Joel Kang) with roles set
   small in muted gray and Twitter/LinkedIn links — a typographic credit block,
   not a portrait grid. Plus the "Build with us." hiring beat with careers@dala.ai
   and the fixed descriptive "Read more about our values" link.
8. **closing-cta** — "Your workplace has the answer. Ask Dala to find it." at a
   high modular step + single "Request Access" pill.
9. **footer** (system-component role: `footer`) — Dala wordmark, © 2021 Dala
   Technologies Limited, nav + socials.

## Layout strategy

- Density: balanced. `sectionPadding.desktop = 64px` (density floor holds even
  with oversized type). Type scale: modular 1.333.
- Pure black ground throughout. Light 200 body, SemiBold 600 heads, Regular 400
  sub-heads — Full-Range Rule on every long section.
- Oversized hero headline wraps responsively; ladder lines reflow at <900px.

## Key states

- Default — described above.
- Loading / Error — N/A for static page.

## Interaction model

- "Request Access" → `https://askdala.typeform.com/to/lSujgyr8`.
- Nav anchors, team socials, Medium links — as captured.
- No JS beyond mobile-nav a11y toggle.

## Data attributes

- `header[data-section="header"][data-intent="navigate"][data-layout="contained"][data-nav-collapse="hamburger"]`
- `section[data-section="hero"][data-intent="emotional hook"][data-layout="stack"][data-media="none"]`
- `section[data-section="mission-confidence"][data-intent="frame the problem"][data-layout="stack"]`
- `section[data-section="lightbulb"][data-intent="explain mechanic"][data-layout="stack"]`
- `section[data-section="better-world"][data-intent="state mission"][data-layout="stack"]`
- `section[data-section="specimen-ladder"][data-intent="state mission"][data-layout="stack"][data-items="4"]`
- `section[data-section="team-credits"][data-intent="build trust"][data-layout="stack"][data-items="3"]`
- `section[data-section="closing-cta"][data-intent="drive action"][data-layout="contained"]`
- `footer[data-section="footer"][data-intent="navigate"][data-layout="contained"]`

## Unsourced content (placeholder list)

(none)

All copy traces to `pages/home.json`. No portraits, no logos, no invented stats.
Investor and founder names are captured-verbatim.

## Open questions for craft

- Specimen ladder: render investor names and mission beats as one continuous
  stepping ladder, or two grouped ladders (mission / backers)? Prefer one
  continuous ladder for the "specimen" reading.
- Hero constellation: suppress to faint static dot-field backdrop vs remove
  entirely. Prefer faint backdrop so the brand thesis is not fully erased.
