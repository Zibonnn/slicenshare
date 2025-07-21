"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Check, Star, Users, Zap } from "lucide-react"

const districts = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"]
const platforms = ["PC", "Mobile", "Console"]
const gamesList = ["PUBG", "Valorant", "CS:GO", "Fortnite", "League of Legends", "Dota 2", "Apex Legends", "Call of Duty", "Overwatch", "Rocket League"]

export default function SignupModal({ isOpen, onClose, selectedPlan }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    displayName: "",
    email: "",
    phone: "",
    district: "",
    platform: [],
    primaryGameTitles: [],
    isSponsored: false,
    monthlyIncomeRange: "",
    bio: "",
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value) ? prev[name].filter((item) => item !== value) : [...prev[name], value],
    }))
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const payload = {
        ...formData,
        plan: selectedPlan?.toLowerCase() || "basic",
        avatar: {
          url: "https://example.com/avatar.jpg",
          publicId: "avatar_public_id",
        },
      }

      const response = await fetch("https://api.slicenshare.com/api/v1/auth/streamers/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to sign up. Please try again.")
      }

      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setCurrentStep(1)
        setFormData({
          fullName: "",
          displayName: "",
          email: "",
          phone: "",
          district: "",
          platform: [],
          primaryGameTitles: [],
          isSponsored: false,
          monthlyIncomeRange: "",
          bio: "",
        })
      }, 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const isStep1Valid = formData.fullName && formData.displayName
  const isStep2Valid = formData.email && formData.phone && formData.district
  const isStep3Valid = formData.platform.length > 0 && formData.primaryGameTitles.length > 0

  const steps = [
    { title: "Get Started", subtitle: "Tell us about yourself", icon: "👋" },
    { title: "Contact Info", subtitle: "How can we reach you?", icon: "📧" },
    { title: "Gaming Profile", subtitle: "What do you play?", icon: "🎮" }
  ]

  const getPlanBenefits = () => {
    switch(selectedPlan?.toLowerCase()) {
      case 'standard':
        return ['Priority Support', 'Advanced Analytics', 'Custom Branding']
      case 'advanced':
        return ['VIP Support', 'Premium Analytics', 'Exclusive Features']
      default:
        return ['Community Access', 'Basic Analytics', 'Standard Features']
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="signup-modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="signup-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Social Proof */}
            <div className="signup-modal-header signup-modal-header-plain">
              <div className="signup-modal-header-row">
                <div>
                  <h2 className="h4 gradient-text-primary" style={{ marginBottom: 4 }}>Join {selectedPlan} Plan</h2>
                </div>
                <button 
                  onClick={onClose} 
                  className="signup-modal-close-btn"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="signup-modal-stepper">
                {steps.map((step, index) => (
                  <div key={index} className="signup-modal-stepper-item">
                    <div className={`signup-modal-stepper-circle ${
                      currentStep > index + 1 
                        ? 'signup-modal-stepper-complete' 
                        : currentStep === index + 1 
                        ? 'signup-modal-stepper-active' 
                        : 'signup-modal-stepper-inactive'
                    }`}>
                      {currentStep > index + 1 ? <Check size={10} /> : index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`signup-modal-stepper-bar ${currentStep > index + 1 ? 'signup-modal-stepper-bar-complete' : ''}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="signup-modal-content">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="signup-modal-success"
                >
                  <div className="signup-modal-success-icon">
                    <Check size={24} className="text-white" />
                  </div>
                  <h3 className="h3 text-white" style={{ marginBottom: 12 }}>Welcome to Slice N Share!</h3>
                  <p className="body-s text-white-56">Your registration was successful. We'll be in touch soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="signup-modal-form">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="signup-modal-error"
                    >
                      <p className="text-red-400 caption-1">{error}</p>
                    </motion.div>
                  )}

                  <div className="signup-modal-form-steps">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Basic Information */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="signup-modal-step"
                        >
                          <div className="signup-modal-step-header">
                            <h3 className="h5 text-white" style={{ marginBottom: 4 }}>{steps[0].title}</h3>
                            <p className="caption-1 text-white-56">{steps[0].subtitle}</p>
                          </div>

                          <div>
                            <label className="signup-modal-label">Full Name *</label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="signup-modal-input"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                          <div>
                            <label className="signup-modal-label">Display Name *</label>
                            <input
                              type="text"
                              name="displayName"
                              value={formData.displayName}
                              onChange={handleInputChange}
                              className="signup-modal-input"
                              placeholder="What should we call you?"
                              required
                            />
                          </div>

                          {/* Plan Benefits Preview */}
                          <div className="signup-modal-benefits">
                            <h4 className="caption-1" style={{ fontWeight: 500, color: '#fff', marginBottom: 8 }}>✨ {selectedPlan} Plan Benefits</h4>
                            <ul className="signup-modal-benefits-list">
                              {getPlanBenefits().map((benefit, index) => (
                                <li key={index} className="signup-modal-benefit-item">
                                  <Check size={12} className="signup-modal-benefit-icon" />
                                  <span className="caption-1 text-white-56">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Contact Information */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="signup-modal-step"
                        >
                          <div className="signup-modal-step-header">
                            <h3 className="h5 text-white" style={{ marginBottom: 4 }}>{steps[1].title}</h3>
                            <p className="caption-1 text-white-56">{steps[1].subtitle}</p>
                          </div>

                          <div>
                            <label className="signup-modal-label">Email *</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="signup-modal-input"
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>
                          <div>
                            <label className="signup-modal-label">Phone *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+8801XXXXXXXXX"
                              className="signup-modal-input"
                              required
                            />
                          </div>
                          <div>
                            <label className="signup-modal-label">District *</label>
                            <select
                              name="district"
                              value={formData.district}
                              onChange={handleInputChange}
                              className="signup-modal-input"
                              required
                            >
                              <option value="">Select your district</option>
                              {districts.map((district) => (
                                <option key={district} value={district}>{district}</option>
                              ))}
                            </select>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Gaming Information */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="signup-modal-step"
                        >
                          <div className="signup-modal-step-header">
                            <h3 className="h5 text-white" style={{ marginBottom: 4 }}>{steps[2].title}</h3>
                            <p className="caption-1 text-white-56">{steps[2].subtitle}</p>
                          </div>
                          
                          <div>
                            <label className="signup-modal-label">Gaming Platforms *</label>
                            <div className="signup-modal-platforms">
                              {platforms.map((platform) => (
                                <label key={platform} className="signup-modal-checkbox-label">
                                  <input
                                    type="checkbox"
                                    checked={formData.platform.includes(platform)}
                                    onChange={() => handleArrayChange("platform", platform)}
                                    className="signup-modal-checkbox-input"
                                  />
                                  <div className={`signup-modal-checkbox-box ${formData.platform.includes(platform) ? 'signup-modal-checkbox-active' : ''}`}>
                                    <span className="caption-1" style={{ fontWeight: 500 }}>{platform}</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="signup-modal-label">Primary Games *</label>
                            <div className="signup-modal-games">
                              {gamesList.map((game) => (
                                <label key={game} className="signup-modal-checkbox-label">
                                  <input
                                    type="checkbox"
                                    checked={formData.primaryGameTitles.includes(game)}
                                    onChange={() => handleArrayChange("primaryGameTitles", game)}
                                    className="signup-modal-checkbox-input"
                                  />
                                  <div className={`signup-modal-checkbox-box ${formData.primaryGameTitles.includes(game) ? 'signup-modal-checkbox-active' : ''}`}>
                                    <span className="caption-1">{game}</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="signup-modal-label">Monthly Income Range</label>
                            <select
                              name="monthlyIncomeRange"
                              value={formData.monthlyIncomeRange}
                              onChange={handleInputChange}
                              className="signup-modal-input"
                            >
                              <option value="">Select income range</option>
                              <option value="0-3K">0-3K BDT</option>
                              <option value="3-6K">3-6K BDT</option>
                              <option value="6-10K">6-10K BDT</option>
                              <option value="10K+">10K+ BDT</option>
                            </select>
                          </div>

                          <div>
                            <label className="signup-modal-sponsor-label">
                              <input
                                type="checkbox"
                                name="isSponsored"
                                checked={formData.isSponsored}
                                onChange={handleInputChange}
                                className="signup-modal-sponsor-checkbox"
                              />
                              <span className="body-s" style={{ color: '#ccc' }}>I am currently sponsored</span>
                            </label>
                          </div>

                          {/* Final CTA Motivation */}
                          <div className="signup-modal-cta">
                            <div className="signup-modal-cta-row">
                              <Zap size={16} className="signup-modal-cta-icon" />
                              <h4 className="caption-1" style={{ fontWeight: 500, color: '#fff' }}>Ready to Start Your Journey?</h4>
                            </div>
                            <p className="caption-1 text-white-56">Join 500+ streamers who&#39;ve already transformed their gaming career with Slice N Share!</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="signup-modal-nav-row">
                    {currentStep > 1 && (
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        className="signup-modal-nav-btn signup-modal-nav-btn-back"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChevronLeft size={18} />
                        <span className="body-s">Back</span>
                      </motion.button>
                    )}
                    
                    {currentStep < 3 ? (
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStep1Valid && currentStep === 1 || !isStep2Valid && currentStep === 2}
                        className="signup-modal-nav-btn signup-modal-nav-btn-next"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Continue</span>
                        <ChevronRight size={18} />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="btn-primary signup-modal-cta-btn"
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        whileTap={{ scale: loading ? 1 : 0.95 }}
                      >
                        {loading ? (
                          <div className="signup-modal-loading">
                            <div className="signup-modal-spinner"></div>
                            <span>Signing Up...</span>
                          </div>
                        ) : (
                          <span className="signup-modal-cta-btn-inner">
                            <span>Join Slice N Share</span>
                            <svg className="signup-modal-cta-btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        )}
                      </motion.button>
                    )}
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
