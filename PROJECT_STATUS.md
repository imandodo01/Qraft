# Qraft — Project Status

**Current release target:** v1.0  
**Completed milestones:** M1 Foundation, M2 QR Studio, M3 Contact Studio  
**Active work:** Security Baseline before M4  
**Active branch:** `docs/security-baseline`

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

## Active work — Security Baseline

- [x] Add `SECURITY.md` policy and reporting guidance.
- [x] Add `THREAT-MODEL.md` for the current local-first architecture.
- [x] Add `SECURITY-VERIFICATION.md` based on relevant ASVS 5.0.0 topics.
- [x] Add dependency audit inventory and findings.
- [ ] Repair package manifest/lockfile mismatch.
- [ ] Run current npm vulnerability audit and review findings.
- [ ] Complete applicable manual security/privacy checks.
- [ ] Verify production hosting security headers before public release.

See [Security Baseline](SECURITY-VERIFICATION.md) and [Dependency Audit](docs/security/DEPENDENCY-AUDIT.md).

## Next milestone — M4 Digital Business Card

Preparation: [M4 Business Card plan](docs/planning/M4-BUSINESS-CARD-PLAN.md).

M4 implementation begins after the Security Baseline exit criteria are met. Keep hosted profiles and backend functionality out of scope.

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
