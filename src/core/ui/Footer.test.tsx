// @ts-ignore
import { describe, it, expect } from 'vitest';
import { renderWithRouter } from '@app/testUtils';
import { Footer } from './Footer';

describe('Footer component', () => {
  it('renders copyright and nav links', () => {
    const html = renderWithRouter(<Footer />);
    expect(html).toContain('Modular Template');
    expect(html).toContain('All rights reserved');
  });
});
