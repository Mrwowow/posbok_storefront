"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Check, ChevronDown, ChevronRight, Menu, X, Rocket, Users, CreditCard, Package, ShoppingCart, BarChart3, Warehouse, FileText, type LucideIcon } from "lucide-react"

// ── Sidebar content structure ────────────────────────────────────────────
type LearnItem = {
  title: string
  slug: string
}

type LearnCategory = {
  name: string
  icon: LucideIcon
  items: LearnItem[]
}

const categories: LearnCategory[] = [
  {
    name: "GETTING STARTED",
    icon: Rocket,
    items: [
      { title: "Create a Business Account & Admin Profile", slug: "create-account" },
      { title: "Setting up a Shop", slug: "setup-shop" },
      { title: "Create Multiple Shops", slug: "create-multiple-shops" },
    ],
  },
  {
    name: "STAFF MANAGEMENT",
    icon: Users,
    items: [
      { title: "Create Staff Account", slug: "create-staff" },
      { title: "Create Multiple Staff Accounts", slug: "create-multiple-staff" },
      { title: "Assign Staff to a Shop", slug: "assign-staff-shop" },
      { title: "Update or Edit Staff Data", slug: "update-staff" },
      { title: "Delete a Staff Account", slug: "delete-staff" },
    ],
  },
  {
    name: "POS TRANSACTIONS",
    icon: CreditCard,
    items: [
      { title: "Performing a POS Transaction", slug: "pos-transaction" },
    ],
  },
  {
    name: "REPORTS",
    icon: BarChart3,
    items: [
      { title: "View POS Report", slug: "view-pos-report" },
      { title: "View Sales Report", slug: "view-sales-report" },
    ],
  },
  {
    name: "INVENTORY",
    icon: Package,
    items: [
      { title: "Add New Product to Inventory", slug: "add-product-inventory" },
      { title: "Restock Existing Product", slug: "restock-inventory" },
      { title: "Stock Taking", slug: "stock-taking" },
      { title: "Inventory Log", slug: "inventory-log" },
    ],
  },
  {
    name: "WAREHOUSE",
    icon: Warehouse,
    items: [
      { title: "Add New Product to Warehouse", slug: "add-product-warehouse" },
      { title: "Restock Warehouse Product", slug: "restock-warehouse" },
      { title: "Move Items from Warehouse to Inventory", slug: "move-warehouse-inventory" },
    ],
  },
  {
    name: "SALES",
    icon: ShoppingCart,
    items: [
      { title: "Make a Sale & Print Receipt", slug: "make-sale" },
    ],
  },
]

// ── Section content data ─────────────────────────────────────────────────

type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "steps"; items: string[] }
  | { type: "note"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "subheading"; text: string }
  | { type: "definition"; term: string; desc: string }

