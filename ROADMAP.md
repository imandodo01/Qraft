# Qraft — Roadmap

**Target:** v1.0  
**Approach:** One milestone per feature branch and acceptance cycle. The accepted `main` branch is the source of truth.

## M0 — Product and repository planning

- [x] Product vision and principles.
- [x] Initial v1.0 feature scope.
- [x] Architecture and quality direction.
- [x] Design direction and development conventions.
- [x] Quality and architecture review with accepted/deferred/rejected decisions ([review](docs/planning/QUALITY-ARCHITECTURE-REVIEW.md)).

**Exit criteria:** Product scope, technical direction, and quality decisions are documented.

## M1 — Application foundation

**Branch:** `feature/m1-foundation`  
**Status:** Completed; PR #1 merged into `main`.

- [x] Vite + TypeScript foundation.
- [x] Strict TypeScript, Vitest, and ESLint configuration.
- [x] Responsive application shell.
- [x] Tool registry, search, and category filtering.
- [x] Basic hash routing.
- [x] Initial unit tests and GitHub Actions workflow.
- [x] Commit lockfile after local dependency installation.
- [x] Local lint, typecheck, tests, and production build.
- [x] Manual desktop/mobile and navigation checks.
- [x] Accept and merge PR #1.

Verification record: [M1 verification guide](docs/verification/M1-VERIFICATION.md).

**Exit criteria:** The application foundation builds and passes its local and CI acceptance checks.

## M2 — QR Studio

**Preparation:** [M2 QR Studio technical plan](docs/planning/M2-QR-STUDIO-TECHNICAL-PLAN.md)  
**Implementation:** [PR #4](https://github.com/imandodo01/Qraft/pull/4) on `feature/m2-qr-studio`.  
**Status:** Completed; PR #4 merged after CI, local automated checks, and user manual verification.

- [x] Generate QR codes from URL and plain text.
- [x] Local browser-side generation and live preview.
- [x] URL/input validation and useful errors.
- [x] PNG export.
- [x] Unicode and independent scanner verification.
- [x] Responsive, keyboard, and privacy checks.

Verification record: [M2 verification guide](docs/verification/M2-VERIFICATION.md).

**Exit criteria:** Downloaded PNG decodes to the exact intended payload using independent QR readers.

## M3 — Contact Studio: vCard Generator

**Preparation:** [M3 vCard Generator plan](docs/planning/M3-VCARD-GENERATOR-PLAN.md)  
**Implementation:** [PR #5](https://github.com/imandodo01/Qraft/pull/5) on `feature/m3-vcard-generator`.  
**Status:** Completed; PR #5 merged into `main` on 2026-11-09 after user acceptance.

- [x] Common contact fields and validation.
- [x] vCard 3.0 serialization.
- [x] Preview, copy, and VCF download.
- [x] Unicode, escaping, and line-folding tests.
- [x] QR contact sharing from the serialized vCard.
- [x] User confirmed behavior met expectations and QR generation worked.
- [x] PR #5 merged.

Verification record: [M3 verification guide](docs/verification/M3-VERIFICATION.md). Detailed per-environment evidence should be retained there; this status does not imply unreported cross-application or security tests.

**Exit criteria:** User accepted the implementation and merged PR #5.

## Security Baseline — pre-M4 gate

**Status:** Documentation baseline added; dependency and implementation verification remain open.

- [x] Add security policy and vulnerability reporting guidance.
- [x] Add architecture-based threat model.
- [x] Add ASVS-oriented security verification checklist.
- [x] Record dependency inventory and lockfile mismatch.
- [x] Regenerate the dependency lockfile and verify a local clean install.
- [x] Run and review current npm vulnerability audits; production audit is clean and remaining minimatch findings are documented.
- [ ] Complete relevant manual security and privacy checks.
- [ ] Verify production hosting headers before public release.

Documents: [Security policy](SECURITY.md), [Threat model](THREAT-MODEL.md), [Security verification](SECURITY-VERIFICATION.md), and [Dependency audit](docs/security/DEPENDENCY-AUDIT.md).

**Exit criteria:** Lockfile is reproducible, dependency advisories are reviewed, and the applicable security checks have recorded evidence. This baseline is not an ASVS certification.

## M4 — Digital Business Card

**Preparation:** [M4 Business Card plan](docs/planning/M4-BUSINESS-CARD-PLAN.md)  
**Implementation branch after Security Baseline:** `feature/m4-business-card`

- [ ] Contact details and one polished card layout.
- [ ] Minimal theme/accent customization.
- [ ] Responsive live preview.
- [ ] PNG export.
- [ ] VCF download and embedded vCard QR using M2/M3 modules.
- [ ] QR capacity fallback and export verification.

**Exit criteria:** User can export a legible card image and independently verify its VCF and QR contact payload. No hosted profile is implied.

## M5 — Developer and Text Tools

**Preparation:** [M5 Developer and Text Tools plan](docs/planning/M5-DEVELOPER-TEXT-TOOLS-PLAN.md)  
**Implementation branch after M4:** `feature/m5-developer-text-tools`

- [ ] JSON formatter / validator.
- [ ] UTF-8 Base64 encoder / decoder.
- [ ] URI component encoder / decoder.
- [ ] UUID v4 generator.
- [ ] Text counter.
- [ ] Case converter.
- [ ] Copy, clear, validation, and edge-case tests.

**Exit criteria:** All six tools work locally, have documented behavior, and pass automated tests.

## M6 — Integration and release hardening

**Implementation branch:** `feature/m6-release-hardening`

- [ ] Full regression testing across all v1.0 tools.
- [ ] Cross-browser export verification with tested versions recorded.
- [ ] Responsive, keyboard, and accessibility review.
- [ ] Privacy and browser-network review.
- [ ] Performance and production bundle review.
- [ ] Reproducible clean install and production build using the committed lockfile and documented Node.js version.
- [ ] Verify static hosting and direct-route behavior.
- [ ] Complete README, changelog, and deployment instructions.
- [ ] Complete applicable security verification and resolve release-blocking findings.
- [ ] Resolve all release-blocking defects.

**Exit criteria:** All v1.0 acceptance criteria pass on a production build, including real export checks, privacy review, security verification, and browser acceptance.

## v1.0 minimum feature commitment

The initial release is limited to these nine tools:

1. QR Generator — URL/text, preview, PNG.
2. vCard Generator — common contact fields, VCF.
3. Digital Business Card — one layout, simple theme choices, PNG, VCF, embedded contact QR.
4. JSON Formatter — format, minify, validate.
5. Base64 — UTF-8 text encode/decode.
6. URL Encoder — URI-component encode/decode.
7. UUID Generator — UUID v4.
8. Text Counter — characters, words, lines.
9. Case Converter — common case formats.

Everything else is post-v1.0 unless explicitly approved as a scope change. See the [feature backlog](docs/backlog/FEATURE-BACKLOG.md) for deferred ideas.

## Workflow and scope control

- One milestone = one feature branch = one PR and acceptance cycle.
- Preparation documents can be reviewed in parallel.
- Implementation and integration remain sequential where they depend on earlier shared interfaces.
- Do not merge an implementation milestone until automated and user acceptance checks pass.
- Update this roadmap and `PROJECT_STATUS.md` as milestones progress.
- Ideas discovered during implementation go to a backlog; they do not silently expand the active milestone.
- Apply the [Quality and Architecture Review](docs/planning/QUALITY-ARCHITECTURE-REVIEW.md) to milestone plans and release acceptance without expanding the v1.0 feature commitment.
