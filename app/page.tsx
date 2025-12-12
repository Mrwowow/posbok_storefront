"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { SearchBar } from "@/components/SearchBar"
import { FilterDropdown } from "@/components/FilterDropdown"
import { ProductCard } from "@/components/ProductCard"

// Sample product data based on the design
const products = [
  {
    id: "1",
    name: "ABC Wireless Mouse + 2 extra Batteries",
    price: 5400,
    originalPrice: 6000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    rating: 4.5,
    seller: "Earot Communications",
    location: "Oleh, Delta State",
    deliveryAvailable: true,
  },
  {
    id: "2",
    name: "Oraimo Wireless Mouse + Mouse Pad",
    price: 7500,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop",
    rating: 5,
    seller: "Unique Accessories",
    location: "Ozoro, Delta State",
    deliveryAvailable: false,
  },
  {
    id: "3",
    name: "Xiam Wireless Mouse",
    price: 5400,
    originalPrice: 6000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=400&h=400&fit=crop",
    rating: 4,
    seller: "Exclusive Gadgets",
    location: "Ughelli, Delta State",
    deliveryAvailable: true,
  },
  {
    id: "4",
    name: "Dell Wireless Mouse",
    price: 7500,
    image: "https://images.unsplash.com/photo-1629429407756-446d66f5b24f?w=400&h=400&fit=crop",
    rating: 4.5,
    seller: "ABC Phone World",
    location: "Warri, Delta State",
    deliveryAvailable: false,
  },
  {
    id: "5",
    name: "HP Wireless Mouse",
    price: 7500,
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=400&fit=crop",
    rating: 4.5,
    seller: "XYZ Accessories",
    location: "Yenagoa, Bayelsa State",
    deliveryAvailable: false,
  },
]

const locations = [
  "Delta State",
  "Bayelsa State",
  "Rivers State",
  "Edo State",
  "Lagos State",
]

const categories = [
  "Electronics",
  "Computers & Accessories",
  "Mobile Phones",
  "Fashion",
  "Home & Office",
]

export default function StorefrontPage() {
  const [searchQuery, setSearchQuery] = useState("Wireless Mouse")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    console.log("Searching for:", query)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Storefront Title */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-[#6B9B37] tracking-wide">
            STOREFRONT
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <SearchBar
            placeholder="Wireless Mouse"
            onSearch={handleSearch}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 px-1 sm:px-0">
          <FilterDropdown
            type="location"
            options={locations}
            selected={selectedLocation}
            onSelect={setSelectedLocation}
          />
          <FilterDropdown
            type="category"
            options={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Product Grid - Responsive columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              image={product.image}
              rating={product.rating}
              seller={product.seller}
              location={product.location}
              deliveryAvailable={product.deliveryAvailable}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
