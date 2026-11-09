# M2 — QR Studio Technical Preparation

**Document status:** Accepted; [PR #4](https://github.com/imandodo01/Qraft/pull/4) merged after CI and user verification.  
**Milestone:** M2 — QR Studio  
**Preparation branch:** `docs/m2-qr-studio-prep`  
**Implementation branch (when unblocked):** `feature/m2-qr-studio`  
**Target:** Qraft v1.0

This document prepares M2 without changing the active M1 implementation. It is a technical plan, not evidence that QR functionality has been implemented.

## 1. Scope boundary

### Included in M2

- Generate a QR code from plain text.
- Generate a QR code from a web URL.
- Live preview after valid input.
- Clear validation and generation errors.
- Download the generated QR as PNG.
- Handle Unicode text, including Indonesian characters and emoji, within the QR format's capacity.
- Keep generation in the browser; do not send user content to a remote service.
- Add automated tests for payload validation and QR generation logic.
- Add manual scan verification using independent QR reader applications.

### Explicitly out of scope for M2

These are later enhancements and must not be pulled into M2 without a scope decision:

- Wi-Fi, email, phone, SMS, WhatsApp, and location payload presets.
- User-selectable colors, gradients, logos, dot shapes, and decorative styles.
- User-selectable error correction level and advanced QR version controls.
- SVG export (PNG is the v1.0 minimum).
- QR scanning / camera access.
- Batch generation and saved QR history.
- Hosted profile links or server-side generation.

Keep the first release useful and dependable before adding styling options.

## 2. Recommended user experience

The QR Generator should be a focused tool page within the existing Qraft application shell.

### Input area

- A content-type selector with two options: **URL** and **Plain text**.
- A labelled text input or textarea, depending on the content type.
- A short hint explaining what the selected mode accepts.
- A clear/reset action.
- Validation feedback adjacent to the input.

### Preview area

- Show a neutral empty state before valid input is supplied.
- Generate/update the preview when input is valid.
- Keep the preview square, centered, and responsive.
- Show a brief note that the QR encodes the entered content.
- Do not show a stale previous QR as if it represented newly edited input.

### Actions

- Primary action: **Download PNG**.
- Disable download while input is empty, invalid, or generation has failed.
- Use a deterministic filename such as `qraft-qr.png`.
- Report download failures clearly; never show success before a file has been generated.

### Responsive behavior

- Desktop: input and preview can sit side by side.
- Mobile: stack input, preview, and actions vertically.
- Avoid horizontal scrolling at 320 CSS pixels.
- Preserve visible keyboard focus and associated labels.

## 3. Input and validation rules

### Plain text mode

- Accept non-empty text, including Unicode.
- Preserve the exact user-entered content; do not trim or rewrite the payload before encoding.
- Treat whitespace-only input as empty.
- Allow line breaks where supported by the QR encoder.
- If the content exceeds QR capacity, show an actionable error rather than truncating it.

### URL mode

- Parse with the browser `URL` API.
- Accept only `http:` and `https:` schemes for this initial release.
- Reject malformed URLs and other schemes with a clear message.
- Do not silently prepend a scheme or rewrite the entered URL.
- Encode the accepted URL exactly as entered after validation.

### Capacity and error correction

QR capacity depends on payload bytes, encoding mode, QR version, and error-correction level. Do not impose a misleading character-count limit.

Use the library's automatic version selection and the default **M (Medium)** error correction level for M2. Explain capacity errors in plain language. User-configurable error correction is a post-v1.0 enhancement.

The QR library documents four error-correction levels and capacity differences; a higher level increases damage tolerance but reduces available capacity. See the references below.

## 4. QR library evaluation

### Recommended candidate: `qrcode` (node-qrcode)

Use `qrcode` as the preferred candidate for M2, subject to a short implementation spike before final dependency pinning.

Reasons:

- Established package with broad usage.
- MIT license.
- Browser use through a bundler is documented.
- Supports PNG data URLs and SVG string output.
- Supports UTF-8 / multibyte content in byte mode.
- Automatic mode and version selection.
- Error correction level can be configured through options.
- Does not require Qraft to implement the QR encoding standard itself.

TypeScript note: the package uses community-maintained declarations from `@types/qrcode`. Confirm the installed types work with Qraft's strict TypeScript configuration before finalizing the dependency.

References:
- npm package and API documentation: https://www.npmjs.com/package/qrcode
- TypeScript declarations: https://www.npmjs.com/package/@types/qrcode
- Upstream source: https://github.com/soldair/node-qrcode

### Implementation spike checklist

Before committing to the dependency:

- [ ] Install the package on the M2 branch, not on M1.
- [ ] Confirm Vite browser bundling works.
- [ ] Confirm TypeScript declarations compile with `strict: true`.
- [ ] Generate a PNG data URL from a short URL.
- [ ] Generate a PNG data URL from Indonesian Unicode text and emoji.
- [ ] Generate a QR from a longer payload and confirm capacity errors are surfaced.
- [ ] Confirm no network request is made with the encoded content.
- [ ] Inspect production bundle impact.
- [ ] Record the exact resolved versions in the lockfile.

Do not substitute a new or less-proven package solely for extra styling features. The first release needs correctness and dependable export, not decorative QR customization.

## 5. Proposed module boundaries

Keep QR encoding independent from page rendering.

Suggested M2 additions:

```text
src/
└── tools/
    └── qr-generator/
        ├── index.ts
        ├── view.ts
        ├── qr-service.ts
        ├── validation.ts
        └── styles.css
tests/
└── qr-generator/
    ├── validation.test.ts
    └── qr-service.test.ts
```

This is a guide, not a requirement to create empty files. Keep the module smaller if the implementation does not need every file.

Responsibilities:

- `validation.ts`: content type, empty input, URL validation, and user-facing validation result.
- `qr-service.ts`: thin adapter around the selected QR package; generate the PNG data URL and translate library errors into stable application errors.
- `view.ts`: render controls, preview, feedback, and download action.
- `index.ts`: expose the tool entry point to the application routing/tool integration.
- `styles.css`: QR-specific styles only.

Do not put QR encoding logic inside the global router or tool registry.

## 6. Proposed service contract

Use a small typed interface between the UI and QR library. Final names may change during implementation, but keep the behavior equivalent:

```ts
export type QrContentType = "url" | "text";

export interface QrGenerationRequest {
  content: string;
  contentType: QrContentType;
}

export interface QrGenerationResult {
  dataUrl: string;
  mimeType: "image/png";
}

export type QrValidationResult =
  | { valid: true; normalizedContent: string }
  | { valid: false; message: string };
```

The service should not own DOM elements, navigation, or UI state. The UI should not need to know the QR library's internal API.

## 7. Test strategy

### Unit tests

Validation:
- Empty string.
- Whitespace-only text.
- Plain text with spaces and line breaks.
- Indonesian characters and emoji.
- Valid HTTP URL.
- Valid HTTPS URL.
- Missing URL scheme.
- Malformed URL.
- Unsupported schemes such as `javascript:`, `data:`, and `file:`.

QR service:
- Generates a non-empty PNG data URL for a short text payload.
- Generates a PNG data URL for a valid URL.
- Handles Unicode payloads.
- Converts capacity / unsupported input failures into a stable error result.
- Uses the documented default options (including M error correction and a quiet zone).

Avoid brittle snapshots of the exact QR matrix or PNG bytes. A library update may legitimately change the encoded matrix while still producing a valid QR.

### Manual verification

Use at least two independent QR readers, for example:
- A phone's built-in camera QR reader.
- A second QR-scanning application or a trusted desktop decoder.

Verify that:
- A URL QR opens the exact intended URL.
- A plain-text QR returns the exact original text.
- Unicode text round-trips correctly.
- The downloaded PNG scans, not just the on-screen preview.
- The QR remains scannable when displayed at normal phone-screen size.
- A longer payload remains readable at the generated output size, or produces a clear capacity/size warning.

Do not use the same QR library to generate and independently validate its own output.

## 8. Acceptance criteria

M2 is complete only when all of the following pass:

- [x] QR Generator is reachable from Qraft navigation and tool discovery.
- [x] URL and plain-text modes work.
- [x] URL validation accepts HTTP/HTTPS and rejects malformed or unsupported schemes.
- [x] Empty and whitespace-only inputs do not produce a QR.
- [x] Valid input produces a preview without a backend request.
- [x] Preview updates when valid input changes; stale preview is not misrepresented.
- [x] PNG download works and produces a valid image.
- [x] Downloaded PNG decodes to the exact input using independent scanners.
- [x] Unicode content is preserved.
- [x] Capacity errors are understandable and do not crash the app.
- [x] Automated tests, lint, typecheck, and production build pass.
- [x] Responsive and keyboard-accessibility checks pass.
- [x] Documentation and project status are updated.

## 9. Suggested implementation sequence

1. Create `feature/m2-qr-studio` from the then-current accepted `main` (after M1 is merged).
2. Run the dependency spike and commit the chosen package plus lockfile.
3. Implement and test validation rules.
4. Implement the QR service adapter.
5. Implement the QR Generator view and preview.
6. Add PNG download and failure handling.
7. Add independent scanner checks and responsive/accessibility review.
8. Update the tool registry from `planned` to `available` only when the feature is actually complete.
9. Update documentation and open the M2 PR.
10. Obtain user verification and acceptance before merging.

## 10. Dependencies and risks

| Risk | Mitigation |
|---|---|
| QR library / TypeScript type mismatch | Run the strict TypeScript spike before building UI around the package. |
| Payload exceeds QR capacity | Rely on encoder validation and show a clear error; never truncate. |
| Unicode scan differences | Test real Unicode payloads with independent readers. |
| QR preview works but PNG export fails | Test the downloaded file separately from the preview. |
| QR becomes too dense for small display | Use a predictable export size and test representative longer payloads. |
| Unsafe URL scheme | Allow only HTTP and HTTPS in URL mode. |
| Accidental remote processing | Keep generation in the browser and inspect network activity during verification. |
| Scope creep | Keep colors, logos, scanner, and specialized payload presets out of M2. |

## 11. M2 readiness

M1 and M2 have been accepted and merged. M2 implementation in [PR #4](https://github.com/imandodo01/Qraft/pull/4) passed CI and user-reported local and manual verification. See [M2 verification record](../verification/M2-VERIFICATION.md).

This document remains the technical record of M2's original scope and decisions. Deferred QR enhancements are tracked in the [feature backlog](../backlog/FEATURE-BACKLOG.md).
