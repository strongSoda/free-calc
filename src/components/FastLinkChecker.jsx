import React, { useState, useEffect } from 'react';
import { Globe2, ExternalLink, Link2, AlertCircle, CheckCircle2, Clock, Ban } from 'lucide-react';


const FastLinkChecker = ({ defaultUrl = '', mode = 'single' }) => {
  const [url, setUrl] = useState(defaultUrl);
  const [checkMode, setCheckMode] = useState(mode);
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const [progress, setProgress] = useState({ checked: 0, total: 0 });

  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    const modeParam = params.get('mode');
    
    if (urlParam) {
      setUrl(urlParam);
      if (modeParam) setCheckMode(modeParam);
      handleCheck(urlParam, modeParam || 'single');
    }
  }, []);

const checkUrl = async (targetUrl, method = 'HEAD', checkMode = 'single') => {
  try {
    // Only check the initial links for single page mode
    const proxyUrl = `https://justcors.com/tl_32ccd0e/${encodeURIComponent(targetUrl)}`;
    
    const headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Cache-Control': 'no-cache',
    };

    const response = await fetch(proxyUrl, {
      method,
      headers
    });

    if (!response.headers.get('content-type')) {
      const newHeaders = new Headers(response.headers);
      newHeaders.set('content-type', 'text/html;charset=UTF-8');
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders
      });
    }

    return response;
  } catch (error) {
    console.error('Proxy request failed:', error);
    throw error;
  }
};

