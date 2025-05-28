"use client";

import React from "react";
import Link from "next/link";
import { useCommonTranslation } from "./hooks/useTranslation";
import { PageLayout } from "./components/layout";
import LanguageSwitcher from "./components/LanguageSwitcher";

export default function Home() {
  const { t } = useCommonTranslation();

  return (
    <PageLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t("welcome")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {t("tagline")}
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

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Available Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="🔐"
              title="Authentication"
              description="Google & Email Link"
            />
            <FeatureCard
              icon="🛍️"
              title="Product Catalog"
              description="Browse & Search"
            />
            <FeatureCard
              icon="❤️"
              title="Favorites"
              description="Save Products"
            />
            <FeatureCard
              icon="🌍"
              title="Bilingual"
              description="English & Arabic"
            />
            <FeatureCard
              icon="🌗"
              title="Theme Support"
              description="Light & Dark"
            />
            <FeatureCard
              icon="📱"
              title="Responsive"
              description="Mobile Friendly"
            />
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Browse Products
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

// Feature Card Component
const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="text-2xl mb-2">{icon}</div>
    <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);
