// @ts-ignore
import { describe, it, expect } from 'vitest';
import ReactDOMServer from 'react-dom/server';
import { Button } from './Button';

describe('Button component', () => {
  it('renders children and default classes', () => {
    const html = ReactDOMServer.renderToString(<Button>Click Me</Button>);
    expect(html).toContain('btn btn-primary btn-md');
    expect(html).toContain('Click Me');
  });

  it('renders custom variants', () => {
    const html = ReactDOMServer.renderToString(
      <Button variant="secondary" size="lg" fullWidth>
        Action
      </Button>
    );
    expect(html).toContain('btn-secondary');
    expect(html).toContain('btn-lg');
    expect(html).toContain('btn-full-width');
  });
});
