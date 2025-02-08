import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const CopyCodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark-hover text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark transition-colors"
        aria-label="Copy code"
      >
        {copied ? (
          <div className="flex items-center gap-1">
            <Check size={16} className="text-accent-success" />
            <span className="text-xs text-accent-success">Copied!</span>
          </div>
        ) : (
          <Copy size={16} />
        )}
      </button>
      <pre className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg overflow-x-auto">
        <code className="block pr-12">{code}</code>
      </pre>
      
    </div>
  );
};

export default CopyCodeBlock;