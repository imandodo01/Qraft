# M5 — Developer and Text Tools: Minimum v1.0 Plan

**Target:** Qraft v1.0  
**Implementation branch after M4 acceptance:** `feature/m5-developer-text-tools`  
**Status:** Implementation in progress on `feature/m5-developer-text-tools`; automated and manual acceptance remain pending.

## 1. Goal

Deliver six small, reliable utilities with consistent input, output, copy, and validation behavior. Prefer native browser/JavaScript APIs; avoid dependencies unless they materially improve correctness.

## 2. Included tools

### JSON Formatter / Validator
- Accept JSON text.
- Format with a fixed, readable indentation (2 spaces).
- Minify JSON.
- Validate and show a useful parse error.
- Preserve original input on errors.
- Copy formatted/minified output.
- No JSONPath, schema validation, tree editor, or diff.

### Base64 Encoder / Decoder
- Encode UTF-8 text to Base64.
- Decode Base64 to UTF-8 text.
- Handle non-ASCII characters correctly; do not call `btoa` directly on arbitrary Unicode strings.
- Detect malformed Base64 and invalid UTF-8 where possible.
- Copy output.
- No file/binary conversion in v1.0.

### URL Encoder / Decoder
- Encode/decode URI components using `encodeURIComponent` and `decodeURIComponent`.
- Show malformed percent-encoding errors.
- Preserve the distinction between encoding a full URL and an individual component; the v1.0 tool is explicitly a component encoder/decoder.
- Copy output.
- No automatic URL rewriting or query-parameter builder.

### UUID Generator
- Generate UUID v4 values using `crypto.randomUUID()` when available, with a standards-compliant `crypto.getRandomValues()` fallback if required by supported browsers.
- Generate one UUID at a time, with a small optional batch (e.g. 5) only if UI remains simple.
- Copy generated value.
- Do not implement custom weak pseudo-random fallback.

### Text Counter
- Count characters, words, and lines.
- Define characters as Unicode code points (not UTF-16 code units); optionally show grapheme count only if implemented with `Intl.Segmenter` and clearly labelled.
- Define words using `Intl.Segmenter` when supported, with a documented fallback.
- Define lines consistently: empty input is zero lines; otherwise count newline-separated lines.
- Update counts as the user types.
- No readability score or keyword analytics.

### Case Converter
- Convert to lowercase and uppercase.
- Convert to Title Case.
- Convert to camelCase, PascalCase, snake_case, and kebab-case.
- Handle whitespace, hyphens, underscores, and repeated separators predictably.
- Preserve Unicode where the target case conversion supports it.
- Copy selected output.
- Do not promise language-aware transliteration or perfect conversion of every proper noun.

## 3. Shared UX requirements

- Every tool has a labelled input and clearly labelled output.
- Input remains intact when conversion/validation fails.
- Copy action shows success/failure feedback and has a fallback when Clipboard API is unavailable.
- Provide a clear/reset action where it improves usability.
- Keyboard focus and accessible status messages are required.
- All processing happens locally; no content is sent to a server.
- Empty states and error states are explicit.
- Use a shared presentation pattern but keep each tool's logic isolated.

## 4. Suggested module boundaries

```text
src/tools/
  json-formatter/
  base64/
  url-encoder/
  uuid-generator/
  text-counter/
  case-converter/
src/components/
  tool-input/
  tool-output/
  copy-action/
```

Keep pure transformation functions separate from DOM rendering. Do not introduce a global state manager.

Verification checklist: [M5 verification guide](../verification/M5-VERIFICATION.md).\n\n## 5. Test and acceptance criteria

### JSON
- [ ] Valid nested JSON formats and minifies.
- [ ] Invalid JSON shows a useful error and preserves input.
- [ ] JSON strings containing Unicode and escaped characters survive round-trip.

### Base64
- [ ] ASCII and Unicode encode/decode round-trip.
- [ ] Empty input behavior is documented.
- [ ] Malformed Base64 and invalid UTF-8 produce clear errors.

### URL
- [ ] Spaces, Unicode, reserved characters, and punctuation encode/decode correctly.
- [ ] Malformed percent sequences show an error.
- [ ] Tool is clearly labelled as URI-component encoding, not full URL normalization.

### UUID
- [ ] Output matches UUID v4 structure and version/variant bits.
- [ ] Uses cryptographically secure browser randomness.
- [ ] Copy action works or reports unavailable clipboard access.

### Text Counter
- [ ] Empty, whitespace-only, multi-line, and Unicode samples are tested.
- [ ] Character/word/line definitions match the UI labels.
- [ ] Counts update without losing input.

### Case Converter
- [ ] Each supported target case has unit tests.
- [ ] Multiple separators and repeated whitespace are handled.
- [ ] Unicode casing behavior is tested for representative input.

### Cross-cutting
- [ ] All six tools appear in search and the correct categories.
- [ ] Copy and clear actions work.
- [ ] Errors are accessible and do not expose stack traces.
- [ ] No user input is transmitted.
- [ ] Lint, typecheck, tests, and production build pass.
- [ ] Mobile and keyboard checks pass.

## 6. Explicitly deferred

- Regex/JWT/hash/timestamp utilities.
- CSV and file processing.
- JSON schema validation and JSONPath.
- Binary Base64/file conversion.
- Batch UUID management and history.
- Advanced text diff and slug utilities.
- Server-side processing.

## 7. Implementation sequence

1. Start from accepted `main` after M4 merge.
2. Establish shared input/output/copy components only where reuse is real.
3. Implement pure functions and unit tests for each tool.
4. Add UI one tool at a time.
5. Verify Unicode and malformed-input edge cases.
6. Integrate tool registry and search.
7. Run full regression, update docs, and open the milestone PR.
