import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@core/ui';
import { useLanguage } from '@core/i18n';
import { filterArticles } from './parseBlog';
import { getFeaturedPost, getListPosts, availableTags } from './blogRegistry';
import './BlogIndex.css';

export const BlogIndex: React.FC = () => {
  const { lang, copy } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('#All');

  const featuredPost = getFeaturedPost(lang);
  const listPosts = getListPosts(lang);
  const filtered = filterArticles(listPosts, searchQuery, activeTag);

  return (
    <div className="blog-index-page">
      <main className="container blog-container">
        {/* Header & Search */}
        <header className="blog-header">
          <h1 className="blog-title">{copy.blog.title}</h1>
          <p className="blog-subtitle">{copy.blog.subtitle}</p>

          <div className="search-box-wrapper glow-active">
            <input
              type="text"
              className="search-input font-body-md"
              placeholder={copy.blog.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="blog-tag-bar">
            {availableTags.map((tag) => (
              <button
                key={tag}
                className={`tag-btn ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </header>

        {/* Featured Post */}
        {featuredPost && activeTag === '#All' && !searchQuery && (
          <section className="featured-section">
            <Link to={`/blog/${featuredPost.slug}`} className="featured-card glow-active">
              {featuredPost.image && (
                <div className="featured-media">
                  <img src={featuredPost.image} alt={featuredPost.title} className="featured-image" />
                </div>
              )}
              <div className="featured-content">
                <div className="featured-meta">
                  <Badge variant="primary">#{featuredPost.tag}</Badge>
                  <span className="font-label-mono read-time-text">⏱ {featuredPost.readTime}</span>
                </div>
                <h2 className="featured-title">{featuredPost.title}</h2>
                <p className="featured-subtitle">{featuredPost.subtitle}</p>
                <div className="font-label-mono article-date">{featuredPost.date}</div>
              </div>
            </Link>
          </section>
        )}

        {/* Article List */}
        <section className="article-list-section">
          {filtered.length === 0 && (
            <p className="no-results font-label-mono">
              {copy.blog.noResultsFor.replace('{query}', searchQuery || activeTag)}
            </p>
          )}
          {filtered.map((art) => (
            <article key={art.slug} className="article-list-item glow-active">
              <Link to={`/blog/${art.slug}`} className="article-item-link">
                <div className="article-item-main">
                  <div className="article-item-meta">
                    <Badge variant="accent">#{art.tag}</Badge>
                    <span className="font-label-mono date-text">{art.date}</span>
                  </div>
                  <h3 className="article-item-title">{art.title}</h3>
                  <p className="article-item-desc">{art.subtitle}</p>
                </div>
                <div className="article-item-action font-label-mono">
                  {copy.blog.readArticle} →
                </div>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default BlogIndex;
