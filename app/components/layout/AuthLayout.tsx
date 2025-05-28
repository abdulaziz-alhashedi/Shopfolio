'use client';

import React from 'react';
import Link from 'next/link';
import LanguageSwitcher from '../LanguageSwitcher';
import { useCommonTranslation } from '@/app/hooks/useTranslation';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showLanguageSwitcher?: boolean;
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showLanguageSwitcher = true,
  className = '',
}) => {
  const { t } = useCommonTranslation();

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${className}`}>
      {/* Language Switcher */}
      {showLanguageSwitcher && (
        <div className="absolute top-4 right-4">
          <LanguageSwitcher variant="toggle" />
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {t('appName')}
          </Link>
        </div>

        {/* Title and Subtitle */}
        {title && (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
