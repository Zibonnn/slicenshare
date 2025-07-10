"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { Menu, X } from "lucide-react"

// Constants
const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#plans", label: "Plans" },
  { href: "#events", label: "Events" },
  { href: "#contact", label: "Contact" },
]

// Custom hooks
const useScrollEffect = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return isScrolled
}

// Components
const AnimatedNavItem = ({ href, label, onClick, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`subhead hover:text-red-500 transition-colors inline-block cursor-pointer ${className}`}
      animate={{ y: isHovered ? -4 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </motion.a>
  )
}

const MobileMenuButton = ({ isOpen, onClick }) => (
  <button 
    onClick={onClick} 
    className="md:hidden text-white hover:text-red-500 transition-colors"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    {isOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
)

const MobileMenu = ({ isOpen, onClose }) => {
  const handleItemClick = useCallback(() => {
    onClose()
  }, [onClose])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 md:hidden"
      onClick={onClose}
    >
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center justify-center h-full space-y-8"
      >
        {NAV_ITEMS.map((item) => (
          <AnimatedNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            onClick={handleItemClick}
          />
        ))}
      </motion.nav>
    </motion.div>
  )
}

// Main Component
export default function Header() {
  const isScrolled = useScrollEffect()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const headerClasses = `fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
    isScrolled ? "bg-black/80 backdrop-blur-md rounded-[8px]" : "bg-transparent rounded-[8px]"
  }`

  return (
    <>
      <motion.header
        className={`${headerClasses} header-container`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 rounded-[20px]">
          {/* Logo */}
          <div className="flex items-center space-x-1">
            <img 
              src="/Logo/Logo.png" 
              alt="Slice N Share Logo"
              className="w-6 h-6 sm:w-8 sm:h-8" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {NAV_ITEMS.map((item) => (
              <AnimatedNavItem
                key={item.href}
                href={item.href}
                label={item.label}
              />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <MobileMenuButton 
            isOpen={isMobileMenuOpen} 
            onClick={toggleMobileMenu} 
          />
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
      />
    </>
  )
}
