import React, { useState, useEffect } from 'react';
import zipcodes from 'zipcodes';
import zipcodesPH from 'zipcodes-ph';
import { twZipCodes } from '../data/tw-zip-codes';
import SponsorsSection from './SponsorCard';

const ZipLookup = ({ defaultCountry = '', defaultQuery = '', mode = 'zip-to-address',
  showAffiliate = true
 }) => {
  const [country, setCountry] = useState(defaultCountry);
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  
  // Taiwan specific state
  const [twCity, setTwCity] = useState(Object.keys(twZipCodes)[0]);
  const [twDistrict, setTwDistrict] = useState('');

  const countries = [
    { code: 'us', name: 'United States', format: '12345 or 12345-6789' },
    { code: 'ca', name: 'Canada', format: 'A1A 1A1' },
    { code: 'tw', name: 'Taiwan', format: 'Select city and district' },
    { code: 'ph', name: 'Philippines', format: '1234' }
  ];

  // Handle Taiwan city/district selection
  const handleTwCityChange = (city) => {
    setTwCity(city);
    setTwDistrict('');
    setQuery('');
    setResults(null);
  };

  const handleTwDistrictChange = (district) => {
    setTwDistrict(district);
    const zipCode = twZipCodes[twCity]?.[district];
    if (zipCode) {
      setQuery(zipCode);
      setResults({
        city: twCity,
        district: district,
        zipCode: zipCode,
        country: 'Taiwan'
      });
      updateUrl('tw', zipCode);
    }
  };

  // Handle Taiwan zipcode lookup (reverse lookup)
  const handleTaiwanLookup = (zipCode) => {
    for (const [city, districts] of Object.entries(twZipCodes)) {
      for (const [district, code] of Object.entries(districts)) {
        if (code === zipCode) {
          setTwCity(city);
          setTwDistrict(district);
          setResults({
            city: city,
            district: district,
            zipCode: code,
            country: 'Taiwan'
          });
          return true;
        }
      }
    }
    return false;
  };

  // Separate click handler that updates URL
const handleSearchClick = () => {
  handleSearch();
  updateUrl(country, query);
};

  // Remove updateUrl from handleSearch
const handleSearch = (searchCountry = country, searchQuery = query) => {
  console.log('handleSearch', searchCountry, searchQuery);
  
  setError('');
  setResults(null);
  
  try {
    switch(searchCountry) {
      case 'us':
      case 'ca': {
        const result = zipcodes.lookup(searchQuery);
        console.log(result);
        
        if (result) {
          const nearbyZips = zipcodes.radius(searchQuery, 10);
          const distance = nearbyZips.length > 1 ? 
            zipcodes.distance(searchQuery, nearbyZips[1]) : null;
            
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
      
      case 'tw': {
        if (!handleTaiwanLookup(searchQuery)) {
          setError('Zip code not found');
        }
        break;
      }
      
      case 'ph': {
        const result = zipcodesPH.find(searchQuery);
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

  // Update URL without page reload
  const updateUrl = (country, code) => {
    const url = new URL(window.location);
    url.searchParams.set('country', country);
    url.searchParams.set('code', code);
    window.history.pushState({}, '', url);
  };

  // Simplified useEffects
useEffect(() => {
  // Handle URL params only on initial mount
  const url = new URL(window.location);
  const urlCountry = url.searchParams.get('country');
  const urlCode = url.searchParams.get('code');
  
  if (urlCountry && urlCode) {
    setCountry(urlCountry);
    setQuery(urlCode);
    handleSearch(urlCountry, urlCode);
  }
}, []); // Empty deps array - only runs once

// Country change handler - only clear if user changes country manually
const handleCountryChange = (newCountry) => {
  // Don't reset if this is the initial URL param load
  if (newCountry !== country) {
    setCountry(newCountry);
    setQuery('');
    setResults(null);
    setError('');
  }
};

  // Reset form when country changes (except Taiwan)
  // useEffect(() => {
  //   if (country !== 'tw') {
  //     setQuery('');
  //     setResults(null);
  //     setError('');
  //   }
  // }, [country]);

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Country</label>
            <select
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            >
              <option value="">Select Country</option>
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
                value={twCity}
                onChange={(e) => handleTwCityChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
              >
                {Object.keys(twZipCodes).map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <select
                value={twDistrict}
                onChange={(e) => handleTwDistrictChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
              >
                <option value="">Select District</option>
                {Object.keys(twZipCodes[twCity] || {}).map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                {mode === 'zip-to-address' ? 'Postal Code' : 'Address'}
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-l-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
                  placeholder={countries.find(c => c.code === country)?.format}
                />
                <button
                  onClick={() => handleSearchClick()}
                  className="px-6 py-2 bg-accent-primary text-white rounded-r-lg hover:bg-accent-primary/90"
                >
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
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

            {/* Format Guide */}
      <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
        <h3 className="font-medium mb-2">Format Guide:</h3>
        <p className="text-content-light-dimmed dark:text-content-dark-dimmed">
          {countries.find(c => c.code === country)?.format}
        </p>
      </div>

      {/* Add Affiliate Section */}
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

export default ZipLookup;