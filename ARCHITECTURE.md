# Qraft — Architecture

**Status:** Proposed baseline  
**Architecture style:** Modular, client-side TypeScript application

## 1. Technical direction

- HTML for semantic structure.
- CSS for styling and layout.
- TypeScript for application and tool logic.
- Vite for local development and production bundling.
- Vitest for unit tests.
- IndexedDB only when durable structured local data is required.

Vite is a build tool. Qraft does not use a frontend UI framework.

## 2. Architectural principles

- Keep tool logic independent from navigation and page layout.
- Keep shared UI components small and reusable.
- Keep browser APIs behind focused adapters where practical.
- Validate data at tool boundaries.
- Keep side effects explicit.
- Avoid a global state framework unless real complexity justifies it.
- Avoid adding a backend solely to support client-side utilities.

## 3. Proposed source layout

```text
qraft/
├── public/
│   ├── icons/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── bootstrap.ts
│   │   ├── router.ts
│   │   └── tool-registry.ts
│   ├── components/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── feedback/
│   │   └── common/
│   ├── tools/
│   │   ├── qr-generator/
│   │   ├── vcard-generator/
│   │   ├── business-card/
│   │   ├── json-formatter/
│   │   ├── base64/
│   │   ├── url-encoder/
│   │   ├── uuid-generator/
│   │   └── text-tools/
│   ├── services/
│   │   ├── storage/
│   │   └── export/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   └── components.css
│   └── main.ts
├── tests/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

This is a proposed structure, not an instruction to create empty abstractions. Add folders when they have real code to own.

## 4. Tool registry

Each tool should declare metadata used by navigation and discovery.

```ts
export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  path: string;
  status: "available" | "planned";
}
```

The registry should contain metadata and route/loading information, not tool-specific business logic. Avoid storing component constructors in metadata if a simple route-to-module mapping is sufficient.

A tool should have a clear entry point and own its validation and domain logic. Shared presentation primitives may be reused.

## 5. Tool module shape

A practical module may contain:

```text
tools/example-tool/
├── index.ts
├── view.ts
├── logic.ts
├── validation.ts
└── styles.css
```

Do not force every tool to contain every file. Keep simple tools simple.

## 6. Routing

Use a lightweight client-side router or a small explicit route resolver. Requirements:
- Direct navigation to a tool URL works after static-host fallback configuration.
- Unknown paths show a not-found view.
- Navigation updates browser history correctly.
- Back/forward navigation works.
- Route changes do not silently discard user input without warning where loss would matter.

## 7. State and persistence

Use in-memory state by default.

Use IndexedDB only for data that users reasonably expect to survive reloads, such as saved business-card projects or favorites. Define:
- Schema/versioning.
- Upgrade behavior.
- Error handling when storage is unavailable or full.
- Clear user controls for deleting saved data.

Do not persist sensitive contact data or tool inputs merely because persistence is technically possible.

## 8. Browser APIs

Potential APIs include:
- Clipboard API for copy actions.
- Blob and URL APIs for downloads.
- File API for user-selected files.
- Canvas for image rendering/export.
- Web Share API as progressive enhancement.
- MediaDevices for camera-based QR scanning (requires permission and a secure context).

Feature-detect optional APIs and provide a fallback or explain when unavailable.

## 9. External dependencies

Keep dependencies minimal and review each addition:
- Does it materially reduce complexity or improve reliability?
- Is it maintained and appropriately licensed?
- Can the same result be achieved with a small amount of clear native code?
- Does it send data outside the browser?

Use a QR library rather than inventing QR encoding. Validate generated QR output with independent scanners. Use a tested PDF/image export approach if native browser capabilities are insufficient.

## 10. Error handling

- Validate before processing.
- Show actionable errors near the relevant control.
- Do not expose stack traces to end users.
- Preserve input after recoverable errors.
- Handle browser API failures explicitly.
- Never report an export as successful until the file has actually been generated.

## 11. Security boundaries

- Treat pasted text and imported files as untrusted input.
- Render user content as text, not unsanitized HTML.
- Avoid `innerHTML` for user-provided content.
- Do not evaluate user-supplied code.
- Restrict supported URL schemes where links are generated.
- Revoke temporary object URLs when no longer needed.
- Avoid embedding secrets or personal information in logs.
