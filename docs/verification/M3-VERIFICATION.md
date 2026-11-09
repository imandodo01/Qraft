# M3 — vCard Generator Verification

**Branch:** `feature/m3-vcard-generator`  
**Status:** Implementation in progress

Run these checks from the repository root after pulling the branch.

## 1. Automated checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected results:
- ESLint reports no errors.
- TypeScript exits successfully under strict settings.
- vCard validation and serialization tests pass.
- Vite creates the production build.

## 2. Functional checks

- [ ] vCard Generator is marked Available in tool discovery and opens from its tool card.
- [ ] Full name is required; an empty or whitespace-only name cannot be exported.
- [ ] Given name and family name populate the structured `N` property.
- [ ] Organization, job title, email, phone, and website are optional.
- [ ] Empty optional properties are omitted.
- [ ] Invalid email and malformed/non-HTTP(S) website values receive useful feedback.
- [ ] Commas, semicolons, backslashes, and line breaks in text values are escaped.
- [ ] Unicode names and organization values are preserved.
- [ ] Long content lines are folded at 75 UTF-8 octets without splitting a multibyte character.
- [ ] Preview updates as valid contact details are entered.
- [ ] Copy vCard copies the exact preview text.
- [ ] Download VCF creates `contact.vcf`.
- [ ] Clear resets all fields, preview, and action states.
- [ ] Invalid input preserves the values already entered.

## 3. Import and export verification

Use synthetic contact details only.

- [ ] Open/import the downloaded VCF in a desktop contact application or independent validator.
- [ ] Open/import the downloaded VCF in a second independent contact application where available.
- [ ] Confirm name components, organization, title, email, phone, website, and Unicode are retained.
- [ ] Confirm the imported contact does not contain literal folding whitespace or broken lines.
- [ ] Record the applications and versions used. Do not claim universal compatibility from one import test.

## 4. Responsive and accessibility checks

- [ ] Desktop layout keeps the form and preview readable.
- [ ] Mobile layout stacks the form and preview without horizontal page scrolling at 320 CSS pixels.
- [ ] Every field has an associated visible label.
- [ ] All fields and actions work using only the keyboard.
- [ ] Focus indicators remain visible.
- [ ] Feedback is announced by the status region.
- [ ] Preview displays contact data as text, not interpreted HTML.

## 5. Privacy check

- [ ] Enter synthetic contact details with DevTools Network open.
- [ ] Confirm contact data is not sent to an application backend or third-party service.
- [ ] Confirm contact data is not automatically written to localStorage or IndexedDB.
- [ ] Confirm Clear removes in-memory form and preview data.

## 6. Acceptance gate

M3 is accepted only when automated checks, manual functional checks, independent VCF import checks, responsive/accessibility checks, and the privacy check pass. Record the contact applications and browser versions used before requesting merge.
