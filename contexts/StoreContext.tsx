"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { storeApi, Store, Product, ProductsResponse, Category } from '@/lib/api'

interface StoreContextType {
  store: Store | null
  products: Product[]
  categories: Category[]
  pagination: ProductsResponse['pagination'] | null
  isLoading: boolean
  isLoadingProducts: boolean
  error: string | null
  storeSlug: string
  searchQuery: string
  selectedCategoryId: number | null
  fetchStore: () => Promise<void>
  fetchProducts: (options?: {
    page?: number
    categoryId?: number
    search?: string
    sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular'
  }) => Promise<void>
  setSearchQuery: (query: string) => void
  setSelectedCategoryId: (categoryId: number | null) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

interface StoreProviderProps {
  children: ReactNode
  storeSlug: string
}

export function StoreProvider({ children, storeSlug }: StoreProviderProps) {
  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [pagination, setPagination] = useState<ProductsResponse['pagination'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const fetchStore = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [storeData, categoriesData] = await Promise.all([
        storeApi.getStore(storeSlug),
        storeApi.getCategories(storeSlug).catch(() => []),
      ])
      setStore(storeData)
      setCategories(categoriesData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load store')
      console.error('Error fetching store:', err)
    } finally {
      setIsLoading(false)
    }
  }, [storeSlug])

  const fetchProducts = useCallback(async (options?: {
    page?: number
    categoryId?: number
    search?: string
    sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular'
  }) => {
    setIsLoadingProducts(true)
    try {
      const response = await storeApi.getProducts(storeSlug, {
        page: options?.page || 1,
        limit: 20,
        categoryId: options?.categoryId || selectedCategoryId || undefined,
        search: options?.search || searchQuery || undefined,
        sortBy: options?.sortBy,
      })
      setProducts(response.products)
      setPagination(response.pagination)
      if (response.categories) {
        setCategories(response.categories)
      }
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setIsLoadingProducts(false)
    }
  }, [storeSlug, searchQuery, selectedCategoryId])

  // Fetch store info on mount
  useEffect(() => {
    fetchStore()
  }, [fetchStore])

  // Fetch products when store is loaded or filters change
  useEffect(() => {
    if (store) {
      fetchProducts()
    }
  }, [store, searchQuery, selectedCategoryId])

  return (
    <StoreContext.Provider
      value={{
        store,
        products,
        categories,
        pagination,
        isLoading,
        isLoadingProducts,
        error,
        storeSlug,
        searchQuery,
        selectedCategoryId,
        fetchStore,
        fetchProducts,
        setSearchQuery,
        setSelectedCategoryId,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
