// @ts-ignore
import { describe, it, expect } from 'vitest';
import { getNavItems } from './navigation';

describe('navigation utility', () => {
  it('returns EN nav items for english', () => {
    const items = getNavItems('en');
    expect(items[0].label).toBe('Home');
    expect(items[1].label).toBe('About');
    expect(items[2].label).toBe('Contact');
  });

  it('returns EL nav items for greek', () => {
    const items = getNavItems('el');
    expect(items[0].label).toBe('Αρχική');
  });
});
