# ⚠️ Font licensing — required before going live

The webfonts in this folder are **proprietary** cuts lifted from mercury.com for
brand fidelity in a presales/redesign prototype. **Do not publish to `aem.live`
until a webfont/embedding license is confirmed.**

| File | Family | Foundry | Status |
|---|---|---|---|
| arcadia-360.woff2 | Arcadia | Custom Mercury commission | ⚠️ unlicensed for redistribution |
| arcadia-400.woff2 | Arcadia | Custom Mercury commission | ⚠️ unlicensed |
| arcadia-480.woff2 | Arcadia | Custom Mercury commission | ⚠️ unlicensed |
| arcadia-500.woff2 | Arcadia | Custom Mercury commission | ⚠️ unlicensed |
| arcadia-display-360.woff2 | Arcadia Display | Custom Mercury commission | ⚠️ unlicensed |
| arcadia-display-480.woff2 | Arcadia Display | Custom Mercury commission | ⚠️ unlicensed |

## Remove path (if licensing can't be confirmed)

1. Delete the six `arcadia*.woff2` files.
2. Delete the `@font-face` rules for `Arcadia` and `ArcadiaDisplay` in `styles/styles.css`.
3. The `--font-body` / `--font-display` stacks fall back to the metric-matched
   `arial` system fallback (already defined), so layout/CLS stay intact — only
   the distinctive letterforms are lost.
