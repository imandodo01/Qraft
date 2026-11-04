# M3 — vCard Generator: Minimum v1.0 Plan

**Target:** Qraft v1.0  
**Implementation branch after M2 acceptance:** `feature/m3-vcard-generator`  
**Status:** Prepared; blocked until prior milestones are accepted.

## 1. Goal

Let a user enter common contact details, preview the resulting contact record, and download a standards-based `.vcf` file that can be imported into common address books.

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
- Website (HTTP/HTTPS only).
- Postal address is deferred unless the UI remains simple and interoperability tests are available.

### Required behavior
- Live or explicit preview of the generated vCard text.
- Download as `contact.vcf`.
- Copy vCard text.
- Clear/reset form.
- Validation for required name and malformed website URLs.
- Preserve entered data when validation or export fails.
- No automatic persistence of personal contact data.

## 3. Format decision

Use **vCard 3.0** as the initial export format for broad practical compatibility with contact applications. Keep serialization isolated so vCard 4.0 can be added later if needed.

The serializer must:
- Emit `BEGIN:VCARD` and `END:VCARD`.
- Include `VERSION:3.0`.
- Include `FN` and `N`.
- Use CRLF line endings.
- Escape backslashes, commas, semicolons, and newlines in text values.
- Fold long content lines according to the vCard line-folding rules (75 octets, not 75 JavaScript characters); do not split a UTF-8 multibyte sequence.
- Encode the downloaded file as UTF-8 with an appropriate vCard MIME type where supported.
- Avoid emitting empty optional properties.

Reference: [RFC 2426 — vCard 3.0](https://www.rfc-editor.org/rfc/rfc2426).

## 4. UX minimum

- Single-column form that works on mobile.
- Clear field labels and examples.
- Preview section showing the serialized vCard.
- Primary Download VCF action.
- Secondary Copy vCard action.
- Success/error feedback that does not expose internal exceptions.
- No design templates or complex styling in this milestone.

## 5. Proposed module boundary

Adapt to the accepted application structure; do not create empty abstractions.

```text
src/tools/vcard-generator/
  index.ts
  serializer.ts
  validation.ts
  view.ts
tests/vcard-generator/
  serializer.test.ts
  validation.test.ts
```

Keep serialization as a pure function receiving typed contact data and returning a string. Keep DOM and download behavior outside the serializer.

## 6. Tests and acceptance criteria

- [ ] Missing/blank FN is rejected.
- [ ] Optional properties are omitted when empty.
- [ ] Commas, semicolons, backslashes, and newlines are escaped correctly.
- [ ] Unicode names and organization values remain intact.
- [ ] Long lines are folded without corrupting UTF-8 characters.
- [ ] Output has required VCARD envelope and version.
- [ ] Downloaded `.vcf` opens/imports in at least two available contact applications or independent vCard validators.
- [ ] Copy action copies the exact preview text.
- [ ] Invalid website URL receives useful feedback.
- [ ] Contact data is not transmitted or silently persisted.
- [ ] Lint, typecheck, unit tests, and production build pass.
- [ ] Mobile layout and keyboard operation are checked.

Record the contact applications used during manual verification. Do not claim universal compatibility from a single import test.

## 7. Explicitly deferred

- vCard import/viewer.
- Multiple contacts and batch VCF.
- QR generation (provided by M2; business-card QR composition belongs to M4).
- Contact sync, cloud storage, and account features.
- Advanced vCard properties and localization.

## 8. Implementation sequence

1. Start from the latest accepted `main` after M2 merge.
2. Implement typed contact data and validation.
3. Implement and unit-test pure vCard 3.0 serialization.
4. Add preview, copy, and download UI.
5. Verify imports with independent contact applications.
6. Update tool registry, docs, and changelog.
7. Open PR and pass the milestone acceptance gate.
