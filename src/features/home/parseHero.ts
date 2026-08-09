/**
 * parseHero.ts
 *
 * Pure data-transformation function — no React, no side effects.
 * Converts the raw hero.md string into a typed HeroData object.
 */
import { parseFrontmatter } from '@core/utils';
import { HERO_FALLBACKS } from '@core/config/siteConfig';

export interface HeroData {
  title: string;
  subtitle: string;
  statusText: string;
  yearsExp: string;
  appsShipped: string;
  recognition: string;
  badges: string[];
  snippetTitle: string;
  snippetCode: string;
}

interface HeroFrontmatter {
  title?: string;
  subtitle?: string;
  yearsExp?: string;
  appsShipped?: string;
  recognition?: string;
  badges?: string[];
  snippetTitle?: string;
  snippetCode?: string;
}

export function parseHero(rawMarkdown: string): HeroData {
  const { frontmatter, content } = parseFrontmatter<HeroFrontmatter>(rawMarkdown);

  return {
    title: frontmatter.title ?? '',
    subtitle: frontmatter.subtitle ?? '',
    statusText: content.trim(),
    yearsExp: frontmatter.yearsExp ?? HERO_FALLBACKS.yearsExp,
    appsShipped: frontmatter.appsShipped ?? HERO_FALLBACKS.appsShipped,
    recognition: frontmatter.recognition ?? HERO_FALLBACKS.recognition,
    badges: (frontmatter.badges ?? HERO_FALLBACKS.badges) as string[],
    snippetTitle: frontmatter.snippetTitle ?? HERO_FALLBACKS.snippetTitle,
    snippetCode: frontmatter.snippetCode ?? HERO_FALLBACKS.snippetCode,
  };
}
