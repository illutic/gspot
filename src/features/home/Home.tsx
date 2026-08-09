import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, MetricCallout, CodeTerminal } from '@core/ui';
import { useLanguage } from '@core/i18n';
import { HOME_DEVICE_IMAGE } from '@core/config/siteConfig';
import { parseHero } from './parseHero';
import heroMarkdown from '../../content/home/hero.md?raw';
import './Home.css';

const hero = parseHero(heroMarkdown);

export const Home: React.FC = () => {
  const { copy } = useLanguage();

  return (
    <div className="home-page">
      <main className="container home-container">
        {/* Status Badge */}
        <div className="status-badge-container">
          <span className="status-dot" />
          <span className="font-label-mono status-text">
            {hero.statusText || copy.home.status}
          </span>
        </div>

        {/* Metric Callout Bar */}
        <div className="metrics-grid">
          <MetricCallout value={hero.yearsExp} label="Years Exp" />
          <MetricCallout value={hero.appsShipped} label="Apps Shipped" />
          <MetricCallout value={hero.recognition} label="Education" />
        </div>

        {/* Split Layout */}
        <div className="hero-split">
          {/* Left: Intro & CTAs */}
          <div className="hero-intro">
            <h1 className="hero-title">{hero.title}</h1>
            <p className="hero-subtitle">{hero.subtitle}</p>

            <div className="hero-badges">
              {hero.badges.map((b) => (
                <Badge key={b} variant="default">{b}</Badge>
              ))}
            </div>

            <div className="hero-ctas">
              <Link to="/projects" className="btn-primary font-label-mono">
                {copy.home.viewProjects}
              </Link>
              <Link to="/contact" className="btn-secondary font-label-mono">
                {copy.home.getInTouch}
              </Link>
            </div>
          </div>

          {/* Right: Android Device Mockup */}
          <div className="device-mockup-wrapper glow-active">
            <div className="device-notch" />
            <div className="device-screen flex flex-col justify-end p-4">
              <img
                src={HOME_DEVICE_IMAGE}
                alt="Android app mockup"
                className="device-screenshot"
              />
              <div className="device-code-overlay">
                <CodeTerminal filename={hero.snippetTitle} code={hero.snippetCode} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
