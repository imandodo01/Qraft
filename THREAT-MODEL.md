# Qraft Threat Model

**Status:** Initial architecture-based threat model  
**Last reviewed:** 2026-11-09  
**Application scope:** Current browser-only tools: QR Generator and vCard Generator, plus shared navigation and build/deployment pipeline.

## 1. System context

Qraft is a static web application built with HTML, CSS, TypeScript, and Vite. Tool processing is intended to run locally in the user's browser. The current application does not require an application backend, account, or server-side database.

### In-scope assets

| Asset | Why it matters |
|---|---|
| Contact details entered in vCard Generator | May contain personal and business contact information. |
| Text and URLs entered into tools | May contain confidential or identifying information. |
| Generated VCF and QR image data | Exports may expose the same information as the input. |
| Application source and build dependencies | Compromise can alter code delivered to every user. |
| Release artifacts and hosting configuration | Compromise can inject malicious code or weaken browser protections. |
| User trust and privacy claims | Incorrect claims can cause users to disclose sensitive information. |

### Trust boundaries

1. **User to browser application:** All user input is untrusted, even when entered into a form.
2. **Application to browser APIs:** Clipboard, Blob, object URL, Canvas/QR encoder, and download behavior are privileged browser capabilities and must be used deliberately.
3. **Build environment to deployed assets:** npm packages, GitHub Actions, repository permissions, and deployment credentials can affect shipped code.
4. **Browser to hosting origin:** Static assets are downloaded from the hosting origin. A compromised host or build artifact can execute code in the application's origin.
5. **Future external services:** Any future API, analytics, hosted profile, or remote processing integration creates a new boundary and requires reassessment.

## 2. Adversaries and misuse cases

- A user submits crafted text or URLs intended to trigger script execution, unsafe navigation, or malformed exports.
- A malicious or compromised dependency introduces code into the build or runtime bundle.
- An attacker compromises a repository credential, workflow, or deployment account and replaces application assets.
- A hosting configuration exposes source maps or unintended files, serves incorrect MIME types, or omits browser security headers.
- A user mistakenly assumes that a generated QR code or vCard is private even after sharing or downloading it.
- A future feature stores or transmits personal information without clear disclosure or user control.

## 3. Threat analysis

| Threat | Impact | Current design controls / observations | Required verification or follow-up |
|---|---|---|---|
| DOM-based XSS from pasted contact/text values | Script execution in the Qraft origin | Current vCard preview uses text assignment; tool templates are assembled separately from user-provided values. Shared shell uses HTML templates and must remain limited to trusted static/registry metadata. | Test hostile HTML/script payloads in every tool and inspect every dynamic HTML sink. Prefer DOM APIs and `textContent` for user data. |
| Unsafe URL scheme or malformed URL | Script execution or deceptive navigation if a value is used as a link | vCard website validation accepts HTTP/HTTPS and normalizes bare domains to HTTPS. | Add hostile-scheme regression cases and verify future URL-consuming tools independently. |
| Malicious export content | Corrupt or misleading contact data; downstream parser issues | vCard serializer escapes text, uses CRLF, and folds UTF-8 lines. QR encodes the serialized vCard. | Fuzz escaping, line folding, Unicode, and import behavior with synthetic data. |
| Accidental data disclosure | Personal/contact data sent to a remote party | Current product direction is local-only; no automatic contact persistence is intended. | Inspect DevTools Network and browser storage during each tool's manual acceptance. Recheck when dependencies/features change. |
| Malicious dependency or compromised package | Arbitrary code in build or browser runtime | Lockfile and a small dependency set are intended controls. | Current lockfile mismatch is recorded in the dependency audit; regenerate and verify it before relying on reproducible installs. Run npm audit and review advisories. |
| Compromised CI or repository | Malicious build artifacts or source changes | GitHub Actions currently requests read-only repository contents for CI. | Review workflow action pinning, branch protections, required checks, secrets, and release permissions. |
| Weak production hosting configuration | Content injection, downgrade, MIME confusion, or information exposure | No production hosting configuration was available in this review. | Verify HTTPS, CSP, HSTS, nosniff, referrer policy, permissions policy, MIME types, and source-map exposure on the actual deployment. |
| Privacy claim overstates behavior | Users disclose information under a false assumption | `PRIVACY.md` explicitly says privacy promises require implementation verification. | Keep per-tool privacy checks as release gates; describe any future network or persistence behavior clearly. |

## 4. Security assumptions

- The user controls their browser and device. Qraft cannot protect exported files after they leave the application.
- A compromised browser, operating system, extension, device, or hosting account is outside the application's ability to fully mitigate.
- QR codes and VCF files are portable data. Anyone who receives them can inspect or copy their contents.
- Local processing reduces server-side exposure but does not make malicious input safe or guarantee endpoint security.
- A static app has no current authentication or authorization boundary. If accounts or hosted profiles are introduced, this model is no longer sufficient.

## 5. Out of scope for the current release

- Account takeover and server-side authorization (no account/backend exists).
- Server-side database injection and API authorization (no application API exists).
- Cloud storage security (not implemented).
- Hosted public profile privacy and enumeration (not implemented).
- Multi-tenant isolation (not applicable to current architecture).

These topics must be added if the product scope changes.

## 6. Risk treatment priorities

1. Repair and verify dependency lockfile consistency; perform a current vulnerability audit.
2. Establish automated and manual checks for DOM injection, URL handling, exports, and local-only processing.
3. Verify deployment headers and hosting configuration before public release.
4. Review CI permissions, action pinning, secret handling, and repository protections.
5. Reassess the threat model whenever a tool adds file import, browser permissions, persistence, network calls, or hosted data.

## 7. Review cadence

Review this document when a new tool or external integration is introduced, before public v1.0 release, after a material security incident, and at least once per major release.
