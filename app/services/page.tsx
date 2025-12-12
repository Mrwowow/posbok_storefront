"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Store, Truck, Shield, CreditCard, Headphones, BarChart } from "lucide-react"

const services = [
  {
    icon: Store,
    title: "Seller Marketplace",
    description: "List your products on our platform and reach thousands of customers across Nigeria. Easy setup, powerful tools.",
    features: ["Free seller registration", "Product listing tools", "Inventory management", "Sales analytics"],
  },
  {
    icon: Truck,
    title: "Delivery Services",
    description: "Reliable delivery options to get products from sellers to buyers safely and on time.",
    features: ["Same-day delivery", "Interstate shipping", "Package tracking", "Secure handling"],
  },
  {
    icon: Shield,
    title: "Buyer Protection",
    description: "Shop with confidence knowing your purchases are protected by our guarantee program.",
    features: ["Money-back guarantee", "Verified sellers", "Product authenticity", "Dispute resolution"],
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Multiple payment options with bank-level security for safe transactions.",
    features: ["Card payments", "Bank transfers", "Mobile money", "Pay on delivery"],
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Our dedicated support team is available to help you with any questions or issues.",
    features: ["24/7 chat support", "Phone assistance", "Email support", "Help center"],
  },
  {
    icon: BarChart,
    title: "Business Tools",
    description: "Powerful analytics and tools to help sellers grow their business on our platform.",
    features: ["Sales reports", "Customer insights", "Marketing tools", "Performance metrics"],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#6B9B37] text-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Our Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Everything you need to buy and sell with confidence.
              We provide the tools and support to make commerce easy.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-white rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F5F5DC] text-[#6B9B37] mb-4">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#6B9B37] rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're looking to buy quality products or sell to a wider audience,
              POSbok has everything you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#6B9B37] text-white font-medium rounded-full hover:bg-[#4A7A1A] transition-colors"
              >
                Start Shopping
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#6B9B37] text-[#6B9B37] font-medium rounded-full hover:bg-[#6B9B37] hover:text-white transition-colors"
              >
                Become a Seller
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I become a seller on POSbok?
                </h3>
                <p className="text-gray-600 text-sm">
                  Simply create an account, complete your seller profile, and start listing your products.
                  Our team will verify your account within 24 hours.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 text-sm">
                  We accept debit/credit cards, bank transfers, mobile money, and pay-on-delivery
                  for eligible orders.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How does delivery work?
                </h3>
                <p className="text-gray-600 text-sm">
                  Delivery availability and timing depend on the seller's location and shipping options.
                  You can see delivery status on each product listing.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What if I receive a defective product?
                </h3>
                <p className="text-gray-600 text-sm">
                  Our buyer protection program covers defective products. Contact our support team
                  within 7 days of delivery for a full refund or replacement.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
