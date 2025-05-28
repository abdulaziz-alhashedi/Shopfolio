'use client';

import React from 'react';
import { useCommonTranslation } from '@/app/hooks/useTranslation';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
  retryText?: string;
  backText?: string;
  showRetry?: boolean;
  showBack?: boolean;
  fullScreen?: boolean;
  className?: string;
  icon?: 'error' | 'warning' | 'notFound';
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
  onBack,
  retryText,
  backText,
  showRetry = true,
  showBack = false,
  fullScreen = false,
  className = '',
  icon = 'error',
}) => {
  const { t } = useCommonTranslation();

  const containerClasses = fullScreen
    ? 'flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900'
    : 'text-center py-12';

  const defaultTitle = title || t('error.general');
  const defaultMessage = message || t('error.tryAgain');
  const defaultRetryText = retryText || t('retry');
  const defaultBackText = backText || t('back');

  const getIcon = () => {
    switch (icon) {
      case 'warning':
        return (
          <svg
            className="mx-auto h-12 w-12 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case 'notFound':
        return (
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="max-w-md mx-auto">
        {getIcon()}
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {defaultTitle}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {defaultMessage}
        </p>
        {(showRetry || showBack) && (
          <div className="mt-6 space-x-3">
            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                {defaultRetryText}
              </button>
            )}
            {showBack && onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
              >
                {defaultBackText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Specific error components for common use cases
export const NotFoundError: React.FC<{ 
  title?: string; 
  message?: string; 
  onBack?: () => void;
}> = ({ title, message, onBack }) => (
  <ErrorState
    title={title || "Not Found"}
    message={message || "The requested resource was not found"}
    icon="notFound"
    showRetry={false}
    showBack={!!onBack}
    onBack={onBack}
  />
);

export const NetworkError: React.FC<{ 
  onRetry?: () => void;
  message?: string;
}> = ({ onRetry, message }) => (
  <ErrorState
    title="Connection Error"
    message={message || "Please check your internet connection"}
    onRetry={onRetry}
    showRetry={!!onRetry}
  />
);

export default ErrorState;
