"use client"

import { Card, CardContent } from "@/components/ui/card"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import "./ProjectCard.css"

interface Technology {
  id: number
  name: string
  icon?: string // icon is optional for flexibility
}

interface Project {
  id: number
  title: string
  description: string
  technologies: Technology[]
  githubUrl: string
  liveUrl: string
  imageUrl: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isGithubHovered, setIsGithubHovered] = useState(false)
  const [isLiveHovered, setIsLiveHovered] = useState(false)
  const [isCardHovered, setIsCardHovered] = useState(false)

  // Floating particles for the card
  const cardParticles = [
    { top: "10%", left: "10%", size: "2px", gradient: "linear-gradient(45deg, #a855f7, #ec4899)" },
    { top: "20%", right: "15%", size: "1.5px", gradient: "linear-gradient(45deg, #3b82f6, #a855f7)" },
    { bottom: "25%", left: "20%", size: "1px", gradient: "linear-gradient(45deg, #ec4899, #f59e0b)" },
    { top: "60%", right: "25%", size: "2px", gradient: "linear-gradient(45deg, #8b5cf6, #10b981)" },
    { bottom: "15%", right: "10%", size: "1.5px", gradient: "linear-gradient(45deg, #10b981, #3b82f6)" },
  ]

  // Function to handle button clicks
  const handleButtonClick = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    // <TooltipProvider>
      <motion.div className="w-full max-w-xs mx-auto" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
        <Card
          className={`projectCard theme-transition group relative overflow-hidden border-0 shadow-2xl cursor-pointer ${
            isCardHovered ? "projectCardHovered" : ""
          }`}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
        >
          {/* Card Glow Effect */}
          <div className="cardGlow theme-transition" />

          {/* Decorative Elements */}
          <div className="projectCardDecor1 theme-transition" />
          <div className="projectCardDecor2 theme-transition" />

          {/* Floating Particles */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]">
            {cardParticles.map((particle, i) => (
              <div
                key={i}
                className="cardParticle theme-transition absolute rounded-full"
                style={{
                  ...particle,
                  width: particle.size,
                  height: particle.size,
                  background: particle.gradient,
                }}
              />
            ))}
          </div>

          <CardContent className="relative p-3 space-y-2 z-20">
            {/* Image Container with buttons */}
            <div className="projectImageContainer theme-transition relative h-44 overflow-hidden shadow-inner">
              {/* Project Image */}
              <Image
                src={project.imageUrl || "/placeholder.svg"}
                alt={`${project.title} Preview`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />

              {/* GitHub Button */}
              {project.githubUrl && project.githubUrl !== "#" && (
                <div className="absolute top-3 left-3 z-30">
                  <motion.div
                    className="relative"
                    onMouseEnter={() => setIsGithubHovered(true)}
                    onMouseLeave={() => setIsGithubHovered(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="actionButton theme-transition w-8 h-8 flex items-center justify-center cursor-pointer"
                      onClick={() => handleButtonClick(project.githubUrl)}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <motion.div
                      className={`cardTooltip absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap transition-all duration-200 shadow-lg ${
                        isGithubHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: isGithubHovered ? 1 : 0, y: isGithubHovered ? 0 : -4 }}
                    >
                      GitHub
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* Live Demo Button */}
              {project.liveUrl && project.liveUrl !== "#" && (
                <div className="absolute top-3 right-3 z-30">
                  <motion.div
                    className="relative"
                    onMouseEnter={() => setIsLiveHovered(true)}
                    onMouseLeave={() => setIsLiveHovered(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="actionButton theme-transition w-8 h-8 flex items-center justify-center cursor-pointer"
                      onClick={() => handleButtonClick(project.liveUrl)}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <polygon points="10,8 16,12 10,16" fill="currentColor" />
                      </svg>
                    </div>
                    <motion.div
                      className={`cardTooltip absolute top-full right-1/2 translate-x-1/2 mt-1 whitespace-nowrap transition-all duration-200 shadow-lg ${
                        isLiveHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: isLiveHovered ? 1 : 0, y: isLiveHovered ? 0 : -4 }}
                    >
                      Live Demo
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 via-violet-900/0 to-purple-900/0 group-hover:from-purple-900/10 group-hover:via-violet-900/5 group-hover:to-purple-900/10 transition-all duration-300" />
            </div>

            {/* Technologies Section */}
           
<div className="flex items-center justify-center">
  <div className="flex -space-x-3">
    {project.technologies.slice(0, 6).map((tech, i) => (
      <div
        key={tech.id}
        className="techBadge theme-transition relative w-8 h-8 flex items-center justify-center cursor-default"
        style={{ zIndex: 6 - i }}
      >
        {tech.icon ? (
          <Image
            src={tech.icon}
            alt={tech.name}
            width={24}
            height={24}
            className="object-contain"
          />
        ) : (
          <span className="text-xs text-gray-400">{tech.name?.[0] || ""}</span>
        )}
      </div>
    ))}
  </div>
  {project.technologies.length > 6 && (
    <div
      className="techBadge theme-transition ml-1 w-8 h-8 flex items-center justify-center cursor-default shadow-lg"
    >
      <span className="text-xs font-medium">+{project.technologies.length - 6}</span>
    </div>
  )}
</div>

{project.technologies.length > 6 && (
  <div
    className="techBadge theme-transition ml-1 w-8 h-8 flex items-center justify-center cursor-default shadow-lg"
  >
    <span className="text-xs font-medium">+{project.technologies.length - 6}</span>
  </div>
)}

            {/* </div> */}

            {/* Content Section */}
            <div className="space-y-1">
              <motion.h3
                className="projectCardTitle text-lg font-bold transition-colors duration-200 hover:scale-105 transform cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {project.title}
              </motion.h3>
              <p className="projectCardDescription theme-transition text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Static glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-900/0 to-purple-900/0 group-hover:from-purple-900/5 group-hover:to-purple-900/5 transition-all duration-300 pointer-events-none" />
          </CardContent>

          {/* Static corner effects */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-700/0 to-transparent group-hover:from-purple-700/8 rounded-br-full transition-opacity duration-300" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-700/0 to-transparent group-hover:from-purple-700/8 rounded-tl-full transition-opacity duration-300" />

          {/* Static border effects */}
          <div className="absolute inset-0 rounded-lg border border-purple-800/0 group-hover:border-purple-700/20 transition-all duration-300" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-400/0 to-transparent group-hover:via-purple-400/20 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-violet-400/0 to-transparent group-hover:via-violet-400/20 transition-opacity duration-300" />
        </Card>
      </motion.div>
    // </TooltipProvider>
  )
}