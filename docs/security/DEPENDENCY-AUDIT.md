# Qraft Dependency Audit Record

**Review date:** 2026-11-09  
**Reviewed ref:** `main` at `6cebe8df2cb103cb31bc0d3966ca1d5ae890a498`  
**Status:** Static inventory complete; vulnerability audit pending

## 1. Scope and evidence

The repository `package.json` and `package-lock.json` were inspected from the merged M3 `main` commit.

Declared direct dependencies:

| Package | Manifest range | Role |
|---|---|---|
| `qrcode` | `^1.5.4` | Runtime QR generation |
| `@types/qrcode` | `^1.5.6` | Type declarations (development only) |
| `eslint` | `^9.36.0` | Development linting |
| `globals` | `^16.4.0` | ESLint globals |
| `typescript` | `^5.9.3` | Type checking |
| `typescript-eslint` | `^8.44.1` | TypeScript ESLint integration |
| `vite` | `^7.1.7` | Build and development server |
| `vitest` | `^3.2.4` | Test runner |

The lockfile contains 204 package entries, but its root package metadata lists only the development dependencies and does not include `qrcode` or `@types/qrcode`. The lockfile package entries also do not contain either package.

## 2. Finding: manifest and lockfile are out of sync

**Severity:** High for build/release reproducibility; not by itself proof of an exploitable vulnerability.  
**Evidence:** `package.json` declares `qrcode` and `@types/qrcode`; the committed lockfile omits both.

### Impact

- A clean `npm ci` is expected to fail because the lockfile does not satisfy the package manifest.
- CI currently uses `npm install`, which can resolve and install dependencies without proving the committed lockfile is reproducible.
- Dependency review and vulnerability results cannot be treated as a reliable snapshot until the lockfile is corrected.

### Required remediation

1. From a clean local checkout, run `npm install` using the project's supported Node/npm versions to regenerate the lockfile.
2. Inspect the diff; ensure only expected dependency metadata and package entries changed.
3. Run `npm ci` from a clean checkout to verify lockfile reproducibility.
4. Run `npm audit --json` and record the resulting advisories and dependency paths.
5. Update CI to use `npm ci` instead of `npm install` after the lockfile has been repaired and verified.

Do not manually invent package integrity hashes or use `npm audit fix --force` as a shortcut.

## 3. Vulnerability audit status

A current `npm audit` command was not executed in this review environment. Therefore:

- No current vulnerability count or severity distribution is asserted.
- Historical vulnerability counts mentioned during earlier M3 work are not treated as current evidence.
- No package is declared safe or vulnerable based solely on its name or version inventory.
- No automatic dependency updates have been applied.

### Commands to run after lockfile remediation

```bash
npm ci
npm audit --json
npm audit --omit=dev --json
```

The full audit includes build/test tooling. The `--omit=dev` view helps distinguish production dependency exposure; it does not replace the full audit because build-time dependencies can affect shipped artifacts.

For each advisory, record:

- Package and installed version.
- Severity and advisory identifier/URL.
- Direct or transitive dependency path.
- Whether the affected code is included in production output or only used during development/build.
- Whether the vulnerable behavior is reachable in Qraft's usage.
- First non-vulnerable compatible version.
- Remediation and regression checks.

## 4. Current supply-chain observations

- The project commits a lockfile, but the current mismatch prevents treating it as a reliable reproducibility control.
- The CI workflow requests `contents: read`, which is a useful least-privilege default.
- The CI workflow currently uses `npm install`; change to `npm ci` after the lockfile is fixed.
- GitHub Actions are referenced by major version tags (`actions/checkout@v4`, `actions/setup-node@v4`). Pinning to immutable commit SHAs is a future hardening task.
- Repository branch protection, Dependabot alert configuration, secret scanning, and private vulnerability reporting settings were not verified in this review.

## 5. Acceptance criteria

- [ ] Manifest and lockfile are synchronized.
- [ ] `npm ci` succeeds from a clean checkout.
- [ ] Full `npm audit --json` result is reviewed and retained.
- [ ] Production-only audit result is reviewed.
- [ ] Critical and High findings are remediated or have an explicitly approved exception.
- [ ] CI installs from the lockfile using `npm ci`.
- [ ] Lint, typecheck, tests, and production build pass after remediation.

## 6. Review history

| Date | Ref | Result |
|---|---|---|
| 2026-11-09 | `6cebe8d` | Static manifest/lockfile inspection; lockfile mismatch identified; live npm audit pending. |
