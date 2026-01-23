"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { storeApi, Store, Category } from "@/lib/api"
import { useCart } from "@/contexts/CartContext"
import { StoreFooter } from "@/components/StoreFooter"
import { ShoppingCart, Menu, X, MapPin, Loader2, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react"

function StoreHeader({ store, storeSlug }: { store: Store | null; storeSlug: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { itemCount } = useCart()

  const businessName = store?.Business?.business_name || "Store"

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
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

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href={`/${storeSlug}`} className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors">
              Home
            </Link>
            <Link href={`/${storeSlug}/about`} className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors">
              About Us
            </Link>
            <Link href={`/${storeSlug}/contact`} className="text-[#6B9B37] font-medium transition-colors">
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href={`/${storeSlug}/cart`} className="relative p-2 text-[#6B9B37] hover:text-[#4A7A1A] transition-colors">
              <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B9B37] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-gray-800 hover:text-[#6B9B37] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link href={`/${storeSlug}`} className="text-gray-800 hover:text-[#6B9B37] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href={`/${storeSlug}/about`} className="text-gray-800 hover:text-[#6B9B37] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                About Us
              </Link>
              <Link href={`/${storeSlug}/contact`} className="text-[#6B9B37] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default function StoreContactPage() {
  const params = useParams()
  const storeSlug = params.storeSlug as string

  const [store, setStore] = useState<Store | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const { setStoreSlug } = useCart()

  useEffect(() => {
    setStoreSlug(storeSlug)
  }, [storeSlug, setStoreSlug])

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
      } finally {
        setIsLoading(false)
      }
    }
    fetchStore()
  }, [storeSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
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
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors">
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  const businessName = store?.Business?.business_name || "Store"

  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      <StoreHeader store={store} storeSlug={storeSlug} />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#6B9B37] to-[#4A7A1A] text-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg sm:text-xl text-white/90">Get in touch with {businessName}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our products or services? We'd love to hear from you.
                Reach out using any of the methods below.
              </p>

              <div className="space-y-6">
                {store?.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6B9B37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#6B9B37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">{store.address}</p>
                    </div>
                  </div>
                )}

                {store?.contact_phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6B9B37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#6B9B37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <a href={`tel:${store.contact_phone}`} className="text-gray-600 hover:text-[#6B9B37] transition-colors">
                        {store.contact_phone}
                      </a>
                    </div>
                  </div>
                )}

                {store?.whatsapp_number && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6B9B37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-[#6B9B37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                      <a
                        href={`https://wa.me/${store.whatsapp_number.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#6B9B37] transition-colors"
                      >
                        {store.whatsapp_number}
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Click to chat on WhatsApp</p>
                    </div>
                  </div>
                )}

                {store?.contact_email && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#6B9B37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#6B9B37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a href={`mailto:${store.contact_email}`} className="text-gray-600 hover:text-[#6B9B37] transition-colors">
                        {store.contact_email}
                      </a>
                    </div>
                  </div>
                )}

                {!store?.address && !store?.contact_phone && !store?.contact_email && !store?.whatsapp_number && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-700">Contact information is not yet available for this store.</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              {store?.whatsapp_number && (
                <div className="mt-8">
                  <a
                    href={`https://wa.me/${store.whatsapp_number.replace(/[^0-9]/g, '')}?text=Hello, I'm interested in your products.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="text-[#6B9B37] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent"
                      placeholder="Product inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9B37] focus:border-transparent resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <StoreFooter store={store} storeSlug={storeSlug} categories={categories} />
    </div>
  )
}
