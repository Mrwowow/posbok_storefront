"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { storeApi, Store, Category } from "@/lib/api"
import { useCart } from "@/contexts/CartContext"
import { StoreFooter } from "@/components/StoreFooter"
import { ShoppingCart, Menu, X, MapPin, Loader2, CheckCircle, Truck, Shield, Clock } from "lucide-react"

function StoreHeader({ store, storeSlug }: { store: Store | null; storeSlug: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { itemCount } = useCart()

  const businessName = store?.Business?.business_name || "Store"

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href={`/${storeSlug}`} className="flex items-center">
            <Image
              src={store?.business_logo || "/logo-2.png"}
              alt={businessName}
              width={150}
              height={50}
              className="h-10 sm:h-12 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href={`/${storeSlug}`} className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors">
              Home
            </Link>
            <Link href={`/${storeSlug}/about`} className="text-[#6B9B37] font-medium transition-colors">
              About Us
            </Link>
            <Link href={`/${storeSlug}/contact`} className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors">
              Contact Us
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
                Home
              </Link>
              <Link href={`/${storeSlug}/about`} className="text-[#6B9B37] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                About Us
              </Link>
              <Link href={`/${storeSlug}/contact`} className="text-gray-800 hover:text-[#6B9B37] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default function StoreAboutPage() {
  const params = useParams()
  const storeSlug = params.storeSlug as string

  const [store, setStore] = useState<Store | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { setStoreSlug } = useCart()

  useEffect(() => {
    setStoreSlug(storeSlug)
  }, [storeSlug, setStoreSlug])

  useEffect(() => {
    async function fetchStore() {
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
        setError(err instanceof Error ? err.message : "Store not found")
      } finally {
        setIsLoading(false)
      }
    }
    fetchStore()
  }, [storeSlug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF0] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#6B9B37]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAF0] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Store Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors">
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  const businessName = store?.Business?.business_name || "Store"

  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      <StoreHeader store={store} storeSlug={storeSlug} />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#6B9B37] to-[#4A7A1A] text-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About {businessName}</h1>
            {store?.business_motto && (
              <p className="text-lg sm:text-xl text-white/90 italic">{store.business_motto}</p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* About Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Store Image */}
            <div className="relative aspect-video lg:aspect-square rounded-lg overflow-hidden bg-gray-100">
              {store?.store_front_image ? (
                <Image
                  src={store.store_front_image}
                  alt={businessName}
                  fill
                  className="object-cover"
                />
              ) : store?.sign_board_image ? (
                <Image
                  src={store.sign_board_image}
                  alt={businessName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6B9B37]/10 to-[#6B9B37]/20">
                  <div className="text-center">
                    {store?.business_logo ? (
                      <Image
                        src={store.business_logo}
                        alt={businessName}
                        width={200}
                        height={100}
                        className="mx-auto"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-[#6B9B37]">{businessName}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* About Text */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Story</h2>

              {store?.about_us ? (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">{store.about_us}</p>
                </div>
              ) : store?.business_description ? (
                <p className="text-gray-600">{store.business_description}</p>
              ) : (
                <p className="text-gray-600">
                  Welcome to {businessName}! We are committed to providing quality products and excellent customer service.
                  Browse our store to discover our wide range of products.
                </p>
              )}

              {store?.address && (
                <div className="mt-6 flex items-start gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#6B9B37] mt-0.5 flex-shrink-0" />
                  <span>{store.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-[#6B9B37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-[#6B9B37]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-sm text-gray-600">We ensure all our products meet high quality standards</p>
            </div>

            {store?.offers_delivery && (
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-[#6B9B37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-[#6B9B37]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Delivery Available</h3>
                <p className="text-sm text-gray-600">We deliver to your doorstep</p>
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-[#6B9B37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[#6B9B37]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Shopping</h3>
              <p className="text-sm text-gray-600">Your transactions are safe with us</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-[#6B9B37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-[#6B9B37]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
              <p className="text-sm text-gray-600">We're here to help you</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Shop?</h2>
            <p className="text-gray-600 mb-6">Explore our products and find what you need</p>
            <Link
              href={`/${storeSlug}`}
              className="inline-flex items-center justify-center px-8 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </main>

      <StoreFooter store={store} storeSlug={storeSlug} categories={categories} />
    </div>
  )
}
