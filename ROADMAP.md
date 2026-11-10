# Qraft — Roadmap

**Target:** v1.0.0  
**Approach:** One milestone per feature branch and acceptance cycle. The accepted `main` branch is the source of truth.

## M0 — Product and repository planning

- [x] Product vision, principles, initial v1.0 scope, architecture, design direction, and development conventions.
- [x] Quality and architecture review with accepted/deferred/rejected decisions.

## M1–M5 — Product implementation

**Status:** Completed and merged into `main`.

- [x] M1 — Application foundation: Vite, strict TypeScript, ESLint, Vitest, responsive shell, tool registry, search, routing, and CI.
- [x] M2 — QR Studio: local QR generation, preview, validation, PNG export, and user acceptance.
- [x] M3 — Contact Studio: vCard 3.0 validation/serialization, preview, copy, VCF export, and QR contact sharing.
- [x] M4 — Digital Business Card: responsive card, themes/accent, PNG/VCF export, and embedded contact QR.
- [x] M5 — Developer and Text Tools: JSON, UTF-8 Base64, URI component, UUID v4, text counter, and case converter.

See the individual milestone verification guides for scope and evidence.

## Security baseline

- [x] Security policy, threat model, and verification checklist.
- [x] Lockfile consistency and clean install.
- [x] Production-only audit: 0 vulnerabilities in the 2026-11-10 maintainer-reported audit.
- [x] Seven moderate development dependency findings reviewed and recorded as a residual risk; no forced downgrade or unverified override applied.
- [x] Cloudflare Pages response headers verified on the deployed URL.
- [ ] Repository-level security settings and required CI enforcement verified.

This baseline is not an ASVS certification.

## M6 — Integration and release hardening

**Status:** Final acceptance in progress.  
**Host:** [Qraft on Cloudflare Pages](https://qraft-9y9.pages.dev/).

- [x] Cloudflare Pages deployment completed; all nine tools reported functional by the maintainer.
- [x] Local clean install, lint, typecheck, 63 tests, and production build passed (2026-11-10).
- [x] Production-only dependency audit reported zero vulnerabilities.
- [x] HTTPS and configured security headers verified on the deployed root response.
- [x] Maintainer-reported privacy/network/storage and responsive/accessibility checks acceptable in the tested environment.
- [ ] Record exact local Node/npm versions and verify lockfile remains unchanged after clean install.
- [ ] Complete independent export evidence: QR scan payload, VCF import in a contact application, and business-card PNG dimensions/legibility.
- [ ] Record exact browser/device versions before making cross-browser compatibility claims.
- [ ] Verify repository-level security settings and required CI check enforcement where access permits.
- [ ] Green CI on the final documentation PR head.
- [ ] Final user acceptance and explicit disposition of the documented development-only residual risk.

Verification: [M6 release hardening checklist](docs/verification/M6-VERIFICATION.md).  
Security disposition: [Dependency audit record](docs/security/DEPENDENCY-AUDIT.md).  
Deployment: [Cloudflare Pages guide](docs/deployment/CLOUDFLARE-PAGES.md).

**Exit criteria:** The remaining evidence is recorded, no unresolved Blocker or High findings remain, final CI is green, and the project owner accepts the documented residual risk before tagging v1.0.0.

## v1.0 minimum feature commitment

The initial release is limited to nine tools:

1. QR Generator — URL/text, preview, PNG.
2. vCard Generator — common contact fields, VCF.
3. Digital Business Card — one layout, themes, PNG, VCF, embedded contact QR.
4. JSON Formatter — format, minify, validate.
5. Base64 — UTF-8 text encode/decode.
6. URL Encoder — URI-component encode/decode.
7. UUID Generator — UUID v4.
8. Text Counter — characters, words, lines.
9. Case Converter — common case formats.

Everything else is post-v1.0 unless explicitly approved as a scope change. See the [feature backlog](docs/backlog/FEATURE-BACKLOG.md).

## Workflow and scope control

- One milestone = one feature branch = one PR and acceptance cycle.
- Do not merge implementation work until automated and user acceptance checks pass.
- Update this roadmap and `PROJECT_STATUS.md` as milestones progress.
- New ideas go to the backlog; they do not silently expand the active milestone.
