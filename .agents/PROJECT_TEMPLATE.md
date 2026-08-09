# New Website Project Template & Scaffolding Blueprint

A step-by-step implementation guide to scaffold, develop, and launch an architecturally sound, high-performance website based on the **Gradle-Inspired Lightweight Modular Architecture**.

---

## Phase 1: Project Initialization

### 1. Initialize Vite + React + TypeScript
```bash
npm create vite@latest ./ -- --template react-ts
npm install
```

### 2. Install Standard Tooling & Dependencies
```bash
# Modern fast linter
npm install -D oxlint

# Typography / Fonts (Self-hosted local fonts)
npm install @fontsource/inter @fontsource/playfair-display @fontsource/jetbrains-mono

# Optional: Cloudflare CLI for edge development
npm install -D wrangler @cloudflare/workers-types
```

### 3. Configure Path Aliases in `tsconfig.app.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"],
      "@core/*": ["src/core/*"],
      "@features/*": ["src/features/*"]
    }
  },
  "include": ["src"]
}
```

### 4. Configure `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@core': path.resolve(__dirname, './src/core'),
      '@features': path.resolve(__dirname, './src/features'),
    },
  },
});
```

---

## Phase 2: Core Foundation Modules (`src/core/`)

Create the shared core modules with strict public `index.ts` exports:

### 1. `@core/ui` (Design Tokens & Shared Primitives)
- `src/core/ui/tokens.css`: Semantic CSS custom properties (`:root`, `[data-theme="light"]`, `[data-theme="dark"]`).
- `src/core/ui/Button.tsx` / `Button.css`: Reusable UI button.
- `src/core/ui/Card.tsx` / `Card.css`: Reusable UI card.
- `src/core/ui/index.ts`:
  ```typescript
  import './tokens.css';
  export * from './Button';
  export * from './Card';
  ```

### 2. `@core/theme` (Theme Engine)
- `src/core/theme/ThemeContext.tsx`: Dark/Light mode provider with OS detection.
- `src/core/theme/index.ts`:
  ```typescript
  export { ThemeProvider, useTheme } from './ThemeContext';
  ```

### 3. `@core/i18n` (Type-Safe Localization)
- `src/core/i18n/siteCopy.ts`: Type-safe copy tree with `copyEL: typeof copyEN`.
- `src/core/i18n/LanguageContext.tsx`: Zero-dependency provider.
- `src/core/i18n/index.ts`:
  ```typescript
  export { LanguageProvider, useLanguage } from './LanguageContext';
  export { getCopy, SITE_COPY } from './siteCopy';
  export type { Language } from './siteCopy';
  ```

---

## Phase 3: Autonomous Feature Modules (`src/features/`)

Build each feature as an autonomous folder with its own components, styles, data, and public `index.ts`:

```
src/features/
├── home/
│   ├── components/      # Internal sub-components
│   ├── Home.tsx
│   ├── Home.css
│   ├── Home.test.tsx
│   └── index.ts         # export { Home } from './Home';
│
├── about/
│   ├── About.tsx
│   ├── About.css
│   └── index.ts         # export { About } from './About';
│
└── contact/
    ├── Contact.tsx
    ├── Contact.css
    └── index.ts         # export { Contact } from './Contact';
```

---

## Phase 4: App Orchestration (`src/app/`)

Assemble features and providers in `src/app/`:

### 1. Navigation Mapping (`src/app/routes.ts`)
```typescript
export interface RouteDef {
  id: string;
  path: string;
  labelKey: string;
}

export const ROUTES: RouteDef[] = [
  { id: 'home', path: '/', labelKey: 'home' },
  { id: 'about', path: '/about', labelKey: 'about' },
  { id: 'contact', path: '/contact', labelKey: 'contact' },
];
```

### 2. App Shell (`src/app/App.tsx`)
```tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@core/theme';
import { LanguageProvider } from '@core/i18n';
import { Home } from '@features/home';
import { About } from '@features/about';
import { Contact } from '@features/contact';
import './App.css';

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
```

---

## Phase 5: SEO, LLM Discovery & Public Assets

1. **`public/_redirects`**: `/* /index.html 200`
2. **`public/_headers`**: Security headers & caching policies.
3. **`public/robots.txt`** & **`public/sitemap.xml`**.
4. **`public/llms.txt`**: AI crawler manifest.
5. **`index.html`**:
   - Preload hero LCP image with `fetchpriority="high"`.
   - Preload local `.woff2` fonts.
   - Embed JSON-LD structured data.

---

## Phase 6: Pre-Launch Quality Audit Checklist

- [ ] `npm run build` succeeds with zero errors.
- [ ] `npm run lint` (`oxlint`) passes cleanly.
- [ ] `npm run typecheck` passes with zero errors.
- [ ] No feature imports internal files from another feature (all cross-module imports use `@features/<name>` or `@core/<name>`).
- [ ] Mobile responsive layout tested on 375px, 768px, 1024px, and 1440px viewports.
- [ ] Modals and mobile drawers trap focus and close on `Escape`.
- [ ] Touch targets on interactive elements are at least 44px × 44px.
- [ ] Hero image has `fetchpriority="high"` and responsive `srcset`.
- [ ] Dark/Light theme transitions smoothly without theme flicker.
