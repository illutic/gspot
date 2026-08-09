import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@core/ui';
import { parseMarkdownToReact } from '@core/utils';
import { OWNER } from '@core/config/siteConfig';
import { parseArticleContent } from './parseBlog';
import { POST_MAP } from './blogRegistry';
import './BlogArticle.css';

export const BlogArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const firstSlug = Object.keys(POST_MAP)[0] ?? '';
  const raw = POST_MAP[slug ?? firstSlug] ?? POST_MAP[firstSlug] ?? '';

  if (!raw) {
    return (
      <div className="blog-article-page">
        <main className="container article-layout">
          <p className="font-label-mono" style={{ padding: '4rem 0', color: 'var(--text-muted)' }}>
            Article not found.{' '}
            <Link to="/blog" className="back-link">← Back to Blog</Link>
          </p>
        </main>
      </div>
    );
  }

  const { meta, headings, body } = parseArticleContent(raw);

  return (
    <div className="blog-article-page">
      <main className="container article-layout">
        {/* Sticky Table of Contents Sidebar */}
        <aside className="article-toc-sidebar">
          <div className="toc-card">
            <h4 className="toc-title font-label-mono">Table of Contents</h4>
            <ul className="toc-list">
              {headings.map(({ text, anchor }) => (
                <li key={anchor}>
                  <a href={`#${anchor}`} className="toc-link">{text}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Article Core Content */}
        <article className="article-content font-body-md">
          <header className="article-header">
            <div className="article-header-meta">
              <Badge variant="primary">#{meta.tag}</Badge>
              <span className="font-label-mono read-time font-size-sm">⏱ {meta.readTime}</span>
            </div>

            <h1 className="article-main-title">{meta.title}</h1>

            <div className="author-bar">
              <div>
                <div className="author-name font-headline-md">{meta.author || OWNER.name}</div>
                <div className="author-date font-label-mono">{meta.date}</div>
              </div>
            </div>
          </header>

          <div className="article-body">{parseMarkdownToReact(body)}</div>

          <div className="back-bar">
            <Link to="/blog" className="font-label-mono back-link">
              ← Back to Technical Dispatch
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogArticle;
