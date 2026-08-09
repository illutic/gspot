---
name: web-architecture-scaffold
description: |
  Scaffolds and architectures modern, high-performance React + TypeScript websites using a Gradle-inspired Lightweight Modular Architecture with strict path aliases (@core, @features, @app), public barrel exports, Vite, Oxlint, and Vanilla CSS design tokens. Use this skill when initializing a new website project, restructuring a frontend codebase, or setting up modular design systems and routing.
---

# Web Architecture & Scaffolding Skill (Modular Monolith)

This skill provides instructions for scaffolding and structuring a modern, production-grade website adhering to a **Gradle-inspired Modular Monolith architecture**, zero-runtime styling, feature-first autonomy, strict TypeScript, and modern web standards.

## 1. Project Initialization Workflow

### Step 1: Vite + React 19 + TypeScript Setup
```bash
npm create vite@latest ./ -- --template react-ts
npm install
```

### Step 2: Install Core Tooling & Local Fonts
```bash
# Linter (ultra-fast oxlint)
npm install -D oxlint

# Local typography (zero 3rd-party CDN requests)
npm install @fontsource/inter @fontsource/playfair-display @fontsource/jetbrains-mono
```

### Step 3: Configure Path Aliases in `tsconfig.app.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"],
      "@core/*": ["src/core/*"],
      "@features/*": ["src/features/*"]
    }
  }
}
```

### Step 4: Configure `vite.config.ts`
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

## 2. Directory Layout & Module Hierarchy

```
src/
├── app/                     # Orchestrator & App Shell
│   ├── App.tsx              # Routes & Global Providers
│   ├── routes.ts            # Route table
│   └── testUtils.tsx        # Test helpers
│
├── core/                    # Autonomous Foundation Modules (Zero feature logic)
│   ├── ui/                  # Design tokens & atomic primitives (Button, Card, Modal)
│   │   ├── tokens.css
│   │   └── index.ts         # Public API contract (@core/ui)
│   ├── theme/               # Dark/Light theme engine
│   │   └── index.ts         # Public API contract (@core/theme)
│   ├── i18n/                # Type-safe compile-time localization
│   │   └── index.ts         # Public API contract (@core/i18n)
│   └── api/                 # Edge fetch clients, DoH validation
│       └── index.ts         # Public API contract (@core/api)
│
├── features/                # Autonomous Domain Feature Modules
│   ├── home/                # Home module
│   │   ├── components/      # Private internals
│   │   ├── Home.tsx
│   │   └── index.ts         # Public API contract (@features/home)
│   ├── about/
│   │   └── index.ts         # Public API contract (@features/about)
│   └── contact/
│       └── index.ts         # Public API contract (@features/contact)
│
└── main.tsx                 # Application Entry Point
```

---

## 3. Strict Boundary Rules

1. **Public API Exports (Barrels)**: External callers must only import from `@features/<name>` or `@core/<name>`. Deep imports into internal files (`@features/home/components/SubHero`) are forbidden.
2. **Unidirectional Dependency Graph**:
   - `app` -> `features` -> `core`
   - Features do NOT depend on sibling features.
   - Core modules do NOT depend on features.
