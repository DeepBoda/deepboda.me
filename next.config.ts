import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],

  /**
   * Fully static output. `next build` writes a plain folder of HTML, CSS, JS
   * and assets to out/ that any web server can host. No Node process needed.
   */
  output: "export",

  /**
   * The default next/image loader needs a server to resize on the fly, which
   * a static host does not have. The source images are already sized and
   * converted to webp, so nothing is lost by serving them as they are.
   */
  images: { unoptimized: true },
};

/* GFM, so the incident timeline in the postmortem renders as a real table.
   Turbopack serialises loader options, so the plugin goes in by name and not
   as an imported function. */
const withMDX = createMDX({
  options: { remarkPlugins: [["remark-gfm", {}]] },
});

export default withMDX(nextConfig);
