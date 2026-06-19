<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-06-19T06:35:00Z
  page:             home
  pageUrl:          https://dala.craftedbygc.com/
  variant:          A
  againstDirection: stardust/direction.md (Active 2026-06-19T05:20:00Z)
  consumedBy:       impeccable:craft
  readArtifacts:
    - stardust/current/pages/home.json
    - stardust/current/_brand-extraction.json
    - DESIGN-A.md
    - DESIGN-A.json
    - stardust/direction.md
    - stardust/prototypes/home-improvements.md
  _provenance:
    capturedSourceLineage:
      - "header — site-wide system-component (carried from pages/home.json#landmarks[header] + nav)"
      - "hero — derived from captured landing section (pages/home.json#landmarks[main].children[0]); improvement #1 pairs manifesto headline with a concrete product moment"
      - "mission/confidence — derived from captured introduction + problem-prose section (children[1]+[2])"
      - "lightbulb — derived from captured 'Spark lightbulb moments' manifesto section (children[3])"
      - "better-world — derived from captured 'Build a better world of work' manifesto section (children[4])"
      - "team — derived from captured team section (children[5]); improvement #4 replaces slider with calm static grid"
      - "investors — derived from captured 'Our investors' logo strip (children[5] investors block); improvement #4 replaces decorative PNG strip with restrained text treatment"
      - "closing-cta — derived from captured footer head (children[6])"
      - "footer — site-wide system-component (carried from pages/home.json#landmarks[main].children[6] footer bar)"
    antiTemplatePass:
      - pattern: "hero composition"
        defaultReflex: "centered-stack hero with two-button CTA pair / stealth-teaser single headline over particle cloud"
        alternatives: ["centered stealth teaser (captured — rejected by improvement #1)", "split manifesto-left + product-moment-right", "stacked headline then product strip below"]
        picked: "split manifesto-left + product-moment-right"
        rationale: "improvement #1 demands a concrete product moment alongside the manifesto headline while keeping a single CTA; split preserves the giant headline as protagonist and adds the product glimpse without a second conversion verb"
      - pattern: "team portrait slider"
        defaultReflex: "horizontal portrait carousel (captured)"
        alternatives: ["captured slider", "calm static 3-up grid", "single-column stacked portraits"]
        picked: "calm static 3-up grid"
        rationale: "improvement #4 retires the slider; static grid honors the flat no-shadow doctrine and removes 14 captured carousels of cognitive load"
      - pattern: "investor logo strip"
        defaultReflex: "5-up decorative logo-PNG strip (captured)"
        alternatives: ["captured logo PNG strip", "named investors as restrained text list", "single sentence with named backers inline"]
        picked: "named investors as restrained text list"
        rationale: "improvement #4 retires the decorative PNG marks; the captured names (Seedcamp, Evening Fund, Valia Ventures + two named operators) are real and stated on-brand in muted type"
    surpriseTier_typeScaleYields: []
    voiceClassification:
      - { section: header, classification: captured-verbatim, source: "pages/home.json#landmarks[header]" }
      - { section: hero, classification: captured-verbatim, copy: "Unlock collective wisdom. / STOP MANAGING KNOWLEDGE. START USING IT. / Plug into your team's shared brainpower...", source: "pages/home.json hero" }
      - { section: mission-confidence, classification: captured-verbatim, source: "pages/home.json children[1]+[2]" }
      - { section: lightbulb, classification: captured-verbatim, source: "pages/home.json children[3]" }
      - { section: better-world, classification: captured-verbatim, source: "pages/home.json children[4]" }
      - { section: team, classification: captured-verbatim, source: "pages/home.json children[5] (names, roles, socials, careers copy)" }
      - { section: investors, classification: captured-verbatim, copy: "Seedcamp, Evening Fund, Valia Ventures, James Meekings, Roman Schumacher", source: "pages/home.json main.innerText investors block" }
      - { section: closing-cta, classification: captured-verbatim, copy: "Your workplace has the answer. Ask Dala to find it.", source: "pages/home.json children[6]" }
      - { section: footer, classification: captured-verbatim, source: "pages/home.json footer bar" }
      - { section: eyebrows, classification: "direction-authorized rewrite", copy: "01 — Manifesto / 02 — The problem / 03 — Lightbulb moments / 04 — A better world of work / 05 — Our team / 06 — Our investors", source: "improvement #2 numbered mixed-case eyebrows" }
    substrateTransitions:
      default: "pure-black (#000000) across the entire page"
      exceptions: []
    compositionDelta_vs_B:
      - "hero-layout: split manifesto-left + product-moment-right (A) vs type-led oversized-headline-only, no product panel (B)"
      - "mid-page mission sections: prose-with-eyebrows narrative (A) vs type-specimen ladder oversized stepping lines (B)"
      - "type-scale ratio: 1.25 minor third (A) vs 1.333 perfect fourth (B)"
      - "investors+team: restrained text list + static portrait grid (A) vs both replaced by the type-specimen ladder (B)"
    compositionDelta_vs_C:
      - "hero composition: static split manifesto+product-moment (A) vs live-particle generative hero field with parallax (C)"
      - "section transitions: plain 64px black breaks with light constellation accent (A) vs full constellation-divider system resolving into diamond nodes (C)"
      - "footer wordmark: static 'Dala' wordmark (A) vs footer-wordmark constellation convergence wipe (C)"
      - "motion: static (A) vs cinematic arrival register, hero parallax + staggered entrances (C)"
  stardustVersion: 0.10.0
