# Qraft — Project Status

**Current release target:** v1.0  
**Completed milestones:** M1 Foundation, M2 QR Studio, M3 Contact Studio, M4 Digital Business Card, M5 Developer and Text Tools  
**Active work:** M6 Integration and Release Hardening  
**Active branch:** `feature/m6-release-hardening`

## Accepted baseline

- Nine-tool v1.0 scope and client-side TypeScript + Vite architecture are established.
- No account, backend, hosted public profile, or automatic contact-data persistence is required for v1.0.
- Milestone-based branch, PR, and acceptance workflow is established.

## Completed milestones

| Milestone | Outcome | Merge |
|---|---|---|
| M1 — Application Foundation | Vite, strict TypeScript, ESLint, Vitest, responsive shell, tool registry, search, routing, CI | PR #1 |
| M2 — QR Studio | Local URL/text QR generation, preview, validation, PNG export, independent scanner verification | PR #4 |
| M3 — Contact Studio | vCard 3.0 validation/serialization, preview, copy, VCF export, QR contact sharing | PR #5 |
| M4 — Digital Business Card | Responsive card, themes/accent, 1200 × 675 PNG, VCF, embedded contact QR | PR #7 |
| M5 — Developer and Text Tools | JSON, UTF-8 Base64, URI component, UUID v4, text counter, case converter | PR #8 |

M3, M4, and M5 were merged into `main` on 2026-11-09. M4 and M5 were squash-merged. See each [verification guide](docs/verification/) for the recorded evidence and limits. Completion of a milestone does not imply unrecorded cross-browser, security, or deployment tests.

## Security baseline

- [x] Security policy, threat model, and verification checklist added.
- [x] Lockfile consistency and clean install recorded.
- [x] Focused maintainer-reported XSS, network, and browser-storage checks recorded for tested QR/vCard flows.
- [ ] Remaining dependency advisories reviewed and disposition recorded.
- [ ] Production HTTPS and response headers verified on the selected host.
- [ ] Repository-level security settings verified where access permits.

The previous maintainer-reported audit recorded zero production findings and seven moderate development dependency findings through the TypeScript ESLint dependency path. Re-run the audit during M6; do not assume the old result is current.

## Active — M6 Integration and Release Hardening

- [ ] Full regression across all nine tools and shared navigation.
- [ ] Validate actual QR PNG, VCF, and business-card PNG artifacts.
- [ ] Cross-browser and mobile acceptance with versions recorded.
- [ ] Keyboard, semantic accessibility, contrast, and responsive review.
- [ ] Network, storage, DOM-sink, and dependency security review.
- [ ] Bundle/performance review.
- [ ] Reproducible install/build and Node.js version documentation.
- [ ] Static host selection, deployment, direct-route/refresh, HTTPS, and security-header verification.
- [ ] Final release documentation and defect triage.
- [ ] User final acceptance and green CI.

Implementation branch: `feature/m6-release-hardening`.  
Verification checklist: [M6 verification guide](docs/verification/M6-VERIFICATION.md).

## Deferred ideas

See [Feature Backlog](docs/backlog/FEATURE-BACKLOG.md). Deferred items do not expand the committed v1.0 scope.

## Workflow

1. Work only within the active milestone branch.
2. Run focused and full automated checks; inspect the diff.
3. Open a PR to `main`.
4. Complete local and manual verification.
5. Fix issues on the same branch.
6. Merge only after explicit user acceptance.
