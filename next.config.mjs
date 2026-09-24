/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: deploys to Vercel (or any static host) as plain files.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
