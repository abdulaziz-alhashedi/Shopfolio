"use client";

import React, { useEffect, useState } from "react";
import { useProductStore } from "@/app/store/productStore";
import {
  useProductTranslation,
  useCommonTranslation,
} from "@/app/hooks/useTranslation";
import { PageLayout } from "@/app/components/layout";
import { PageLoader, ErrorState, NoProducts } from "@/app/components/ui";
import ProductCard from "@/app/components/ProductCard";
import ProductSearch from "@/app/components/ProductSearch";
import ProductFilters from "@/app/components/ProductFilters";

export default function ProductsPage() {
  const { t } = useProductTranslation();
  const { t: tCommon } = useCommonTranslation();
  const {
    products,
    loading,
    loadingMore,
    error,
    hasMore,
    total,
    fetchProducts,
    loadMore,
    clearError,
  } = useProductStore();

  const [showFilters, setShowFilters] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      loadMore();
    }
  };

  const handleRetry = () => {
    clearError();
    fetchProducts();
  };

  return (
    <PageLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t("allProducts")}
        </h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <ProductSearch />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                />
              </svg>
              {tCommon("filter")}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="lg:w-80">
            <ProductFilters onClose={() => setShowFilters(false)} />
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results Info */}
          {!loading && products.length > 0 && (
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Showing {products.length} of {total} products
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6">
              <ErrorState
                message={error}
                onRetry={handleRetry}
                showRetry={true}
              />
            </div>
          )}

          {/* Loading State */}
          {loading && products.length === 0 && (
            <PageLoader text="Loading products..." />
          )}

          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loadingMore ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {tCommon("loading")}
                      </div>
                    ) : (
                      "Load More Products"
                    )}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && <NoProducts />}
        </div>
      </div>
    </PageLayout>
  );
}
