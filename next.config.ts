import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Internationalization configuration
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: true,
  },

  // Enable experimental features for better i18n support
  experimental: {
    // Enable server components with i18n
    serverComponentsExternalPackages: ['i18next', 'react-i18next'],
  },
};

export default nextConfig;
