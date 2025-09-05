'use client';
import React, { useState } from 'react';
import { highlightCode } from '@/lib/prism';

type Props = {
  code: string;
  language?: string;   // e.g., 'bash', 'nginx'
  footerText?: string; // optional line like "OK"
  className?: string;
};

export default function CodeBlock({ code, language = 'bash', footerText, className }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const langLabel = language.toLowerCase();
  const highlightedCode = highlightCode(code, langLabel);

  return (
    <div className={`code-frame ${className || ''}`}>
      <div className="code-header">
        <span className="code-lang">{langLabel}</span>
        <button
          type="button"
          className="code-copy"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          {copied ? 'Copied' : 'Copy code'}
        </button>
      </div>

      <div className="code-body">
        <pre className="code-pre">
          <code 
            className={`language-${langLabel}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>

      {footerText ? (
        <div className="code-footer">{footerText}</div>
      ) : null}
    </div>
  );
}
