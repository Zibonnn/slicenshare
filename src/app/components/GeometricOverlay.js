"use client"

import { motion } from "framer-motion"

// Constants
const ANIMATION_DURATION = 2
const INITIAL_OPACITY = 0
const FINAL_OPACITY = 0.6

// Components
const DiamondPattern = () => (
  <div className="w-full h-full geometric-diamond-pattern" />
)

const TextureLayer = () => (
  <div className="absolute inset-0 opacity-30 geometric-texture-layer" />
)

// Main Component
export default function GeometricOverlay() {
  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: INITIAL_OPACITY }}
      animate={{ opacity: FINAL_OPACITY }}
      transition={{ duration: ANIMATION_DURATION }}
    >
      <DiamondPattern />
      <TextureLayer />
    </motion.div>
  )
}
