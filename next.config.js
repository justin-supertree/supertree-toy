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
      {
        source: '/404',
        destination: '/404',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
