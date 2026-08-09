// @ts-ignore
import { describe, it, expect } from 'vitest';
import { renderWithRouter } from '@app/testUtils';
import { Contact } from './Contact';

describe('Contact component', () => {
  it('renders contact form fields and honeypot', () => {
    const html = renderWithRouter(<Contact />);
    expect(html).toContain('Get In Touch');
    expect(html).toContain('name="website"');
    expect(html).toContain('Full Name');
    expect(html).toContain('Email Address');
    expect(html).toContain('Send Message');
  });
});
