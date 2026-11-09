# M4 — Digital Business Card Verification

## Automated coverage

- Business-card required-name validation.
- Email, website, and control-character validation.
- Mapping from card details to the existing vCard 3.0 serializer.
- Existing QR generator is reused for the serialized vCard payload.

Run locally from the repository root:

```powershell
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

## Manual acceptance

Use a non-sensitive test contact rather than real personal contact data.

### Functional behavior
- [ ] Open Digital Business Card from the home page and direct hash route.
- [ ] Enter a full name; confirm live preview updates.
- [ ] Fill optional title, organization, email, phone, website, and tagline.
- [ ] Confirm invalid email and website values show useful feedback and disable exports.
- [ ] Change Light/Dark theme and each accent color; confirm preview updates.
- [ ] Clear the form; confirm preview, QR, and export states reset.

### PNG export
- [ ] Download the business card PNG.
- [ ] Open the PNG and confirm the full name, role, organization, tagline, and contact details are legible.
- [ ] Confirm the exported image is 1200 × 675 pixels.
- [ ] Confirm the selected theme and accent are reflected in the exported image.
- [ ] Check long names and long contact values for clipping or overflow.

### VCF and QR
- [ ] Download the VCF and import it into a contact application or inspect it with a vCard reader.
- [ ] Confirm name, organization, title, email, phone, and website match the form.
- [ ] Scan the contact QR with an independent device/app.
- [ ] Confirm the decoded QR payload is the same vCard data as the downloaded VCF.
- [ ] Enter a very long contact value; confirm QR capacity feedback does not truncate data and VCF/PNG remain available.

### Responsive and accessibility
- [ ] Check desktop, tablet, and mobile widths (320 px, 390 px, 768 px, and desktop).
- [ ] Confirm there is no horizontal page overflow and all controls remain usable.
- [ ] Complete the form and actions using keyboard only.
- [ ] Confirm focus indicators and live feedback are visible.

### Privacy
- [ ] Observe DevTools Network while editing and exporting; confirm no contact data is sent to an external service.
- [ ] Inspect Local Storage, Session Storage, IndexedDB, and Cookies; confirm no automatic contact persistence.

## Evidence record

Record browser/version, operating system, test date, and any failures before accepting the milestone. Automated checks, manual checks, and static inspection must remain separately identified.
