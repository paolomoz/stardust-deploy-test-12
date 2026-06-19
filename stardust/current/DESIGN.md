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
    fontSize: "112.5px"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "78px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "normal"
  title:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "42px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "normal"
  body:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "PPNeueMontreal, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  pill: "22.5px"
  md: "24px"
  circle: "50%"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.electric-purple}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.muted-gray}"
    padding: "0"
---

# Design System: Dala

## 1. Overview

**Creative North Star: "The Constellation in the Dark"**

Dala's surface is a cinematic, near-monochrome landing rendered almost entirely in pure black. The single load-bearing visual is a generative particle cloud — purple, gold and white points drifting into a luminous diamond — that literalises the headline "Unlock collective wisdom." as a constellation of scattered knowledge coalescing. The system is built in negative space: oversized editorial typography floats on black, body prose is set generously, and a single electric purple does all the accent work. The register is premium and aspirational, closer to Linear / Vercel / Arc than to conventional B2B SaaS.

This system explicitly rejects the generic SaaS landing page: no blue gradient hero, no 3-up feature-card grid, no stock illustration, no light dense dashboard, no loud multi-color palette. Mission and feeling lead; feature lists do not.

**Key Characteristics:**
- Pure-black canvas (#000000) as the dominant material.
- One restrained accent (electric purple #8052ff), used on conversion only.
- A single private typeface carrying display, body and UI.
- Generative / abstract imagery over literal product screenshots.
- Long-scroll, manifesto-paced narrative with motion as reveal.

## 2. Colors

A near-monochrome palette: black and white carry 95% of the surface, with one electric-purple accent and a muted gray for secondary navigation.

### Primary
- **Electric Purple** (#8052ff): The single accent. Used only on the primary "Request Access" pill button and the circular mobile nav-toggle. Its rarity is the point — it is the one color that means "act."

### Neutral
- **Ink Black** (#000000): The universal background. Every section, the header, and the body sit on pure black. This is the canvas, not a surface among others.
- **Paper White** (#ffffff): Primary text and headlines, plus the logo wordmark. The highest-contrast pairing against the black ground.
- **Muted Gray** (#9a9a9a): Secondary navigation links and de-emphasised footer text. The quiet voice.

### Named Rules
**The One-Voice Rule.** Electric purple appears on conversion affordances only — never as a decorative fill, divider, or background. On any given viewport it touches well under 10% of the pixels. Its scarcity is what makes "Request Access" read as the one thing to do.

## 3. Typography

**Display Font:** PP Neue Montreal (private; system-ui fallback)
**Body Font:** PP Neue Montreal (same family)
**Label/Mono Font:** none distinct

**Character:** A single grotesque neutral-Swiss sans (PP Neue Montreal) does everything — display, headline, body, and UI labels. Weights 200 (Light), 400 (Regular) and 600 (SemiBold) are captured; the rendered headings are predominantly Regular (400) at very large sizes, so contrast is driven by scale, not weight. The result is calm, modern and editorial.

### Hierarchy
- **Display** (400, 112.5px, line-height 1.0): The hero headline only ("Unlock collective wisdom."). Enormous, set tight on black.
- **Headline** (400, 78px, line-height 1.05): Major section titles ("Our team", "Our investors").
- **Title** (400, 42px–48px, line-height ~1.15): Sub-section headings and the closing CTA line; team-member names.
- **Body** (400, ~1.125rem, line-height 1.55): Manifesto and mission prose, set at comfortable reading length.
- **Label** (400, ~0.875rem, line-height 1.4): Nav links and small UI text, rendered in muted gray.

### Named Rules
**The Scale-Not-Weight Rule.** Hierarchy comes from dramatic size jumps on a single regular weight, not from bolding. A 112px hero next to 18px body is the contrast; reaching for heavy weights would dilute the calm.

## 4. Elevation

The system is **flat**. There are no captured box-shadows anywhere on the page. Depth is conveyed entirely by the generative particle hero (luminance and overlap on black) and by negative space — content separates through generous vertical rhythm and the void of the black ground, not through cards, borders, or drop shadows.

### Named Rules
**The No-Shadow Rule.** Surfaces never lift off the black. There is no card vocabulary and no elevation ramp; if something needs to stand apart, give it space, not a shadow.

## 5. Components

### Buttons
- **Shape:** Pill (22.5px radius).
- **Primary:** Electric purple (#8052ff) background, white text, ~12px 24px padding. Label "Request Access" → external Typeform. The only filled control on the page.
- **Ghost / Text:** Transparent background, muted-gray (#9a9a9a) text, no radius — used for nav links ("Manifesto", "Team") and the "Accept" cookie control mirrors the primary purple.
- **Hover / Focus:** Not captured (animations frozen by reduced-motion at extraction).

### Cards / Containers
No card component is in use. Sections are full-bleed on black, separated by ~120px of vertical space rather than bounded containers.

### Navigation
- **Style:** Horizontal header — left logo wordmark, right text links (Manifesto, Team, Blog) in muted gray + a purple "Request Access" pill. A circular purple nav-toggle (50% radius) handles mobile.
- **Type:** PP Neue Montreal, small, muted gray default.

### Signature Component — Generative Particle Hero
A full-viewport black canvas rendering a drifting cloud of purple / gold / white points that coalesce into a luminous diamond, with the giant "Unlock collective wisdom." headline and a purple pill overlaid. This is the brand's defining visual and the single most load-bearing surface.

## 6. Do's and Don'ts

### Do:
- **Do** build on pure black (#000000) and treat blackspace as the primary material.
- **Do** reserve electric purple (#8052ff) for conversion affordances only (the One-Voice Rule).
- **Do** drive hierarchy through dramatic type scale on a single regular weight (the Scale-Not-Weight Rule).
- **Do** keep imagery generative / abstract, evoking "collective wisdom" rather than showing literal product screenshots.
- **Do** keep surfaces flat — separate with space, not shadows (the No-Shadow Rule).

### Don't:
- **Don't** introduce a generic SaaS blue gradient hero or a 3-up feature-card grid.
- **Don't** add stock illustration, light dashboards, or dense multi-card layouts.
- **Don't** spread purple into decoration, dividers, or backgrounds — it dilutes the single conversion signal.
- **Don't** lead with feature bullet lists; the brand leads with mission and feeling.
- **Don't** add drop shadows or a card elevation ramp; the system is flat by doctrine.
