import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 200,
        ignored: ["node_modules"],
      };
    }
    return config;
  },
};

export default nextConfig;
