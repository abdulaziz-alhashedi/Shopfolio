// API client for external services
import axios from 'axios';
import { Product, ProductsResponse } from './types';

// Base API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dummyjson.com';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Products API
export class ProductsAPI {
  /**
   * Get all products with pagination
   */
  static async getProducts(limit = 30, skip = 0): Promise<ProductsResponse> {
    try {
      const response = await apiClient.get<ProductsResponse>('/products', {
        params: { limit, skip },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get a single product by ID
   */
  static async getProduct(id: number): Promise<Product> {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Search products
   */
  static async searchProducts(query: string, limit = 30): Promise<ProductsResponse> {
    try {
      const response = await apiClient.get<ProductsResponse>('/products/search', {
        params: { q: query, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(category: string, limit = 30): Promise<ProductsResponse> {
    try {
      const response = await apiClient.get<ProductsResponse>(`/products/category/${category}`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  /**
   * Get all categories
   */
  static async getCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}

export default apiClient;
