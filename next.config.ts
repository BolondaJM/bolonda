import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages deployment
  output: "export",

  // Set base path if deploying to a sub-path (e.g., /bolonda-main)
  // Uncomment and adjust if your repo is NOT a user/org site (username.github.io)
  // basePath: "/bolonda-main",

  // Optimize images for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
