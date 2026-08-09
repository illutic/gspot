import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@core/i18n';
import { getNavItems } from '@core/utils';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, copy } = useLanguage();
  const location = useLocation();
  const navItems = getNavItems(lang);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand font-label-mono">
          {copy.brand}
        </Link>

        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`} aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="nav-controls-mobile">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>

        <div className="navbar-actions">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-resume-btn"
          >
            {copy.nav.resume}
          </a>
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={copy.nav.toggleNavigation}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
