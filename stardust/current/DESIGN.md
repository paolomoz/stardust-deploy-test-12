---
_provenance:
  writtenBy: stardust:extract
  writtenAt: 2026-06-19
  againstInput: https://superhuman.com/
  mode: descriptive
  readArtifacts:
    - stardust/current/_brand-extraction.json
---

# DESIGN — Superhuman (current state)

> Descriptive visual system extracted from the live homepage.

## Colors

| role | value | notes |
|---|---|---|
| background | `#f2f0eb` | warm cream — the dominant page ground |
| surface | `#f7f5f2` / `#ece9e2` | lighter/warmer card grounds |
| text-primary | `#292827` (token `--neutral-100` `#141413`) | warm near-black ink |
| primary | `#714cb6` | purple — `--color-primary-base: light-dark(#714cb6,#d4c7ff)` |
| accent / ground | `#421d24` | deep mulberry section ground (`--mulberry-80 #792d4b`) |
| accent / ground | `#0c4243` | deep teal section ground (`--green-60 #148072`) |
| surface | `#ffffff` | used sparingly |

Per-product accent ramps exist as tokens (`--red-*`, `--sky-*`, `--blue-*`,
`--gold-pro-*`, `--mulberry-*`, `--green-*`). Full `light-dark()` dark mode.

## Typography

- **Heading & body:** **Super Sans VF** — a bespoke variable typeface. Weights
  observed 460 / 500 / 540 / 600 / 700. Display sizes up to 64px (h1),
  48–49px (section h2). Tight display line-height (`--line-height-display: 1.1`).
- **Serif accent:** **Super Serif VF** (`--font-family-serif`).
- **Scale:** modular / fluid — `clamp()`-based with named `--font-size-*`
  tokens. Not ad-hoc.

## Spacing & rhythm

- 4px base scale via `--space-Nx` tokens (`--space-1x`=4px … `--space-16x`=64px).
- Section padding typically 64px desktop.

## Radius & elevation

- `rounded`: 8px primary (buttons), 16px (cards, `--radius-4x`), 24px, 999px pill.
- Soft, low shadows — `0 1px 2px rgba(...)` and subtle inset 1px brand borders.

## Components

Buttons (filled purple, ghost, pill), product tiles, trusted-by logo wall,
editorial hero with painterly image, manifesto band, suite grid.

## Motion

Restrained. `prefers-reduced-motion` honored; no aggressive entrance choreography
observed in the static capture.
