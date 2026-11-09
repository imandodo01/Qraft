# Qraft

**Your everyday digital toolbox.**

Qraft is a lightweight, browser-based collection of practical tools for creating, converting, inspecting, and sharing digital information. Core tool processing runs locally in your browser; no account or application backend is required for the current v1.0 workflows.

> Project status: v1.0 implementation in progress  
> Completed: M1 Foundation, M2 QR Studio, M3 Contact Studio, M4 Digital Business Card  
> Active work: M5 Developer and Text Tools

## Product principles

- **Useful before extensive:** Ship a small set of dependable tools before expanding the catalog.
- **Local-first:** Process user data in the browser whenever practical.
- **No account required:** Core functionality should work without registration.
- **Consistent experience:** Tools share navigation, visual language, feedback patterns, and accessibility expectations.
- **Composable:** A tool should work independently and combine naturally with other tools.
- **Honest boundaries:** Clearly disclose when a feature needs network access, external services, or hosted content.

## Technology

- HTML5 and CSS3
- TypeScript
- Vite for development and production builds
- Vitest for unit testing
- ESLint for static analysis

Qraft intentionally avoids a frontend UI framework and does not require a backend for its initial release.

## Current tools

- **QR Generator** — URL and plain-text QR generation, live preview, and PNG export.
- **vCard Generator** — vCard 3.0 preview, VCF export, and QR contact sharing.
- **Digital Business Card** — responsive card preview, custom accent color, PNG/VCF export, and contact QR.
- **JSON Formatter** — format, minify, and validate JSON.
- **Base64** — UTF-8 text encoding and decoding.
- **URL Encoder** — URI-component encoding and decoding.
- **UUID Generator** — cryptographically secure UUID v4 generation.
- **Text Counter** — count Unicode code points, words, and lines.
- **Case Converter** — convert common text case formats.

M5 utilities are under implementation and verification. See the [roadmap](ROADMAP.md) for current milestone status.

## Development

Requirements: Node.js 22.12 or newer and npm.

```bash
npm ci
npm run dev
```

Available checks:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Documentation

- [Product specification](PRODUCT_SPEC.md)
- [Roadmap](ROADMAP.md)
- [Architecture](ARCHITECTURE.md)
- [Design system](DESIGN_SYSTEM.md)
- [Development guide](DEVELOPMENT.md)
- [Testing strategy](TESTING.md)
- [Privacy principles](PRIVACY.md)
- [Security policy](SECURITY.md)
- [Threat model](THREAT-MODEL.md)
- [Security verification checklist](SECURITY-VERIFICATION.md)
- [Dependency audit record](docs/security/DEPENDENCY-AUDIT.md)
- [Feature backlog](docs/backlog/FEATURE-BACKLOG.md)
- [Changelog](CHANGELOG.md)

## Definition of done for v1.0

Qraft v1.0 is ready when the committed nine tools work reliably, the application is responsive and accessible, critical flows are tested, privacy behavior is documented, production builds pass, security verification is complete for the applicable scope, and the application is deployed to a public static host.
