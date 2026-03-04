// API Service Layer for POSBOK Storefront
// Base URL: https://api.posbok.com

const API_BASE_URL = 'http://localhost:5000/api'

// Helper to get or create session ID for cart
export function getSessionId(): string {
  if (typeof window === 'undefined') {
    // Return a placeholder for SSR - actual calls should only happen client-side
    return 'ssr-placeholder'
  }

  let sessionId = localStorage.getItem('cart-session-id')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem('cart-session-id', sessionId)
  }
  return sessionId
}

// Types based on actual API responses
export interface CartItemProduct {
  id: number
  name: string
  selling_price: number
  is_published: boolean
  images: { id: number; image_url: string; is_primary: boolean }[]
}

export interface CartItem {
  id: number
  cart_id: number
  product_id: number
  quantity: number
  price: number
  created_at: string
  updated_at: string
  product: CartItemProduct
}

export interface Cart {
  id: number
  session_id: string
  store_slug: string
  business_id: number
  items: CartItem[]
  itemCount: number
  subtotal: string
  total: string
  customer_email: string | null
  customer_phone: string | null
  expires_at: string
  created_at: string
  updated_at: string
}

export interface CartApiResponse {
  success: boolean
  message: string
  data: Cart
}

export interface Review {
  id: number
  product_id: number
  customer_name: string
  customer_email?: string
  rating: number
  review_title: string
  review_text: string
  helpful_count: number
  is_approved: boolean
  admin_response?: string
  created_at: string
}

// API response structure from the server
export interface ReviewsApiResponse {
  success: boolean
  message: string
  data: {
    reviews: Review[]
    stats: {
      averageRating: string
      totalReviews: number
      distribution: {
        rating: number
        count: number
      } | Array<{ rating: number; count: number }>
    }
    pagination: {
      currentPage: number
      totalPages: number
      totalItems: number
      itemsPerPage: number
    }
  }
}

// Normalized response for the app
export interface ReviewsResponse {
  reviews: Review[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  summary: {
    averageRating: number
    totalReviews: number
    ratingDistribution: {
      1: number
      2: number
      3: number
      4: number
      5: number
    }
  }
}

export interface SubmitReviewData {
  customer_name: string
  customer_email: string
  rating: number
  review_title: string
  review_text: string
}

// Store/Business types
export interface Store {
  id: number
  business_id: number
  is_active: boolean
  store_slug: string
  latitude?: number
  longitude?: number
  address?: string
  store_front_image?: string | null
  sign_board_image?: string | null
  offers_delivery: boolean
  cac_registration?: string
  delivery_verified: boolean
  business_description?: string
  display_quantity_mode?: string
  contact_phone?: string
  contact_email?: string
  whatsapp_number?: string
  business_motto?: string
  business_logo?: string | null
  published_categories?: string[] | null
  verification_status?: string
  about_us?: string | null
  facebook_url?: string | null
  twitter_url?: string | null
  instagram_url?: string | null
  created_at: string
  updated_at: string
  Business: {
    id: number
    business_name: string
  }
}

export interface StoreApiResponse {
  success: boolean
  message: string
  data: Store
}

export interface ProductImage {
  id: number
  image_url: string
  display_order: number
  is_primary: boolean
}

export interface Product {
  id: number
  business_id: number
  category_id: number
  name: string
  sku?: string
  description?: string
  purchase_price: number
  selling_price: number
  barcode?: string
  brand_name?: string
  low_stock_quantity?: number
  supposed_price?: number | null
  is_published: boolean
  display_quantity?: string
  product_details?: string
  unit?: string
  created_at: string
  updated_at: string
  ProductCategory?: {
    id: number
    name: string
  }
  images: ProductImage[]
  quantity_display?: string
  in_stock: boolean
  delivery_available?: boolean
}

export interface StoreInfo {
  business_name: string
  motto?: string
  description?: string
  address?: string
  logo?: string | null
  contact_phone?: string
  contact_email?: string
  whatsapp_number?: string
}

export interface ProductsApiResponse {
  success: boolean
  message: string
  data: {
    products: Product[]
    pagination: {
      currentPage: number
      totalPages: number
      totalItems: number
      itemsPerPage: number
    }
    storeInfo: StoreInfo
  }
}

export interface SingleProductApiResponse {
  success: boolean
  message: string
  data: {
    product: Product
    storeInfo: StoreInfo
  }
}

export interface ProductsResponse {
  products: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  storeInfo?: StoreInfo
  categories?: Category[]
}

export interface Category {
  id: number
  name: string
  description?: string
  count?: number
}

export interface CategoriesApiResponse {
  success: boolean
  message: string
  data: Category[]
}

// Purchase Request types
export interface PurchaseRequestItem {
  product_id: number
  quantity: number
  price: number
}

export interface PurchaseRequestData {
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_location: string
  items: PurchaseRequestItem[]
  message?: string
}

export interface PurchaseRequestResponse {
  success: boolean
  message: string
  data?: {
    id: number
    reference_number: string
    status: string
    created_at: string
  }
}

// API Error handling
class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new ApiError(
      data.message || `Request failed with status ${response.status}`,
      response.status
    )
  }

  // Also check for success: false in response body (API may return 200 with error)
  if (data.success === false) {
    throw new ApiError(
      data.message || 'Request failed',
      response.status
    )
  }

  return data as T
}

