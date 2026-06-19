---
name: Dala
description: Your workplace has the answer. Just ask Dala for it.
colors:
  ink-black: "#000000"
  paper-white: "#ffffff"
  electric-purple: "#8052ff"
  muted-gray: "#9a9a9a"
typography:
  display:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "normal"
  body:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  pill: "22.5px"
  md: "24px"
  circle: "50%"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.electric-purple}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  link:
    textColor: "{colors.muted-gray}"
    padding: "0"
  badge:
    textColor: "{colors.muted-gray}"
    padding: "0"
---

# Design System: Dala

## 1. Overview

**Creative North Star: "The Constellation in the Dark"**

Dala's surface is a cinematic, near-monochrome landing rendered almost entirely
in pure black. The single load-bearing visual is a generative particle cloud —
purple, gold and white points drifting into a luminous diamond — that
literalises "Unlock collective wisdom." as scattered knowledge coalescing. The
system is built in negative space: oversized editorial typography floats on
black, body prose is set generously, and a single electric purple does all the
accent work. The register is premium and aspirational, closer to Linear /
Vercel / Arc than to conventional B2B SaaS.

This shared base is the brand-faithful floor under three variants. It tightens
the captured surface where it was loose — the section padding is reduced from
120px to 64px (the multi-audience density floor), the ad-hoc type scale is
replaced by a modular scale, and the captured 200/400/600 weight range is put
to work instead of a single weight-400 — while pinning palette and typeface to
the captured brand. It explicitly rejects the generic SaaS landing page: no blue
gradient hero, no 3-up feature-card grid, no stock illustration, no light dense
dashboard, no loud multi-color palette. Mission and feeling lead.

