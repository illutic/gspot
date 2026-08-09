import React from 'react';
import { useLanguage, type Language } from '@core/i18n';
import './LanguageToggle.css';

export const LanguageToggle: React.FC = () => {
  const { lang, setLang } = useLanguage();

  const handleSelect = (newLang: Language) => {
    if (newLang !== lang) {
      setLang(newLang);
    }
  };

  return (
    <div className="lang-toggle-group" role="group" aria-label="Language selector">
      <button
        type="button"
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => handleSelect('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <span className="lang-divider" aria-hidden="true">|</span>
      <button
        type="button"
        className={`lang-btn ${lang === 'el' ? 'active' : ''}`}
        onClick={() => handleSelect('el')}
        aria-pressed={lang === 'el'}
      >
        ΕΛ
      </button>
    </div>
  );
};

export default LanguageToggle;
