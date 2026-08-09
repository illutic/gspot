# Operational Guidelines & Architectural Lessons

This document details cross-cutting engineering lessons, operational best practices, and battle-tested architectural recipes learned from shipping production web applications. Use this as a playbook for building and deploying new web platforms.

---

## 1. Modular Monolith Architecture (Gradle-Inspired Autonomy)

To maintain long-term code health, prevent spaghetti imports, and enable autonomous feature development without multi-package monorepo complexity, adopt the **Lightweight Modular Monolith** pattern:

### 1.1 The 3-Tier Layering Rule
1. **Core Layer (`@core/*`)**: Contains zero business logic and zero feature knowledge. Encapsulates design tokens, atomic UI components (`@core/ui`), theming (`@core/theme`), type-safe localization (`@core/i18n`), and API helpers (`@core/api`).
2. **Feature Layer (`@features/*`)**: Autonomous domain modules (e.g. `@features/home`, `@features/menu`, `@features/blog`). Each feature owns its components, hooks, styles, data definitions, and unit tests.
3. **App Orchestration Layer (`@app/*`)**: The root application shell. Wires up router paths, renders global layout, mounts context providers, and acts as the composition root.

### 1.2 Strict Public API Boundaries (Barrels)
- Every module must define a top-level `index.ts` declaring its explicit public export surface.
- **Rule**: External modules must import exclusively via `@features/<name>` or `@core/<name>`. Direct imports into nested internal paths (e.g. `@features/menu/components/InternalDishCard`) are strictly prohibited.
- **Benefit**: Refactoring internal feature implementation details will never break other modules as long as the public `index.ts` contract is preserved.

---

## 2. Hosting & Platform Selection: Cloudflare Pages

For modern Single Page Applications (SPAs) with lightweight serverless endpoints (contact forms, booking flows, auth, webhooks), **Cloudflare Pages** is the recommended default:
- **Zero-Cost High Performance**: Unlimited bandwidth, globally distributed CDN edge caching, and generous free tier build minutes.
- **Colocated Edge APIs (Pages Functions)**: Placing `functions/api/*.ts` inside the same repository eliminates the complexity and latency of maintaining a separate backend service.
- **Integrated DNS, Domain & Email**: Custom domains, automated SSL certificates, DNS management, and Email Routing live in a single unified dashboard.
- **Configuration as Code**: Use `wrangler.jsonc` to pin compatibility dates and build output directories (`"pages_build_output_dir": "dist"`).

---

## 3. Zero-Library Type-Safe i18n Architecture

External i18n packages (like `react-i18next` or `react-intl`) introduce significant bundle weight, complex runtime initialization, and fragile string-based translation keys. A native TypeScript architecture provides superior performance and safety:

1. **Compile-Time Parity via Subtyping**:
   Typing secondary language trees as `copyTarget: typeof copyBase` forces TypeScript to fail the build (`npm run build`) if a translation key is missing or misspelled.
2. **Static Dataset Pre-Computation**:
   Pre-compute localized static arrays (e.g. `MENU_EN`, `MENU_EL`) at module load time. Export getter functions (`getMenuItems(lang)`) so component re-renders execute with zero memory allocations.
3. **Context Memoization**:
   Wrap context value objects in `useMemo` and state update functions in `useCallback` to prevent cascading re-renders across the component tree.
4. **DOM & SEO Synchronization**:
   Automatically update `<html lang="...">`, `<title>`, and `<meta name="description">` on language switches.

---

## 4. Dark & Light Theme Architecture

Implement a seamless, flicker-free theming system using CSS custom properties and the `data-theme` attribute:
- **OS Default with Explicit Override**: Default to the user's OS preference (`window.matchMedia('(prefers-color-scheme: dark)')`), while persisting explicit user toggles to `localStorage`.
- **`color-scheme` Property**: Ensure `:root, [data-theme="light"] { color-scheme: light; }` and `[data-theme="dark"] { color-scheme: dark; }` are set so browser native controls (scrollbars, form inputs) adapt automatically.
- **Smooth Global Transitions**: Apply `html { transition: background-color 0.25s ease, color 0.25s ease; }` to prevent jarring theme flashes while keeping interactive component animations snappy.

---

## 5. Typography & Font Performance

