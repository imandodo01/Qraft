# Qraft Security Policy

**Status:** Initial security policy baseline  
**Last reviewed:** 2026-11-09  
**Scope:** Qraft browser-based application and its repository, build pipeline, and supported static deployment.

## Security objectives

Qraft is designed as a local-first browser toolbox. Security work must preserve these product constraints:

- Process tool inputs in the browser by default.
- Do not transmit user-entered content to application or third-party services unless a future feature explicitly requires it, obtains informed user action, and documents the data flow.
- Do not persist contact details or tool inputs without a documented user-facing purpose and controls.
- Treat all pasted text, URLs, imported files, and generated content as untrusted.
- Keep dependencies, build tooling, and release artifacts reviewable and reproducible.

These are design requirements. They are not a blanket claim that every implementation or deployment has already been verified.

## Reporting a vulnerability

If you believe you have found a security issue:

1. Do not publish exploit details, personal data, or sensitive proof-of-concept material in a public issue.
2. Contact the repository maintainer privately through a private GitHub security advisory for this repository, if that feature is enabled. Otherwise use a private communication channel already established with the maintainer.
3. Include the affected version or commit, impact, reproduction steps, and any relevant logs with secrets and personal data removed.
4. Allow time for triage and a fix before public disclosure.

Do not include real contact information, private files, credentials, or production data in a report unless strictly necessary. Redact them first.

## Triage and remediation

The maintainer should:

- Acknowledge and assess reports as promptly as practical.
- Reproduce the issue in an isolated environment.
- Determine affected versions, severity, exploitability, and data exposure.
- Prepare and test a fix, including regression coverage.
- Review whether a release, user notification, or deployment action is required.
- Publish an advisory when appropriate, without exposing reporter identity or sensitive data without consent.

No fixed response-time or service-level guarantee is currently offered.

## Dependency and supply-chain policy

- Keep `package-lock.json` committed and synchronized with `package.json`.
- Review direct and transitive dependency advisories before releases and when dependencies change.
- Prefer the smallest practical dependency set; review maintenance, license, package provenance where available, and whether a dependency sends or processes user data.
- Use non-breaking targeted updates where possible. Do not run `npm audit fix --force` without a separate compatibility review and explicit approval.
- Keep GitHub Actions permissions minimal and pin third-party actions to immutable commit SHAs when the repository's workflow policy is upgraded to that level.
- Do not commit secrets, signing keys, access tokens, or personal data.

## Secure development and verification

Security requirements are tracked in:

- [Threat model](THREAT-MODEL.md)
- [Security verification checklist](SECURITY-VERIFICATION.md)
- [Dependency audit record](docs/security/DEPENDENCY-AUDIT.md)

The verification checklist uses relevant requirements from OWASP ASVS 5.0.0 as a practical reference and NIST SP 800-218 SSDF 1.1 as a secure-development process reference. It is a project checklist, not a certification or claim of full ASVS conformance.

## Deployment responsibilities

Qraft is a static browser application. The hosting environment remains part of the security boundary. A production host should provide HTTPS, correct MIME types, secure response headers, and a restrictive Content Security Policy compatible with the built application. Deployment headers must be tested on the actual host; a local Vite development server is not evidence of production header configuration.

## Scope changes

Features that introduce accounts, hosted profiles, APIs, analytics, remote processing, cloud storage, third-party embeds, or user-uploaded content require an updated threat model and privacy review before implementation.
