import React from 'react';
import { useLanguage } from '@core/i18n';
import { SOCIAL } from '@core/config/siteConfig';
import './Footer.css';

export const Footer: React.FC = () => {
  const { copy } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-copyright font-label-mono">
          {copy.footer.copyright}
        </div>
        <div className="footer-links font-label-mono">
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            {copy.footer.github}
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            {copy.footer.linkedin}
          </a>
          <span className="footer-availability">{copy.footer.availability}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
