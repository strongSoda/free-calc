// import React, { useState } from 'react';

// const LinkChecker = () => {
//   const [url, setUrl] = useState('');
//   const [status, setStatus] = useState(null);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus(null);
//     setResults([]);
    
//     try {
//       const res = await fetch(`https://validator.w3.org/checklink?uri=${url}&hide_type=all&depth=&check=Check`);

//       const data = await res.json();

//       if (data && data.errors) {
//         setResults(data.errors);
//         setStatus('failed');
//       } else {
//         setResults(data.results || []);
//         setStatus('success');
//       }
//     } catch (error) {
//       setStatus('error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-surface-light dark:bg-surface-dark flex justify-center items-center py-6 px-4">
//       <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//         <h2 className="text-2xl font-semibold text-center text-primary-600">Broken Link Checker</h2>
//         <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//           <div className="flex justify-center">
//             <input
//               type="url"
//               placeholder="Enter URL to check"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               className="w-3/4 p-3 rounded-lg border border-primary-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
//               required
//             />
//           </div>
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="w-1/4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition duration-300"
//               disabled={loading}
//             >
//               {loading ? 'Checking...' : 'Check'}
//             </button>
//           </div>
//         </form>

//         {status === 'error' && (
//           <div className="mt-6 text-center text-red-500">An error occurred. Please try again later.</div>
//         )}

//         {status === 'success' && results.length === 0 && (
//           <div className="mt-6 text-center text-green-500">No broken links found!</div>
//         )}

//         {status === 'failed' && results.length > 0 && (
//           <div className="mt-6 overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse border border-gray-300">
//               <thead>
//                 <tr>
//                   <th className="p-2 text-left bg-primary-100 text-primary-800">Link</th>
//                   <th className="p-2 text-left bg-primary-100 text-primary-800">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((result, index) => (
//                   <tr key={index} className={`text-sm ${index % 2 === 0 ? 'bg-primary-50' : 'bg-primary-100'}`}>
//                     <td className="p-2">{result.url}</td>
//                     <td className="p-2">
//                       <span
//                         className={`px-2 py-1 rounded-full ${
//                           result.status === 'broken' ? 'bg-error-500 text-white' : 'bg-success-500 text-white'
//                         }`}
//                       >
//                         {result.status === 'broken' ? 'Broken' : 'Working'}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LinkChecker;

// markup validator
import React, { useState } from "react";

const LinkChecker = () => {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateUrl = async () => {
    if (!url) {
      setError("Please enter a URL.");
      return;
    }
    setError(null);
    setResults(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://validator.w3.org/nu/?doc=${encodeURIComponent(url)}&out=json`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError("Failed to fetch validation results. Ensure the URL is correct and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">W3C Markup Validator</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" 
          onClick={validateUrl} 
          disabled={loading}
        >
          {loading ? "Checking..." : "Validate"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {results && (
        <div className="border p-4 rounded bg-gray-100">
          <h3 className="text-lg font-semibold">Validation Results</h3>
          {results.messages.length === 0 ? (
            <p className="text-green-500">No errors found. Your page is valid!</p>
          ) : (
            <ul className="list-disc list-inside">
              {results.messages.map((msg, index) => (
                <li 
                  key={index} 
                  className={msg.type === "error" ? "text-red-500" : "text-yellow-500"}
                >
                  {msg.message} {msg.extract && `(${msg.extract})`}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkChecker;
