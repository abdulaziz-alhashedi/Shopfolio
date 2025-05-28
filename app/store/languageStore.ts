'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Language, 
  DEFAULT_LANGUAGE, 
  isValidLanguage, 
  getLanguageDirection,
  saveLanguageToStorage 
} from '@/app/lib/i18n';

interface LanguageState {
  language: Language;
  direction: 'ltr' | 'rtl';
  isLoading: boolean;
}

interface LanguageActions {
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  initializeLanguage: () => void;
}

type LanguageStore = LanguageState & LanguageActions;

// Create the language store with persistence
export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      // Initial state
      language: DEFAULT_LANGUAGE,
      direction: 'ltr',
      isLoading: true,

      // Actions
      setLanguage: (language: Language) => {
        if (!isValidLanguage(language)) {
          console.warn(`Invalid language: ${language}`);
          return;
        }

        const direction = getLanguageDirection(language);
        
        set({
          language,
          direction,
        });

        // Save to localStorage
        saveLanguageToStorage(language);

        // Update document attributes
        if (typeof document !== 'undefined') {
          document.documentElement.lang = language;
          document.documentElement.dir = direction;
        }

        // Update i18next language if available
        if (typeof window !== 'undefined' && window.i18n) {
          window.i18n.changeLanguage(language);
        }
      },

      toggleLanguage: () => {
        const { language } = get();
        const newLanguage: Language = language === 'en' ? 'ar' : 'en';
        get().setLanguage(newLanguage);
      },

      initializeLanguage: () => {
        set({ isLoading: false });
      },
    }),
    {
      name: 'language-storage',
      partialize: (state) => ({
        language: state.language,
        direction: state.direction,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Update document attributes on hydration
          if (typeof document !== 'undefined') {
            document.documentElement.lang = state.language;
            document.documentElement.dir = state.direction;
          }
          
          // Mark as initialized
          state.isLoading = false;
        }
      },
    }
  )
);

// Selector hooks for better performance
export const useCurrentLanguage = () => useLanguageStore((state) => state.language);
export const useLanguageDirection = () => useLanguageStore((state) => state.direction);
export const useLanguageLoading = () => useLanguageStore((state) => state.isLoading);

// Action hooks
export const useLanguageActions = () => useLanguageStore((state) => ({
  setLanguage: state.setLanguage,
  toggleLanguage: state.toggleLanguage,
  initializeLanguage: state.initializeLanguage,
}));
