---
name: Dala — Variant C (The Constellation as Spine)
description: What if motion was part of the identity?
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
---

# Design System: Dala — Variant C

> **What if motion was part of the identity?** Variant C amplifies a different
> captured trait from B: the signature gesture — the generative-particle
> constellation. On the captured site it appears once, at the hero, then is
> abandoned for plain prose. C makes it the brand's *structural voice*: it
> threads from the first viewport through every section divider and resolves in
> the footer wordmark. The bet is motion, not layout — IA is identical to A.
> **Cinematic — motion register `arrival` (auto-selected).**

## 1. Overview

**Creative North Star: "The Constellation as Spine"**

C amplifies the captured `generative-particle-hero` motif — the literal product
thesis (scattered fragments → shared knowledge) — into a structural system. The
typography, scale, and IA are inherited from variant A verbatim; the
differentiation is the constellation, not the layout. Three structural systems
carry C beyond A under different chrome:

1. **Live-particle hero composition** — the hero is a live generative particle
   field (not A's static-with-product-moment hero); particles parallax upward as
   the visitor scrolls and seed the headline's enterUp stagger.
2. **Constellation-divider system** — each section transition is a constellation
   divider: a thin field of drifting points that resolves into a diamond node as
   the next section rises and staggers in. This replaces A's plain section
   breaks and is the structural scaffolding for the motion layer.
3. **Footer-wordmark constellation wipe** — the footer "Dala" wordmark is
   composed of constellation points that converge into the letterforms on
   reveal, resolving the scattered-fragments thesis at the page's end.

C is defined against a captured trait, not against B: it is **not** "B but
more," not size-as-personality, not padding-as-personality. The constellation is
the captured signature gesture; the amplification is structural and kinetic.

**Key Characteristics:**
- The generative constellation is the structural spine, not a hero backdrop.
- Cinematic `arrival` choreography: hero parallax, rising plates, staggered
  per-section entrances.
- IA identical to A; the bet is motion.
- Every motion element neutralised under `prefers-reduced-motion: reduce`.

## 2. Colors

Inherited verbatim. The constellation points use the captured hero palette
(purple / gold-tint white / white on black). Purple stays on conversion only —
the constellation gold/white points are luminance, not the accent color.

### Primary
- **Electric Purple** (#8052ff): conversion only (the One-Voice Rule). The
  constellation's purple points are particle luminance within the hero field,
  not a decorative spread of the accent.

### Neutral
- **Ink Black** (#000000), **Paper White** (#ffffff), **Muted Gray** (#9a9a9a).

## 3. Typography

Inherited from the shared base / variant A: PP Neue Montreal, 1.25 modular
scale, weights 200/400/600. C's differentiation is motion, not type — the
typographic system matches A so the variants read as the same brand.

### Hierarchy
Identical to variant A (Display 600 / Headline 600 / Title 400 / Body 400 /
Label 600). The hero headline gains an enterUp stagger seeded by the particle
field; the type itself is unchanged.

### Named Rules
**The Modular-Scale Rule** and **The Weight-and-Scale Rule** (inherited).

## 4. Elevation

Flat (inherited). **The No-Shadow Rule** holds. Depth is conveyed by particle
parallax and overlap on black — the constellation field is the only "depth," and
it is luminance, not shadow.

## 5. Components

### Buttons
- **Primary:** purple pill, "Request Access" → Typeform. The single funnel. On
  the live hero, the pill sits above the particle field with full contrast.

### Constellation-Divider (signature system)
A thin full-width field of drifting constellation points between sections; on
scroll into view the points resolve into a diamond node as the next section
rises (`arrival` choreography). This is the structural scaffolding that makes C a
third proposition rather than A with motion bolted on.

### Footer-Wordmark Constellation Wipe (signature)
The footer "Dala" wordmark is composed of constellation points that converge
into the letterforms on reveal — the scattered-fragments thesis resolving at the
page's end. Under reduced-motion it renders as the resolved static wordmark.

### Live-Particle Hero (signature)
A live generative particle field renders the constellation; particles parallax
upward on scroll and seed the headline stagger. Under reduced-motion it renders
as a static end-state constellation frame (the diamond resolved), with the full
headline and pill legible.

## 6. Do's and Don'ts

Inherited from the shared base. Variant-C-specific:

### Do:
- **Do** thread the constellation from hero → section dividers → footer
  wordmark as one structural system.
- **Do** keep IA identical to A; the differentiation is motion, not layout.
- **Do** gate every motion element behind `prefers-reduced-motion`; the
  reduced-motion render must be a complete, legible page.

### Don't:
- **Don't** define C as "B but more," size-as-personality, or
  padding-as-personality — C is the captured constellation gesture extended.
- **Don't** spread the accent purple into the constellation as decoration; the
  points are luminance and the One-Voice Rule still governs the pill.
- **Don't** let the motion break the single 'Request Access' funnel or move the
  hero out of the first viewport.
