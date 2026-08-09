/**
 * parseBlog.ts
 *
 * Pure data-transformation functions — no React, no side effects.
 * Converts raw blog post markdown strings into typed ArticleMeta objects.
 */
import { parseFrontmatter } from '@core/utils';

export interface ArticleMeta {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tag: string;
  author: string;
  featured: boolean;
  image?: string;
  contentSnippet: string;
}

export interface ArticleContent {
  meta: ArticleMeta;
  headings: Array<{ text: string; anchor: string }>;
  body: string;
}

export function parseArticleMeta(raw: string): ArticleMeta {
  const { frontmatter, content } = parseFrontmatter(raw);
  return {
    slug: frontmatter.slug ?? 'article',
    title: frontmatter.title ?? 'Untitled Article',
    subtitle: frontmatter.subtitle ?? '',
    date: frontmatter.date ?? '',
    readTime: frontmatter.readTime ?? '5 min read',
    tag: frontmatter.tag ?? 'Android',
    author: frontmatter.author ?? '',
    featured: Boolean(frontmatter.featured),
    image: frontmatter.image,
    contentSnippet: content.slice(0, 160) + '…',
  };
}

export function parseArticleContent(raw: string): ArticleContent {
  const { frontmatter, content } = parseFrontmatter(raw);

  const headings = content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.slice(3).trim();
      return { text, anchor: text.toLowerCase().replace(/[^\w]+/g, '-') };
    });

  return {
    meta: {
      slug: frontmatter.slug ?? 'article',
      title: frontmatter.title ?? 'Untitled',
      subtitle: frontmatter.subtitle ?? '',
      date: frontmatter.date ?? '',
      readTime: frontmatter.readTime ?? '5 min read',
      tag: frontmatter.tag ?? 'Android',
      author: frontmatter.author ?? '',
      featured: Boolean(frontmatter.featured),
      image: frontmatter.image,
      contentSnippet: content.slice(0, 160) + '…',
    },
    headings,
    body: content,
  };
}

export function filterArticles(
  articles: ArticleMeta[],
  searchQuery: string,
  activeTag: string
): ArticleMeta[] {
  const q = searchQuery.toLowerCase();
  return articles.filter((art) => {
    const matchesSearch =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.subtitle.toLowerCase().includes(q) ||
      art.tag.toLowerCase().includes(q);

    const matchesTag =
      activeTag === '#All' ||
      art.tag.toLowerCase() === activeTag.replace('#', '').toLowerCase();

    return matchesSearch && matchesTag;
  });
}
