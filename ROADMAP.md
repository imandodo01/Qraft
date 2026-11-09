# Qraft — Roadmap

**Target:** v1.0  
**Approach:** One milestone per feature branch and acceptance cycle. The accepted `main` branch is the source of truth.

## M0 — Product and repository planning

- [x] Product vision, principles, initial v1.0 scope, architecture, design direction, and development conventions.
- [x] Quality and architecture review with accepted/deferred/rejected decisions ([review](docs/planning/QUALITY-ARCHITECTURE-REVIEW.md)).

**Exit criteria:** Product scope, technical direction, and quality decisions are documented.

## M1 — Application foundation

**Branch:** `feature/m1-foundation`  
**Status:** Completed; PR #1 merged into `main`.

- [x] Vite + strict TypeScript foundation, Vitest, ESLint, responsive shell.
- [x] Tool registry, search, category filtering, and hash routing.
- [x] Initial tests and GitHub Actions CI.
- [x] Local automated checks and manual desktop/mobile/navigation acceptance.

Verification: [M1 verification guide](docs/verification/M1-VERIFICATION.md).

## M2 — QR Studio

**Implementation:** [PR #4](https://github.com/imandodo01/Qraft/pull/4)  
**Status:** Completed; PR #4 merged after CI, local automated checks, and user manual verification.

- [x] URL/plain-text QR generation, live preview, validation, and PNG export.
- [x] Unicode and independent scanner verification.
- [x] Responsive, keyboard, and privacy checks.

Verification: [M2 verification guide](docs/verification/M2-VERIFICATION.md).

## M3 — Contact Studio: vCard Generator

**Implementation:** [PR #5](https://github.com/imandodo01/Qraft/pull/5)  
**Status:** Completed; PR #5 merged into `main` on 2026-11-09.

- [x] Typed contact fields, validation, and vCard 3.0 serialization.
- [x] Preview, copy, VCF download, and QR contact sharing.
- [x] Unicode, escaping, and UTF-8 line-folding tests.
- [x] User acceptance and PR merge.

Verification: [M3 verification guide](docs/verification/M3-VERIFICATION.md). The record does not imply unreported cross-application or security tests.

## Security Baseline — pre-M4 gate

**Status:** Baseline documentation and focused checks recorded in PR #6. Remaining dependency and production-hosting work is carried into M6.

- [x] Security policy, threat model, and ASVS-oriented verification checklist.
- [x] Dependency inventory, lockfile repair, and clean-install verification.
- [x] Production-only audit reported zero findings; seven moderate development dependency findings were documented.
- [x] Focused maintainer-reported XSS, network, and browser-storage checks for tested QR/vCard flows.
- [ ] Reassess dependencies and verify production hosting headers before public release.

Documents: [Security policy](SECURITY.md), [Threat model](THREAT-MODEL.md), [Security verification](SECURITY-VERIFICATION.md), and [Dependency audit](docs/security/DEPENDENCY-AUDIT.md).

This baseline is not an ASVS certification.

## M4 — Digital Business Card

**Implementation:** [PR #7](https://github.com/imandodo01/Qraft/pull/7)  
**Status:** Completed; PR #7 squash-merged into `main` on 2026-11-09.

- [x] Responsive landscape card with live preview, light/dark theme, and custom HEX accent.
- [x] Canvas PNG export (1200 × 675), VCF download, and embedded vCard QR reusing M2/M3 services.
- [x] QR capacity fallback preserves VCF and card PNG export.
- [x] Automated checks and user acceptance.

Verification: [M4 verification checklist](docs/verification/M4-VERIFICATION.md). Hosted profiles and backend functionality remain out of scope.

## M5 — Developer and Text Tools

**Implementation:** [PR #8](https://github.com/imandodo01/Qraft/pull/8)  
**Branch:** `feature/m5-developer-text-tools`  
**Status:** Completed; PR #8 squash-merged into `main` on 2026-11-09.

- [x] JSON formatter, minifier, and validator.
- [x] UTF-8 Base64 encoder/decoder.
- [x] URI-component encoder/decoder.
- [x] UUID v4 generator using secure browser randomness.
- [x] Unicode-aware text counter.
- [x] Case converter with seven modes.
- [x] Registry and route integration.
- [x] User-confirmed local install, lint, typecheck, tests, production build, and manual acceptance.
- [x] GitHub Actions CI green.

Verification: [M5 verification guide](docs/verification/M5-VERIFICATION.md).

## M6 — Integration and release hardening

**Implementation branch:** `feature/m6-release-hardening`  
**Status:** In progress.  
**Selected static host:** Cloudflare Pages (selected; deployment not yet performed).

- [ ] Full regression testing across all nine v1.0 tools.
- [ ] Cross-browser export verification with tested versions recorded.
- [ ] Responsive, keyboard, and accessibility review.
- [ ] Privacy and browser-network review.
- [ ] Performance and production bundle review.
- [ ] Reproducible clean install and production build using the committed lockfile and documented Node.js version.
- [x] Select static host and document Cloudflare Pages build settings.
- [ ] Verify preview deployment, HTTPS, security headers, and production asset behavior.
- [ ] Complete README, changelog, and deployment instructions.
- [ ] Complete applicable security verification and resolve release-blocking findings.
- [ ] Resolve all release-blocking defects.
- [ ] Final user acceptance and green CI on the final PR head.

Verification: [M6 release hardening checklist](docs/verification/M6-VERIFICATION.md).  
Deployment: [Cloudflare Pages guide](docs/deployment/CLOUDFLARE-PAGES.md).

**Exit criteria:** All v1.0 acceptance criteria pass on a production build, including real export checks, privacy review, security verification, deployment checks, and browser acceptance.

## v1.0 minimum feature commitment

The initial release is limited to these nine tools:

1. QR Generator — URL/text, preview, PNG.
2. vCard Generator — common contact fields, VCF.
3. Digital Business Card — one layout, theme choices, PNG, VCF, embedded contact QR.
4. JSON Formatter — format, minify, validate.
5. Base64 — UTF-8 text encode/decode.
6. URL Encoder — URI-component encode/decode.
7. UUID Generator — UUID v4.
8. Text Counter — characters, words, lines.
9. Case Converter — common case formats.

Everything else is post-v1.0 unless explicitly approved as a scope change. See the [feature backlog](docs/backlog/FEATURE-BACKLOG.md).

## Workflow and scope control

- One milestone = one feature branch = one PR and acceptance cycle.
- Preparation documents can be reviewed in parallel; implementation remains sequential where interfaces depend on earlier milestones.
- Do not merge an implementation milestone until automated and user acceptance checks pass.
- Update this roadmap and `PROJECT_STATUS.md` as milestones progress.
- New ideas go to the backlog; they do not silently expand the active milestone.
- Apply the [Quality and Architecture Review](docs/planning/QUALITY-ARCHITECTURE-REVIEW.md) without expanding the v1.0 feature commitment.
