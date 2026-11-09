# M5 — Developer and Text Tools Verification

## Automated checks

Run from the repository root:

```powershell
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

## JSON Formatter

- [ ] Format nested objects and arrays using two-space indentation.
- [ ] Minify valid JSON.
- [ ] Reject empty and malformed JSON with a useful parse message.
- [ ] Confirm invalid input remains intact and the previous output is not overwritten.
- [ ] Check Unicode and escaped quotes/newlines.

## Base64

- [ ] Encode and decode ASCII and Unicode UTF-8 text.
- [ ] Confirm empty input behavior.
- [ ] Reject malformed Base64 and invalid UTF-8.
- [ ] Confirm binary file conversion is not presented as supported.

## URL Encoder

- [ ] Encode/decode spaces, Unicode, reserved characters, and punctuation.
- [ ] Confirm malformed percent sequences show an error.
- [ ] Confirm the UI describes URI-component encoding, not full URL normalization.

## UUID Generator

- [ ] Generate several UUID v4 values and inspect version/variant bits.
- [ ] Confirm secure browser randomness is required; no weak fallback is used.
- [ ] Copy the generated UUID and verify clipboard feedback.

## Text Counter

- [ ] Check empty, whitespace-only, and multiline input.
- [ ] Confirm character count uses Unicode code points.
- [ ] Confirm word count uses Intl.Segmenter where available and a documented Unicode-regex fallback otherwise.
- [ ] Check CRLF, LF, and CR line endings.
- [ ] Confirm counts update while typing and clear resets all counts.

## Case Converter

- [ ] Test lowercase, uppercase, Title Case, camelCase, PascalCase, snake_case, and kebab-case.
- [ ] Check repeated spaces, hyphens, underscores, punctuation, and Unicode.
- [ ] Confirm separators are retained for Title Case and normalized for compound naming formats.

## Cross-cutting manual checks

- [ ] Verify all six tools appear in search and the expected categories.
- [ ] Test copy fallback/feedback and clear behavior.
- [ ] Use keyboard only; inspect focus and screen-reader status messages.
- [ ] Check 320 px, 390 px, 768 px, and desktop widths.
- [ ] Observe DevTools Network while processing input; confirm tool content is not transmitted.
- [ ] Confirm no automatic browser storage of input or output.
- [ ] Record browser/version and any failures before acceptance.

Automated checks, manual checks, and static inspection must be reported separately. A successful build alone is not milestone acceptance.
