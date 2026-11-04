# M2 — QR Studio Technical Preparation

**Document status:** Ready for implementation after M1 acceptance  
**Milestone branch (implementation):** `feature/m2-qr-studio`  
**Preparation branch:** `docs/m2-qr-studio-prep`  
**Target:** Qraft v1.0  
**Scope:** URL and plain-text QR generation, live preview, PNG export

This document prepares M2 without changing the active M1 implementation. It is a technical plan, not a claim that QR functionality has been implemented.

## 1. Goal

Deliver a dependable QR Generator that lets a user enter a URL or plain text, see a QR preview, and download a PNG.

The tool must process input locally in the browser. It must not upload the payload to a QR service.

## 2. In scope

- QR payload type: URL or plain text.
- Single text input with clear type selection.
- Input validation and actionable errors.
- Live preview after valid input (debounced if useful).
- Sensible defaults for size, quiet zone, and error correction.
- PNG download.
- Clear empty, valid, invalid, generating, and export-error states.
- Responsive layout and keyboard accessibility.
- Unit tests for validation and generation integration boundaries.
- Manual scanning with independent camera/scanner applications.

## 3. Explicitly out of scope for M2

Do not add these unless a scope change is agreed:

- Wi-Fi, email, phone, SMS, WhatsApp, location, or event QR payloads.
- Custom colors, gradients, embedded logos, or decorative QR styles.
- SVG export.
- QR scanning / camera access.
- Batch generation or saved QR history.
- vCard/business-card integration (belongs to M3/M4).
- Hosted profile URLs or backend services.

These can be considered for later milestones after the basic generator is reliable.

## 4. Library evaluation and recommendation

### Recommended first choice: `qrcode` (node-qrcode)

The package documentation describes browser use through a bundler, Promise-based APIs, automatic mode selection, UTF-8/multibyte handling, error correction, and browser `toDataURL` / `toCanvas` output. The package is MIT licensed. Its npm listing currently shows version 1.5.4; the release is mature but not recently published. TypeScript projects generally use the community `@types/qrcode` declarations.

