"use client";

import React from "react";
import { Header } from "./navbar";

interface PageLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showNavigation?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  headerClassName?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showHeader = true,
  showNavigation = true,
  maxWidth = "7xl",
  padding = "md",
  className = "",
  headerClassName = "",
}) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "",
    sm: "px-4 py-4",
    md: "px-4 sm:px-6 lg:px-8 py-8",
    lg: "px-4 sm:px-6 lg:px-8 py-12",
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      {showHeader && (
        <Header showNavigation={showNavigation} className={headerClassName} />
      )}

      <main
        className={`${maxWidthClasses[maxWidth]} mx-auto ${paddingClasses[padding]}`}
      >
        {children}
      </main>
    </div>
  );
};

// Specific layout variants
export const CenteredLayout: React.FC<{
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}> = ({ children, maxWidth = "lg" }) => (
  <PageLayout
    maxWidth={maxWidth}
    padding="lg"
    className="flex items-center justify-center"
  >
    {children}
  </PageLayout>
);

export default PageLayout;
