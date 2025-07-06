"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import SkillCard from "./SkillCard"


// Define the skill data structure
interface Skill {
  id: number
  name: string
  description: string
  imageSrc: string
}

export default function SkillCardsLayout() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('left')
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const x = useMotionValue(0)
  
  // Check if user is on mobile/touch device - only run once on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Mock data for skills - memoized to prevent unnecessary re-renders
  const skills = useMemo<Skill[]>(() => [
    {
      id: 1,
      name: "React",
      description: "JavaScript library for building user interfaces with component‑based architecture.",
      imageSrc: "/logos/react.svg"
    },
    {
      id: 2,
      name: "NextJS",
      description: "React framework for server‑side rendering, static sites, and API routes.",
      imageSrc: "/logos/nextjs.svg"
    },
    {
      id: 3,
      name: "NodeJS",
      description: "JavaScript runtime built on Chrome's V8 engine for server‑side code.",
      imageSrc: "/logos/nodejs.svg"
    },
    {
      id: 4,
      name: "ExpressJS",
      description: "Fast, unopinionated, minimalist web framework for Node.js.",
      imageSrc: "/logos/expressjs.svg"
    },
    {
      id: 5,
      name: "MongoDB",
      description: "Document‑oriented NoSQL database for high‑volume data storage.",
      imageSrc: "/logos/mongodb.svg"
    },
    {
      id: 6,
      name: "Tailwind CSS",
      description: "Utility‑first CSS framework for rapid UI development.",
      imageSrc: "/logos/tailwind.svg"
    },
    {
      id: 7,
      name: "TypeScript",
      description: "A strongly typed programming language built on JavaScript.",
      imageSrc: "/logos/typescript.svg"
    },
    {
      id: 8,
      name: "Git",
      description: "A distributed version control system for tracking changes in source code.",
      imageSrc: "/logos/git.svg"
    },
    {
      id: 9,
      name: "GitHub",
      description: "A developer platform for storing, managing, and sharing code.",
      imageSrc: "/logos/github.svg"
    },
    {
      id: 10,
      name: "Prisma",
      description: "A modern database toolkit for Node.js and TypeScript.",
      imageSrc: "/logos/prisma.svg"
    },
    {
      id: 11,
      name: "Redux",
      description: "A predictable state container for JavaScript applications.",
      imageSrc: "/logos/redux.svg"
    },
    {
      id: 12,
      name: "Framer Motion",
      description: "A production-ready motion library for React.",
      imageSrc: "/logos/framermotion.svg"
    },
    {
      id: 13,
      name: "Figma",
      description: "A web-based UI/UX design tool for collaborative design.",
      imageSrc: "/logos/figma.svg"
    },
    {
      id: 14,
      name: "Vercel",
      description: "A cloud platform for web development and deployment.",
      imageSrc: "/logos/vercel.svg"
    },
    {
      id: 15,
      name: "ShadCN",
      description: "Unstyled, accessible UI components built with Radix and Tailwind CSS.",
      imageSrc: "/logos/shadcn.svg"
    },
    {
      id: 16,
      name: "Bootstrap",
      description: "A front-end framework for developing responsive and mobile-first websites.",
      imageSrc: "/logos/bootstrap.svg"
      
    },
    {
      id: 17,
      name: "Material UI",
      description: "A popular React UI framework with a set of pre-designed components.",
      imageSrc: "/logos/material.svg"
    },

    {
      id: 18,
      name: "VS Code",
      description: "A powerful code editor developed by Microsoft.",
      imageSrc: "/logos/vscode.svg"
    },
    



  ], [])

  // Memoize duplicated skills to prevent unnecessary array recreation
  const duplicatedSkills = useMemo(() => [...skills, ...skills, ...skills], [skills])

  // Calculate the width of a single set of skills - memoized to prevent recalculation
  const singleSetWidth = useMemo(() => skills.length * 140, [skills])

  useEffect(() => {
    // Trigger the appearance animation after component mount
    setIsVisible(true)
    
    if (isVisible) {
      startAnimation()
    }
    
    // Cleanup animation on unmount
    return () => {
      controls.stop()
    }
  }, [isVisible])

  // Effect to handle pausing/resuming the animation - with proper dependencies
  useEffect(() => {
    if (isPaused) {
      // Pause the animation
      controls.stop()
    } else {
      // Resume the animation from current position
      startAnimation()
    }
  }, [isPaused, scrollDirection]) // Added scrollDirection as dependency

  const startAnimation = () => {
    // Get current x position
    const currentX = x.get()
    
    // Calculate the target position based on direction
    const targetX = scrollDirection === 'left' 
      ? -singleSetWidth * 3  // Move left (negative)
      : 0                    // Move right (back to start)
    
    // Calculate remaining distance
    const remainingDistance = Math.abs(targetX - currentX)
    
    // Calculate remaining time proportionally (full animation is 60 seconds)
    const fullDistance = singleSetWidth * 3
    const remainingTimeRatio = remainingDistance / fullDistance
    const remainingTime = 100 * remainingTimeRatio
    
    // Use requestAnimationFrame for smoother animation performance
    controls.start({
      x: targetX,
      transition: {
        duration: remainingTime,
        ease: "linear",
        onComplete: () => {
          // Toggle direction when animation completes and immediately start new animation
          setScrollDirection(prev => prev === 'left' ? 'right' : 'left')
          
          // Reset position if needed
          if (scrollDirection === 'left') {
            x.set(-singleSetWidth * 3)
          } else {
            x.set(0)
          }
          
          // Key fix: Immediately start the next animation without waiting for interaction
          // We use setTimeout with 0ms to ensure this runs after state updates
          setTimeout(() => {
            if (!isPaused) {
              startAnimation()
            }
          }, 0)
        }
      }
    })
  }

  const handleCardInteraction = (interacting: boolean) => {
    setIsPaused(interacting)
  }

  const handleSkillClick = (skill: Skill) => {
    // Here you could navigate to a skill details page or open a modal
    console.log(`Selected skill: ${skill.name}`)
  }

  return (
    <section className="relative py-6 md:py-12 bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden  w-full">
      {/* Optimized background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute -top-10 left-10 w-60 h-60 rounded-full bg-gradient-to-br from-blue-700 to-indigo-800 blur-xl" />
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-700 to-pink-600 blur-xl" />
          <div className="absolute bottom-40 left-60 w-60 h-60 rounded-full bg-gradient-to-r from-cyan-700 to-teal-600 blur-xl" />
        </div>
      </div>

      <div className="w-full max-w-full px-4 pt-2 md:pt-0 relative z-10">
        {/* Section header with animation */}
        <motion.div 
          className="text-center mb-4 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : -20 
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-300 hover:via-purple-400 hover:to-pink-400 transition-all duration-300">
              My Skills & Expertise
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto hover:text-gray-100 transition-colors duration-300">
            I specialize in these key areas to deliver exceptional digital experiences
            that bring value to your business and delight your users.
          </p>
        </motion.div>
        
        {/* Status indicator - top center */}
        <div className="relative flex justify-center mb-2">
          {/* Simplified status indicator for better performance */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="backdrop-blur-md bg-white/10 px-4 py-1 rounded-full border border-white/20 shadow-lg flex items-center space-x-2"
          >
            <div className={`w-3 h-3 rounded-full ${isPaused ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm font-medium ${isPaused ? 'text-green-400' : 'text-red-400'}`}>
              {isPaused ? "Paused" : "Playing"}
            </span>
          </motion.div>
        </div>
        
        {/* Carousel container - full width */}
        <div className="relative overflow-hidden w-full">
          <div 
            ref={containerRef}
            className="w-full overflow-hidden py-4 md:py-6"
            // Touch event listeners for mobile devices
            onTouchStart={() => handleCardInteraction(true)}
            onTouchEnd={() => handleCardInteraction(false)}
          >
            {/* Infinitely scrolling skill cards */}
            <motion.div
              className="flex space-x-4 md:space-x-8"
              initial={{ x: 0 }}
              animate={controls}
              style={{ x }}
            >
              {duplicatedSkills.map((skill, index) => (
                <div 
                  key={`${skill.id}-${index}`} 
                  className="flex-shrink-0 transition-transform duration-300"
                  onMouseEnter={() => !isTouchDevice && handleCardInteraction(true)}
                  onMouseLeave={() => !isTouchDevice && handleCardInteraction(false)}
                  onTouchStart={() => isTouchDevice && handleCardInteraction(true)}
                  onTouchEnd={() => isTouchDevice && handleCardInteraction(false)}
                >
                  <SkillCard
                    imageSrc={skill.imageSrc}
                    name={skill.name}
                    description={skill.description}
                    onClick={() => handleSkillClick(skill)}
                  />
                  
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient overlays with enhanced colors */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
        </div>
        
        {/* Pause hint - bottom center - updated for proper touch device text */}
        <div className="relative flex justify-center mt-3 md:mt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="backdrop-blur-md bg-white/10 px-5 py-2 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <span className="text-sm text-white font-medium">
              {isTouchDevice ? "Hold to pause" : "Hover to pause"}
            </span>
          </motion.div>
        </div>
      </div>
      
    </section>
  )
}