"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/components/AuthProvider";
import {
  useAuthTranslation,
  useCommonTranslation,
} from "@/app/hooks/useTranslation";
import { AuthLayout } from "@/app/components/layout";
import { FullScreenLoader, ErrorMessage } from "@/app/components/ui";

export default function LoginPage() {
  const { user, signInWithGoogle, sendSignInLink, loading, error } =
    useAuthContext();
  const { t } = useAuthTranslation();
  const { t: tCommon } = useCommonTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirectUrl);
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    try {
      setLocalError(null);
      await signInWithGoogle();
      // Redirect will be handled by useEffect
    } catch (error: any) {
      setLocalError(error.message || t("errors.signInFailed"));
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setLocalError(t("errors.emailRequired"));
      return;
    }

    try {
      setIsSubmitting(true);
      setLocalError(null);

      await sendSignInLink(email);
      setEmailSent(true);
    } catch (error: any) {
      setLocalError(error.message || t("errors.signInFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = localError || error;

  // Show loading state if checking auth
  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <AuthLayout
      title={t("signIn")}
      subtitle={`${t("dontHaveAccount")} ${t("signUp")}`}
    >
      {emailSent ? (
        /* Email Sent State */
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            {t("emailLink.checkEmail")}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t("emailLink.linkSent", { email })}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t("emailLink.clickLink")}
          </p>
          <button
            onClick={() => setEmailSent(false)}
            className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium"
          >
            {t("emailLink.resendLink")}
          </button>
        </div>
      ) : (
        /* Login Form */
        <div className="space-y-6">
          {/* Error Message */}
          {displayError && <ErrorMessage message={displayError} />}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t("signInWith")} {t("google")}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                {t("or")}
              </span>
            </div>
          </div>

          {/* Email Link Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t("email")}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? tCommon("loading") : t("emailLink.sendLink")}
            </button>
          </form>

          {/* Email Link Description */}
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            {t("emailLink.description")}
          </p>
        </div>
      )}
    </AuthLayout>
  );
}
