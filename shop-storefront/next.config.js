const {withStoreConfig} = require('./store-config');
const {withContentlayer} = require('next-contentlayer');
const store = require('./store.config.json');
/**
 * @type {import('next').NextConfig}
 */

const advancedHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];
const nextConfig = {
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: [
      '@medusajs/product',
      '@medusajs/modules-sdk',
    ],

  },
  transpilePackages: ['@mui/system', '@mui/material', '@mui/icons-material'],
  modularizeImports: {
    '@mui/material/?(((\\w*)?/?)*)': {
      transform: '@mui/material/{{ matches.[1] }}/{{member}}',
    },
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
    },
  },
  features: store.features,
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: advancedHeaders,
      },
    ];
  },
};

module.exports = withStoreConfig(withContentlayer(nextConfig));