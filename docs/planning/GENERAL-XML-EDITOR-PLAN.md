# General XML Editor — Product and Technical Plan

**Status:** Proposed product direction; not approved for implementation  
**Product:** Qraft  
**Planning checkpoint:** Post-v1.0.0 candidate  
**Release commitment:** None. This document does not establish a v1.1.0 scope, priority, or delivery date.

## 1. Purpose

General XML Editor is a proposed Qraft utility for reading, inspecting, editing, transforming, combining, and extracting reusable data from XML documents.

Its primary value is helping users turn XML structures into practical tabular data that can be copied or exported for reuse, especially in spreadsheet workflows.

The direction generalizes capabilities from earlier XML-processing scripts: selecting data, conditionally removing or retaining nodes, bulk value revision, and combining files. Those scripts are requirements references only; their domain assumptions and source data must not be carried into Qraft.

## 2. Product goals and non-goals

### Goals
- Support general, schema-agnostic XML rather than a specific invoice, tax, or business format.
- Provide raw XML editing and a structured tree view.
- Make extraction of repeated records into rows and selected elements/attributes into columns a first-class workflow.
- Let users inspect extracted rows before copying or exporting them.
- Provide previewable transformations rather than destructive in-place operations.
- Keep processing local to the browser by default.

### Non-goals for the initial direction
- A domain-specific invoice or tax XML application.
- XSD authoring or full XML Schema validation.
- An XML database, query server, or backend processing service.
- Automatic upload, cloud sync, or persistent document history.
- Guaranteeing byte-for-byte preservation after parsing and serialization.
- Implementing every XML standard or extension in the first release.

## 3. User workflow and conceptual model

1. **Load** an XML document by local file upload or paste.
2. **Inspect** it in raw XML and tree views.
3. **Process** it through formatting, extraction, search/filter, revision, or merge operations.
4. **Preview** the resulting XML or tabular data.
5. **Export** a derived XML file, copy tabular data, or download a spreadsheet.

The original input should remain recoverable during the session. Operations should produce a working/derived document or preview; they must not silently overwrite the source. Users should understand which document/version an operation affects.

A single active-document workspace is the preferred starting interaction model, with editor and XML tools operating on that document. Multiple documents/tabs are an open decision, not an M1 requirement.

## 4. Proposed milestone scope

Milestones describe a proposed sequence only. They are not approved delivery commitments.

### M1 — XML Foundation

**Goal:** Load, inspect, format, validate well-formedness, and export XML; introduce a basic extraction-to-table workflow.

Included:
- Upload XML and paste XML text.
- Raw XML editor.
- XML tree viewer for element hierarchy, attributes, and text.
- Formatter and minifier.
- Well-formed XML validation with actionable parser feedback.
- Download the current processed XML.
- Basic data extractor and table preview.
- Copy extracted data as TSV and CSV.

Initial acceptance criteria:
- [ ] A user can load XML from a supported local file or paste it without sending document contents to a Qraft backend or third-party processor.
- [ ] Raw editor and tree view represent the same active document; synchronization and parse-failure behavior are defined.
- [ ] Valid XML can be formatted and minified; invalid XML produces an actionable error and does not silently replace input.
- [ ] Tree view distinguishes elements, attributes, and text and handles nested and repeated elements.
- [ ] Well-formedness errors are distinguished from schema validation; no XSD-validity claim is shown.
- [ ] Downloaded XML is well-formed and reflects the selected working document.
- [ ] Basic extraction can select a repeated element as records and selected child values/attributes as columns, subject to the final M1 interaction decision.
- [ ] Extracted data is previewed in a table before copying.
- [ ] TSV and CSV correctly handle tabs, commas, quotes, line breaks, empty values, and Unicode.
- [ ] Empty input, malformed XML, missing selected values, and no-match states are handled clearly.
- [ ] Keyboard navigation, labels, responsive layout, and accessible status/error feedback follow Qraft standards.

### M2 — XML Operations

**Goal:** Make extraction configurable and add controlled document transformations.

Included:
- Search and filter nodes.
- Extractor configuration with a repeated node as row source.
- Select child elements and attributes as output columns.
- Preview extracted rows and values.
- Excel XLSX export.
- Bulk Revisioner for changing selected element/attribute values.
- Preview proposed revisions before applying them.

Initial acceptance criteria:
- [ ] A user can select a repeated node as the row source without hard-coded schema assumptions.
- [ ] Each configured column maps to a selected child element or attribute relative to the row source.
- [ ] Missing, empty, and repeated values have explicit, predictable representation; values are not silently dropped or ambiguously merged.
- [ ] Table preview matches the copied/exported data.
- [ ] XLSX opens as a workbook and preserves extracted values as text unless a type-conversion policy is approved.
- [ ] Spreadsheet output does not interpret untrusted XML text as formulas.
- [ ] Bulk Revisioner identifies the target node/attribute and operation, reports affected matches, and previews before/after values.
- [ ] Applying a revision never silently modifies the original input; users can inspect resulting XML before download.
- [ ] Zero matches, invalid target selection, and invalid replacement values are reported without corrupting the working document.
- [ ] Search/filter and extraction remain responsive within the documented supported-file envelope.

