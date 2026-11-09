# Qraft — Quality and Architecture Review

**Status:** Proposed decisions for v1.0  
**Applies to:** Existing nine-tool v1.0 scope  
**Decision rule:** This review sets quality requirements and records scope decisions. It does not authorize additional product features.

## 1. Purpose and constraints

Use this review to evaluate the existing Qraft v1.0 plan before implementation continues.

The following product constraints remain unchanged:

- Nine committed tools only.
- Client-side processing by default; no backend or account requirement.
- No hosted public profiles, cloud sync, or automatic persistence of contact data.
- One milestone and acceptance cycle at a time.
- New ideas remain deferred unless explicitly approved as a scope change.

A quality requirement may add validation, tests, safeguards, or acceptance checks to an already committed feature. It must not silently add a new user-facing capability.

## 2. Decision summary

| Area | Decision | v1.0 interpretation |
|---|---|---|
| Local-first processing | Accepted | Core tool processing stays in the browser. Verify network behavior before making privacy claims. |
| Input validation and safe rendering | Accepted | Treat text, URLs, contact fields, and imported values as untrusted. Render as text and validate at module boundaries. |
| SVG sanitization | Deferred | No user-supplied SVG import/viewer is committed to v1.0. Revisit before any feature accepts or renders untrusted SVG. |
| vCard privacy and serialization safety | Accepted | No silent persistence or upload; test escaping, Unicode, line folding, and safe preview rendering. |
| User data deletion | Accepted with bounded implementation | Provide clear/reset controls for in-memory tool data. A global storage-erasure control is unnecessary while Qraft stores no user projects or contact data persistently. |
| Export correctness | Accepted | Validate every committed export: PNG, VCF, and QR payload/output. |
| PDF export | Deferred | Not a v1.0 release requirement. |
| Cross-browser export fidelity | Accepted | Test supported browser output and document observed limitations. Do not promise pixel-identical output across browsers. |
| Modular tool boundaries | Accepted | Keep tool logic independent; reuse only stable shared domain functions and UI primitives. |
| Consistent design system | Accepted | Use shared tokens, interaction patterns, accessibility rules, and navigation behavior. |
| UI/UX Pro Max, Impeccable, Taste Skill | Accepted as design-review methods; execution deferred to design work | They are optional design intelligence/critique inputs, not runtime dependencies or reasons to expand scope. Confirm availability before claiming a skill was used. |
| Automated quality gates | Accepted | Unit tests, interaction/integration checks, lint, typecheck, production build, and release acceptance. |
| Browser, accessibility, performance review | Accepted | Include in milestone acceptance and M6 release hardening. |
| Reuse between QR, vCard, and Business Card | Accepted | Reuse QR generation and vCard serialization through narrow public interfaces. |
| Shared contact store / persistence layer | Rejected for v1.0 | No global contact repository, auto-save, or cross-tool state is needed. Pass typed data explicitly between modules. |
| New tools/features discovered during review | Deferred | Add to backlog only; do not add to v1.0 without explicit scope approval. |

## 3. Security and privacy requirements

### Accepted for v1.0

- Process tool inputs locally. Network access is limited to normal app delivery and explicit user navigation/sharing actions; no tool content should be sent to an application backend or third-party processing service.
- Treat all user-provided values as untrusted. Use text rendering rather than injecting user content as HTML.
- Validate values at tool boundaries, including URL schemes before creating clickable links.
- Keep contact data in memory by default. Do not write contact data, vCard payloads, or business-card content to localStorage or IndexedDB automatically.
- Ensure vCard serialization correctly escapes special characters, preserves Unicode, uses the selected line-ending/folding rules, and does not corrupt data.
- Provide a clear/reset action in tools that hold user input. Reset must clear the relevant in-memory form and preview.
- Do not include user inputs in logs, analytics, telemetry, or error reports.
- Review dependencies for network behavior, maintenance, licensing, and security implications.

### Deferred / conditional

- SVG sanitization is a mandatory design consideration before accepting, importing, embedding, or rendering untrusted SVG. Since an SVG viewer/importer is not part of v1.0, implementing a general SVG sanitization subsystem now would be unnecessary scope.
- A global “delete all local data” control becomes required if a future feature stores user-created projects, history, or contact records. If persistence is later approved, document exactly what is stored and provide an explicit deletion mechanism.
- Hosted profiles, remote contact storage, analytics containing user data, and server-side processing are outside v1.0.

## 4. Export reliability requirements

Test the actual downloaded artifact, not only the on-screen preview.

### Committed v1.0 outputs

- **QR Generator:** PNG must decode with independent QR readers to the exact intended payload.
- **vCard Generator:** VCF must follow the selected vCard 3.0 serialization rules and import correctly in representative contact applications.
- **Digital Business Card:** PNG must contain the intended card content, have predictable dimensions, preserve legible typography, and handle image assets without unintended distortion. VCF and embedded QR must represent the same contact data.

