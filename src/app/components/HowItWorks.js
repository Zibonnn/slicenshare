"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"

// Constants
const STEPS = [
  {
    id: 1,
    title: "You've Got Skill, But No Support",
    description: "Your talent is real — but access to opportunities is missing.",
    type: "devices",
    image: "/How_It_Works_SNS/1.webp",
  },
  {
    id: 2,
    title: "Slice N Share Has Your Back",
    description: "We connect you to support, sponsors & growth opportunities.",
    type: "circle",
    image: "/How_It_Works_SNS/2.webp",
  },
  {
    id: 3,
    title: "Rise to the Global Stage",
    description: "From local player to global eSports icon and beyond.",
    type: "devices-advanced",
    image: "/How_It_Works_SNS/3.webp",
  },
]

// Components
const StepCard = ({ step, index, isHovered, onHover, onLeave }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02 }
  }

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 }
  }

  const getImageFilter = () => {
    return isHovered 
      ? "grayscale(0%) brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))"
      : "grayscale(100%) brightness(0.7) saturate(0.5)"
  }

  return (
    <motion.div
      key={step.id}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="how-card"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="how-card-image-container">
        <motion.div
          className="how-card-image-wrapper"
          variants={imageVariants}
          transition={{ duration: 0.3 }}
        >
          <img
            src={step.image}
            alt={`${step.title} illustration`}
            className="how-card-image"
            style={{ filter: getImageFilter() }}
          />
        </motion.div>
      </div>

      <div className="how-card-content">
        <h3 className="how-card-title">
          {step.title}
        </h3>
        <p className="how-card-description">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

// Main Component
export default function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const handleHover = useMemo(() => (index) => setHoveredIndex(index), [])
  const handleLeave = useMemo(() => () => setHoveredIndex(null), [])

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="how-it-works-header"
        >
          <h2 className="h4-alt">HOW IT WORKS</h2>
        </motion.div>

        <div className="how-it-works-grid">
          {STEPS.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => handleHover(index)}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