const sectionContent: Record<string, ContentBlock[]> = {
  "create-account": [
    { type: "heading", text: "Create a Business Account and Admin Profile" },
    { type: "paragraph", text: "Follow these steps to sign up and create your business and admin account on POSBOK." },
    { type: "steps", items: [
      "Click on Sign Up to create your business.",
      "On the next page, enter your business information: business name, address, business phone number, state of operation, and CAC registration number (optional).",
      "Click on the terms and conditions checkbox to continue.",
      "Click Create Business. It will process and display a pop-up form asking for your admin account personal data.",
      "Enter your personal information: first name, last name, date of birth, state of origin, LGA, and residential address.",
      "Enter your desired password and click Sign Up.",
      "You will be required to log in with the email and password you just entered.",
      "After login, a Create Shop pop-up will appear.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "POSBOK Login Page" },
    { type: "paragraph", text: "On the sign up page, fill in your business creation details including Business Name, Business Address, Phone Number, State of Operation, and CAC Reg Number." },
    { type: "image", src: "/images/dashboard-preview.png", alt: "Business Creation Form" },
    { type: "paragraph", text: "After creating your business, you will be prompted to fill in your admin account personal data including your name, date of birth, state of origin, LGA, and residential address." },
    { type: "image", src: "/images/dashboard-preview.png", alt: "Admin Account Creation Form" },
  ],
  "setup-shop": [
    { type: "heading", text: "Setting up a Shop (Create Shop)" },
    { type: "paragraph", text: "After you are done setting up your account, the next step is to create a shop." },
    { type: "steps", items: [
      "Click on \"Use my Business Info\" if you want to use the same business information, otherwise enter your Shop name, address, and select shop service type (POS, SELL, or POS & SELL).",
      "If you want to create a staff account, select \"Assign a staff to this shop after creation\", otherwise the shop will be created without a staff assigned. You can assign staff later from Staff Profile in Manage.",
      "If you selected assign staff and create shop, it will process and a pop-up will ask you to confirm. Select OK to add staff information.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Create Shop Form" },
  ],
  "create-multiple-shops": [
    { type: "heading", text: "Create Multiple Shops" },
    { type: "paragraph", text: "To create multiple shops for your business:" },
    { type: "steps", items: [
      "Go to Manage \u2192 Shop Management.",
      "Click on Create Shop.",
      "Fill in the shop details: Shop Name, Shop Address, and Service Type.",
      "Click Create Shop to add the new shop.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Shop Management" },
    { type: "image", src: "/images/dashboard-preview.png", alt: "Available Shops List" },
  ],
  "create-staff": [
    { type: "heading", text: "Create an Account for Your Staff" },
    { type: "paragraph", text: "Create staff accounts to allow team members to access and use the system." },
    { type: "steps", items: [
      "Enter staff personal information: staff name, date of birth, email, guarantor\u2019s full name, address, and phone number.",
      "Create a password for the staff account.",
      "Set your staff access time \u2014 the time range your staff is allowed to access the system.",
      "Select the Service Type (POS, SELL, or POS & SELL).",
      "Click Create Account to process.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Add Staff Profile Form" },
  ],
  "create-multiple-staff": [
    { type: "heading", text: "Create Multiple Staff Accounts" },
    { type: "paragraph", text: "To create additional staff accounts for your business:" },
    { type: "steps", items: [
      "Go to Manage \u2192 Staff Profile.",
      "Click on Add Staff.",
      "Fill in the staff details and create their account.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Staff Profile Navigation" },
    { type: "image", src: "/images/dashboard-preview.png", alt: "Staff Informations Table" },
  ],
  "assign-staff-shop": [
    { type: "heading", text: "Assigning a Staff to a New Shop" },
    { type: "paragraph", text: "To assign a staff member to a new shop or branch:" },
    { type: "steps", items: [
      "Go to Manage and click on Staff Profile.",
      "On Staff Information, scroll to the name of the staff then click on the house icon at the rightmost corner.",
      "If the staff has not been assigned to any shop yet, select a shop from the dropdown under \"Assign New Shop\" and click Assign New Shop.",
      "If the staff is already assigned to a shop and needs to be changed to a new shop, first click \"Remove From Shop\". After removal is successful, select the new shop from the dropdown and click \"Assign New Shop\".",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Staff Information with Actions" },
    { type: "image", src: "/images/dashboard-preview.png", alt: "Manage Shop Assignment" },
  ],
  "update-staff": [
    { type: "heading", text: "Update or Edit Staff Data" },
    { type: "paragraph", text: "If for any reason staff data like phone, address, etc. changes, you can update their data here." },
    { type: "steps", items: [
      "Go to Manage and click on Staff Profile.",
      "On Staff Information, scroll to the name of the staff then click on the Pen icon at the right corner.",
      "On the Update User Data form, edit or change the staff data.",
      "Click the button at the bottom to process the update.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Staff Profile Edit" },
    { type: "image", src: "/images/dashboard-preview.png", alt: "Update User Data Form" },
  ],
  "delete-staff": [
    { type: "heading", text: "Deleting a Staff Account" },
    { type: "steps", items: [
      "Go to Manage and click on Staff Profile.",
      "On Staff Information, scroll to the name of the staff then click on the Trash bin icon at the right corner.",
      "On the confirmation pop-up, click Delete Staff to confirm.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Delete Staff Confirmation" },
  ],
  "pos-transaction": [
    { type: "heading", text: "Performing a POS Transaction" },
    { type: "paragraph", text: "Before a transaction is made, you need to select the shop you will be using for the transaction if you\u2019re using an admin account. For a staff account, select the transaction type." },
    { type: "subheading", text: "Transaction Types" },
    { type: "definition", term: "Withdrawal", desc: "When a customer wants to withdraw a certain amount of cash either by Card or Transfer." },
    { type: "definition", term: "Deposit", desc: "When a customer is giving you cash, so you can fund their account through transfer." },
    { type: "definition", term: "Withdrawal & Transfer", desc: "A case where you have to withdraw money from your customer\u2019s account and send it to another account presented by them." },
    { type: "definition", term: "Bill Payment", desc: "A transaction where your customers can pay bills like airtime, DSTV recharge, and NEPA bills." },
    { type: "subheading", text: "Transaction Fields" },
    { type: "definition", term: "Transaction Payment Method", desc: "To know if the person is using their card or doing a transfer." },
    { type: "definition", term: "Transaction Amount", desc: "The amount of money your customer wants to withdraw." },
    { type: "definition", term: "Charges Payment Method", desc: "How your customer intends to pay for their charges \u2014 they can choose to pay with card, cash, or by transfer." },
    { type: "definition", term: "POS Charges Amount", desc: "The amount of charges charged by the agent for a certain transaction amount." },
    { type: "definition", term: "Machine Fee", desc: "Applies only when doing a transaction by card or transfer, if applicable to the machine being used." },
    { type: "definition", term: "Tax Fee", desc: "Applies when a transaction by card or transfer is more than \u20A610,000." },
    { type: "definition", term: "Transfer Fee", desc: "Applies to withdrawal/transfer and deposit transactions where a certain amount is charged when you transfer money from your POS to the account given by your customer." },
    { type: "definition", term: "Customer Phone Number", desc: "Optional, but you can keep it if needed." },
    { type: "definition", term: "Transaction Reference", desc: "Refers to the time the transaction is being made. Use this when a transaction by transfer takes place, or use the receipt number from the POS machine for card transactions." },
    { type: "definition", term: "Transaction Remarks", desc: "The result of the transaction \u2014 state if it was successful, declined, or pending before you process your transaction." },
  ],
  "view-pos-report": [
    { type: "heading", text: "View POS Report" },
    { type: "paragraph", text: "When you go to the reports page, select the shop you want to check its report." },
    { type: "steps", items: [
      "Go to Reports and select the shop.",
      "Select POS Report as the report type.",
      "Use Filter Transactions to check reports for a specific period by setting a start date and end date.",
      "Select Transaction Type and Status, then click Apply Filters to see results.",
    ]},
    { type: "subheading", text: "Admin Withdrawals Report" },
    { type: "paragraph", text: "Under POS reports, Admin Withdrawals Report shows money withdrawn by the admin either from cash at hand or cash in machine." },
    { type: "definition", term: "Name", desc: "Name of the admin." },
    { type: "definition", term: "Source", desc: "Either from cash at hand or cash in machine." },
    { type: "definition", term: "Amount", desc: "The amount of money withdrawn by the admin." },
    { type: "definition", term: "Business Day", desc: "The day the money was withdrawn." },
    { type: "definition", term: "Withdrawal Date", desc: "The date the money was withdrawn." },
    { type: "subheading", text: "Business Summary" },
    { type: "paragraph", text: "This is the summary and analysis of every transaction that has been made. It helps you check every single transaction because they have been automatically saved by the system for future reference." },
  ],
  "view-sales-report": [
    { type: "heading", text: "View Sales Report" },
    { type: "paragraph", text: "Under Sales Report, you have Performance Overview and Staff Overview." },
    { type: "subheading", text: "Performance Overview" },
    { type: "paragraph", text: "A summary and analysis collection of data by the admin for a particular set time. It can be done daily, monthly, or by sales by product. This helps you know:" },
    { type: "steps", items: [
      "The total sales that were made",
      "The total amount",
      "The total amount paid",
      "The total balance",
      "Sales by payment method (cash, card, or transfer)",
    ]},
    { type: "subheading", text: "Staff Overview" },
    { type: "paragraph", text: "Check all the sales made by your staff. Click on Select Staff, choose the staff member, then select a time frame:" },
    { type: "definition", term: "Daily", desc: "Click on the date you want to check \u2014 monitor performance on a day-to-day basis." },
    { type: "definition", term: "Weekly", desc: "Click on the week you want to check (first week, last week, etc.)." },
    { type: "definition", term: "Monthly", desc: "Select the month you want to check its performance." },
    { type: "definition", term: "Custom", desc: "Set a start date and end date to see performance for that specific range." },
    { type: "paragraph", text: "This overview sums up all total sales done by your staff on a daily, weekly, and monthly basis, allowing you to calculate: Total Sales, Total Amount, Total Money Paid, Balance, Total Cost, and Total Profit." },
    { type: "subheading", text: "Sales Table Fields" },
    { type: "definition", term: "Date", desc: "The date the item was purchased." },
    { type: "definition", term: "Shop", desc: "The shop where the item was sold." },
    { type: "definition", term: "Product Name", desc: "The name of the item purchased." },
    { type: "definition", term: "Unit Price", desc: "Price per unit of the item." },
    { type: "definition", term: "Amount Paid", desc: "The amount of money paid for each item." },
    { type: "definition", term: "Total Amount", desc: "The total of all items paid for." },
    { type: "definition", term: "Balance", desc: "The money left to be paid." },
    { type: "definition", term: "Status", desc: "Whether the payment was completed, pending, or has a balance." },
  ],
  "add-product-inventory": [
    { type: "heading", text: "Add a New Product to Inventory" },
    { type: "paragraph", text: "When you click on Add New Product, you will see all the information that needs to be filled." },
    { type: "steps", items: [
      "Go to Manage \u2192 Inventory.",
      "Click Add New Product.",
      "Select Shop.",
      "Select Product Category.",
      "Enter Product Name and Product Description.",
      "Enter or scan Product SKU (leave blank to auto-generate).",
      "Enter the Buying Price (Amount Bought) and Selling Price (Amount to Sell).",
      "Enter the Product Quantity.",
      "Click Add Product to save.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Add New Product Form" },
    { type: "note", text: "The Product SKU field stores whatever you type in when adding a new product. It can be used to easily access items during search, so ensure you put a word you can easily remember or type in during sales to give you direct access to the item you want to sell." },
  ],
  "restock-inventory": [
    { type: "heading", text: "Restock an Existing Product" },
    { type: "paragraph", text: "Restocking a product means adding more quantity to a product that already exists in the inventory." },
    { type: "steps", items: [
      "Go to Manage \u2192 Inventory.",
      "Click Add Existing Product.",
      "Select the Shop.",
      "Enter the New Purchase Price (current price is shown for reference).",
      "Enter the New Selling Price (current price is shown for reference).",
      "Enter the New Stock Quantity (current quantity available is shown).",
      "Click Add Existing Product to process.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Add Existing Product Form" },
  ],
  "stock-taking": [
    { type: "heading", text: "Stock Taking" },
    { type: "paragraph", text: "Stock Taking is used to have a detailed document of all the goods and quantity currently available in stock in your inventory to help for counting so as to determine if there is any loss." },
    { type: "steps", items: [
      "Go to Manage.",
      "Click on Inventory.",
      "Click Stock Taking.",
      "Select the Shop you want to export stock data for.",
      "Select the Export Format.",
      "Click Export Data to download the stock report.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Stock Taking Form" },
  ],
  "inventory-log": [
    { type: "heading", text: "Inventory Log" },
    { type: "paragraph", text: "Inventory Log is used to account for all the new goods that were recently added to the inventory. You can filter by date range to see specific entries." },
    { type: "paragraph", text: "The log shows: S/N, Item Name, Quantity, Selling Price, Action Type, Performed By, and Date/Time for each entry." },
    { type: "image", src: "/images/dashboard-preview.png", alt: "Inventory Log Table" },
  ],
  "add-product-warehouse": [
    { type: "heading", text: "Add a New Product to Warehouse" },
    { type: "paragraph", text: "Add new stock items to your warehouse for bulk storage before moving them to your shop inventory." },
    { type: "steps", items: [
      "Go to Warehouse Management.",
      "Click Add New Stock.",
      "Select Shop.",
      "Select Stock Category.",
      "Enter Product Name and Product Description.",
      "Enter or scan Product SKU (leave blank to auto-generate).",
      "Enter the Purchase Price and Selling Price.",
      "Enter the quantity and click to add the stock.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Add New Stock to Warehouse" },
  ],
  "restock-warehouse": [
    { type: "heading", text: "Restock Warehouse Product" },
    { type: "paragraph", text: "Add more quantity to an existing warehouse product." },
    { type: "steps", items: [
      "Go to Warehouse Management.",
      "Click Restock Existing Product.",
      "Select the Shop.",
      "Enter the Restock Quantity (current quantity available is shown).",
      "Click Restock Item to process.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Restock Warehouse Product" },
  ],
  "move-warehouse-inventory": [
    { type: "heading", text: "Move Items from Warehouse to Inventory" },
    { type: "paragraph", text: "Transfer stock from your warehouse directly to your shop inventory so items are available for sale." },
    { type: "steps", items: [
      "Go to Warehouse Management.",
      "Find the product you want to move.",
      "Select the destination shop inventory.",
      "Enter the quantity to move.",
      "Confirm the transfer.",
    ]},
  ],
  "make-sale": [
    { type: "heading", text: "Make a Sale and Print Receipt" },
    { type: "paragraph", text: "To make a sale after login, on the homepage click on Sell." },
    { type: "note", text: "Only admin accounts can select a shop. If there are multiple outlets created, you can select the exact shop you want to make the sale from. For a staff account, after clicking on Sell, search for the item you want to sell by typing its Product SKU into the search bar." },
    { type: "steps", items: [
      "Click on Sell from the homepage.",
      "Select the Shop (admin only).",
      "Search for the product by name, description, or Product SKU.",
      "Fill in the required information (quantity, sold price, etc.).",
      "Click Quick Sell to go directly to checkout, or Add to Cart if you want to sell multiple items.",
      "You can also use a barcode scanner instead of typing \u2014 items will be automatically added to cart.",
      "Proceed to Checkout to complete the sale.",
      "Fill in checkout details: Customer Name (optional), Customer Phone Number (optional), Amount Paid, Payment Type (Cash/Card/Transfer), Machine Fee, Tax Fee, and Remarks.",
      "Click Checkout to process the sale.",
    ]},
    { type: "image", src: "/images/dashboard-preview.png", alt: "Sell Item Interface" },
    { type: "image", src: "/images/dashboard-preview.png", alt: "Shopping Cart" },
    { type: "image", src: "/images/dashboard-preview.png", alt: "Checkout Form" },
    { type: "subheading", text: "Receipt" },
    { type: "paragraph", text: "After checkout, a receipt is generated showing the shop name, address, receipt number, customer details, staff name, date, items purchased with quantity and price, total amount, amount paid, balance, and payment method. Receipts can be viewed on web or printed via a mobile thermal printer." },
    { type: "image", src: "/images/dashboard-preview.png", alt: "Receipt Preview" },
  ],
}

// Build a flat list for prev/next navigation
const allItems = categories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.name }))
)

function findItemIndex(categoryName: string, slug: string) {
  return allItems.findIndex(
    (item) => item.category === categoryName && item.slug === slug
  )
}

// ── Content renderer ─────────────────────────────────────────────────────

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return <h2 key={i} className="text-2xl sm:text-3xl font-bold text-gray-900">{block.text}</h2>
          case "subheading":
            return <h3 key={i} className="text-lg sm:text-xl font-bold text-gray-900 pt-2">{block.text}</h3>
          case "paragraph":
            return <p key={i} className="text-gray-600 leading-relaxed">{block.text}</p>
          case "steps":
            return (
              <ol key={i} className="space-y-3">
                {block.items.map((step, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-[#6B9B37] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                      {j + 1}
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            )
          case "note":
            return (
              <div key={i} className="bg-[#F8FCF3] border border-[#6B9B37]/20 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#6B9B37]">Note: </span>
                  {block.text}
                </p>
              </div>
            )
          case "image":
            return (
              <div key={i} className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-100">
                <Image src={block.src} alt={block.alt} width={800} height={500} className="rounded-lg w-full h-auto" />
                <p className="text-xs text-gray-400 text-center mt-2">{block.alt}</p>
              </div>
            )
          case "definition":
            return (
              <div key={i} className="flex items-start gap-3 pl-2">
                <Check className="w-4 h-4 text-[#6B9B37] mt-1 flex-shrink-0" strokeWidth={2.5} />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{block.term}: </span>
                  {block.desc}
                </p>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState("GETTING STARTED")
  const [activeSlug, setActiveSlug] = useState("create-account")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["GETTING STARTED"])
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const selectItem = (categoryName: string, slug: string) => {
    setActiveCategory(categoryName)
    setActiveSlug(slug)
    setExpandedCategories((prev) => new Set(prev).add(categoryName))
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentIndex = findItemIndex(activeCategory, activeSlug)
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null
  const nextItem =
    currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null

  const currentCategory = categories.find((c) => c.name === activeCategory)
  const currentItem = currentCategory?.items.find(
    (i) => i.slug === activeSlug
  )

  const content = sectionContent[activeSlug]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-[#6B9B37] py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Learn How to Use POSBOK</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Step-by-step guides to help you get the most out of POSBOK for your business operations.</p>
        </div>
      </section>

      <div className="flex-1 flex">
        {/* ── MOBILE SIDEBAR TOGGLE ────────────────────────── */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-6 left-6 z-40 w-12 h-12 bg-[#6B9B37] text-white rounded-full shadow-lg flex items-center justify-center"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* ── SIDEBAR ─────────────────────────────────────── */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-16 left-0 z-30 h-screen lg:h-[calc(100vh-4rem)] w-72 bg-white border-r border-gray-200 overflow-y-auto transition-transform lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 lg:hidden -z-10"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <nav className="py-6 px-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 px-3">Documentation</p>
            {categories.map((cat) => {
              const isExpanded = expandedCategories.has(cat.name)
              const isActiveCategory = cat.name === activeCategory
              return (
                <div key={cat.name} className="mb-1">
                  <button
                    onClick={() => toggleCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      isActiveCategory
                        ? "bg-[#F8FCF3] text-[#6B9B37]"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <cat.icon className="w-4 h-4" strokeWidth={2} />
                      {cat.name}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="ml-4 border-l-2 border-gray-100 pl-4 mt-1 mb-2">
                      {cat.items.map((item) => {
                        const isActive =
                          cat.name === activeCategory &&
                          item.slug === activeSlug
                        return (
                          <button
                            key={item.slug}
                            onClick={() => selectItem(cat.name, item.slug)}
                            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              isActive
                                ? "text-[#6B9B37] font-medium bg-[#F8FCF3]"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            {item.title}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ──────────────────────────────── */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
              <Link href="/learn" className="hover:text-[#6B9B37] transition-colors">
                Learn
              </Link>
              <span>&gt;</span>
              <span className="capitalize">
                {activeCategory.charAt(0) +
                  activeCategory.slice(1).toLowerCase()}
              </span>
              <span>&gt;</span>
              <span className="text-gray-900 font-medium">
                {currentItem?.title}
              </span>
            </div>

            {/* Section content */}
            {content ? (
              <ContentRenderer blocks={content} />
            ) : (
              <div className="text-center py-16">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">{currentItem?.title}</h2>
                <p className="text-gray-500">Content for this section is coming soon.</p>
              </div>
            )}

            {/* Previous / Next navigation */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-12">
              {prevItem ? (
                <button
                  onClick={() =>
                    selectItem(prevItem.category, prevItem.slug)
                  }
                  className="text-left group"
                >
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Previous
                  </p>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-[#6B9B37] transition-colors">
                    {prevItem.title}
                  </p>
                </button>
              ) : (
                <div />
              )}
              {nextItem ? (
                <button
                  onClick={() =>
                    selectItem(nextItem.category, nextItem.slug)
                  }
                  className="text-right group"
                >
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Next
                  </p>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-[#6B9B37] transition-colors">
                    {nextItem.title}
                  </p>
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* ── MOBILE APP ──────────────────────────────────── */}
          <section className="bg-[#F8FCF3] py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/images/POSBOK -  Demo UI (8).png"
                  alt="POSBOK Mobile App"
                  width={400}
                  height={500}
                  className="rounded-3xl shadow-2xl w-auto max-h-[500px] object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6B9B37] mb-3">
                  Manage your business on the go
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Download Our Mobile app
                </h2>
                <p className="text-gray-500 mb-6">
                  Manage transactions, view live reports, and monitor inventory
                  from your pocket.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Offline Access that syncs automatically when connected.",
                    "Monitor stock levels and sales performance from anywhere.",
                    "Process POS transactions directly via the mobile app.",
                    "Get immediate notifications for low stock or transactions made.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-700 text-sm"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#6B9B37] flex items-center justify-center flex-shrink-0">
                        <Check
                          className="w-3 h-3 text-white"
                          strokeWidth={3}
                        />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <div className="bg-black text-white rounded-xl px-5 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-300">Download on the</p>
                      <p className="text-sm font-semibold">App Store</p>
                    </div>
                  </div>
                  <div className="bg-black text-white rounded-xl px-5 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.18 23.76c.3.17.63.24.97.21l12.92-7.46-2.89-2.89-11 10.14zm16.32-9.43L17 12.95l3.04-1.76-3.04-1.76-2.5 2.5 2.5 2.5 2.5-2.5zm-15.85 9.23c-.19-.11-.34-.28-.44-.48L14.74 12 3.21 1.68c.1-.2.25-.37.44-.48L16.5 8.66 13.26 12l3.24 3.34-9.85 8.22z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-300">Get it on</p>
                      <p className="text-sm font-semibold">Google Play</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA BANNER ──────────────────────────────────── */}
          <section className="bg-[#7fb239] py-16 px-4 md:px-8 rounded-t-[20px]">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                  Transform your business today and enjoy an efficient Business
                  Management
                </h2>
                <p className="text-white mb-6">
                  Join over 150+ Businesses who trust POSbok for their daily
                  operations.
                </p>
                <Link
                  href="https://app.posbok.com/createbusiness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-900 transition-colors text-sm"
                >
                  SIGN UP
                </Link>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/inventory-view.png"
                  alt="POSBOK Inventory"
                  width={500}
                  height={350}
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  )
}
