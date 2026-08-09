// @ts-ignore
import { describe, it, expect } from 'vitest';
import ReactDOMServer from 'react-dom/server';
import { LanguageToggle } from './LanguageToggle';
import { LanguageProvider } from '@core/i18n';

describe('LanguageToggle component', () => {
  it('renders language buttons', () => {
    const html = ReactDOMServer.renderToString(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>
    );
    expect(html).toContain('EN');
    expect(html).toContain('ΕΛ');
  });
});
