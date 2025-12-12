"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { cartApi, Cart, CartItem, DEFAULT_STORE_SLUG } from '@/lib/api'

interface CartContextType {
  cart: Cart | null
  isLoading: boolean
  error: string | null
  itemCount: number
  storeSlug: string
  setStoreSlug: (slug: string) => void
  fetchCart: () => Promise<void>
  addToCart: (productId: number, quantity: number) => Promise<void>
  updateCartItem: (itemId: number, quantity: number) => Promise<void>
  removeCartItem: (itemId: number) => Promise<void>
  clearCart: () => Promise<void>
  updateContactInfo: (email?: string, phone?: string) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
  initialStoreSlug?: string
}

export function CartProvider({ children, initialStoreSlug }: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [storeSlug, setStoreSlug] = useState(initialStoreSlug || DEFAULT_STORE_SLUG)

  const itemCount = cart?.itemCount || 0

  const fetchCart = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const cartData = await cartApi.getCart(storeSlug)
      setCart(cartData)
    } catch (err) {
      // If cart doesn't exist yet, that's okay - it will be created on first add
      if (err instanceof Error && err.message.includes('404')) {
        setCart(null)
      } else {
        setError(err instanceof Error ? err.message : 'Failed to fetch cart')
        console.error('Error fetching cart:', err)
      }
    } finally {
      setIsLoading(false)
    }
  }, [storeSlug])

  const addToCart = useCallback(async (productId: number, quantity: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedCart = await cartApi.addToCart(storeSlug, productId, quantity)
      setCart(updatedCart)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart')
      console.error('Error adding to cart:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [storeSlug])

  const updateCartItem = useCallback(async (itemId: number, quantity: number) => {
    setIsLoading(true)
    setError(null)
    try {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        await removeCartItem(itemId)
        return
      }
      const updatedCart = await cartApi.updateCartItem(storeSlug, itemId, quantity)
      setCart(updatedCart)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart item')
      console.error('Error updating cart item:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [storeSlug])

  const removeCartItem = useCallback(async (itemId: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedCart = await cartApi.removeCartItem(storeSlug, itemId)
      setCart(updatedCart)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove cart item')
      console.error('Error removing cart item:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [storeSlug])

  const clearCart = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await cartApi.clearCart(storeSlug)
      setCart(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart')
      console.error('Error clearing cart:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [storeSlug])

  const updateContactInfo = useCallback(async (email?: string, phone?: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const updatedCart = await cartApi.updateContactInfo(storeSlug, {
        customer_email: email,
        customer_phone: phone,
      })
      setCart(updatedCart)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contact info')
      console.error('Error updating contact info:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [storeSlug])

  // Fetch cart on mount and when store slug changes
  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        itemCount,
        storeSlug,
        setStoreSlug,
        fetchCart,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
        updateContactInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
