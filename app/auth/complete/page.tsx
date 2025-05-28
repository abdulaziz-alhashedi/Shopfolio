'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/app/components/AuthProvider';
import { useAuthTranslation, useCommonTranslation } from '@/app/hooks/useTranslation';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

export default function CompleteSignInPage() {
  const { user, completeEmailSignIn, isEmailSignInLink, loading } = useAuthContext();
  const { t } = useAuthTranslation();
  const { t: tCommon } = useCommonTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const completeSignIn = async () => {
      // Check if this is a valid email sign-in link
      if (!isEmailSignInLink()) {
        setError(t('emailLink.invalidLink'));
        return;
      }

      // If user is already signed in, redirect
      if (user) {
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/';
        sessionStorage.removeItem('redirectAfterLogin');
        router.push(redirectUrl);
        return;
      }

      try {
        setIsCompleting(true);
        setError(null);
        
        // Complete the email sign-in
        await completeEmailSignIn();
        setSuccess(true);
        
        // Redirect after a short delay
        setTimeout(() => {
          const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/';
          sessionStorage.removeItem('redirectAfterLogin');
          router.push(redirectUrl);
        }, 2000);
        
      } catch (error: any) {
        console.error('Email sign-in completion error:', error);
        setError(error.message || t('emailLink.invalidLink'));
      } finally {
        setIsCompleting(false);
      }
    };

    // Only run if not already loading and not already successful
    if (!loading && !success) {
      completeSignIn();
    }
  }, [user, loading, success, isEmailSignInLink, completeEmailSignIn, router, t]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher variant="toggle" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {tCommon('appName')}
          </Link>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {isCompleting || loading ? (
              /* Loading State */
              <>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  {t('emailLink.completeSignIn')}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {tCommon('loading')}
                </p>
              </>
            ) : success ? (
              /* Success State */
              <>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  {t('success.signInSuccess')}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Redirecting you to the app...
                </p>
              </>
            ) : error ? (
              /* Error State */
              <>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
                  <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Sign-in Failed
                </h3>
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
                <div className="mt-6 space-y-3">
                  <Link
                    href="/auth/login"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {t('signIn')}
                  </Link>
                  <Link
                    href="/"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {tCommon('back')}
                  </Link>
                </div>
              </>
            ) : (
              /* Default State */
              <>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700">
                  <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Processing Sign-in Link
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Please wait while we verify your sign-in link...
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
