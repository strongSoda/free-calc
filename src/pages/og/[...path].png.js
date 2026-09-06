// src/pages/og/[...path].png.js
// Static endpoint: one Open Graph PNG per calculator page, rendered at build
// time. The route mirrors the page path, so /calculators/rref/3x3 gets its
// card at /og/calculators/rref/3x3.png.
import { OG_PAGES, ogSlugForPath } from "../../data/ogPages.js";
import { renderOgImage } from "../../utils/ogImage.js";

export async function getStaticPaths() {
  return OG_PAGES.map((page) => ({
    params: { path: ogSlugForPath(page.path) },
    props: { page },
  }));
}

export async function GET({ props }) {
  const png = await renderOgImage(props.page);
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
