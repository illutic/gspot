// @ts-ignore
import { describe, it, expect } from 'vitest';
import { renderWithRouter } from '@app/testUtils';
import { Home } from './Home';

describe('Home component', () => {
  it('renders hero banner and CTAs', () => {
    const html = renderWithRouter(<Home />);
    expect(html).toContain('Modern Web Engineering');
    expect(html).toContain('Built for Performance, Designed for Scale');
    expect(html).toContain('Explore Architecture');
    expect(html).toContain('Get in Touch');
  });

  it('renders feature highlights', () => {
    const html = renderWithRouter(<Home />);
    expect(html).toContain('Modular Monolith');
    expect(html).toContain('Zero CSS Overhead');
  });
});
