import React from 'react';

export interface MarkdownDocument<T = Record<string, any>> {
  frontmatter: T;
  content: string;
}

/**
 * Extracts YAML-like frontmatter between triple dashes `---` and returns
 * typed metadata along with the raw markdown body.
 */
export function parseFrontmatter<T = Record<string, any>>(rawMarkdown: string): MarkdownDocument<T> {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = rawMarkdown.match(frontmatterRegex);

  if (!match) {
    return {
      frontmatter: {} as T,
      content: rawMarkdown.trim(),
    };
  }

  const yamlBlock = match[1];
  const content = match[2].trim();
  const frontmatter: Record<string, any> = {};

  yamlBlock.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Handle quotes or arrays
      if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1);
      } else if (value.startsWith('[') && value.endsWith(']')) {
        const arrayItems = value
          .slice(1, -1)
          .split(',')
          .map((item) => item.trim().replace(/^['"]|['"]$/g, ''));
        frontmatter[key] = arrayItems;
        return;
      }
      frontmatter[key] = value;
    }
  });

  return {
    frontmatter: frontmatter as T,
    content,
  };
}

/**
 * Formats inline Markdown styling (bold, italic, code, links).
 */
export function renderInlineMarkdown(text: string): React.ReactNode[] {
  // Simple inline token parsing
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        React.createElement('strong', { key: match.index, style: { fontWeight: 600, color: 'var(--text-main)' } }, token.slice(2, -2))
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(React.createElement('em', { key: match.index, style: { fontStyle: 'italic' } }, token.slice(1, -1)));
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        React.createElement(
          'code',
          {
            key: match.index,
            style: {
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--bg-container-high)',
              padding: '0.15rem 0.4rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-primary-hover)',
            },
          },
          token.slice(1, -1)
        )
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        parts.push(
          React.createElement(
            'a',
            {
              key: match.index,
              href: linkMatch[2],
              target: linkMatch[2].startsWith('http') ? '_blank' : undefined,
              rel: linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined,
              style: { color: 'var(--color-primary)', textDecoration: 'underline', textUnderlineOffset: '4px' },
            },
            linkMatch[1]
          )
        );
      }
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

/**
 * Parses raw Markdown text into structured React elements.
 */
export function parseMarkdownToReact(markdown: string): React.ReactNode[] {
  const lines = markdown.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeLang = '';
  let listItems: string[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      elements.push(
        React.createElement(
          'ul',
          { key: `ul-${key}`, style: { paddingLeft: '1.5rem', marginBottom: '1.5rem', listStyleType: 'disc' } },
          listItems.map((item, i) =>
            React.createElement('li', { key: i, style: { marginBottom: '0.5rem', color: 'var(--text-muted)' } }, renderInlineMarkdown(item))
          )
        )
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    // Handle code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          React.createElement(
            'div',
            {
              key: `code-${index}`,
              className: 'code-block',
              style: {
                backgroundColor: '#000000',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                margin: '2rem 0',
              },
            },
            React.createElement(
              'div',
              {
                style: {
                  backgroundColor: 'var(--bg-surface)',
                  padding: '0.5rem 1rem',
                  display: 'flex',
                  justifyKey: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                },
              },
              React.createElement('span', null, codeLang || 'code')
            ),
            React.createElement(
              'pre',
              {
                style: {
                  padding: '1rem',
                  overflowX: 'auto',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  color: 'var(--text-main)',
                },
              },
              codeBlockLines.join('\n')
            )
          )
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        // Start code block
        flushList(index);
        inCodeBlock = true;
        codeLang = line.trim().slice(3);
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    const trimmed = line.trim();

    if (!trimmed) {
      flushList(index);
      return;
    }

    // Bullet lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList(index);

    // Headings
    if (trimmed.startsWith('# ')) {
      elements.push(
        React.createElement(
          'h1',
          { key: index, style: { fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, margin: '2rem 0 1rem', letterSpacing: '-0.04em' } },
          renderInlineMarkdown(trimmed.slice(2))
        )
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        React.createElement(
          'h2',
          { key: index, id: trimmed.slice(3).toLowerCase().replace(/[^\w]+/g, '-'), style: { fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, margin: '2rem 0 1rem', letterSpacing: '-0.02em' } },
          renderInlineMarkdown(trimmed.slice(3))
        )
      );
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        React.createElement(
          'h3',
          { key: index, id: trimmed.slice(4).toLowerCase().replace(/[^\w]+/g, '-'), style: { fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, margin: '1.5rem 0 0.75rem', letterSpacing: '-0.01em' } },
          renderInlineMarkdown(trimmed.slice(4))
        )
      );
    } else if (trimmed.startsWith('> ')) {
      elements.push(
        React.createElement(
          'blockquote',
          {
            key: index,
            style: {
              borderLeft: '4px solid var(--color-primary)',
              paddingLeft: '1.5rem',
              margin: '1.5rem 0',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
            },
          },
          renderInlineMarkdown(trimmed.slice(2))
        )
      );
    } else {
      elements.push(
        React.createElement(
          'p',
          { key: index, style: { marginBottom: '1.25rem', color: 'var(--text-main)', fontSize: '1.125rem', lineHeight: 1.6 } },
          renderInlineMarkdown(trimmed)
        )
      );
    }
  });

  flushList(lines.length);

  return elements;
}
