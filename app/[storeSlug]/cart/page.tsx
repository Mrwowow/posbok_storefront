"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { storeApi, Store } from "@/lib/api"
import { useCart } from "@/contexts/CartContext"
import { Footer } from "@/components/Footer"
import { Minus, Plus, Trash2, ShoppingBag, ChevronLeft, ArrowRight, Loader2, ShoppingCart, LogIn, Menu, X } from "lucide-react"

function StoreHeader({ store, storeSlug }: { store: Store | null; storeSlug: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { itemCount } = useCart()

  const businessName = store?.Business?.business_name || "Store"

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href={`/${storeSlug}`} className="flex items-center">
            {store?.business_logo ? (
              <Image
                src={store.business_logo}
                alt={businessName}
                width={150}
                height={50}
                className="h-10 sm:h-12 w-auto"
                priority
              />
            ) : (
              <span className="text-xl sm:text-2xl font-bold text-[#6B9B37]">
                {businessName}
              </span>
            )}
          </Link>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href={`/${storeSlug}`} className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors">
              Products
            </Link>
            <Link href={`/${storeSlug}/about`} className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors">
              About
            </Link>
            <Link href={`/${storeSlug}/contact`} className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href={`/${storeSlug}/cart`} className="relative p-2 text-[#6B9B37] hover:text-[#4A7A1A] transition-colors">
              <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B9B37] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
            <button className="p-2 text-[#6B9B37] hover:text-[#4A7A1A] transition-colors">
              <LogIn className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
            </button>
            <button
              className="md:hidden p-2 text-gray-800 hover:text-[#6B9B37] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link href={`/${storeSlug}`} className="text-gray-800 hover:text-[#6B9B37] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href={`/${storeSlug}/about`} className="text-gray-800 hover:text-[#6B9B37] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <Link href={`/${storeSlug}/contact`} className="text-gray-800 hover:text-[#6B9B37] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default function CartPage() {
  const params = useParams()
  const storeSlug = params.storeSlug as string

  const [store, setStore] = useState<Store | null>(null)
  const [isLoadingStore, setIsLoadingStore] = useState(true)

  const {
    cart,
    isLoading,
    error,
    itemCount,
    setStoreSlug,
    updateCartItem,
    removeCartItem,
    clearCart,
    updateContactInfo,
  } = useCart()

  const [contactEmail, setContactEmail] = useState(cart?.customer_email || "")
  const [contactPhone, setContactPhone] = useState(cart?.customer_phone || "")
  const [isSavingContact, setIsSavingContact] = useState(false)

  // Update cart context with current store slug
  useEffect(() => {
    setStoreSlug(storeSlug)
  }, [storeSlug, setStoreSlug])

  // Fetch store info
  useEffect(() => {
    async function fetchStore() {
      setIsLoadingStore(true)
      try {
        const storeData = await storeApi.getStore(storeSlug)
        setStore(storeData)
      } catch (err) {
        console.error("Error fetching store:", err)
      } finally {
        setIsLoadingStore(false)
      }
    }
    fetchStore()
  }, [storeSlug])

  // Update contact fields when cart loads
  useEffect(() => {
    if (cart) {
      setContactEmail(cart.customer_email || "")
      setContactPhone(cart.customer_phone || "")
    }
  }, [cart])

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleQuantityChange = async (itemId: number, currentQuantity: number, delta: number) => {
    const newQuantity = Math.max(1, Math.min(10, currentQuantity + delta))
    if (newQuantity !== currentQuantity) {
      await updateCartItem(itemId, newQuantity)
    }
  }

  const handleRemoveItem = async (itemId: number) => {
    await removeCartItem(itemId)
  }

  const handleClearCart = async () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      await clearCart()
    }
  }

  const handleSaveContact = async () => {
    setIsSavingContact(true)
    try {
      await updateContactInfo(contactEmail, contactPhone)
    } catch {
      // Error is handled in context
    } finally {
      setIsSavingContact(false)
    }
  }

  const cartItems = cart?.items || []
  const subtotal = parseFloat(cart?.subtotal || "0")
  const total = parseFloat(cart?.total || "0")

  if (isLoadingStore) {
    return (
      <div className="min-h-screen bg-[#FAFAF0] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#6B9B37]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      <StoreHeader store={store} storeSlug={storeSlug} />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {/* Breadcrumb */}
          <nav className="mb-4 sm:mb-6">
            <Link
              href={`/${storeSlug}`}
              className="inline-flex items-center text-sm text-gray-600 hover:text-[#6B9B37] transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Continue Shopping
            </Link>
          </nav>

          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                disabled={isLoading}
                className="text-sm text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
              >
                Clear Cart
              </button>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {isLoading && cartItems.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#6B9B37]" />
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-12 sm:py-16">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                href={`/${storeSlug}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const productImage = item.product.images?.find(img => img.is_primary)?.image_url
                    || item.product.images?.[0]?.image_url
                    || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
                  const itemTotal = item.quantity * item.price

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
                    >
                      {/* Product Image */}
                      <div className="relative w-full sm:w-24 h-40 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={productImage}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link
                              href={`/${storeSlug}/product/${item.product_id}`}
                              className="font-medium text-gray-900 hover:text-[#6B9B37] transition-colors line-clamp-2"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatPrice(item.price)} each
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isLoading}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                          {/* Quantity */}
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                              disabled={item.quantity <= 1 || isLoading}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                              disabled={item.quantity >= 10 || isLoading}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="text-lg font-bold text-gray-900">
                            {formatPrice(itemTotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Subtotal ({itemCount} items)
                      </span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Email address"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent"
                      />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent"
                      />
                      <button
                        onClick={handleSaveContact}
                        disabled={isSavingContact}
                        className="w-full px-3 py-2 text-sm text-[#6B9B37] border border-[#6B9B37] rounded-lg hover:bg-[#6B9B37] hover:text-white transition-colors disabled:opacity-50"
                      >
                        {isSavingContact ? "Saving..." : "Save Contact Info"}
                      </button>
                    </div>
                  </div>

                  <button
                    disabled={isLoading || cartItems.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Secure checkout powered by POSbok
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
