"use client"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="footer-logo-section"
          >
            <div className="footer-logo-container">
              <img 
                src="/Logo/SNS_Logo.svg" 
                alt="Slice N Share Logo"
                className="footer-logo" 
              />
            </div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="footer-section"
          >
            <h4 className="h4-alt text-left footer-section-title gradient-text-primary">SOCIAL LINKS</h4>
            <div className="footer-links">
              <motion.a
                href="#"
                className="footer-social-link caption-1 group"
                whileHover={{ x: 5 }}
              >
                <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="caption-1">LinkedIn</span>
                <svg
                  className="footer-social-arrow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="footer-social-link caption-1 group"
                whileHover={{ x: 5 }}
              >
                <svg className="footer-social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="caption-1">Facebook</span>
                <svg
                  className="footer-social-arrow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Website Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="footer-section"
          >
            <h4 className="h4-alt text-left footer-section-title gradient-text-primary">WEBSITE</h4>
            <div className="footer-links">
              <motion.a
                href="#home"
                className="footer-nav-link caption-1"
                whileHover={{ x: 5 }}
              >
                Home
              </motion.a>
              <motion.a
                href="#about"
                className="footer-nav-link caption-1"
                whileHover={{ x: 5 }}
              >
                About
              </motion.a>
              <motion.a
                href="#team"
                className="footer-nav-link caption-1"
                whileHover={{ x: 5 }}
              >
                Team
              </motion.a>
              <motion.a
                href="#creators"
                className="footer-nav-link caption-1"
                whileHover={{ x: 5 }}
              >
                Creators
              </motion.a>
              <motion.a
                href="#contact"
                className="footer-nav-link caption-1"
                whileHover={{ x: 5 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="footer-copyright"
        >
          <p className="caption-1">Copyright © 2025. All Rights Reserved by Slice N Share.</p>
        </motion.div>
      </div>
    </footer>
  )
}
