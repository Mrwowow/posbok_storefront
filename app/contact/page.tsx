"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#6B9B37] text-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Have a question or need assistance? We're here to help.
              Reach out to us anytime.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  We'd love to hear from you. Whether you have a question about our services,
                  pricing, or anything else, our team is ready to answer all your questions.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F5F5DC] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#6B9B37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Our Office</h3>
                      <p className="text-gray-600 text-sm">
                        123 Market Street<br />
                        Lagos, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F5F5DC] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#6B9B37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600 text-sm">
                        +234 800 123 4567<br />
                        +234 800 765 4321
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F5F5DC] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#6B9B37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600 text-sm">
                        support@posbok.com<br />
                        sales@posbok.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F5F5DC] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#6B9B37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600 text-sm">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Send us a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-[#6B9B37] text-white flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[#6B9B37] font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9B37] transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9B37] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9B37] transition-colors bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Customer Support</option>
                        <option value="seller">Seller Inquiry</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9B37] transition-colors resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-lg hover:bg-[#4A7A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
              Find Us
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.63273955943!2d3.1438721!3d6.5480357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
