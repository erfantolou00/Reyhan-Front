/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
      domains: ['localhost', 'sadodin.ir'],
    },
    output: 'standalone', // اگر برای استقرار تنظیم کردی
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://sadodin.ir' : '',
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/video/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  