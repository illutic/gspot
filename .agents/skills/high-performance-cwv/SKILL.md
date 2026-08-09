---
name: high-performance-cwv
description: |
  Optimizes web applications for sub-second Core Web Vitals (CWV) including Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Use this skill when auditing page speed, preloading critical media, eliminating layout shifts, configuring caching headers, or optimizing asset loading.
---

# High-Performance Core Web Vitals Skill

This skill provides optimization patterns to achieve 95+ Google Lighthouse scores and superior real-user Core Web Vitals.

## 1. Largest Contentful Paint (LCP) Optimization

### Step 1: Preload Above-the-Fold Hero Media
Preload the candidate LCP element in `index.html` with `fetchpriority="high"` and responsive srcset:
```html
<link
  rel="preload"
  fetchpriority="high"
  as="image"
  href="/images/hero.webp"
  type="image/webp"
  imagesrcset="/images/hero-mobile.webp 768w, /images/hero.webp 1920w"
  imagesizes="100vw"
/>
```

### Step 2: Render Hero Image with Eager Loading
In the React hero component, never use `loading="lazy"` on the LCP image:
```tsx
<img
  src="/images/hero.webp"
  srcSet="/images/hero-mobile.webp 768w, /images/hero.webp 1920w"
  sizes="100vw"
  alt="Hero banner"
  fetchPriority="high"
  loading="eager"
  decoding="async"
  className="hero-image"
/>
```

### Step 3: Self-Hosted Font Preloading
Eliminate font discovery delays by preloading critical `.woff2` files:
```html
<link rel="preload" href="/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin />
```

---

## 2. Cumulative Layout Shift (CLS) Elimination

### Step 1: Reserve Space with `aspect-ratio`
Never render images, embeds, or video containers without defined aspect ratios:
```css
.card-image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: var(--border-subtle);
  overflow: hidden;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Step 2: `font-display: swap`
Always specify `font-display: swap;` in `@font-face` blocks to prevent invisible text while custom fonts load.

---

## 3. Interaction to Next Paint (INP) & Main Thread Efficiency

1. **Zero Runtime CSS Recalculations**: Use static CSS files with CSS variables instead of runtime CSS-in-JS libraries that re-parse styles during user interaction.
2. **Memoized Heavy Computations**: Wrap expensive data transformations (e.g. searching, sorting country codes or item lists) in `useMemo`.
3. **Passive Event Listeners**: When binding scroll or touch handlers, always use `{ passive: true }`.

---

## 4. Cloudflare Pages Caching Headers (`public/_headers`)

Configure immutable caching for static hashed assets and short caching for HTML:
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
```
