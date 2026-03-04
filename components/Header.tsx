"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-2.png"
              alt="POSbok"
              width={150}
              height={50}
              className="h-10 sm:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="#features"
              className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors"
            >
              Learn
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors"
            >
              Company
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Get Started CTA */}
            <Link
              href="#pricing"
              className="hidden md:inline-flex items-center px-4 py-2 bg-[#6B9B37] text-white text-sm font-semibold rounded-full hover:bg-[#4A7A1A] transition-colors"
            >
              GET STARTED
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
              <Link href="#features" className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
              <Link href="#pricing" className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
              <Link href="#faq" className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Learn</Link>
              <Link href="/about" className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Company</Link>
              <Link href="#pricing" className="inline-flex items-center justify-center px-4 py-2 bg-[#6B9B37] text-white text-sm font-semibold rounded-full hover:bg-[#4A7A1A] transition-colors mt-2" onClick={() => setIsMobileMenuOpen(false)}>GET STARTED</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
