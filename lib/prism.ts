// Custom syntax highlighting without Prism.js
// This provides basic syntax highlighting using CSS classes

export const highlightCode = (code: string, language: string): string => {
  // Basic syntax highlighting patterns
  const patterns = {
    bash: [
      { pattern: /^(\$|#)\s*/gm, replacement: '<span class="token-prompt">$1</span>' },
      { pattern: /(docker|wget|curl|git|npm|yarn|cd|ls|cat|echo|mkdir|rm|cp|mv)\b/g, replacement: '<span class="token-command">$1</span>' },
      { pattern: /(--[a-zA-Z-]+)/g, replacement: '<span class="token-flag">$1</span>' },
      { pattern: /(\/[^\s]+)/g, replacement: '<span class="token-path">$1</span>' },
      { pattern: /(https?:\/\/[^\s]+)/g, replacement: '<span class="token-url">$1</span>' },
      { pattern: /(\d+)/g, replacement: '<span class="token-number">$1</span>' },
      { pattern: /(["'][^"']*["'])/g, replacement: '<span class="token-string">$1</span>' },
    ],
    json: [
      { pattern: /("[\w\s]+")\s*:/g, replacement: '<span class="token-property">$1</span>:' },
      { pattern: /:\s*("[\w\s]+")/g, replacement: ': <span class="token-string">$1</span>' },
      { pattern: /:\s*(\d+)/g, replacement: ': <span class="token-number">$1</span>' },
      { pattern: /:\s*(true|false|null)/g, replacement: ': <span class="token-boolean">$1</span>' },
      { pattern: /([{}[\],])/g, replacement: '<span class="token-punctuation">$1</span>' },
    ],
    nginx: [
      { pattern: /^(\w+)\s*{/gm, replacement: '<span class="token-directive">$1</span> {' },
      { pattern: /(\w+)\s+([^;]+);/g, replacement: '<span class="token-property">$1</span> <span class="token-value">$2</span>;' },
      { pattern: /(server|location|upstream|http|events)\s*{/g, replacement: '<span class="token-block">$1</span> {' },
    ],
    default: [
      { pattern: /(true|false|null|undefined)/g, replacement: '<span class="token-boolean">$1</span>' },
      { pattern: /(\d+)/g, replacement: '<span class="token-number">$1</span>' },
      { pattern: /(["'][^"']*["'])/g, replacement: '<span class="token-string">$1</span>' },
      { pattern: /(\/\/.*$)/gm, replacement: '<span class="token-comment">$1</span>' },
    ]
  };

  const langPatterns = patterns[language as keyof typeof patterns] || patterns.default;
  
  let highlighted = code;
  langPatterns.forEach(({ pattern, replacement }) => {
    highlighted = highlighted.replace(pattern, replacement);
  });

  return highlighted;
};
