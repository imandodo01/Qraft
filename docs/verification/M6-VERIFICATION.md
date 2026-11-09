# M6 — Integration and Release Hardening Verification

**Branch:** `feature/m6-release-hardening`  
**Target:** Qraft v1.0  
**Status:** In progress

This checklist verifies the committed nine-tool release. It does not authorize new tools, backend services, accounts, hosted profiles, or automatic persistence.

## 1. Baseline and reproducibility

- [ ] Confirm the accepted `main` commit and clean feature-branch base.
- [ ] Record Node.js and npm versions used locally and in CI.
- [ ] Run `npm ci` from a clean checkout without lockfile changes.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Record the production bundle output and asset sizes.
- [ ] Review `npm audit` and `npm audit --omit=dev`; record advisory IDs, dependency paths, reachability, and disposition.

## 2. Full tool regression

### QR Generator
- [ ] Generate URL and plain-text QR codes.
- [ ] Verify empty, malformed URL, Unicode, and capacity-error behavior.
- [ ] Download PNG and decode it with an independent scanner.
- [ ] Confirm the decoded payload exactly matches the submitted input.

### vCard Generator
- [ ] Validate required and optional fields.
- [ ] Test Unicode, commas, semicolons, backslashes, newlines, and long values.
- [ ] Download VCF and inspect vCard 3.0 structure, CRLF, escaping, and UTF-8 line folding.
- [ ] Import VCF into at least one representative contact application.
- [ ] Confirm the QR encodes the exact serialized VCF payload and handles capacity errors.

### Digital Business Card
- [ ] Test missing optional fields and long names/job titles/taglines.
- [ ] Test light/dark themes and accent HEX validation.
- [ ] Export PNG and verify 1200 × 675 dimensions, legibility, clipping, and colors.
- [ ] Verify VCF import and QR payload match the same contact details.
- [ ] Confirm QR capacity fallback does not disable PNG or VCF export.

### Developer and Text Tools
- [ ] JSON: format, minify, invalid input, nested structures, and Unicode.
- [ ] Base64: ASCII/Unicode round-trip, empty input, malformed data, invalid UTF-8.
- [ ] URL: reserved characters, Unicode, malformed percent sequences, and component-vs-full-URL wording.
- [ ] UUID: UUID v4 version/variant bits and secure-randomness failure behavior.
- [ ] Text Counter: empty input, Unicode code points, words, CRLF/LF/CR line endings.
- [ ] Case Converter: all seven modes, punctuation, repeated separators, and Unicode.
- [ ] Confirm copy, clear, and error paths preserve input appropriately.

## 3. Cross-cutting interaction and accessibility

- [ ] Test all routes through home cards, search, category filters, direct hash navigation, and browser back/forward.
- [ ] Test unknown routes and refresh behavior.
- [ ] Keyboard-only pass: tab order, activation, visible focus, and no keyboard traps.
- [ ] Inspect semantic landmarks, labels, heading order, button names, and live status announcements.
- [ ] Check contrast and reduced-motion behavior.
- [ ] Check widths: 320, 390, 768, 1024, and desktop.
- [ ] Check zoom/reflow at 200% and 400% where practical.
- [ ] Record issues and browser/OS versions.

## 4. Browser and export matrix

Record actual versions; do not claim compatibility for browsers not tested.

| Browser / device | Version | Navigation & interaction | QR PNG | Business-card PNG | VCF |
|---|---|---|---|---|---|
| Chrome desktop | Not tested | [ ] | [ ] | [ ] | [ ] |
| Edge desktop | Not tested | [ ] | [ ] | [ ] | [ ] |
| Firefox desktop | Not tested | [ ] | [ ] | [ ] | [ ] |
| Mobile browser | Not tested | [ ] | [ ] | [ ] | [ ] |

For each exported file, verify it opens/imports and its content matches the preview/input. Do not require pixel-identical Canvas output across browsers.

## 5. Privacy and security

- [ ] Inspect DevTools Network during all nine tools' input, processing, copy, and export flows.
- [ ] Confirm no user-entered content is sent to application or third-party endpoints.
- [ ] Inspect localStorage, sessionStorage, IndexedDB, Cache Storage, cookies, and service workers for unexpected user-data persistence.
- [ ] Review all DOM injection sinks and confirm user-controlled content is rendered safely.
- [ ] Exercise malformed and hostile input cases without script execution or data loss.
- [ ] Review URL scheme validation and navigable-link creation.
- [ ] Review Blob/object URL creation, download names/types, and cleanup.
- [ ] Re-run dependency audit and document remaining advisories and disposition.
- [ ] Verify repository security settings and CI check enforcement where access permits.
- [ ] Verify production HTTPS and response headers (CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy) on the selected host.
- [ ] Update `SECURITY-VERIFICATION.md` with evidence; do not claim ASVS conformance.

## 6. Static hosting and release documentation

- [ ] Select and document the intended static hosting provider.
- [ ] Verify deployment output directory and base-path configuration.
- [ ] Verify direct navigation and refresh for the home route and all tool routes.
- [ ] Verify 404 behavior and correct MIME types for production assets.
- [ ] Verify HTTPS redirects and security response headers.
- [ ] Document deployment, rollback/redeploy, and environment requirements.
- [ ] Update README, CHANGELOG, ROADMAP, and PROJECT_STATUS from verified evidence only.

## 7. Defect triage and release decision

Classify each finding:
- **Blocker:** data corruption/loss, unsafe execution, privacy breach, broken core workflow, or failed production build.
- **High:** major tool/export failure, inaccessible core workflow, or deployment/security misconfiguration.
- **Medium/Low:** non-blocking usability or polish issue; document and decide whether to fix or defer.

- [ ] No unresolved Blocker or High findings.
- [ ] All accepted v1.0 requirements have evidence.
- [ ] User has completed final manual acceptance.
- [ ] CI is green on the final PR head.
- [ ] Release notes and deployment instructions are accurate.

## Evidence log

| Date | Environment / version | Check | Result | Evidence / issue |
|---|---|---|---|---|
| 2026-11-09 | GitHub repository | M5 PR #8 squash merge | Pass | Merge commit `e82859596cb2af61b969051d8ced3600400a5c46` |

Automated checks, manual checks, static inspection, and unverified items must be reported separately. A successful build alone is not release acceptance.
