"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/app/components/AuthProvider";
import { useCommonTranslation } from "@/app/hooks/useTranslation";
import { useFavorites } from "@/app/hooks/useFavorites";
import { ProductsAPI } from "@/app/lib/api";
import { Product } from "@/app/lib/types";
import RouteGuard from "@/app/components/RouteGuard";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import UserMenu from "@/app/components/UserMenu";
import ProductCard from "@/app/components/ProductCard";

function FavoritesPageContent() {
  const { user, loading } = useAuthContext();
  const { t } = useCommonTranslation();
  const { favorites } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load favorite products
  useEffect(() => {
    const loadFavoriteProducts = async () => {
      if (!favorites.length) {
        setFavoriteProducts([]);
        return;
      }

      try {
        setLoadingProducts(true);
        setError(null);

        // Fetch each favorite product
        const productPromises = favorites.map(async (productId) => {
          try {
            return await ProductsAPI.getProduct(Number(productId));
          } catch (error) {
            console.error(`Failed to load product ${productId}:`, error);
            return null;
          }
        });

        const products = await Promise.all(productPromises);
        const validProducts = products.filter(
          (product): product is Product => product !== null
        );

        setFavoriteProducts(validProducts);
      } catch (error: any) {
        setError(error.message || "Failed to load favorite products");
      } finally {
        setLoadingProducts(false);
      }
    };

    loadFavoriteProducts();
  }, [favorites]);

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
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Favorites
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Your favorite products will appear here
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Error State */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <p className="text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loadingProducts && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(favorites.length)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {!loadingProducts && favoriteProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loadingProducts && favoriteProducts.length === 0 && !error && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  No favorites yet
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Start browsing products and add them to your favorites!
                </p>
                <div className="mt-6">
                  <Link
                    href="/products"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <RouteGuard requireAuth={true}>
      <FavoritesPageContent />
    </RouteGuard>
  );
}
