# Qraft Security Verification

**Baseline:** OWASP Application Security Verification Standard (ASVS) 5.0.0, using relevant Level 1 topics as a pragmatic reference  
**Process reference:** NIST SP 800-218, Secure Software Development Framework (SSDF) 1.1  
**Status:** M6 evidence recorded; not an ASVS certification or conformance claim  
**Last reviewed:** 2026-11-10

## 1. Scope and status meanings

This checklist selects security topics relevant to Qraft's current static, browser-side architecture. It is not a complete reproduction of ASVS and does not establish ASVS Level 1 conformance.

- **Not assessed:** No adequate evidence has been collected.
- **Partial:** Some inspection or testing exists, but acceptance is incomplete.
- **Pass:** The defined verification was performed and evidence recorded.
- **Fail:** A requirement is not met; track remediation before release.
- **N/A:** The requirement does not apply to the documented architecture; explain why.

## 2. Application input and output safety

| ID | Requirement | Status / evidence |
|---|---|---|
| APP-01 | Treat user text, URLs, and future files as untrusted. | Partial — validators and serializer exist; complete hostile-input coverage across all tools is not recorded. |
| APP-02 | User values must not be interpreted as HTML or executable code. | Pass for focused tests — maintainer reported HTML/event-handler and script payloads did not execute in tested QR/vCard flows. Not a complete XSS assessment. |
| APP-03 | Validate URL schemes before using values as navigable links. | Partial — QR/vCard HTTP(S) validation is implemented; exhaustive scheme/credential/control-character test evidence is not recorded. |
| APP-04 | Exported vCard must prevent property injection and preserve valid data. | Partial — serializer escaping and line folding are implemented and unit-tested; independent contact-app import evidence remains to be recorded. |
| APP-05 | QR must encode the exact validated payload without truncation. | Partial — capacity handling is implemented and unit-tested; independent scanner payload evidence for the release is not recorded here. |

## 3. Data protection and privacy

| ID | Requirement | Status / evidence |
|---|---|---|
| DATA-01 | Process tool input locally unless a disclosed feature requires network processing. | Pass for maintainer-tested flows — DevTools Network review reported only expected application/resource and local PNG-generation activity; no unexpected user-input transmission was observed. |
| DATA-02 | Do not persist contact/user input without an explicit purpose and user control. | Pass for inspected flows — maintainer reports no unexpected automatic user-data persistence in browser storage. |
| DATA-03 | Do not put user content or personal data in logs, telemetry, or error reporting. | Partial — no unexpected data transmission was observed; a full application logging/telemetry source review is not recorded. |
| DATA-04 | Distinguish local export from public hosted-profile sharing. | Pass for current scope — QR/VCF are local exports; hosted profiles are not implemented. |

## 4. Browser and deployment security

| ID | Requirement | Status / evidence |
|---|---|---|
| WEB-01 | Production deployment must use HTTPS. | Pass for checked Pages URL — maintainer's 2026-11-10 `curl.exe -I` returned HTTP 200 over HTTPS. |
| WEB-02 | Configure a restrictive CSP compatible with the production build. | Pass for checked root response — CSP header was present; maintainer reports all nine tools functioned on the deployed site. |
| WEB-03 | Configure appropriate browser security headers. | Pass for checked root response — HSTS, nosniff, X-Frame-Options, Referrer-Policy, and Permissions-Policy were present. |
| WEB-04 | Avoid unnecessary browser permissions. | Partial — Permissions-Policy disables camera, microphone, geolocation, payment, and USB; a complete permissions/API source review is not recorded. |
| WEB-05 | Handle Blob/object URLs and downloads safely. | Partial — implementation patterns were previously reviewed; exhaustive cross-browser artifact lifecycle evidence remains. |

Checked origin: https://qraft-9y9.pages.dev/  
Evidence date: 2026-11-10. The header check was performed against the root response; it does not prove every possible path has identical behavior.

## 5. Dependencies and software supply chain

| ID | Requirement | Status / evidence |
|---|---|---|
| SUP-01 | Keep manifest and lockfile synchronized; use reproducible installs. | Pass — maintainer reported `npm ci` succeeded locally on 2026-11-10. |
| SUP-02 | Review known direct/transitive vulnerabilities. | Partial / residual risk — `npm audit --omit=dev` reported 0; full audit reported 7 moderate development findings in the TypeScript ESLint → typescript-estree → minimatch path. Disposition is recorded in [DEPENDENCY-AUDIT.md](docs/security/DEPENDENCY-AUDIT.md). |
| SUP-03 | Minimize and review dependencies and GitHub Actions. | Partial — dependency path reviewed; repository settings and immutable Action SHA pinning remain outside this verification. |
| SUP-04 | CI runs lint, typecheck, tests, and production build. | Pass for the prior recorded PR CI run; final M6 documentation PR CI remains pending. |
| SUP-05 | Protect secrets and repository permissions. | Partial — workflow permissions were previously inspected; repository-level branch protection, secret scanning, and vulnerability reporting settings are not verified. |

## 6. Operational and release checks

| ID | Requirement | Status / evidence |
|---|---|---|
| OPS-01 | Provide a private security reporting and triage path. | Partial — policy is documented; GitHub repository feature configuration is not verified. |
| OPS-02 | Security-sensitive changes include regression tests and evidence. | Partial — process documented; future enforcement remains a project responsibility. |
| OPS-03 | Reassess threats when adding persistence, network calls, uploads, accounts, or hosted profiles. | Partial — requirement documented; reassess on future scope changes. |

## 7. Verification commands and latest maintainer evidence

```bash
npm ci
npm audit
npm audit --omit=dev
npm run lint
npm run typecheck
npm test
npm run build
```

On 2026-11-10, maintainer-reported results: clean install passed; full audit 7 moderate; production-only audit 0; lint and typecheck passed; Vitest 11 files / 63 tests passed; production build passed. The Cloudflare build log also showed the Vite production build completing successfully.

## 8. Remaining release considerations

- The seven moderate development-only findings remain a documented residual risk, not a clean audit. Reassess when upstream TypeScript ESLint supports a compatible patched minimatch version.
- Record repository-level security settings and required CI check enforcement.
- Complete independent QR scanner and contact-app VCF import evidence if those are part of the final release acceptance.
- Do not describe Qraft as ASVS-certified or fully security-audited.

## 9. References

- [OWASP ASVS 5.0.0 — official overview](https://asvs.owasp.org/)
- [OWASP ASVS 5.0.0 — official downloads](https://asvs.owasp.org/downloads/)
- [NIST SP 800-218 SSDF 1.1 — final publication](https://csrc.nist.gov/pubs/sp/800/218/final)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — awareness resource, not a substitute for verification requirements.
