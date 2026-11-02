# Qraft — Product Specification

**Status:** Draft baseline  
**Version:** 0.1.0  
**Product type:** Client-side web application

## 1. Vision

Qraft is an everyday digital toolbox: a single, approachable place for small tasks that otherwise send people searching across multiple websites.

It should feel like one coherent product, not a directory of unrelated mini-apps.

## 2. Target users

- People who regularly create or share contact information.
- Developers who need quick data-formatting and encoding utilities.
- Office and knowledge workers who manipulate text and files.
- Anyone who wants convenient browser-based tools without creating an account.

## 3. Product principles

1. Solve a clearly defined, repeatable task.
2. Keep common actions discoverable and fast.
3. Prefer browser-side processing and local persistence.
4. Avoid collecting personal data without a clear need.
5. Make output formats and limitations explicit.
6. Keep tools modular so they can be added or improved independently.

## 4. Information architecture

### Home
- Search tools by name, category, or keyword.
- Browse featured and recently used tools.
- Explain local processing and offline availability accurately.

### QR Studio
- QR Generator.
- QR Scanner (planned for a later release unless implementation proves low-risk).

### Contact Studio
- vCard Generator.
- vCard Viewer / importer.
- Digital Business Card Designer.

### Developer Tools
- JSON Formatter and Validator.
- Base64 Encoder / Decoder.
- URL Encoder / Decoder.
- UUID Generator.

### Text Tools
- Word and Character Counter.
- Case Converter.
- Slug Generator.
- Duplicate Line Remover.

### Media Tools
- Image Compressor.
- Image Resizer / Converter.
- SVG Viewer (later release).

### Utilities
- Additional focused calculators and converters, selected based on actual usefulness.

## 5. Release scope

### Initial release (v1.0) — committed

The first release should prioritize a small, coherent set:

| Tool | Minimum expected capability |
|---|---|
| QR Generator | Generate QR codes for URLs and plain text; preview and export PNG |
| vCard Generator | Capture common contact fields; generate downloadable `.vcf` |
| Digital Business Card | Design a simple digital card, preview it, export an image/PDF where feasible, and generate a QR that carries contact data or opens an explicitly hosted profile |
| JSON Formatter | Format, minify, and validate JSON with useful error feedback |
| Base64 | Encode/decode text with clear UTF-8 handling and invalid-input feedback |
| URL Encoder | Encode/decode URI components |
| UUID Generator | Generate UUID v4 values and copy results |
| Text Counter | Count characters, words, and lines |
| Case Converter | Convert common naming/text cases |

The Digital Business Card is a first-class product feature, not merely a generic name generator.

### Planned after v1.0

- QR content types: Wi-Fi, email, phone, SMS, WhatsApp, and location.
- QR customization: colors, size, error correction, optional logo, SVG export.
- QR Scanner using camera access.
- vCard Viewer and import.
- Front/back printable business card layouts.
- Email Signature Generator.
- Image compression, resizing, and conversion.
- CSV viewer and JSON-to-CSV conversion.
- PWA installation and expanded offline support.
- Batch generation and project import/export.

### Idea backlog — not commitments

- Regex tester.
- JWT decoder.
- Hash generator.
- Timestamp converter.
- Markdown preview.
- Text diff.
- Palette generator and image color picker.
- Unit, date, and time-zone converters.
- Password generator.

These remain ideas until prioritized. Do not treat this list as a requirement to build every item.

## 6. Core user journeys

### Generate a QR code
1. Open QR Studio.
2. Select a supported content type.
3. Enter or paste content.
4. See a live preview and validation feedback.
5. Download or copy the result.

### Create a contact
1. Open Contact Studio.
2. Enter contact details.
3. Preview the generated vCard.
4. Download the `.vcf` file.
5. Optionally generate a QR containing the vCard payload.

### Create a digital business card
1. Enter identity and professional details.
2. Select a template.
3. Customize permitted design settings.
4. Preview the card at common display sizes.
5. Export the card and its contact data.
6. Generate a QR code with an explicitly selected destination or payload.

### Use a developer utility
1. Open the desired tool from search or category navigation.
2. Enter or paste data.
3. View formatted/converted output and validation errors.
4. Copy or download the result.

## 7. Business card and QR constraints

A QR code does not automatically create a hosted profile. There are two distinct modes:

- **Embedded contact QR:** Encodes a vCard payload directly. This works without hosting but may become dense for large contact records.
- **Profile-link QR:** Opens a web profile. This requires the profile to be hosted at a stable public URL.

The initial client-only product should support embedded contact QR where payload size and scanner compatibility are acceptable. Hosted profile links are a later capability and must not be implied unless hosting exists.

## 8. Non-functional requirements

- Responsive from small mobile screens to desktop.
- Keyboard-accessible controls and visible focus states.
- Clear validation and error messages.
- No silent loss of user input.
- No mandatory account.
- No backend dependency for core v1.0 flows.
- Avoid sending user-entered content to third parties.
- Production build must be reproducible.
- Tool behavior and output formats must be documented.

## 9. Success criteria

- A new user can find a tool quickly.
- Core tools produce valid and usable output.
- Contact exports can be imported by common contact applications.
- Business card exports remain legible at intended sizes.
- Main workflows work on desktop and mobile browsers.
- No critical defects remain in release acceptance tests.
