"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Check, Shield, Headphones, BarChart3 } from "lucide-react"

// ── Feature sections ────────────────────────────────────────────────────
const features = [
  {
    title: "Mobile Money Operation Management",
    subtitle: "(POS agent bookkeeping)",
    desc: "Record Withdrawals, Deposit and Transfer with 100% Calculation and Analysis Report",
    forText: "For: Mobile Money operator, POS agent",
    image: "/images/POSBOK -  Demo UI (9).png",
    imageAlt: "POS Transaction Management",
    reverse: false,
  },
  {
    title: "Inventory Management",
    subtitle: "",
    desc: "Record & Track Sales in real time, Manage Stock levels, Multi-shop sales, stock taking, and print receipt wirelessly.",
    forText: "For: Supermarkets, Pharmacies, Boutiques, Grocery, Bookstores, Warehouses and all types of retailers and wholesalers.",
    image: "/images/POSBOK -  Demo UI (10).png",
    imageAlt: "Inventory & Sales Management",
    reverse: true,
  },
  {
    title: "Warehouse Management",
    subtitle: "(Parking House)",
    desc: "Take records of goods as they arrive in bulk into your warehouse or parking house, and easily move to your different shop inventory while you assign staff to carry them.",
    forText: "For: Supermarkets, Pharmacies, Boutiques, Grocery Stores, Bookstores, Warehouses and all types of retailers and wholesalers who own a warehouse or parking house.",
    image: "/images/POSBOK -  Demo UI (11).png",
    imageAlt: "Warehouse Management",
    reverse: false,
  },
  {
    title: "E-commerce",
    subtitle: "",
    desc: "Deploy an E-commerce site for your shop easily with the same inventory items for both online and physical stores linked together.",
    forText: "",
    image: "/images/storefront-preview.png",
    imageAlt: "E-commerce Storefront",
    reverse: true,
  },
]

// ── Pricing plans ───────────────────────────────────────────────────────
const plans = [
  { name: "Mobile Money Operation Management", desc: "POS agent Bookkeeping — All POS Transactions (Withdrawals, Transfers, Deposits, Bill Payments) and Analytics", monthly: "₦3,500", monthlyValue: 3500, annual: "₦38,000/yr" },
  { name: "Inventory", desc: "Record & Track Sales and Stocks in real time, Manage Stock levels, Multi-shop sales, stock taking, and print receipt wirelessly.", monthly: "₦4,000", monthlyValue: 4000, annual: "₦43,000/yr" },
  { name: "Warehouse", desc: "Take records of goods as they arrive in bulk into your warehouse or parking house, and easily move to your different shop inventory.", monthly: "₦5,000", monthlyValue: 5000, annual: "₦55,000/yr" },
  { name: "E-commerce", desc: "Deploy an E-commerce site for your shop with the same inventory items for both online and physical stores linked together.", monthly: "₦5,000", monthlyValue: 5000, annual: "₦55,000/yr" },
]

const includedFeatures = [
  { icon: Shield, title: "Enterprise Security", desc: "High-grade encryption and regular security audits to keep your data safe." },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock technical assistance from our global team of experts." },
  { icon: BarChart3, title: "Advanced Analytics", desc: "Comprehensive dashboards and custom reporting tools to drive growth." },
]

