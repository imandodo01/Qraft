# Changelog

All notable project changes will be documented here.

## [Unreleased]

### Added
- M1 application foundation: Vite, strict TypeScript, ESLint, Vitest, responsive shell, tool discovery, and hash routing.
- M2 QR Generator: local URL/plain-text QR generation, live preview, validation, and PNG export.
- M3 Contact Studio: typed vCard 3.0 serialization, preview, copy, VCF download, and QR contact sharing with PNG export (in progress).
- Feature backlog for deferred QR Studio and general product ideas.

### Changed
- vCard website fields now accept bare domains and default them to HTTPS while preserving explicit HTTP/HTTPS schemes.
- Tool discovery now reports QR Generator and vCard Generator as available.
- Roadmap and project status now reflect M2 acceptance and M3 implementation.

### Quality
- Automated tests cover QR validation/generation and vCard validation/serialization.
- M2 passed CI and user-reported local/manual acceptance checks.
