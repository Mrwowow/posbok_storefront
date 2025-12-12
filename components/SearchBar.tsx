"use client"

import { Search } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export function SearchBar({ placeholder = "Search products...", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-2 sm:px-0">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input block w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-[#6B9B37] rounded-full bg-white placeholder-gray-400 focus:outline-none focus:border-[#4A7A1A] transition-all"
          placeholder={placeholder}
        />
      </div>
    </form>
  )
}
