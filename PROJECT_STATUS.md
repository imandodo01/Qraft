# Qraft — Project Status

**Current release target:** v1.0  
**Active milestone:** M1 — Application Foundation  
**Active branch:** `feature/m1-foundation`  
**Status:** Implementation in progress

## Accepted baseline

- Product vision, principles, and initial release scope documented.
- Client-side TypeScript + Vite architecture selected.
- Design direction and privacy principles documented.
- Milestone-based workflow agreed.
- One feature branch and acceptance cycle per milestone.

## Current milestone

### M1 — Application Foundation

- [x] Create milestone branch from `main`.
- [x] Initialize package manifest and scripts.
- [x] Configure strict TypeScript.
- [x] Configure Vite and Vitest.
- [x] Configure ESLint.
- [x] Create responsive application shell.
- [x] Add typed tool registry and basic search/filter.
- [x] Add lightweight hash routing.
- [x] Add initial unit tests.
- [x] Add GitHub Actions CI workflow.
- [ ] Install dependencies and generate lockfile.
- [ ] Run lint, typecheck, tests, and production build.
- [ ] Verify desktop and mobile behavior.
- [ ] Open pull request and obtain acceptance.

## Verification record

No local build or browser verification has been recorded yet. GitHub file commits alone do not establish that the application builds or behaves correctly.

## Workflow

1. Implement only the active milestone on its feature branch.
2. Run automated checks and inspect the diff.
3. Open a pull request to `main`.
4. Perform local and manual verification.
5. Fix issues on the same branch.
6. Merge only after acceptance.
7. Start the next milestone from the updated `main`.

## Next milestone

M2 — QR Studio: evaluate a maintained QR generation library, implement URL/plain-text generation, preview, PNG export, validation, and scanner-based acceptance tests.