-->
---
slug: home
url: https://dala.craftedbygc.com/
variant: A
register: brand
surprise: low
dominantDimension: composition/faithful-improved-narrative
---

# Page shape: home — Variant A (Faithful + Improvements)

Role: risk-averse green-light. Same IA as captured (hero → mission/confidence →
lightbulb → better-world → team → investors → closing CTA), applying all five
improvements from `home-improvements.md` exactly, no more. Static.

## Sections (in render order)

1. **header** (system-component role: `header`) — full-width, pure-black, Dala
   logo wordmark left; Manifesto / Team / Blog links (muted gray) right; purple
   "Request Access" pill → Typeform. Mobile: circular purple nav-toggle.
2. **hero** — split layout (~6/5). Left: numbered-free giant manifesto headline
   "Unlock collective wisdom." (Display 600) + eyebrow "STOP MANAGING KNOWLEDGE.
   START USING IT." + subcopy + single "Request Access" pill. Right: a concrete
   **product moment** — a restrained on-brand mock of Dala's ask-and-answer
   search surface (a query line "Ask Dala…" + a resolved-answer card), rendered
   from the captured product description (NOT a fabricated screenshot; a
   stylized representation of the captured "ask Dala to instantly find anything"
   behavior). Improvement #1. A light constellation accent sits behind, not a
   full live field.
3. **mission-confidence** — eyebrow "02 — The problem". Headline "Make decisions
   with confidence" (Headline 600) + the captured problem prose (6 paragraphs:
   "This is your workplace today…" through "…vast amounts of information").
4. **lightbulb** — eyebrow "03 — Lightbulb moments". Headline "Spark lightbulb
   moments" + captured 3-paragraph solution prose.
5. **better-world** — eyebrow "04 — A better world of work". Headline "Build a
   better world of work" + captured 3-paragraph mission prose. The "being
   better." link → the captured Medium article.
6. **team** — eyebrow "05 — Our team". Headline "Our team". Calm **static 3-up
   grid** (improvement #4, no slider) of the three founders with captured
   portraits (haroun/poppy/joel), roles, and Twitter/LinkedIn links. Plus the
   "Build with us." hiring block with the careers@dala.ai mail and a **fixed**
   descriptive link "Read more about our values" (improvement #4, retires bare
   "here").
7. **investors** — eyebrow "06 — Our investors". Headline "Our investors" +
   captured supporting copy. Investors stated as a **restrained on-brand text
   list** (Seedcamp, Evening Fund, Valia Ventures, with named operators James
   Meekings and Roman Schumacher), NOT the decorative 5-PNG logo strip
   (improvement #4).
8. **closing-cta** — "Your workplace has the answer. Ask Dala to find it."
   (Title/Headline) + the single "Request Access" pill.
9. **footer** (system-component role: `footer`) — Dala wordmark, © 2021 Dala
   Technologies Limited, Manifesto/Team/Blog/Privacy/Terms nav (muted gray),
   LinkedIn/Twitter/Email socials.

## Layout strategy

- Density: balanced. `sectionPadding.desktop = 64px` (density floor; captured
  120px does not carry forward). Tablet 48px, mobile 32px.
- Pure black ground throughout. Body prose at 65–75ch.
- Hero split inverts to stacked at <1024px (product moment below headline).
- Type scale: modular 1.25.

## Key states

- Default — described above.
- Empty (no team) — N/A; team data captured.
- Loading / Error — N/A for static page.

## Interaction model

- Header + closing "Request Access" → `https://askdala.typeform.com/to/lSujgyr8`.
- Nav anchor links → in-page section anchors.
- Team socials → captured Twitter/LinkedIn URLs.
- "being better." / "Read more about our values" → captured Medium URLs.
- No JS interactions beyond the mobile-nav a11y toggle.

## Data attributes

- `header[data-section="header"][data-intent="navigate"][data-layout="contained"][data-nav-collapse="hamburger"]`
- `section[data-section="hero"][data-intent="emotional hook"][data-layout="split-media"][data-items="1"][data-media="image"]`
- `section[data-section="mission-confidence"][data-intent="frame the problem"][data-layout="stack"]`
- `section[data-section="lightbulb"][data-intent="explain mechanic"][data-layout="stack"]`
- `section[data-section="better-world"][data-intent="state mission"][data-layout="stack"]`
- `section[data-section="team"][data-intent="build trust"][data-layout="grid"][data-items="3"][data-media="image"]`
- `section[data-section="investors"][data-intent="build trust"][data-layout="stack"]`
- `section[data-section="closing-cta"][data-intent="drive action"][data-layout="contained"]`
- `footer[data-section="footer"][data-intent="navigate"][data-layout="contained"]`

## Unsourced content (placeholder list)

(none)

All literal copy traces to `pages/home.json`. The hero product-moment panel is a
stylized representation of the captured product behavior ("Ask Dala to instantly
find anything or anyone") using captured copy fragments only — no fabricated
stats, no invented query results presented as factual. The mock answer text is
illustrative UI chrome (a label like "Ask Dala…"), not a claimed statistic.

## Open questions for craft

- Hero product-moment: render as an abstract search-bar + answer-card glyph
  (preferred — keeps it clearly representational, not a fake screenshot).
- Numbered eyebrows: "01 — " arabic + em dash, muted gray, Label scale.
