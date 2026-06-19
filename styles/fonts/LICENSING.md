# Font licensing — REQUIRED before publishing to production (*.aem.live)

This page was converted from https://elevenlabs.io/ as a `stardust:deploy` test.
Two of the four faces are **proprietary** and self-hosted only for brand fidelity.

| File | Family | Foundry / source | License | Status |
|---|---|---|---|---|
| `waldenburg-buch.woff2` | Waldenburg (light/book) | KMR-Waldenburg (Kometa), via ElevenLabs CDN | **Proprietary — commercial** | ⚠️ license NOT confirmed |
| `waldenburg-normal.woff2` | Waldenburg (regular) | KMR-Waldenburg (Kometa) | **Proprietary — commercial** | ⚠️ license NOT confirmed |
| `waldenburg-fett.woff2` | Waldenburg (bold) | KMR-Waldenburg (Kometa) | **Proprietary — commercial** | ⚠️ license NOT confirmed |
| `waldenburg-fetthalbschmal.woff2` | WaldenburgFH (display) | KMR-Waldenburg (Kometa) | **Proprietary — commercial** | ⚠️ license NOT confirmed |
| `inter-variable.woff2` | Inter | rsms / Google Fonts | SIL OFL 1.1 | ✅ OK to self-host |
| `geist-mono-variable.woff2` | Geist Mono | Vercel | SIL OFL 1.1 | ✅ OK to self-host |

## Do NOT publish to `*.aem.live` until the Waldenburg embedding/webfont license is confirmed.

### Remove path (fall back to system fonts)
If the Waldenburg license cannot be obtained:
1. Delete the four `waldenburg-*.woff2` files.
2. Delete the `@font-face` rules for `Waldenburg` and `WaldenburgFH` in `styles/styles.css`.
3. The `--font-waldenburg` / `--font-waldenburg-fh` stacks then fall back to the
   metric-matched `"Waldenburg Fallback"` (adjusted Arial) face — zero layout shift,
   degraded brand fidelity but functional.
