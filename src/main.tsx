import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@core/ui/tokens.css';
import { ThemeProvider } from '@core/theme';
import { LanguageProvider } from '@core/i18n';
import { App } from '@app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
