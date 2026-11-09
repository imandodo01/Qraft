# Changelog

All notable project changes will be documented here.

## [Unreleased]

### Added
- M1 application foundation: Vite, strict TypeScript, ESLint, Vitest, responsive shell, tool discovery, and hash routing.
- M2 QR Generator: local URL/plain-text QR generation, live preview, validation, and PNG export.
- M3 Contact Studio: typed vCard 3.0 serialization, preview, copy, VCF download, and QR contact sharing with PNG export.
- Security policy, architecture-based threat model, ASVS-oriented verification checklist, and dependency audit record.
- Feature backlog for deferred QR Studio and general product ideas.

### Changed
- vCard website fields accept bare domains and default them to HTTPS while preserving explicit HTTP/HTTPS schemes.
- Tool discovery reports QR Generator and vCard Generator as available.
- Roadmap and project status reflect M3 acceptance and the pre-M4 Security Baseline.

### Quality
- Automated tests cover QR validation/generation and vCard validation/serialization.
- M2 passed CI and user-reported local/manual acceptance checks.
- M3 was accepted by the user and PR #5 was merged; detailed per-environment verification evidence remains in the M3 verification guide.
- Initial security documentation is in place. Dependency vulnerability audit and lockfile remediation remain pending.
