---
_provenance:
  writtenBy: stardust:extract
  writtenAt: 2026-06-19
  againstInput: https://superhuman.com/
  mode: descriptive
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
---

# PRODUCT — Superhuman (current state)

> Descriptive snapshot of the existing site, not an authored target.

## Register

`brand` — a marketing/landing surface for a commercial product suite. Confident,
editorial, aspirational voice; not a logged-in product UI.

## Product Purpose

Superhuman positions itself (post-rebrand) as **"the AI productivity suite that
gives you superpowers everywhere you work."** The homepage sells a four-product
suite under one identity:

- **Mail** — "the most productive email app ever made"
- **Grammarly** — "everyone's favorite AI writing partner"
- **Coda** — "the all-in-one AI workspace for teams"
- **Go** — "AI that actually works in every app you use"

The page's job is to (a) establish the new umbrella brand, (b) route to each of
the four products, and (c) drive sign-up / "Get the suite".

## Users

Knowledge workers, teams, and enterprises who want speed and AI assistance
across email, docs, and every app. Secondary audiences surfaced in nav:
Enterprise, Education.

## Brand Personality

- **Confident & aspirational** — "Superpowers, everywhere you work";
  "Becoming Superhuman." A manifesto register, not a feature list.
- **Editorial & warm** — a custom variable typeface (Super Sans VF /
  Super Serif VF), a warm tonal palette (cream, mulberry, teal, ink), and
  human, painterly photography ("Tonal Flower" hero, "Girl drafting a
  Superhuman manifesto").
- **Systemized & precise** — a 288-token design system with fluid type,
  4px spacing scale, and full light/dark `light-dark()` pairs. The craft is
  visible and deliberate.
- **Calm, premium, unhurried** — generous whitespace, large display type,
  restrained motion.

## Anti-references

- Loud, neon SaaS gradients and generic Inter-on-white templates — Superhuman
  deliberately uses a warm cream ground and a bespoke typeface to avoid the
  category default.
- Dense feature-grid "wall of cards" marketing — the page prefers one strong
  statement per product.

## Design Principles (observed)

1. **One bespoke type voice.** Super Sans VF carries headline, body, and UI at
   optical weights (460/500/540) you can't get from a system font.
2. **Warm tonal ground, not white.** Cream `#f2f0eb` / `#f7f5f2` instead of
   pure white; deep mulberry `#421d24` and teal `#0c4243` as section grounds.
3. **Per-product accent color.** Each suite product (Mail/Grammarly/Coda/Go)
   has its own tonal world while sharing the system.
4. **Editorial photography as hero.** Painterly, human imagery over product
   screenshots in the top fold.
5. **Token-driven, dark-mode-ready.** Everything routes through CSS custom
   properties with `light-dark()` pairs.

_Sections inferred from a single-page (`--single`) homepage capture; marked
descriptive. Target intent is authored later by `stardust:direct`._
