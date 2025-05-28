'use client';

import React from 'react';
import { useCommonTranslation } from '@/app/hooks/useTranslation';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  showText?: boolean;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  showText = true,
  fullScreen = false,
  className = '',
}) => {
  const { t } = useCommonTranslation();

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const containerClasses = fullScreen
    ? 'flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900'
    : 'flex items-center justify-center';

  const displayText = text || t('loading');

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <div
          className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
        />
        {showText && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {displayText}
          </p>
        )}
      </div>
    </div>
  );
};

// Specific loading components for common use cases
export const FullScreenLoader: React.FC<{ text?: string }> = ({ text }) => (
  <LoadingSpinner fullScreen size="lg" text={text} />
);

export const InlineLoader: React.FC<{ text?: string; size?: 'sm' | 'md' }> = ({ 
  text, 
  size = 'sm' 
}) => (
  <LoadingSpinner size={size} text={text} showText={!!text} />
);

export const PageLoader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex items-center justify-center py-12">
    <LoadingSpinner size="md" text={text} />
  </div>
);

export default LoadingSpinner;
