import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Produces a minimal, self-contained server bundle (only the files needed
  // at runtime) — what the Dockerfile's runtime stage is built around.
  output: "standalone",
};

export default nextConfig;
