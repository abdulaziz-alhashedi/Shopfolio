'use client';

import { useTranslation as useI18nextTranslation } from 'react-i18next';
import { useLanguageStore } from '@/app/store/languageStore';
import { Language, Namespace } from '@/app/lib/i18n';
import { useEffect } from 'react';

// Custom hook that combines i18next with our language store
export const useTranslation = (namespace: Namespace = 'common') => {
  const { t, i18n } = useI18nextTranslation(namespace);
  const { language, setLanguage } = useLanguageStore();

  // Sync i18next language with our store
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  // Enhanced translation function with fallback
  const translate = (key: string, options?: any): string => {
    try {
      const translation = t(key, options);
      // Ensure we always return a string
      const translationStr = typeof translation === 'string' ? translation : key;

      // If translation is the same as key, it means no translation was found
      if (translationStr === key && namespace !== 'common') {
        // Try to get translation from common namespace as fallback
        const fallback = t(`common:${key}`, options);
        return typeof fallback === 'string' ? fallback : key;
      }
      return translationStr;
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return key;
    }
  };

  return {
    t: translate,
    i18n,
    language,
    setLanguage,
    isReady: i18n.isInitialized,
  };
};

// Hook for common translations
export const useCommonTranslation = () => useTranslation('common');

// Hook for auth translations
export const useAuthTranslation = () => useTranslation('auth');

// Hook for product translations
export const useProductTranslation = () => useTranslation('products');

// Hook for navigation translations
export const useNavigationTranslation = () => useTranslation('navigation');

// Hook for error translations
export const useErrorTranslation = () => useTranslation('errors');

// Hook for multiple namespaces
export const useMultipleTranslations = (namespaces: Namespace[]) => {
  const translations = namespaces.reduce((acc, ns) => {
    acc[ns] = useTranslation(ns);
    return acc;
  }, {} as Record<Namespace, ReturnType<typeof useTranslation>>);

  return translations;
};

// Hook for language switching with user preference sync
export const useLanguageSwitcher = () => {
  const { language, setLanguage, toggleLanguage } = useLanguageStore();
  const { t } = useCommonTranslation();

  const switchLanguage = async (newLanguage: Language) => {
    try {
      setLanguage(newLanguage);

      // TODO: Sync with Firebase user preferences
      // This will be implemented when we integrate with useAuth

      return true;
    } catch (error) {
      console.error('Failed to switch language:', error);
      return false;
    }
  };

  const getLanguageLabel = (lang: Language) => {
    return lang === 'en' ? t('language.english') : t('language.arabic');
  };

  return {
    currentLanguage: language,
    switchLanguage,
    toggleLanguage,
    getLanguageLabel,
  };
};
