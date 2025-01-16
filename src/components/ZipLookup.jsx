import React, { useState, useEffect } from 'react';
import zipcodes from 'zipcodes';
import { useTwZipCode, cities, districts } from 'use-tw-zipcode';
import zipcodesPH from 'zipcodes-ph';
import AffiliateSection from './AffiliateSection';

const ZipLookup = ({ defaultCountry = 'us', defaultQuery = '', mode = 'zip-to-address' }) => {
  const [country, setCountry] = useState(defaultCountry);
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  
  // Taiwan specific state using the hook
  const { city: twCity, district: twDistrict, zipCode: twZipCode, 
          handleCityChange, handleDistrictChange } = useTwZipCode();

  const countries = [
    { code: 'us', name: 'United States', format: '12345 or 12345-6789' },
    { code: 'ca', name: 'Canada', format: 'A1A 1A1' },
    // { code: 'jp', name: 'Japan', format: '123-4567' },
    { code: 'tw', name: 'Taiwan', format: '123' },
    { code: 'ph', name: 'Philippines', format: '1234' }
  ];

  const handleSearch = () => {

    console.log('handleSearch', country, query);
    
    setError('');
    setResults(null);
    
    try {
      switch(country) {
        case 'us':
        case 'ca': {
          const result = zipcodes.lookup(query);
          if (result) {
            // Get nearby zipcodes
            const nearbyZips = zipcodes.radius(query, 10);
            const distance = nearbyZips.length > 1 ? 
              zipcodes.distance(query, nearbyZips[1]) : null;
              
            setResults({
              ...result,
              nearbyZips: nearbyZips.slice(0, 5),
              distanceToNearest: distance
            });
          } else {
            setError('Zip code not found');
          }
          break;
        }
        
        // case 'jp': {
        //   const result = Oaza.byZipcode(query)[0];
        //   if (result) {
        //     setResults({
        //       city: result.city.name,
        //       prefecture: result.pref.name,
        //       district: result.name,
        //       country: 'Japan'
        //     });
        //   } else {
        //     setError('郵便番号が見つかりません');
        //   }
        //   break;
        // }
        
        case 'ph': {
          const result = zipcodesPH.find(query);
          if (result) {
            setResults({
              city: result,
              country: 'Philippines'
            });
          } else {
            setError('Zip code not found');
          }
          break;
        }
      }
    } catch (err) {
      setError('Error looking up zip code');
      console.error(err);
    }
  };

    // Reset form when country changes
  useEffect(() => {
    setQuery('');
    setResults(null);
    setError('');
  }, [country]);
  
  // Perform lookup on initial render if defaultQuery is provided
  useEffect(() => {
    if (defaultQuery) {
      console.log(defaultCountry, defaultQuery);
      setCountry(defaultCountry);
      setQuery(defaultQuery)
      handleSearch();
    }
  }, [defaultQuery]);

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          
          {country === 'tw' ? (
            // Taiwan specific interface
            <div className="grid grid-cols-2 gap-2">
              <select
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
              >
                {cities.map((city, i) => (
                  <option key={i}>{city}</option>
                ))}
              </select>
              <select
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
              >
                {districts[twCity]?.map((district, i) => (
                  <option key={i}>{district}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                {mode === 'zip-to-address' ? 'Postal Code' : 'Address'}
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
                placeholder={countries.find(c => c.code === country)?.format}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          disabled={country === 'tw'}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Search
        </button>
      </div>

      {/* Format Guide */}
      <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
        <h3 className="font-medium mb-2">Format Guide:</h3>
        <p className="text-content-light-dimmed dark:text-content-dark-dimmed">
          {countries.find(c => c.code === country)?.format}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-lg">
            <h3 className="text-xl font-display font-bold mb-4">Location Details</h3>
            <div className="grid gap-4">
              {Object.entries(results).map(([key, value]) => {
                // Skip certain fields from display
                if (['nearbyZips', 'distanceToNearest'].includes(key)) return null;
                
                return (
                  <div key={key} className="flex justify-between">
                    <span className="text-content-light-dimmed dark:text-content-dark-dimmed capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nearby Locations - Only for US/Canada */}
          {(country === 'us' || country === 'ca') && results.nearbyZips && (
            <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
              <h3 className="text-lg font-display font-bold mb-4">Nearby Zip Codes</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {results.nearbyZips.map(zip => (
                  <div key={zip} className="p-3 bg-surface-light dark:bg-surface-dark-hover rounded-lg text-center">
                    <span className="font-medium">{zip}</span>
                  </div>
                ))}
              </div>
              {results.distanceToNearest && (
                <p className="mt-4 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  Distance to nearest: {results.distanceToNearest.toFixed(1)} miles
                </p>
              )}
            </div>
          )}
        </div>
      )}

                {/* Add Affiliate Section before Continue Learning */}
          <div class="w-full md:max-w-4xl mx-auto px-1 md:px-4">
            <AffiliateSection client:load />
          </div>
    </div>
  );
};

export default ZipLookup;