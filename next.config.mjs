/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — deployable to any static host, and works on Vercel as-is.
  output: "export",
  images: {
    // next/image optimization requires a server; static export needs this off.
    unoptimized: true,
  },
};

export default nextConfig;
