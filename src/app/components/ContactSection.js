/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-duplicate-props */
"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { User, Mail, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react"

const floatingIcons = [
  {
    icon: "/Contact/1x/Chat.png",
    x: 58,
    y: 30,
    size: "contact-icon-small",
  },
  {
    icon: "/Contact/1x/Arrow.png",
    x: 44,
    y: 53,
    size: "contact-icon-small",
    rotate: -45,
  },
  {
    icon: "/Contact/1x/Main.png",
    x: 45,
    y: 40,
    size: "contact-icon-large",
  },
  {
    icon: "/Contact/1x/Check.png",
    x: 75,
    y: 65,
    size: "contact-icon-small",
  },
  {
    icon: "/Contact/1x/Doc.png",
    x: 56,
    y: 83,
    size: "contact-icon-small",
  },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3001/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.")
      }

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        message: "",
      })

      // Show success message
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="contact-header"
        >
          <h2 className="h4-alt mb-2">STAY IN THE LOOP</h2>
          <p className="callout gradient-text-primary">
            Contact Us
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Left Side - Animated Icons (Hidden on mobile, shown on lg+) */}
          <div className="contact-icons-container">
            {/* Floating Icons */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className="contact-floating-icon"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: item.rotate ? `rotate(${item.rotate}deg)` : "none",
                }}
                initial={{ opacity: 1, scale: 1, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                animate={{
                  y: [0, -8],
                  rotate: item.rotate ? [item.rotate, item.rotate + 5] : [0, 2],
                }}
                transition={{
                  duration: 2,
                  delay: item.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
              >
                <img
                  src={item.icon || "/placeholder.svg"}
                  alt={`Contact icon ${index + 1}`}
                  className={`${item.size} object-contain`}
                />
              </motion.div>
            ))}
          </div>

          {/* Right Side - Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="contact-form-container"
          >
            {/* Form Header */}
            <div className="contact-form-header">
              <h4 className="h4-alt text-center">Get In Touch</h4>
              <p className="body-s text-center">
                Ready to join the next generation of esports? Let's talk.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="contact-success"
                >
                  <div className="contact-success-text">
                    <CheckCircle className="contact-error-icon" />
                    <span className="caption-1">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="contact-error-modern"
                >
                  <div className="contact-error-text-modern">
                    <AlertCircle className="contact-error-icon" />
                    <span className="caption-1">{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Form Fields */}
              <div className="contact-form-section">
                <div className="contact-field-floating">
                  <label className="caption-1 contact-label-modern">
                    <User className="contact-label-icon" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="contact-input-modern"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="contact-field-floating">
                  <label className="caption-1 contact-label-modern">
                    <Mail className="contact-label-icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="contact-input-modern"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="contact-field-floating">
                  <label className="caption-1 contact-label-modern">
                    <MessageSquare className="contact-label-icon" />
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your gaming journey, goals, or any questions you have..."
                    className="contact-textarea-modern"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* CTA Section */}
              <div className="contact-cta-section">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  whileHover={{
                    scale: loading ? 1 : 1.02,
                  }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  style={{ gap: "0.5rem" }}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
