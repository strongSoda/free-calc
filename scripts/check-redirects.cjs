#!/usr/bin/env node
/**
 * scripts/check-redirects.cjs
 *
 *   node scripts/check-redirects.cjs dist [urls.txt ...]
 *
 * Every URL passed in must either still exist as a built page or be matched by
 * a rule in public/_redirects. Anything else would become a hard 404 for a URL
 * Google already knows about.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const dist = path.resolve(process.argv[2] || path.join(ROOT, "dist"));
const listFiles = process.argv.slice(3);

// Parse the [[redirects]] blocks out of netlify.toml into matchers.
const toml = fs.readFileSync(path.join(ROOT, "netlify.toml"), "utf8");
const rules = [...toml.matchAll(/\[\[redirects\]\]\s*\n\s*from\s*=\s*"([^"]+)"\s*\n\s*to\s*=\s*"([^"]+)"\s*\n\s*status\s*=\s*(\d+)/g)]
  .map((m) => {
    const [, from, to, code] = m;
    if (!from || !to) return null;
    // /a/*  ->  ^/a/.*   |   /a/:x/:y -> ^/a/[^/]+/[^/]+
    const pattern =
      "^" +
      from
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\/:[A-Za-z_][A-Za-z0-9_]*/g, "/[^/]+")
        .replace(/\*/g, ".*") +
      "/?$";
    return { from, to, code: code || "301", re: new RegExp(pattern) };
  })
  .filter(Boolean);

if (!rules.length) {
  console.error("No redirect rules found in netlify.toml — refusing to pass.");
  process.exit(1);
}

// Both files must carry the same rules: a git build reads netlify.toml, a
// manual dist upload reads dist/_redirects, and we cannot tell which is used.
const fileRules = fs
  .readFileSync(path.join(ROOT, "public/_redirects"), "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => l.split(/\s+/)[0]);
const tomlFroms = rules.map((r) => r.from);
const missing = tomlFroms.filter((f) => !fileRules.includes(f));
const extra = fileRules.filter((f) => !tomlFroms.includes(f));
if (missing.length || extra.length) {
  console.error("netlify.toml and public/_redirects disagree.");
  missing.forEach((m) => console.error("  only in netlify.toml: " + m));
  extra.forEach((e) => console.error("  only in _redirects:    " + e));
  console.error("Run: node scripts/build-redirects.mjs");
  process.exit(1);
}
// A rule whose target is its own pattern minus the splat is circular:
// `/a/*` matches `/a/` with an empty splat and `/a` normalises back to `/a/`.
// Netlify drops these silently, which is exactly how the retired URLs ended
// up 404ing instead of redirecting.
const circular = rules.filter((r) => r.from.endsWith("/*") && r.from.slice(0, -2) === r.to);
if (circular.length) {
  console.error(`${circular.length} circular redirect rule(s) — Netlify will drop these:`);
  circular.forEach((r) => console.error(`  ${r.from} -> ${r.to}`));
  console.error("Expand them to /base/:seg and /base/:seg/* instead.");
  process.exit(1);
}

console.log(`Rules in sync across netlify.toml and public/_redirects: ${rules.length}`);

const exists = (urlPath) => {
  const clean = urlPath.replace(/\/$/, "");
  return (
    fs.existsSync(path.join(dist, clean, "index.html")) ||
    fs.existsSync(path.join(dist, clean + ".html")) ||
    (clean === "" && fs.existsSync(path.join(dist, "index.html")))
  );
};

const urls = new Set();
for (const f of listFiles) {
  for (const line of fs.readFileSync(f, "utf8").split("\n")) {
    const m = line.match(/https?:\/\/[^,\s"]+/);
    if (m) urls.add(m[0]);
  }
}

let live = 0, redirected = 0;
const orphans = [];
for (const url of urls) {
  let p;
  try { p = new URL(url).pathname; } catch { continue; }
  if (exists(p)) { live++; continue; }
  const rule = rules.find((r) => r.re.test(p));
  if (rule) { redirected++; continue; }
  orphans.push(p);
}

console.log(`URLs checked:      ${urls.size}`);
console.log(`still live:        ${live}`);
console.log(`covered by 301:    ${redirected}`);
console.log(`WOULD 404:         ${orphans.length}`);
if (orphans.length) {
  const groups = {};
  orphans.forEach((o) => {
    const k = o.split("/").slice(0, 4).join("/");
    groups[k] = (groups[k] || 0) + 1;
  });
  Object.entries(groups).sort((a, b) => b[1] - a[1]).slice(0, 15)
    .forEach(([k, v]) => console.log(`   ${String(v).padStart(5)}  ${k}`));
  process.exit(1);
}
console.log("Every known URL is either live or redirected.");
