import enJson from './locales/en.json';
import elJson from './locales/el.json';

export type Language = 'en' | 'el';
export type SiteCopy = typeof enJson;

export const copyEN: SiteCopy = enJson;
export const copyEL: SiteCopy = elJson;

export const SITE_COPY: Record<Language, SiteCopy> = {
  en: copyEN,
  el: copyEL,
};

export function getCopy(lang: Language): SiteCopy {
  return SITE_COPY[lang] || copyEN;
}
