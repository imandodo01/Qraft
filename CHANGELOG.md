# Changelog

All notable project changes will be documented here.

## [Unreleased]

### Added
- M1 application foundation: Vite, strict TypeScript, ESLint, Vitest, responsive shell, tool discovery, and hash routing.
- M2 QR Generator: local URL/plain-text QR generation, live preview, validation, and PNG export.
- M3 Contact Studio: typed vCard 3.0 serialization, preview, copy, VCF download, and QR contact sharing.
- M4 Digital Business Card: responsive landscape card, custom HEX accent color, PNG/VCF export, and contact QR.
- M5 Developer and Text Tools: JSON formatting, UTF-8 Base64, URI-component encoding, UUID v4, text counting, and case conversion.
- Security policy, architecture-based threat model, ASVS-oriented verification checklist, and dependency audit record.
- Feature backlog for deferred QR Studio and general product ideas.
- M6 integration and release-hardening verification checklist.

### Changed
- Updated roadmap, project status, and README to reflect the completed M1–M5 milestones and active M6 release-hardening work.
- Documented the nine-tool v1.0 scope and explicit post-v1.0 boundaries.

### Quality
- M2 passed CI and user-reported local/manual acceptance checks.
- M3 was accepted by the user and PR #5 was merged; detailed per-environment verification evidence remains in the M3 verification guide.
- M4 was accepted by the user and PR #7 was squash-merged into `main` on 2026-11-09.
- M5 was accepted by the user; local install, lint, typecheck, tests, production build, manual acceptance, and GitHub Actions CI were confirmed successful before PR #8 was squash-merged into `main` on 2026-11-09.
- Earlier dependency audit evidence reported zero production vulnerabilities and seven moderate development-dependency findings; M6 must re-run the audit and record the current result.
