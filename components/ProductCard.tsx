"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  rating: number
  seller: string
  location: string
  deliveryAvailable: boolean
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#6B9B37] text-[#6B9B37]" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#6B9B37] text-[#6B9B37]" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" />
      ))}
    </div>
  )
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
  rating,
  seller,
  location,
  deliveryAvailable,
}: ProductCardProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Link href={`/product/${id}`} className="product-card bg-white rounded-lg overflow-hidden cursor-pointer block">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Delivery Badge */}
        <div
          className={`absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded ${
            deliveryAvailable ? "badge-available" : "badge-unavailable"
          }`}
        >
          {deliveryAvailable ? "Delivery Available" : "Delivery Unavailable"}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Product Name */}
        <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem]">
          {name}
        </h3>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1.5 sm:mb-2">
          <span className="text-sm sm:text-lg font-bold text-gray-900">
            {formatPrice(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
              {discount && (
                <span className="text-[10px] sm:text-xs font-medium text-[#6B9B37] bg-[#F5F5DC] px-1.5 sm:px-2 py-0.5 rounded">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>

        {/* Rating */}
        <div className="mb-2 sm:mb-3">
          <StarRating rating={rating} />
        </div>

        {/* Seller Info */}
        <div className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
          <span className="font-medium">Sold By:</span> {seller},
          <br />
          {location}
        </div>
      </div>
    </Link>
  )
}
