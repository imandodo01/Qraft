# Qraft — Testing Strategy

**Status:** Proposed baseline

## 1. Goals

Testing should establish that tools produce correct output, handle invalid input safely, and behave consistently across supported browsers and screen sizes.

## 2. Test layers

### Unit tests
Use Vitest for pure functions:
- Input parsing and validation.
- Encoding and decoding.
- vCard serialization and escaping.
- QR payload construction.
- Text transformations.
- Business-card data normalization.

### DOM / interaction tests
Test:
- Form input and validation feedback.
- Copy and download actions.
- Reset behavior.
- Navigation and tool discovery.
- Keyboard interactions.

### Integration tests
Test workflows crossing module boundaries:
- Contact data → vCard export.
- Contact data → QR payload.
- Business card data → preview/export.
- Tool registry → navigation/search.

### Manual browser checks
At minimum, verify current Chrome, Firefox, and Edge where available, plus mobile browser behavior. Record actual tested versions in release notes.

## 3. Critical acceptance scenarios

### QR Generator
- Valid URL and plain text generate scannable codes.
- Empty input is handled clearly.
- Long content does not silently produce a broken export.
- Downloaded output matches the preview.
- QR payload is verified using an independent scanner.

### vCard Generator
- Required and optional fields serialize correctly.
- Special characters, commas, semicolons, backslashes, and newlines are escaped according to the chosen vCard version.
- UTF-8 names are preserved.
- Downloaded `.vcf` imports into representative contact applications.
- Line folding follows the selected vCard specification.

### Digital Business Card
- Missing optional fields do not create broken layout.
- Long names and job titles remain legible.
- Photo/logo aspect ratios are handled.
- Export dimensions are predictable.
- QR destination/payload is clearly identified.
- Exported contact data matches the entered data.

### JSON Formatter
- Valid JSON formats and minifies.
- Invalid JSON returns useful error information.
- Large inputs do not freeze the interface unexpectedly.

### Base64
- UTF-8 text round-trips correctly.
- Invalid Base64 is rejected with a clear message.
- Binary-file support is not implied unless implemented.

### URL Encoder
- Reserved characters are handled correctly.
- Component encoding and full-URL handling are not confused.
- Malformed input is handled safely.

### UUID
- Output matches UUID v4 format.
- Multiple generated values are not duplicated in ordinary test batches.

### Text tools
- Empty input, whitespace, Unicode, and line endings are tested.
- Case conversion behavior for acronyms and punctuation is documented.

## 4. Release gates

A release cannot proceed if:
- A critical workflow fails.
- Exported data is corrupt.
- User input is lost unexpectedly.
- A privacy statement is inaccurate.
- The production build fails.
- A known security issue remains unresolved.

## 5. Test data

Use synthetic contact information and non-sensitive sample files. Do not commit real personal contact details or user-provided private data to tests.
