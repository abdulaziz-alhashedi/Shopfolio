'use client';

import React from 'react';

interface StatusMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
  showIcon?: boolean;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  title,
  message,
  onDismiss,
  className = '',
  showIcon = true,
}) => {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800',
          text: 'text-green-700 dark:text-green-400',
          icon: 'text-green-600 dark:text-green-400',
        };
      case 'error':
        return {
          container: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800',
          text: 'text-red-700 dark:text-red-400',
          icon: 'text-red-600 dark:text-red-400',
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800',
          text: 'text-yellow-700 dark:text-yellow-400',
          icon: 'text-yellow-600 dark:text-yellow-400',
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800',
          text: 'text-blue-700 dark:text-blue-400',
          icon: 'text-blue-600 dark:text-blue-400',
        };
    }
  };

  const getIcon = () => {
    if (!showIcon) return null;

    const iconClasses = `h-5 w-5 ${getStyles().icon}`;

    switch (type) {
      case 'success':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const styles = getStyles();

  return (
    <div className={`rounded-lg p-4 ${styles.container} ${className}`}>
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
        )}
        <div className={showIcon ? 'ml-3' : ''}>
          {title && (
            <h3 className={`text-sm font-medium ${styles.text}`}>
              {title}
            </h3>
          )}
          <div className={`${title ? 'mt-2' : ''} text-sm ${styles.text}`}>
            {message}
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 ${styles.text} hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600`}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Specific status message components
export const SuccessMessage: React.FC<Omit<StatusMessageProps, 'type'>> = (props) => (
  <StatusMessage type="success" {...props} />
);

export const ErrorMessage: React.FC<Omit<StatusMessageProps, 'type'>> = (props) => (
  <StatusMessage type="error" {...props} />
);

export const WarningMessage: React.FC<Omit<StatusMessageProps, 'type'>> = (props) => (
  <StatusMessage type="warning" {...props} />
);

export const InfoMessage: React.FC<Omit<StatusMessageProps, 'type'>> = (props) => (
  <StatusMessage type="info" {...props} />
);

export default StatusMessage;
