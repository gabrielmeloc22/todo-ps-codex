/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    minimumCacheTTL: 10,
    remotePatterns: [
      {
        hostname: "csijqjjwpncvmlfjoapu.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
