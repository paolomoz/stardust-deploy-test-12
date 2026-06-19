---
name: Dala — Variant A (Faithful + Improvements)
description: This is what your site should be tomorrow.
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
---

# Design System: Dala — Variant A

> Variant A inherits the shared base verbatim. Its job is to close the gap
> between the captured site and a competent 2026 execution of the same brand —
> applying every item from `stardust/prototypes/home-improvements.md`, no more.
> The brand team should react "yes, that's us, with the obvious fixes."
> **Static — no cinematic motion layer.**

## 1. Overview

**Creative North Star: "The Constellation in the Dark"** (inherited)

Variant A is strict Mode A. It is the risk-averse green-light: same IA, same
section sequence, same composition strategy as the captured site, with the five
captured weaknesses fixed. Nothing is invented; nothing is reached for. The
hero gains a concrete product moment alongside the manifesto headline (retiring
the stealth-teaser pattern) while keeping "Request Access" as the single
conversion path; the long scroll gains numbered eyebrows and clearer hierarchy;
hierarchy comes from weight and a tightened modular scale, not size alone; the
decorative investor logo-PNG strip and generic team slider are replaced with a
restrained on-brand treatment and the bare "here" link is fixed; and the
constellation motif is reprised lightly past the hero.

**Key Characteristics:** (inherited from base, plus)
- Hero pairs the manifesto headline with a concrete product moment.
- Numbered mixed-case section eyebrows spine the long scroll.
- Restrained investor/team treatment replaces decorative strips.

## 2. Colors

Inherited verbatim from the shared base. No change.

### Primary
- **Electric Purple** (#8052ff): conversion only (the One-Voice Rule).

### Neutral
- **Ink Black** (#000000), **Paper White** (#ffffff), **Muted Gray** (#9a9a9a).

### Named Rules
**The One-Voice Rule.** (inherited) Purple on conversion affordances only.

## 3. Typography

Inherited from the shared base: PP Neue Montreal, modular scale ratio **1.25**
(minor third), weights 200/400/600 exercised.

### Hierarchy
- **Display** (600, clamp 3–6.25rem): hero headline.
- **Headline** (600, clamp 2.25–3.25rem): section titles.
- **Title** (400, 1.75rem): sub-heads, team names, closing CTA.
- **Body** (400, 1.125rem, line-height 1.6): manifesto prose at 65–75ch.
- **Label** (600, 0.8125rem, 0.04em): numbered eyebrows, mixed-case.

### Named Rules
**The Modular-Scale Rule** and **The Weight-and-Scale Rule** (inherited). These
directly close improvement #3 (hierarchy collapsing onto size alone).

## 4. Elevation

Flat (inherited). **The No-Shadow Rule** holds.

## 5. Components

### Buttons
- **Primary:** purple pill, "Request Access" → Typeform. The single funnel.
- **Secondary:** black pill, white hairline border — for "Read the manifesto"
  and similar non-conversion affordances.
- **Link:** muted-gray, descriptive text. The captured bare "here" is replaced
  (improvement #4 / `T-link-content-free`).

### Section Eyebrow
Numbered mixed-case eyebrow on every major section (improvement #2).

### Investor / Team treatment (improvement #4)
The decorative investor logo-PNG strip and generic horizontal portrait slider
are retired. Investors are stated in restrained on-brand text; the team is a
calm static grid, not a slider. No card elevation, no decorative chrome.

### Signature Component — Generative Particle Constellation
Hero field as captured, plus a light recurring constellation accent at section
transitions (improvement #5) — a quiet reprise, not a structural system (that
is variant C's role).

## 6. Do's and Don'ts

Inherited from the shared base. Variant-A-specific:

### Do:
- **Do** pair the hero manifesto headline with a concrete product moment
  (retire the stealth-teaser; improvement #1).
- **Do** keep "Request Access" as the one conversion path despite the new hero
  product moment.
- **Do** number the section eyebrows and keep them mixed-case.

### Don't:
- **Don't** add a second conversion verb when introducing the hero product
  moment.
- **Don't** reach beyond the five improvements — A is the faithful floor, not a
  creative reach.
