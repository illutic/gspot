// @ts-ignore
import { describe, it, expect } from 'vitest';
import { renderWithRouter } from '@app/testUtils';
import { About } from './About';

describe('About component', () => {
  it('renders hero and principles', () => {
    const html = renderWithRouter(<About />);
    expect(html).toContain('About the Architecture');
    expect(html).toContain('Core Principles');
    expect(html).toContain('Strict barrel boundaries');
  });
});
