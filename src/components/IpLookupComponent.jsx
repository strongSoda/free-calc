import React, { useState, useEffect } from 'react';
import { Globe, Map, Server, Copy, Check } from 'lucide-react';
import AffiliateSection from './AffiliateSection';

const IpLookupComponent = ({ defaultIp = '', defaultLang = 'en' }) => {
  const [ip, setIp] = useState(defaultIp);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedLang, setSelectedLang] = useState(defaultLang);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'pt-BR', name: 'Português' },
    { code: 'fr', name: 'Français' },
    { code: 'ja', name: '日本語' },
    { code: 'zh-CN', name: '中文' },
    { code: 'ru', name: 'Русский' }
  ];

  const handleLookup = async () => {
    setLoading(true);
    setError('');
    try {
      // using free proxy to avoid ssl, cors for protocol errors/failures
      const response = await fetch(`https://spiff.guru/any-proxy?url=http://ip-api.com/json/${ip}?lang=${selectedLang}&fields=66846719`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to lookup IP address');
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (defaultIp) {
      setIp(defaultIp);
      handleLookup();
    }
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter IP address or domain"
            className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
          />
        </div>
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
        <button
          onClick={handleLookup}
          disabled={loading}
          className="px-6 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Lookup'}
        </button>
      </div>

      <p>Quick Link: <a className="text-accent-primary hover:text-accent-secondary transition-colors" href="/calculators/subnet">Subnet Calculator</a></p>

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {results && (
        <div className="space-y-6">
          {/* Main Info Card */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-accent-primary" />
                <h3 className="font-display text-lg font-semibold">Location</h3>
              </div>
              <div className="space-y-2">
                <p>{results.city}, {results.regionName}</p>
                <p>{results.country} ({results.countryCode})</p>
                <p>ZIP: {results.zip}</p>
              </div>
            </div>

            <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Map className="text-accent-primary" />
                <h3 className="font-display text-lg font-semibold">Coordinates</h3>
              </div>
              <div className="space-y-2">
                <p>Latitude: {results.lat}</p>
                <p>Longitude: {results.lon}</p>
                <p>Timezone: {results.timezone}</p>
              </div>
            </div>

            <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Server className="text-accent-primary" />
                <h3 className="font-display text-lg font-semibold">Network</h3>
              </div>
              <div className="space-y-2">
                <p>ISP: {results.isp}</p>
                <p>Organization: {results.org}</p>
                <p>AS: {results.as}</p>
              </div>
            </div>
          </div>

          {/* JSON Response */}
          <div className="relative">
            <div className="absolute right-4 top-4">
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-surface-light-hover dark:hover:bg-surface-dark rounded-lg transition-colors"
              >
                {copied ? <Check className="text-accent-success" /> : <Copy />}
              </button>
            </div>
            <pre className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl overflow-x-auto">
              <code>{JSON.stringify(results, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}

                {/* Add Affiliate Section before Continue Learning */}
                <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
                  <AffiliateSection client:load />
                </div>
    </div>
  );
};

export default IpLookupComponent;