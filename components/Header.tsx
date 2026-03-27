"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Smartphone, ShoppingCart, Warehouse, Globe, Store, ArrowRight, Code, Puzzle, Server, Bot, UserPlus, Settings, Users, CreditCard, Package, Receipt, BarChart3, UserCog, LogIn, Mail } from "lucide-react"

const featureDropdownItems = [
  {
    icon: Smartphone,
    title: "Mobile Money Operation Management",
    desc: "Record Withdrawals, Deposit and Transfer with 100% calculations",
    href: "/features",
    iconBg: "bg-[#E8F5D5]",
    iconColor: "text-[#6B9B37]",
  },
  {
    icon: ShoppingCart,
    title: "Inventory Management",
    desc: "Record & Track Sales and Stocks in real time",
    href: "/features",
    iconBg: "bg-[#E0F2E9]",
    iconColor: "text-[#4A9B6E]",
  },
  {
    icon: Warehouse,
    title: "Warehouse Management (Parking House)",
    desc: "Take records of bulks goods",
    href: "/features",
    iconBg: "bg-[#FFF3E0]",
    iconColor: "text-[#C28B3A]",
  },
  {
    icon: Globe,
    title: "E-commerce",
    desc: "Deploy E-commerce site for your shop",
    href: "/features",
    iconBg: "bg-[#FDEAE8]",
    iconColor: "text-[#C27A6E]",
  },
]

const businessSolutionsDropdownItems = [
  {
    icon: Code,
    title: "Purchase APIS (Headless ERP) Customizable",
    desc: "Buy our API's to your private server",
    href: "/business-solutions#solutions",
    iconBg: "bg-[#E8F5D5]",
    iconColor: "text-[#6B9B37]",
  },
  {
    icon: Puzzle,
    title: "Extended Capabilities",
    desc: "Build on our existing features tailored for you.",
    href: "/business-solutions#solutions",
    iconBg: "bg-[#E0F2E9]",
    iconColor: "text-[#4A9B6E]",
  },
  {
    icon: Server,
    title: "Create New ERP System",
    desc: "Lets solve new ERP related problems for you",
    href: "/business-solutions#solutions",
    iconBg: "bg-[#FFF3E0]",
    iconColor: "text-[#C28B3A]",
  },
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Take critical business decision in your absence.",
    href: "/business-solutions#solutions",
    iconBg: "bg-[#E8F5D5]",
    iconColor: "text-[#6B9B37]",
  },
  {
    icon: Mail,
    title: "Contact for Business Solutions",
    desc: "Get in touch with our team for a tailored solution.",
    href: "/business-solutions#contact",
    iconBg: "bg-[#FDEAE8]",
    iconColor: "text-[#C27A6E]",
  },
]

