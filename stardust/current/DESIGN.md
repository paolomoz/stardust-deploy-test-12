---
_provenance:
  writtenBy: stardust:extract
  writtenAt: 2026-06-19
  againstInput: https://linear.app/
  mode: descriptive (current-state visual system)
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
colors:
  background: "#08090a"
  surface: "#0f1011"
  surfaceRaised: "#121314"
  border: "#23252a"
  text: "#f7f8f8"
  textMuted: "#8a8f98"
  primary: "#5e6ad2"
  accent: "#e4f222"
  danger: "#f34e52"
  success: "#27a644"
typography:
  heading: "Inter Variable"
  body: "Inter Variable"
  mono: "Berkeley Mono"
  weights: [510, 590]
  scale: ["13px", "16px", "20px", "48px", "64px", "72px"]
rounded: "6px"
spacing: "generous vertical section rhythm; dense product-chrome rows"
components: [sticky-nav, pill-cta, hairline-card, product-ui-mock, gradient-display-heading, six-column-footer]
---

# DESIGN — Linear (current state)

## Color

Dark-first. Near-black canvas `#08090a` (theme-color confirmed) with a
ladder of barely-separated surfaces (`#0f1011`, `#121314`, `#161718`)
divided by hairline borders `#23252a`. Text is near-white `#f7f8f8`
stepping down through `#d0d6e0`, `#8a8f98`, `#62666d`. Exactly one
signature chromatic accent — indigo `#5e6ad2` — plus a single lime
highlight `#e4f222`. A four-stop pastel gradient (`#f79ce0 → #f7bf8b →
#ffdf9f → #83dcdc`) is reserved for display text only. Semantic red/green
appear only in product chrome.

## Typography

Inter Variable for headings and body at optical weights 510 / 590.
Berkeley Mono for eyebrows, labels, and code. Large display jumps
(48 / 64 / 72px) against a tight body cluster (13 / 16 / 20px). Tight
letter-spacing on display.

## Shape & depth

Tight radii — 6px dominant on chrome, 4px and 8px nearby, 12px on cards,
9999px pills on primary CTAs. Depth comes from hairline 1px inset
borders and very subtle shadows (`rgba(0,0,0,0.4) 0 2px 4px`), never
heavy drop shadows.

## Signature motifs

1. A live **product-UI mock** as the hero visual (Inbox / My issues /
   Reviews / Pulse / Workspace / Initiatives / Projects).
2. **Gradient-on-dark** display headings.
3. **Hairline-bordered dark cards** for feature blocks.
4. A **lime highlight** used sparingly as the single loud note.
5. A **full-bleed closing band** ("Built for the future. Available
   today.", 72px).

## System

635 CSS custom properties → a mature, token-driven design system.
Sticky top nav (wordmark + 6 links + Log in / Sign up pill). Six-column
footer (Product / Features / Company / Resources / Connect / Legal).
