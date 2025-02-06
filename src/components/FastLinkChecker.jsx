import { useState } from "react";

const LinkChecker = () => {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkLinks = async () => {
    if (!url) return;

    setLoading(true);
    setResults([]);
    
    try {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const links = Array.from(doc.querySelectorAll("a"));
      
      const absoluteLinks = links.map((link) => {
        let href = link.getAttribute("href");
        if (!href) return null;
        if (!href.startsWith("http")) {
          return new URL(href, url).href;
        }
        return href;
      }).filter(Boolean);

      const linkStatuses = await Promise.all(
        absoluteLinks.map(async (link) => {
          try {
            const res = await fetch(link, { method: "HEAD" });
            return { url: link, status: res.status, text: res.statusText };
          } catch (error) {
            return { url: link, status: "Error", text: "Failed to fetch" };
          }
        })
      );

      setResults(linkStatuses);
    } catch (error) {
      console.error("Error fetching page:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-content-light dark:text-content-dark">Website Link Checker</h1>
      <input
        type="text"
        className="w-full p-2 border rounded-md bg-surface-light dark:bg-surface-dark text-content-light dark:text-content-dark"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        onClick={checkLinks}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Links"}
      </button>
      {results.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="border p-2">URL</th>
              <th className="border p-2">Status Code</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="border">
                <td className="border p-2 break-all">{result.url}</td>
                <td className="border p-2">{result.status}</td>
                <td className={`border p-2 ${result.status === 200 ? "text-green-500" : "text-red-500"}`}>{result.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LinkChecker;
