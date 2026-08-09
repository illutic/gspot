import ReactDOMServer from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { LanguageProvider } from '@core/i18n';
import { ThemeProvider } from '@core/theme';

export const renderWithRouter = (ui: ReactElement, initialPath = '/'): string =>
  ReactDOMServer.renderToString(
    <ThemeProvider>
      <LanguageProvider>
        <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
