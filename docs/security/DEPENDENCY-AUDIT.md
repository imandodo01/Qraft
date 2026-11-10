# Qraft Dependency Audit Record

**Review date:** 2026-11-10  
**Reviewed source:** Maintainer local checkout at `C:\iman\qraft`  
**Status:** Production audit clean; seven moderate development findings reviewed and recorded as residual risk for v1.0.0 consideration.

## 1. Current evidence

The maintainer ran `npm ci`, `npm audit`, `npm audit --omit=dev`, and `npm ls` locally on 2026-11-10.

| Check | Result |
|---|---|
| `npm ci` | Passed; 166 packages installed, 167 audited |
| `npm audit` | 7 moderate findings |
| `npm audit --omit=dev` | 0 vulnerabilities |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm test` | Passed — 11 files, 63 tests |
| `npm run build` | Passed |

Build output reported:
- `dist/index.html`: 0.63 kB (0.37 kB gzip)
- CSS: 22.13 kB (4.44 kB gzip)
- JavaScript: 75.15 kB (23.43 kB gzip)

## 2. Finding and dependency path

The npm audit output reports advisory **GHSA-g3hv-75wg-m249**, a moderate-severity minimatch denial-of-service issue involving globparts amplification. The seven audit findings belong to this minimatch advisory/dependency family; they should not be represented as seven independently established root causes.

The maintainer's `npm ls` output identified the relevant path:

`typescript-eslint@8.72.1 → @typescript-eslint/typescript-estree@8.72.1 → minimatch@10.2.6`

The installed `typescript-estree` package declares `minimatch ^10.2.2`. The separate `minimatch@3.1.5` copies shown under ESLint are outside the advisory range reported by this audit.

## 3. Remediation assessment

The maintainer checked registry metadata:
- `npm view typescript-eslint version` returned `8.72.2`.
- `npm view @typescript-eslint/typescript-estree@latest dependencies` still showed `minimatch: ^10.2.2`.
- `npm view minimatch version` returned `11.0.5`; its engine range supports Node 20 or >=22.
- The audit remediation suggestion involved a forced change to an older `typescript-eslint` release and was not accepted.

A minimatch 11.x override would fall outside the declared `^10.2.2` dependency range. No override or forced downgrade was applied because compatibility has not been demonstrated. ESLint was not upgraded as part of this review; its deprecation warning is a separate maintenance issue, not the cause of the minimatch advisory.

## 4. Disposition

**Disposition:** Accepted as a development-tooling residual risk for consideration in the v1.0.0 release decision, not remediated.

Rationale:
- The affected dependency path is used by development lint tooling, not the shipped production dependency set.
- The production-only audit reports zero vulnerabilities.
- Lint, typecheck, all 63 tests, and production build passed with the installed dependency tree.
- A forced downgrade or out-of-range override would introduce compatibility risk without verified benefit.

Compensating controls and follow-up:
- Do not expose the development toolchain as a production runtime service.
- Keep CI checks enabled and use the committed lockfile with `npm ci`.
- Reassess when TypeScript ESLint publishes a compatible dependency range containing a patched minimatch version.
- Re-run both audit commands and the full test/build suite after dependency changes.
- This exception does not cover any future Critical or High findings and must be reconsidered for later releases.

This is a documented risk acceptance for review by the project owner, not a claim that the full dependency audit is clean.

## 5. Evidence limitations

The complete `audit-report.json` was generated locally but was not supplied for repository archival. The report above records the advisory identifier and dependency path visible in the maintainer-provided terminal output. The seven npm findings should not be counted as seven distinct vulnerabilities without the full JSON report.
