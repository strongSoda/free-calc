#!/usr/bin/env node
/**
 * scripts/check-hydration.cjs
 *
 *   npm run build && node scripts/check-hydration.cjs dist
 *
 * Astro serialises the props of every `client:*` island into the HTML. Values
 * that cannot survive that trip — functions above all — silently become null,
 * so the page renders fine on the server and then blanks out the moment React
 * hydrates in the browser. A server-side smoke test cannot catch this.
 *
 * This script reads the props Astro actually wrote into each built page and
 * renders the island with them, which reproduces the browser's failure.
 */
const fs = require("fs");
const path = require("path");
const React = require("react");
const { renderToString } = require("react-dom/server");
const esbuild = require(path.resolve(__dirname, "../node_modules/vite/node_modules/esbuild"));

const ROOT = path.resolve(__dirname, "..");
const dist = path.resolve(process.argv[2] || path.join(ROOT, "dist"));

// Islands to check: component file -> the name Astro puts in component-url.
const ISLANDS = [{ name: "GpaLayout", entry: "src/components/GpaLayout.jsx" }];

const decode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'");

// Astro encodes each prop as [typeFlag, value]; unwrap recursively.
const unwrap = (v) => {
  if (Array.isArray(v) && v.length === 2 && typeof v[0] === "number") return unwrap(v[1]);
  if (Array.isArray(v)) return v.map(unwrap);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, unwrap(x)]));
  return v;
};

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === "index.html") out.push(p);
  }
  return out;
};

(async () => {
  if (!fs.existsSync(dist)) {
    console.error(`No build found at ${dist}. Run the build first.`);
    process.exit(1);
  }

  const tmpDir = fs.mkdtempSync(path.join(ROOT, ".hydration-"));
  const failures = [];
  let checked = 0;

  try {
    for (const island of ISLANDS) {
      const outfile = path.join(tmpDir, `${island.name}.cjs`);
      await esbuild.build({
        entryPoints: [path.join(ROOT, island.entry)],
        bundle: true,
        format: "cjs",
        outfile,
        jsx: "automatic",
        platform: "node",
        external: ["react", "react-dom", "lucide-react"],
        logLevel: "error",
      });
      const Component = require(outfile).default;

      for (const file of walk(dist)) {
        const html = fs.readFileSync(file, "utf8");
        const re = new RegExp(
          `component-url="[^"]*${island.name}[^"]*"[\\s\\S]{0,400}?props="([^"]*)"`
        );
        const m = html.match(re) ||
          html.match(new RegExp(`props="([^"]*)"[^>]*component-url="[^"]*${island.name}[^"]*"`));
        if (!m) continue;

        const rel = path.relative(dist, file);
        let props;
        try {
          props = unwrap(JSON.parse(decode(m[1])));
        } catch (e) {
          failures.push(`${rel} — props not parseable: ${e.message}`);
          continue;
        }
        try {
          renderToString(React.createElement(Component, { ...props, children: null }));
          checked++;
        } catch (e) {
          failures.push(`${rel} — ${island.name} threw on hydration: ${e.message}`);
        }
      }
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log(`Islands hydrated successfully: ${checked}`);
  if (failures.length) {
    console.error(`\nHYDRATION FAILURES: ${failures.length}`);
    failures.slice(0, 20).forEach((f) => console.error("  " + f));
    console.error("\nA prop that cannot be serialised (usually a function) is the usual cause.");
    process.exit(1);
  }
  console.log("No hydration failures.");
})();
