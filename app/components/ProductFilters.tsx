"use client";

import React, { useState, useEffect } from "react";
import { useProductStore } from "@/app/store/productStore";
import { useProductTranslation } from "@/app/hooks/useTranslation";

interface ProductFiltersProps {
  className?: string;
  onClose?: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  className = "",
  onClose,
}) => {
  const { t } = useProductTranslation();
  const {
    filters,
    categories,
    setFilters,
    resetFilters,
    fetchCategories,
    loadingCategories,
  } = useProductStore();

  const [localFilters, setLocalFilters] = useState(filters);

  // Fetch categories on mount
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  // Sync local filters with store
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onClose?.();
  };

  const handleReset = () => {
    resetFilters();
    onClose?.();
  };

  const sortOptions = [
    { value: "newest", label: t("filters.newest") },
    { value: "oldest", label: t("filters.oldest") },
    { value: "priceLowToHigh", label: t("filters.priceLowToHigh") },
    { value: "priceHighToLow", label: t("filters.priceHighToLow") },
    { value: "nameAZ", label: t("filters.nameAZ") },
    { value: "nameZA", label: t("filters.nameZA") },
    { value: "topRated", label: t("filters.topRated") },
  ];

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("filters.title")}
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("filters.category")}
          </label>
          <select
            value={localFilters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Categories</option>
            {loadingCategories ? (
              <option disabled>Loading...</option>
            ) : (
              categories.map((category, index) => {
                // Ensure category is a string and handle edge cases
                let categoryStr = "";
                if (typeof category === "string") {
                  categoryStr = category;
                } else if (typeof category === "object" && category !== null) {
                  // Try to extract meaningful data from object
                  const categoryObj = category as any;
                  categoryStr =
                    categoryObj.name ||
                    categoryObj.slug ||
                    categoryObj.title ||
                    `category-${index}`;
                } else {
                  categoryStr = String(category) || `category-${index}`;
                }

                // Ensure we have a valid string and create unique key
                const uniqueKey = `${categoryStr}-${index}`;
                const displayName = categoryStr.replace(/-/g, " ");

                return (
                  <option
                    key={uniqueKey}
                    value={categoryStr}
                    className="capitalize"
                  >
                    {displayName}
                  </option>
                );
              })
            )}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("filters.priceRange")}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                {t("filters.minPrice")}
              </label>
              <input
                type="number"
                min="0"
                value={localFilters.minPrice}
                onChange={(e) =>
                  handleFilterChange("minPrice", Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                {t("filters.maxPrice")}
              </label>
              <input
                type="number"
                min="0"
                value={localFilters.maxPrice}
                onChange={(e) =>
                  handleFilterChange("maxPrice", Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="10000"
              />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            ${localFilters.minPrice} - ${localFilters.maxPrice}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("filters.sortBy")}
          </label>
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {t("filters.clear")}
        </button>
        <button
          onClick={applyFilters}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {t("filters.apply")}
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
