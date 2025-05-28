'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/app/lib/i18n';
import { useLanguageStore } from '@/app/store/languageStore';
import { detectBrowserLanguage, getLanguageFromStorage } from '@/app/lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { setLanguage, initializeLanguage } = useLanguageStore();

  useEffect(() => {
    const initializeI18n = async () => {
      try {
        // Initialize i18next if not already done
        if (!i18n.isInitialized) {
          await i18n.init();
        }

        // Determine initial language
        let initialLanguage = getLanguageFromStorage();
        
        if (!initialLanguage) {
          // Fallback to browser language detection
          initialLanguage = detectBrowserLanguage();
        }

        // Set the language in our store
        setLanguage(initialLanguage);
        
        // Change i18next language
        await i18n.changeLanguage(initialLanguage);
        
        // Mark as initialized
        initializeLanguage();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        // Fallback to default state
        initializeLanguage();
        setIsInitialized(true);
      }
    };

    initializeI18n();
  }, [setLanguage, initializeLanguage]);

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;
