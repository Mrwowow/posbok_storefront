"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface CarouselImage {
  id?: number
  image_url: string
  is_primary?: boolean
}

interface ImageCarouselProps {
  images: CarouselImage[]
  productName: string
  badge?: {
    text: string
    variant: "success" | "error" | "info"
  }
}

export function ImageCarousel({ images, productName, badge }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // If no images provided, use a placeholder
  const displayImages = images.length > 0
    ? images
    : [{ image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop" }]

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
  }, [displayImages.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
  }, [displayImages.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const badgeColors = {
    success: "bg-[#6B9B37] text-white",
    error: "bg-gray-600 text-white",
    info: "bg-blue-500 text-white",
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden group">
        <Image
          src={displayImages[currentIndex].image_url}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300"
          priority
        />

        {/* Badge */}
        {badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded ${badgeColors[badge.variant]}`}>
            {badge.text}
          </span>
        )}

        {/* Navigation Arrows - Only show if more than 1 image */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[#6B9B37] w-4"
                    : "bg-white/70 hover:bg-white"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip - Only show if more than 1 image */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((img, index) => (
            <button
              key={img.id || index}
              onClick={() => goToSlide(index)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-[#6B9B37] ring-2 ring-[#6B9B37]/30"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={img.image_url}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
