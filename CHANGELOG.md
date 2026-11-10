# Changelog

All notable project changes will be documented here.

## [Unreleased]

### Added
- M1–M5: nine-tool browser-based digital toolbox.
- Security policy, architecture-based threat model, security verification checklist, and dependency audit record.
- Feature backlog for deferred QR Studio and general product ideas.
- M6 integration and release-hardening verification checklist.
- Cloudflare Pages deployment guide and static-hosting security-header baseline.

### Changed
- Selected and deployed Qraft on Cloudflare Pages at https://qraft-9y9.pages.dev/.
- Updated M6 status and verification records with maintainer-reported deployment, local test, privacy, and security-header evidence.

### Quality
- Maintainer-reported local verification on 2026-11-10: `npm ci`, lint, typecheck, production build passed; Vitest reported 63 tests across 11 files passed.
- Maintainer-reported local `npm audit --omit=dev`: 0 vulnerabilities.
- Full `npm audit`: 7 moderate findings associated with the development dependency path through TypeScript ESLint and minimatch. This remains an explicitly documented residual risk; the full audit is not clean.
- Maintainer verified the deployed Pages root response returned HTTP 200 and included the configured HSTS, CSP, nosniff, X-Frame-Options, Referrer-Policy, and Permissions-Policy headers.
- User reported all nine deployed tools functional and manual privacy, responsive, and accessibility checks acceptable. Detailed browser/version matrix and independent export-import evidence remain incomplete.
