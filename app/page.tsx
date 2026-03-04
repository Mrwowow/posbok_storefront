"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ChevronDown, ChevronUp, Check, X, Search } from "lucide-react"

// ── Marketing copy ────────────────────────────────────────────────────────────

const whyFeatures = [
  { title: "Daily Calculations & Summary", desc: "Automated summaries and reports for fast reconciliation and error minimization." },
  { title: "Barcode Integrations", desc: "Full support for scanners and printers to accelerate inventory and transaction processing." },
  { title: "Staff Access Management", desc: "Define roles, track agent performance, and control permissions across all locations." },
  { title: "Multi-Store Feature", desc: "Manage multiple shops and warehouses from one central, unified platform with ease." },
  { title: "Stock Taking", desc: "Export current inventory levels and conduct audits to maintain stock accuracy." },
  { title: "Generate Sales Receipt", desc: "Instantly print or send transaction receipts to customers via digital channels." },
  { title: "Add Image to Products", desc: "Enhance your product catalogue and storefront with high-quality images." },
  { title: "Reliable Offline Access", desc: "Never stop transacting. The app works offline and syncs automatically when connected." },
]

const accelerators = [
  { title: "On-Ground Technical Support", desc: "One-time physical setup Per-Shop.", price: "₦25,000" },
  { title: "Virtual Staff Training Fee", desc: "3 hours Session for up to 5 staff members.", price: "₦15,000" },
  { title: "Initial Inventory Upload Service", desc: "Upload up to 500 items into your Inventory.", price: "₦10,000" },
  { title: "Barcode Scanner", desc: "High-speed USB Barcode Scanner (New).", price: "₦30,000" },
  { title: "Mobile Thermal Printer", desc: "Portable Bluetooth thermal receipt printer.", price: "₦45,000" },
]

const trustedBrands = ["vougue BOUTIQUE", "deep DIVE", "GOLDEN HOUR", "ElegantCursive"]

const faqs = [
  { q: "How long does it take to set up POSBOK?", a: "You can create a business and set up a shop in minutes. Importing your full inventory list might take additional time, but we offer a service for fast bulk upload." },
  { q: "Is my financial data secure on the platform?", a: "Yes. POSBOK uses industry-standard encryption and security practices to ensure your financial data is protected at all times." },
  { q: "Do I need a separate e-commerce subscription?", a: "No. The Storefront (E-commerce link) is included in the Full POSBOK Suite plan at no additional cost." },
  { q: "What happens if my internet connection is lost?", a: "POSBOK works offline and automatically syncs your transactions and data when your connection is restored." },
]

const agencyPosFeatures = [
  { label: "All POS Transactions", included: true },
  { label: "Staff Access Management", included: true },
  { label: "Reliable Offline Access (Mobile app)", included: true },
  { label: "Multi-Shop Management", included: true },
  { label: "Inventory & Stock Control", included: false },
  { label: "Warehouse Management", included: false },
  { label: "Storefront (E-commerce Link)", included: false },
  { label: "Real-time Sales & Analytics", included: false },
]

const fullSuiteFeatures = [
  { label: "All POS Transactions", included: true },
  { label: "Staff Access Management", included: true },
  { label: "Reliable Offline Access (Mobile app)", included: true },
  { label: "Multi-Shop Management", included: true },
  { label: "Inventory & Stock Control", included: true },
  { label: "Warehouse Management", included: true },
  { label: "Storefront (E-commerce Link)", included: true },
  { label: "Real-time Sales & Analytics", included: true },
]