// ============================================
// CART API
// ============================================

export const cartApi = {
  /**
   * Get the current shopping cart
   */
  async getCart(storeSlug: string): Promise<Cart> {
    const response = await fetch(`${API_BASE_URL}/cart/${storeSlug}/cart`, {
      method: 'GET',
      headers: {
        'x-session-id': getSessionId(),
      },
    })
    const result = await handleResponse<CartApiResponse>(response)
    return result.data
  },

  /**
   * Add a product to the cart
   */
  async addToCart(storeSlug: string, productId: number, quantity: number): Promise<Cart> {
    const response = await fetch(`${API_BASE_URL}/cart/${storeSlug}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': getSessionId(),
      },
      body: JSON.stringify({ productId, quantity }),
    })
    const result = await handleResponse<CartApiResponse>(response)
    return result.data
  },

  /**
   * Update cart item quantity
   */
  async updateCartItem(storeSlug: string, itemId: number, quantity: number): Promise<Cart> {
    const response = await fetch(`${API_BASE_URL}/cart/${storeSlug}/cart/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': getSessionId(),
      },
      body: JSON.stringify({ quantity }),
    })
    const result = await handleResponse<CartApiResponse>(response)
    return result.data
  },

  /**
   * Remove an item from the cart
   */
  async removeCartItem(storeSlug: string, itemId: number): Promise<Cart> {
    const response = await fetch(`${API_BASE_URL}/cart/${storeSlug}/cart/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'x-session-id': getSessionId(),
      },
    })
    const result = await handleResponse<CartApiResponse>(response)
    return result.data
  },

  /**
   * Clear all items from the cart
   */
  async clearCart(storeSlug: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/cart/${storeSlug}/cart/clear`, {
      method: 'DELETE',
      headers: {
        'x-session-id': getSessionId(),
      },
    })
    return handleResponse<{ success: boolean; message: string }>(response)
  },

  /**
   * Update cart contact information
   */
  async updateContactInfo(
    storeSlug: string,
    contactInfo: { customer_email?: string; customer_phone?: string }
  ): Promise<Cart> {
    const response = await fetch(`${API_BASE_URL}/cart/${storeSlug}/cart/contact`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': getSessionId(),
      },
      body: JSON.stringify(contactInfo),
    })
    const result = await handleResponse<CartApiResponse>(response)
    return result.data
  },
}

// ============================================
// REVIEWS API
// ============================================

