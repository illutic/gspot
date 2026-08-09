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

// Vite static glob — path MUST be a string literal.
// `eager: true` means all files are loaded synchronously (no dynamic Promise).
// `query: '?raw'` + `import: 'default'` gives us the raw file string.
const rawFiles = import.meta.glob<string>(
  '../../content/blog/*.md',
  { query: '?raw', import: 'default', eager: true }
);

/**
 * slug → raw markdown string
 * Slug is derived from the filename: "mvi-state-management.md" → "mvi-state-management"
 * Frontmatter `slug` field overrides the filename slug after parsing.
 */
export const POST_MAP: Record<string, string> = {};

const parsedEntries = Object.entries(rawFiles).map(([filePath, raw]) => {
  const fileSlug = filePath.split('/').pop()!.replace('.md', '');
  const meta = parseArticleMeta(raw);
  // Prefer explicit frontmatter slug, fall back to filename
  const slug = meta.slug !== 'article' ? meta.slug : fileSlug;
  POST_MAP[slug] = raw;
  return { ...meta, slug };
});

/** All articles sorted newest-first by date string */
export const allArticles: ArticleMeta[] = parsedEntries.sort((a, b) =>
  new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
);

export const featuredPost: ArticleMeta | undefined =
  allArticles.find((a) => a.featured) ?? allArticles[0];

/** Non-featured posts shown in the list (featured post excluded to avoid duplication) */
export const listPosts: ArticleMeta[] = allArticles.filter(
  (a) => a.slug !== featuredPost?.slug
);

/**
 * Tag filter options derived from the tags actually present in the content.
 * Always includes '#All' as the first option.
 * Adding a new post with a new tag will automatically surface it here.
 */
export const availableTags: string[] = [
  '#All',
  ...Array.from(new Set(allArticles.map((a) => `#${a.tag}`))).sort(),
];
