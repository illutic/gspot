/**
 * parseProjects.ts
 *
 * Pure data-transformation function — no React, no side effects.
 * Converts the raw projects.md string into a typed ProjectItem[].
 */
import { parseFrontmatter } from '@core/utils';
import { PROJECT_DEFAULT_IMAGES } from '@core/config/siteConfig';
import type { MarkdownDocument } from '@core/utils';

export interface ProjectItem {
  title: string;
  category: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  metrics?: string;
  description: string;
  image?: string;
}

export interface ProjectsDocument {
  meta: MarkdownDocument['frontmatter'];
  items: ProjectItem[];
}

const META_PREFIXES = ['### ', '**Category**:', '**GithubUrl**:', '**DemoUrl**:', '**Stars**:', '**Metrics**:', '**Tags**:', '**Image**:'];

function parseTags(block: string): string[] {
  const tagsMatch = block.match(/\*\*Tags\*\*:\s*\[(.*?)\]/);
  return tagsMatch
    ? tagsMatch[1].split(',').map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
    : [];
}

function parseBlock(block: string, idx: number): ProjectItem {
  const lines = block.split('\n');

  const title = lines.find((l) => l.startsWith('### '))?.slice(4).trim() || 'Project';
  const category =
    lines.find((l) => l.startsWith('**Category**:'))?.replace('**Category**:', '').trim() || 'Android';
  const githubUrl =
    lines.find((l) => l.startsWith('**GithubUrl**:'))?.replace('**GithubUrl**:', '').trim();
  const demoUrl =
    lines.find((l) => l.startsWith('**DemoUrl**:'))?.replace('**DemoUrl**:', '').trim();
  const metrics =
    lines.find((l) => l.startsWith('**Metrics**:'))?.replace('**Metrics**:', '').trim();
  const rawImage =
    lines.find((l) => l.startsWith('**Image**:'))?.replace('**Image**:', '').trim();

  const tags = parseTags(block);

  const description = lines
    .filter((l) => !META_PREFIXES.some((prefix) => l.startsWith(prefix)))
    .join(' ')
    .trim();

  const image = rawImage || (PROJECT_DEFAULT_IMAGES.length > 0 ? (PROJECT_DEFAULT_IMAGES[idx % PROJECT_DEFAULT_IMAGES.length] as string) : undefined);

  return {
    title,
    category,
    tags,
    githubUrl,
    demoUrl,
    metrics,
    description,
    image,
  };
}

export function parseProjects(rawMarkdown: string): ProjectsDocument {
  const { frontmatter, content } = parseFrontmatter(rawMarkdown);
  const blocks = content.split('---').map((b) => b.trim()).filter(Boolean);
  const items = blocks.map(parseBlock);
  return { meta: frontmatter, items };
}

export function filterProjects(items: ProjectItem[], activeTag: string): ProjectItem[] {
  if (activeTag === '#All') return items;
  const cleanTag = activeTag.replace('#', '').toLowerCase();
  return items.filter(
    (p) =>
      p.category.toLowerCase().includes(cleanTag) ||
      p.tags.some((t) => t.toLowerCase().includes(cleanTag))
  );
}

/**
 * Derives the tag filter list from the categories and tags
 * actually present in the project items.
 * Always includes '#All' as the first option.
 */
export function getProjectTags(items: ProjectItem[]): string[] {
  const tags = new Set<string>();
  for (const item of items) {
    tags.add(`#${item.category}`);
    for (const t of item.tags) tags.add(`#${t}`);
  }
  return ['#All', ...Array.from(tags).sort()];
}

const MOBILE_CATEGORIES = new Set(['android', 'crossplatform']);

/** Counts shipped mobile apps (Android + Crossplatform projects). */
export function calculateAppsShipped(items: ProjectItem[]): string {
  return String(items.filter((p) => MOBILE_CATEGORIES.has(p.category.toLowerCase())).length);
}
