// @ts-ignore
import { describe, it, expect } from 'vitest';
import { renderWithRouter } from '@app/testUtils';
import { Navbar } from './Navbar';

describe('Navbar component', () => {
  it('renders brand and navigation links', () => {
    const html = renderWithRouter(<Navbar />);
    expect(html).toContain('Modular Template');
    expect(html).toContain('Home');
    expect(html).toContain('About');
  });
});
