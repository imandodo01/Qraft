# Deploy Qraft to Cloudflare Pages

**Target:** Qraft v1.0  
**Status:** Deployed and verified at https://qraft-9y9.pages.dev/ (maintainer verification, 2026-11-10).

Qraft is a static Vite application. It does not require Pages Functions, Workers, a database, environment secrets, or a server-side runtime for its current v1.0 feature set.

## 1. Build configuration

The GitHub repository is connected to a Cloudflare Pages project. The selected configuration is:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | React (Vite) selected as the available Vite build preset |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node.js observed in Cloudflare build | `24.22.1` |

The React (Vite) preset supplies Vite-oriented build settings; Qraft itself remains a TypeScript/Vite application without React. The production build completed successfully in the supplied Cloudflare log. The repository's `package.json` currently declares Node.js `>=22.12.0`.

The committed Vite configuration uses `base: "./"`, and Qraft uses hash-based tool routes, so server-side SPA rewrites are not required for tool navigation.

## 2. Deployment verification

- Deployed URL: https://qraft-9y9.pages.dev/
- The maintainer confirmed all nine tools were working in the deployed application.
- The supplied build log showed `npm run build` completing successfully and generating the `dist` output.
- The initial Wrangler deploy-command failure occurred in a separate Workers setup attempt. The working deployment is Cloudflare Pages; no `wrangler deploy` command is required for this Pages workflow.

## 3. Security headers

The repository includes `public/_headers`, copied by Vite into `dist/_headers`.

On 2026-11-10, the maintainer ran:

```powershell
curl.exe -I https://qraft-9y9.pages.dev/
```

The response was `HTTP/1.1 200 OK` and included:

- `Strict-Transport-Security: max-age=31536000`
- `Content-Security-Policy` with same-origin defaults, no inline scripts, and the configured data/blob allowances.
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`

This confirms the headers were present on the checked root response. It does not by itself prove every path has identical headers or constitute a full security audit. The maintainer also reported that the nine tools worked on the deployed site after deployment.

## 4. Optional custom domain

A custom domain is not required for the initial release. The `pages.dev` hostname is usable as the public deployment URL. If a custom domain is added later, verify DNS, certificate provisioning, HTTPS, redirects, and headers before announcing it as canonical.

Do not change registrar nameservers or existing production DNS records without reviewing their current use and obtaining explicit approval.

## 5. Production promotion and rollback

Cloudflare Pages deploys the configured production branch. Before promoting future changes:
- Require green CI and review of the corresponding Git PR.
- Verify the deployment output and key tool workflows.
- Check HTTPS and response headers after deployment.

Pages retains deployment history. To roll back, select a previously verified deployment in the Pages dashboard and use the dashboard's rollback/redeploy controls. Record the selected deployment and verify the restored site afterward. Alternatively, revert the responsible Git commit through a normal reviewed PR; do not rewrite shared Git history.

## 6. Scope and privacy

Cloudflare serves the static application assets. Qraft's current tools continue to process user-entered content in the browser. Static hosting does not introduce an application API or require sending tool inputs to Cloudflare Pages Functions.

Hosting providers still receive ordinary infrastructure request metadata (such as IP address, request time, and requested asset path). Do not describe the hosted site as having zero network activity.
