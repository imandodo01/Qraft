# Qraft Security Verification

**Baseline:** OWASP Application Security Verification Standard (ASVS) 5.0.0, using relevant Level 1 topics as a pragmatic target  
**Process reference:** NIST SP 800-218, Secure Software Development Framework (SSDF) 1.1  
**Status:** Initial verification in progress; not an ASVS certification or conformance claim  
**Last reviewed:** 2026-11-09

## 1. Scope and status meanings

This checklist selects security topics relevant to Qraft's current static, browser-side architecture. It is not a complete reproduction of ASVS and does not establish ASVS Level 1 conformance.

- **Not assessed:** No adequate evidence has been collected.
- **Partial:** Some inspection or testing exists, but acceptance is incomplete.
- **Pass:** The defined verification was performed and evidence recorded.
- **Fail:** A requirement is not met; track remediation before release.
- **N/A:** The requirement does not apply to the documented architecture; explain why.

## 2. Application input and output safety

| ID | Requirement | Verification | Status / evidence |
|---|---|---|---|
| APP-01 | Treat user text, URLs, and future files as untrusted. | Trace input boundaries; test malformed and hostile values. | Partial — QR/vCard validators and serializer inspected; browser-level hostile-input cases remain. |
| APP-02 | User values must not be interpreted as HTML or executable code. | Test HTML/SVG/event-handler payloads and inspect DOM sinks. | Pass for tested payloads — maintainer manually tested `<img src=x onerror=alert(1)>` and `<script>alert(1)</script>` in QR and vCard inputs; no execution issue was observed. This is a focused check, not a complete XSS assessment. |
| APP-03 | Validate URL schemes before using values as navigable links. | Test `javascript:`, `data:`, `file:`, `ftp:`, malformed URLs, credentials, and control characters. | Partial — QR and vCard URL validators allow HTTP/HTTPS; credentials and broader edge-case policy need explicit review. |
| APP-04 | Exported vCard must prevent property injection and preserve valid data. | Test delimiters, newlines, Unicode, folding, and independent import. | Partial — serializer escapes text fields; phone control characters are rejected; email control characters are rejected. Hostile-input and independent-import evidence remains. |
| APP-05 | QR must encode the exact validated payload without truncation. | Compare payload and source; test capacity errors and independent scanners. | Partial — QR service encodes the supplied string and reports capacity errors; project owner confirmed normal QR generation. Dedicated hostile-payload and scanner evidence remains. |

## 3. Data protection and privacy

| ID | Requirement | Verification | Status / evidence |
|---|---|---|---|
| DATA-01 | Process tool input locally unless a disclosed feature requires network processing. | Use DevTools Network while entering/exporting synthetic data; inspect requests. | Pass for tested flows — maintainer reports no unexpected external data transmission during QR/vCard generation, copy, and download. |
| DATA-02 | Do not persist contact/user input without an explicit purpose and user control. | Inspect localStorage, sessionStorage, IndexedDB, Cache Storage, cookies, and service workers during use. | Pass for inspected browser storage — maintainer reports no automatic persistence of entered contact data. |
| DATA-03 | Do not put user content or personal data in logs, telemetry, or error reporting. | Inspect logging/telemetry integrations and exercise error paths. | Partial — reviewed QR/vCard paths use UI feedback rather than logging payloads; whole-app integration review remains. |
| DATA-04 | Distinguish local export from public hosted-profile sharing. | Review UI and privacy copy. | Pass for current scope — QR/VCF are local exports; hosted profiles are not implemented. Reassess if hosted features are added. |

## 4. Browser and deployment security

