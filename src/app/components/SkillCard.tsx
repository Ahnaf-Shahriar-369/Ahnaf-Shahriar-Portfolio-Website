"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import "./SkillCard.css"

interface SkillCardProps {
  imageSrc: string
  name: string
  description: string
  imageAlt?: string
  onClick?: () => void
}

export default function SkillCard({ imageSrc, name, description, imageAlt = "Skill icon", onClick }: SkillCardProps) {
  const [isActive, setIsActive] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Handle mouse events without delay
  const handleMouseEnter = () => {
    setIsActive(true)
  }

  const handleMouseLeave = () => {
    setIsActive(false)
  }

  // Handle touch events without delay
  const handleTouchStart = () => {
    setIsActive(true)
  }

  const handleTouchEnd = () => {
    setIsActive(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="skill-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.9,
        rotateY: isActive ? 5 : 0,
        rotateX: isActive ? -5 : 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        rotateX: { duration: 0.2 },
        rotateY: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* Glassmorphism background with gradient */}
      <div className={`skill-card-bg ${isActive ? "active" : ""}`} />

      {/* Animated border */}
      <div className={`skill-card-border ${isActive ? "active" : ""}`} />

      {/* Card content */}
      <div className="skill-card-content">
        <motion.div
          className={`skill-card-icon-container ${isActive ? "active" : ""}`}
          animate={{
            y: isActive ? -5 : 0,
            rotate: isActive ? 5 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          {/* Rotating gradient */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="skill-card-icon-gradient"
            />
          )}
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={60}
            height={60}
            className="object-contain relative z-10"
          />
        </motion.div>

        <h3 className={`skill-card-title ${isActive ? "active" : ""}`}>{name}</h3>

        <p className={`skill-card-description ${isActive ? "active" : ""}`}>{description}</p>
      </div>
    </motion.div>
  )
}
