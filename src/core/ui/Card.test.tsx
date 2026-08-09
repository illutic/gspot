// @ts-ignore
import { describe, it, expect } from 'vitest';
import ReactDOMServer from 'react-dom/server';
import { Card } from './Card';

describe('Card component', () => {
  it('renders children with default classes', () => {
    const html = ReactDOMServer.renderToString(<Card>Card Content</Card>);
    expect(html).toContain('card card-default card-pad-md');
    expect(html).toContain('Card Content');
  });

  it('renders hoverable state', () => {
    const html = ReactDOMServer.renderToString(
      <Card variant="surface" padding="lg" hoverable>
        Hoverable Card
      </Card>
    );
    expect(html).toContain('card-surface');
    expect(html).toContain('card-pad-lg');
    expect(html).toContain('card-hoverable');
  });
});
