"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ImageCarousel } from "@/components/ImageCarousel"
import { useCart } from "@/contexts/CartContext"
import { useReviews } from "@/hooks/useReviews"
import { SubmitReviewData } from "@/lib/api"
import { Star, Truck, Shield, ChevronLeft, Minus, Plus, ShoppingCart, Heart, Share2, MapPin, ThumbsUp, Loader2, CheckCircle } from "lucide-react"

// Sample product data - in production this would come from an API
const products = [
  {
    id: "1",
    name: "ABC Wireless Mouse + 2 extra Batteries",
    price: 5400,
    originalPrice: 6000,
    discount: 10,
    images: [
      { id: 1, image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop", is_primary: true },
      { id: 2, image_url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop", is_primary: false },
      { id: 3, image_url: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=800&h=800&fit=crop", is_primary: false },
      { id: 4, image_url: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=800&h=800&fit=crop", is_primary: false },
    ],
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
    images: [
      { id: 1, image_url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop", is_primary: true },
      { id: 2, image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop", is_primary: false },
    ],
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

function StarRating({ rating, size = "default", interactive = false, onRate }: { rating: number; size?: "default" | "large"; interactive?: boolean; onRate?: (rating: number) => void }) {
  const [hoverRating, setHoverRating] = useState(0)
  const fullStars = Math.floor(interactive ? hoverRating || rating : rating)
  const hasHalfStar = !interactive && rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const starSize = size === "large" ? "w-5 h-5" : "w-4 h-4"

  const handleClick = (starIndex: number) => {
    if (interactive && onRate) {
      onRate(starIndex)
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <button
          key={starIndex}
          type="button"
          disabled={!interactive}
          onClick={() => handleClick(starIndex)}
          onMouseEnter={() => interactive && setHoverRating(starIndex)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`${starSize} ${
              starIndex <= (hoverRating || rating)
                ? "fill-[#6B9B37] text-[#6B9B37]"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ review, onMarkHelpful }: { review: any; onMarkHelpful: (id: number) => void }) {
  const [isMarking, setIsMarking] = useState(false)

  const handleMarkHelpful = async () => {
    setIsMarking(true)
    try {
      await onMarkHelpful(review.id)
    } finally {
      setIsMarking(false)
    }
  }

  return (
    <div className="border-b border-gray-100 pb-6 last:border-0">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-medium text-gray-900">{review.customer_name}</p>
          <StarRating rating={review.rating} />
        </div>
        <span className="text-xs text-gray-500">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
      {review.review_title && (
        <h4 className="font-medium text-gray-900 mt-2">{review.review_title}</h4>
      )}
      <p className="text-gray-600 text-sm mt-1">{review.review_text}</p>
      {review.admin_response && (
        <div className="mt-3 pl-4 border-l-2 border-[#6B9B37]">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-[#6B9B37]">Seller Response:</span> {review.admin_response}
          </p>
        </div>
      )}
      <button
        onClick={handleMarkHelpful}
        disabled={isMarking}
        className="flex items-center gap-1 mt-3 text-xs text-gray-500 hover:text-[#6B9B37] transition-colors disabled:opacity-50"
      >
        <ThumbsUp className="w-3.5 h-3.5" />
        Helpful ({review.helpful_count || 0})
      </button>
    </div>
  )
}

function ReviewForm({ productId, onSubmit }: { productId: string; onSubmit: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<SubmitReviewData>({
    customer_name: "",
    customer_email: "",
    rating: 0,
    review_title: "",
    review_text: "",
  })
  const { submitReview } = useReviews()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.rating === 0) {
      setError("Please select a rating")
      return
    }
    setIsSubmitting(true)
    setError(null)
    try {
      await submitReview(productId, formData)
      setIsSuccess(true)
      setFormData({
        customer_name: "",
        customer_email: "",
        rating: 0,
        review_title: "",
        review_text: "",
      })
      onSubmit()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h4 className="font-semibold text-gray-900 mb-2">Thank you for your review!</h4>
        <p className="text-sm text-gray-600">Your review has been submitted and is pending approval.</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sm text-[#6B9B37] hover:underline"
        >
          Write another review
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating *</label>
        <StarRating
          rating={formData.rating}
          size="large"
          interactive
          onRate={(rating) => setFormData({ ...formData, rating })}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
          <input
            type="text"
            required
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
          <input
            type="email"
            required
            value={formData.customer_email}
            onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Review Title</label>
        <input
          type="text"
          value={formData.review_title}
          onChange={(e) => setFormData({ ...formData, review_title: e.target.value })}
          placeholder="Summarize your experience"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
        <textarea
          required
          rows={4}
          value={formData.review_text}
          onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
          placeholder="Tell others about your experience with this product"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-2 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  )
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const { addToCart, isLoading: cartLoading } = useCart()
  const {
    reviews,
    summary,
    pagination,
    isLoading: reviewsLoading,
    fetchReviews,
    markHelpful,
    sortBy,
    setSortBy,
  } = useReviews()

  // Find product by ID
  const product = products.find((p) => p.id === productId) || products[0]

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews(productId)
  }, [productId, fetchReviews])

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

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      await addToCart(parseInt(productId), quantity)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (err) {
      console.error("Failed to add to cart:", err)
    } finally {
      setIsAddingToCart(false)
    }
  }

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
              Back to Products
            </Link>
          </nav>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Product Images Carousel */}
            <ImageCarousel
              images={product.images}
              productName={product.name}
              badge={{
                text: product.deliveryAvailable ? "Delivery Available" : "Delivery Unavailable",
                variant: product.deliveryAvailable ? "success" : "error",
              }}
            />

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <StarRating rating={summary?.averageRating || product.rating} size="large" />
                  <span className="text-sm text-gray-600">
                    ({summary?.totalReviews || product.reviewCount} reviews)
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
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || cartLoading || !product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : addedToCart ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
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

          {/* Reviews Section */}
          <div className="mt-12 lg:mt-16">
            <div className="bg-white rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Customer Reviews
                  {summary && (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({summary.totalReviews} reviews)
                    </span>
                  )}
                </h2>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6B9B37]"
                >
                  <option value="recent">Most Recent</option>
                  <option value="helpful">Most Helpful</option>
                  <option value="rating_high">Highest Rated</option>
                  <option value="rating_low">Lowest Rated</option>
                </select>
              </div>

              {/* Rating Summary */}
              {summary && (
                <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-6 border-b border-gray-100">
                  <div className="text-center sm:text-left">
                    <div className="text-4xl font-bold text-gray-900">{summary.averageRating.toFixed(1)}</div>
                    <StarRating rating={summary.averageRating} size="large" />
                    <p className="text-sm text-gray-500 mt-1">{summary.totalReviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = summary.ratingDistribution[star as keyof typeof summary.ratingDistribution] || 0
                      const percentage = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 w-8">{star} star</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#6B9B37] rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500 w-12">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Reviews List */}
              {reviewsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#6B9B37]" />
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-6 mb-8">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} onMarkHelpful={markHelpful} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No reviews yet. Be the first to review this product!
                </div>
              )}

              {/* Write Review Form */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
                <ReviewForm productId={productId} onSubmit={() => fetchReviews(productId)} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
