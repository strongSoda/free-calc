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
// Why these exist: the site is cut down to the RREF calculator (see
// src/data/liveRoutes.js). Everything else is answered with 410 Gone so Google
// drops it instead of treating the domain as scaled low-value content.
//
// These rules are not forced, so a file that exists still wins: the RREF size
// pages under /calculators/rref/ and their cards under /og/ keep serving.

const GONE = [
  // Every calculator except the RREF size pages
  "/calculators",
  "/calculators/*",

  // Blog, tools and one-off pages
  "/blog",
  "/blog/*",
  "/tools",
  "/tools/*",
  "/hackathon",
  "/sitemap",
  "/test.html",

  // Italian codice fiscale section (/it/ itself is the Italian RREF page)
  "/it/codice-fiscale",
  "/it/codice-fiscale/*",

  // Open Graph cards for the pages above
  "/og/*",
];

export const REDIRECTS = GONE.map((from) => ({ from, to: "/404.html", status: 410 }));
