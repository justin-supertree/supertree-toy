/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [360, 640, 753, 828, 1024, 1265, 1920, 2048, 3840],
    imageSizes: [8, 16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    loader: 'default',
    domains: ['images.playdapp.com'],
    minimumCacheTTL: 3600,
  },
};

module.exports = nextConfig;
