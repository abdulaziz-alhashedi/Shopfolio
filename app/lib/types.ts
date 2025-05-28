// TypeScript types for the application

import { Timestamp } from 'firebase/firestore';

// User document schema for Firestore
export interface UserDocument {
  uid: string;
  email: string;
  name: string;
  preferredLanguage: 'ar' | 'en';
  theme: 'light' | 'dark';
  favorites: string[]; // Array of product IDs
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// User creation data (for new user registration)
export interface CreateUserData {
  uid: string;
  email: string;
  name: string;
  preferredLanguage?: 'ar' | 'en';
  theme?: 'light' | 'dark';
}

// User update data (for updating existing user)
export interface UpdateUserData {
  name?: string;
  preferredLanguage?: 'ar' | 'en';
  theme?: 'light' | 'dark';
  favorites?: string[];
}

// Authentication state
export interface AuthState {
  user: UserDocument | null;
  loading: boolean;
  error: string | null;
}

// Product types (from dummyjson.com)
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// API response from dummyjson
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Language type
export type Language = 'en' | 'ar';

// Theme type
export type Theme = 'light' | 'dark';

// Firebase Auth error codes
export type FirebaseAuthError = 
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/too-many-requests'
  | 'auth/operation-not-allowed';
