---
name: Kinetic Engineering
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#c6c6cf'
  on-secondary: '#2f3037'
  secondary-container: '#45464e'
  on-secondary-container: '#b4b4bd'
  tertiary: '#ffb3af'
  on-tertiary: '#650911'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#e2e1eb'
  secondary-fixed-dim: '#c6c6cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#45464e'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

This design system is engineered for a high-performance Senior Android Engineer portfolio. It prioritizes technical precision, clarity, and a "developer-first" aesthetic. 

The style is **Modern-Minimalist with a Technical Edge**, utilizing high-contrast accents against deep surfaces to create a sense of depth and focus. It draws inspiration from IDE environments and premium hardware interfaces, utilizing "glow" effects and monospaced accents to signal expertise in mobile architecture and performance optimization. The emotional response should be one of reliability, sophisticated technical skill, and modern craftsmanship.

## Colors

The palette is anchored in a deep, monochromatic base to allow technical content to oscillate between visibility and subtlety.

- **Background (#09090b):** The foundational layer, providing maximum contrast for text and emerald highlights.
- **Surface (#18181b):** Used for cards, containers, and code blocks to create subtle elevation without traditional shadows.
- **Primary / Accent (#10b981):** A vibrant Emerald used sparingly for critical actions, active states, and focus indicators.
- **Text (High-Emphasis):** Pure White (#ffffff) for all headlines and primary data.
- **Text (Medium-Emphasis):** Zinc (#a1a1aa) for body copy, descriptions, and metadata to reduce visual noise.

## Typography

The typography system balances the brutalist efficiency of engineering with the refinement of modern product design.

- **Geist (Headings):** Set with tight tracking and heavy weights. It provides a geometric, authoritative feel.
- **Inter (Body):** Chosen for its exceptional legibility at small sizes, particularly on high-density mobile screens.
- **JetBrains Mono (Technical):** Used for code snippets, badges, and performance metrics. This signals a deep connection to the Android development ecosystem (Kotlin/IntelliJ).

Avoid using italics in technical labels. Use uppercase sparingly, primarily for small technical badges.

## Layout & Spacing

This design system uses a **Fluid-Fixed hybrid grid**. The layout remains fluid up to a maximum width of 1200px.

- **Grid:** A 12-column grid is used for desktop layouts, collapsing to 1 column for mobile.
- **Spacing Rhythm:** Based on a 4px baseline. Use 16px (4 units) for standard padding and 32px (8 units) for major component separation.
- **Vertical Rhythm:** Generous section gaps (80px+) are encouraged to allow high-impact project screenshots and code blocks room to breathe.
- **Mobile:** Margins shrink to 16px. Typography scales down specifically for the `headline-xl` role to ensure hero sections remain impactful without excessive scrolling.

## Elevation & Depth

In this dark-mode environment, depth is communicated through **Tonal Layering and Inner Glows** rather than drop shadows.

- **Tiers:** 
  - Level 0: Deep Zinc (#09090b) - Main background.
  - Level 1: Darker Zinc (#18181b) - Cards, headers, and navigation rails.
  - Level 2: Zinc-800 (#27272a) - Hover states and inner code blocks.
- **Borders:** Every card and container should feature a subtle 1px border (#27272a). 
- **The "Active" Glow:** Elements in an active or hovered state should transition their border color to the primary Emerald (#10b981) and apply a subtle 8px-12px outer glow (box-shadow: 0 0 15px rgba(16, 185, 129, 0.2)).

## Shapes

The shape language is **Soft (0.25rem)**, reflecting the precision of a professional engineer. 

- **Containers:** 4px (0.25rem) is the standard for cards and inputs.
- **Interactive Elements:** Buttons use a slightly more pronounced 8px (0.5rem) radius to differentiate them from purely structural elements.
- **Media:** Android device frames should retain their native hardware corner radius (approx 32px) but be nested within the design system's standard containers.

## Components

### Buttons & Actions
- **Primary:** Filled Emerald (#10b981) with Black text. On hover, add a subtle emerald glow.
- **Secondary:** Ghost style with a Zinc-800 border and White text. Emerald border on hover.
- **Tertiary:** Monospaced text with an underline on hover.

### Technical Badges (Chips)
- Small, 12px JetBrains Mono text.
- Dark Zinc background with a 1px Zinc-800 border.
- Used for tech stack tags (e.g., "Dagger/Hilt", "Coroutines").

### Code Terminal Blocks
- Background: Black (#000000).
- Header: A thin bar with three subtle gray dots (mimicking window controls).
- Content: Monospaced font with syntax highlighting using the Emerald accent for keywords.

### Metric Callouts
- Large White Geist numbers for "0.1% Crash Rate" or "40% Faster Build".
- Small, muted mono labels beneath the value.
- Bordered by a subtle emerald left-accent line.

### Project Cards
- 1px border (#27272a).
- Transitions to an Emerald border and subtle glow on hover.
- High-contrast images (Android device frames) should bleed to the edge or be centered with significant padding.