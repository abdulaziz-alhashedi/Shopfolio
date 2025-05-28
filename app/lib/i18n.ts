// i18n utilities and configuration
import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language types
export type Language = 'en' | 'ar';

// RTL languages
export const RTL_LANGUAGES: Language[] = ['ar'];

// Language configuration
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr' as const,
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl' as const,
  },
} as const;

// Default language
export const DEFAULT_LANGUAGE: Language = 'en';

// Namespaces
export const NAMESPACES = [
  'common',
  'auth',
  'products',
  'navigation',
  'errors',
] as const;

export type Namespace = typeof NAMESPACES[number];

// i18n configuration
const i18nConfig = {
  fallbackLng: DEFAULT_LANGUAGE,
  lng: DEFAULT_LANGUAGE,
  
  ns: NAMESPACES,
  defaultNS: 'common',
  
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
    lookupLocalStorage: 'i18nextLng',
  },
  
  react: {
    useSuspense: false,
  },
  
  debug: process.env.NODE_ENV === 'development',
};

// Initialize i18n only on client side
if (typeof window !== 'undefined') {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nConfig);
}

// Utility functions
export const isRTL = (language: Language): boolean => {
  return RTL_LANGUAGES.includes(language);
};

export const getLanguageDirection = (language: Language): 'ltr' | 'rtl' => {
  return isRTL(language) ? 'rtl' : 'ltr';
};

export const getLanguageInfo = (language: Language) => {
  return LANGUAGES[language];
};

export const getAllLanguages = () => {
  return Object.values(LANGUAGES);
};

export const isValidLanguage = (lang: string): lang is Language => {
  return Object.keys(LANGUAGES).includes(lang);
};

// Browser language detection
export const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const browserLang = navigator.language.split('-')[0];
  return isValidLanguage(browserLang) ? browserLang : DEFAULT_LANGUAGE;
};

// Local storage helpers
export const saveLanguageToStorage = (language: Language): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('i18nextLng', language);
  }
};

export const getLanguageFromStorage = (): Language | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('i18nextLng');
  return stored && isValidLanguage(stored) ? stored : null;
};

export default i18n;
