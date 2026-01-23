"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { Store, Category } from "@/lib/api"

interface StoreFooterProps {
  store: Store | null
  storeSlug: string
  categories?: Category[]
}

export function StoreFooter({ store, storeSlug, categories = [] }: StoreFooterProps) {
  const businessName = store?.Business?.business_name || "Store"

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href={`/${storeSlug}`} className="inline-block mb-4">
              {store?.business_logo ? (
                <Image
                  src={store.business_logo}
                  alt={businessName}
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              ) : (
                <Image
                  src="/logo-2.png"
                  alt="POSbok"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              )}
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              {store?.business_description || store?.business_motto || `Welcome to ${businessName}`}
            </p>
            <div className="flex space-x-4">
              {store?.facebook_url && (
                <a href={store.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#6B9B37] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {store?.twitter_url && (
                <a href={store.twitter_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#6B9B37] transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {store?.instagram_url && (
                <a href={store.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#6B9B37] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {!store?.facebook_url && !store?.twitter_url && !store?.instagram_url && (
                <>
                  <span className="text-gray-300">
                    <Facebook className="w-5 h-5" />
                  </span>
                  <span className="text-gray-300">
                    <Twitter className="w-5 h-5" />
                  </span>
                  <span className="text-gray-300">
                    <Instagram className="w-5 h-5" />
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${storeSlug}`} className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href={`/${storeSlug}/about`} className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`/${storeSlug}/contact`} className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={`/${storeSlug}/cart`} className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.length > 0 ? (
                categories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/${storeSlug}?category=${category.id}`}
                      className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400">No categories available</li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {store?.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#6B9B37] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{store.address}</span>
                </li>
              )}
              {store?.contact_phone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#6B9B37] flex-shrink-0" />
                  <a href={`tel:${store.contact_phone}`} className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                    {store.contact_phone}
                  </a>
                </li>
              )}
              {store?.whatsapp_number && (
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#6B9B37] flex-shrink-0" />
                  <a
                    href={`https://wa.me/${store.whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors"
                  >
                    WhatsApp: {store.whatsapp_number}
                  </a>
                </li>
              )}
              {store?.contact_email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#6B9B37] flex-shrink-0" />
                  <a href={`mailto:${store.contact_email}`} className="text-sm text-gray-600 hover:text-[#6B9B37] transition-colors">
                    {store.contact_email}
                  </a>
                </li>
              )}
              {!store?.address && !store?.contact_phone && !store?.contact_email && !store?.whatsapp_number && (
                <li className="text-sm text-gray-400">Contact information not available</li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {businessName}. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              Powered by <Link href="/" className="hover:text-[#6B9B37] transition-colors">POSbok</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
