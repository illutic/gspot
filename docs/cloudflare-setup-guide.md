# Cloudflare Setup Guide: Domain to Deployment

Reference walkthrough for taking a new domain from purchase to a live site on Cloudflare
Pages, plus email routing for a custom-domain inbox. Written from how this project
(`restaurant-panorama.gr`, deployed via Cloudflare Pages Functions) is set up — reuse it for
similar static/JAMstack sites with a small serverless API.

## 1. Buy the domain

You can buy the domain anywhere (Cloudflare Registrar, Namecheap, Google Domains successor,
etc.). Two options:

- **Buy directly through Cloudflare Registrar** — no markup, nameservers are already
  Cloudflare's, skips step 2 entirely. Only available for already-Cloudflare-managed domains
  or transfers of existing ones (registrar page in the dashboard: **Domain Registration →
  Register Domain**).
- **Buy elsewhere, point it at Cloudflare** — cheaper/faster for a first purchase on most
  TLDs (e.g. `.gr` isn't always supported by Cloudflare Registrar), then follow step 2.

## 2. Add the site to Cloudflare (if not bought there)

1. Cloudflare dashboard → **Add a Site** → enter the domain.
2. Pick a plan (Free is enough for a marketing/restaurant site with Pages + Email Routing).
3. Cloudflare scans existing DNS records — review them before continuing so nothing (MX,
   existing A records) gets dropped.
4. Cloudflare gives you two nameservers (e.g. `xxx.ns.cloudflare.com`). Go to your registrar's
   dashboard and replace the existing nameservers with Cloudflare's.
5. Wait for propagation (minutes to ~24h). The dashboard shows "Active" once Cloudflare is
   authoritative for the zone.

## 3. Create the Cloudflare Pages project

1. Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize/select the GitHub repo (see the companion GitHub setup guide for repo
   conventions).
3. Build configuration:
   - **Framework preset**: match your bundler (Vite, Next.js, etc.) or leave "None" and set
     commands manually.
   - **Build command**: e.g. `npm run build`.
   - **Build output directory**: e.g. `dist`.
4. Every subsequent push to the production branch triggers a production deploy; every other
   branch/PR gets a unique preview URL automatically — no extra CI config needed for this.

### Pinning the output directory with `wrangler.jsonc`

Instead of (or in addition to) setting the build output directory in the dashboard, pin it in
the repo so it's versioned and survives project re-imports:

```jsonc
// wrangler.jsonc
{
  "name": "<project-name>",
  "compatibility_date": "2025-06-01",
  "pages_build_output_dir": "dist"
}
```

This is also what enables local emulation of Pages Functions (`wrangler pages dev dist`) and
`wrangler pages deploy` from the CLI.

## 4. Serverless API routes (Pages Functions)

Any file under `functions/` becomes an API route automatically — no separate backend service
needed for small endpoints (contact forms, reservation forms, webhooks):

```
functions/api/reservations.ts   →  POST/GET https://<domain>/api/reservations
```

Export `onRequestPost`, `onRequestGet`, etc. Type the environment with a `Env` interface and
declare bindings/secrets there — Cloudflare injects them into `context.env` at runtime.

Local dev:
- `vite dev` alone won't run Functions.
- Use `wrangler pages dev dist` (after building) to emulate the full Pages + Functions stack,
  or a dedicated npm script like `pages:dev` that builds then serves.

## 5. Environment variables & secrets

Dashboard → your Pages project → **Settings → Environment variables**.

- Set separate values for **Production** and **Preview** environments (e.g. a test API key
  for previews, live key for production).
- Anything sensitive (API keys, tokens) should be added as **Secret** (encrypted, not shown
  again) rather than plaintext variable.
- Locally, mirror the same variable names in a git-ignored `.dev.vars` file for
  `wrangler pages dev` to pick up, and document the required keys (without values) in a
  committed `.env.example`.

## 6. Custom domain

1. Pages project → **Custom domains → Set up a custom domain**.
2. Enter the apex domain and/or subdomain (e.g. `restaurant-panorama.gr` and
   `www.restaurant-panorama.gr`).
3. Since the zone is already on Cloudflare, DNS records (CNAME/A pointing at the Pages
   project) are created automatically — no manual DNS edits needed.
4. SSL is automatic (Cloudflare Universal SSL) once the domain is active.

## 7. Email routing (receiving mail at the custom domain)

Cloudflare Email Routing lets you receive mail at `you@yourdomain.com` and forward it to an
existing inbox (e.g. Gmail) for free — separate from *sending* transactional email (step 8).

1. Dashboard → your domain → **Email → Email Routing → Get started**.
2. Cloudflare adds the required **MX** and an **SPF-related TXT** record automatically to the
   zone (safe to accept since Cloudflare manages the zone's DNS).
3. Add a **destination address** — the real mailbox (e.g. your Gmail) that will receive
   forwarded mail — and verify it via the confirmation email Cloudflare sends there.
4. Add **routing rules**: map specific addresses (`info@yourdomain.com`,
   `reservations@yourdomain.com`) or a catch-all (`*@yourdomain.com`) to one or more verified
   destination addresses.
5. Enable **Catch-all** only if you want every address at the domain to route somewhere
   (useful early on; tighten to specific addresses later to reduce spam surface).

This only covers *receiving*. If the app needs to *send* email as the domain (e.g. reservation
confirmations), that's a separate transactional-email provider — see below.

## 8. Sending transactional email as the domain (e.g. Resend)

Cloudflare Email Routing does not send outbound app email; use a provider like Resend,
Postmark, or SendGrid, then verify the sending domain:

1. Sign up with the provider, add the domain as a **sending domain**.
2. The provider gives you DNS records to prove ownership and enable deliverability — typically
   an **SPF** TXT record, one or more **DKIM** CNAME/TXT records, and optionally a **DMARC**
   TXT record.
3. Add those records in Cloudflare DNS for the zone (**DNS → Records → Add record**). Existing
   SPF from Email Routing may need merging into a single `TXT` record rather than two separate
   `v=spf1` records (only one SPF record is valid per domain).
4. Wait for the provider to confirm verification (usually minutes).
5. Generate an API key scoped to sending, store it as a Pages **secret** environment variable
   (e.g. `RESEND_API_KEY`), and call the provider's API from the Pages Function.

## 9. Ongoing deploys

Once steps 1–8 are done, the workflow for future changes is just:

```
git push origin main        # → production deploy
git push origin some-branch # → preview deploy with its own URL
```

No manual deploy step, no CI/CD pipeline to maintain — Cloudflare Pages watches the connected
GitHub repo directly.

## Quick checklist for a new project

- [ ] Domain purchased / nameservers pointed at Cloudflare
- [ ] Site "Active" in Cloudflare dashboard
- [ ] Pages project created and connected to the GitHub repo
- [ ] `wrangler.jsonc` committed with `pages_build_output_dir`
- [ ] Env vars/secrets set for both Production and Preview
- [ ] Custom domain attached to the Pages project
- [ ] Email Routing set up if the domain needs to receive mail
- [ ] Transactional email provider's SPF/DKIM/DMARC records added if the app sends mail
