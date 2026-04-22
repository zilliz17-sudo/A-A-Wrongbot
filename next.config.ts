import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid picking a parent lockfile as workspace root when multiple exist on disk.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
