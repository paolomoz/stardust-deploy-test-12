<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-06-19T06:37:00Z
  page:             home
  pageUrl:          https://dala.craftedbygc.com/
  variant:          C
  againstDirection: stardust/direction.md (Active 2026-06-19T05:20:00Z)
  consumedBy:       impeccable:craft
  readArtifacts:
    - stardust/current/pages/home.json
    - stardust/current/_brand-extraction.json
    - DESIGN-C.md
    - DESIGN-C.json
    - stardust/direction.md
  _provenance:
    capturedSourceLineage:
      - "header — site-wide system-component (carried from pages/home.json#landmarks[header] + nav)"
      - "hero — derived from captured landing section (children[0]); C makes it a live generative particle field (amplifies motifs.patterns.generative-particle-hero)"
      - "mission/confidence — derived from captured introduction + problem prose (children[1]+[2])"
      - "lightbulb — derived from captured 'Spark lightbulb moments' section (children[3])"
      - "better-world — derived from captured 'Build a better world of work' section (children[4])"
      - "team — derived from captured team section (children[5]); calm static grid as A"
      - "investors — derived from captured 'Our investors' block (children[5]); restrained text as A"
      - "closing-cta — derived from captured footer head (children[6])"
      - "constellation-dividers — direction-authorized new (DESIGN-C signature system; amplifies the captured generative-particle motif into the structural spine — justified by direction.md Variant C 'constellation-divider system')"
      - "footer — site-wide system-component (carried from footer bar); C adds the constellation-wordmark convergence wipe (direction-authorized, DESIGN-C signature)"
    antiTemplatePass:
      - pattern: "hero composition"
        defaultReflex: "static particle-cloud raster backdrop with overlaid headline / og:image hero"
        alternatives: ["captured static particle hero", "live generative canvas particle field with scroll parallax", "video-loop hero"]
        picked: "live generative canvas particle field with scroll parallax"
        rationale: "C amplifies the captured generative-particle-hero motif as the structural spine; a live canvas field (not the og:image raster) IS the captured signature gesture made kinetic — particles parallax up and seed the headline enterUp stagger (arrival register)"
      - pattern: "section transitions"
        defaultReflex: "plain whitespace section breaks"
        alternatives: ["plain 64px black breaks (A)", "constellation-divider system — drifting points resolving into a diamond node as the next section rises", "hairline rules"]
        picked: "constellation-divider system"
        rationale: "the divider system is C's structural differentiation from A; it threads the captured constellation motif through every transition (DESIGN-C signature), giving the page a kinetic spine"
      - pattern: "footer wordmark"
        defaultReflex: "static logo wordmark in footer (captured)"
        alternatives: ["static wordmark (A)", "constellation-convergence wipe — points converge into the 'Dala' letterforms on reveal", "fade-in wordmark"]
        picked: "constellation-convergence wipe"
        rationale: "resolves the scattered-fragments-into-shared-knowledge thesis at the page's end via clip-path wipe-up (arrival footer wordmark move); reduced-motion renders the resolved static wordmark"
    surpriseTier_typeScaleYields: []
    voiceClassification:
      - { section: header, classification: captured-verbatim, source: "pages/home.json#landmarks[header]" }
      - { section: hero, classification: captured-verbatim, copy: "Unlock collective wisdom.", source: "pages/home.json hero" }
      - { section: mission-confidence, classification: captured-verbatim, source: "pages/home.json children[1]+[2]" }
      - { section: lightbulb, classification: captured-verbatim, source: "pages/home.json children[3]" }
      - { section: better-world, classification: captured-verbatim, source: "pages/home.json children[4]" }
      - { section: team, classification: captured-verbatim, source: "pages/home.json children[5]" }
      - { section: investors, classification: captured-verbatim, copy: "Seedcamp, Evening Fund, Valia Ventures, James Meekings, Roman Schumacher", source: "pages/home.json investors block" }
      - { section: closing-cta, classification: captured-verbatim, copy: "Your workplace has the answer. Ask Dala to find it.", source: "pages/home.json children[6]" }
      - { section: footer, classification: captured-verbatim, source: "pages/home.json footer bar" }
      - { section: eyebrows, classification: "direction-authorized rewrite", copy: "01–06 numbered mixed-case (as A)", source: "improvement #2" }
      - { section: constellation-dividers, classification: "direction-authorized chrome", source: "DESIGN-C signature system; decorative motion scaffolding, carries no prose" }
    substrateTransitions:
      default: "pure-black (#000000) across the entire page"
      exceptions: []
    compositionDelta_vs_A:
      - "hero composition: live-particle generative canvas field with scroll parallax (C) vs static split manifesto + product-moment panel (A)"
      - "section transitions: constellation-divider system resolving into diamond nodes as sections rise+stagger (C) vs plain 64px black breaks with light constellation accent (A)"
      - "footer wordmark: constellation-convergence clip-path wipe (C) vs static wordmark (A)"
      - "motion: cinematic arrival register — hero parallax, rising plates, staggered per-section entrances, count-ups (C) vs fully static (A)"
    compositionDelta_vs_B:
      - "amplified trait: generative-particle constellation, motion-as-identity (C) vs display-typography signature, type-as-interface (B)"
      - "hero: live-particle generative field with parallax (C) vs type-led static headline, constellation suppressed (B)"
      - "type-scale ratio: 1.25 inherited from A (C) vs 1.333 (B)"
      - "motion: cinematic arrival register (C) vs static (B)"
      - "mid-page: A's IA preserved (team grid + investor text) with constellation dividers (C) vs type-specimen ladder replacing slider+strip (B)"
  stardustVersion: 0.10.0
-->
---
slug: home
url: https://dala.craftedbygc.com/
variant: C
register: brand
surprise: high
dominantDimension: motion/constellation-spine
motionRegister: arrival
---

