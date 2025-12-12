"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useCart } from "@/contexts/CartContext"
import { Minus, Plus, Trash2, ShoppingBag, ChevronLeft, ArrowRight, Loader2 } from "lucide-react"

export default function CartPage() {
  const {
    cart,
    isLoading,
    error,
    itemCount,
    updateCartItem,
    removeCartItem,
    clearCart,
    updateContactInfo,
  } = useCart()

  const [contactEmail, setContactEmail] = useState(cart?.customer_email || "")
  const [contactPhone, setContactPhone] = useState(cart?.customer_phone || "")
  const [isSavingContact, setIsSavingContact] = useState(false)

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
  const subtotal = cart?.subtotal || 0
  const deliveryFee = cartItems.some((item) => item.delivery_available) ? 1500 : 0
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {/* Breadcrumb */}
          <nav className="mb-4 sm:mb-6">
            <Link
              href="/"
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
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
                  >
                    {/* Product Image */}
                    <div className="relative w-full sm:w-24 h-40 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.product_image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link
                            href={`/product/${item.product_id}`}
                            className="font-medium text-gray-900 hover:text-[#6B9B37] transition-colors line-clamp-2"
                          >
                            {item.product_name}
                          </Link>
                          {item.seller_name && (
                            <p className="text-sm text-gray-500 mt-1">
                              Sold by: {item.seller_name}
                            </p>
                          )}
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
                          {formatPrice(item.total_price)}
                        </p>
                      </div>

                      {/* Delivery Badge */}
                      <div className="mt-3">
                        {item.delivery_available ? (
                          <span className="inline-flex items-center text-xs text-[#6B9B37]">
                            <span className="w-1.5 h-1.5 bg-[#6B9B37] rounded-full mr-1.5" />
                            Delivery Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs text-gray-500">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5" />
                            Pickup Only
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">
                        {deliveryFee > 0 ? formatPrice(deliveryFee) : "Free"}
                      </span>
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
