'use client';

import React, { useState } from 'react';
import { useAuthContext } from '@/app/components/AuthProvider';
import { useAuthTranslation, useCommonTranslation } from '@/app/hooks/useTranslation';
import { useLanguageStore } from '@/app/store/languageStore';
import { Language, LANGUAGES } from '@/app/lib/i18n';
import RouteGuard from '@/app/components/RouteGuard';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import UserMenu from '@/app/components/UserMenu';
import Link from 'next/link';

function ProfilePageContent() {
  const { user, updateUserProfile, loading } = useAuthContext();
  const { t } = useAuthTranslation();
  const { t: tCommon } = useCommonTranslation();
  const { language } = useLanguageStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    preferredLanguage: user?.preferredLanguage || language,
    theme: user?.theme || 'light',
  });
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      setSaveMessage(null);

      await updateUserProfile({
        name: formData.name,
        preferredLanguage: formData.preferredLanguage as Language,
        theme: formData.theme as 'light' | 'dark',
      });

      setIsEditing(false);
      setSaveMessage(t('profile.profileUpdated'));
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      preferredLanguage: user?.preferredLanguage || language,
      theme: user?.theme || 'light',
    });
    setIsEditing(false);
    setSaveMessage(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                {tCommon('appName')}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="toggle" />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('profile.title')}
              </h1>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {tCommon('edit')}
                </button>
              )}
            </div>
          </div>

          {/* Success Message */}
          {saveMessage && (
            <div className="mx-6 mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
              <p className="text-sm text-green-700 dark:text-green-400">{saveMessage}</p>
            </div>
          )}

          {/* Profile Content */}
          <div className="px-6 py-6 space-y-6">
            {/* User Avatar */}
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('profile.name')}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{user?.name}</p>
                )}
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('email')}
                </label>
                <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Language
                </label>
                {isEditing ? (
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {Object.entries(LANGUAGES).map(([code, lang]) => (
                      <option key={code} value={code}>
                        {lang.flag} {lang.name} ({lang.nativeName})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {LANGUAGES[user?.preferredLanguage || 'en'].flag}{' '}
                    {LANGUAGES[user?.preferredLanguage || 'en'].name}
                  </p>
                )}
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </label>
                {isEditing ? (
                  <select
                    value={formData.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="light">{tCommon('theme.light')}</option>
                    <option value="dark">{tCommon('theme.dark')}</option>
                  </select>
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {tCommon(`theme.${user?.theme || 'light'}`)}
                  </p>
                )}
              </div>
            </div>

            {/* Account Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Account Information
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Member Since
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user?.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Favorites
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user?.favorites?.length || 0} items
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                >
                  {tCommon('cancel')}
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                >
                  {isSaving ? tCommon('loading') : tCommon('save')}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <RouteGuard requireAuth={true}>
      <ProfilePageContent />
    </RouteGuard>
  );
}
