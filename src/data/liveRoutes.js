// src/data/liveRoutes.js
// The site is cut down to the RREF calculator and its translations.
//
// Every other page still exists in src/pages, but it is not published:
//   - astro.config.mjs deletes it from dist after the build and keeps it out
//     of the sitemap,
//   - Navbar, Footer, relatedTo() and the 404 page drop links to it,
//   - src/data/redirects.js answers its URLs with 410 Gone.
//
// To bring a section back, add its pattern here and remove its rule from
// GONE in src/data/redirects.js.

const LIVE = [
  /^\/$/, // RREF calculator (English)
  /^\/[a-z]{2}\/$/, // RREF calculator translations (/de/, /es/, ...)
  /^\/calculators\/rref\/[^/]+\/$/, // RREF calculator preset to a matrix size
  /^\/privacy\/$/,
  /^\/404\/$/,
];

// "/calculators/rref/3x3", "/calculators/rref/3x3/index.html" and
// "/calculators/rref/3x3/?a=1" all become "/calculators/rref/3x3/".
export const normalisePath = (href) => {
  let p = String(href).split(/[?#]/)[0];
  p = p.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  return p.endsWith("/") ? p : `${p}/`;
};

/** True for internal paths that are published. External links pass through. */
export const isLive = (href) => {
  if (/^(https?:|mailto:)/.test(href)) return true;
  const p = normalisePath(href);
  return LIVE.some((re) => re.test(p));
};
