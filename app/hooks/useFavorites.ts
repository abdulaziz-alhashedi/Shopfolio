'use client';

import { useState, useCallback } from 'react';
import { useAuthContext } from '@/app/components/AuthProvider';
import { UserService } from '@/app/lib/firestore';

export const useFavorites = () => {
  const { user, updateUserProfile } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if product is in favorites
  const isFavorite = useCallback((productId: string | number): boolean => {
    if (!user?.favorites) return false;
    return user.favorites.includes(String(productId));
  }, [user?.favorites]);

  // Add product to favorites
  const addToFavorites = useCallback(async (productId: string | number): Promise<boolean> => {
    if (!user) {
      setError('Please sign in to add favorites');
      return false;
    }

    const productIdStr = String(productId);
    
    if (isFavorite(productIdStr)) {
      return true; // Already in favorites
    }

    try {
      setLoading(true);
      setError(null);

      await UserService.addToFavorites(user.uid, productIdStr);
      
      // Update local user state
      const updatedFavorites = [...(user.favorites || []), productIdStr];
      await updateUserProfile({ favorites: updatedFavorites });
      
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error adding to favorites:', error);
      setError(error.message || 'Failed to add to favorites');
      setLoading(false);
      return false;
    }
  }, [user, isFavorite, updateUserProfile]);

  // Remove product from favorites
  const removeFromFavorites = useCallback(async (productId: string | number): Promise<boolean> => {
    if (!user) {
      setError('Please sign in to manage favorites');
      return false;
    }

    const productIdStr = String(productId);
    
    if (!isFavorite(productIdStr)) {
      return true; // Not in favorites
    }

    try {
      setLoading(true);
      setError(null);

      await UserService.removeFromFavorites(user.uid, productIdStr);
      
      // Update local user state
      const updatedFavorites = (user.favorites || []).filter(id => id !== productIdStr);
      await updateUserProfile({ favorites: updatedFavorites });
      
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Error removing from favorites:', error);
      setError(error.message || 'Failed to remove from favorites');
      setLoading(false);
      return false;
    }
  }, [user, isFavorite, updateUserProfile]);

  // Toggle favorite status
  const toggleFavorite = useCallback(async (productId: string | number): Promise<boolean> => {
    const productIdStr = String(productId);
    
    if (isFavorite(productIdStr)) {
      return await removeFromFavorites(productIdStr);
    } else {
      return await addToFavorites(productIdStr);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  // Get favorites count
  const favoritesCount = user?.favorites?.length || 0;

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    favorites: user?.favorites || [],
    favoritesCount,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    loading,
    error,
    clearError,
    isAuthenticated: !!user,
  };
};
