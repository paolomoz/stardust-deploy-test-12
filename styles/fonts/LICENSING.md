# Font licensing

| File | Family | Foundry / License | Status |
|---|---|---|---|
| `waldenburg-300.woff2` | Waldenburg (Buch / light) | KMR — **proprietary, ElevenLabs private cut** | ⚠️ license required before `aem.live` |
| `waldenburg-400.woff2` | Waldenburg (Normal) | KMR — **proprietary** | ⚠️ license required before `aem.live` |
| `waldenburg-700.woff2` | Waldenburg (Fett / bold) | KMR — **proprietary** | ⚠️ license required before `aem.live` |
| `inter-variable.woff2` | Inter | SIL OFL 1.1 | ✅ redistributable |
| `geist-mono-variable.woff2` | Geist Mono | SIL OFL 1.1 | ✅ redistributable |

## ⚠️ Before publishing to production (`aem.live`)

Waldenburg is a **proprietary ElevenLabs brand font** captured from the live
site for brand-faithful prototyping. It is self-hosted here for fidelity on the
**branch preview** only. Confirm a webfont/embedding license with ElevenLabs
(or the foundry) **before** promoting this page to production.

## Remove-and-fallback path

If licensing cannot be confirmed:

1. Delete `waldenburg-300.woff2`, `waldenburg-400.woff2`, `waldenburg-700.woff2`.
2. Remove the three `@font-face { font-family: "Waldenburg"; … }` rules and the
   `"Waldenburg Fallback"` rule from `styles/styles.css`.
3. The `--font-display` stack falls back to `"Waldenburg Fallback", arial,
   sans-serif` → the metric-matched system fallback. No layout shift; headings
   simply render in the system sans instead of Waldenburg.
