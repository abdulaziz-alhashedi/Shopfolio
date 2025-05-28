import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Internationalization configuration
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  // External packages for server components
  serverExternalPackages: ['i18next', 'react-i18next'],

  // Image configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
