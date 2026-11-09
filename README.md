# Qraft

**Your everyday digital toolbox.**

Qraft is a lightweight, browser-based collection of practical tools for creating, converting, inspecting, and sharing digital information. The nine committed v1.0 tools process user content locally in the browser; no account or application backend is required.

> Project status: v1.0 release hardening (M6)  
> Completed: M1 Foundation, M2 QR Studio, M3 Contact Studio, M4 Digital Business Card, M5 Developer and Text Tools  
> Active work: M6 Integration and Release Hardening

## Product principles

- **Useful before extensive:** Ship a small set of dependable tools before expanding the catalog.
- **Local-first:** Process user data in the browser.
- **No account required:** Core functionality works without registration.
- **Consistent experience:** Tools share navigation, visual language, feedback patterns, and accessibility expectations.
- **Composable:** A tool should work independently and combine naturally with other tools.
- **Honest boundaries:** Clearly disclose when a feature needs network access, external services, or hosted content.

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

The v1.0 scope is intentionally limited to these nine tools. See the [feature backlog](docs/backlog/FEATURE-BACKLOG.md) for deferred ideas.

## Technology

- HTML5 and CSS3
- TypeScript
- Vite
- Vitest
- ESLint

Qraft avoids a frontend UI framework and does not require an application backend for its initial release.

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

## Deployment

Cloudflare Pages is the selected static-hosting target for Qraft v1.0. The repository is prepared for a Vite production build, but a Cloudflare account connection and production deployment have not yet been performed.

See the [Cloudflare Pages deployment guide](docs/deployment/CLOUDFLARE-PAGES.md) for build settings, preview deployments, custom domains, and verification steps.

## Documentation

- [Product specification](PRODUCT_SPEC.md)
- [Roadmap](ROADMAP.md)
- [Project status](PROJECT_STATUS.md)
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
- [Milestone verification guides](docs/verification/)
- [Changelog](CHANGELOG.md)

## Definition of done for v1.0

Qraft v1.0 is ready when all nine committed tools pass functional and export acceptance, the application is responsive and accessible, privacy and applicable security checks are evidenced, the production build is reproducible, static deployment is verified, and final user acceptance is complete.
