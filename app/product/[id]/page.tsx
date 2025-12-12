"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Star, Truck, Shield, ChevronLeft, Minus, Plus, ShoppingCart, Heart, Share2, MapPin } from "lucide-react"

// Sample product data
const products = [
  {
    id: "1",
    name: "ABC Wireless Mouse + 2 extra Batteries",
    price: 5400,
    originalPrice: 6000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop",
    rating: 4.5,
    reviewCount: 124,
    seller: "Earot Communications",
    location: "Oleh, Delta State",
    deliveryAvailable: true,
    description: "High-quality wireless mouse with ergonomic design for comfortable use. Comes with 2 extra batteries for extended usage. Features include adjustable DPI settings, silent click buttons, and long-lasting battery life.",
    features: [
      "2.4GHz wireless connectivity",
      "Adjustable DPI (800/1200/1600)",
      "Silent click buttons",
      "Ergonomic design",
      "Up to 12 months battery life",
      "Plug and play USB receiver",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "2",
    name: "Oraimo Wireless Mouse + Mouse Pad",
    price: 7500,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop",
    rating: 5,
    reviewCount: 89,
    seller: "Unique Accessories",
    location: "Ozoro, Delta State",
    deliveryAvailable: false,
    description: "Premium Oraimo wireless mouse bundled with a high-quality mouse pad. Perfect combo for office and gaming use.",
    features: [
      "Premium wireless mouse",
      "High-quality mouse pad included",
      "Smooth tracking",
      "Comfortable grip",
      "Long battery life",
    ],
    inStock: true,
    stockCount: 8,
  },
]

function StarRating({ rating, size = "default" }: { rating: number; size?: "default" | "large" }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const starSize = size === "large" ? "w-5 h-5" : "w-4 h-4"

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={`${starSize} fill-[#6B9B37] text-[#6B9B37]`} />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className={`${starSize} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${starSize} fill-[#6B9B37] text-[#6B9B37]`} />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={`${starSize} text-gray-300`} />
      ))}
    </div>
  )
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Find product by ID
  const product = products.find((p) => p.id === productId) || products[0]

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= (product.stockCount || 10)) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      <Header cartCount={3} />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {/* Breadcrumb */}
          <nav className="mb-4 sm:mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-[#6B9B37] transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Products
            </Link>
          </nav>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.deliveryAvailable ? (
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded bg-[#6B9B37] text-white">
                    Delivery Available
                  </span>
                ) : (
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded bg-gray-600 text-white">
                    Delivery Unavailable
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <StarRating rating={product.rating} size="large" />
                  <span className="text-sm text-gray-600">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    {product.discount && (
                      <span className="px-2 py-1 text-sm font-medium text-[#6B9B37] bg-[#F5F5DC] rounded">
                        -{product.discount}%
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Seller Info */}
              <div className="p-4 bg-white rounded-lg border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#6B9B37] text-white flex items-center justify-center font-semibold">
                    {product.seller.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.seller}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {product.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Features */}
              {product.features && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#6B9B37] rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <span className="w-2 h-2 bg-[#6B9B37] rounded-full" />
                    <span className="text-sm text-[#6B9B37] font-medium">
                      In Stock ({product.stockCount} available)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm text-red-500 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stockCount || 10)}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:border-[#6B9B37] hover:text-[#6B9B37] transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:border-[#6B9B37] hover:text-[#6B9B37] transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery Info */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#6B9B37] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Delivery</p>
                    <p className="text-xs text-gray-600">
                      {product.deliveryAvailable
                        ? "Available in your area"
                        : "Contact seller for pickup"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#6B9B37] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Buyer Protection</p>
                    <p className="text-xs text-gray-600">Money-back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
