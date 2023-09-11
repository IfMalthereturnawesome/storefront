const { withStoreConfig } = require("./store-config");
const { withContentlayer } = require("next-contentlayer");
const store = require("./store.config.json");

const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ["@medusajs/product"],
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "localhost",
      "medusa-server-testing.s3.amazonaws.com",
    ],
  },
};

// Using withContentlayer and withStoreConfig in sequence
module.exports = withStoreConfig(withContentlayer(nextConfig));

console.log("next.config.js", JSON.stringify(module.exports, null, 2));
