"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo-2.png"
                alt="POSbok"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Your local marketplace for quality products from trusted sellers across Nigeria.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#6B9B37] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#6B9B37] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#6B9B37] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Computers & Accessories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Mobile Phones
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Fashion
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Home & Office
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#6B9B37] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  123 Market Street, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6B9B37] flex-shrink-0" />
                <span className="text-sm text-gray-600">+234 800 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6B9B37] flex-shrink-0" />
                <span className="text-sm text-gray-600">support@posbok.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} POSbok. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-[#6B9B37] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-[#6B9B37] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
