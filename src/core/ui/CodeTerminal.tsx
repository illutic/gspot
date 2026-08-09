import { useState } from 'react';
import './CodeTerminal.css';

export interface CodeTerminalProps {
  filename?: string;
  code: string;
  className?: string;
}

export function CodeTerminal({ filename = 'Terminal', code, className = '' }: CodeTerminalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`code-terminal ${className}`}>
      <div className="code-terminal__header">
        <div className="code-terminal__dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="code-terminal__filename">{filename}</div>
        <button className="code-terminal__copy" onClick={handleCopy} aria-label="Copy code">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="code-terminal__body">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
