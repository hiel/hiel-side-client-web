/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NEXT_PUBLIC_USE_STRICT_MODE === true && process.env.NEXT_PUBLIC_ENVIRONMENT === "local",
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
}

export default nextConfig
