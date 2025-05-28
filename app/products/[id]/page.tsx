"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useProductStore } from "@/app/store/productStore";
import { useFavorites } from "@/app/hooks/useFavorites";
import {
  useProductTranslation,
  useCommonTranslation,
} from "@/app/hooks/useTranslation";
import { PageLayout } from "@/app/components/layout";
import { FullScreenLoader, ErrorState } from "@/app/components/ui";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useProductTranslation();
  const { t: tCommon } = useCommonTranslation();

  const {
    currentProduct: product,
    loadingProduct: loading,
    productError: error,
    fetchProduct,
    clearProductError,
  } = useProductStore();

  const { isFavorite, toggleFavorite, loading: favLoading } = useFavorites();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const productId = Number(params.id);

  // Fetch product on mount
  useEffect(() => {
    if (productId && !isNaN(productId)) {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct]);

  // Reset image selection when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setImageError(false);
  }, [product]);

  const handleFavoriteClick = async () => {
    if (product) {
      await toggleFavorite(product.id);
    }
  };

  const handleRetry = () => {
    clearProductError();
    if (productId && !isNaN(productId)) {
      fetchProduct(productId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  {String(tCommon("appName"))}
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSwitcher variant="toggle" />
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        {/* Loading State */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  {String(tCommon("appName"))}
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSwitcher variant="toggle" />
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        {/* Error State */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              {String(t("notFound"))}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {error}
            </p>
            <div className="mt-6 space-x-3">
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {String(tCommon("retry"))}
              </button>
              <Link
                href="/products"
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                {String(tCommon("back"))}
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                {String(tCommon("appName"))}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="toggle" />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {String(t("products"))}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white capitalize">
            {product.category}
          </span>
          <span>/</span>
          <span className="text-gray-900 dark:text-white truncate">
            {product.title}
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              {!imageError ? (
                <Image
                  src={images[selectedImageIndex]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square relative bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-blue-500"
                        : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {product.brand}
            </p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating} out of 5
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                {hasDiscount ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm font-medium">
                      -{Math.round(product.discountPercentage)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  You save ${(product.price - discountedPrice).toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.stock > 0 ? "bg-green-400" : "bg-red-400"
                }`}
              ></div>
              <span
                className={`text-sm font-medium ${
                  product.stock > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {product.stock > 0
                  ? product.stock > 10
                    ? String(t("inStock"))
                    : `Only ${product.stock} left in stock`
                  : String(t("outOfStock"))}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {String(t("description"))}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Category */}
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {String(t("category"))}:
              </span>
              <span className="text-sm text-gray-900 dark:text-white ml-1 capitalize">
                {product.category}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                onClick={handleFavoriteClick}
                disabled={favLoading}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  isFavorite(product.id)
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill={isFavorite(product.id) ? "currentColor" : "none"}
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
                  <span>
                    {isFavorite(product.id)
                      ? String(t("removeFromFavorites"))
                      : String(t("addToFavorites"))}
                  </span>
                </div>
              </button>

              <Link
                href="/products"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {String(tCommon("back"))} to Products
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
