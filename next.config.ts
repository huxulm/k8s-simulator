import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/k8s-simulator",
  distDir: "build",
};

export default nextConfig;
