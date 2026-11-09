# Qraft Security Verification

**Baseline:** OWASP Application Security Verification Standard (ASVS) 5.0.0, using relevant Level 1 requirements as a pragmatic target  
**Process reference:** NIST SP 800-218, Secure Software Development Framework (SSDF) 1.1  
**Status:** Initial checklist; verification not yet complete  
**Last reviewed:** 2026-11-09

## 1. How to use this checklist

This checklist selects security topics relevant to Qraft's current static, browser-side architecture. It is not a complete reproduction of ASVS, a certification, or evidence that Qraft conforms to ASVS Level 1.

Use version-qualified ASVS references when recording requirement-level evidence (for example, `v5.0.0-<requirement-id>`). Confirm exact requirement identifiers in the official ASVS 5.0.0 release before adding them to an assessment.

Status meanings:

- **Not assessed:** No adequate evidence has been collected.
- **Partial:** Some implementation or testing evidence exists, but acceptance is incomplete.
- **Pass:** The defined verification was performed and evidence recorded.
- **Fail:** A requirement is not met; track remediation before release.
- **N/A:** The requirement does not apply to the documented current architecture; explain why.

## 2. Application input and output safety

| ID | Security requirement | Verification method | Current status |
|---|---|---|---|
| APP-01 | Treat all user-provided text, URLs, and future files as untrusted. | Trace input boundaries for each tool; test malformed and hostile values. | Partial — validation exists for current QR/vCard flows; comprehensive review pending. |
| APP-02 | User-controlled values must not be interpreted as HTML or executable code. | Test payloads such as `<img src=x onerror=alert(1)>`, SVG/event-handler strings, quotes, and template delimiters; inspect DOM sinks. | Partial — current vCard preview uses text assignment; all dynamic sinks require review. |
| APP-03 | Validate URLs against an explicit scheme allowlist before using them as navigable links. | Test `javascript:`, `data:`, `file:`, `ftp:`, malformed URLs, credentials, and control characters. | Partial — vCard website validation allows HTTP/HTTPS; future consumers need separate checks. |
| APP-04 | Exported vCard content must preserve data without injection through escaping or malformed line handling. | Unit tests for delimiters, newlines, Unicode, folding, and import in independent applications. | Partial — serializer tests and user acceptance exist; security-focused hostile-input suite pending. |
| APP-05 | QR output must represent the exact validated payload and must not silently truncate content. | Compare encoded payload to source; test capacity failures and scan with independent scanners. | Partial — current functional acceptance reported by project owner; security-specific regression evidence pending. |

## 3. Data protection and privacy

| ID | Security requirement | Verification method | Current status |
|---|---|---|---|
| DATA-01 | Tool input is processed locally unless an explicitly disclosed feature requires network processing. | Use browser DevTools Network while entering and exporting synthetic contact/text data; inspect requests and dependency behavior. | Partial — local-only design and code paths observed; repeatable recorded network evidence pending. |
| DATA-02 | Do not persist user input or contact data without an explicit documented purpose and user control. | Inspect localStorage, sessionStorage, IndexedDB, Cache Storage, cookies, and service workers during use. | Partial — no intentional persistence observed in current tool paths; full browser-storage verification pending. |
| DATA-03 | Do not place user content, secrets, or personal data in logs, telemetry, or error reporting. | Inspect logging, telemetry, and error-reporting integrations; test error paths. | Not assessed. |
| DATA-04 | Clearly distinguish local vCard/QR export from public hosted profile sharing. | Review UI copy and privacy documentation. | Partial — current features export local files/QR; hosted profiles are not implemented. |

## 4. Browser and deployment security

