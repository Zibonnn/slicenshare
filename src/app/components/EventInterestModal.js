"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X, User, Mail, Phone, CheckCircle, AlertCircle, Send, Calendar } from "lucide-react"

export default function EventInterestModal({ isOpen, onClose, eventTitle, eventImage }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  })

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
      const response = await fetch("http://localhost:3001/api/v1/events/event-interested", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          eventType: eventTitle,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to register interest. Please try again.")
      }

      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
        })
      }, 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
      setError("")
      setSuccess(false)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
      })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="event-modal-overlay"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="event-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="event-modal-header">
              <div className="event-modal-header-content">
                <h2 className="h4-alt event-modal-title">Event Interest</h2>
              </div>
              <button
                onClick={handleClose}
                disabled={loading}
                className="event-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="event-modal-content">
              {/* Event Info */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ position: "relative", height: "8rem", borderRadius: "12px", overflow: "hidden", marginBottom: "1rem" }}>
                  <img
                    src={eventImage || "/placeholder.svg?height=128&width=400"}
                    alt={eventTitle}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    crossOrigin="anonymous"
                  />
                  <div style={{ position: "absolute", inset: "0", background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}></div>
                </div>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <h3 className="h3 gradient-text-primary" style={{ marginBottom: "0.5rem" }}>
                    {eventTitle}
                  </h3>
                </div>
              </div>

              {success ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="event-modal-success"
                >
                  <div className="event-modal-success-icon">
                    <CheckCircle size={32} color="white" />
                  </div>
                  <h3 className="h3 event-modal-success-title">Interest Registered!</h3>
                  <p className="body-s event-modal-success-text">We will contact you with event details soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
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
                        name="fullName"
                        value={formData.fullName}
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
                        <Phone className="contact-label-icon" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+8801XXXXXXXXX"
                        className="contact-input-modern"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="contact-cta-section">
                    <div style={{ display: "flex", gap: "12px" }}>
                      <motion.button
                        type="button"
                        onClick={handleClose}
                        disabled={loading}
                        className="btn-secondary"
                        style={{ flex: 1 }}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                      >
                        Cancel
                      </motion.button>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{ flex: 1, gap: "0.5rem" }}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                      >
                        {loading ? (
                          <>
                            <div className="loading-spinner"></div>
                            <span>Registering...</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Register Interest</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
