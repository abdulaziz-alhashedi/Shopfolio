'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  signOut as firebaseSignOut,
  isSignInWithEmailLink,
} from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { UserService } from '@/app/lib/firestore';
import { UserDocument, AuthState, CreateUserData } from '@/app/lib/types';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Email link sign-in settings
const actionCodeSettings = {
  url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  handleCodeInApp: true,
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Set loading state
  const setLoading = useCallback((loading: boolean) => {
    setAuthState(prev => ({ ...prev, loading }));
  }, []);

  // Set error state
  const setError = useCallback((error: string | null) => {
    setAuthState(prev => ({ ...prev, error }));
  }, []);

  // Set user state
  const setUser = useCallback((user: UserDocument | null) => {
    setAuthState(prev => ({ ...prev, user, loading: false }));
  }, []);

  // Create or get user document
  const createOrGetUser = useCallback(async (firebaseUser: User): Promise<UserDocument> => {
    try {
      // Check if user document exists
      let userDoc = await UserService.getUser(firebaseUser.uid);
      
      if (!userDoc) {
        // Create new user document
        const createUserData: CreateUserData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          preferredLanguage: 'en', // Default language
          theme: 'light', // Default theme
        };
        
        userDoc = await UserService.createUser(createUserData);
      }
      
      return userDoc;
    } catch (error) {
      console.error('Error creating or getting user:', error);
      throw error;
    }
  }, []);

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await signInWithPopup(auth, googleProvider);
      const userDoc = await createOrGetUser(result.user);
      setUser(userDoc);
      
      return userDoc;
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
      setLoading(false);
      throw error;
    }
  }, [createOrGetUser, setLoading, setError, setUser]);

  // Send sign-in link to email
  const sendSignInLink = useCallback(async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Save email to localStorage for sign-in completion
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('emailForSignIn', email);
      }
      
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Send sign-in link error:', error);
      setError(error.message || 'Failed to send sign-in link');
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError]);

  // Complete email link sign-in
  const completeEmailSignIn = useCallback(async (email?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (typeof window === 'undefined') {
        throw new Error('Email sign-in completion must be done in browser');
      }
      
      if (!isSignInWithEmailLink(auth, window.location.href)) {
        throw new Error('Invalid sign-in link');
      }
      
      // Get email from parameter or localStorage
      const emailForSignIn = email || window.localStorage.getItem('emailForSignIn');
      
      if (!emailForSignIn) {
        throw new Error('Email not found for sign-in completion');
      }
      
      const result = await signInWithEmailLink(auth, emailForSignIn, window.location.href);
      const userDoc = await createOrGetUser(result.user);
      
      // Clear email from localStorage
      window.localStorage.removeItem('emailForSignIn');
      
      setUser(userDoc);
      return userDoc;
    } catch (error: any) {
      console.error('Complete email sign-in error:', error);
      setError(error.message || 'Failed to complete email sign-in');
      setLoading(false);
      throw error;
    }
  }, [createOrGetUser, setLoading, setError, setUser]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Sign-out error:', error);
      setError(error.message || 'Failed to sign out');
      setLoading(false);
      throw error;
    }
  }, [setLoading, setError, setUser]);

  // Check if current URL is a sign-in link
  const isEmailSignInLink = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return isSignInWithEmailLink(auth, window.location.href);
  }, []);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userDoc = await createOrGetUser(firebaseUser);
          setUser(userDoc);
        } else {
          setUser(null);
        }
      } catch (error: any) {
        console.error('Auth state change error:', error);
        setError(error.message || 'Authentication error');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [createOrGetUser, setUser, setError, setLoading]);

  return {
    ...authState,
    signInWithGoogle,
    sendSignInLink,
    completeEmailSignIn,
    signOut,
    isEmailSignInLink,
  };
};
