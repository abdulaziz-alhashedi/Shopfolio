"use client";

import React from "react";
import Link from "next/link";
import { useAuthContext } from "@/app/components/AuthProvider";
import { useCommonTranslation } from "@/app/hooks/useTranslation";
import RouteGuard from "@/app/components/RouteGuard";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import UserMenu from "@/app/components/UserMenu";

function SettingsPageContent() {
  const { loading } = useAuthContext();
  const { t } = useCommonTranslation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const settingsItems = [
    {
      title: "Profile",
      description: "Manage your personal information and preferences",
      href: "/profile",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Language & Region",
      description: "Change your language and regional preferences",
      href: "/profile",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      ),
    },
    {
      title: "Notifications",
      description: "Manage your notification preferences",
      href: "#",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM16 3h5v5h-5V3zM4 3h6v6H4V3z"
          />
        </svg>
      ),
      comingSoon: true,
    },
    {
      title: "Privacy & Security",
      description: "Control your privacy and security settings",
      href: "#",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      comingSoon: true,
    },
    {
      title: "Theme",
      description: "Switch between light and dark themes",
      href: "/profile",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
    },
    {
      title: "Help & Support",
      description: "Get help and contact support",
      href: "#",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">


      <div>

      {/* Header */}
      
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="toggle" />
              <UserMenu />
            </div>
          </div>
      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Settings List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {settingsItems.map((item, index) => (
              <div key={index} className="px-6 py-4">
                {item.comingSoon ? (
                  <div className="flex items-center justify-between opacity-60">
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-400 dark:text-gray-500">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {t("comingSoon")}
                    </span>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 -mx-6 px-6 py-4 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-600 dark:text-gray-400">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Account Actions */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Account Actions
            </h4>
            <div className="space-y-2">
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Download your data
              </button>
              <br />
              <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                Delete account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <RouteGuard requireAuth={true}>
      <SettingsPageContent />
    </RouteGuard>
  );
}
