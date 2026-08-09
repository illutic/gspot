/**
 * blogRegistry.ts
 *
 * Single source of truth for all blog posts.
 * Uses Vite's import.meta.glob to eagerly discover every .md file
 * inside src/content/blog/ at build time.
 *
 * To add a new post: just drop a .md file in src/content/blog/.
 * No imports or registrations needed anywhere else.
 */
import { parseArticleMeta } from './parseBlog';
import type { ArticleMeta } from './parseBlog';
import type { Language } from '@core/i18n';

// Vite static glob — path MUST be a string literal.
// `eager: true` means all files are loaded synchronously (no dynamic Promise).
// `query: '?raw'` + `import: 'default'` gives us the raw file string.
const rawFilesEN = import.meta.glob<string>(
  '../../content/blog/*.md',
  { query: '?raw', import: 'default', eager: true }
);

const rawFilesEL = import.meta.glob<string>(
  '../../content/blog/el/*.md',
  { query: '?raw', import: 'default', eager: true }
);

/**
 * slug → raw markdown string (per language)
 * Slug is derived from the filename: "mvi-state-management.md" → "mvi-state-management"
 * Frontmatter `slug` field overrides the filename slug after parsing.
 */
export const POST_MAP_EN: Record<string, string> = {};
export const POST_MAP_EL: Record<string, string> = {};

const parsedEntriesEN = Object.entries(rawFilesEN).map(([filePath, raw]) => {
  const fileSlug = filePath.split('/').pop()!.replace('.md', '');
  const meta = parseArticleMeta(raw);
  const slug = meta.slug !== 'article' ? meta.slug : fileSlug;
  POST_MAP_EN[slug] = raw;
  return { ...meta, slug };
});

const parsedEntriesEL = Object.entries(rawFilesEL).map(([filePath, raw]) => {
  const fileSlug = filePath.split('/').pop()!.replace('.md', '');
  const meta = parseArticleMeta(raw);
  const slug = meta.slug !== 'article' ? meta.slug : fileSlug;
  POST_MAP_EL[slug] = raw;
  return { ...meta, slug };
});

/** Backward-compatible alias */
export const POST_MAP = POST_MAP_EN;

/** All EN articles sorted newest-first */
const allArticlesEN: ArticleMeta[] = parsedEntriesEN.sort((a, b) =>
  new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
);

/** All EL articles sorted newest-first; falls back to EN entry if no EL version exists */
const allArticlesEL: ArticleMeta[] = allArticlesEN.map((enMeta) => {
  const elEntry = parsedEntriesEL.find((e) => e.slug === enMeta.slug);
  return elEntry ?? enMeta;
});

export function getPostMap(lang: Language): Record<string, string> {
  return lang === 'el' ? POST_MAP_EL : POST_MAP_EN;
}

export function getArticles(lang: Language): ArticleMeta[] {
  return lang === 'el' ? allArticlesEL : allArticlesEN;
}

export function getFeaturedPost(lang: Language): ArticleMeta | undefined {
  const articles = getArticles(lang);
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getListPosts(lang: Language): ArticleMeta[] {
  const featured = getFeaturedPost(lang);
  return getArticles(lang).filter((a) => a.slug !== featured?.slug);
}

/** Backward-compatible exports (EN) */
export const allArticles = allArticlesEN;
export const featuredPost = getFeaturedPost('en');
export const listPosts = getListPosts('en');

/**
 * Tag filter options derived from EN tags (tags are language-neutral technical terms).
 * Always includes '#All' as the first option.
 */
export const availableTags: string[] = [
  '#All',
  ...Array.from(new Set(allArticlesEN.map((a) => `#${a.tag}`))).sort(),
];