# Page shape: home — Variant C (The Constellation as Spine)

Role: visionary pitch. IA identical to A; the bet is **motion**. The captured
generative-particle constellation stops being a hero backdrop and becomes the
brand's structural voice — threading from the first viewport through every
section divider and resolving in the footer wordmark. Cinematic register
`arrival`. Every motion element neutralised under `prefers-reduced-motion`.

## Sections (in render order)

1. **header** (system-component role: `header`) — same chrome as A; gains the
   `arrival` nav-scrolled state.
2. **hero** — **live-particle generative field**. A canvas renders the
   constellation (purple / gold-tint white / white points on black) drifting and
   coalescing toward a luminous diamond. The giant manifesto headline "Unlock
   collective wisdom." overlays with an `enterUp` stagger (eyebrow → title →
   subcopy, 90ms) seeded by the field. Single "Request Access" pill above the
   field at full contrast. Particles parallax upward (`[data-parallax]`) on
   scroll; a post-hero plate rises faster, covering the field.
3. **constellation-divider** — drifting points resolving into a diamond node as
   section 4 rises and staggers in. (Repeats between each major section.)
4. **mission-confidence** — eyebrow "02". "Make decisions with confidence" +
   captured problem prose; `[data-anim]` staggered entrance.
5. **constellation-divider**
6. **lightbulb** — eyebrow "03". "Spark lightbulb moments" + captured prose.
7. **constellation-divider**
8. **better-world** — eyebrow "04". "Build a better world of work" + captured
   prose; "being better." link → Medium.
9. **constellation-divider**
10. **team** — eyebrow "05 — Our team". Calm static 3-up portrait grid (as A;
    captured portraits, roles, socials) + "Build with us." hiring block with
    careers@dala.ai and the fixed "Read more about our values" link.
11. **constellation-divider**
12. **investors** — eyebrow "06 — Our investors". Restrained text investor list
    (as A); supporting copy.
13. **closing-cta** — "Your workplace has the answer. Ask Dala to find it." +
    single "Request Access" pill.
14. **footer** (system-component role: `footer`) — the "Dala" wordmark composed
    of constellation points that **converge into the letterforms** on reveal
    (footer-wordmark clip-path wipe-up). © 2021 Dala Technologies Limited, nav +
    socials.

## Layout strategy

- Density: balanced. `sectionPadding.desktop = 64px` (density floor; arrival's
  >96px refusal honored — the captured 120px does not carry forward).
- Pure black ground throughout. Type scale 1.25 (inherited from A; C's
  differentiation is motion, not type).
- Hero parallax disabled <768px; constellation field becomes a static
  end-state frame on mobile.

## Motion stack (arrival register)

- **Hero:** particle canvas + `enterUp` headline stagger + `[data-parallax]`
  upward pull (translate −35vh) + rising post-hero plate.
- **Per-section:** `[data-anim]` fade + translateY(40px) staggered across band
  peers (stagger 90ms).
- **Constellation dividers:** drifting points → diamond node on scroll into view
  (decorative; reduced-motion = static resolved diamond).
- **Footer wordmark:** `clip-path: inset(N% 0 0 0)` wipe-up driven by scroll
  progress; converges constellation points into letterforms.
- **No** `[data-flip]`, `[data-fill]`, `.live-sweep`, tickers (arrival refuses
  these — register-match clean).
- **Reduced-motion:** every motion element neutralised → static legible
  end-state (resolved constellation frame, full headline, full wordmark).
- **No-JS:** `<noscript>` forces all motion-hidden states visible.

## Key states

- Default — described above.
- Reduced-motion — static legible end-state of every section + resolved
  constellation frame + resolved footer wordmark.
- No-JS — identical to the static end-state via `<noscript>` override.

## Interaction model

- "Request Access" → `https://askdala.typeform.com/to/lSujgyr8`.
- Nav anchors, team socials, Medium links — as captured.
- Lenis smooth scroll (gated off under reduced-motion).
- Mobile-nav a11y toggle.

## Data attributes

- `header[data-section="header"][data-intent="navigate"][data-layout="contained"][data-nav-collapse="hamburger"]`
- `section[data-section="hero"][data-intent="emotional hook"][data-layout="full-bleed"][data-media="animation"]`
- `section[data-section="mission-confidence"][data-intent="frame the problem"][data-layout="stack"]`
- `section[data-section="lightbulb"][data-intent="explain mechanic"][data-layout="stack"]`
- `section[data-section="better-world"][data-intent="state mission"][data-layout="stack"]`
- `section[data-section="team"][data-intent="build trust"][data-layout="grid"][data-items="3"][data-media="image"]`
- `section[data-section="investors"][data-intent="build trust"][data-layout="stack"]`
- `section[data-section="closing-cta"][data-intent="drive action"][data-layout="contained"]`
- `footer[data-section="footer"][data-intent="navigate"][data-layout="contained"]`
- Constellation dividers carry `data-section="constellation-divider"
  data-intent="motion spine" data-layout="full-bleed" data-media="animation"`.

Motion leaf attributes (`[data-anim]`, `[data-parallax]`, `[data-countup]`) are
applied in Phase 2.4 to the cinematic file only; the static `-proposed.html`
carries only the structural attributes above.

## Unsourced content (placeholder list)

(none)

All prose traces to `pages/home.json`. The constellation is generative motion
chrome, carries no factual claims. No fabricated stats/quotes/portraits beyond
captured assets.

## Open questions for craft

- Constellation render: 2D canvas particle system (preferred — light, no WebGL
  dependency, degrades to static frame) vs CSS-only dot field.
- Divider node count: keep each divider a thin band (~120px) so the dividers
  punctuate without dominating the manifesto prose.
