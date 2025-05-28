"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useLanguageStore } from "@/app/store/languageStore";
import { UserService } from "@/app/lib/firestore";
import { UserDocument, AuthState } from "@/app/lib/types";

interface AuthContextType extends AuthState {
  signInWithGoogle: () => Promise<UserDocument>;
  sendSignInLink: (email: string) => Promise<boolean>;
  completeEmailSignIn: (email?: string) => Promise<UserDocument>;
  signOut: () => Promise<void>;
  isEmailSignInLink: () => boolean;
  updateUserProfile: (updates: Partial<UserDocument>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();
  const { setLanguage } = useLanguageStore();

  // Update user profile with language preference sync
  const updateUserProfile = async (updates: Partial<UserDocument>) => {
    if (!auth.user) {
      throw new Error("User not authenticated");
    }

    try {
      // Update Firestore
      await UserService.updateUser(auth.user.uid, updates);

      // Sync language preference if changed
      if (
        updates.preferredLanguage &&
        updates.preferredLanguage !== auth.user.preferredLanguage
      ) {
        setLanguage(updates.preferredLanguage);
      }

      // Note: The auth state will be updated by the onAuthStateChanged listener
      // when Firestore document is updated
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  // Sync user language preference on auth state change
  useEffect(() => {
    if (auth.user && auth.user.preferredLanguage) {
      const currentLanguage = useLanguageStore.getState().language;
      if (currentLanguage !== auth.user.preferredLanguage) {
        setLanguage(auth.user.preferredLanguage);
      }
    }
  }, [auth.user, setLanguage]);

  const contextValue: AuthContextType = {
    ...auth,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
