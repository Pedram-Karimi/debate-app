/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        // pathname: "/account123/**",
      },
    ],
  },
  // images: { unoptimized: true },
};

module.exports = nextConfig;
