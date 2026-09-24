import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain static files in `out/` — deployable on any static host (Vercel, Netlify, GitHub Pages…).
  output: "export",
  poweredByHeader: false,
  // Pin the workspace root: a parent folder also contains a lockfile.
  turbopack: { root: __dirname },
  reactStrictMode: true,
  // The default image optimizer needs a server; static export serves images as-is.
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["lucide-react", "simple-icons"],
  },
};

export default nextConfig;
