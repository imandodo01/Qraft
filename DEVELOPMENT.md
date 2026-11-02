# Qraft — Development Guide

**Status:** Proposed conventions for a new repository

## 1. Prerequisites

- A current supported Node.js LTS release.
- npm.
- Git.
- A modern browser.

Exact version requirements should be pinned in `package.json` and documented once the repository is initialized.

## 2. Initial setup

After repository initialization:

```bash
npm install
npm run dev
```

Expected scripts should include:
- `dev` — start Vite development server.
- `build` — run type checks as appropriate and create production assets.
- `preview` — preview the production build.
- `test` — run Vitest.
- `test:watch` — run tests in watch mode.
- `typecheck` — run TypeScript checks.
- `lint` — run static analysis if a linter is adopted.

Do not document a script as available until it exists.

## 3. TypeScript conventions

- Enable strict TypeScript settings.
- Prefer explicit types at module boundaries.
- Avoid `any`; use `unknown` and validate.
- Keep domain logic independent from DOM rendering where practical.
- Use descriptive names.
- Keep functions focused and testable.
- Avoid unnecessary abstractions and generic frameworks.

## 4. HTML and CSS conventions

- Use semantic HTML elements.
- Prefer native form controls unless a custom control has a clear benefit.
- Use CSS custom properties for design tokens.
- Scope tool-specific styles to the tool.
- Avoid global selectors that unexpectedly affect unrelated tools.
- Use responsive layouts and test at narrow widths.
- Support keyboard focus and reduced motion.

## 5. Tool implementation checklist

For each tool:
1. Define its purpose and supported input/output formats.
2. Define validation rules and edge cases.
3. Implement core logic separately from rendering where practical.
4. Build the interface using shared components.
5. Add copy/download behavior if applicable.
6. Handle unsupported APIs and failures.
7. Add unit and interaction tests.
8. Add the tool to the registry and search metadata.
9. Document limitations and privacy behavior.
10. Verify desktop and mobile layouts.

## 6. Git workflow

- Use short-lived feature branches.
- Keep commits focused and descriptive.
- Do not commit generated build output unless deployment requires it.
- Keep secrets and local environment files out of Git.
- Use pull requests for meaningful changes.
- Require successful tests and production build before merging.

Suggested branch examples:
- `feat/qr-generator`
- `feat/vcard-generator`
- `fix/vcard-line-folding`
- `docs/product-baseline`

## 7. Dependency policy

Before adding a dependency:
- Check maintenance and license.
- Review bundle impact.
- Understand whether it processes or transmits user data.
- Prefer established libraries for complex standards (such as QR encoding) over custom implementations.
- Avoid dependencies that merely wrap a trivial browser API.

## 8. Definition of ready

A task is ready when its user value, scope, expected behavior, and acceptance criteria are clear.

## 9. Definition of done

A task is done when:
- Acceptance criteria pass.
- Tests cover meaningful logic and edge cases.
- Type checks and production build pass.
- Errors and unsupported cases are handled.
- UI is responsive and keyboard usable.
- Documentation is updated where behavior or setup changed.
