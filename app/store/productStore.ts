'use client';

import { create } from 'zustand';
import { Product, ProductsResponse } from '@/app/lib/types';
import { ProductsAPI } from '@/app/lib/api';

interface ProductFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'newest' | 'oldest' | 'priceLowToHigh' | 'priceHighToLow' | 'nameAZ' | 'nameZA' | 'topRated';
}

interface ProductState {
  // Products data
  products: Product[];
  currentProduct: Product | null;
  categories: string[];

  // Pagination
  total: number;
  skip: number;
  limit: number;
  hasMore: boolean;

  // Filters and search
  filters: ProductFilters;

  // Loading states
  loading: boolean;
  loadingMore: boolean;
  loadingProduct: boolean;
  loadingCategories: boolean;

  // Error states
  error: string | null;
  productError: string | null;
}

interface ProductActions {
  // Product fetching
  fetchProducts: (reset?: boolean) => Promise<void>;
  fetchProduct: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;

  // Filters and sorting
  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;

  // Pagination
  loadMore: () => Promise<void>;

  // State management
  clearError: () => void;
  clearProductError: () => void;
  setCurrentProduct: (product: Product | null) => void;
}

type ProductStore = ProductState & ProductActions;

const initialFilters: ProductFilters = {
  search: '',
  category: '',
  minPrice: 0,
  maxPrice: 10000,
  sortBy: 'newest',
};

export const useProductStore = create<ProductStore>((set, get) => ({
  // Initial state
  products: [],
  currentProduct: null,
  categories: [],
  total: 0,
  skip: 0,
  limit: 20,
  hasMore: true,
  filters: initialFilters,
  loading: false,
  loadingMore: false,
  loadingProduct: false,
  loadingCategories: false,
  error: null,
  productError: null,

  // Fetch products with current filters
  fetchProducts: async (reset = true) => {
    const state = get();

    try {
      set({
        loading: reset,
        loadingMore: !reset,
        error: null
      });

      const newSkip = reset ? 0 : state.skip;
      let response: ProductsResponse;

      // Apply filters
      if (state.filters.search) {
        response = await ProductsAPI.searchProducts(state.filters.search, state.limit);
      } else if (state.filters.category) {
        response = await ProductsAPI.getProductsByCategory(state.filters.category, state.limit);
      } else {
        response = await ProductsAPI.getProducts(state.limit, newSkip);
      }

      // Sort products
      const sortedProducts = sortProducts(response.products, state.filters.sortBy);

      // Filter by price range
      const filteredProducts = sortedProducts.filter(product =>
        product.price >= state.filters.minPrice &&
        product.price <= state.filters.maxPrice
      );

      set({
        products: reset ? filteredProducts : [...state.products, ...filteredProducts],
        total: response.total,
        skip: newSkip + response.products.length,
        hasMore: newSkip + response.products.length < response.total,
        loading: false,
        loadingMore: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch products',
        loading: false,
        loadingMore: false,
      });
    }
  },

  // Fetch single product
  fetchProduct: async (id: number) => {
    try {
      set({ loadingProduct: true, productError: null });
      const product = await ProductsAPI.getProduct(id);
      set({ currentProduct: product, loadingProduct: false });
    } catch (error: any) {
      set({
        productError: error.message || 'Failed to fetch product',
        loadingProduct: false,
      });
    }
  },

  // Fetch categories
  fetchCategories: async () => {
    try {
      set({ loadingCategories: true });
      const categoriesData = await ProductsAPI.getCategories();

      // Ensure we have a proper string array and filter out invalid entries
      const categories = Array.isArray(categoriesData)
        ? categoriesData
            .map(cat => {
              if (typeof cat === 'string') return cat;
              if (typeof cat === 'object' && cat !== null) {
                // If it's an object, try to extract a meaningful string
                const catObj = cat as any;
                return catObj.name || catObj.slug || catObj.title || JSON.stringify(cat);
              }
              return String(cat);
            })
            .filter((cat, index, arr) => cat && arr.indexOf(cat) === index) // Remove duplicates and empty strings
        : [];

      set({ categories, loadingCategories: false });
    } catch (error: any) {
      console.error('Failed to fetch categories:', error);
      set({ categories: [], loadingCategories: false });
    }
  },

  // Search products
  searchProducts: async (query: string) => {
    set(state => ({
      filters: { ...state.filters, search: query, category: '' }
    }));
    await get().fetchProducts(true);
  },

  // Fetch products by category
  fetchProductsByCategory: async (category: string) => {
    set(state => ({
      filters: { ...state.filters, category, search: '' }
    }));
    await get().fetchProducts(true);
  },

  // Set filters
  setFilters: (newFilters: Partial<ProductFilters>) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().fetchProducts(true);
  },

  // Reset filters
  resetFilters: () => {
    set({ filters: initialFilters });
    get().fetchProducts(true);
  },

  // Load more products
  loadMore: async () => {
    const state = get();
    if (!state.hasMore || state.loadingMore) return;
    await get().fetchProducts(false);
  },

  // Clear errors
  clearError: () => set({ error: null }),
  clearProductError: () => set({ productError: null }),

  // Set current product
  setCurrentProduct: (product: Product | null) => set({ currentProduct: product }),
}));

// Helper function to sort products
function sortProducts(products: Product[], sortBy: ProductFilters['sortBy']): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'priceLowToHigh':
      return sorted.sort((a, b) => a.price - b.price);
    case 'priceHighToLow':
      return sorted.sort((a, b) => b.price - a.price);
    case 'nameAZ':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'nameZA':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'topRated':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'oldest':
      return sorted.sort((a, b) => a.id - b.id);
    case 'newest':
    default:
      return sorted.sort((a, b) => b.id - a.id);
  }
}

// Selector hooks for better performance
export const useProducts = () => useProductStore(state => state.products);
export const useCurrentProduct = () => useProductStore(state => state.currentProduct);
export const useProductLoading = () => useProductStore(state => state.loading);
export const useProductError = () => useProductStore(state => state.error);
export const useProductFilters = () => useProductStore(state => state.filters);
