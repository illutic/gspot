---
name: type-safe-i18n-theming
description: |
  Implements zero-dependency type-safe localization (i18n) and smooth Dark/Light mode theming in React applications. Use this skill when adding multilingual support, creating bilingual copy trees with compile-time key parity, or building a flicker-free dark mode theme provider.
---

# Type-Safe i18n & Theming Skill

This skill provides implementation patterns for zero-dependency multilingual localization and Dark/Light mode theming.

## 1. Type-Safe Localization Architecture

### Step 1: Define the Base Copy Tree & Localized Trees
In `src/content/siteCopy.ts`:
```typescript
export type Language = 'en' | 'el' | 'it';

export const copyEN = {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
  },
  hero: {
    title: 'Modern Web Engineering',
    subtitle: 'High-performance, accessible, and beautifully designed web platforms.',
    cta: 'Get Started',
  },
};

// TypeScript enforces that every single key in copyEN MUST exist in copyEL with identical types
export const copyEL: typeof copyEN = {
  nav: {
    home: 'Αρχική',
    about: 'Σχετικά',
    services: 'Υπηρεσίες',
    contact: 'Επικοινωνία',
  },
  hero: {
    title: 'Σύγχρονη Μηχανική Ιστού',
    subtitle: 'Πλατφόρμες υψηλής απόδοσης, προσβασιμότητας και αισθητικής.',
    cta: 'Ξεκινήστε',
  },
};

export const SITE_COPY: Record<Language, typeof copyEN> = {
  en: copyEN,
  el: copyEL,
  it: copyEN, // Fallback if adding new languages
};

export function getCopy(lang: Language): typeof copyEN {
  return SITE_COPY[lang] || copyEN;
}
```

### Step 2: LanguageProvider Context Implementation
In `src/context/LanguageContext.tsx`:
```tsx
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Language } from '../content/siteCopy';
import { getCopy, copyEN } from '../content/siteCopy';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  copy: typeof copyEN;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const STORAGE_KEY = 'app_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && (saved === 'en' || saved === 'el' || saved === 'it')) return saved;
    if (typeof navigator !== 'undefined' && navigator.language.startsWith('el')) return 'el';
    if (typeof navigator !== 'undefined' && navigator.language.startsWith('it')) return 'it';
    return 'en';
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const copy = useMemo(() => getCopy(lang), [lang]);
  const contextValue = useMemo(() => ({ lang, setLang, copy }), [lang, setLang, copy]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
```

---

## 2. Dark & Light Mode ThemeProvider

In `src/context/ThemeContext.tsx`:
```tsx
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const STORAGE_KEY = 'app_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
```
