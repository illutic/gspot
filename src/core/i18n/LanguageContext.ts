import { createContext } from 'react';
import type { Language, SiteCopy } from './siteCopy';

export interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  copy: SiteCopy;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
