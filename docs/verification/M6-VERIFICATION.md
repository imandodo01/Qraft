# M6 — Integration and Release Hardening Verification

**Target:** Qraft v1.0.0  
**Status:** Final acceptance in progress  
**Evidence updated:** 2026-11-10

This checklist verifies the committed nine-tool release. It does not authorize new tools, backend services, accounts, hosted profiles, or automatic persistence.

## 1. Baseline and reproducibility

- [x] `npm ci` completed locally without installation failure.
- [x] `npm run lint` passed.
- [x] `npm run typecheck` passed.
- [x] `npm test` passed — 11 test files, 63 tests.
- [x] `npm run build` passed.
- [x] Production bundle output recorded: HTML 0.63 kB (0.37 gzip), CSS 22.13 kB (4.44 gzip), JS 75.15 kB (23.43 gzip).
- [x] Production-only audit reviewed: 0 vulnerabilities.
- [x] Full audit reviewed: 7 moderate findings in development dependency path; disposition recorded in `docs/security/DEPENDENCY-AUDIT.md`.
- [ ] Record exact local Node.js/npm versions and confirm lockfile unchanged after clean install.
- [ ] Record final CI result on this documentation PR head.

## 2. Nine-tool functional regression

- [x] Maintainer reports all nine tools functional on deployed Cloudflare Pages URL.
- [ ] Archive independent QR scanner result and decoded payload comparison.
- [ ] Archive VCF import result from a representative contact application.
- [ ] Archive business-card PNG dimensions (1200 × 675), legibility, and clipping check.
- [ ] Preserve detailed edge-case/export evidence for each tool if required for release audit.

The user-reported functional pass is recorded as manual acceptance evidence; it does not replace the outstanding independent artifact checks above.

## 3. Cross-cutting interaction and accessibility

- [x] Maintainer reports responsive and accessibility checks acceptable in the tested environment.
- [x] Incognito retest did not reproduce the asynchronous listener console error observed in the normal Chrome profile; extension interference is the likely explanation, not a confirmed root cause.
- [ ] Record exact browser/OS versions and the viewport widths checked.
- [ ] Record keyboard-only, semantic, contrast, reduced-motion, and zoom/reflow results individually.
- [ ] Do not claim Edge, Firefox, or mobile compatibility until each is tested and recorded.

## 4. Privacy and security

- [x] Maintainer reports Network inspection showed no unexpected transmission of user-entered data; PNG generation was the only noted activity during the tested flows.
- [x] Maintainer reports no unexpected automatic persistence of user-entered data in inspected browser storage.
- [x] Focused hostile HTML/script payload checks did not execute in the tested QR/vCard flows (previously reported).
- [x] Cloudflare Pages root response returned HTTP 200 over HTTPS on 2026-11-10.
- [x] Root response included CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy.
- [ ] Verify headers on representative static asset responses, not only the root document.
- [ ] Verify repository-level security settings and required CI enforcement.

The checked headers are evidence of configuration enforcement on the root response, not a complete security assessment. This project does not claim ASVS conformance.

## 5. Cloudflare Pages deployment

**Deployment:** https://qraft-9y9.pages.dev/

- [x] GitHub repository connected to Cloudflare Pages.
- [x] Build command `npm run build`, output `dist`, root `/`.
- [x] Cloudflare build completed successfully; supplied build log showed Node.js 24.22.1 and Vite build success.
- [x] Deployed site opened and all nine tools reported functional by maintainer.
- [x] HTTPS and configured security headers verified using `curl.exe -I`.
- [ ] Record direct route/refresh and asset MIME checks if separately required; hash-based routes do not require server-side rewrites.
- [ ] Verify production branch/automatic deployment behavior on a later reviewed change.

The earlier `npx wrangler deploy` failure occurred during a separate Workers setup attempt. The successful deployment is Cloudflare Pages; Wrangler deploy is not part of this Pages build workflow.

## 6. Defect triage and release decision

- [ ] No unresolved Blocker or High findings.
- [ ] All accepted v1.0 requirements have evidence or an explicitly accepted limitation.
- [ ] Project owner explicitly accepts the documented development-only dependency residual risk.
- [ ] Final user acceptance.
- [ ] CI green on final PR head.
- [ ] Release notes and deployment instructions accurate.
- [ ] Create tag `v1.0.0` and GitHub Release only after the above gates are satisfied.

## Evidence log

| Date | Environment / version | Check | Result | Evidence / issue |
|---|---|---|---|---|
| 2026-11-09 | GitHub | PR #9 Cloudflare Pages preparation merged | Pass | Merge commit `42db1a748804f9b749229503298d998654680df8` |
| 2026-11-10 | Local Windows PowerShell | `npm ci`, lint, typecheck, test, build | Pass | 63 tests / 11 files; production build successful |
| 2026-11-10 | Local Windows PowerShell | `npm audit` | Residual risk | 7 moderate development findings; minimatch path recorded in dependency audit |
| 2026-11-10 | Local Windows PowerShell | `npm audit --omit=dev` | Pass | 0 vulnerabilities |
| 2026-11-10 | Cloudflare Pages | Deployment functional check | Pass (maintainer-reported) | https://qraft-9y9.pages.dev/; nine tools reported functional |
| 2026-11-10 | Cloudflare Pages root response | HTTPS and response headers | Pass | `curl.exe -I` returned HTTP 200 and configured headers |

Automated checks, manual checks, static inspection, and unverified items are distinguished above. A successful build alone is not release acceptance.