Third-party font CDNs (like Google Fonts) introduce extra DNS lookups, TLS connections, and render-blocking delays. Always self-host fonts:
- **Method 1: `@fontsource` Bundled Packages**:
  Install font packages (e.g. `@fontsource/inter`, `@fontsource/jetbrains-mono`) and import them in `@core/ui/tokens.css`. Vite will hash, bundle, and serve them alongside static assets.
- **Method 2: Static WOFF2 Preloading**:
  Place `.woff2` files in `/public/fonts/` and add `<link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin />` in `index.html`.
- **Font Display**: Always include `font-display: swap;` in `@font-face` definitions to eliminate FOIT (Flash of Invisible Text).

---

## 6. Core Web Vitals & Asset Strategy

Target sub-second LCP (Largest Contentful Paint) and zero CLS (Cumulative Layout Shift):
1. **Critical Hero Media**:
   - Preload hero images in `index.html` with `fetchpriority="high"`, `as="image"`, and responsive `imagesrcset`.
   - Never lazy-load the above-the-fold hero image (`loading="eager"`).
2. **Layout Stability**:
   - Always declare explicit `width`, `height`, or CSS `aspect-ratio` on all image and video containers to eliminate layout shifts when assets load.
3. **Vector Graphics & Icons**:
   - Prefer SVG sprites (`/public/icons.svg#icon-id`) or inline SVG components over bloated icon font libraries.

---

## 7. Edge Compute & Timezone Safety

Cloudflare Workers run on UTC system time across globally distributed edge nodes.
- **The Pitfall**: Calling `new Date().toISOString()` or `new Date().getDate()` on the server yields UTC time, which may differ by a calendar day from the user's or business's local date.
- **The Solution**: Always format dates using an explicit IANA timezone:
  ```typescript
  export function getLocalTodayStr(timeZone = 'Europe/Athens'): string {
    return new Intl.DateTimeFormat('sv-SE', { timeZone }).format(new Date());
  }
  ```

---

## 8. Email Architecture: Routing vs Transactional Delivery

Never conflate receiving email with sending transactional email:
1. **Receiving Mail at Domain (`info@domain.com`)**:
   - Handled via **Cloudflare Email Routing**.
   - Requires only DNS MX and TXT records configured in Cloudflare.
   - Forwards inbound messages directly to a personal or team mailbox at zero cost.
2. **Sending Transactional Mail (Booking Confirmations, Alerts)**:
   - Handled via a specialized delivery provider (e.g., **Resend**).
   - Requires separate SPF, DKIM, and DMARC DNS records.
   - Requires an API key stored as an encrypted Cloudflare Pages Secret (`RESEND_API_KEY`), never committed.

---

## 9. Anti-Bot Defense-in-Depth Without CAPTCHAs

Protect public form endpoints without frustrating human users with intrusive CAPTCHAs:
1. **Honeypot Field**: Include a visually hidden field (e.g., `website`). If populated, silently return a fake `200 OK` without executing backend operations.
2. **Submission Timing Gate**: Pass a client-rendered timestamp (`formRenderedAt`). If submitted in `<1500ms`, reject as automated submission.
3. **DoH MX Record Check**: Verify the email domain has valid DNS MX records via Cloudflare DoH (`https://cloudflare-dns.com/dns-query?name=${domain}&type=MX`) before sending emails.
4. **Typo Suggestions**: Detect common domain typos (e.g., `gmial.com`, `outlok.com`) and return actionable feedback.
5. **Length Constraints**: Enforce strict upper bounds on all free-text fields to prevent payload inflation.

---

## 10. Secrets & Environment Isolation

- **Committed Template**: `.env.example` documents variable names and acquisition instructions, with dummy values only.
- **Local Edge Emulation**: Store local keys in `.dev.vars` (git-ignored), which `wrangler pages dev` automatically reads.
- **Cloudflare Pages Secrets**: Set separate encrypted secrets for **Production** and **Preview** environments in the Cloudflare dashboard to ensure test runs never email real customers.

---

## 11. Git Workflow & Definition of Done

- **Lightweight Branching**: Direct-to-`main` commits for low-risk changes. Use feature branches and PRs for risky infra or API migrations to validate on Cloudflare **Preview URLs**.
- **Definition of Done**:
  1. `npm run build` succeeds cleanly.
  2. `npm run lint` (`oxlint`) passes with zero errors.
  3. `npm run typecheck` passes across client and server.
  4. Tested locally via `npm run dev` or `npm run pages:dev`.
