import React, { useState } from 'react';
import { Badge, MetricCallout } from '@core/ui';
import { useLanguage } from '@core/i18n';
import { renderInlineMarkdown } from '@core/utils';
import { EXPERIENCE_PRIMARY_TAG_KEYWORDS } from '@core/config/siteConfig';
import { parseCareer } from './parseCareer';
import careerMarkdownEN from '../../content/experience/career.md?raw';
import careerMarkdownEL from '../../content/experience/career.el.md?raw';
import './Experience.css';

const careerEN = parseCareer(careerMarkdownEN);
const careerEL = parseCareer(careerMarkdownEL);

export const Experience: React.FC = () => {
  const { lang, copy } = useLanguage();
  const [filterMode, setFilterMode] = useState<'full' | 'highlights'>('full');
  const { meta, items: allExperiences } = lang === 'el' ? careerEL : careerEN;

  const displayed =
    filterMode === 'highlights' ? allExperiences.filter((e) => e.isHighlight) : allExperiences;

  return (
    <div className="experience-page">
      <main className="container experience-container">
        {/* Header */}
        <header className="experience-header">
          <h1 className="experience-title">{meta.title || copy.experience.title}</h1>
          <p className="experience-subtitle">{meta.subtitle || copy.experience.subtitle}</p>

          <div className="filter-pill-group">
            <button
              className={`filter-pill ${filterMode === 'full' ? 'active' : ''}`}
              onClick={() => setFilterMode('full')}
            >
              {copy.experience.filterFull}
            </button>
            <button
              className={`filter-pill ${filterMode === 'highlights' ? 'active' : ''}`}
              onClick={() => setFilterMode('highlights')}
            >
              {copy.experience.filterHighlights}
            </button>
          </div>
        </header>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline-spine" />

          {displayed.map((item, index) => (
            <div key={index} className={`timeline-row ${index % 2 === 0 ? 'row-left' : 'row-right'}`}>
              <div className="mobile-dot" />

              <div className="timeline-card-wrapper">
                <div className="timeline-card glow-active">
                  <div className="timeline-card-header">
                    <div>
                      <h3 className="role-title">{item.role}</h3>
                      <p className="company-name font-label-mono">
                        {item.company}
                        {item.location && (
                          <span className="company-location"> · {item.location}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {item.highlights.length > 0 && (
                    <ul className="timeline-highlights">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="timeline-highlight-item">
                          {renderInlineMarkdown(h)}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.metrics.length > 0 && (
                    <div className="timeline-metrics">
                      {item.metrics.map((m) => (
                        <MetricCallout key={m.label} value={m.value} label={m.label} />
                      ))}
                    </div>
                  )}

                  <div className="timeline-badges">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={
                          EXPERIENCE_PRIMARY_TAG_KEYWORDS.some((kw) => tag.includes(kw))
                            ? 'primary'
                            : 'default'
                        }
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="desktop-dot">
                <div className="dot-inner" />
              </div>

              <div className="timeline-period-wrapper">
                <span className="period-badge font-label-mono">{item.period}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Experience;
