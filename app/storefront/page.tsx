"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { allProductsApi, AllProductsItem } from "@/lib/api"
import {
  Search, ShoppingCart, Plus, Store,
  ChevronLeft, ChevronRight,
} from "lucide-react"

// ── Product card ───────────────────────────────────────────────────────────────

function StorefrontProductCard({ product }: { product: AllProductsItem }) {
  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n)

  const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0]
  const imageUrl = primaryImage?.image_url || null

  const discount =
    product.supposed_price && product.supposed_price > product.selling_price
      ? Math.round(((product.supposed_price - product.selling_price) / product.supposed_price) * 100)
      : null

  const storeSlug = product.store_slug
  const storeLogo = product.store_logo

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `/${storeSlug}/product/${product.id}`
  }

  return (
    <Link
      href={`/${storeSlug}/product/${product.id}`}
      className="bg-white rounded-xl overflow-hidden block border border-gray-100 hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Store className="w-10 h-10 text-gray-300" />
          </div>
        )}

        {/* Stock badge */}
        <div className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-medium rounded ${product.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
          {product.in_stock ? "In Stock" : "Out of Stock"}
        </div>

        {/* Items left */}
        {product.in_stock && product.quantity_display && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-[9px] font-medium px-1.5 py-0.5 rounded">
            {product.quantity_display} left
          </div>
        )}

        {/* Quick add */}
        <button
          onClick={handleAddToCart}
          disabled={!product.in_stock}
          aria-label="View product"
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
            product.in_stock
              ? "bg-[#6B9B37] text-white hover:bg-[#4A7A1A]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Store badge */}
        <div className="flex items-center gap-1.5 mb-2">
          {storeLogo ? (
            <Image src={storeLogo} alt={product.store_name} width={16} height={16} className="w-4 h-4 rounded-full object-cover" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-[#6B9B37]/20 flex items-center justify-center flex-shrink-0">
              <Store className="w-2.5 h-2.5 text-[#6B9B37]" />
            </div>
          )}
          <span className="text-[10px] text-gray-400 truncate">{product.store_name}</span>
        </div>

        <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1.5 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex flex-wrap items-center gap-1 mb-2">
          <span className="text-sm font-bold text-gray-900">{formatPrice(product.selling_price)}</span>
          {product.supposed_price && product.supposed_price > product.selling_price && (
            <>
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.supposed_price)}</span>
              {discount && (
                <span className="text-[10px] font-medium text-[#6B9B37] bg-[#F5F5DC] px-1.5 py-0.5 rounded">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>

        {product.ProductCategory?.name && (
          <span className="inline-block bg-gray-100 text-[10px] px-2 py-0.5 rounded text-gray-500 mb-2">
            {product.ProductCategory.name}
          </span>
        )}

        <button
          onClick={handleAddToCart}
          disabled={!product.in_stock}
          className={`mt-1 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            product.in_stock
              ? "bg-[#6B9B37] text-white hover:bg-[#4A7A1A]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ShoppingCart className="w-3 h-3" />
          {product.in_stock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </Link>
  )
}

// ── Skeleton card ──────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-5 bg-gray-200 rounded w-1/2" />
        <div className="h-7 bg-gray-200 rounded-lg w-full mt-1" />
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function StorefrontPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""

  const [products, setProducts] = useState<AllProductsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchInput, setSearchInput] = useState(initialSearch)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const uniqueStores = Array.from(
    new Map(products.map(p => [p.store_slug, { slug: p.store_slug, name: p.store_name, logo: p.store_logo }])).values()
  )

  const fetchProducts = useCallback(async (page: number, search: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await allProductsApi.getAll({ page, limit: 20, search: search || undefined })
      setProducts(result.products)
      setTotalPages(result.pagination.totalPages)
      setTotalItems(result.pagination.total)
      setCurrentPage(result.pagination.page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts(1, initialSearch)
  }, [fetchProducts, initialSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    setSearchQuery(searchInput)
    fetchProducts(1, searchInput)
  }

  const handleClearSearch = () => {
    setSearchInput("")
    setSearchQuery("")
    fetchProducts(1, "")
  }

  const handlePageChange = (page: number) => {
    fetchProducts(page, searchQuery)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Page header */}
      <div className="bg-[#FAFAF0] border-b border-gray-100 pt-16 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B9B37] mb-2">Live Products</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">POSBOK Storefront</h1>
          <p className="text-gray-500 text-sm">
            Browse published products from all stores on the POSBOK platform.
          </p>
        </div>
      </div>

      {/* Main content */}
      <section className="flex-1 bg-[#FAFAF0] py-10 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Search + count row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            {!isLoading && totalItems > 0 && (
              <p className="text-gray-500 text-sm">
                {totalItems} product{totalItems !== 1 ? "s" : ""} from{" "}
                {uniqueStores.length} store{uniqueStores.length !== 1 ? "s" : ""}
              </p>
            )}
            {isLoading && <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />}

            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#6B9B37] text-white text-sm font-medium rounded-full hover:bg-[#4A7A1A] transition-colors"
              >
                Search
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-full hover:border-gray-400 transition-colors bg-white"
                >
                  Clear
                </button>
              )}
            </form>
          </div>

          {/* Active search indicator */}
          {searchQuery && (
            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm text-gray-600">
                Results for <span className="font-semibold text-gray-900">&ldquo;{searchQuery}&rdquo;</span>
              </span>
              <button onClick={handleClearSearch} className="text-xs text-[#6B9B37] hover:underline">
                Clear
              </button>
            </div>
          )}

          {/* Store pills */}
          {!isLoading && uniqueStores.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {uniqueStores.map(s => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-[#6B9B37] hover:text-[#6B9B37] transition-colors"
                >
                  {s.logo ? (
                    <Image src={s.logo} alt={s.name} width={14} height={14} className="w-3.5 h-3.5 rounded-full object-cover" />
                  ) : (
                    <Store className="w-3.5 h-3.5" />
                  )}
                  {s.name}
                </Link>
              ))}
            </div>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => fetchProducts(currentPage, searchQuery)}
                className="px-6 py-2.5 bg-[#6B9B37] text-white rounded-full text-sm font-medium hover:bg-[#4A7A1A] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-6">
                No results for &ldquo;{searchQuery}&rdquo;. Try a different search term.
              </p>
              <button
                onClick={handleClearSearch}
                className="px-6 py-2.5 bg-[#6B9B37] text-white rounded-full text-sm font-medium hover:bg-[#4A7A1A] transition-colors"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {products.map(p => <StorefrontProductCard key={p.id} product={p} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !isLoading && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-[#6B9B37] hover:text-[#6B9B37] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…")
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p as number)}
                      className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                        p === currentPage
                          ? "bg-[#6B9B37] text-white"
                          : "border border-gray-200 bg-white text-gray-700 hover:border-[#6B9B37] hover:text-[#6B9B37]"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-[#6B9B37] hover:text-[#6B9B37] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