const extractLinks = async (pageUrl) => {
  try {
    // Always use GET for page fetching
    const response = await checkUrl(pageUrl, 'GET');
    
    // Get text content regardless of content type header
    const html = await response.text();

    if (!html || html.trim().length === 0) {
      throw new Error('Empty response received');
    }

    // Check if response looks like HTML
    if (!html.includes('<')) {
      throw new Error('Response is not HTML content');
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Basic HTML validation
    if (!doc.querySelector('body')) {
      throw new Error('Invalid HTML structure');
    }

    // Rest of your link extraction code...
    const links = new Set();
    const selectors = [
      'a[href]', 
      'img[src]',
      'script[src]',
      'link[href]',
      'iframe[src]',
      'source[src]',
      'video[src]',
      'audio[src]'
    ];

    selectors.forEach(selector => {
      doc.querySelectorAll(selector).forEach(element => {
        const link = element.getAttribute('href') || element.getAttribute('src');
        if (link) {
          try {
            const absoluteUrl = new URL(link, pageUrl).href;
            // Skip data: and javascript: URLs
            if (!absoluteUrl.startsWith('data:') && !absoluteUrl.startsWith('javascript:')) {
              links.add({
                url: absoluteUrl,
                text: element.textContent?.trim() || element.getAttribute('alt') || '',
                internal: absoluteUrl.startsWith(new URL(pageUrl).origin),
                rel: element.getAttribute('rel') || 'follow',
                element: element.tagName.toLowerCase()
              });
            }
          } catch (e) {
            console.warn(`Invalid URL: ${link}`, e);
          }
        }
      });
    });

    if (links.size === 0) {
      console.warn('No links found in page');
    }

    return Array.from(links);
  } catch (error) {
    console.error('Extract links error:', error);
    throw new Error(`Failed to extract links: ${error.message}`);
  }
};

  const checkLink = async (link) => {
  const startTime = performance.now();
  try {
    // Try HEAD first
    let response = await checkUrl(link.url, 'HEAD');
    
    // If HEAD fails, try GET
    if (response.status === 405) {
      response = await checkUrl(link.url, 'GET');
    }

    return {
      ...link,
      status: response.status,
      loadTime: ((performance.now() - startTime) / 1000).toFixed(2) + 's'
    };
  } catch (error) {
    return {
      ...link,
      status: 0,
      error: error.message,
      loadTime: ((performance.now() - startTime) / 1000).toFixed(2) + 's'
    };
  }
};

  const handleCheck = async (urlToCheck = url, modeToUse = checkMode) => {
  setError('');
  setIsChecking(true);
  setResults(null);
  setStats(null);
  setProgress({ checked: 0, total: 0 });

  if (!urlToCheck) {
    setError('Please enter a URL');
    setIsChecking(false);
    return;
  }

  try {
    // First extract all links from the initial page
    const initialLinks = await extractLinks(urlToCheck);
    let linksToCheck = initialLinks;

    // For recursive mode, gather links from each internal page
    if (modeToUse === 'recursive') {
      const checkedUrls = new Set([urlToCheck]);
      const internalLinks = initialLinks.filter(link => link.internal);
      
      for (const link of internalLinks) {
        if (!checkedUrls.has(link.url)) {
          checkedUrls.add(link.url);
          try {
            const newLinks = await extractLinks(link.url);
            linksToCheck = [...linksToCheck, ...newLinks.filter(newLink => 
              !linksToCheck.some(existingLink => existingLink.url === newLink.url)
            )];
          } catch (err) {
            console.warn(`Failed to extract links from ${link.url}:`, err);
          }
        }
      }
    }

    setProgress({ checked: 0, total: linksToCheck.length });

    // Check links in parallel batches
    const batchSize = 5;
    const results = [];
    
    for (let i = 0; i < linksToCheck.length; i += batchSize) {
      const batch = linksToCheck.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(link => checkLink(link)));
      results.push(...batchResults);
      setProgress({ checked: i + batchSize, total: linksToCheck.length });
    }

    // Calculate statistics
    const stats = {
      total: results.length,
      broken: results.filter(r => r.status >= 400 || r.status === 0).length,
      internal: results.filter(r => r.internal).length,
      external: results.filter(r => !r.internal).length,
      avgLoadTime: (results.reduce((sum, r) => 
        sum + parseFloat(r.loadTime), 0) / results.length).toFixed(2) + 's'
    };

    setResults(results);
    setStats(stats);
    
    // Update URL params
    const params = new URLSearchParams();
    params.set('url', urlToCheck);
    params.set('mode', modeToUse);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsChecking(false);
  }
};

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            />
          </div>
          <select
            value={checkMode}
            onChange={(e) => setCheckMode(e.target.value)}
            className="px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
          >
            <option value="single">Single Page</option>
            <option value="recursive">Recursive Check</option>
          </select>
        </div>
        
        <button
          onClick={() => handleCheck()}
          disabled={isChecking}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isChecking ? 'Checking Links...' : 'Check Links'}
        </button>

        {/* Progress Bar */}
        {isChecking && progress.total > 0 && (
          <div className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-full h-2">
            <div 
              className="bg-accent-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progress.checked / progress.total) * 100}%` }}
            />
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              icon={<Globe2 className="w-5 h-5" />}
              label="Total Links"
              value={stats.total}
            />
            <StatCard
              icon={<AlertCircle className="w-5 h-5" />}
              label="Broken Links"
              value={stats.broken}
              alertType="error"
            />
            <StatCard
              icon={<Link2 className="w-5 h-5" />}
              label="Internal Links"
              value={stats.internal}
            />
            <StatCard
              icon={<ExternalLink className="w-5 h-5" />}
              label="External Links"
              value={stats.external}
            />
            <StatCard
              icon={<Clock className="w-5 h-5" />}
              label="Avg Load Time"
              value={stats.avgLoadTime}
            />
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-light-hover dark:bg-surface-dark">
                <tr>
                  <th className="px-4 py-3 text-left">URL</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Type</th>
                  <th className="px-4 py-3 text-center">Element</th>
                  <th className="px-4 py-3 text-center">Load Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/10 dark:divide-gray-800/10">
                {results.map((link, index) => (
                  <tr key={index} className="hover:bg-surface-light-hover dark:hover:bg-surface-dark">
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-primary hover:underline truncate"
                        >
                          {link.url}
                        </a>
                        {link.text && (
                          <span className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                            {link.text}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={link.status} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 ${
                        link.internal ? 'text-accent-success' : 'text-accent-warning'
                      }`}>
                        {link.internal ? <Link2 className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                        {link.internal ? 'Internal' : 'External'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                        {link.element}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {link.loadTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};


const StatCard = ({ icon, label, value, alertType }) => (
  <div className="bg-surface-light-hover dark:bg-surface-dark p-4 rounded-lg">
    <div className="flex items-center gap-3">
      <div className={`${
        alertType === 'error' ? 'text-accent-error' :
        alertType === 'warning' ? 'text-accent-warning' :
        'text-accent-primary'
      }`}>
        {icon}
      </div>
      <div>
        <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
          {label}
        </div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let color = 'bg-accent-success/10 text-accent-success';
  if (status === 0) color = 'bg-accent-error/10 text-accent-error';
  else if (status >= 500) color = 'bg-accent-error/10 text-accent-error';
  else if (status >= 400) color = 'bg-accent-error/10 text-accent-error';
  else if (status >= 300) color = 'bg-accent-warning/10 text-accent-warning';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${color}`}>
      {status >= 400 || status === 0 ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
      {status === 0 ? 'Failed' : status}
    </span>
  );
};

export default FastLinkChecker;