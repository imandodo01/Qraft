# Qraft — Project Status

**Current release:** [v1.0.0 — Initial Stable Release](https://github.com/imandodo01/Qraft/releases/tag/v1.0.0)  
**Release date:** 2026-11-10  
**Production deployment:** https://qraft-9y9.pages.dev/  
**Development status:** Paused after v1.0.0; no v1.1.0 scope or schedule has been approved.  
**Source of truth:** `main` and the published GitHub release.

## v1.0.0 release summary

Qraft is a local-first, browser-based digital toolbox. The initial stable release delivers all nine planned tools:

1. QR Generator.
2. vCard Generator.
3. Digital Business Card.
4. JSON Formatter.
5. Base64 (UTF-8 text).
6. URL Encoder (URI components).
7. UUID Generator (v4).
8. Text Counter.
9. Case Converter.

The release was published from `main` with tag `v1.0.0`. Release notes and known limitations are recorded on the [GitHub Release page](https://github.com/imandodo01/Qraft/releases/tag/v1.0.0).

## Release verification evidence

| Area | Result |
|---|---|
| GitHub Actions CI on final documentation PR | Passed |
| Maintainer-reported local clean install | `npm ci` passed |
| Lint / TypeScript | Passed locally |
| Automated tests | 63 tests across 11 files passed |
| Production build | Passed |
| Production dependency audit | 0 findings in `npm audit --omit=dev` |
| Full dependency audit | 7 moderate development-dependency findings remain; accepted for v1.0.0 |
| Cloudflare Pages | Deployed and accessible |
| HTTPS and configured response headers | Verified by maintainer against deployed root response |
| Nine-tool functional check | Maintainer-reported pass |
| QR, VCF, and business-card PNG exports | Maintainer-reported manual tests passed |
| Privacy, responsive, and accessibility checks | Maintainer-reported checks acceptable in tested environment |

These results distinguish automated CI/local checks from maintainer-reported manual acceptance. They do not establish exhaustive cross-browser coverage or formal security certification.

## Accepted limitations and follow-up

- Seven moderate findings remain in the development dependency path through `typescript-eslint → typescript-estree → minimatch@10.2.6`. They are recorded as an explicitly accepted residual risk for v1.0.0. No forced downgrade or unverified override was applied. Reassess and remediate in a subsequent version when a compatible upstream fix is available.
- Production-only audit reported zero findings; this does not make the full development dependency audit clean.
- Branch protection rules have been configured, but enforcement is pending migration to a GitHub Team/Organization account.
- Exact local Node.js/npm versions and a full cross-browser version matrix were not recorded.
- Qraft is not represented as ASVS-certified or fully security-audited.

## Development pause

Qraft v1.0.0 is released. Routine feature development is paused so effort can move to other portfolio work.

No v1.1.0 scope, priority order, or delivery date is committed. Future ideas are retained in the [feature backlog](docs/backlog/FEATURE-BACKLOG.md) as candidates only. Before restarting development, review the backlog, reassess dependency/security status, choose a small coherent scope, and create a new release plan.

## References

- [Published v1.0.0 release](https://github.com/imandodo01/Qraft/releases/tag/v1.0.0)
- [Feature backlog](docs/backlog/FEATURE-BACKLOG.md)
- [M6 verification](docs/verification/M6-VERIFICATION.md)
- [Dependency audit record](docs/security/DEPENDENCY-AUDIT.md)
- [Security verification](SECURITY-VERIFICATION.md)
- [Cloudflare Pages deployment guide](docs/deployment/CLOUDFLARE-PAGES.md)
