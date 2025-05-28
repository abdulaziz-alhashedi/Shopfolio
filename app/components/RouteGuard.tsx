'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from './AuthProvider';
import { useCommonTranslation } from '@/app/hooks/useTranslation';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/auth/login',
  fallback,
}) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useCommonTranslation();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (loading) {
        return; // Still loading, don't make decisions yet
      }

      if (requireAuth) {
        if (user) {
          setIsAuthorized(true);
        } else {
          // Store the attempted URL for redirect after login
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('redirectAfterLogin', pathname);
          }
          router.push(redirectTo);
        }
      } else {
        // Route doesn't require auth
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, [user, loading, requireAuth, router, redirectTo, pathname]);

  // Show loading state
  if (loading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('loading')}
            </p>
          </div>
        </div>
      )
    );
  }

  // Show unauthorized state
  if (requireAuth && !user && !loading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to be signed in to access this page.
            </p>
            <button
              onClick={() => router.push(redirectTo)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      )
    );
  }

  // Render children if authorized
  if (isAuthorized) {
    return <>{children}</>;
  }

  // Default fallback
  return null;
};

// Higher-order component for protecting pages
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<RouteGuardProps, 'children'>
) => {
  const ProtectedComponent = (props: P) => (
    <RouteGuard {...options}>
      <Component {...props} />
    </RouteGuard>
  );

  ProtectedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  
  return ProtectedComponent;
};

export default RouteGuard;
