# Deploy Qraft to Cloudflare Pages

**Target:** Qraft v1.0  
**Status:** Provider selected; no Cloudflare account connection or deployment has been performed.

Qraft is a static Vite application. It does not require Pages Functions, Workers, a database, environment secrets, or a server-side runtime for its current v1.0 feature set.

## 1. Build configuration

Create a Pages project and connect the `imandodo01/Qraft` GitHub repository.

Use these production build settings:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | Vite (or None if the preset is unavailable) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node.js version | `22.12.0` or newer |

The repository's `package.json` declares Node.js `>=22.12.0`. If the Pages build environment needs an explicit version, configure `NODE_VERSION=22.12.0` in the Pages build environment. Do not add secrets or application environment variables; the current app has none.

The committed Vite configuration uses `base: "./"`, so built assets use relative paths. Qraft uses hash-based tool routes (for example, `/#/tools/qr-generator`), so server-side SPA rewrites are not required for tool navigation.

## 2. Preview deployment workflow

1. In Cloudflare, open **Workers & Pages** and create a Pages application.
2. Choose **Connect to Git** and authorize access to the Qraft repository.
3. Configure the build settings above.
4. Save and allow the first deployment to complete.
5. Open the generated `*.pages.dev` preview URL.
6. Test the home page, each tool route, browser back/forward, and refresh.
7. Inspect browser DevTools Network and Console for failed assets, CSP violations, or unexpected external requests.
8. Verify response headers using the browser Network panel or `curl -I <preview-url>`.

Pull Requests should receive preview deployments when the repository integration and project settings support them. Verify that behavior with a test PR before relying on it as a release gate.

## 3. Security headers

The repository includes `public/_headers`. Vite copies this file into `dist/_headers`, where Cloudflare Pages can apply the declared response headers.

The baseline includes:
- Content Security Policy restricting scripts, connections, and resource origins to the same origin, with data/blob images allowed for locally generated previews and exports.
- HSTS, to be served only over HTTPS.
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'`.
- `Referrer-Policy`.
- A restrictive `Permissions-Policy`.

**Important:** Configuration is not proof of enforcement or compatibility. Verify the actual response headers on a Pages preview and exercise all nine tools. If CSP blocks a legitimate feature, inspect the violation and make the narrowest necessary adjustment; do not add broad `unsafe-eval` or wildcard origins as a shortcut. The current policy allows inline styles for compatibility with DOM-driven UI styling, but does not allow inline scripts.

HSTS is appropriate only when the deployed site is HTTPS. Cloudflare Pages provides HTTPS for its Pages hostname; verify redirects and headers on the actual deployment before treating this control as passed.

## 4. Custom domain (optional)

A custom domain is not required for the first preview. When ready:
1. Add the domain in the Pages project's **Custom domains** section.
2. Follow Cloudflare's DNS instructions. For a zone already managed by Cloudflare, Pages can guide the required DNS record.
3. Wait for certificate provisioning.
4. Verify HTTPS, redirects, headers, and the canonical URL.

Do not change registrar nameservers or existing production DNS records without reviewing their current use and obtaining explicit approval.

## 5. Production promotion

Do not treat the first preview as production acceptance. Promote `main` to production only after:
- M6 functional, accessibility, privacy, and security checks are complete.
- The preview deployment passes route, asset, export, and response-header checks.
- The final PR has green CI and explicit user acceptance.

Cloudflare Pages automatically deploys the configured production branch. Merge to `main` only after the normal Qraft PR acceptance process.

## 6. Rollback and redeploy

Pages retains deployment history. To roll back, select a previously verified deployment in the Pages dashboard and use the dashboard's rollback/redeploy controls. Record the selected deployment and verify the restored site afterward. Alternatively, revert the responsible Git commit through a normal reviewed PR; do not rewrite shared Git history.

## 7. Scope and privacy

Cloudflare serves the static application assets. Qraft's current tools continue to process user-entered content in the browser. Static hosting does not introduce an application API or require sending tool inputs to Cloudflare Pages Functions.

Hosting providers still receive ordinary infrastructure request metadata (such as IP address, request time, and requested asset path). Do not describe the hosted site as having zero network activity: the browser must fetch the application, and the hosting provider processes those requests.
