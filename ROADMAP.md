# Qraft — Roadmap

**Current release:** v1.0.0 — Initial Stable Release  
**Release date:** 2026-11-10  
**Status:** Released; further development paused.  
**Production:** https://qraft-9y9.pages.dev/

## v1.0.0 — Initial Stable Release

**Status: Released.** The release is published at [GitHub Releases](https://github.com/imandodo01/Qraft/releases/tag/v1.0.0), tagged `v1.0.0` from `main`.

The nine-tool commitment is complete:

1. QR Generator — URL/text input, preview, PNG export.
2. vCard Generator — contact validation, vCard 3.0 preview, VCF export, QR sharing.
3. Digital Business Card — responsive card, themes/accent, PNG/VCF export, contact QR.
4. JSON Formatter — validate, format, minify.
5. Base64 — UTF-8 text encode/decode.
6. URL Encoder — URI-component encode/decode.
7. UUID Generator — cryptographically secure UUID v4.
8. Text Counter — characters, words, lines.
9. Case Converter — common case formats.

### Release verification

- [x] Final PR CI passed.
- [x] Maintainer-reported local clean install, lint, typecheck, 63 tests, and production build passed.
- [x] Production-only dependency audit reported zero findings.
- [x] Cloudflare Pages deployment and configured response headers verified by maintainer.
- [x] Maintainer-reported functional, export, privacy, responsive, and accessibility checks completed.
- [x] Seven moderate development-only dependency findings explicitly accepted as residual risk for v1.0.0 and documented.
- [x] GitHub Release and `v1.0.0` tag published.

See [Project Status](PROJECT_STATUS.md), [M6 verification](docs/verification/M6-VERIFICATION.md), and the [published release notes](https://github.com/imandodo01/Qraft/releases/tag/v1.0.0) for evidence and limitations.

## Post-v1.0 development

**Status: Paused. No v1.1.0 commitment or schedule exists.**

Future feature ideas are maintained in the [feature backlog](docs/backlog/FEATURE-BACKLOG.md). They are candidates for later evaluation, not approved scope or delivery promises.

When development resumes:

1. Reassess the development dependency audit and pursue a compatible upstream remediation.
2. Review the feature backlog against user value, implementation cost, maintenance burden, privacy, and fit with Qraft's local-first purpose.
3. Select a small, explicit release scope and define acceptance criteria.
4. Create a new milestone/branch/PR cycle and update this roadmap when scope is approved.

## Engineering and release guardrails

- Keep browser-local processing as the default.
- Do not introduce account, backend, cloud sync, or automatic persistence without an explicit product/privacy decision.
- Do not silently truncate or rewrite user input.
- Verify exported artifacts, not only previews.
- Preserve the established branch, PR, CI, and acceptance workflow.
- Do not describe the application as fully security-audited or ASVS-certified.
