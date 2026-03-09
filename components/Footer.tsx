"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo-2.png"
                alt="POSbok"
                width={120}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The all-in-one platform for modernizing agency POS transactions, inventory, and retail operations across Nigeria.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About Posbok", href: "/about" },
                { label: "Features", href: "/features" },
                { label: "Storefront", href: "/storefront" },
                { label: "Business Solutions", href: "/business-solutions" },
                { label: "Testimonials", href: "#" },
                { label: "Login", href: "#" },
                { label: "Signup", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-[#8BC34A] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">References</h3>
            <ul className="space-y-3">
              {[
                { label: "Learn", href: "/learn" },
                { label: "FAQs", href: "#faq" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-[#8BC34A] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#8BC34A] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">posbokquickresponse@outlook.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8BC34A] flex-shrink-0" />
                <span className="text-sm text-gray-400">07084230597</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8BC34A] flex-shrink-0" />
                <span className="text-sm text-gray-400">+2347084230597</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            Posbok. All Right Reserved
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-[#8BC34A] transition-colors">
              User Terms &amp; Conditions
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#8BC34A] transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
