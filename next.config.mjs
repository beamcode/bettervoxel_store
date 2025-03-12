import { createMDX } from "fumadocs-mdx/next"
import dotenv from "dotenv"
dotenv.config()

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  experimental: {
    mdxRs: true, // Use the Rust-based MDX loader for Turbopack compatibility
  },
  env: {
    NEXT_TELEMETRY_DISABLED: "1",
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/play",
        permanent: true, // Set to false if you want a temporary redirect
      },
    ]
  },
}

export default withMDX(nextConfig)
