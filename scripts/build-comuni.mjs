#!/usr/bin/env node
/**
 * scripts/build-comuni.mjs
 *
 * Regenerates the Belfiore (codice catastale) dataset used by the codice
 * fiscale tools. Run manually when the source data changes:
 *
 *   node scripts/build-comuni.mjs
 *
 * Sources
 * -------
 * 1. @marketto/belfiore-connector-embedded (MIT package; the data itself is
 *    CC BY 4.0 from Agenzia delle Entrate, ISTAT and Ministero dell'Interno).
 *    Provides every Belfiore code ever issued — current comuni, suppressed
 *    comuni, and foreign countries — which is what a reverse lookup needs.
 * 2. matteocontrini/comuni-json (ISTAT-derived). Provides the current official
 *    name, province and population for comuni that still exist, so the search
 *    box shows today's names and can rank big cities first.
 *
 * Output: public/data/comuni-cf.json  (lazy-loaded by the browser)
 *         src/data/comuniTop.js       (small bundled list for pSEO pages)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";
import { execFileSync } from "node:child_process";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const PACKAGE = "@marketto/belfiore-connector-embedded";
const ISTAT_URL = "https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json";

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "comuni-"));

/* ---------------- 1. Belfiore dataset ---------------- */
console.log(`Downloading ${PACKAGE}…`);
const tarball = execFileSync("npm", ["pack", PACKAGE, "--silent"], { cwd: tmp })
  .toString()
  .trim()
  .split("\n")
  .pop();
execFileSync("tar", ["xzf", tarball], { cwd: tmp });

const assetPath = path.join(tmp, "package/asset/cities-countries.ts");
let raw = fs.readFileSync(assetPath, "utf8");
raw = raw
  .replace(/^const CITIES_COUNTRIES = /, "")
  .replace(/;?\s*export default CITIES_COUNTRIES;?\s*$/, "")
  .trim();
if (raw.endsWith(";")) raw = raw.slice(0, -1);
const db = JSON.parse(raw);

// The dataset is column-oriented: fixed-width base-32 fields, index-aligned
// with a pipe-separated name list.
const belfioreFromInt = (n) =>
  String.fromCharCode(Math.floor(n / 1000) + 65) + String(n).slice(-3).padStart(3, "0");
const EPOCH = Date.UTC(1861, 0, 1);
const decodeDate = (chunk) => {
  if (!chunk || !chunk.trim()) return null;
  const days = parseInt(chunk, 32);
  if (!Number.isFinite(days)) return null;
  return new Date(EPOCH + days * 86400000).toISOString().slice(0, 10);
};

const places = [];
for (const ds of db.data) {
  const count = ds.belfioreCode.length / 3;
  const names = ds.name.split("|");
  for (let i = 0; i < count; i++) {
    places.push({
      code: belfioreFromInt(parseInt(ds.belfioreCode.substr(i * 3, 3), 32)),
      prov: ds.provinceOrCountry.substr(i * 2, 2),
      name: names[i],
      expired: decodeDate((ds.expirationDate || "").substr(i * 4, 4)),
    });
  }
}
console.log(`  decoded ${places.length} places`);

/* ---------------- 2. Current ISTAT comuni ---------------- */
console.log("Fetching current ISTAT comuni…");
const istat = await fetch(ISTAT_URL).then((r) => r.json());
console.log(`  ${istat.length} current comuni`);

const current = new Map();
for (const c of istat) {
  current.set(c.codiceCatastale, {
    name: c.nome,
    prov: c.sigla,
    region: c.regione ? c.regione.nome : null,
    population: c.popolazione || 0,
  });
}

/* ---------------- 3. Merge ---------------- */
// One row per (code, name) so historical names stay searchable, but the
// current official name is the one marked active.
const rows = [];
const seen = new Set();

const push = (code, name, prov, active, population) => {
  const key = `${code}|${name.toUpperCase()}`;
  if (seen.has(key)) return;
  seen.add(key);
  rows.push([code, name, prov, active ? 1 : 0, population || 0]);
};

for (const [code, info] of current) {
  push(code, info.name, info.prov, true, info.population);
}
for (const p of places) {
  const isCountry = p.code[0] === "Z";
  const isActiveComune = current.has(p.code);
  if (isCountry) {
    push(p.code, p.name, p.prov, !p.expired, 0);
  } else if (!isActiveComune || p.expired) {
    // A suppressed comune, or an old name for one that still exists.
    push(p.code, p.name, p.prov, false, 0);
  }
}

rows.sort((a, b) => b[3] - a[3] || b[4] - a[4] || a[1].localeCompare(b[1], "it"));

const outDir = path.join(ROOT, "public/data");
fs.mkdirSync(outDir, { recursive: true });
const payload = {
  license: "CC BY 4.0 — Agenzia delle Entrate, ISTAT, Ministero dell'Interno",
  generated: new Date().toISOString().slice(0, 10),
  fields: ["codice", "nome", "provincia", "attivo", "popolazione"],
  rows,
};
fs.writeFileSync(path.join(outDir, "comuni-cf.json"), JSON.stringify(payload));
console.log(`Wrote public/data/comuni-cf.json — ${rows.length} rows`);

/* ---------------- 4. Small bundled list for pSEO pages ---------------- */
const topCities = istat
  .slice()
  .sort((a, b) => (b.popolazione || 0) - (a.popolazione || 0))
  .slice(0, 60)
  .map((c) => ({
    code: c.codiceCatastale,
    name: c.nome,
    prov: c.sigla,
    region: c.regione ? c.regione.nome : null,
    population: c.popolazione || 0,
    slug: c.nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  }));

const banner = `// src/data/comuniTop.js
// Generated by scripts/build-comuni.mjs — do not edit by hand.
// The largest Italian comuni, used for the per-city landing pages.
// Data: ISTAT (CC BY) via matteocontrini/comuni-json; Belfiore codes from
// Agenzia delle Entrate (CC BY 4.0).
`;
fs.writeFileSync(
  path.join(ROOT, "src/data/comuniTop.js"),
  `${banner}export const TOP_COMUNI = ${JSON.stringify(topCities, null, 2)};\n`
);
console.log(`Wrote src/data/comuniTop.js — ${topCities.length} cities`);

fs.rmSync(tmp, { recursive: true, force: true });
