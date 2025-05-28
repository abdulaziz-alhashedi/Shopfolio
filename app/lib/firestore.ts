// Firestore database operations
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { UserDocument, CreateUserData, UpdateUserData } from './types';

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
} as const;

// User document operations
export class UserService {
  private static collection = collection(db, COLLECTIONS.USERS);

  /**
   * Get user document by UID
   */
  static async getUser(uid: string): Promise<UserDocument | null> {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, uid));
      
      if (userDoc.exists()) {
        return userDoc.data() as UserDocument;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  /**
   * Create a new user document
   */
  static async createUser(userData: CreateUserData): Promise<UserDocument> {
    try {
      const now = serverTimestamp() as Timestamp;
      
      const newUser: UserDocument = {
        uid: userData.uid,
        email: userData.email,
        name: userData.name,
        preferredLanguage: userData.preferredLanguage || 'en',
        theme: userData.theme || 'light',
        favorites: [],
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(doc(db, COLLECTIONS.USERS, userData.uid), newUser);
      
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Update user document
   */
  static async updateUser(uid: string, updates: UpdateUserData): Promise<void> {
    try {
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(doc(db, COLLECTIONS.USERS, uid), updateData);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Add product to user's favorites
   */
  static async addToFavorites(uid: string, productId: string): Promise<void> {
    try {
      const userDoc = await this.getUser(uid);
      
      if (userDoc && !userDoc.favorites.includes(productId)) {
        const updatedFavorites = [...userDoc.favorites, productId];
        await this.updateUser(uid, { favorites: updatedFavorites });
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  }

  /**
   * Remove product from user's favorites
   */
  static async removeFromFavorites(uid: string, productId: string): Promise<void> {
    try {
      const userDoc = await this.getUser(uid);
      
      if (userDoc) {
        const updatedFavorites = userDoc.favorites.filter(id => id !== productId);
        await this.updateUser(uid, { favorites: updatedFavorites });
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  /**
   * Check if user exists
   */
  static async userExists(uid: string): Promise<boolean> {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, uid));
      return userDoc.exists();
    } catch (error) {
      console.error('Error checking if user exists:', error);
      return false;
    }
  }

  /**
   * Get user by email (for admin purposes)
   */
  static async getUserByEmail(email: string): Promise<UserDocument | null> {
    try {
      const q = query(this.collection, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data() as UserDocument;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }
}
