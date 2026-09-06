// src/data/redirects.js
// Single source of truth for the redirect rules.
//
// scripts/build-redirects.mjs writes these into BOTH netlify.toml and
// public/_redirects. Both destinations are needed because the two deploy paths
// read different files:
//
//   git-based build   -> netlify.toml is read as build config
//   manual dist upload -> only dist/_redirects travels with the files
//
// Keeping identical rules in both removes the precedence trap (netlify.toml is
// processed first) because whichever wins produces the same result.
//
// Why these exist: the routes below generated thousands of near-identical
// pages that earned 1 click in three months while Google left ~4,850 of them
// unindexed. They are consolidated into the parent tool.

export const REDIRECTS = [
  // Quadratic equation: /a/b/c combinations
  ["/calculators/quadratic-equation/*", "/calculators/quadratic-equation"],

  // Volume: per-shape unit/dimension pages (shape hubs are kept)
  ["/calculators/volume/cone/*", "/calculators/volume/cone"],
  ["/calculators/volume/cube/*", "/calculators/volume/cube"],
  ["/calculators/volume/cuboid/*", "/calculators/volume/cuboid"],
  ["/calculators/volume/cylinder/*", "/calculators/volume/cylinder"],
  ["/calculators/volume/hemisphere/*", "/calculators/volume/hemisphere"],
  ["/calculators/volume/prism/*", "/calculators/volume/prism"],
  ["/calculators/volume/pyramid/*", "/calculators/volume/pyramid"],
  ["/calculators/volume/sphere/*", "/calculators/volume/sphere"],

  // Subnet: per-network/CIDR pages
  ["/calculators/subnet/ipv4/*", "/calculators/subnet/ipv4"],
  ["/calculators/subnet/ipv6/*", "/calculators/subnet/ipv6"],

  // GPA conversions: per-scale/value pages
  ["/calculators/percentage-to-gpa/*", "/calculators/percentage-to-gpa"],
  ["/calculators/gpa-to-percentage/*", "/calculators/gpa-to-percentage"],

  // Pregnancy: per-method, per-date, per-week and per-month pages
  ["/calculators/pregnancy/due-date/*", "/calculators/pregnancy"],
  ["/calculators/pregnancy/week/*", "/calculators/pregnancy"],
  ["/calculators/pregnancy/month/*", "/calculators/pregnancy"],
  ["/calculators/pregnancy/*", "/calculators/pregnancy"],

  // Power: per-value pages. The 43 conversion-pair hubs still exist as files
  // and static files win over redirects, so this only catches the deeper URLs.
  ["/calculators/power/:pair/*", "/calculators/power/:pair"],
  ["/calculators/power/*", "/calculators/power"],

  // Fractions and roman numerals: per-value pages (sub-hubs are kept)
  ["/calculators/fractions/decimal-to-fraction/*", "/calculators/fractions/decimal-to-fraction"],
  ["/calculators/fractions/fraction-to-decimal/*", "/calculators/fractions/fraction-to-decimal"],
  ["/calculators/roman-numerals/number-to-roman/*", "/calculators/roman-numerals/number-to-roman"],
  ["/calculators/roman-numerals/roman-to-number/*", "/calculators/roman-numerals/roman-to-number"],

  // Per-combination pages
  ["/calculators/tip-calculator/*", "/calculators/tip-calculator"],
  ["/calculators/body-fat/*", "/calculators/body-fat"],
  ["/calculators/love-calculator/*", "/calculators/love-calculator"],
  ["/calculators/period/*", "/calculators/period"],
  ["/calculators/dice-roller/*", "/calculators/dice-roller"],

  // IP lookup: per-IP and per-language pages
  ["/calculators/ip-lookup/languages/*", "/calculators/ip-lookup"],
  ["/calculators/ip-lookup/*", "/calculators/ip-lookup"],

  // Zip lookup: legacy per-code URLs (country hubs are kept)
  ["/calculators/zip-lookup/:country/:code", "/calculators/zip-lookup/:country"],

  // BMI: per-age and legacy metric/imperial URLs
  ["/calculators/bmi/age/*", "/calculators/bmi"],
  ["/calculators/bmi/metric/*", "/calculators/bmi"],
  ["/calculators/bmi/imperial/*", "/calculators/bmi"],

  // Mortgage was linked with a ?homePrice= query string
  ["/calculators/mortgage/index.html", "/calculators/mortgage"],
].map(([from, to]) => ({ from, to, status: 301 }));
