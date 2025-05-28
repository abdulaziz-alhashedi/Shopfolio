/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    localeDetection: true,
  },
  
  // Namespace configuration
  ns: ['common', 'auth', 'products', 'navigation', 'errors'],
  defaultNS: 'common',
  
  // Fallback configuration
  fallbackLng: {
    'ar': ['en'],
    'default': ['en']
  },
  
  // Debug mode (disable in production)
  debug: process.env.NODE_ENV === 'development',
  
  // Interpolation configuration
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  
  // Load path for translation files
  localePath: './public/locales',
  
  // Reloading configuration for development
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  
  // Server-side configuration
  serializeConfig: false,
  
  // Use suspense for loading translations
  react: {
    useSuspense: false,
  },
  
  // Backend configuration for loading translations
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  
  // Detection configuration
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
    lookupLocalStorage: 'i18nextLng',
  },
};
