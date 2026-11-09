# Qraft — Feature Backlog

This backlog records useful ideas that are not part of the committed v1.0 scope. Entries are candidates for future prioritization, not delivery commitments.

## QR Studio

### Content presets
- Wi-Fi network credentials.
- Email address and subject/body.
- Phone call and SMS.
- WhatsApp chat links.
- Geographic location.

### Appearance and export
- Foreground and background colors with contrast safeguards.
- Gradient and module/dot shape options.
- Error-correction selection (L, M, Q, H) with capacity guidance.
- SVG export for scalable output.
- Optional center logo with automatic sizing and scan-safety guidance.
- Decorative frames, labels, and call-to-action captions.
- Better input placeholders, sample payloads, and contextual helper text.

### Reading and productivity
- Scan QR codes using the camera, subject to browser permission and secure-context requirements.
- Decode QR images selected from local files.
- Batch QR generation.
- Explicitly saved QR history or reusable presets, only if a privacy-conscious storage design is approved.

### Guardrails for future QR work
- Keep encoding local by default.
- Never silently shorten or rewrite the encoded payload.
- Preserve a clear quiet zone and sufficient contrast.
- Treat styling, logos, and frames as progressive enhancements; generated codes must remain independently scannable.
- Test the actual exported file with independent readers after changing encoder settings.

- vCard QR contact sharing is implemented in Contact Studio; future QR work should focus on presets beyond vCard.

## General product ideas

- vCard import/viewer and batch contact export.
- Email signature generator.
- Image compression, resizing, and conversion.
- CSV viewer and JSON-to-CSV conversion.
- PWA installation and expanded offline support.
- Regex tester, JWT decoder, hash generator, timestamp converter, Markdown preview, and text diff.
- Unit, date, and time-zone converters.

## Prioritization

Evaluate candidates by user value, implementation cost, maintenance burden, privacy implications, and whether they improve the core local-first toolbox. Do not expand the nine-tool v1.0 commitment without an explicit scope decision.
