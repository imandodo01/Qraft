# Qraft — Roadmap

**Status:** Initial planning baseline  
**Approach:** Milestone-based; do not expand the current milestone without an explicit scope decision.

## Milestone 0 — Product and repository setup

- [x] Establish product vision and principles.
- [x] Define initial feature scope.
- [x] Establish architecture and quality direction.
- [ ] Create repository and initialize Vite + TypeScript.
- [ ] Add linting, formatting, and test scripts.
- [ ] Add CI build and test workflow.
- [ ] Establish initial visual identity and design tokens.

**Exit criteria:** A clean repository builds, tests, and documents how to run locally.

## Milestone 1 — Application shell

- [ ] Responsive application layout.
- [ ] Navigation and category pages.
- [ ] Tool registry and tool discovery/search.
- [ ] Shared form, feedback, copy, and export components.
- [ ] Empty, error, success, and not-found states.
- [ ] Keyboard navigation and focus behavior.

**Exit criteria:** Tools can be registered and navigated consistently, even before all tools are implemented.

## Milestone 2 — Core generators

Preparation reference: [M2 QR Studio technical plan](docs/planning/M2-QR-STUDIO-TECHNICAL-PLAN.md) — scope, library evaluation, technical boundaries, tests, and acceptance criteria.

- [ ] QR Generator (URL and text).
- [ ] vCard Generator and `.vcf` export.
- [ ] Digital Business Card Designer.
- [ ] PNG export and contact QR integration.
- [ ] Validate exports on multiple scanners/contact apps.

**Exit criteria:** A user can create a business card, export it, and share/import its contact information.

## Milestone 3 — Everyday developer and text tools

- [ ] JSON Formatter / Validator.
- [ ] Base64 Encoder / Decoder.
- [ ] URL Encoder / Decoder.
- [ ] UUID Generator.
- [ ] Text Counter.
- [ ] Case Converter.

**Exit criteria:** All included tools have validation, copy behavior, and tests for important edge cases.

## Milestone 4 — Persistence and polish

- [ ] Recently used tools.
- [ ] Optional local history/favorites, only where useful.
- [ ] IndexedDB abstraction if structured persistence is required.
- [ ] Responsive and accessibility review.
- [ ] Performance review.
- [ ] Privacy review.

**Exit criteria:** The application is comfortable to use on supported screen sizes and does not persist data unexpectedly.

## Milestone 5 — Release candidate

- [ ] Complete regression suite.
- [ ] Verify production build and static hosting configuration.
- [ ] Write deployment instructions.
- [ ] Prepare screenshots and landing-page content.
- [ ] Review README and changelog.
- [ ] Tag release candidate.

**Exit criteria:** No release-blocking issues remain.

## Milestone 6 — v1.0 release

- [ ] Deploy public application.
- [ ] Verify deployed routes and assets.
- [ ] Verify core flows on desktop and mobile.
- [ ] Publish v1.0 release notes.
- [ ] Create a post-release issue list based on real usage.

## Post-v1.0 candidates

Prioritize only after v1.0 is shipped:
- Additional QR formats and scanner.
- vCard viewer/import.
- Image tools.
- CSV tools.
- PWA/offline enhancements.
- Additional developer utilities.

## Scope control

A new idea enters the backlog first. It does not automatically enter the active milestone. A milestone should have a stable scope and explicit exit criteria.