Reference: [qrcode on npm](https://www.npmjs.com/package/qrcode).

Why this is the default:
- Established library with broad usage.
- Browser output is straightforward.
- PNG data URL / canvas flow matches M2.
- No need to implement QR encoding ourselves.

Before adding it, verify current package metadata, compatible `@types/qrcode` version, license, and Vite browser build behavior. Pin versions through the lockfile. Keep all library-specific calls behind a small adapter so a future library change does not affect the UI.

### Alternative to evaluate only if the first choice causes issues

`qr` (paulmillr-qr) is a smaller, newer package with built-in TypeScript declarations and browser-oriented helpers. Its current npm listing shows version 0.7.2, a recent publication, and a small dependency footprint. However, it is a newer option and should not be selected solely because it is smaller.

Reference: [qr on npm](https://www.npmjs.com/package/qr).

**Decision rule:** Prefer the mature `qrcode` package unless installation, type compatibility, bundle output, or browser behavior proves problematic. Do not add both libraries.

## 5. Proposed module boundaries

Keep QR generation independent from page rendering.

Suggested files (adapt to the actual M1 structure; do not create empty abstractions):

```text
src/
  tools/
    qr-generator/
      index.ts
      logic.ts
      validation.ts
      view.ts
      styles.css
  services/
    qr/
      qr-adapter.ts
tests/
  qr-generator/
    validation.test.ts
    logic.test.ts
```

Responsibilities:
- `validation.ts`: validate the selected input type and normalize input.
- `logic.ts`: define supported generation options and orchestrate QR generation.
- `qr-adapter.ts`: isolate the third-party library and return a browser-friendly output.
- `view.ts`: render the form, preview, and status messages.
- `index.ts`: expose the tool entry point expected by the M1 tool registry/router.

Avoid creating a generic QR framework. One small adapter is enough.

## 6. Input and validation behavior

### Plain text
- Accept ordinary text, including Unicode and emoji.
- Reject empty or whitespace-only input.
- Preserve meaningful leading/trailing characters rather than silently rewriting the payload; use trim only to determine whether input is empty.

### URL
- Require a valid absolute URL.
- For the initial release, allow `http:` and `https:` only.
- Reject malformed URLs and unsupported schemes such as `javascript:`, `data:`, and `file:`.
- Do not silently prepend a scheme. Show a useful correction message instead.

### Payload size
- QR capacity depends on payload content, encoding mode, and error-correction level. Do not invent a universal character limit.
- Let the QR library report capacity/generation errors.
- Translate library errors into a user-friendly message; do not show stack traces.
- Preserve the user's input when generation fails.

## 7. Default generation settings

- Error correction: Medium (M), matching the recommended general-purpose default in the selected library.
- Foreground: near-black.
- Background: white.
- Quiet zone: four modules unless the selected library's API requires a documented equivalent.
- Output: PNG.
- Output dimensions: choose a practical default (for example, 512 × 512 px) and ensure the renderer preserves a quiet zone and crisp module edges.

Do not expose advanced settings in M2. Defaults should prioritize reliable scanning and contrast.

## 8. Export behavior

- Generate a PNG using browser-compatible library output.
- Provide an explicit download action with a predictable filename such as `qraft-qr.png`.
- Do not show the download action when no valid QR preview exists.
- Handle failed generation and failed download preparation without losing the input.
- Revoke temporary object URLs if the implementation uses Blob URLs.
- Ensure the exported image matches the preview and includes the quiet zone.

## 9. Accessibility and UX

- Every input has a visible, associated label.
- URL/text mode is selectable by keyboard.
- Validation errors are announced and associated with the input.
- Preview has an accessible description.
- Download action has a clear label.
- Focus indicators remain visible.
- On mobile, the input, preview, and download action stack without horizontal scrolling.
- Avoid announcing every keystroke as an error; update feedback at a useful cadence.

## 10. Test plan

### Unit tests
- Empty and whitespace-only input rejected.
- Valid plain text accepted.
- Unicode and emoji payload accepted by the chosen library.
- Valid HTTP and HTTPS URLs accepted.
- Malformed URLs rejected.
- Unsupported URL schemes rejected.
- Input content is not silently modified.
- Generation errors become safe, actionable errors.

### Integration / DOM tests
- Switching between URL and text modes updates validation.
- Valid input creates a preview.
- Invalid input does not leave a stale preview that looks current.
- Download action appears only for a valid generated result.
- Download uses the expected PNG MIME type and filename behavior.
- User input remains after generation failure.

### Manual scanner acceptance
Use at least two independent scanner implementations where available (for example, a phone camera and a separate QR scanner app).

Verify:
- A simple HTTPS URL opens the exact intended URL.
- Plain text is returned exactly, including punctuation.
- A Unicode sample round-trips correctly on the tested scanners.
- A longer payload is tested near a practical capacity boundary.
- The PNG downloaded from the app scans, not only the on-screen preview.
- The code remains scannable at common display sizes and after being displayed on another screen.

Record actual devices/apps tested. Do not claim universal scanner compatibility from one successful scan.

## 11. M2 acceptance criteria

- [ ] QR tool is discoverable through Qraft navigation/search.
- [ ] User can select URL or plain text.
- [ ] Valid input generates a correct QR preview locally.
- [ ] Empty, malformed, and unsupported URL inputs show useful errors.
- [ ] Unicode sample is supported and manually scanner-tested.
- [ ] PNG download works and scans independently.
- [ ] Exported output preserves quiet zone and expected contrast.
- [ ] Automated tests, lint, typecheck, and production build pass.
- [ ] Responsive and keyboard checks pass.
- [ ] No payload is transmitted to a third-party service.
- [ ] Documentation and changelog are updated.

## 12. Implementation workflow

After M1 is accepted and merged:

1. Create `feature/m2-qr-studio` from the updated `main`.
2. Re-check the actual M1 interfaces and adapt the proposed module layout.
3. Verify the chosen package and type declarations.
4. Implement the QR adapter and validation tests first.
5. Implement the tool UI and integrate it with the registry/router.
6. Run automated checks and production build.
7. Open a draft PR with this acceptance checklist.
8. User performs local and independent scanner verification.
9. Fix issues on the same branch.
10. Merge only after acceptance.

## 13. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Large payload cannot fit | Surface a clear capacity error; do not promise unlimited input |
| Unicode scanner differences | Test representative characters on independent scanners |
| Poor contrast or quiet zone | Keep high-contrast defaults and validate downloaded PNG |
| Third-party library API/type mismatch | Isolate library in adapter and pin lockfile versions |
| URL security issue | Allow only HTTP/HTTPS and parse with the URL API |
| Preview differs from export | Use the same generation configuration/output path |
| Scope creep | Defer custom styling, SVG, scanning, and specialized payload types |

## 14. Research references

- [qrcode npm package and browser API](https://www.npmjs.com/package/qrcode)
- [qr npm package alternative](https://www.npmjs.com/package/qr)

The library comparison is a recommendation, not a substitute for checking the exact installed package version and its type declarations during M2 implementation.
