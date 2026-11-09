# M3 — vCard Generator: Minimum v1.0 Plan

**Target:** Qraft v1.0  
**Implementation branch:** `feature/m3-vcard-generator`  
**Status:** Implementation in progress.

## 1. Goal

Let a user enter common contact details, preview the resulting contact record, download a vCard `.vcf` file, and share the same contact data as a QR code.

No account, backend, or remote processing is required.

## 2. Minimum v1.0 scope

### Required fields
- Formatted name (FN) — required.
- Given name and family name — optional, but populate structured name (N) when supplied.

### Optional fields
- Organization.
- Job title.
- Email.
- Phone number.
- Website (HTTP/HTTPS only); bare domains and URLs default to HTTPS, while an explicitly entered HTTP URL is preserved.
- Postal address is deferred unless the UI remains simple and interoperability tests are available.

### Required behavior
- Live preview of the generated vCard text.
- Download as `contact.vcf`.
- Copy vCard text.
- Clear/reset form.
- Generate a QR code from the exact serialized vCard payload and download it as PNG.
- Keep VCF export available when the contact payload exceeds QR capacity; never truncate contact data.
- Validation for required name, malformed email values, and malformed website URLs; normalize bare website domains to HTTPS before preview and export.
- Reject control characters in single-line email and phone values to prevent property injection.
- Preserve entered data when validation or export fails.
- No automatic persistence of personal contact data.

## 3. Format decision

Use **vCard 3.0** as the initial export format for broad practical compatibility with contact applications. Keep serialization isolated so vCard 4.0 can be added later if needed.

The serializer must:
- Emit `BEGIN:VCARD` and `END:VCARD`.
- Include `VERSION:3.0`.
- Include `FN` and structured `N`.
- Use CRLF line endings.
- Escape backslashes, commas, semicolons, and newlines in text values.
- Fold long content lines at 75 octets, not 75 JavaScript characters; do not split a UTF-8 multibyte sequence.
- Encode the downloaded file as UTF-8 with an appropriate vCard MIME type where supported.
- Avoid emitting empty optional properties.

Reference: [RFC 2426 — vCard 3.0](https://www.rfc-editor.org/rfc/rfc2426).

## 4. UX minimum

- Single-column form on mobile; form and preview may sit side by side on wider screens.
- Clear field labels and examples.
- Preview section showing the serialized vCard.
- QR preview and PNG download using the same serialized vCard text as the QR payload.
- Explain that scanner behavior varies: some devices offer contact import while others display the raw vCard text.
- Primary Download VCF action.
- Secondary Copy vCard action.
- Clear/reset action.
- Success/error feedback that does not expose internal exceptions.
- No design templates or complex styling in this milestone.

## 5. Module boundary

```text
src/tools/vcard-generator/
  index.ts
  types.ts
  validation.ts
  serializer.ts
tests/
  vcard-generator.test.ts
```

Keep serialization as a pure function receiving typed contact data and returning a string. Keep DOM and download behavior outside the serializer.

## 6. Tests and acceptance criteria

- [x] Missing/blank FN is rejected.
- [x] Optional properties are omitted when empty.
- [x] Commas, semicolons, backslashes, and newlines are escaped correctly.
- [x] Unicode names and organization values remain intact.
- [x] Long lines are folded without corrupting UTF-8 characters.
- [x] Output has required VCARD envelope and version.
- [ ] Downloaded `.vcf` opens/imports in at least two available contact applications or independent vCard validators.
- [x] QR payload is the exact serialized vCard text; no separate or shortened contact representation is generated.
- [x] QR capacity errors are surfaced without truncating or disabling VCF export.
- [ ] Downloaded contact QR PNG scans to the complete vCard text in an independent scanner.
- [ ] Copy action copies the exact preview text.
- [ ] Invalid website URL receives useful feedback.
- [ ] Contact data is not transmitted or silently persisted.
- [ ] Lint, typecheck, unit tests, and production build pass.
- [ ] Mobile layout and keyboard operation are checked.

Record the contact applications used during manual verification. Do not claim universal compatibility from a single import test.

## 7. Explicitly deferred

- vCard import/viewer.
- Multiple contacts and batch VCF.
- Contact sync, cloud storage, and account features.
- Advanced vCard properties and localization.

## 8. Implementation sequence

1. Start from the latest accepted `main` after M2 merge.
2. Implement typed contact data and validation.
3. Implement and unit-test pure vCard 3.0 serialization.
4. Add preview, copy, and download UI.
5. Generate a QR code from the same serialized vCard and handle QR capacity errors without truncation.
6. Verify VCF imports and QR scanning with independent applications.
7. Update tool registry, docs, and changelog.
8. Open PR and pass the milestone acceptance gate.
