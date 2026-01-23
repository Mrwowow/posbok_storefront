"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { storeApi, Store, Product, ProductsResponse, Category } from "@/lib/api"
import { useCart } from "@/contexts/CartContext"
import { SearchBar } from "@/components/SearchBar"
import { StoreFooter } from "@/components/StoreFooter"
import { ShoppingCart, Menu, X, MapPin, Loader2, ChevronDown } from "lucide-react"

function StoreHeader({ store, storeSlug }: { store: Store | null; storeSlug: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { itemCount } = useCart()

  const businessName = store?.Business?.business_name || "Store"

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href={`/${storeSlug}`}
              className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href={`/${storeSlug}/about`}
              className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              href={`/${storeSlug}/contact`}
              className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Cart */}
            <Link href={`/${storeSlug}/cart`} className="relative p-2 text-[#6B9B37] hover:text-[#4A7A1A] transition-colors">
              <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B9B37] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-800 hover:text-[#6B9B37] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link
                href={`/${storeSlug}`}
                className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={`/${storeSlug}/about`}
                className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href={`/${storeSlug}/contact`}
                className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

function ProductCard({ product, storeSlug }: { product: Product; storeSlug: string }) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Get the primary image or first image from the images array
  const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0]
  const imageUrl = primaryImage?.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"

  // Calculate discount if supposed_price exists and is higher than selling_price
  const discount = product.supposed_price && product.supposed_price > product.selling_price
    ? Math.round(((product.supposed_price - product.selling_price) / product.supposed_price) * 100)
    : null

  return (
    <Link href={`/${storeSlug}/product/${product.id}`} className="product-card bg-white rounded-lg overflow-hidden cursor-pointer block">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* In Stock Badge */}
        <div
          className={`absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded ${
            product.in_stock ? "badge-available" : "badge-unavailable"
          }`}
        >
          {product.in_stock ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Product Name */}
        <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1.5 sm:mb-2">
          <span className="text-sm sm:text-lg font-bold text-gray-900">
            {formatPrice(product.selling_price)}
          </span>
          {product.supposed_price && product.supposed_price > product.selling_price && (
            <>
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {formatPrice(product.supposed_price)}
              </span>
              {discount && (
                <span className="text-[10px] sm:text-xs font-medium text-[#6B9B37] bg-[#F5F5DC] px-1.5 sm:px-2 py-0.5 rounded">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>

        {/* Category & Brand */}
        <div className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
          {product.ProductCategory?.name && (
            <span className="inline-block bg-gray-100 px-2 py-0.5 rounded mr-1 mb-1">
              {product.ProductCategory.name}
            </span>
          )}
          {product.brand_name && (
            <span className="inline-block bg-[#F5F5DC] px-2 py-0.5 rounded mb-1">
              {product.brand_name}
            </span>
          )}
        </div>

        {/* Quantity Display */}
        {product.quantity_display && (
          <div className="text-[10px] sm:text-xs text-gray-400 mt-1">
            {product.quantity_display}
          </div>
        )}
      </div>
    </Link>
  )
}

function CategoryDropdown({
  categories,
  selectedId,
  onSelect,
}: {
  categories: Category[]
  selectedId: number | null
  onSelect: (categoryId: number | null) => void
}) {
  return (
    <div className="relative">
      <select
        value={selectedId ?? ""}
        onChange={(e) => {
          const value = e.target.value
          onSelect(value === "" ? null : parseInt(value, 10))
        }}
        className="appearance-none w-full sm:w-48 px-4 py-2.5 sm:py-3 pr-10 bg-white border border-gray-200 rounded-lg text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent cursor-pointer"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  )
}

export default function StorePage() {
  const params = useParams()
  const storeSlug = params.storeSlug as string

  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [pagination, setPagination] = useState<ProductsResponse['pagination'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const { setStoreSlug } = useCart()

  // Update cart context with current store slug
  useEffect(() => {
    setStoreSlug(storeSlug)
  }, [storeSlug, setStoreSlug])

  // Fetch store info
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
        console.error("Error fetching store:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStore()
  }, [storeSlug])

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      if (!store && !error) return

      setIsLoadingProducts(true)
      try {
        const response = await storeApi.getProducts(storeSlug, {
          search: searchQuery || undefined,
          categoryId: selectedCategoryId || undefined,
        })
        setProducts(response.products)
        setPagination(response.pagination)
        if (response.categories) {
          setCategories(response.categories)
        }
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setIsLoadingProducts(false)
      }
    }
    fetchProducts()
  }, [storeSlug, store, error, searchQuery, selectedCategoryId])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

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
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      <StoreHeader store={store} storeSlug={storeSlug} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Store Banner */}
        {store?.store_front_image && (
          <div className="relative h-40 sm:h-56 md:h-72 rounded-lg overflow-hidden mb-6">
            <Image
              src={store.store_front_image}
              alt={store.Business?.business_name || "Store"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-2xl sm:text-3xl font-bold">{store.Business?.business_name}</h1>
              {store.address && (
                <p className="text-sm text-white/80 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {store.address}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Storefront Title (if no banner) */}
        {!store?.store_front_image && (
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-[#6B9B37] tracking-wide">
              {store?.Business?.business_name || "STOREFRONT"}
            </h1>
            {store?.business_description && (
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{store.business_description}</p>
            )}
            {store?.business_motto && (
              <p className="text-[#6B9B37] mt-1 text-sm italic">{store.business_motto}</p>
            )}
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            {/* Search Bar */}
            <div className="flex-grow">
              <SearchBar
                placeholder="Search products..."
                onSearch={handleSearch}
              />
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex-shrink-0">
                <CategoryDropdown
                  categories={categories}
                  selectedId={selectedCategoryId}
                  onSelect={setSelectedCategoryId}
                />
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {isLoadingProducts ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#6B9B37]" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} storeSlug={storeSlug} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    // Fetch page
                    storeApi.getProducts(storeSlug, {
                      page,
                      search: searchQuery || undefined,
                      categoryId: selectedCategoryId || undefined,
                    }).then((response) => {
                      setProducts(response.products)
                      setPagination(response.pagination)
                    })
                  }}
                  className={`w-10 h-10 rounded-lg ${
                    page === pagination.page
                      ? "bg-[#6B9B37] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <StoreFooter store={store} storeSlug={storeSlug} categories={categories} />
    </div>
  )
}
