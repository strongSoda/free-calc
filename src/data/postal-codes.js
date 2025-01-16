// src/data/postal-codes.js
import { twZipCodes } from './tw-zip-codes';
import { usZipCodes } from './us-zip-codes';
import { caZipCodes } from './ca-zip-codes';
import { phZipCodes } from './ph-zip-codes';

export const getCodeInfo = (country, code) => {
  switch(country) {
    case 'us':
      return usZipCodes[code] ? {
        ...usZipCodes[code],
        formattedName: `${usZipCodes[code].city}, ${usZipCodes[code].state}`
      } : null;
      
    case 'ca':
      return caZipCodes[code] ? {
        ...caZipCodes[code],
        formattedName: `${caZipCodes[code].city}, ${caZipCodes[code].state}`
      } : null;
      
    case 'tw':
      // Convert TW data format to common format
      for (let [city, districts] of Object.entries(twZipCodes)) {
        for (let [district, zip] of Object.entries(districts)) {
          if (zip === code) {
            return {
              city,
              district,
              code: zip,
              formattedName: `${district}, ${city}`
            };
          }
        }
      }
      return null;
      
    case 'ph':
      return phZipCodes[code] ? {
        city: Array.isArray(phZipCodes[code]) ? phZipCodes[code][0] : phZipCodes[code],
        code,
        formattedName: Array.isArray(phZipCodes[code]) 
          ? phZipCodes[code].join(' / ')
          : phZipCodes[code]
      } : null;
      
    default:
      return null;
  }
};

// Get all valid codes for a country
export const getAllCodes = (country) => {
  switch(country) {
    case 'us':
      return Object.keys(usZipCodes);
    case 'ca':
      return Object.keys(caZipCodes);
    case 'tw':
      return [...new Set(
        Object.values(twZipCodes)
          .flatMap(districts => Object.values(districts))
      )];
    case 'ph':
      return Object.keys(phZipCodes);
    default:
      return [];
  }
};

export const countryNames = {
  us: 'United States',
  ca: 'Canada',
  tw: 'Taiwan',
  ph: 'Philippines'
};

export const countryFormats = {
  us: '5 digits (e.g., 12345)',
  ca: 'Letter-Number-Letter Number-Letter-Number (e.g., A1A 1A1)',
  tw: '3 digits (e.g., 100)',
  ph: '4 digits (e.g., 1000)'
};