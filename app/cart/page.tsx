"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Minus, Plus, Trash2, ShoppingBag, ChevronLeft, ArrowRight } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  seller: string
  deliveryAvailable: boolean
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "ABC Wireless Mouse + 2 extra Batteries",
    price: 5400,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    quantity: 2,
    seller: "Earot Communications",
    deliveryAvailable: true,
  },
  {
    id: "3",
    name: "Xiam Wireless Mouse",
    price: 5400,
    image: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=400&h=400&fit=crop",
    quantity: 1,
    seller: "Exclusive Gadgets",
    deliveryAvailable: true,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(10, item.quantity + delta)) }
          : item
      )
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = cartItems.some((item) => item.deliveryAvailable) ? 1500 : 0
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

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

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
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
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link
                            href={`/product/${item.id}`}
                            className="font-medium text-gray-900 hover:text-[#6B9B37] transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Sold by: {item.seller}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            disabled={item.quantity >= 10}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>

                      {/* Delivery Badge */}
                      <div className="mt-3">
                        {item.deliveryAvailable ? (
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
                        Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
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

                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
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
