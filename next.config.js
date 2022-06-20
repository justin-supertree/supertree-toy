/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  basePath: '/notice',

  async redirects() {
    return [
      {
        source: '/detail/:index*',
        destination: '/detail/:index*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