export const reviewsApi = {
  /**
   * Get all approved reviews for a product
   */
  async getProductReviews(
    productId: number | string,
    options?: {
      page?: number
      limit?: number
      sortBy?: 'recent' | 'helpful' | 'rating_high' | 'rating_low'
      rating?: number
    }
  ): Promise<ReviewsResponse> {
    const params = new URLSearchParams()
    if (options?.page) params.append('page', options.page.toString())
    if (options?.limit) params.append('limit', options.limit.toString())
    if (options?.sortBy) params.append('sortBy', options.sortBy)
    if (options?.rating) params.append('rating', options.rating.toString())

    const queryString = params.toString()
    const url = `${API_BASE_URL}/reviews/products/${productId}/reviews${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
    })
    const apiResponse = await handleResponse<ReviewsApiResponse>(response)

    // Transform the API response to match our app's expected format
    const { data } = apiResponse

    // Build rating distribution from stats
    const ratingDistribution: { 1: number; 2: number; 3: number; 4: number; 5: number } = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    }

    if (data.stats?.distribution) {
      if (Array.isArray(data.stats.distribution)) {
        // If distribution is an array of {rating, count}
        data.stats.distribution.forEach(item => {
          if (item.rating >= 1 && item.rating <= 5) {
            ratingDistribution[item.rating as 1 | 2 | 3 | 4 | 5] = item.count
          }
        })
      } else {
        // If distribution is a single object {rating, count}
        const { rating, count } = data.stats.distribution
        if (rating >= 1 && rating <= 5) {
          ratingDistribution[rating as 1 | 2 | 3 | 4 | 5] = count
        }
      }
    }

    return {
      reviews: data.reviews || [],
      pagination: {
        page: data.pagination?.currentPage || 1,
        limit: data.pagination?.itemsPerPage || 10,
        total: data.pagination?.totalItems || 0,
        totalPages: data.pagination?.totalPages || 1,
      },
      summary: {
        averageRating: parseFloat(data.stats?.averageRating || '0'),
        totalReviews: data.stats?.totalReviews || 0,
        ratingDistribution,
      },
    }
  },

  /**
   * Submit a review for a product
   */
  async submitReview(productId: number | string, reviewData: SubmitReviewData): Promise<Review> {
    const response = await fetch(`${API_BASE_URL}/reviews/products/${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
    return handleResponse<Review>(response)
  },

  /**
   * Mark a review as helpful
   */
  async markReviewHelpful(reviewId: number): Promise<{ helpful_count: number }> {
    const response = await fetch(`${API_BASE_URL}/reviews/reviews/${reviewId}/helpful`, {
      method: 'POST',
    })
    return handleResponse<{ helpful_count: number }>(response)
  },
}

// ============================================
// STORE API
// ============================================

export const storeApi = {
  /**
   * Get store/business information by slug
   */
  async getStore(storeSlug: string): Promise<Store> {
    const response = await fetch(`${API_BASE_URL}/storefront/public/${storeSlug}`, {
      method: 'GET',
    })
    const result = await handleResponse<StoreApiResponse>(response)
    return result.data
  },

  /**
   * Get products for a store
   */
  async getProducts(
    storeSlug: string,
    options?: {
      page?: number
      limit?: number
      categoryId?: number
      search?: string
      sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular'
      minPrice?: number
      maxPrice?: number
    }
  ): Promise<ProductsResponse> {
    const params = new URLSearchParams()
    if (options?.page) params.append('page', options.page.toString())
    if (options?.limit) params.append('limit', options.limit.toString())
    if (options?.categoryId) params.append('categoryId', options.categoryId.toString())
    if (options?.search) params.append('search', options.search)
    if (options?.sortBy) params.append('sortBy', options.sortBy)
    if (options?.minPrice) params.append('minPrice', options.minPrice.toString())
    if (options?.maxPrice) params.append('maxPrice', options.maxPrice.toString())

    const queryString = params.toString()
    const url = `${API_BASE_URL}/storefront/public/${storeSlug}/products${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
    })
    const result = await handleResponse<ProductsApiResponse>(response)

    // Map the API response to our internal format
    return {
      products: result.data.products,
      pagination: {
        page: result.data.pagination.currentPage,
        limit: result.data.pagination.itemsPerPage,
        total: result.data.pagination.totalItems,
        totalPages: result.data.pagination.totalPages,
      },
      storeInfo: result.data.storeInfo,
    }
  },

  /**
   * Get a single product by ID
   */
  async getProduct(storeSlug: string, productId: number | string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/storefront/public/${storeSlug}/products/${productId}`, {
      method: 'GET',
    })
    const result = await handleResponse<SingleProductApiResponse>(response)
    return result.data.product
  },

  /**
   * Get product categories for a store
   */
  async getCategories(storeSlug: string): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/storefront/public/${storeSlug}/categories`, {
      method: 'GET',
    })
    const result = await handleResponse<CategoriesApiResponse>(response)
    return result.data
  },

  /**
   * Submit a purchase request
   */
  async submitPurchaseRequest(
    storeSlug: string,
    data: PurchaseRequestData
  ): Promise<PurchaseRequestResponse> {
    const response = await fetch(`${API_BASE_URL}/storefront/public/${storeSlug}/purchase-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return handleResponse<PurchaseRequestResponse>(response)
  },
}

// ============================================
// ALL STORES PRODUCT TYPES & API
// ============================================

export interface AllProductsItem extends Product {
  store_slug: string
  store_name: string
  store_logo: string | null
}

export interface AllProductsApiResponse {
  success: boolean
  message: string
  data: {
    products: AllProductsItem[]
    pagination: {
      currentPage: number
      totalPages: number
      totalItems: number
      itemsPerPage: number
    }
  }
}

export interface AllProductsResponse {
  products: AllProductsItem[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const allProductsApi = {
  async getAll(options?: {
    page?: number
    limit?: number
    search?: string
    categoryName?: string
  }): Promise<AllProductsResponse> {
    const params = new URLSearchParams()
    if (options?.page) params.append('page', options.page.toString())
    if (options?.limit) params.append('limit', options.limit.toString())
    if (options?.search) params.append('search', options.search)
    if (options?.categoryName) params.append('category', options.categoryName)

    const qs = params.toString()
    const url = `${API_BASE_URL}/storefront/public/products/all${qs ? `?${qs}` : ''}`
    const response = await fetch(url, { method: 'GET' })
    const result = await handleResponse<AllProductsApiResponse>(response)
    return {
      products: result.data.products,
      pagination: {
        page: result.data.pagination.currentPage,
        limit: result.data.pagination.itemsPerPage,
        total: result.data.pagination.totalItems,
        totalPages: result.data.pagination.totalPages,
      },
    }
  },
}

// Default store slug - can be overridden per store
export const DEFAULT_STORE_SLUG = 'development-business-inc'
