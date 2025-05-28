'use client';

import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: 'search' | 'heart' | 'box' | 'star' | 'custom';
  customIcon?: React.ReactNode;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'box',
  customIcon,
  actionText,
  actionHref,
  onAction,
  className = '',
}) => {
  const getIcon = () => {
    if (customIcon) return customIcon;

    const iconClasses = "mx-auto h-12 w-12 text-gray-400";
    
    switch (icon) {
      case 'search':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'star':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      default: // box
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
    }
  };

  const ActionButton = () => {
    if (!actionText) return null;

    const buttonClasses = "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors";

    if (actionHref) {
      return (
        <Link href={actionHref} className={buttonClasses}>
          {actionText}
        </Link>
      );
    }

    if (onAction) {
      return (
        <button onClick={onAction} className={buttonClasses}>
          {actionText}
        </button>
      );
    }

    return null;
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      {getIcon()}
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
      {(actionText && (actionHref || onAction)) && (
        <div className="mt-6">
          <ActionButton />
        </div>
      )}
    </div>
  );
};

// Specific empty state components
export const NoSearchResults: React.FC<{ 
  query?: string;
  onClear?: () => void;
}> = ({ query, onClear }) => (
  <EmptyState
    icon="search"
    title="No results found"
    description={query ? `No results found for "${query}"` : "Try adjusting your search criteria"}
    actionText={onClear ? "Clear search" : undefined}
    onAction={onClear}
  />
);

export const NoFavorites: React.FC = () => (
  <EmptyState
    icon="heart"
    title="No favorites yet"
    description="Start browsing products and add them to your favorites!"
    actionText="Browse Products"
    actionHref="/products"
  />
);

export const NoProducts: React.FC = () => (
  <EmptyState
    icon="box"
    title="No products available"
    description="Check back later for new products"
  />
);

export default EmptyState;
