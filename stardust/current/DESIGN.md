---
_provenance:
  writtenBy: stardust:extract (uplift Phase 1)
  writtenAt: 2026-06-19
  againstInput: https://www.duolingo.com/
  descriptiveNotInterview: true
colors:
  background: "#FFFFFF"
  surface: "#F7F7F7"
  text: "#4B4B4B"
  primary: "#58CC02"
  secondary: "#1CB0F6"
  accentOrange: "#FF9600"
  accentRed: "#FF4B4B"
  accentYellow: "#FFC800"
  accentPurple: "#CE82FF"
  darkNavy: "#100F3E"
typography:
  display: "feather (Feather Bold), 700"
  body: "din-round / duolingo-sans (geometric rounded sans)"
  scale: "32 / 48 / 64 display ladder"
rounded: "12px buttons, 16px cards"
spacing: "generous; alternating full-width feature rows"
components:
  - "3D pushable button (fill + darker bottom border, compresses on press)"
  - "alternating image+text feature row"
  - "language/flag chip"
  - "app store badges"
  - "full-bleed green footer with link columns"
---

# DESIGN — Duolingo (current state, descriptive)

## Color
Bright, saturated, mascot-driven. **Owl green `#58CC02`** is the load-bearing brand color (primary CTA + footer). **Macaw blue `#1CB0F6`** is the secondary action color. A full secondary palette of saturated hues — fox orange `#FF9600`, cardinal red `#FF4B4B`, bee yellow `#FFC800`, beetle purple `#CE82FF` — is used across illustrations and product accents. Text is a soft near-black `#4B4B4B` (eel), never pure black. One dark surface: a deep navy `#100F3E` for the Super/Max premium promo band.

## Typography
**Feather Bold** (proprietary rounded display) at 700 carries every heading — chunky, friendly, lowercase by convention. Body is a DIN-round geometric sans. The display ladder runs 32 → 48 → 64px.

## Shape & depth
Soft 12–16px rounding everywhere. The signature is the **pushable button**: a solid fill with a darker bottom border (`box-shadow: 0 4px 0 <shade>`) that visually compresses when pressed — the brand's one piece of tactile, physical-feeling UI.

## Layout
Centered hero with a character-illustration cluster and a double CTA. Below: a stack of alternating image+text feature rows (one claim each), an app-download band, a dark premium promo, three product cross-sells, a closing green CTA band, and a full-bleed green footer.

## Motion (observed)
Springy, bouncy micro-interactions; the pushable-button depress; subtle floating/parallax on illustration clusters. Motion is core to the brand's "delight" promise even on the marketing page.
