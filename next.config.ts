import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  images: { unoptimized: true },
  output: "export",
  distDir: 'out',
  // swcMinify: true
};

export default nextConfig;
