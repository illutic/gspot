/**
 * parseCareer.ts
 *
 * Pure data-transformation function — no React, no side effects.
 * Converts the raw career.md string into a typed ExperienceItem[].
 */
import {
  EXPERIENCE_FALLBACKS,
  EXPERIENCE_HIGHLIGHT_KEYWORDS,
  EXPERIENCE_METRIC_PATTERNS,
} from '@core/config/siteConfig';
import { parseFrontmatter } from '@core/utils';
import type { MarkdownDocument } from '@core/utils';

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  highlights: string[];
  metrics: Array<{ value: string; label: string }>;
  tags: string[];
  isHighlight: boolean;
}

export interface CareerDocument {
  meta: MarkdownDocument['frontmatter'];
  items: ExperienceItem[];
}

function extractHighlights(lines: string[]): string[] {
  const highlights: string[] = [];
  let inHighlights = false;

  for (const l of lines) {
    if (l.startsWith('**Highlights**:')) {
      inHighlights = true;
      continue;
    }
    if (l.startsWith('**Tags**:') || l.startsWith('**Period**:') || l.startsWith('**Duration**:')) {
      inHighlights = false;
    }
    if (inHighlights && l.trim().startsWith('- ')) {
      highlights.push(l.trim().slice(2));
    }
  }

  return highlights;
}

function extractMetrics(highlights: string[]): Array<{ value: string; label: string }> {
  const seen = new Set<string>();
  const metrics: Array<{ value: string; label: string }> = [];

  for (const h of highlights) {
    for (const { pattern, label } of EXPERIENCE_METRIC_PATTERNS) {
      if (seen.has(label)) continue;
      const match = pattern.exec(h);
      if (match?.groups?.value) {
        metrics.push({ value: match.groups.value, label });
        seen.add(label);
      }
    }
  }

  return metrics;
}

function parseTags(block: string): string[] {
  const tagsMatch = block.match(/\*\*Tags\*\*:\s*\[(.*?)\]/);
  return tagsMatch
    ? tagsMatch[1].split(',').map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
    : [];
}

function parseBlock(block: string, idx: number): ExperienceItem {
  const lines = block.split('\n');

  const role =
    lines.find((l) => l.startsWith('### '))?.slice(4).trim() || EXPERIENCE_FALLBACKS.role;
  const company =
    lines.find((l) => l.startsWith('**Company**:'))?.replace('**Company**:', '').trim() ||
    EXPERIENCE_FALLBACKS.company;
  const location =
    lines.find((l) => l.startsWith('**Location**:'))?.replace('**Location**:', '').trim() || '';
  const period =
    lines.find((l) => l.startsWith('**Period**:'))?.replace('**Period**:', '').trim() || '';
  const duration =
    lines.find((l) => l.startsWith('**Duration**:'))?.replace('**Duration**:', '').trim() || '';

  const tags = parseTags(block);
  const highlights = extractHighlights(lines);
  const metrics = extractMetrics(highlights);

  const isHighlight =
    idx === 0 ||
    highlights.some((h) => EXPERIENCE_HIGHLIGHT_KEYWORDS.some((kw) => h.includes(kw)));

  return { role, company, location, period, duration, highlights, metrics, tags, isHighlight };
}

export function parseCareer(rawMarkdown: string): CareerDocument {
  const { frontmatter, content } = parseFrontmatter(rawMarkdown);
  const blocks = content.split('---').map((b) => b.trim()).filter(Boolean);
  const items = blocks.map(parseBlock);
  return { meta: frontmatter, items };
}

const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseMonthYear(str: string): Date | null {
  const match = str.trim().match(/^([A-Za-z]{3})\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTH_INDEX[match[1]];
  const year = parseInt(match[2], 10);
  if (month === undefined || isNaN(year)) return null;
  return new Date(year, month, 1);
}

/** Derives total years of experience from the earliest job start date to today. */
export function calculateYearsOfExperience(items: ExperienceItem[]): string {
  const startDates = items
    .map((item) => parseMonthYear(item.period.split('-')[0]))
    .filter((d): d is Date => d !== null);

  if (startDates.length === 0) return '0';

  const earliest = new Date(Math.min(...startDates.map((d) => d.getTime())));
  const years = (Date.now() - earliest.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return `${Math.floor(years)}+`;
}