### Cross-browser verification

For each export type, record the browser and version used. At minimum, verify current Chrome, Firefox, and Edge where available; include a mobile browser check for relevant workflows.

Inspect:
- Font availability and font fallback.
- Text wrapping, clipping, alignment, and layout.
- Image aspect ratio, resolution, and output dimensions.
- Backgrounds, transparency, and color rendering.
- Filename, MIME type, and ability to open/import the downloaded file.
- Consistency between preview content and exported content.

Do not claim identical pixel output across browsers. Define acceptable output properties and verify those properties instead.

PDF export remains deferred and is not part of the v1.0 release gate.

## 5. Modular architecture and product integration

### Accepted boundaries

- Each tool owns its input validation, business logic, view, and tool-specific tests.
- Keep pure transformations/serializers independent from DOM rendering and browser download behavior.
- The tool registry contains discovery metadata and routing information, not business logic.
- Shared components are for genuinely repeated presentation behavior (for example, labelled input, copy action, feedback, and download action).
- Shared services should have narrow contracts and must not become a global state container.

### Explicit reuse between committed tools

1. M2 QR Studio owns QR generation and its export interface.
2. M3 Contact Studio owns the typed contact representation and vCard 3.0 serializer.
3. M4 Digital Business Card maps its card form to the shared contact representation, calls the vCard serializer, and calls the QR generation interface for embedded contact QR.

The business-card module must not implement its own QR encoder or vCard serializer. Keep adapters/mapping code local to the business-card module.

### Rejected for v1.0

- A global contact database or shared mutable contact state.
- Automatic synchronization of form data between tools.
- A persistence layer introduced only to make tools appear integrated.
- Generic abstractions that have only one real consumer.

The integration goal is code reuse and consistent output, not a new cross-tool data-management feature.

## 6. UX consistency and design review

### Accepted baseline

- Use the documented design system as the source of truth for tokens, typography, spacing, focus states, interaction states, and responsive patterns.
- Keep navigation and tool discovery predictable across the home page and tool pages.
- Use consistent validation, empty, success, error, copy, download, and reset behavior.
- Maintain semantic HTML, keyboard access, visible focus, sufficient contrast, reduced-motion support, and accessible status feedback.
- Design each tool around its actual task; consistency must not force identical layouts where the task differs.

### Design intelligence and critique

UI/UX Pro Max may inform design direction and interaction patterns. Impeccable may be used as a structured UI critique pass. Taste Skill may inform the landing page and visual identity.

These are optional review methods, not application dependencies. Apply them when available during visual design/critique; do not block M1 technical verification on them and do not treat their use as a substitute for user testing or accessibility checks.

No new landing-page feature, animation system, theme engine, or design customization capability is authorized by this review.

## 7. Quality and release gates

### Per milestone

- Pure business logic has focused unit tests, including edge cases and invalid input.
- Tool interactions have tests for validation, copy, download, reset, and error behavior where applicable.
- Lint, TypeScript typecheck, automated tests, and production build pass.
- Actual outputs are checked against their format-specific acceptance criteria.
- No user input is unexpectedly lost, persisted, or transmitted.
- Changes remain within the milestone scope.

### M6 release hardening

- Regression testing across all nine committed tools.
- Browser compatibility checks with tested browser versions recorded.
- Keyboard and accessibility review.
- Performance and production bundle review; avoid unnecessary dependencies and excessive payload.
- Reproducible clean install and production build using the committed lockfile and documented Node.js version.
- Static deployment verification, including direct route loading and refresh behavior.
- Privacy/network inspection confirms user tool data is not transmitted.
- No unresolved release-blocking defects.

A successful build alone is not acceptance. Manual verification of real exported files and browser behavior remains required.

## 8. Scope control

Classify new findings as follows:

- **Accepted:** A quality requirement for an already committed v1.0 feature; may add tests, validation, safeguards, or documentation.
- **Deferred:** Useful, but not required to deliver the committed v1.0 scope. Record it for a later release.
- **Rejected:** Deliberately excluded because it conflicts with product constraints or adds complexity without enough user value.

Any proposal that changes the nine-tool commitment, adds backend/account/persistence, introduces hosted profiles, or adds a new export format requires explicit scope approval before implementation.

## 9. Review outcome

This document supplements the Product Specification, Architecture, Design System, Privacy Policy, Testing Strategy, and Roadmap. If a conflict appears, preserve the explicit v1.0 scope and record a decision before changing implementation plans.

The review does not change the current milestone order: M1 acceptance → M2 QR Studio → M3 vCard Generator → M4 Digital Business Card → M5 Developer/Text Tools → M6 release hardening.
