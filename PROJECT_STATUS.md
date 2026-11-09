# Qraft — Project Status

**Current release target:** v1.0  
**Completed milestones:** M1 Foundation, M2 QR Studio, M3 Contact Studio  
**Active work:** M4 Digital Business Card implementation; local acceptance pending  
**Active branch:** `feature/m4-business-card`

## Accepted baseline

- Product vision, principles, and nine-tool v1.0 scope documented.
- Client-side TypeScript + Vite architecture selected.
- Design direction and privacy principles documented.
- Milestone-based branch, PR, and acceptance workflow established.

## Completed milestones

### M1 — Application Foundation

- [x] Vite + strict TypeScript foundation.
- [x] ESLint and Vitest configuration.
- [x] Responsive application shell and initial visual system.
- [x] Typed tool registry, category filtering, and search.
- [x] Lightweight hash routing and not-found state.
- [x] Initial automated tests and GitHub Actions CI.
- [x] Lockfile committed.
- [x] Local automated checks and manual acceptance completed.
- [x] PR #1 merged into `main`.

Verification: [M1 verification guide](docs/verification/M1-VERIFICATION.md).

### M2 — QR Studio

- [x] URL and plain-text validation.
- [x] Local QR generation and live preview using `qrcode`.
- [x] PNG download, clear action, and capacity feedback.
- [x] Automated validation and QR service tests.
- [x] Dependency lockfile committed.
- [x] CI lint, typecheck, tests, and production build passed.
- [x] User local lint, typecheck, tests, and production build passed.
- [x] User manual functional, scanner, responsive, keyboard, and privacy checks passed.
- [x] PR #4 merged into `main`.

Verification: [M2 verification guide](docs/verification/M2-VERIFICATION.md).

### M3 — Contact Studio: vCard Generator

- [x] Typed contact data and validation.
- [x] vCard 3.0 serializer with escaping and UTF-8 line folding.
- [x] Live preview, copy, VCF download, and clear interactions.
- [x] Website URL normalization and validation.
- [x] QR preview and PNG export from the exact serialized vCard payload.
- [x] Automated tests for validation, serialization, and QR generation/capacity behavior.
- [x] User confirmed behavior met expectations and QR generation worked.
- [x] PR #5 merged into `main` on 2026-11-09.

Verification record: [M3 verification guide](docs/verification/M3-VERIFICATION.md). Detailed per-environment evidence remains subject to the recorded checklist; do not infer unreported import, browser, or security tests.

## Security Baseline

- [x] Security policy, threat model, and verification checklist added.
- [x] Lockfile consistency and clean install recorded.
- [x] Focused maintainer-reported XSS, network, and browser-storage checks recorded.
- [ ] Remaining dependency and production-hosting security work is tracked for release hardening.

## Active work — M4 Digital Business Card

- [x] Add `SECURITY.md` policy and reporting guidance.
- [x] Add `THREAT-MODEL.md` for the current local-first architecture.
- [x] Add `SECURITY-VERIFICATION.md` based on relevant ASVS 5.0.0 topics.
- [x] Add dependency audit inventory and findings.
- [x] Repair package manifest/lockfile mismatch; local `npm ci` succeeded.
- [x] Run current npm vulnerability audit; production audit is clean, seven moderate minimatch findings remain under review.
- [ ] Complete applicable manual security/privacy checks.
- [ ] Verify production hosting security headers before public release.

See [Security Baseline](SECURITY-VERIFICATION.md) and [Dependency Audit](docs/security/DEPENDENCY-AUDIT.md).

## Next milestone — M4 Digital Business Card

Preparation: [M4 Business Card plan](docs/planning/M4-BUSINESS-CARD-PLAN.md).

- [x] Business-card contact fields, one landscape layout, and live preview.
- [x] Light/dark theme and five accent choices.
- [x] Browser-native PNG export at 1200 × 675; no new package dependency.
- [x] VCF download and QR generation reuse existing vCard and QR services.
- [x] Validation and vCard mapping automated tests added.
- [ ] Run local lint, typecheck, test, and production build.
- [ ] Complete manual PNG, VCF import, QR scanner, responsive, keyboard, and privacy checks.

Verification: [M4 verification checklist](docs/verification/M4-VERIFICATION.md). Hosted profiles and backend functionality remain out of scope.

## Deferred ideas

See [Feature Backlog](docs/backlog/FEATURE-BACKLOG.md). Backlog items do not expand the committed v1.0 scope.

## Workflow

1. Work only within the active milestone on its feature branch.
2. Run automated checks and inspect the diff.
3. Open a pull request to `main`.
4. Perform local and manual verification.
5. Fix issues on the same branch.
6. Merge only after explicit acceptance.
7. Start the next milestone from the updated `main`.
