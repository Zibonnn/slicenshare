"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

function AnimatedNavItem({ children, href, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="subhead hover:text-red-500 transition-colors inline-block"
      animate={{ y: hovered ? -4 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {children}
    </motion.a>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md rounded-[8px]" : "bg-transparent rounded-[8px]"
        }`}
        style={{ width: "95%", maxWidth: "600px" }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 rounded-[20px]">
          <div className="flex items-center space-x-1">
            <img src="/Logo/Logo.png" className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <AnimatedNavItem href="#home">Home</AnimatedNavItem>
            <AnimatedNavItem href="#how-it-works">How It Works</AnimatedNavItem>
            <AnimatedNavItem href="#plans">Plans</AnimatedNavItem>
            <AnimatedNavItem href="#events">Events</AnimatedNavItem>
            <AnimatedNavItem href="#contact">Contact</AnimatedNavItem>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden text-white hover:text-red-500 transition-colors">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 md:hidden"
          onClick={closeMobileMenu}
        >
          <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center justify-center h-full space-y-8"
          >
            <AnimatedNavItem href="#home" onClick={closeMobileMenu}>Home</AnimatedNavItem>
            <AnimatedNavItem href="#how-it-works" onClick={closeMobileMenu}>How It Works</AnimatedNavItem>
            <AnimatedNavItem href="#plans" onClick={closeMobileMenu}>Plans</AnimatedNavItem>
            <AnimatedNavItem href="#events" onClick={closeMobileMenu}>Events</AnimatedNavItem>
            <AnimatedNavItem href="#contact" onClick={closeMobileMenu}>Contact</AnimatedNavItem>
          </motion.nav>
        </motion.div>
      )}
    </>
  )
}
