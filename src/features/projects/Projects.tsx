import React, { useState } from 'react';
import { Badge } from '@core/ui';
import { useLanguage } from '@core/i18n';
import { PROJECT_PRIMARY_TAG_KEYWORDS } from '@core/config/siteConfig';
import { parseProjects, filterProjects, getProjectTags } from './parseProjects';
import projectsMarkdown from '../../content/projects/projects.md?raw';
import './Projects.css';

const { meta, items: allProjects } = parseProjects(projectsMarkdown);
const availableTags = getProjectTags(allProjects);

export const Projects: React.FC = () => {
  const { copy } = useLanguage();
  const [activeTag, setActiveTag] = useState<string>('#All');

  const displayed = filterProjects(allProjects, activeTag);

  return (
    <div className="projects-page">
      <main className="container projects-container">
        {/* Header */}
        <header className="projects-header">
          <h1 className="projects-title">{meta.title || copy.projects.title}</h1>
          <p className="projects-subtitle">{meta.subtitle || copy.projects.subtitle}</p>
        </header>

        {/* Tag Filters */}
        <div className="tag-filter-bar">
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

        {/* Project Grid */}
        <div className="projects-grid">
          {displayed.map((item, idx) => (
            <article key={idx} className="project-card rounded-xl glow-active">
              <div className="project-card__media">
                <img src={item.image} alt={item.title} className="project-card__image" />
                <div className="project-card__overlay" />
              </div>

              <div className="project-card__content">
                <div className="project-card__header">
                  <h2 className="project-card__title">{item.title}</h2>
                </div>

                <p className="project-card__desc">{item.description}</p>

                <div className="project-card__badges">
                  {item.tags.map((t) => (
                    <Badge
                      key={t}
                      variant={
                        PROJECT_PRIMARY_TAG_KEYWORDS.some((kw) => t.includes(kw))
                          ? 'primary'
                          : 'default'
                      }
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                {(item.githubUrl || item.demoUrl) && (
                  <div className="project-card__actions">
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn project-btn--ghost font-label-mono"
                      >
                        Source Code
                      </a>
                    )}
                    {item.demoUrl && (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn project-btn--primary font-label-mono"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
