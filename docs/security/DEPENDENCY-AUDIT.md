# Qraft Dependency Audit Record

**Review date:** 2026-11-09  
**Reviewed branch:** `docs/security-baseline`  
**Status:** Lockfile repaired; production audit clean; development dependency review remains open

## 1. Scope and evidence

The initial review inspected the M3 `main` commit (`6cebe8d`) and identified a mismatch: `package.json` declared `qrcode` and `@types/qrcode`, but the committed lockfile omitted both. The local maintainer regenerated the lockfile using npm on Node.js 22.12.0 / npm 10.9.0 and then completed a clean `npm ci`.

The repaired lockfile includes the missing root dependency metadata and package entries for `qrcode` and `@types/qrcode`. The local clean installation completed successfully and installed 183 audited packages.

### Current direct dependency inventory

| Package | Manifest range | Role |
|---|---|---|
| `qrcode` | `^1.5.4` | Runtime QR generation |
| `@types/qrcode` | `^1.5.6` | Type declarations (development only) |
| `eslint` | `^9.36.0` | Development linting |
| `globals` | `^16.4.0` | ESLint globals |
| `typescript` | `^5.9.3` | Type checking |
| `typescript-eslint` | `^8.44.1` | TypeScript ESLint integration |
| `vite` | `^7.1.7` | Build and development server |
| `vitest` | `^5.1.0` | Test runner |

## 2. Lockfile reproducibility finding — remediated locally

**Initial severity:** High for build/release reproducibility; not itself proof of an exploitable vulnerability.  
**Current local evidence:**
- `npm install --package-lock-only` regenerated dependency metadata.
- `git diff -- package-lock.json` showed the declared `qrcode` and `@types/qrcode` dependency metadata and package graph being added.
- `npm ci` completed successfully on the maintainer's Windows environment.
- The dependency tree includes `qrcode@1.5.4` and `@types/qrcode@1.5.6`.

The lockfile change still needs to be committed and verified by CI. The CI workflow is updated in this branch to use `npm ci`, so CI will validate the committed lockfile rather than silently resolving around it.

## 3. Vulnerability audit results

The maintainer ran the following local commands on 2026-11-09:

- `npm audit`
- `npm audit --omit=dev`

### Initial audit after lockfile repair

- Full audit: **10 vulnerabilities** — 8 moderate and 2 critical.
- Production-only audit: **0 vulnerabilities**.

The initial development findings were:
- `tinypool`: two critical prototype-pollution / potential remote-code-execution advisories, in the Vitest dependency tree.
- `@vitest/mocker`: two moderate advisories concerning path traversal / arbitrary file read and mock registration code injection.
- `minimatch`: moderate denial-of-service advisory through `typescript-eslint`'s dependency tree.

### Targeted Vitest update

Vitest was updated from 3.2.7 to 5.1.0. The maintainer's local evidence:

- `npm ls vitest @vitest/mocker tinypool` shows Vitest 5.1.0 and `@vitest/mocker` 5.1.0, with no Tinypool in that installed subtree.
- Full audit now reports **7 moderate vulnerabilities**, all associated with `minimatch` through `@typescript-eslint/typescript-estree`.
- The two critical Tinypool findings and two Vitest/`@vitest/mocker` findings no longer appear in the audit.
- Production-only audit remains at **0 vulnerabilities**.

No `npm audit fix --force` was used. The remaining `minimatch` finding is not marked remediated.

## 4. Local verification evidence

After the Vitest update, the maintainer reports:

| Check | Result |
|---|---|
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm test` | Passed — 4 test files, 33 tests |
| `npm run build` | Not yet reported |
| GitHub Actions with lockfile-based `npm ci` | Pending |

The local test run used Vitest 5.1.0. Production build must still be run and CI must pass before this baseline is accepted.

## 5. Remaining finding: minimatch (moderate)

The remaining audit path is:

`typescript-eslint@8.72.1` → `@typescript-eslint/typescript-estree@8.72.1` → `minimatch@10.2.6`.

The installed `typescript-eslint` release requests `minimatch ^10.2.2`. The advisory range reported by npm includes versions 7.0.0 through 11.0.0, with the first fixed release identified as 11.0.1. A blanket override to 11.x would violate the dependency's declared semver range. Do not apply that override without compatibility verification.

Required follow-up:
1. Identify a patched `typescript-eslint` release whose dependency constraints permit a fixed `minimatch`, or test an explicitly reviewed override with lint/typecheck and the full audit.
2. Re-run `npm audit` and `npm audit --omit=dev`.
3. Record advisory IDs, fixed versions, and the final dependency path from the actual audit JSON.

The npm audit output currently shows only the minimatch moderate finding family. The precise count is **7 moderate findings**, not seven distinct root causes.

## 6. Supply-chain and CI observations

- The repaired lockfile is committed as a required reproducibility control; CI now uses `npm ci`.
- The CI workflow requests `contents: read`.
- GitHub Actions are still referenced by major-version tags (`actions/checkout@v4`, `actions/setup-node@v4)); immutable SHA pinning remains future hardening.
- Repository branch protection, Dependabot alert configuration, secret scanning, and private vulnerability reporting settings were not verified.
- The deprecated warning for ESLint 9.39.5 was observed during installation. It is a lifecycle/maintenance concern, separate from the current npm audit findings, and is not yet upgraded.

## 7. Acceptance criteria

- [x] Local manifest and lockfile synchronized.
- [x] Local `npm ci` succeeds on Node.js 22.12.0 / npm 10.9.0.
- [ ] Committed lockfile passes clean CI `npm ci`.
- [x] Full npm audit reviewed; remaining moderate finding documented.
- [x] Production-only audit reports zero vulnerabilities.
- [x] Critical and Vitest-specific moderate findings resolved by targeted Vitest update.
- [ ] Remaining minimatch moderate finding remediated or explicitly accepted with documented rationale.
- [ ] Lint, typecheck, tests, and production build pass in CI.
- [ ] Applicable manual security/privacy checks completed.
- [ ] Production hosting security headers verified before public release.

## 8. Review history

| Date | Ref | Result |
|---|---|---|
| 2026-11-09 | `6cebe8d` | Static inventory identified manifest/lockfile mismatch; live audit had not yet been run. |
| 2026-11-09 | Local branch `docs/security-baseline` | Lockfile repaired; clean npm ci passed; first audit found 10 vulnerabilities (8 moderate, 2 critical), production audit 0. |
| 2026-11-09 | Local branch `docs/security-baseline` | Vitest updated to 5.1.0; lint, typecheck and 33 tests passed; audit reduced to 7 moderate minimatch findings; production audit 0. |
