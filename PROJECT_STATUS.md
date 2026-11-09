# Qraft — Project Status

**Current release target:** v1.0  
**Active milestone:** M3 — Contact Studio: vCard Generator  
**Active branch:** `feature/m3-vcard-generator`  
**Status:** Implementation in progress

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

## Active milestone

### M3 — Contact Studio: vCard Generator

- [x] Create `feature/m3-vcard-generator` from accepted `main`.
- [x] Implement typed contact data and initial validation.
- [x] Implement vCard 3.0 serializer with escaping and UTF-8 line folding.
- [x] Add live preview, copy, download, and clear interactions.
- [x] Register the tool and connect its route.
- [x] Add serializer and validation tests.
- [x] GitHub Actions lint, typecheck, tests, and production build passed.
- [ ] Run lint, typecheck, tests, and production build locally.
- [ ] Verify downloaded VCF imports in independent contact applications.
- [ ] Complete responsive, keyboard, and privacy checks.
- [ ] Obtain user acceptance and merge the implementation PR.

Verification checklist: [M3 verification guide](docs/verification/M3-VERIFICATION.md).

## Deferred ideas

See [Feature Backlog](docs/backlog/FEATURE-BACKLOG.md). Backlog items do not expand the committed v1.0 scope.

## Workflow

1. Implement only the active milestone on its feature branch.
2. Run automated checks and inspect the diff.
3. Open a pull request to `main`.
4. Perform local and manual verification.
5. Fix issues on the same branch.
6. Merge only after explicit acceptance.
7. Start the next milestone from the updated `main`.
