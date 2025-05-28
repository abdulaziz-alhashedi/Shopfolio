'use client';

import React, { useState } from 'react';
import { useLanguageSwitcher, useCommonTranslation } from '@/app/hooks/useTranslation';
import { Language, LANGUAGES, getAllLanguages } from '@/app/lib/i18n';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'toggle' | 'buttons';
  showFlag?: boolean;
  showLabel?: boolean;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  showFlag = true,
  showLabel = true,
  className = '',
}) => {
  const { currentLanguage, switchLanguage, toggleLanguage, getLanguageLabel } = useLanguageSwitcher();
  const { t } = useCommonTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = async (language: Language) => {
    await switchLanguage(language);
    setIsOpen(false);
  };

  const currentLangInfo = LANGUAGES[currentLanguage];
  const allLanguages = getAllLanguages();

  // Toggle variant (simple button)
  if (variant === 'toggle') {
    return (
      <button
        onClick={toggleLanguage}
        className={`
          inline-flex items-center gap-2 px-3 py-2 rounded-md
          bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
          text-gray-700 dark:text-gray-300
          transition-colors duration-200
          ${className}
        `}
        title={t('language.switchTo', { 
          language: getLanguageLabel(currentLanguage === 'en' ? 'ar' : 'en') 
        })}
      >
        {showFlag && (
          <span className="text-lg" role="img" aria-label={currentLangInfo.name}>
            {currentLangInfo.flag}
          </span>
        )}
        {showLabel && (
          <span className="text-sm font-medium">
            {currentLangInfo.code.toUpperCase()}
          </span>
        )}
      </button>
    );
  }

  // Buttons variant (all languages as buttons)
  if (variant === 'buttons') {
    return (
      <div className={`inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 ${className}`}>
        {allLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`
              inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
              transition-all duration-200
              ${currentLanguage === lang.code
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            {showFlag && (
              <span className="text-base" role="img" aria-label={lang.name}>
                {lang.flag}
              </span>
            )}
            {showLabel && lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          inline-flex items-center gap-2 px-3 py-2 rounded-md
          bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
          text-gray-700 dark:text-gray-300
          hover:bg-gray-50 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          transition-colors duration-200
        "
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {showFlag && (
          <span className="text-lg" role="img" aria-label={currentLangInfo.name}>
            {currentLangInfo.flag}
          </span>
        )}
        {showLabel && (
          <span className="text-sm font-medium">
            {getLanguageLabel(currentLanguage)}
          </span>
        )}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="
            absolute right-0 z-20 mt-2 w-48 origin-top-right
            bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-md shadow-lg ring-1 ring-black ring-opacity-5
            focus:outline-none
          ">
            <div className="py-1" role="menu">
              {allLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    w-full text-left px-4 py-2 text-sm
                    flex items-center gap-3
                    transition-colors duration-200
                    ${currentLanguage === lang.code
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                  role="menuitem"
                >
                  <span className="text-base" role="img" aria-label={lang.name}>
                    {lang.flag}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {lang.nativeName}
                    </span>
                  </div>
                  {currentLanguage === lang.code && (
                    <svg
                      className="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
