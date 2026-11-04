# Qraft — Roadmap

**Target:** v1.0  
**Approach:** One milestone per feature branch and acceptance cycle. The accepted `main` branch is the source of truth.

## M0 — Product and repository planning

- [x] Product vision and principles.
- [x] Initial v1.0 feature scope.
- [x] Architecture and quality direction.
- [x] Design direction and development conventions.

**Exit criteria:** Product scope and technical direction are documented.

## M1 — Application foundation

**Branch:** `feature/m1-foundation`  
**Status:** Draft PR #1; awaiting local verification.

- [x] Vite + TypeScript foundation.
- [x] Strict TypeScript, Vitest, and ESLint configuration.
- [x] Responsive application shell.
- [x] Tool registry, search, and category filtering.
- [x] Basic hash routing.
- [x] Initial unit tests and GitHub Actions workflow.
- [ ] Commit lockfile after local dependency installation.
- [ ] Local lint, typecheck, tests, and production build.
- [ ] Manual desktop/mobile and navigation checks.
- [ ] Accept and merge PR #1.

Verification: [M1 verification guide](../blob/feature/m1-foundation/docs/verification/M1-VERIFICATION.md).

**Exit criteria:** The application foundation builds and passes its local and CI acceptance checks.

## M2 — QR Studio

**Preparation:** [M2 QR Studio technical plan](planning/M2-QR-STUDIO-TECHNICAL-PLAN.md)  
**Implementation branch after M1:** `feature/m2-qr-studio`

- [ ] Generate QR codes from URL and plain text.
- [ ] Local browser-side generation and live preview.
- [ ] URL/input validation and useful errors.
- [ ] PNG export.
- [ ] Unicode and independent scanner verification.

**Exit criteria:** Downloaded PNG decodes to the exact intended payload using independent QR readers.

## M3 — Contact Studio: vCard Generator

**Preparation:** [M3 vCard Generator plan](planning/M3-VCARD-GENERATOR-PLAN.md)  
**Implementation branch after M2:** `feature/m3-vcard-generator`

- [ ] Common contact fields and validation.
- [ ] vCard 3.0 serialization.
- [ ] Preview, copy, and VCF download.
- [ ] Unicode, escaping, and line-folding tests.
- [ ] Import verification with independent contact applications.

**Exit criteria:** Generated VCF imports correctly in the tested contact applications.

## M4 — Digital Business Card

**Preparation:** [M4 Business Card plan](planning/M4-BUSINESS-CARD-PLAN.md)  
**Implementation branch after M3:** `feature/m4-business-card`

- [ ] Contact details and one polished card layout.
- [ ] Minimal theme/accent customization.
- [ ] Responsive live preview.
- [ ] PNG export.
- [ ] VCF download and embedded vCard QR using M2/M3 modules.
- [ ] QR capacity fallback and export verification.

**Exit criteria:** User can export a legible card image and independently verify its VCF and QR contact payload. No hosted profile is implied.

## M5 — Developer and Text Tools

**Preparation:** [M5 Developer and Text Tools plan](planning/M5-DEVELOPER-TEXT-TOOLS-PLAN.md)  
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
- [ ] Responsive and keyboard accessibility review.
- [ ] Privacy and browser-network review.
- [ ] Performance and bundle review.
- [ ] Verify static hosting and direct-route behavior.
- [ ] Complete README, changelog, and deployment instructions.
- [ ] Resolve all release-blocking defects.

**Exit criteria:** All v1.0 acceptance criteria pass on a production build.

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

Everything else is post-v1.0 unless explicitly approved as a scope change.

## Workflow and scope control

- One milestone = one feature branch = one PR and acceptance cycle.
- Preparation documents can be reviewed in parallel.
- Implementation and integration remain sequential where they depend on earlier shared interfaces.
- Do not merge an implementation milestone until automated and user acceptance checks pass.
- Update this roadmap and `PROJECT_STATUS.md` as milestones progress.
- Ideas discovered during implementation go to a backlog; they do not silently expand the active milestone.