| ID | Security requirement | Verification method | Current status |
|---|---|---|---|
| WEB-01 | Production deployment must use HTTPS. | Inspect the deployed origin and redirect behavior. | Not assessed — production host not supplied for this baseline. |
| WEB-02 | Configure a restrictive Content Security Policy compatible with the built app. | Inspect production response headers; test with CSP reporting/enforcement and verify required script/style/image sources. | Not assessed — no production host configuration reviewed. |
| WEB-03 | Configure appropriate browser security headers. | Verify HSTS (HTTPS deployment), X-Content-Type-Options: nosniff, Referrer-Policy, and a least-privilege Permissions-Policy. | Not assessed. |
| WEB-04 | Avoid unnecessary browser permissions and request optional permissions only when a user starts the feature. | Review permission use and test permission prompts. | Partial — current tools do not require camera permission. |
| WEB-05 | Handle generated Blob/object URLs and downloads safely. | Verify object URL lifecycle, filenames, content types, and cleanup on success/error. | Partial — current vCard export uses Blob/object URL cleanup; broader lifecycle review pending. |

## 5. Dependencies and software supply chain

| ID | Security requirement | Verification method | Current status |
|---|---|---|---|
| SUP-01 | Keep package manifest and lockfile synchronized and use reproducible clean installs. | Run `npm ci` from a clean checkout; confirm it succeeds without changing the lockfile. | Fail — current `package-lock.json` does not include declared `qrcode` and `@types/qrcode` dependencies. See [dependency audit](docs/security/DEPENDENCY-AUDIT.md). |
| SUP-02 | Review known vulnerabilities in direct and transitive dependencies. | Run `npm audit --json`; review each advisory, affected path, fixed version, and runtime/build reachability. | Not assessed — current audit could not be executed in this review environment. |
| SUP-03 | Keep third-party dependencies and GitHub Actions to the minimum necessary. | Review `package.json`, lockfile, and workflow actions during dependency changes. | Partial — dependency inventory inspected; action pinning and provenance review pending. |
| SUP-04 | CI must run static checks, tests, and a production build on proposed changes. | Inspect branch protection and verify required workflow checks on pull requests. | Partial — CI workflow contains lint, typecheck, tests, and build; required-check enforcement not verified. |
| SUP-05 | Protect secrets and repository permissions. | Review repository secrets, workflow permissions, branch protections, and secret scanning settings. | Partial — CI workflow declares read-only contents permission; repository settings not verified. |

## 6. Operational and release checks

| ID | Security requirement | Verification method | Current status |
|---|---|---|---|
| OPS-01 | Security issues have a private reporting and triage path. | Verify repository private vulnerability reporting or an established private maintainer contact path. | Partial — process documented; repository feature configuration not verified. |
| OPS-02 | Security-sensitive changes include regression tests and evidence. | Review pull request description, test results, and verification record. | Partial — process documented; apply to future security fixes. |
| OPS-03 | Reassess threats when adding persistence, network calls, uploads, accounts, or hosted profiles. | Require threat-model review as part of feature acceptance. | Pass — requirement established in project security policy; enforcement in future PRs remains a process responsibility. |

## 7. Minimum verification commands

Run from a clean checkout after repairing the lockfile:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm audit --json
```

Review audit findings rather than blindly applying automatic fixes. For each finding, record package, installed version, severity, dependency path, affected feature, fixed version, remediation, and retest result.

## 8. Release gate

Do not describe Qraft as security-verified or ASVS-conformant until relevant checks have been executed and evidence recorded. Before public v1.0 release:

- Resolve all Critical and High dependency findings or document a justified, time-bounded exception with compensating controls.
- Pass input/output safety and privacy checks for every shipped tool.
- Verify production HTTPS and response headers on the actual host.
- Confirm reproducible installation, CI checks, and release artifact integrity.
- Review this checklist and threat model with the release candidate.

## 9. References

- [OWASP ASVS 5.0.0 — official overview](https://asvs.owasp.org/)
- [OWASP ASVS 5.0.0 — official downloads](https://asvs.owasp.org/downloads/)
- [NIST SP 800-218 SSDF 1.1 — final publication](https://csrc.nist.gov/pubs/sp/800/218/final)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — awareness resource, not a substitute for verification requirements.
