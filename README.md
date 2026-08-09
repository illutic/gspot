# ⚡ GSpot — Senior Android Developer Portfolio & Technical Hub

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff.svg)](https://vitejs.dev/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployed-f38020.svg)](https://pages.cloudflare.com/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-ff69b4.svg)](https://oxc.rs/)

A modern, ultra-high performance personal portfolio and technical blog built for **George Sigalas** (Senior Android Developer). Engineered using **React 19**, **TypeScript**, and **Vanilla CSS Design Tokens**, adhering to a **Gradle-inspired Lightweight Modular Architecture**.

---

## ✨ Features & Architecture Highlights

- 🧩 **Gradle-Inspired Modular Architecture**: Decoupled into `@core`, `@features`, and `@app` with strict barrel export boundaries and unidirectional dependency flow.
- ⚡ **Strict View / Logic Separation**: Pure TypeScript data transformers (`parseCareer.ts`, `parseProjects.ts`, `parseBlog.ts`, `parseHero.ts`) separated from presentation components (`.tsx`).
- 📝 **Dynamic Markdown Content Engine**: Automatic build-time discovery of blog articles using Vite's `import.meta.glob`. Simply drop a `.md` file in `src/content/blog/` to publish.
- 🌐 **Zero-Dependency Type-Safe i18n**: Compile-time verified copy trees supporting English (`en`) and Greek (`el`) with flicker-free dark/light mode theming.
- 🎨 **Kinetic Design Token System**: Zero-runtime-overhead CSS custom properties (`tokens.css`) featuring responsive layouts, glassmorphic headers, glow states, and mobile S optimizations.
- 🔒 **Edge Security & Anti-Bot Defense**: Cloudflare Pages Functions (`/api/contact`) featuring honeypots and timing-gate defenses.

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Core Framework** | React 19 + TypeScript (Strict Mode) |
| **Build & Dev Tooling** | Vite 6 + `@vitejs/plugin-react` |
| **Styling** | Vanilla CSS Tokens (`var(--...)`) — Zero runtime CSS-in-JS |
| **Linting & Quality** | Oxlint (`oxlint`) + TypeScript `tsc --noEmit` |
| **Testing** | Vitest + React Testing Library |
| **Hosting & Edge** | Cloudflare Pages + Pages Functions |

---

## 📂 Codebase Structure

```
gspot/
├── src/
│   ├── app/                      # Application Shell, Router & Routing Table
│   ├── core/                     # Autonomous Foundation Modules
│   │   ├── config/               # Centralized siteConfig.ts (URLs, Owner metadata, fallbacks)
│   │   ├── i18n/                 # Zero-dependency compile-time i18n engine
│   │   ├── theme/                # Dark/Light theme provider & hooks
│   │   ├── ui/                   # Design tokens, atomic UI primitives (Badge, Card, CodeTerminal)
│   │   └── utils/                # Markdown parser, inline renderer, navigation helpers
│   ├── content/                  # Pure Markdown content store
│   │   ├── blog/                 # Blog post markdown files (auto-discovered)
│   │   ├── experience/           # career.md
│   │   ├── home/                 # hero.md
│   │   └── projects/             # projects.md
│   ├── features/                 # Autonomous Feature Domain Modules
│   │   ├── blog/                 # blogRegistry.ts, parseBlog.ts, BlogIndex.tsx, BlogArticle.tsx
│   │   ├── contact/              # Contact.tsx (Terminal JSON + API Form)
│   │   ├── experience/           # parseCareer.ts, Experience.tsx (Timeline + Markdown rendering)
│   │   ├── home/                 # parseHero.ts, Home.tsx (Hero split layout + Device mockup)
│   │   └── projects/             # parseProjects.ts, Projects.tsx (Cards + Action buttons)
│   └── main.tsx                  # App entry point
├── functions/api/                # Cloudflare Pages serverless edge routes
├── public/                       # Static assets (_redirects, _headers, llms.txt, favicon)
└── .agents/                      # Architectural guidelines & agent skills
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20+` or `v22+`
- **npm**: `v10+`

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/illutic/gspot.git
cd gspot

# Install dependencies
npm install

# Start Vite local development server
npm run dev
```

---

## 📜 Standard Development Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Starts local Vite development server |
| `npm run build` | Production build (`tsc -b && vite build`) |
| `npm run typecheck` | Strict TypeScript check across client, server, and node configs |
| `npm run lint` | High-speed linting using `oxlint` |
| `npm run pages:dev` | Emulate full Cloudflare Pages stack locally (`wrangler pages dev dist`) |

---

## ✍️ Content Management

### Adding a Blog Post
Add a `.md` file to `src/content/blog/`:

```markdown
---
slug: my-new-article
title: Building Scalable Android Architectures
subtitle: Best practices for Jetpack Compose and MVI in production.
date: 2026-08-09
readTime: 6 min read
tag: Android
author: George Sigalas
featured: false
---

## Introduction

Your markdown content here...
```
*The post and tag filters will be automatically discovered at build time!*

---

## 👤 Author

**George Sigalas** — Senior Android Developer  
📍 Portsmouth, UK  
🌐 [LinkedIn](https://www.linkedin.com/in/g-sigalas/) • 💻 [GitHub](https://github.com/illutic)
