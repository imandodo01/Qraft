# Changelog

All notable project changes will be documented here.

## [Unreleased]

### Added
- M1 application foundation: Vite, strict TypeScript, ESLint, Vitest, responsive shell, tool discovery, and hash routing.
- M2 QR Generator: local URL/plain-text QR generation, live preview, validation, and PNG export.
- M3 Contact Studio: typed vCard 3.0 serialization, preview, copy, VCF download, and QR contact sharing with PNG export.
- M4 Digital Business Card: responsive landscape card, custom HEX accent color, PNG/VCF export, and contact QR.
- M5 Developer and Text Tools: JSON formatting, UTF-8 Base64, URI-component encoding, UUID v4, text counting, and case conversion (implementation in progress).
- Security policy, architecture-based threat model, ASVS-oriented verification checklist, and dependency audit record.
- Feature backlog for deferred QR Studio and general product ideas.

### Changed
- vCard website fields accept bare domains and default them to HTTPS while preserving explicit HTTP/HTTPS schemes.
- Tool discovery reports the M1–M4 tools and six M5 utilities as available while M5 verification remains in progress.
- Roadmap and project status reflect M3 acceptance and the pre-M4 Security Baseline.

### Quality
- Automated tests cover QR validation/generation and vCard validation/serialization.
- M2 passed CI and user-reported local/manual acceptance checks.
- M3 was accepted by the user and PR #5 was merged; detailed per-environment verification evidence remains in the M3 verification guide.
- M4 was accepted by the user and PR #7 was squash-merged into `main` on 2026-11-09.
- M5 initial unit coverage added for JSON, Base64, URI components, UUID v4, text counts, and case conversion; local/CI verification is pending.
- Repaired the dependency lockfile and changed CI installation to `npm ci`.
- Updated Vitest to 5.1.0; local lint, typecheck, and 33 tests passed. Production audit reports zero vulnerabilities; seven moderate minimatch findings remain under review.
