import React, { useState, useEffect, type ReactNode } from 'react';
import { SITE_COPY, type Language } from './siteCopy';
import { LanguageContext } from './LanguageContext';

const LANG_STORAGE_KEY = 'app_language';

const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
    if (saved === 'en' || saved === 'el') {
      return saved;
    }
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === 'el') return 'el';
  }
  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, copy: SITE_COPY[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};
