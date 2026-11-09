# M2 — QR Studio Verification

**Branch:** feature/m2-qr-studio  
**Status:** Implementation in progress

Run these checks from the repository root after pulling the branch.

## 1. Install dependencies

Run npm install.

Review git status --short. Commit the updated package-lock.json after verifying that no unrelated files changed.

## 2. Automated checks

Run these commands:

    npm run lint
    npm run typecheck
    npm test
    npm run build

Expected results:
- ESLint reports no errors.
- TypeScript exits successfully under strict settings.
- QR validation and QR service tests pass.
- Vite creates the production build.

## 3. Run the application

Run npm run dev, open the local URL printed by Vite, and navigate to QR Generator from the Qraft home page.

## 4. Functional checks

- [ ] QR Generator is marked Available in tool discovery.
- [ ] Website URL and Plain text modes can be selected.
- [ ] Complete http:// and https:// URLs generate previews.
- [ ] URLs without a scheme, malformed URLs, and unsupported schemes (javascript:, data:, file:, ftp:) are rejected.
- [ ] URL input containing whitespace is rejected without being silently rewritten.
- [ ] Plain text preserves spaces and line breaks.
- [ ] Indonesian text, accented characters, and emoji can be encoded.
- [ ] Empty and whitespace-only content do not generate a QR.
- [ ] Editing valid content replaces the previous preview immediately.
- [ ] Clear removes the preview and disables download.
- [ ] Download PNG creates qraft-qr.png.
- [ ] Oversized payloads produce a clear capacity message and are not truncated.

## 5. Independent scanner checks

Use at least two independent QR readers. Do not validate a QR with the same library that generated it.

- [ ] Scan the on-screen URL QR and verify the exact destination.
- [ ] Scan the downloaded PNG and verify the same destination.
- [ ] Scan plain text with spaces and line breaks; compare the decoded text exactly.
- [ ] Scan Unicode text including emoji and compare the decoded text.
- [ ] Test a reasonably long payload at normal phone-screen size.

## 6. Responsive and accessibility checks

- [ ] Desktop layout places input and preview side by side.
- [ ] Mobile layout stacks the panels without horizontal page scrolling at 320 CSS pixels.
- [ ] All controls have visible labels.
- [ ] Select, textarea, Clear, and Download work using only the keyboard.
- [ ] Focus indicators remain visible.
- [ ] Validation and generation feedback is announced by the status region.
- [ ] Browser refresh and back navigation continue to work.

## 7. Privacy check

- [ ] Generate URL and text QR codes with DevTools Network open.
- [ ] Confirm entered content is not sent to a remote service.
- [ ] Confirm no account or backend is required.

## 8. Acceptance gate

M2 is accepted only when automated checks, manual functional checks, independent scanner checks, responsive/accessibility checks, and the privacy check pass. Record any browser-specific issues before requesting merge.
