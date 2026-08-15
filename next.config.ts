import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // the old insider names. anything already shared keeps working.
  async redirects() {
    return [
      { source: "/uses", destination: "/tools", permanent: true },
      { source: "/colophon", destination: "/how-this-site-is-built", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
