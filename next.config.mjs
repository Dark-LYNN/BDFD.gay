// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.lynnux.xyz',
      },
    ],
  },
  webpack: (config) => {
    // Support for YAML files
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    });
    return config;
  },
  i18n: {
    locales: ['en-US', 'nl-NL', 'tr-TR'],
    defaultLocale: 'en-US',
    localeDetection: false,
  },

};

export default nextConfig;
