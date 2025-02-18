import React, { useState, useEffect } from 'react';
import SponsorsSection from './SponsorCard';

const BinaryTranslator = ({ 
  defaultFrom = 'text',
  defaultTo = 'binary',
  defaultEncoding = 'utf-8',
  defaultInput = '',
  showAffiliate = true
}) => {
  const [input, setInput] = useState(defaultInput);
  const [fromType, setFromType] = useState(defaultFrom);
  const [toType, setToType] = useState(defaultTo);
  const [encoding, setEncoding] = useState(defaultEncoding);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const conversionTypes = [
    { value: 'text', label: 'Text' },
    { value: 'binary', label: 'Binary' },
    { value: 'hex', label: 'Hexadecimal' },
    { value: 'decimal', label: 'Decimal' },
    { value: 'octal', label: 'Octal' }
  ];

  const encodings = [
    { value: 'utf-8', label: 'UTF-8' },
    { value: 'ascii', label: 'ASCII' },
    { value: 'utf-16', label: 'UTF-16' }
  ];

  // Update URL parameters
  const updateUrl = (newInput) => {
    const params = new URLSearchParams(window.location.search);
    if (newInput) {
      params.set('input', newInput);
      params.set('from', fromType);
      params.set('to', toType);
    } else {
      params.delete('input');
      params.delete('from');
      params.delete('to');
    }
    window.history.replaceState({}, '', `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`);
  };

  // Load from URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlInput = params.get('input');
    const urlFrom = params.get('from');
    const urlTo = params.get('to');

    if (urlInput) {
      setInput(urlInput);
      if (urlFrom && conversionTypes.some(t => t.value === urlFrom)) setFromType(urlFrom);
      if (urlTo && conversionTypes.some(t => t.value === urlTo)) setToType(urlTo);
      convert(urlInput, urlFrom || fromType, urlTo || toType);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    updateUrl(newInput);
  };

  const convert = (currentInput = input, from = fromType, to = toType) => {
    setError('');
    if (!currentInput) {
      setResult('');
      return;
    }

    try {
      let intermediateValue;
      
      // First convert input to decimal
      switch (from) {
        case 'text':
          intermediateValue = [...currentInput].map(char => char.charCodeAt(0));
          break;
        case 'binary':
          intermediateValue = currentInput.split(' ').map(bin => parseInt(bin, 2));
          break;
        case 'hex':
          intermediateValue = currentInput.split(' ').map(hex => parseInt(hex, 16));
          break;
        case 'decimal':
          intermediateValue = currentInput.split(' ').map(dec => parseInt(dec, 10));
          break;
        case 'octal':
          intermediateValue = currentInput.split(' ').map(oct => parseInt(oct, 8));
          break;
      }

      // Then convert decimal to target type
      let output;
      switch (to) {
        case 'text':
          output = String.fromCharCode(...intermediateValue);
          break;
        case 'binary':
          output = intermediateValue.map(num => num.toString(2).padStart(8, '0')).join(' ');
          break;
        case 'hex':
          output = intermediateValue.map(num => num.toString(16).toUpperCase().padStart(2, '0')).join(' ');
          break;
        case 'decimal':
          output = intermediateValue.join(' ');
          break;
        case 'octal':
          output = intermediateValue.map(num => num.toString(8).padStart(3, '0')).join(' ');
          break;
      }

      setResult(output);
    } catch (err) {
      setError('Invalid input format. Please check your input and try again.');
    }
  };

  // Copy to clipboard with status
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  // Download result as text file
  const downloadResult = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_${fromType}_to_${toType}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (defaultInput) {
      convert();
    }
  }, [defaultInput, defaultFrom, defaultTo, defaultEncoding]);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Input</label>
          <textarea
            value={input}
            onChange={handleInputChange}
            className="w-full h-32 p-3 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/20 dark:border-gray-800/20 focus:ring-2 focus:ring-accent-primary outline-none"
            placeholder={`Enter ${fromType} to convert...`}
          />
        </div>
      </div>

      {/* Conversion Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-lg font-medium">From</label>
          <select
            value={fromType}
            onChange={(e) => setFromType(e.target.value)}
            className="w-full p-3 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/20 dark:border-gray-800/20 focus:ring-2 focus:ring-accent-primary outline-none"
          >
            {conversionTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">To</label>
          <select
            value={toType}
            onChange={(e) => setToType(e.target.value)}
            className="w-full p-3 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/20 dark:border-gray-800/20 focus:ring-2 focus:ring-accent-primary outline-none"
          >
            {conversionTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">Character Encoding</label>
          <select
            value={encoding}
            onChange={(e) => setEncoding(e.target.value)}
            className="w-full p-3 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/20 dark:border-gray-800/20 focus:ring-2 focus:ring-accent-primary outline-none"
          >
            {encodings.map(enc => (
              <option key={enc.value} value={enc.value}>{enc.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Convert Button */}
      <button
        onClick={() => convert()}
        className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
      >
        Convert
      </button>

      {/* Result Section */}
      {error ? (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      ) : result && (
        <div className="space-y-2">
          <label className="block text-lg font-medium">Result</label>
          <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg border border-gray-200/20 dark:border-gray-800/20 font-mono break-all">
            {result}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                copied 
                  ? 'bg-accent-success/10 text-accent-success' 
                  : 'bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary'
              }`}
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={downloadResult}
              className="px-4 py-2 text-sm rounded-lg bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary transition-colors"
            >
              Download Result
            </button>
          </div>
        </div>
      )}

      {
          showAffiliate && (
            <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
              {/* <AffiliateSection client:load /> */}
              <SponsorsSection client:load />
            </div>
          )
        }
    </div>
  );
};

export default BinaryTranslator;