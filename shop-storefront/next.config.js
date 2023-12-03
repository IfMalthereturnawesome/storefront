const {withStoreConfig} = require('./store-config');
const {withContentlayer} = require('next-contentlayer');
const store = require('./store.config.json');
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [
      '@medusajs/product',
      '@medusajs/modules-sdk',
    ],

  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: [
      'medusa-public-images.s3.eu-west-1.amazonaws.com',
      'localhost',
      'medusa-server-testing.s3.amazonaws.com',
    ],
  },
};

module.exports = withStoreConfig(withContentlayer(nextConfig));

console.log('next.config.js', JSON.stringify(module.exports, null, 2));