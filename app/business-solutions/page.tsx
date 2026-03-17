"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Check, Shield, Headphones, BarChart3 } from "lucide-react"

// ── Solution sections ──────────────────────────────────────────────────
const solutions = [
  {
    title: "Purchase APIS (Headless ERP)",
    subtitle: "Customizable",
    desc: "Purchase APIs from us to run the backend of your server for Mobile money operations management, Inventory management, warehouse management, e-commerce deployment, and staff management system. We create custom user experiences and integrate with various platforms to help your business perform more efficiently.",
    image: "/images/dashboard-preview.png",
    imageAlt: "POSBOK Platform",
    reverse: false,
  },
  {
    title: "Extended Capabilities",
    subtitle: "",
    desc: "Extend our current features by telling us what you need. We will customise the frontend interface that meets your business needs/requirements and develop/deploy a backend to allow greater flexibility, faster adoption to changing trends and seamless integration across multiple sales channels and applications while providing a unified data source and a consistent user experience.",
    image: "/images/sales-dashboard.png",
    imageAlt: "Extended Capabilities",
    reverse: true,
  },
  {
    title: "Create a New ERP System",
    subtitle: "",
    desc: "By allowing our team of system analyst carry out a feasibility study on your business, we can develop a suitable system to enable you manage your business/organisation effortlessly and remotely in the following functional areas",
    list: [
      "Sales & Marketing",
      "Supply Chain Management",
      "Finance & Accounting",
      "Manufacturing/Production",
      "Human resource/staff management",
    ],
    image: "/images/inventory-view.png",
    imageAlt: "ERP System",
    reverse: false,
  },
  {
    title: "AI Agents",
    subtitle: "",
    desc: "Automate your business/organisation process by using our developed AI agents that will be customised to securely access via API to automate tasks such as summarising, triggering workflow and others.",
    image: "/images/POSBOK -  Demo UI (10).png",
    imageAlt: "AI Agents",
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

export default function BusinessSolutionsPage() {
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set())

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <Image src="/images/hero_image.jpg" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Build, Extend, or Automate Your Business Systems
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            POSBOK delivers customizable APIs, enterprise-grade ERP systems, and AI-driven automation to help organizations streamline operations, integrate platforms, and scale efficiently.
          </p>
          <Link href="#solutions" className="inline-flex items-center px-8 py-3 bg-[#6B9B37] text-white font-semibold rounded-md hover:bg-[#4A7A1A] transition-colors text-sm">
            LEARN MORE
          </Link>
        </div>
      </section>

      {/* ── WHAT POSBOK DELIVERS ─────────────────────────────── */}
      <section className="bg-white py-20 px-4" id="solutions">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B9B37] mb-3">What POSBOK Delivers</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Solutions Built for Your Business
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Whether you need modular APIs, extended platform capabilities, a fully custom ERP system, or AI-driven automation, POSBOK provides flexible solutions designed to adapt to your business processes and growth strategy.
          </p>
        </div>
      </section>

      {/* ── SOLUTION SECTIONS ────────────────────────────────── */}
      {solutions.map((s, i) => (
        <section key={s.title} className={i % 2 === 0 ? "bg-[#F8FCF3] py-20 px-4" : "bg-white py-20 px-4"}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className={s.reverse ? "order-1 md:order-2" : ""}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{s.title}</h2>
              {s.subtitle && <p className="text-[#6B9B37] text-sm font-medium mb-4">{s.subtitle}</p>}
              <p className="text-gray-600 leading-relaxed mb-4">{s.desc}</p>
              {s.list && (
                <ol className="space-y-2 mb-4">
                  {s.list.map((item, idx) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                      <span className="font-semibold text-gray-900 min-w-[20px]">{idx + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              )}
            </div>
            <div className={s.reverse ? "order-2 md:order-1" : ""}>
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50 p-2">
                <Image src={s.image} alt={s.imageAlt} width={600} height={400} className="rounded-xl w-full h-auto" />
              </div>
            </div>
          </div>
        </section>
      ))}

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