| ID | Requirement | Verification | Status / evidence |
|---|---|---|---|
| WEB-01 | Production deployment must use HTTPS. | Inspect deployed origin and redirects. | Not assessed — production host not deployed. |
| WEB-02 | Configure a restrictive CSP compatible with the production build. | Inspect response headers and test enforced policy. | Configured for Cloudflare Pages in `public/_headers`; enforcement and compatibility not yet tested on a Pages preview. |
| WEB-03 | Configure appropriate browser security headers. | Verify HSTS, nosniff, Referrer-Policy, and least-privilege Permissions-Policy. | Configured in `public/_headers`; actual response headers and HTTPS behavior remain unverified until preview deployment. |
| WEB-04 | Avoid unnecessary browser permissions. | Review permission use and prompts. | Partial — current tools do not request camera permission; full browser permission review remains. |
| WEB-05 | Handle Blob/object URLs and downloads safely. | Verify lifecycle, filenames, content types, and cleanup. | Partial — vCard download revokes its object URL; QR uses generated PNG data URLs. Browser download behavior and lifecycle checks remain. |

## 5. Dependencies and software supply chain

| ID | Requirement | Verification | Status / evidence |
|---|---|---|---|
| SUP-01 | Keep manifest and lockfile synchronized; use reproducible installs. | Run clean `npm ci` without lockfile mutation. | Pass — maintainer reports local clean install; GitHub Actions `npm ci` passed on PR head. |
| SUP-02 | Review known direct/transitive vulnerabilities. | Run `npm audit` and `npm audit --omit=dev`; review dependency paths and fixes. | Partial — latest maintainer-reported audit: 7 moderate findings through development dependency path `typescript-eslint → typescript-estree → minimatch`; production-only audit: 0. See dependency audit record. |
| SUP-03 | Minimize and review dependencies and GitHub Actions. | Review manifest, lockfile, and workflow references. | Partial — inventory reviewed; Actions use major-version tags rather than immutable SHA pins. |
| SUP-04 | CI runs lint, typecheck, tests, and production build. | Inspect workflow and successful PR run. | Pass — PR #6 CI run 42575345071 passed install, lint, typecheck, tests, and production build. |
| SUP-05 | Protect secrets and repository permissions. | Review repository settings, workflow permissions, branch protection, and secret scanning. | Partial — workflow declares `contents: read`; repository-level settings were not verified. |

## 6. Operational and release checks

| ID | Requirement | Verification | Status / evidence |
|---|---|---|---|
| OPS-01 | Provide a private security reporting and triage path. | Verify private vulnerability reporting or private maintainer contact. | Partial — policy is documented; GitHub repository feature configuration is not verified. |
| OPS-02 | Security-sensitive changes include regression tests and evidence. | Review PR, test output, and verification record. | Partial — process documented; apply to future security fixes. |
| OPS-03 | Reassess threats when adding persistence, network calls, uploads, accounts, or hosted profiles. | Include threat-model review in feature acceptance. | Partial — requirement is documented; future enforcement remains a project workflow responsibility. |

## 7. Minimum verification commands

Run from a clean checkout:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm audit
npm audit --omit=dev
```

The PR #6 GitHub Actions run passed `npm ci`, lint, typecheck, tests, and production build. The maintainer's latest local audit reported 7 moderate development-dependency findings and 0 production findings. Do not blindly apply `npm audit fix --force`; review dependency compatibility and rerun all checks after any dependency change.

## 8. Remaining release gate

Before public v1.0 release:

- Resolve Critical and High dependency findings, or document a justified, time-bounded exception with compensating controls.
- Remediate or explicitly accept the remaining 7 moderate development dependency findings after reviewing exact advisory IDs and reachability.
- Complete broader malformed-input tests, vCard import compatibility, and independent QR scanner checks for every shipped tool.
- Verify HTTPS and response headers on the actual Cloudflare Pages preview/production host.
- Verify repository-level security settings and required CI check enforcement.
- Reassess the threat model if persistence, network calls, uploads, accounts, or hosted profiles are introduced.

Do not describe Qraft as security-verified or ASVS-conformant until the applicable checks have been executed and evidence recorded.

## 9. References

- [OWASP ASVS 5.0.0 — official overview](https://asvs.owasp.org/)
- [OWASP ASVS 5.0.0 — official downloads](https://asvs.owasp.org/downloads/)
- [NIST SP 800-218 SSDF 1.1 — final publication](https://csrc.nist.gov/pubs/sp/800/218/final)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — awareness resource, not a substitute for verification requirements.
