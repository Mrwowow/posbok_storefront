"use client"

import { useState, useCallback } from 'react'
import { reviewsApi, Review, ReviewsResponse, SubmitReviewData } from '@/lib/api'

interface UseReviewsOptions {
  initialPage?: number
  initialLimit?: number
  initialSortBy?: 'recent' | 'helpful' | 'rating_high' | 'rating_low'
}

interface UseReviewsReturn {
  reviews: Review[]
  pagination: ReviewsResponse['pagination'] | null
  summary: ReviewsResponse['summary'] | null
  isLoading: boolean
  error: string | null
  page: number
  sortBy: 'recent' | 'helpful' | 'rating_high' | 'rating_low'
  ratingFilter: number | null
  fetchReviews: (productId: number | string) => Promise<void>
  submitReview: (productId: number | string, reviewData: SubmitReviewData) => Promise<Review>
  markHelpful: (reviewId: number) => Promise<void>
  setPage: (page: number) => void
  setSortBy: (sortBy: 'recent' | 'helpful' | 'rating_high' | 'rating_low') => void
  setRatingFilter: (rating: number | null) => void
}

export function useReviews(options: UseReviewsOptions = {}): UseReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>([])
  const [pagination, setPagination] = useState<ReviewsResponse['pagination'] | null>(null)
  const [summary, setSummary] = useState<ReviewsResponse['summary'] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(options.initialPage || 1)
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating_high' | 'rating_low'>(
    options.initialSortBy || 'recent'
  )
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)

  const fetchReviews = useCallback(async (productId: number | string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await reviewsApi.getProductReviews(productId, {
        page,
        limit: options.initialLimit || 10,
        sortBy,
        rating: ratingFilter || undefined,
      })
      setReviews(response?.reviews || [])
      setPagination(response?.pagination || null)
      setSummary(response?.summary || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
      setReviews([]) // Ensure reviews is always an array even on error
      console.error('Error fetching reviews:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page, sortBy, ratingFilter, options.initialLimit])

  const submitReview = useCallback(async (productId: number | string, reviewData: SubmitReviewData) => {
    setIsLoading(true)
    setError(null)
    try {
      const newReview = await reviewsApi.submitReview(productId, reviewData)
      return newReview
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review')
      console.error('Error submitting review:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const markHelpful = useCallback(async (reviewId: number) => {
    try {
      const result = await reviewsApi.markReviewHelpful(reviewId)
      // Update the review in the list with the new helpful count
      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === reviewId
            ? { ...review, helpful_count: result.helpful_count }
            : review
        )
      )
    } catch (err) {
      console.error('Error marking review as helpful:', err)
      throw err
    }
  }, [])

  return {
    reviews,
    pagination,
    summary,
    isLoading,
    error,
    page,
    sortBy,
    ratingFilter,
    fetchReviews,
    submitReview,
    markHelpful,
    setPage,
    setSortBy,
    setRatingFilter,
  }
}
