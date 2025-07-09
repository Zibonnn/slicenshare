"use client"
import { motion } from "framer-motion"
import { useState } from "react"

const steps = [
  {
    title: "You've Got Skill, But No Support",
    description: "Your talent is real — but access to opportunities is missing.",
    type: "devices",
  },
  {
    title: "Slice N Share Has Your Back",
    description: "We connect you to support, sponsors & growth opportunities.",
    type: "circle",
  },
  {
    title: "Rise to the Global Stage",
    description: "From local player to global eSports icon and beyond.",
    type: "devices-advanced",
  },
]

export default function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section id="how-it-works" className="py-40 bg-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="h4-alt" style={{ textAlign: 'center' }}>HOW IT WORKS</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="how-card"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-64 flex items-center justify-center ">
                {/* Card Background */}
                <motion.div
                  className="rounded-2xl flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* First Card - Original Devices Design */}
                  {step.type === "devices" && (
                    <div className="relative">
                      <motion.div
                        className="relative w-full h-64 flex items-center justify-center"
                        animate={{
                          scale: hoveredIndex === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src="/How_It_Works_SNS/1.webp"
                          alt="Devices illustration"
                          className="w-full h-full object-contain"
                          style={{
                            filter:
                              hoveredIndex === index
                                ? "grayscale(0%) brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))"
                                : "grayscale(100%) brightness(0.7) saturate(0.5)",
                            transition: "filter 0.3s ease",
                          }}
                        />
                      </motion.div>
                    </div>
                  )}

                  {/* Second Card - Circular Progress Design */}
                  {step.type === "circle" && (
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className="relative w-full h-64 flex items-center justify-center"
                        animate={{
                          scale: hoveredIndex === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src="/How_It_Works_SNS/2.webp"
                          alt="Circular progress illustration"
                          className="w-full h-full object-contain"
                          style={{
                            filter:
                              hoveredIndex === index
                                ? "grayscale(0%) brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))"
                                : "grayscale(100%) brightness(0.7) saturate(0.5)",
                            transition: "filter 0.3s ease",
                          }}
                        />
                      </motion.div>
                    </div>
                  )}

                  {/* Third Card - Advanced Devices with Badge */}
                  {step.type === "devices-advanced" && (
                    <div className="relative">
                      <motion.div
                        className="relative w-full h-64 flex items-center justify-center"
                        animate={{
                          scale: hoveredIndex === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src="/How_It_Works_SNS/3.webp"
                          alt="Advanced devices illustration"
                          className="w-full h-full object-contain"
                          style={{
                            filter:
                              hoveredIndex === index
                                ? "grayscale(0%) brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))"
                                : "grayscale(100%) brightness(0.7) saturate(0.5)",
                            transition: "filter 0.3s ease",
                          }}
                        />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>

              <div style={{ margin: '16px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', textAlign: 'center', marginTop: '16px' }}>
                <h3
                  className="h5"
                  style={{ textAlign: 'center', color: '#FFFFFF' }}
                >
                  {step.title}
                </h3>
                <p
                  className="body-s"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.56)', 
                    textAlign: 'center',
                    textWrap: 'balance',
                    maxWidth: '280px'
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
