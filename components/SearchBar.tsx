"use client"

import { Search, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  value?: string
  onChange?: (query: string) => void
  debounceMs?: number
}

export function SearchBar({
  placeholder = "Search products...",
  onSearch,
  value,
  onChange,
  debounceMs = 300
}: SearchBarProps) {
  const [query, setQuery] = useState(value || "")
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Sync with external value prop
  useEffect(() => {
    if (value !== undefined && value !== query) {
      setQuery(value)
    }
  }, [value])

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Clear any pending debounced search
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    onSearch?.(query)
  }

  const handleChange = (newValue: string) => {
    setQuery(newValue)
    onChange?.(newValue)

    // Debounce the search
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    debounceTimer.current = setTimeout(() => {
      onSearch?.(newValue)
    }, debounceMs)
  }

  const handleClear = () => {
    // Clear any pending debounced search
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    setQuery("")
    onChange?.("")
    onSearch?.("")
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          className="search-input block w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent transition-all"
          placeholder={placeholder}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>
    </form>
  )
}
