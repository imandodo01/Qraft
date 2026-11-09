# Qraft Dependency Audit Record

**Review date:** 2026-11-09  
**Reviewed branch:** `docs/security-baseline`  
**Status:** Lockfile repair and CI verification complete; production audit clean; development dependency review remains open

## 1. Scope and evidence

The initial review inspected the M3 `main` commit (`6cebe8d`) and found that `package.json` declared `qrcode` and `@types/qrcode`, while the committed lockfile omitted those packages.

The maintainer regenerated and pushed the lockfile. The current PR head has since passed GitHub Actions `npm ci`, which validates the committed lockfile against the manifest.

### Direct dependency inventory

| Package | Manifest range | Role |
|---|---|---|
| `qrcode` | `^1.5.4` | Runtime QR generation |
| `@types/qrcode` | `^1.5.6` | Type declarations |
| `eslint` | `^9.36.0` | Development linting |
| `globals` | `^16.4.0` | ESLint globals |
| `typescript` | `^5.9.3` | Type checking |
| `typescript-eslint` | `^8.44.1` | TypeScript ESLint integration |
| `vite` | `^7.1.7` | Build and development server |
| `vitest` | `^5.1.0` | Test runner |

## 2. Lockfile reproducibility — resolved

- Initial mismatch: `qrcode` and `@types/qrcode` were absent from the lockfile.
- Maintainer regenerated and committed the lockfile.
- Local `npm ci` completed successfully.
- GitHub Actions PR run 42574811501 passed the Install dependencies step using `npm ci`.
- The same CI run passed lint, typecheck, tests, and production build.

The original lockfile mismatch is therefore resolved for the current PR head.

## 3. Vulnerability audit results

The maintainer ran `npm audit` and `npm audit --omit=dev` locally on 2026-11-09.

### Initial result after lockfile repair

- Full audit: **10 findings** — 8 moderate and 2 critical.
- Production-only audit: **0 findings**.
- The initial development dependency tree included critical `tinypool` advisories, moderate `@vitest/mocker` advisories, and moderate `minimatch` advisories.

### Targeted Vitest update

Vitest was updated to `5.1.0`. The maintainer's reported local evidence:

- `npm ls vitest @vitest/mocker tinypool` showed Vitest 5.1.0 and `@vitest/mocker` 5.1.0, with no Tinypool in that installed subtree.
- Full audit reduced to **7 moderate findings**.
- The remaining findings are associated with `minimatch` through the TypeScript ESLint dependency path.
- Production-only audit remained at **0 findings**.
- No blanket `npm audit fix --force` was used.

The exact npm advisory IDs and full JSON audit output have not been preserved in this repository record. Do not infer seven distinct root causes: the reported seven findings belong to the minimatch advisory family.

## 4. Remaining minimatch finding

The maintainer's reported dependency path is:

`typescript-eslint@8.72.1 → @typescript-eslint/typescript-estree@8.72.1 → minimatch@10.2.6`

The installed TypeScript ESLint package requests `minimatch ^10.2.2`. The npm advisory range reported by the maintainer includes versions 7.0.0 through 11.0.0, with 11.0.1 identified as the first fixed release.

A direct override to minimatch 11.x would fall outside the declared `^10.2.2` range. Do not apply it without explicit compatibility verification. Preferred next step: identify an upstream TypeScript ESLint release with a compatible patched dependency range. If no compatible release exists, assess an override in a separate focused dependency change and run lint, typecheck, tests, build, and both audits.

## 5. Verification evidence

### Maintainer-reported local checks

| Check | Result |
|---|---|
| `npm ci` | Passed |
| `npm audit` | 7 moderate development findings |
| `npm audit --omit=dev` | 0 findings |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm test` | Passed — 4 test files, 33 tests |

### GitHub Actions

PR head `f215b2d`, workflow run **42574811501**, job **129020025157**:

| Step | Result |
|---|---|
| Install dependencies (`npm ci`) | Passed |
| Lint | Passed |
| Type check | Passed |
| Run tests | Passed |
| Build production assets | Passed |

The CI run verifies the committed PR state for these steps. It does not execute npm audit or browser-based manual security checks.

## 6. Supply-chain and CI observations

- CI uses `npm ci` and the committed lockfile.
- The workflow declares `contents: read`.
- GitHub Actions are referenced by major-version tags (`actions/checkout@v4`, `actions/setup-node@v4)); immutable SHA pinning remains future hardening.
- Repository branch protection, Dependabot alert configuration, secret scanning, and private vulnerability reporting settings were not verified.
- An ESLint deprecation warning for installed ESLint 9.39.5 was observed during local installation. Treat this as a maintenance/lifecycle warning separate from npm audit vulnerability findings; it has not been upgraded as part of this work.

## 7. Acceptance criteria

- [x] Manifest and lockfile synchronized.
- [x] Clean local `npm ci` succeeds.
- [x] PR CI `npm ci` succeeds.
- [x] Full npm audit reviewed; remaining moderate development findings documented.
- [x] Production-only audit reports zero findings.
- [x] Critical Tinypool and Vitest/`@vitest/mocker` findings removed after targeted Vitest update.
- [ ] Remaining minimatch moderate findings remediated or explicitly accepted with documented rationale.
- [x] Lint, typecheck, tests, and production build pass in CI.
- [ ] Applicable manual security/privacy checks completed.
- [ ] Production hosting security headers verified before public release.
- [ ] Repository-level security settings verified.

## 8. Review history

| Date | Ref / evidence | Result |
|---|---|---|
| 2026-11-09 | `6cebe8d` | Static inventory identified manifest/lockfile mismatch. |
| 2026-11-09 | Maintainer local branch | Lockfile repaired; clean `npm ci`; first audit found 10 findings (8 moderate, 2 critical), production audit 0. |
| 2026-11-09 | Maintainer local branch | Vitest 5.1.0; lint, typecheck, and 33 tests passed; audit reduced to 7 moderate minimatch findings; production audit 0. |
| 2026-11-09 | PR CI run 42574811501 | `npm ci`, lint, typecheck, tests, and production build all passed. |