**Key Characteristics:**
- Pure-black canvas (#000000) as the dominant material.
- One restrained accent (electric purple #8052ff), used on conversion only.
- A single private typeface (PP Neue Montreal) carrying display, body and UI.
- Generative / abstract imagery over literal product screenshots.
- Long-scroll, manifesto-paced narrative; balanced (not airy) density.

## 2. Colors

A near-monochrome palette: black and white carry ~95% of the surface, with one
electric-purple accent and a muted gray for secondary navigation. No fourth
color is introduced in any variant.

### Primary
- **Electric Purple** (#8052ff): The single accent. Used only on the primary
  "Request Access" pill and the circular mobile nav-toggle. Its rarity is the
  point — it is the one color that means "act."

### Neutral
- **Ink Black** (#000000): The universal background. Every section, header, and
  body sits on pure black. The canvas, not a surface among others.
- **Paper White** (#ffffff): Primary text, headlines, and the logo wordmark.
  The 21:1 high-contrast pairing on black.
- **Muted Gray** (#9a9a9a): Secondary navigation, eyebrows, and de-emphasised
  footer text. 7.0:1 on black — the quiet voice that still passes AA.

### Named Rules
**The One-Voice Rule.** Electric purple appears on conversion affordances only —
never as a decorative fill, divider, or background. On any given viewport it
touches well under 10% of the pixels. Its scarcity is what makes "Request
Access" read as the one thing to do.

## 3. Typography

**Display Font:** PP Neue Montreal (private; system-ui fallback)
**Body Font:** PP Neue Montreal (same family)
**Label/Mono Font:** none distinct

**Character:** A single grotesque neutral-Swiss sans does everything — display,
headline, body, UI. The captured weights 200 (Light), 400 (Regular) and 600
(SemiBold) are all exercised here, unlike the captured site, which rendered
headings at 400 only. Hierarchy is driven by a strict modular scale plus weight
contrast, not by size alone. The result is calm, modern, editorial.

### Hierarchy
- **Display** (600, clamp 3–6.25rem, line-height 1.02): The hero headline.
  Enormous, set tight on black, SemiBold for structural authority.
- **Headline** (600, clamp 2.25–3.25rem, line-height 1.08): Major section
  titles.
- **Title** (400, 1.75rem, line-height 1.15): Sub-section headings, team
  names, the closing CTA line.
- **Body** (400, 1.125rem, line-height 1.6): Manifesto and mission prose at
  65–75ch. On dark ground line-height is raised to 1.6 for legibility.
- **Label** (600, 0.8125rem, letter-spacing 0.04em): Numbered section eyebrows
  and small UI text, in muted gray. Mixed-case, not uppercase.

### Named Rules
**The Modular-Scale Rule.** Hierarchy is built on a fixed modular ratio
(≥1.25), never on ad-hoc size jumps. The captured site's uneven ratios
(1.44 / 1.63 / 1.14 …) are retired — every step is a multiple of the base.

**The Weight-and-Scale Rule.** Light 200 carries atmospheric lead-ins;
SemiBold 600 carries structural heads. Contrast comes from weight *and* scale
together, so mid-page sections no longer blur into one another.

## 4. Elevation

The system is **flat**. There are no box-shadows. Depth is conveyed entirely by
the generative particle hero (luminance and overlap on black) and by negative
space — content separates through vertical rhythm and the void of the black
ground, not through cards, borders, or drop shadows.

### Named Rules
**The No-Shadow Rule.** Surfaces never lift off the black. There is no card
vocabulary and no elevation ramp; if something needs to stand apart, give it
space, not a shadow.

## 5. Components

### Buttons
- **Shape:** Pill (22.5px radius).
- **Primary:** Electric purple (#8052ff) background, white text, ~14px 28px
  padding. Label "Request Access" → external Typeform. The only filled control
  on the page. Hover: subtle brightness lift, no color change.
- **Secondary:** Black background, white text, white hairline border, pill
  radius — used for non-conversion affordances so purple stays reserved for the
  one funnel.
- **Link:** Muted-gray (#9a9a9a) text, no radius, descriptive label text
  (never a bare "here"). Hover shifts to white.

### Cards / Containers
No card component. Sections are full-bleed on black, separated by 64px of
vertical space (down from the captured 120px) rather than bounded containers.

### Navigation
- **Style:** Horizontal header — left logo wordmark, right text links
  (Manifesto, Team, Blog) in muted gray + a purple "Request Access" pill. A
  circular purple nav-toggle (50% radius) handles mobile.
- **Type:** PP Neue Montreal, small, muted gray default; white on hover.

### Badge / Eyebrow
- Numbered section eyebrows ("01 — Manifesto") in muted gray, label scale,
  mixed-case, 0.04em tracking. New to the redesign (improvement #2); gives the
  long scroll a spine.

### Signature Component — Generative Particle Constellation
A black canvas rendering a drifting cloud of purple / gold / white points that
coalesce into a luminous diamond, with the giant hero headline and purple pill
overlaid. The brand's defining visual. In this redesign the motif is reprised
past the hero as a recurring structural accent rather than abandoned after the
first viewport.

## 6. Do's and Don'ts

### Do:
- **Do** build on pure black (#000000) and treat blackspace as the primary
  material.
- **Do** reserve electric purple (#8052ff) for conversion affordances only (the
  One-Voice Rule).
- **Do** drive hierarchy through a strict modular scale and the 200/400/600
  weight range together (the Modular-Scale + Weight-and-Scale Rules).
- **Do** keep imagery generative / abstract, evoking "collective wisdom" rather
  than showing literal product screenshots.
- **Do** keep surfaces flat — separate with space, not shadows (the No-Shadow
  Rule).
- **Do** give links descriptive text and sections numbered eyebrows.

### Don't:
- **Don't** introduce a generic SaaS blue gradient hero or a 3-up feature-card
  grid.
- **Don't** add stock illustration, light dashboards, or dense multi-card
  layouts.
- **Don't** spread purple into decoration, dividers, or backgrounds — it dilutes
  the single conversion signal.
- **Don't** lead with feature bullet lists; the brand leads with mission and
  feeling.
- **Don't** add drop shadows or a card elevation ramp; the system is flat by
  doctrine.
- **Don't** smuggle in editorial-register costume vocabulary ("atelier", "the
  journal"); Dala is a product/manifesto brand.
- **Don't** exceed 64px desktop section padding — the multi-audience density
  floor caps it; the captured 120px does not carry forward.
