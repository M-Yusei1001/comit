import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 5000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**", "**/next/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
