import React from 'react';
import { useLanguage } from '@core/i18n';
import { OWNER, SOCIAL, EDUCATION } from '@core/config/siteConfig';
import { parseCareer } from '@features/experience';
import { parseProjects } from '@features/projects';
import { parseHero } from '@features/home';
import careerMarkdownEN from '../../content/experience/career.md?raw';
import careerMarkdownEL from '../../content/experience/career.el.md?raw';
import projectsMarkdownEN from '../../content/projects/projects.md?raw';
import projectsMarkdownEL from '../../content/projects/projects.el.md?raw';
import heroMarkdownEN from '../../content/home/hero.md?raw';
import heroMarkdownEL from '../../content/home/hero.el.md?raw';
import './Resume.css';

const careerEN = parseCareer(careerMarkdownEN);
const careerEL = parseCareer(careerMarkdownEL);
const projectsEN = parseProjects(projectsMarkdownEN);
const projectsEL = parseProjects(projectsMarkdownEL);
const heroEN = parseHero(heroMarkdownEN);
const heroEL = parseHero(heroMarkdownEL);

export const Resume: React.FC = () => {
    const { lang, copy } = useLanguage();
    const career = lang === 'el' ? careerEL : careerEN;
    const { items: projects } = lang === 'el' ? projectsEL : projectsEN;
    const hero = lang === 'el' ? heroEL : heroEN;

    return (
        <div className="resume-page">
            <div className="resume-controls">
                <button
                    type="button"
                    className="resume-print-btn font-label-mono"
                    onClick={() => window.print()}
                >
                    {copy.resume.printBtn}
                </button>
            </div>

            <div className="resume-document">
                {/* ── Header ── */}
                <header className="resume-header">
                    <div className="resume-name-block">
                        <h1 className="resume-name">{OWNER.name}</h1>
                        <p className="resume-title">{OWNER.title}</p>
                    </div>
                    <address className="resume-contact">
                        <span>{OWNER.location}</span>
                        <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>
                        <span>{OWNER.phoneUK}</span>
                        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">{SOCIAL.linkedinHandle}</a>
                        <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">{SOCIAL.githubHandle}</a>
                    </address>
                </header>

                {/* ── Skills ── */}
                <section className="resume-section">
                    <h2 className="resume-section-title">{copy.resume.skillsTitle}</h2>
                    <div className="resume-skills">
                        {hero.badges.map((badge) => (
                            <span key={badge} className="resume-skill">{badge}</span>
                        ))}
                    </div>
                </section>

                {/* ── Experience ── */}
                <section className="resume-section">
                    <h2 className="resume-section-title">{copy.experience.title}</h2>
                    {career.items.map((item, i) => (
                        <div key={i} className="resume-job">
                            <div className="resume-job-header">
                                <span className="resume-job-role">{item.role}</span>
                                <span className="resume-job-period font-label-mono">{item.period}</span>
                            </div>
                            <div className="resume-job-meta font-label-mono">
                                {item.company}
                                {item.location && <span> · {item.location}</span>}
                                {item.duration && <span> · {item.duration}</span>}
                            </div>
                            <ul className="resume-job-highlights">
                                {item.highlights.map((h, j) => <li key={j}>{h}</li>)}
                            </ul>
                            {item.tags.length > 0 && (
                                <p className="resume-tags font-label-mono">{item.tags.join(' · ')}</p>
                            )}
                        </div>
                    ))}
                </section>

                {/* ── Projects ── */}
                <section className="resume-section">
                    <h2 className="resume-section-title">{copy.projects.title}</h2>
                    {projects.map((item, i) => (
                        <div key={i} className="resume-project">
                            <div className="resume-project-header">
                                <span className="resume-project-title">{item.title}</span>
                                {item.githubUrl && (
                                    <a href={item.githubUrl} className="resume-project-url font-label-mono" target="_blank" rel="noopener noreferrer">
                                        {item.githubUrl.replace('https://', '')}
                                    </a>
                                )}
                            </div>
                            <p className="resume-project-desc">{item.description}</p>
                            {item.tags.length > 0 && (
                                <p className="resume-tags font-label-mono">{item.tags.join(' · ')}</p>
                            )}
                        </div>
                    ))}
                </section>

                {/* ── Education ── */}
                <section className="resume-section">
                    <h2 className="resume-section-title">{copy.resume.educationTitle}</h2>
                    <div className="resume-education">
                        <span className="resume-education-degree">{EDUCATION.degree}</span>
                        <span className="resume-education-meta font-label-mono">
                            {EDUCATION.university} · {EDUCATION.period}
                        </span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Resume;
