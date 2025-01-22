import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

const ShareURL = ({ url }) => {
  const [copied, setCopied] = useState(false);  

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mt-6 p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg border border-gray-200/10 dark:border-gray-800/10">
      <div className="flex items-center gap-2 mb-2">
        <Share2 size={18} className="text-content-light-dimmed dark:text-content-dark-dimmed" />
        <span className="font-medium text-content-light dark:text-content-dark">Share Color</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-lg font-mono text-sm text-content-light-dimmed dark:text-content-dark-dimmed overflow-x-auto whitespace-nowrap">
          {url}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-light dark:bg-surface-dark hover:bg-primary-100 dark:hover:bg-surface-dark-hover transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check size={18} className="text-accent-success" />
          ) : (
            <Copy size={18} className="text-content-light-dimmed dark:text-content-dark-dimmed" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareURL;