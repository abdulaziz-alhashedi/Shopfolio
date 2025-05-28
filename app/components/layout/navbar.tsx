"use client";

import React from "react";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import UserMenu from "../UserMenu";
import { useCommonTranslation } from "@/app/hooks/useTranslation";

interface HeaderProps {
  showNavigation?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  showNavigation = true,
  className = "",
}) => {
  const { t } = useCommonTranslation();

  return (
    <header
      className={`bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              {t("appName")}
            </Link>
          </div>

          {showNavigation && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/products"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Products
              </Link>
              <Link
                href="/favorites"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Favorites
              </Link>
            </nav>
          )}

          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="toggle" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
