"use client";

import React from "react";
import { useCommonTranslation } from "./hooks/useTranslation";
import LanguageSwitcher from "./components/LanguageSwitcher";

export default function Home() {
  const { t } = useCommonTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Language Switcher */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {String(t("appName"))}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="toggle" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {String(t("welcome"))}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {String(t("tagline"))}
          </p>

          {/* Language Switcher Demo */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Language Switcher Demo
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle
                </span>
                <LanguageSwitcher variant="toggle" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Buttons
                </span>
                <LanguageSwitcher variant="buttons" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Dropdown
                </span>
                <LanguageSwitcher variant="dropdown" />
              </div>
            </div>
          </div>

          {/* Coming Soon Features */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {String(t("comingSoon"))}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>🔐 Authentication</div>
              <div>🛍️ Product Catalog</div>
              <div>❤️ Favorites</div>
              <div>🛒 Shopping Cart</div>
              <div>🌗 Theme Switcher</div>
              <div>📱 Responsive Design</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
