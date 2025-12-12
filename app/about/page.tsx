"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Users, Target, Award, Heart } from "lucide-react"

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "We believe in empowering local businesses and connecting communities through commerce.",
  },
  {
    icon: Target,
    title: "Quality Assured",
    description: "Every seller on our platform is verified to ensure you get the best products.",
  },
  {
    icon: Award,
    title: "Trust & Transparency",
    description: "We maintain honest pricing and clear communication between buyers and sellers.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "Your satisfaction is our priority. We're here to help every step of the way.",
  },
]

const team = [
  {
    name: "Emeka Okonkwo",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Adaeze Nwosu",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
  },
  {
    name: "Chidi Eze",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF0] flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#6B9B37] text-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              About POSbok
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Connecting local businesses with customers across Nigeria.
              We're building the future of community commerce.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    POSbok was born from a simple observation: local businesses have amazing
                    products, but often struggle to reach customers beyond their immediate
                    neighborhood.
                  </p>
                  <p>
                    Founded in 2023, we set out to create a platform that bridges this gap.
                    Our marketplace connects sellers from across Nigeria with customers
                    looking for quality products at fair prices.
                  </p>
                  <p>
                    Today, we serve thousands of customers and hundreds of sellers across
                    multiple states, making it easier than ever to shop local and support
                    community businesses.
                  </p>
                </div>
              </div>
              <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop"
                  alt="Local marketplace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
              Our Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center p-6 rounded-lg bg-[#FAFAF0]">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6B9B37] text-white mb-4">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
              Meet Our Team
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#6B9B37]">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-[#6B9B37] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">500+</div>
                <div className="text-sm sm:text-base opacity-90">Active Sellers</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">10,000+</div>
                <div className="text-sm sm:text-base opacity-90">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">15</div>
                <div className="text-sm sm:text-base opacity-90">States Covered</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">50,000+</div>
                <div className="text-sm sm:text-base opacity-90">Products Listed</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