export default function FeaturesPage() {
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    solution: "",
    summary: "",
    businessName: "",
    location: "",
    deliveryDuration: "",
    personalName: "",
    position: "",
    phone: "",
    email: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const togglePlan = (planName: string) => {
    setSelectedPlans(prev => {
      const next = new Set(prev)
      if (next.has(planName)) next.delete(planName)
      else next.add(planName)
      return next
    })
  }

  const totalMonthlyCost = plans
    .filter(p => selectedPlans.has(p.name))
    .reduce((sum, p) => sum + p.monthlyValue, 0)

  const formatCurrency = (value: number) =>
    "₦" + value.toLocaleString("en-NG")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <Image src="/images/hero_image.jpg" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 italic">
            Custom Digital Infrastructure for Modern Businesses
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Elevate Your Business with Our Business Tool
          </p>
          <Link href="#features" className="inline-flex items-center px-8 py-3 bg-[#6B9B37] text-white font-semibold rounded-md hover:bg-[#4A7A1A] transition-colors text-sm">
            LEARN MORE
          </Link>
        </div>
      </section>

      {/* ── ENTERPRISE SOLUTIONS INTRO ─────────────────────────── */}
      <section className="bg-white py-20 px-4" id="features">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B9B37] mb-3">Enterprise Business Solutions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Business Management Features
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            POSBOK provides a suite of integrated tools designed to streamline Mobile Money Operation, Sales, Inventory, Warehousing, and E-commerce, helping businesses operate efficiently from a single platform.
          </p>
        </div>
      </section>

      {/* ── FEATURE SECTIONS ───────────────────────────────────── */}
      {features.map((f, i) => (
        <section key={f.title} className={i % 2 === 0 ? "bg-[#F8FCF3] py-20 px-4" : "bg-white py-20 px-4"}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className={f.reverse ? "order-1 md:order-2" : ""}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{f.title}</h2>
              {f.subtitle && <p className="text-gray-500 text-sm mb-4">{f.subtitle}</p>}
              <p className="text-gray-600 leading-relaxed mb-4">{f.desc}</p>
              {f.forText && <p className="text-gray-500 text-sm italic">{f.forText}</p>}
            </div>
            <div className={f.reverse ? "order-2 md:order-1" : ""}>
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50 p-2">
                <Image src={f.image} alt={f.imageAlt} width={600} height={400} className="rounded-xl w-full h-auto" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── CONTACT FORM ───────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Contact us for any of your Business Solution needs
            </h2>
            <p className="text-gray-500">To proceed with your request, kindly provide the following details:</p>
          </div>

          {submitted ? (
            <div className="text-center py-12 bg-[#F8FCF3] rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-[#6B9B37] flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <p className="text-lg font-semibold text-gray-900">Submitted.</p>
              <p className="text-gray-500 mt-1">Someone from our team will reach back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Business Solution</label>
                <select
                  value={formData.solution}
                  onChange={e => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#6B9B37]"
                  required
                >
                  <option value="">Choose an Option</option>
                  <option value="pos">Mobile Money Operation Management</option>
                  <option value="inventory">Inventory Management</option>
                  <option value="warehouse">Warehouse Management</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provide a summary of the solution that needs to be developed.</label>
                <textarea
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#6B9B37] resize-none"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name or Organisation</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#6B9B37]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#6B9B37]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery duration of request</label>
                <input
                  type="text"
                  value={formData.deliveryDuration}
                  onChange={e => setFormData({ ...formData, deliveryDuration: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#6B9B37]"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personal Name</label>
                  <input
                    type="text"
                    value={formData.personalName}
                    onChange={e => setFormData({ ...formData, personalName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#6B9B37]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={e => setFormData({ ...formData, position: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#6B9B37]"
                    required
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#6B9B37]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#6B9B37]"
                    required
                  />
                </div>
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="px-10 py-3 bg-[#6B9B37] text-white font-semibold rounded-md hover:bg-[#4A7A1A] transition-colors text-sm">
                  SUBMIT
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── MOBILE APP ──────────────────────────────────────────── */}
      <section className="bg-[#F8FCF3] py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image src="/images/POSBOK -  Demo UI (8).png" alt="POSBOK Mobile App" width={400} height={500} className="rounded-3xl shadow-2xl w-auto max-h-[500px] object-contain" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B9B37] mb-3">Manage you business on the go</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Download Our Mobile app</h2>
            <p className="text-gray-500 mb-6">Manage transactions, view live reports, and monitor inventory from your pocket.</p>
            <ul className="space-y-3 mb-8">
              {["Offline Access that syncs automatically when connected.", "Monitor stock levels and sales performance from anywhere.", "Process POS transactions directly via the mobile app.", "Get immediate notifications for low stock or transactions made."].map(item => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#6B9B37] flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-white" strokeWidth={3} /></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <div className="bg-black text-white rounded-xl px-5 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div><p className="text-xs text-gray-300">Download on the</p><p className="text-sm font-semibold">App Store</p></div>
              </div>
              <div className="bg-black text-white rounded-xl px-5 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.63.24.97.21l12.92-7.46-2.89-2.89-11 10.14zm16.32-9.43L17 12.95l3.04-1.76-3.04-1.76-2.5 2.5 2.5 2.5 2.5-2.5zm-15.85 9.23c-.19-.11-.34-.28-.44-.48L14.74 12 3.21 1.68c.1-.2.25-.37.44-.48L16.5 8.66 13.26 12l3.24 3.34-9.85 8.22z"/></svg>
                <div><p className="text-xs text-gray-300">Get it on</p><p className="text-sm font-semibold">Google Play</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B9B37] mb-3">Choose a Plan</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Choose Your Path to Modern Retail.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">POSBOK pricing is designed to be flexible, predictable, and aligned with your daily operations.</p>
          </div>

          {/* Plan cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans.map(p => {
              const isSelected = selectedPlans.has(p.name)
              return (
                <div
                  key={p.name}
                  onClick={() => togglePlan(p.name)}
                  className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all text-center ${
                    isSelected
                      ? "border-[#6B9B37] bg-[#F8FCF3] shadow-md"
                      : "border-gray-200 hover:border-[#6B9B37]/50 hover:shadow-md"
                  }`}
                >
                  {/* Selection indicator */}
                  <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? "border-[#6B9B37] bg-[#6B9B37]" : "border-gray-300"
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{p.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{p.desc}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-2xl font-bold text-[#6B9B37]">{p.monthly}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                    {p.annual && <p className="text-xs text-gray-400 mt-1">{p.annual}</p>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Included with every plan */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Included with every plan</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {includedFeatures.map(f => (
                <div key={f.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#e8f5d5] flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-[#6B9B37]" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{f.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total monthly cost */}
          <div className="bg-[#F8FCF3] rounded-2xl p-8 text-center">
            <p className="text-sm text-gray-500 mb-2">TOTAL MONTHLY COST</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">
              {totalMonthlyCost > 0 ? formatCurrency(totalMonthlyCost) : "₦0"}
              <span className="text-lg font-normal text-gray-400"> / month</span>
            </p>
            {selectedPlans.size > 0 && (
              <p className="text-xs text-gray-500 mb-3">
                {Array.from(selectedPlans).join(" + ")}
              </p>
            )}
            {selectedPlans.size === 0 && (
              <p className="text-xs text-gray-400 mb-3">Select plans above to see your total</p>
            )}
            <Link href="#" className="inline-flex items-center px-8 py-3 bg-[#6B9B37] text-white font-semibold rounded-full hover:bg-[#4A7A1A] transition-colors text-sm mt-4">
              GET STARTED
            </Link>
            <div className="flex justify-center gap-6 mt-4 text-xs text-gray-400">
              <span>Includes all standard features</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="bg-[#7fb239] py-16 px-4 rounded-t-[20px]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Transform your business today and enjoy an efficient Business Management
            </h2>
            <p className="text-white mb-6">
              Join over 150+ Businesses who trust POSbok for their daily operations.
            </p>
            <Link href="#" className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-900 transition-colors text-sm">
              SIGN UP
            </Link>
          </div>
          <div className="flex justify-center">
            <Image src="/images/inventory-view.png" alt="POSBOK Inventory" width={500} height={350} className="rounded-xl shadow-lg w-full h-auto" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
