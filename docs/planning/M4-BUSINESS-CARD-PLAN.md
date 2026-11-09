# M4 — Digital Business Card: Minimum v1.0 Plan

**Target:** Qraft v1.0  
**Implementation branch after M3 acceptance:** `feature/m4-business-card`  
**Status:** Prepared; blocked until prior milestones are accepted.

## 1. Goal

Allow a user to create a clean, shareable digital business card, preview it, export an image, and share contact information through a QR code or VCF download.

This is a client-side card designer, not a hosted public profile service.

## 2. Minimum v1.0 scope

### Contact data
- Full name (required).
- Job title.
- Organization.
- Email.
- Phone.
- Website (HTTP/HTTPS only).
- Optional short tagline.

### Design
- One polished, responsive card layout to keep scope small.
- A small set of safe theme choices (for example, light and dark).
- Basic accent color selection.
- Clear typography and spacing defaults.
- Live preview.
- No arbitrary drag-and-drop positioning, front/back printing, or template marketplace.

### Sharing and export
- Export card as PNG.
- Download contact details as a VCF using the M3 vCard serializer.
- Generate a QR code containing the vCard payload using the M2 QR service.
- Show a clear warning or disable embedded-contact QR when the payload exceeds practical QR capacity; VCF download remains available.
- Never imply that a hosted profile URL exists. Profile-link QR requires hosting and is out of scope.

## 3. Export technical decision

The implementation uses a dedicated browser Canvas renderer rather than DOM-to-image capture. The card preview and exported PNG share the same data model, while the renderer draws a fixed 1200 × 675 landscape composition. This avoids adding a runtime dependency and avoids DOM screenshot limitations around CSS, external fonts, and SVG serialization.

The Canvas output is a deliberate visual rendering of the same card content, not a pixel capture of the DOM preview. Manual acceptance must compare the preview and downloaded PNG for content parity, legibility, theme/accent parity, and clipping.

PDF export is **not a v1.0 acceptance requirement**. Add it only if the chosen export path provides a reliable, low-complexity result without destabilizing PNG export.

## 4. Data and privacy

- Keep card data in memory by default.
- Do not save contact information to local storage automatically.
- If a future save-project feature is proposed, make it explicit, user-controlled, and removable.
- Do not upload card data or generated QR payloads.
- Escape/render user content as text; never inject user-supplied HTML.
- Validate website schemes before making links clickable.

## 5. Suggested module boundary

```text
src/tools/business-card/
  index.ts
  model.ts
  view.ts
  export.ts
  styles.css
tests/business-card/
  model.test.ts
  export.test.ts
```

Reuse the M2 QR service and M3 vCard serializer through their public interfaces. Do not duplicate QR or vCard logic.

## 6. Tests and acceptance criteria

- [ ] Required full name is validated.
- [ ] Optional fields render correctly when present and are omitted cleanly when empty.
- [ ] Light/dark theme and accent selection update the preview.
- [ ] Preview remains readable at mobile and desktop sizes.
- [ ] User text is rendered safely as text.
- [ ] Website links accept only HTTP/HTTPS.
- [ ] PNG export works and contains the visible card content.
- [ ] Exported PNG is manually inspected at 1x and a practical sharing size.
- [ ] VCF download contains the same contact information.
- [ ] QR decodes to the expected vCard payload using an independent scanner.
- [ ] Oversized QR payload has a clear fallback to VCF download.
- [ ] No hosted profile is implied or generated.
- [ ] Lint, typecheck, tests, and production build pass.
- [ ] Keyboard and responsive checks pass.

## 7. Explicitly deferred

- Hosted profile pages and short links.
- User accounts, cloud sync, and public profile publishing.
- Drag-and-drop canvas editing.
- Multiple card dimensions and print bleed.
- Front/back card layouts.
- PDF export unless proven low-risk.
- Saved project library and templates marketplace.

## 8. Implementation sequence

1. Start from accepted `main` after M3 merge.
2. Define a typed card model and map it to the M3 contact model.
3. Implement one reliable responsive card layout.
4. Add only minimal theme/accent controls.
5. Run PNG export spike and select one library if needed.
6. Integrate M2 QR generation and M3 VCF serialization.
7. Test PNG, VCF, and QR independently.
8. Update registry/docs and open the milestone PR.
