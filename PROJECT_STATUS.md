# Qraft — Project Status

**Current release target:** v1.0  
**Active milestone:** M2 — QR Studio  
**Active branch:** feature/m2-qr-studio  
**Status:** Implementation in progress

## Accepted baseline

- Product vision, principles, and nine-tool v1.0 scope documented.
- Client-side TypeScript + Vite architecture selected.
- Design direction and privacy principles documented.
- Milestone-based branch, PR, and acceptance workflow established.

## Completed milestone

### M1 — Application Foundation

- [x] Vite + strict TypeScript foundation.
- [x] ESLint and Vitest configuration.
- [x] Responsive application shell and initial visual system.
- [x] Typed tool registry, category filtering, and search.
- [x] Lightweight hash routing and not-found state.
- [x] Initial automated tests and GitHub Actions CI.
- [x] Lockfile committed.
- [x] Local automated checks and manual acceptance completed.
- [x] PR #1 merged into main.

## Active milestone

### M2 — QR Studio

- [x] Create feature/m2-qr-studio from accepted main.
- [x] Select the qrcode package behind a small service adapter.
- [x] Implement URL and plain-text validation.
- [x] Implement local PNG generation and live preview.
- [x] Add PNG download, clear action, and capacity feedback.
- [x] Add validation and QR service unit tests.
- [ ] Generate and commit the updated dependency lockfile.
- [ ] Run lint, typecheck, tests, and production build.
- [ ] Complete independent scanner verification.
- [ ] Complete responsive, keyboard, and privacy checks.
- [ ] Open PR and obtain explicit acceptance.

## Verification record

Implementation is on the M2 feature branch. Local automated checks and independent scanner verification are pending. GitHub Actions results will be recorded on the M2 pull request.

## Workflow

1. Implement only the active milestone on its feature branch.
2. Run automated checks and inspect the diff.
3. Open a pull request to main.
4. Perform local and manual verification.
5. Fix issues on the same branch.
6. Merge only after explicit acceptance.
7. Start the next milestone from the updated main.
