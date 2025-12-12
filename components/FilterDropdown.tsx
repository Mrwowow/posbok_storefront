"use client"

import { useState } from "react"
import { ChevronDown, MapPin, Grid3X3 } from "lucide-react"

interface FilterDropdownProps {
  type: "location" | "category"
  options: string[]
  selected?: string
  onSelect?: (value: string) => void
}

export function FilterDropdown({ type, options, selected, onSelect }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const Icon = type === "location" ? MapPin : Grid3X3
  const label = type === "location" ? "Filter by Location" : "Filter by Categories"

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-[#6B9B37] transition-colors text-sm sm:text-base"
      >
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B9B37]" />
        <span className="text-gray-700 truncate max-w-[100px] sm:max-w-none">
          {selected || label}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-48 sm:w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
            <div className="py-2">
              <button
                onClick={() => {
                  onSelect?.("")
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-50"
              >
                All {type === "location" ? "Locations" : "Categories"}
              </button>
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSelect?.(option)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5DC] transition-colors ${
                    selected === option ? "text-[#6B9B37] font-medium bg-[#F5F5DC]" : "text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