const learnDropdownItems = [
  {
    icon: UserPlus,
    title: "Create a business account and admin profile",
    href: "/learn",
    iconBg: "bg-[#E8F5D5]",
    iconColor: "text-[#6B9B37]",
  },
  {
    icon: Settings,
    title: "Setting up a Shop",
    href: "/learn",
    iconBg: "bg-[#E0F2E9]",
    iconColor: "text-[#4A9B6E]",
  },
  {
    icon: Users,
    title: "Create Staff Account",
    href: "/learn",
    iconBg: "bg-[#E0F2E9]",
    iconColor: "text-[#4A9B6E]",
  },
  {
    icon: CreditCard,
    title: "Log in POS Transaction",
    href: "/learn",
    iconBg: "bg-[#FFF3E0]",
    iconColor: "text-[#C28B3A]",
  },
  {
    icon: Package,
    title: "Add products to inventory/warehouse",
    href: "/learn",
    iconBg: "bg-[#FDEAE8]",
    iconColor: "text-[#C27A6E]",
  },
  {
    icon: Receipt,
    title: "Log in Sales",
    href: "/learn",
    iconBg: "bg-[#E8F5D5]",
    iconColor: "text-[#6B9B37]",
  },
  {
    icon: BarChart3,
    title: "Reports",
    href: "/learn",
    iconBg: "bg-[#E0F2E9]",
    iconColor: "text-[#4A9B6E]",
  },
  {
    icon: UserCog,
    title: "Staff Management",
    href: "/learn",
    iconBg: "bg-[#E0F2E9]",
    iconColor: "text-[#4A9B6E]",
  },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [storefrontOpen, setStorefrontOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [learnOpen, setLearnOpen] = useState(false)
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const storefrontRef = useRef<HTMLDivElement>(null)
  const solutionsRef = useRef<HTMLDivElement>(null)
  const learnRef = useRef<HTMLDivElement>(null)

  const closeAllDropdowns = () => {
    setFeaturesOpen(false)
    setStorefrontOpen(false)
    setSolutionsOpen(false)
    setLearnOpen(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFeaturesOpen(false)
      }
      if (storefrontRef.current && !storefrontRef.current.contains(e.target as Node)) {
        setStorefrontOpen(false)
      }
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false)
      }
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
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
          <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            {/* Features with dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => { const next = !featuresOpen; closeAllDropdowns(); setFeaturesOpen(next) }}
                className={`flex items-center gap-1 font-medium transition-colors ${
                  featuresOpen ? "text-[#6B9B37]" : "text-gray-800 hover:text-[#6B9B37]"
                }`}
              >
                Features
                <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {featuresOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] bg-white rounded-xl shadow-lg border border-gray-200 py-3 px-2 z-50">
                  {/* Small arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />
                  <div className="relative">
                    {featureDropdownItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setFeaturesOpen(false)}
                        className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FCF3] transition-colors group"
                      >
                        <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <item.icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Storefront with dropdown */}
            <div ref={storefrontRef} className="relative">
              <button
                onClick={() => { const next = !storefrontOpen; closeAllDropdowns(); setStorefrontOpen(next) }}
                className={`flex items-center gap-1 font-medium transition-colors ${
                  storefrontOpen ? "text-[#6B9B37]" : "text-gray-800 hover:text-[#6B9B37]"
                }`}
              >
                Storefront
              </button>

              {storefrontOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[380px] bg-white rounded-xl shadow-lg border border-gray-200 py-2 px-2 z-50">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />
                  <Link
                    href="/storefront"
                    onClick={() => setStorefrontOpen(false)}
                    className="relative flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FCF3] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E8F5D5] flex items-center justify-center flex-shrink-0">
                      <Store className="w-5 h-5 text-[#6B9B37]" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 flex-1">Shop with businesses listed with us</p>
                    <ArrowRight className="w-5 h-5 text-[#6B9B37]" strokeWidth={2} />
                  </Link>
                </div>
              )}
            </div>

            {/* Business Solutions with dropdown */}
            <div ref={solutionsRef} className="relative">
              <button
                onClick={() => { const next = !solutionsOpen; closeAllDropdowns(); setSolutionsOpen(next) }}
                className={`flex items-center gap-1 font-medium transition-colors ${
                  solutionsOpen ? "text-[#6B9B37]" : "text-gray-800 hover:text-[#6B9B37]"
                }`}
              >
                Business Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] bg-white rounded-xl shadow-lg border border-gray-200 py-3 px-2 z-50">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />
                  <div className="relative">
                    {businessSolutionsDropdownItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setSolutionsOpen(false)}
                        className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FCF3] transition-colors group"
                      >
                        <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <item.icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/features#pricing"
              className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors"
            >
              Pricing
            </Link>
            {/* Learn with dropdown */}
            <div ref={learnRef} className="relative">
              <button
                onClick={() => { const next = !learnOpen; closeAllDropdowns(); setLearnOpen(next) }}
                className={`flex items-center gap-1 font-medium transition-colors ${
                  learnOpen ? "text-[#6B9B37]" : "text-gray-800 hover:text-[#6B9B37]"
                }`}
              >
                Learn
                <ChevronDown className={`w-4 h-4 transition-transform ${learnOpen ? "rotate-180" : ""}`} />
              </button>

              {learnOpen && (
                <div className="absolute top-full right-0 mt-3 w-[400px] bg-white rounded-xl shadow-lg border border-gray-200 py-3 px-2">
                  <div className="absolute -top-2 right-12 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />
                  <div className="relative">
                    {learnDropdownItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setLearnOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F8FCF3] transition-colors group"
                      >
                        <div className={`w-9 h-9 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-4 h-4 ${item.iconColor}`} strokeWidth={1.5} />
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
            <a
              href="https://app.posbok.com/createbusiness"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 bg-[#6B9B37] text-white text-xs lg:text-sm font-semibold rounded-full hover:bg-[#4A7A1A] transition-colors"
            >
              GET STARTED
            </a>

            {/* Login */}
            <a
              href="https://app.posbok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 lg:px-4 lg:py-2 border border-gray-300 text-gray-800 text-xs lg:text-sm font-semibold rounded-full hover:border-[#6B9B37] hover:text-[#6B9B37] transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              Login
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-800 hover:text-[#6B9B37] transition-colors"
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
          <nav className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {/* Features with collapsible sub-items */}
              <button
                onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                className="flex items-center justify-between text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2"
              >
                Features
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileFeaturesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileFeaturesOpen && (
                <div className="pl-4 pb-2 space-y-1">
                  {featureDropdownItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => { setIsMobileMenuOpen(false); setMobileFeaturesOpen(false) }}
                      className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[#F8FCF3] transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-4 h-4 ${item.iconColor}`} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/storefront" className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Storefront</Link>

              {/* Business Solutions with collapsible sub-items */}
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="flex items-center justify-between text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2"
              >
                Business Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileSolutionsOpen && (
                <div className="pl-4 pb-2 space-y-1">
                  {businessSolutionsDropdownItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => { setIsMobileMenuOpen(false); setMobileSolutionsOpen(false) }}
                      className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[#F8FCF3] transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-4 h-4 ${item.iconColor}`} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/features#pricing" className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>

              {/* Learn with collapsible sub-items */}
              <button
                onClick={() => setMobileLearnOpen(!mobileLearnOpen)}
                className="flex items-center justify-between text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2"
              >
                Learn
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileLearnOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileLearnOpen && (
                <div className="pl-4 pb-2 space-y-1">
                  {learnDropdownItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => { setIsMobileMenuOpen(false); setMobileLearnOpen(false) }}
                      className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[#F8FCF3] transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-4 h-4 ${item.iconColor}`} strokeWidth={1.5} />
                      </div>
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/about" className="text-gray-800 hover:text-[#6B9B37] font-medium transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Company</Link>
              <a href="https://app.posbok.com/createbusiness" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 bg-[#6B9B37] text-white text-sm font-semibold rounded-full hover:bg-[#4A7A1A] transition-colors mt-2" onClick={() => setIsMobileMenuOpen(false)}>GET STARTED</a>
              <a href="https://app.posbok.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-800 text-sm font-semibold rounded-full hover:border-[#6B9B37] hover:text-[#6B9B37] transition-colors mt-2" onClick={() => setIsMobileMenuOpen(false)}><LogIn className="w-4 h-4" />Login</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
