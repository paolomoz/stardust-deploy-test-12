---
_provenance:
  writtenBy: stardust:extract
  writtenAt: 2026-06-19T04:10:09.299Z
  againstInput: https://www.adaline.ai/
  basis: descriptive snapshot — computed-style aggregation of the live homepage
colors:
  background: "#FBFDF6"
  surface: "#F8F9F5"
  surfaceAlt: "#EFF2E8"
  surfaceMuted: "#E1E6DF"
  text: "#0A1D08"
  textMuted: "#2A332A"
  textSubtle: "#6B7860"
  primary: "#203B14"
  primaryHover: "#2E4320"
  accentPill: "#ECF2DF"
  dark: "#2A332A"
  darkest: "#050E11"
  border: "rgba(46,67,32,0.40)"
typography:
  heading: "Akkurat"
  body: "Akkurat"
  mono: "Fragment Mono"
  display: "Instrument Serif"
  scale: "modular — h1 53/64, h2 30/34.7, display 104/98.8"
rounded: "pill buttons (9999px); 3px small cards"
spacing: "generous; section-y rhythm; airy whitespace between product panels"
components: [nav, hero, live-trace-panel, behavior-list, eval-panel, synthetic-data, positioning-line, testimonials, security-strip, footer-cta]
---

# DESIGN — Adaline (current state)

## Palette

Warm paper off-white (`#FBFDF6`) ground, deep green-black ink (`#0A1D08`),
a ladder of pale sage surfaces (`#F8F9F5` → `#EFF2E8` → `#E1E6DF`), and a
deep forest-green primary (`#203B14`) reserved for pill CTAs. Dark sections
go to `#2A332A`/`#050E11` with paper-colored type. The whole system is
botanical — paper, ink, sage, forest — and avoids any synthetic "AI" hue.

## Typography

- **Akkurat** (Lineto grotesque) — headings and body. Precise, Swiss, neutral.
- **Fragment Mono** — pervasive. Eyebrows (uppercase 11px, +1.1px tracking),
  technical labels, and the live-trace UI (timestamp · op · latency · cost rows).
- **Instrument Serif** — used **exactly once**, at 104px, for the closing
  "Self-improve your agents now." A captured-but-underused display register.

## Motifs

- Pill buttons and pill eyebrow chips.
- Flat surfaces; 1px ring borders rather than drop shadows.
- **Live data panels** — trace logs and behavior taxonomies rendered as real UI.
- **Floating product UI over landscape/nature photography** — the signature
  composition: app windows set against mountain valleys and snow ridges.
- Trusted-by logo row; giant serif closing statement.

## Tensions (see brand-review.html)

- The serif display register is gorgeous but appears only once, at the very
  bottom — its impact is spent on a footer few visitors reach.
- The nature photography is the most emotionally distinctive asset on the
  page, yet it sits behind product screenshots at reduced scale rather than
  being foregrounded.
- The live-trace / behavior panels are the strongest proof of the product,
  but they are static stills — the "self-improving / live" claim is told,
  not shown in motion.
