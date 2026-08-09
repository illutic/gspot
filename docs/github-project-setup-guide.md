# GitHub Project Setup Guide

Reference for spinning up a new repo the same way this one (`illutic/panorama`) is set up:
small Vite/React site, Cloudflare Pages for hosting, private repo, no separate CI needed
because Cloudflare builds on push.

## 1. Create the repo

```
gh repo create <org>/<name> --private --source=. --remote=origin
```

- Default to **private** for client/commercial projects; flip to public deliberately.
- Default branch `main`.
- Skip a license file for private/commercial work; add one only for OSS.

If starting from an existing local project instead of `gh repo create`:

```
git init
git remote add origin https://github.com/<org>/<name>.git
git push -u origin main
```

## 2. Baseline files

- **`.gitignore`** — at minimum: `node_modules`, build output (`dist`), `.env*` (except
  `.env.example`), `.dev.vars`, editor/IDE folders you don't want versioned (`.idea`, `.vscode`
  if personal), `.vercel`/`.wrangler` local state dirs.
- **`README.md`** — replace the framework-template boilerplate (e.g. default Vite README)
  with actual project info: what it is, how to run it locally, how to deploy, where secrets
  live. Don't leave the scaffold's generic README as the permanent one.
- **`.env.example`** — every environment variable the app needs, with a comment on where to
  get the value, but no real values.
- **`docs/`** — plan/spec docs, and infra guides like this pair, live here rather than
  scattered as loose root-level markdown files.

## 3. Branching & merge model

For a small solo/small-team project like this one, a lightweight model works well and matches
what's in this repo's history:

- Trivial changes: commit straight to `main` (Cloudflare Pages auto-deploys production on
  push).
- Larger/riskier changes (framework migrations, infra changes): a feature branch → PR → merge,
  so the change gets its own Cloudflare Pages **preview URL** to sanity-check before it hits
  production. E.g. `7aa1dd9` (Vercel → Cloudflare Pages migration) went through
  `cloudflare-pages-migration` → PR #1 → merge, rather than direct-to-main.

Branch protection / required reviews need a paid GitHub plan on private repos (see below) — on
Free, self-discipline about when to branch is the substitute.

## 4. Repo settings worth checking

- **Visibility**: private for anything not meant to be public.
- **Default branch**: `main`.
- **Branch protection**: `gh api repos/<org>/<name>/branches/main/protection` — on private
  repos this requires GitHub Pro/Team/Enterprise; on Free it 403s. If protection matters,
  either upgrade the plan or make the repo public.
- **Secrets**: this project keeps runtime secrets in **Cloudflare Pages** environment
  variables, not GitHub Actions secrets, since there's no GitHub Actions workflow — Cloudflare
  builds directly from the connected repo. Only add GitHub Actions secrets (`gh secret set`)
  if you actually add a workflow (e.g. running tests/lint on PRs).
- **Webhooks**: Cloudflare's GitHub App integration installs its own webhook when you connect
  the repo in step "Connect to Git" (Cloudflare guide, step 3) — nothing to configure manually
  on the GitHub side beyond authorizing the app/repo access.

## 5. Optional CI (lint/typecheck on PRs)

Not required for Cloudflare Pages to deploy (it always builds regardless of lint/type errors
in the build script), but worth adding once a project has more than one contributor. Minimal
example:

```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
```

## 6. Quick checklist for a new project

- [ ] Repo created (private by default), `main` as default branch
- [ ] `.gitignore` covers `node_modules`, build output, `.env*`, local wrangler/vercel state
- [ ] README rewritten from framework boilerplate to actual project docs
- [ ] `.env.example` lists all required env vars with no real values
- [ ] Cloudflare Pages connected to the repo (see `cloudflare-setup-guide.md`)
- [ ] Decide branch model (direct-to-main vs. PR) based on team size/risk
- [ ] Add a CI workflow only once lint/typecheck-on-PR is actually needed