### M3 — Advanced Operations

**Goal:** Support compatible XML merging and harden namespace and large-document behavior.

Included:
- XML Merger for compatible documents.
- More complete namespace handling across parsing, selection, revision, extraction, and serialization.
- Large-file performance and memory testing.
- Refinement of XML operations based on M1/M2 verification.

Initial acceptance criteria:
- [ ] Merger checks compatibility before combining documents.
- [ ] Compatibility compares root expanded names (namespace URI + local name), not prefix text alone.
- [ ] Incompatible roots/namespaces are rejected with a clear explanation and no partial output.
- [ ] Merge behavior for root attributes, namespace declarations, comments, processing instructions, document types, and child ordering is defined and tested before implementation.
- [ ] Merged output is well-formed and retains namespace meaning; prefix spelling and byte-level formatting are not promised unless separately specified.
- [ ] Large-file limits, performance expectations, and failure behavior are documented from measured tests.
- [ ] Processing failures preserve the source and do not present a partially applied result as successful.

## 5. Technical direction and architecture fit

Qraft currently uses TypeScript, native HTML/CSS, Vite, and Vitest without a frontend framework. Tools live under **src/tools/<tool-name>**; the tool registry contains discovery metadata, and **src/main.ts** wires tool renderers. Shared UI and CSS patterns are maintained in the existing application.

