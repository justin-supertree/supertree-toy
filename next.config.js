/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  basePath: '/notice',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/notice',
  //     },
  //   ];
  // },

  async redirects() {
    return [
      // { source: '/notice', destination: '/', permanent: true },
      {
        source: '/detail/:index*',
        destination: '/detail/:index*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
