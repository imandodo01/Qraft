# Qraft — Privacy and Data Handling

**Status:** Product policy baseline  
**Scope:** Initial client-side application

## 1. Default position

Qraft should process user inputs locally in the browser whenever practical. Core tools should not require an account or send user content to a server.

This is a design commitment, not a claim about an implementation that has not yet been built. Each feature must be verified before the application makes a privacy promise.

## 2. Data categories

Potential user data includes:
- Contact details entered into vCard or business-card tools.
- Text or structured data pasted into developer tools.
- Images or files selected for media tools.
- Locally saved projects, favorites, or history.

Treat all of this as user-controlled and potentially sensitive.

## 3. Processing rules

- Do not upload user data by default.
- Do not include user content in analytics, logs, or error reports.
- Do not persist tool inputs unless the feature clearly requires it.
- Explain what is saved and provide a way to delete saved data.
- Use browser storage only for a documented purpose.
- Revoke temporary object URLs and release resources when finished.
- Do not transmit contact data to third-party services without clear user action and disclosure.

## 4. External capabilities

Some features may require browser permissions or external resources:
- Camera access for QR scanning.
- Network access to open or resolve URLs.
- Hosted profile pages for shareable online business cards.
- Optional external fonts or libraries, if selected.

Explain these dependencies. Camera access should be requested only when the user starts scanning.

## 5. Hosted profile distinction

A QR code containing a vCard can work without hosting a profile. A QR code that opens a public digital profile requires that profile to be hosted and publicly reachable.

If hosted profiles are introduced later, the product must define:
- What information becomes public.
- How users publish, update, and unpublish profiles.
- Whether URLs are guessable.
- Retention and deletion behavior.
- Hosting and service dependencies.

## 6. Security practices

- Treat all input as untrusted.
- Avoid rendering user input as HTML.
- Validate file type and size where relevant.
- Use safe URL schemes.
- Avoid dynamic code evaluation.
- Keep dependencies updated.
- Do not store secrets in source control.

## 7. User-facing privacy language

Only state “your data stays on your device” for a tool after confirming that its full processing path does not transmit that data. If a tool uses a network service, describe that behavior accurately.