// ── Main page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [heroSearch, setHeroSearch] = useState("")
  const router = useRouter()

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = heroSearch.trim()
    router.push(q ? `/storefront?search=${encodeURIComponent(q)}` : "/storefront")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="bg-white pt-16 pb-20 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6B9B37] mb-3">Business Solutions</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto mb-6">
          The All-in-One Platform for Modern Retail
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
          Automatically Analyse your POS transactions, Inventory linked to an ECommerce
          for your shop and warehouse operations, seamlessly with POSBOK
        </p>

        {/* Hero search */}
        <form
          onSubmit={handleHeroSearch}
          className="max-w-xl mx-auto flex items-center bg-gray-100 rounded-full px-5 py-3 mb-8 shadow-sm"
        >
          <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
          <input
            value={heroSearch}
            onChange={e => setHeroSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            placeholder="Search products across all stores..."
          />
          <button type="submit" className="text-[#6B9B37] text-xs font-semibold ml-2 hover:text-[#4A7A1A] transition-colors">
            Search
          </button>
        </form>

        <Link
          href="/storefront"
          className="inline-flex items-center px-8 py-3 bg-[#6B9B37] text-white font-semibold rounded-full hover:bg-[#4A7A1A] transition-colors text-sm"
        >
          BROWSE STOREFRONT
        </Link>

        {/* Trusted brands */}
        <div className="mt-14">
          <p className="text-gray-400 text-sm mb-5">
            Over <span className="text-[#6B9B37] font-bold">150+</span> Businesses trust Posbok for their daily operations.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 items-center">
            {trustedBrands.map((b) => (
              <span key={b} className="text-gray-400 font-semibold text-sm tracking-wide">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACK TRANSACTIONS ────────────────────────────────── */}
      <section className="bg-[#F8FCF3] py-20 px-4" id="features">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Track Every Transaction with Confidence</h2>
            <p className="text-gray-500 mb-6">POSBOK makes withdrawals and deposits fast, accurate, and fully auditable.</p>
            <ul className="space-y-3">
              {["Record deposits and withdrawals in real time.", "Automatic daily calculations and summaries.", "Minimize errors and missing transactions.", "Designed for high-traffic agent environments."].map(item => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#6B9B37] flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-white" strokeWidth={3} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 aspect-video flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-[#e8f5d5] to-[#f0fae8] rounded-xl flex items-center justify-center">
              <span className="text-[#6B9B37] font-bold text-lg opacity-40">Dashboard Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MONITOR SALES ─────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-gray-50 rounded-2xl shadow-lg p-4 aspect-video flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-[#e8f5d5] to-[#f0fae8] rounded-xl flex items-center justify-center">
              <span className="text-[#6B9B37] font-bold text-lg opacity-40">Sales Dashboard</span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Monitor Sales Anytime, Anywhere</h2>
            <p className="text-gray-500 mb-6">Stay on top of daily sales with a clear, intuitive dashboard.</p>
            <ul className="space-y-3">
              {["Real-time sales tracking across products and stores.", "Generate receipts instantly.", "Analyze trends for smarter decisions.", "Sync sales data with inventory automatically."].map(item => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#6B9B37] flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-white" strokeWidth={3} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── INVENTORY ─────────────────────────────────────────── */}
      <section className="bg-[#F8FCF3] py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Simple, Organized &amp; Transparent Inventory</h2>
            <p className="text-gray-500 mb-6">Quickly see what's in stock and optimize replenishment across all stores.</p>
            <ul className="space-y-3">
              {["Upload inventory easily from existing lists.", "Monitor stock levels in real time.", "Sync with storefront and sales data.", "Maintain accurate item details with custom fields."].map(item => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#6B9B37] flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-white" strokeWidth={3} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 aspect-video flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-[#e8f5d5] to-[#f0fae8] rounded-xl flex items-center justify-center">
              <span className="text-[#6B9B37] font-bold text-lg opacity-40">Inventory View</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── E-COMMERCE ────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-gray-50 rounded-2xl shadow-lg p-4 aspect-video flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-[#e8f5d5] to-[#f0fae8] rounded-xl flex items-center justify-center">
              <span className="text-[#6B9B37] font-bold text-lg opacity-40">Storefront Preview</span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Launch Your Products Online. Instantly.</h2>
            <p className="text-gray-500 mb-6">The e-commerce link for your shop and warehouse operations. Expand your sales channels without manual setup.</p>
            <ul className="space-y-3">
              {["Inventory linked directly to an E-Commerce site.", "Full synchronization of stock levels and orders.", "Orders are managed alongside in-store sales.", "Optional delivery service."].map(item => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#6B9B37] flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-white" strokeWidth={3} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── WHY POSBOK ────────────────────────────────────────── */}
      <section className="bg-[#F8FCF3] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B9B37] mb-3">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why POSBOK</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The all-in-one platform engineered to solve the toughest operational challenges of modern retail.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyFeatures.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#e8f5d5] flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-[#6B9B37]" strokeWidth={2.5} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPERATIONAL ACCELERATORS ──────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B9B37] mb-3">Add-on Package</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Operational Accelerators &amp; Support</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Equip your business with essential hardware and personalized services for a fast, hassle-free launch.</p>
            <p className="text-gray-400 text-sm mt-2">Choose the services and hardware you need (Optional):</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accelerators.map(a => (
              <div key={a.title} className="border border-gray-100 rounded-2xl p-6 hover:border-[#6B9B37] hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">{a.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{a.desc}</p>
                <p className="text-2xl font-bold text-[#6B9B37]">{a.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ───────────────────────────────────────── */}
      <section className="bg-[#6B9B37] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-4">Customer Response</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            We let our <span className="italic">client&apos;s success</span> be our speaker
          </h2>
          <p className="text-white/80 text-sm mb-8">Hear from the businesses scaling their operations and ensuring accuracy with POSBOK.</p>
          <div className="bg-white rounded-2xl p-8 text-left shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#e8f5d5] flex items-center justify-center font-bold text-[#6B9B37]">IE</div>
              <div>
                <p className="font-semibold text-gray-900">Ighoja E.</p>
                <p className="text-sm text-gray-500">Operations Manager, Vougue Boutiques</p>
              </div>
            </div>
            <p className="text-gray-600 italic leading-relaxed">
              &ldquo;Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit
              quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat.
              Vitae pellentesque sem placerat in id cursus mi.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── MOBILE APP ────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
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
          <div className="flex justify-center">
            <div className="w-56 h-96 bg-gray-900 rounded-3xl shadow-2xl flex items-center justify-center">
              <div className="w-48 h-[22rem] bg-gradient-to-b from-[#6B9B37] to-[#4A7A1A] rounded-2xl flex flex-col items-center justify-center gap-4">
                <Image src="/logo-2.png" alt="POSBOK" width={80} height={28} className="brightness-0 invert opacity-80" />
                <span className="text-white/60 text-xs">Mobile App</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section className="bg-[#F8FCF3] py-20 px-4" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Choose Your Path to Modern Retail.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">POSBOK pricing is designed to be flexible, predictable, and aligned with your daily operations.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Agency POS */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Agency POS</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">₦3,000<span className="text-base font-normal text-gray-400">/month</span></p>
              <p className="text-sm text-gray-500 mb-6">Perfect for POS Agents and Merchants</p>
              <Link href="#" className="block text-center py-3 border-2 border-[#6B9B37] text-[#6B9B37] font-semibold rounded-full hover:bg-[#6B9B37] hover:text-white transition-colors mb-6 text-sm">GET STARTED</Link>
              <ul className="space-y-3">
                {agencyPosFeatures.map(f => (
                  <li key={f.label} className="flex items-center gap-3 text-sm">
                    {f.included ? <Check className="w-4 h-4 text-[#6B9B37] flex-shrink-0" strokeWidth={2.5} /> : <X className="w-4 h-4 text-gray-300 flex-shrink-0" strokeWidth={2.5} />}
                    <span className={f.included ? "text-gray-700" : "text-gray-300"}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Full Suite */}
            <div className="bg-[#6B9B37] rounded-2xl p-8 shadow-lg relative overflow-hidden">
              <span className="absolute top-4 right-4 bg-white text-[#6B9B37] text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>
              <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">Full POSBOK Suite</p>
              <p className="text-4xl font-bold text-white mb-1">₦5,000<span className="text-base font-normal text-white/70">/month</span></p>
              <p className="text-sm text-white/80 mb-6">Perfect for Complete Business Operations</p>
              <Link href="#" className="block text-center py-3 bg-white text-[#6B9B37] font-semibold rounded-full hover:bg-gray-50 transition-colors mb-6 text-sm">GET STARTED</Link>
              <ul className="space-y-3">
                {fullSuiteFeatures.map(f => (
                  <li key={f.label} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-white flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white">{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B9B37] mb-3">FAQ&apos;s</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Quick answers to your most common questions about setup, security, and scaling with POSBOK.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-[#6B9B37] flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
