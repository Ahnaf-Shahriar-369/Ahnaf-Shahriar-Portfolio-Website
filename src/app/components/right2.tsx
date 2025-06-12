"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"

interface RightSectionProps {
  className?: string
}

const RightSection = ({ className = "" }: RightSectionProps) => {
  const [isImageActive, setIsImageActive] = useState(false)
  const [isRightClicked, setIsRightClicked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Optimized mobile check
  const checkMobile = useCallback(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches)
  }, [])

  useEffect(() => {
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [checkMobile])

  // Start animation when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Reset click state after animation completes
  useEffect(() => {
    if (isRightClicked) {
      const timer = setTimeout(() => {
        setIsRightClicked(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isRightClicked])

  // Handle image click or hover
  const handleImageInteraction = useCallback(() => {
    if (isMobile) {
      setIsImageActive(!isImageActive)
    }
  }, [isMobile, isImageActive])

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      id="image-container-right"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "300px",
        height: "300px",
        margin: "0 auto",
      }}
      className={`${className} ${isRightClicked ? "click-effect" : ""} theme-transition`}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      onClick={() => setIsRightClicked(true)}
    >
      <motion.div
        className={`purple-border-container theme-transition ${isImageActive || (!isMobile && isImageActive) ? "active" : ""}`}
        variants={itemVariants}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          padding: "6px",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <motion.div
          className="image-container theme-transition"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            background: "#000",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={() => !isMobile && setIsImageActive(true)}
          onMouseLeave={() => !isMobile && setIsImageActive(false)}
          onClick={(e) => {
            e.stopPropagation()
            handleImageInteraction()
          }}
          whileHover={
            !isMobile
              ? {
                  rotate: 3,
                  scale: 1.01,
                }
              : {}
          }
          variants={itemVariants}
        >
          <Image
            src="/me-2-m.png"
            alt="Profile Picture"
            fill
            sizes="300px"
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              zIndex: 1,
              transform: isImageActive ? "scale(0.95)" : "scale(1)",
              filter: isImageActive ? "brightness(0.8) contrast(1.2)" : "brightness(1) contrast(1)",
            }}
            className="profile-image theme-transition"
            priority
          />
          <Image
            src="/me-2.png"
            alt="Profile Picture Hover"
            fill
            sizes="300px"
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              opacity: isImageActive ? 1 : 0,
              transition: "opacity 0.3s ease-in-out, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              zIndex: 2,
              transform: isImageActive ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(-5deg)",
              willChange: "opacity, transform",
            }}
            className="profile-image-hover theme-transition"
            priority
          />

          {/* Simplified particle effect */}
          {isImageActive && <div className="particles-container theme-transition"></div>}

          {/* Mobile indicator */}
          {isMobile && (
            <div className="tap-indicator theme-transition">
              <span>Tap to change</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default RightSection