The XML Editor should follow those conventions:
- Proposed module: **src/tools/xml-editor/**.
- Keep XML domain logic separate from DOM rendering and UI event handlers.
- Use focused modules for parsing/serialization, tree traversal, extraction, revision, merge, and export only where those boundaries have real consumers.
- Keep browser-specific file, clipboard, Blob/download, and worker behavior behind small adapters where useful.
- Reuse Qraft controls, feedback patterns, navigation, layout, and CSS tokens. Do not introduce a new theme, token set, or parallel design system.
- Integrate through the existing registry/router; do not add a new routing or state framework.
- Keep session state in memory by default. No document persistence/history is proposed.

### Browser XML APIs — candidate baseline, not a final decision

Evaluate native browser APIs first:
- DOMParser to parse XML text.
- DOM APIs for namespace-aware traversal and mutation.
- XMLSerializer to serialize the working document.
- File APIs for local input.
- Blob/object URLs for downloads.
- Clipboard API, with a fallback, for TSV/CSV copy.

Detect parser errors and treat parsed documents as untrusted. Render XML values as text, not unsanitized HTML. Release temporary object URLs and large in-memory references when no longer needed.

Parsing into a DOM and serializing it again may normalize whitespace, formatting, declaration details, or other lexical representation. Promise semantic XML correctness where verified, not byte-for-byte source preservation. Exact lexical preservation would require a separate investigation.

### Namespace rules
- Use namespace-aware APIs (namespaceURI, localName, and qualified names as appropriate); do not treat prefixes as globally unique identifiers.
- Extraction and revision selectors must define whether matching uses namespace URI/local name, prefix-aware paths, or another explicit model.
- Serialization and merge must preserve namespace meaning and avoid unbound prefixes.
- Prefix preservation is distinct from namespace-semantic preservation; the required guarantee must be explicit.

### XML security and input handling
- Treat uploaded and pasted XML as untrusted.
- Do not execute scripts or render embedded markup as active HTML.
- Investigate DTD/entity behavior in supported browsers. Recommended conservative default: reject DOCTYPE/DTD-bearing input in the first supported scope unless a documented use case and safe handling strategy justify supporting it.
- Do not add a custom entity resolver or external-resource fetch behavior.
- Define file-size and processing limits; fail clearly rather than freezing the interface or silently truncating content.
- Do not include document content in logs, telemetry, analytics, or error reports.
- Use synthetic fixtures only. Never use real NIK, TIN, NITKU, identity mappings, invoice payloads, or legacy-script data in source code, examples, screenshots, or tests.

## 6. Extraction and export behavior

Extraction is a user-configured mapping, not a collection of invoice-specific field names.

Proposed conceptual mapping:
- **Row source:** a repeated element selected by the user.
- **Columns:** selected child elements and/or attributes relative to each row-source element.
- **Cell value:** text content or attribute value according to the column definition.
- **Preview:** a table of the exact rows and columns to be copied/exported.

Decisions still required: how users select paths (tree selection, namespace-aware path expressions, XPath, or a staged approach), how nested text is handled, how multiple matching values map to one cell, and how missing values are represented.

TSV should be optimized for spreadsheet paste. CSV must use correct quoting/escaping. XLSX should be generated locally, with dependency/license/bundle review before choosing a library. XML-derived values should default to text cells; strings beginning with formula characters must not become executable spreadsheet formulas.

## 7. Revisioner behavior

Bulk Revisioner is a transformation workflow, not unbounded find-and-replace over raw text.

An operation should define:
- Target selection (element text, attribute value, or another explicitly supported target).
- Match scope and criteria.
- Operation type (initial candidates: replace value, set value, remove selected node, or retain selected nodes).
- Number of matched/affected nodes.
- Before/after preview.
- Explicit apply action to a working copy.

Favor a small set of deterministic operations first. Regex replacement, arbitrary scripting, and complex conditional rule builders are not assumed in scope until separately evaluated.

## 8. XML Merger behavior

Merging is not concatenating XML files. The proposed merger combines compatible documents under a defined rule.

The initial compatibility gate should compare root expanded names (namespace URI + local name). Prefix differences alone should not make equivalent namespace-qualified root names incompatible. A merge must not silently discard conflicting root attributes or namespace declarations.

Before implementation, decide:
- Whether only direct child nodes are appended to the first document's root.
- Whether root attributes must match exactly, may be merged when non-conflicting, or require user resolution.
- How comments, processing instructions, document type declarations, and XML declarations are handled.
- Whether document order is preserved and how duplicate records are treated.
- Whether identical root expanded names are sufficient or additional compatibility rules are required.

## 9. Cross-cutting quality gates

- Unit tests for parsing, namespace-aware selection, extraction mapping, serialization, revision operations, and merge compatibility.
- Synthetic fixtures for nested/repeated elements, attributes, namespaces, Unicode, empty values, malformed XML, comments, CDATA, and large documents.
- Tests for TSV/CSV quoting and XLSX string-cell safety.
- UI tests for file/paste input, editor/tree synchronization, previews, copy/download, errors, and reset.
- Lint, TypeScript typecheck, full test suite, and production build.
- Manual verification of exported XML and spreadsheet files in representative applications.
- Responsive and keyboard-accessibility checks.
- Browser/performance testing with browser versions and representative file sizes recorded.
- Network inspection confirming document contents are not transmitted.

A successful build alone is not acceptance. Exported artifacts and data integrity must be checked directly.

## 10. Open technical and product decisions

These remain unresolved and should be decided during technical discovery before implementation scope is approved.

1. **Editing model:** Is raw XML the source of truth, or should tree edits be first-class and synchronized bidirectionally?
2. **Tree interaction:** Is the initial tree viewer read-only, or can users edit node values/attributes there?
3. **Extraction selector:** Start with tree selection, a path builder, XPath, or a staged combination? What namespace handling is exposed?
4. **Cell mapping:** How should nested text, multiple matches, mixed content, missing values, and repeated child values be represented?
5. **XLSX library:** Which maintained, appropriately licensed browser-compatible library offers acceptable output, bundle size, and security posture?
6. **DTD policy:** Reject documents containing DOCTYPE in the first release, or support a justified compatibility requirement?
7. **Size/performance envelope:** What file-size and node-count targets should be supported on representative desktop/mobile browsers?
8. **Worker strategy:** Is a Web Worker needed to protect UI responsiveness, and at what measured threshold?
9. **Revision scope:** Which deterministic operations are essential first? Are conditional filters and regex explicitly deferred?
10. **Merger semantics:** What exact child/attribute/comment/namespace merge policy applies?
11. **CSV safety:** How should formula-leading values be represented while preserving source values and spreadsheet safety?
12. **Versioning/release:** Should this be a standalone milestone/release after v1.0.0, and what coherent scope belongs in its first increment?

## 11. Proposed next checkpoint

**Checkpoint: XML Technical Discovery — no implementation.**

Before creating implementation tasks:
1. Agree on the editing model and M1 extractor interaction.
2. Decide the DTD/DOCTYPE policy and initial supported XML feature subset.
3. Define extraction path and cell-value semantics with synthetic examples.
4. Select an XLSX approach after dependency/license/bundle evaluation.
5. Define measurable file-size/performance targets and whether workers are needed.
6. Decide whether M1 includes a basic extractor or a complete row-source/column-mapping UI.
7. Confirm the first-release boundary and acceptance criteria.

After these decisions, revise this plan and seek explicit approval for a milestone scope. Only then should implementation issues/tasks be created. No GitHub issues or project tasks are created by this planning document.

## 12. References

- [Qraft Architecture](../../ARCHITECTURE.md)
- [Qraft Product Specification](../../PRODUCT_SPEC.md)
- [Qraft Design System](../../DESIGN_SYSTEM.md)
- [Qraft Privacy Policy](../../PRIVACY.md)
- [Qraft Development Guide](../../DEVELOPMENT.md)
- [Qraft Feature Backlog](../backlog/FEATURE-BACKLOG.md)
- [Qraft Quality and Architecture Review](QUALITY-ARCHITECTURE-REVIEW.md)
