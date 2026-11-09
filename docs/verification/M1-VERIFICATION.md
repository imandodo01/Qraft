# M1 — Application Foundation Verification

**Branch:** `feature/m1-foundation`  
**Pull request:** #1 — Qraft application foundation  
**Status:** Accepted; PR #1 merged into `main`.

This guide is the acceptance checklist for M1. Run it from the repository root after checking out the feature branch.

## 1. Get the branch

```bash
git fetch origin
git checkout feature/m1-foundation
git pull origin feature/m1-foundation
```

Confirm the current branch:

```bash
git branch --show-current
```

Expected output: `feature/m1-foundation`.

## 2. Install dependencies

```bash
npm install
```

This should install the dependencies and create `package-lock.json`.

If npm reports dependency or engine warnings, keep the complete output for review. Qraft currently targets Node.js 22.12 or newer.

## 3. Run automated checks

Run each command from the repository root:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected results:

| Command | Expected result |
|---|---|
| `npm run lint` | No ESLint errors |
| `npm run typecheck` | TypeScript exits successfully |
| `npm test` | All router and tool-registry tests pass |
| `npm run build` | Vite produces the production build in `dist/` |

Do not treat a failed command as an accepted result. Copy the full error output and report it before proceeding.

## 4. Run the application

```bash
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173/`.

## 5. Manual acceptance checklist

### Home and layout
- [ ] Qraft home page loads without a blank screen or console-breaking error.
- [ ] Brand, page heading, search field, categories, and tool cards are visible.
- [ ] Desktop layout has a sidebar and readable content width.
- [ ] Narrow/mobile layout has no unintended horizontal page scrolling.
- [ ] Browser refresh returns to a valid application view.

### Search and category filtering
- [ ] Search for `QR` and confirm QR Generator appears.
- [ ] Search for `JSON` and confirm JSON Formatter appears.
- [ ] Search for `contact` and confirm contact-related tools appear.
- [ ] Search for a nonsense term and confirm the empty state appears.
- [ ] Select each category and confirm only matching tools appear.
- [ ] Select All tools and confirm the complete list returns.
- [ ] Press `/` outside an input and confirm search receives focus.
- [ ] Press `/` while typing in an input and confirm normal text entry is not interrupted.

### Routing
- [ ] Open a tool card and confirm its detail page appears.
- [ ] Use the back link to return home.
- [ ] Use browser back and forward and confirm routes update.
- [ ] Open `#/unknown` and confirm the not-found view appears.
- [ ] Open a known tool URL directly, for example `#/tools/qr-generator`.

### Privacy and network behavior
- [ ] Confirm the initial shell does not require an account or backend.
- [ ] Confirm no external font request is required for the page to render.
- [ ] No user-entered tool content is transmitted; actual tool processing is not yet implemented in M1.

## 6. Lockfile and final branch update

After `npm install`, add the generated lockfile to the same feature branch:

```bash
git status --short
git add package-lock.json
git commit -m "chore: add reproducible dependency lockfile"
git push origin feature/m1-foundation
```

If npm changes any other tracked file, inspect the diff before committing it. Do not commit `.env`, local secrets, `node_modules/`, or `dist/`.

Once the lockfile is pushed, CI can use `npm ci` for reproducible installs. The current workflow uses `npm install` so the first run can bootstrap the lockfile.

## 7. Report results

Reply on PR #1 or in the development conversation with:

- Node.js version (`node --version`).
- npm version (`npm --version`).
- Result of lint.
- Result of typecheck.
- Test summary.
- Result of production build.
- Manual checklist failures or screenshots, if any.

A concise report is enough when every check passes. Include complete error output when something fails.

## 8. Acceptance record

M1 was locally verified and accepted by the user. PR #1 was merged into `main`. M2 implementation subsequently completed and was accepted through PR #4. This checklist is retained as the historical M1 verification guide.
