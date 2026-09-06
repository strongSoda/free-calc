// src/utils/ogImage.js
// Build-time Open Graph image generation.
// satori lays the card out with real font metrics and emits SVG with the text
// already converted to paths, then sharp rasterises it to PNG — so the result
// needs no fonts installed wherever it is rendered.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import sharp from "sharp";

// Astro bundles this module into dist/ before running it, so a path relative
// to import.meta.url no longer points at src/. Resolve from the project root
// first and keep the relative path as a fallback for dev/test runs.
const FONT_DIRS = [
  path.resolve(process.cwd(), "src/assets/fonts"),
  fileURLToPath(new URL("../assets/fonts/", import.meta.url)),
];

const readFont = (file) => {
  for (const dir of FONT_DIRS) {
    const candidate = path.join(dir, file);
    if (fs.existsSync(candidate)) return fs.readFileSync(candidate);
  }
  throw new Error(
    `OG font "${file}" not found. Looked in: ${FONT_DIRS.join(", ")}`
  );
};

let fontCache = null;
const fonts = () => {
  if (!fontCache) {
    fontCache = [
      { name: "Space Grotesk", data: readFont("grotesk-bold.ttf"), weight: 700, style: "normal" },
      { name: "Inter", data: readFont("inter-bold.ttf"), weight: 700, style: "normal" },
      { name: "Inter", data: readFont("inter-regular.ttf"), weight: 400, style: "normal" },
    ];
  }
  return fontCache;
};

export const WIDTH = 1200;
export const HEIGHT = 630;

const COLORS = {
  background: "#0f172a",
  surface: "#1e293b",
  text: "#f8fafc",
  dim: "#94a3b8",
  primary: "#0ea5e9",
  secondary: "#8b5cf6",
};

/**
 * satori accepts plain element objects, so no JSX build step is needed.
 * It also insists every div declares a display, so default it to flex here
 * rather than repeating it on every node.
 */
const el = (type, props = {}, children = []) => {
  const list = (Array.isArray(children) ? children : [children]).filter(
    (c) => c !== null && c !== undefined && c !== false && c !== ""
  );
  const style = type === "div" ? { display: "flex", ...(props.style || {}) } : props.style;
  return { type, props: { ...props, style, children: list } };
};

/**
 * Titles are the one thing that can overflow, so scale the type down a step
 * at a time rather than letting a long heading get clipped.
 */
const titleSize = (title) => {
  const n = title.length;
  if (n <= 26) return 74;
  if (n <= 36) return 62;
  if (n <= 52) return 52;
  if (n <= 72) return 45;
  if (n <= 95) return 39;
  return 35;
};

const truncate = (value, max) => {
  const s = String(value ?? "").trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
};

/**
 * Renders one OG card.
 * @param {{eyebrow?: string, title: string, subtitle?: string, badge?: string}} spec
 * @returns {Promise<Buffer>} PNG bytes
 */
export const renderOgImage = async (spec) => {
  const title = truncate(spec.title, 110);
  const subtitle = spec.subtitle ? truncate(spec.subtitle, 120) : null;
  const eyebrow = spec.eyebrow ? truncate(spec.eyebrow, 40).toUpperCase() : null;
  const badge = spec.badge ? truncate(spec.badge, 32) : "rref-calculator.com";

  const tree = el(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: COLORS.background,
        // A soft brand wash in the top-right, echoing the site's gradients.
        backgroundImage: `radial-gradient(circle at 88% 8%, ${COLORS.secondary}40 0%, transparent 45%), radial-gradient(circle at 6% 92%, ${COLORS.primary}33 0%, transparent 42%)`,
        padding: "64px 72px",
        fontFamily: "Inter",
      },
    },
    [
      // Top bar: the accent rule plus the section label
      el("div", { style: { display: "flex", alignItems: "center", gap: "18px" } }, [
        el("div", {
          style: {
            width: "72px",
            height: "10px",
            borderRadius: "5px",
            backgroundImage: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
          },
        }),
        eyebrow &&
          el(
            "div",
            {
              style: {
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "3px",
                color: COLORS.primary,
              },
            },
            eyebrow
          ),
      ]),

      // The heading, and the answer or summary underneath
      el(
        "div",
        {
          style: {
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
            gap: "28px",
            paddingTop: "18px",
            paddingBottom: "18px",
          },
        },
        [
        el(
          "div",
          {
            style: {
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: `${titleSize(title)}px`,
              lineHeight: 1.15,
              color: COLORS.text,
              display: "flex",
            },
          },
          title
        ),
        subtitle &&
          el(
            "div",
            {
              style: {
                fontSize: "32px",
                lineHeight: 1.35,
                color: "#cbd5e1",
                borderLeft: `6px solid ${COLORS.secondary}`,
                paddingLeft: "22px",
              },
            },
            subtitle
          ),
        ]
      ),

      // Footer: site identity and the promise every page keeps
      el(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${COLORS.surface}`,
            paddingTop: "26px",
          },
        },
        [
          el(
            "div",
            { style: { display: "flex", fontSize: "27px", fontWeight: 700, color: COLORS.text } },
            badge
          ),
          el(
            "div",
            { style: { display: "flex", fontSize: "24px", color: COLORS.dim } },
            "Free · step-by-step · no sign-up"
          ),
        ]
      ),
    ]
  );

  const svg = await satori(tree, { width: WIDTH, height: HEIGHT, fonts: fonts() });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
};
