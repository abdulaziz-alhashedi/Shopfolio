'use client';

import React, { useEffect } from 'react';
import { useLanguageStore } from '@/app/store/languageStore';

interface LanguageWrapperProps {
  children: React.ReactNode;
}

export const LanguageWrapper: React.FC<LanguageWrapperProps> = ({ children }) => {
  const { language, direction, isLoading } = useLanguageStore();

  // Update document attributes when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = direction;
      
      // Add language class to body for CSS targeting
      document.body.className = document.body.className
        .replace(/\blang-\w+\b/g, '') // Remove existing lang classes
        .replace(/\bdir-\w+\b/g, '') // Remove existing dir classes
        + ` lang-${language} dir-${direction}`;
    }
  }, [language, direction]);

  // Show loading state while language is being initialized
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LanguageWrapper;
