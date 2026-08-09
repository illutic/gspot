// @ts-ignore
import { describe, it, expect } from 'vitest';
import { renderWithRouter } from './testUtils';
import { AppContent } from './App';

describe('App component', () => {
  it('renders app shell with header, main content, and footer', () => {
    const html = renderWithRouter(<AppContent />);
    expect(html).toContain('app-shell');
    expect(html).toContain('navbar-header');
    expect(html).toContain('main-content');
    expect(html).toContain('site-footer');
  });
});
