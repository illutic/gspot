import type { Language } from '@core/i18n';

export interface NavItem {
  id: string;
  label: string;
  path: string;
}

export const NAV_ITEMS_EN: NavItem[] = [
  { id: 'experience', label: 'Experience', path: '/experience' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'blog', label: 'Blog', path: '/blog' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

export const NAV_ITEMS_EL: NavItem[] = [
  { id: 'experience', label: 'Εμπειρία', path: '/experience' },
  { id: 'projects', label: 'Έργα', path: '/projects' },
  { id: 'blog', label: 'Άρθρα', path: '/blog' },
  { id: 'contact', label: 'Επικοινωνία', path: '/contact' },
];

export const getNavItems = (lang: Language): NavItem[] =>
  lang === 'el' ? NAV_ITEMS_EL : NAV_ITEMS_EN;
