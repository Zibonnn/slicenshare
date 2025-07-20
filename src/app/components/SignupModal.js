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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0D0D0D] rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Social Proof */}
            <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="h4 gradient-text-primary mb-1">Join {selectedPlan} Plan</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span className="caption-1 text-white-56">4.9/5 Rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={12} className="text-purple-400" />
                      <span className="caption-1 text-white-56">500+ Streamers</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onClose} 
                  className="w-7 h-7 bg-secondary-cta/80 hover:bg-secondary-cta rounded-full flex items-center justify-center transition-all duration-300 ease-out cursor-pointer"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center space-x-1">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      currentStep > index + 1 
                        ? 'bg-green-500 text-white' 
                        : currentStep === index + 1 
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
                        : 'bg-gray-700 text-gray-400'
                    }`}>
                      {currentStep > index + 1 ? <Check size={10} /> : index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-6 h-0.5 mx-1 transition-all duration-300 ${
                        currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-center py-8 h-full flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={24} className="text-white" />
                  </div>
                  <h3 className="h3 text-white mb-3">Welcome to Slice N Share!</h3>
                  <p className="body-s text-white-56">Your registration was successful. We'll be in touch soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500 rounded-xl p-4 mb-6"
                    >
                      <p className="text-red-400 caption-1">{error}</p>
                    </motion.div>
                  )}

                  <div className="flex-1">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Basic Information */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div className="text-center mb-4">
                            <div className="text-2xl mb-2">{steps[0].icon}</div>
                            <h3 className="h5 text-white mb-1">{steps[0].title}</h3>
                            <p className="caption-1 text-white-56">{steps[0].subtitle}</p>
                          </div>

                          <div>
                            <label className="block text-white caption-1 font-medium mb-2">Full Name *</label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2.5 bg-[#171717] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-[#1a1a1a] transition-all duration-200 body-s"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-white caption-1 font-medium mb-2">Display Name *</label>
                            <input
                              type="text"
                              name="displayName"
                              value={formData.displayName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2.5 bg-[#171717] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-[#1a1a1a] transition-all duration-200 body-s"
                              placeholder="What should we call you?"
                              required
                            />
                          </div>

                          {/* Plan Benefits Preview */}
                          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-4 border border-purple-500/20">
                            <h4 className="caption-1 font-medium text-white mb-2">✨ {selectedPlan} Plan Benefits</h4>
                            <ul className="space-y-1">
                              {getPlanBenefits().map((benefit, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <Check size={12} className="text-green-400 flex-shrink-0" />
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
                          className="space-y-4"
                        >
                          <div className="text-center mb-4">
                            <div className="text-2xl mb-2">{steps[1].icon}</div>
                            <h3 className="h5 text-white mb-1">{steps[1].title}</h3>
                            <p className="caption-1 text-white-56">{steps[1].subtitle}</p>
                          </div>

                          <div>
                            <label className="block text-white caption-1 font-medium mb-2">Email *</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2.5 bg-[#171717] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-[#1a1a1a] transition-all duration-200 body-s"
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-white caption-1 font-medium mb-2">Phone *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+8801XXXXXXXXX"
                              className="w-full px-3 py-2.5 bg-[#171717] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-[#1a1a1a] transition-all duration-200 body-s"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-white caption-1 font-medium mb-2">District *</label>
                            <select
                              name="district"
                              value={formData.district}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2.5 bg-[#171717] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-[#1a1a1a] transition-all duration-200 body-s appearance-none"
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
                          className="space-y-4"
                        >
                          <div className="text-center mb-4">
                            <div className="text-2xl mb-2">{steps[2].icon}</div>
                            <h3 className="h5 text-white mb-1">{steps[2].title}</h3>
                            <p className="caption-1 text-white-56">{steps[2].subtitle}</p>
                          </div>
                          
                          <div>
                            <label className="block text-white caption-1 font-medium mb-2">Gaming Platforms *</label>
                            <div className="grid grid-cols-3 gap-1.5">
                              {platforms.map((platform) => (
                                <label key={platform} className="relative cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={formData.platform.includes(platform)}
                                    onChange={() => handleArrayChange("platform", platform)}
                                    className="sr-only"
                                  />
                                  <div className={`p-1.5 rounded-lg border-2 transition-all duration-200 text-center ${
                                    formData.platform.includes(platform)
                                      ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                                      : 'border-gray-700 bg-[#171717] text-gray-400 hover:border-gray-600'
                                  }`}>
                                    <span className="caption-1 font-medium">{platform}</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-white caption-1 font-medium mb-2">Primary Games *</label>
                            <div className="grid grid-cols-2 gap-1.5">
                              {gamesList.map((game) => (
                                <label key={game} className="relative cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={formData.primaryGameTitles.includes(game)}
                                    onChange={() => handleArrayChange("primaryGameTitles", game)}
                                    className="sr-only"
                                  />
                                  <div className={`p-1.5 rounded-lg border-2 transition-all duration-200 text-center ${
                                    formData.primaryGameTitles.includes(game)
                                      ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                                      : 'border-gray-700 bg-[#171717] text-gray-400 hover:border-gray-600'
                                  }`}>
                                    <span className="caption-1">{game}</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-white caption-1 font-medium mb-2">Monthly Income Range</label>
                            <select
                              name="monthlyIncomeRange"
                              value={formData.monthlyIncomeRange}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2.5 bg-[#171717] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-[#1a1a1a] transition-all duration-200 body-s appearance-none"
                            >
                              <option value="">Select income range</option>
                              <option value="0-3K">0-3K BDT</option>
                              <option value="3-6K">3-6K BDT</option>
                              <option value="6-10K">6-10K BDT</option>
                              <option value="10K+">10K+ BDT</option>
                            </select>
                          </div>

                          <div>
                            <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors duration-200">
                              <input
                                type="checkbox"
                                name="isSponsored"
                                checked={formData.isSponsored}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-purple-600 bg-[#171717] border-gray-600 rounded focus:ring-purple-500"
                              />
                              <span className="text-gray-300 body-s">I am currently sponsored</span>
                            </label>
                          </div>

                          {/* Final CTA Motivation */}
                          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-4 border border-green-500/20">
                            <div className="flex items-center space-x-2 mb-2">
                              <Zap size={16} className="text-yellow-400" />
                              <h4 className="caption-1 font-medium text-white">Ready to Start Your Journey?</h4>
                            </div>
                            <p className="caption-1 text-white-56">Join 500+ streamers who've already transformed their gaming career with Slice N Share!</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 border-t border-gray-800">
                    {currentStep > 1 && (
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center space-x-2 px-4 py-2.5 text-gray-400 hover:text-white transition-colors"
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
                        className="ml-auto flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed body-s font-medium"
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
                        className="ml-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed body-s font-medium"
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        whileTap={{ scale: loading ? 1 : 0.95 }}
                      >
                        {loading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Signing Up...</span>
                          </div>
                        ) : (
                          "Join Slice N Share"
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
