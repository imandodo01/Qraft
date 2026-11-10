# Qraft — Project Status

**Current release target:** v1.0.0  
**Completed milestones:** M1 Foundation, M2 QR Studio, M3 Contact Studio, M4 Digital Business Card, M5 Developer and Text Tools  
**Active work:** M6 Integration and Release Hardening  
**Active documentation branch:** `docs/m6-final-acceptance`  
**Static host:** Cloudflare Pages — deployed at https://qraft-9y9.pages.dev/

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

## M6 — Release hardening evidence

| Area | Current result |
|---|---|
| Cloudflare Pages deployment | Deployed and accessible at the Pages URL |
| Nine-tool functional check | User-reported pass |
| Local clean install | `npm ci` passed |
| Lint / TypeScript | Both passed locally |
| Automated tests | 63 tests across 11 files passed |
| Production build | Passed; JS 75.15 KB (23.43 KB gzip), CSS 22.13 KB (4.44 KB gzip) |
| Production dependency audit | 0 vulnerabilities |
| Full dependency audit | 7 moderate findings in development dependency path through `typescript-eslint → typescript-estree → minimatch@10.2.6`; disposition recorded as residual risk |
| HTTPS and response headers | Verified by maintainer using `curl.exe -I` against the deployed Pages URL |
| Privacy / storage / console | User-reported manual checks passed in tested Chrome session; extension-related console error absent in Incognito |
| Responsive / accessibility | User-reported manual review acceptable; detailed browser/version matrix not recorded |

The seven moderate audit findings are associated with the same minimatch advisory family, not seven independently established root causes. The vulnerable package is in development tooling; `npm audit --omit=dev` reports zero. An override to minimatch 11.x was not applied because the upstream TypeScript ESLint dependency currently declares `^10.2.2`, and compatibility has not been established. Revisit when upstream publishes a compatible fix. This is not a clean full audit.

## Remaining release gates

- [ ] Record the exact local Node.js/npm versions and confirm lockfile unchanged after `npm ci`.
- [ ] Confirm final export artifact details (QR scanner payload, VCF import in a contact app, business-card PNG dimensions/legibility).
- [ ] Record browser/device versions for any cross-browser claims; do not infer untested coverage.
- [ ] Verify repository-level security settings and required CI checks where access permits.
- [ ] Obtain green CI on the final documentation PR head.
- [ ] Complete final user acceptance and decide whether the documented development-only residual risk is acceptable for v1.0.0.

## References

- [M6 verification](docs/verification/M6-VERIFICATION.md)
- [Dependency audit record](docs/security/DEPENDENCY-AUDIT.md)
- [Security verification](SECURITY-VERIFICATION.md)
- [Cloudflare Pages deployment guide](docs/deployment/CLOUDFLARE-PAGES.md)

Qraft is not represented as ASVS-certified or fully security-audited.
