"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import Image from "next/image"

export default function ProjectCard() {
  // State for button hover effects
  const [isGithubHovered, setIsGithubHovered] = useState(false)
  const [isLiveHovered, setIsLiveHovered] = useState(false)

  // This array will store your technologies - you can expand this as needed
  const technologies = [
    { id: 1, name: "Express.js" },
    { id: 2, name: "Next.js" },
    { id: 3, name: "TypeScript" },
    { id: 4, name: "Tailwind" },
    { id: 5, name: "Node.js" },
  ]

  // ========================================
  // ADD YOUR PROJECT URLS HERE
  // Replace these placeholder values with your actual URLs
  // ========================================
  const githubUrl = "https://github.com"
  const liveUrl = "#"

  // Function to handle button clicks
  const handleButtonClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <TooltipProvider>
      <div className="w-full max-w-xs mx-auto">
        <Card className="group relative overflow-hidden border-0 bg-[#1a1a2e]/80 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer project-card">
          {/* Static Glassmorphism border */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-violet-500/15 to-purple-500/20 p-[1px]">
            <div className="h-full w-full rounded-lg bg-[#1a1a2e]/95 backdrop-blur-xl" />
          </div>

          {/* Static background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-violet-500/4 to-purple-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Static purple dots */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg shadow-purple-400/40 z-40">
            <div className="absolute inset-0.5 bg-white/20 rounded-full" />
          </div>

          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full shadow-lg shadow-violet-400/40 z-40">
            <div className="absolute inset-0.5 bg-white/20 rounded-full" />
          </div>

          {/* Static decorative elements */}
          <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-purple-500/50 rounded-full z-10" />
          <div className="absolute bottom-8 right-6 w-1 h-1 bg-violet-500/50 rounded-full z-10" />
          <div className="absolute top-16 right-8 w-0.5 h-0.5 bg-fuchsia-500/50 rounded-full z-10" />
          <div className="absolute top-12 left-12 w-1 h-1 bg-indigo-500/40 rounded-full z-10" />
          <div className="absolute bottom-16 left-8 w-0.5 h-0.5 bg-pink-500/40 rounded-full z-10" />

          {/* Static geometric shapes */}
          <div className="absolute top-8 right-4 w-2 h-2 border border-purple-500/30 rotate-45 z-10" />
          <div className="absolute bottom-12 left-4 w-1.5 h-1.5 border border-violet-500/30 z-10" />
          <div className="absolute top-24 left-16 w-1 h-1 border border-fuchsia-500/25 rounded-full z-10" />

          {/* Static light rays */}
          <div className="absolute top-0 left-1/4 w-px h-8 bg-gradient-to-b from-purple-400/20 to-transparent z-10" />
          <div className="absolute bottom-0 right-1/3 w-px h-6 bg-gradient-to-t from-violet-400/20 to-transparent z-10" />
          <div className="absolute top-0 right-1/4 w-px h-5 bg-gradient-to-b from-fuchsia-400/15 to-transparent z-10" />

          <CardContent className="relative p-3 space-y-2 z-20">
            {/* Image Container with buttons */}
            <div className="relative h-44 rounded-lg bg-gradient-to-br from-gray-900 via-purple-950/40 to-gray-900 border border-purple-800/40 overflow-hidden group-hover:border-purple-700/50 transition-all duration-300 shadow-inner">
              {/* ========================================
                  🖼️ MAIN PROJECT IMAGE GOES HERE
                  Replace this comment with your project image:
                  
                  <Image
                    src="/your-project-image.png"
                    alt="Project Preview"
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  Example:
                  <Image
                    src="/coinecho-dashboard.png"
                    alt="CoinEcho Dashboard Preview"
                    fill
                    className="object-cover"
                    priority
                  />
              ======================================== */}

              {/* GitHub Button */}
              <div className="absolute top-3 left-3 z-30">
                <div
                  className="relative"
                  onMouseEnter={() => setIsGithubHovered(true)}
                  onMouseLeave={() => setIsGithubHovered(false)}
                >
                  <div
                    className="w-8 h-8 rounded-full bg-gray-900/85 backdrop-blur-sm border border-purple-700/50 flex items-center justify-center hover:scale-110 hover:border-purple-600/70 transition-all duration-200 shadow-lg shadow-black/60 cursor-pointer"
                    onClick={() => handleButtonClick(githubUrl)}
                  >



                  <Image 
                          src="/github-mark-white.png" 
                          alt="GitHub"
                          width={32}
                          height={32}
                          className="object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-200"
                        />


                    {/* ========================================
                        🐙 GITHUB ICON/IMAGE GOES HERE
                        Replace this comment with your GitHub icon:
                        
                        
                        
                        OR use an SVG icon:
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    ======================================== */}

                    {/* Placeholder - REMOVE when adding real image/icon */}
                    <div className="w-4 h-4 bg-white/90 rounded-full group-hover:bg-purple-300 transition-colors duration-200" />

                    <div className="absolute inset-0 rounded-full bg-purple-600/0 hover:bg-purple-600/15 transition-all duration-200" />
                  </div>

                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-gray-900/95 backdrop-blur-sm border border-purple-700/50 rounded text-xs text-white whitespace-nowrap transition-all duration-200 shadow-lg shadow-black/30 ${
                      isGithubHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                  >
                    GitHub
                  </div>
                </div>
              </div>

              {/* Live Demo Button */}
              <div className="absolute top-3 right-3 z-30">
                <div
                  className="relative"
                  onMouseEnter={() => setIsLiveHovered(true)}
                  onMouseLeave={() => setIsLiveHovered(false)}
                >
                  <div
                    className="w-8 h-8 rounded-full bg-gray-900/85 backdrop-blur-sm border border-purple-700/50 flex items-center justify-center hover:scale-110 hover:border-purple-600/70 transition-all duration-200 shadow-lg shadow-black/60 cursor-pointer"
                    onClick={() => handleButtonClick(liveUrl)}
                  >
                    {/* ========================================
                        🔴 LIVE STATUS INDICATOR - RED DOT
                        This is already implemented as a red dot.
                        You can replace it with a custom icon if needed:
                        
                        <Image 
                          src="/live-icon.png" 
                          alt="Live Demo"
                          width={12}
                          height={12}
                          className="object-contain"
                        />
                        
                        OR keep the red dot as is (recommended)
                    ======================================== */}

                    {/* Static Red Dot - Live Indicator */}
                    <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg shadow-red-400/40">
                      <div className="absolute inset-0.5 bg-white/20 rounded-full" />
                    </div>

                    <div className="absolute inset-0 rounded-full bg-purple-600/0 hover:bg-purple-600/15 transition-all duration-200" />
                  </div>

                  <div
                    className={`absolute top-full right-1/2 translate-x-1/2 mt-1 px-2 py-1 bg-gray-900/95 backdrop-blur-sm border border-purple-700/50 rounded text-xs text-white whitespace-nowrap transition-all duration-200 shadow-lg shadow-black/30 ${
                      isLiveHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                  >
                    Live Demo
                  </div>
                </div>
              </div>

              {/* Static background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-violet-900/5 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Static grid pattern */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-r border-b border-purple-700/20 group-hover:border-purple-600/25 transition-colors duration-300"
                    />
                  ))}
                </div>
              </div>

              {/* Static corner glows */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-700/15 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-700/15 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Static geometric shapes inside container */}
              <div className="absolute top-4 left-4 w-2 h-2 border border-purple-500/40 rotate-45" />
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-violet-500/30 rounded-full" />
              <div className="absolute top-1/2 right-6 w-3 h-0.5 bg-gradient-to-r from-purple-500/40 to-transparent" />
              <div className="absolute bottom-8 left-6 w-1 h-1 border border-fuchsia-500/30 rounded-full" />
            </div>

            {/* Technologies Section */}
            <div className="flex items-center justify-center">
              <div className="flex -space-x-3">
                {technologies.map((tech, i) => (
                  <Tooltip key={tech.id}>
                    <TooltipTrigger asChild>
                      <div
                        className="relative w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 via-purple-950/50 to-gray-900 border border-purple-700/40 flex items-center justify-center hover:scale-110 hover:border-purple-600/60 hover:z-10 transition-all duration-200 cursor-pointer backdrop-blur-sm shadow-lg shadow-black/30"
                        style={{ zIndex: 5 - i }}
                      >
                        {/* ========================================
                            🛠️ TECHNOLOGY ICONS GO HERE
                            Replace this comment with your technology icons based on tech.name:
                            
                            {tech.name === "React" && (
                              <Image 
                                src="/react-icon.png" 
                                alt="React"
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            )}
                            
                            {tech.name === "Next.js" && (
                              <Image 
                                src="/nextjs-icon.png" 
                                alt="Next.js"
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            )}
                            
                            {tech.name === "TypeScript" && (
                              <Image 
                                src="/typescript-icon.png" 
                                alt="TypeScript"
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            )}
                            
                            {tech.name === "Tailwind" && (
                              <Image 
                                src="/tailwind-icon.png" 
                                alt="Tailwind CSS"
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            )}
                            
                            {tech.name === "Node.js" && (
                              <Image 
                                src="/nodejs-icon.png" 
                                alt="Node.js"
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            )}
                            
                            {tech.name === "Express.js" && (
                              <Image 
                                src="/express-icon.png" 
                                alt="Express.js"
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            )}
                            
                            OR use SVG icons from libraries like react-icons:
                            import { FaReact, FaNodeJs } from 'react-icons/fa'
                            import { SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress } from 'react-icons/si'
                            
                            {tech.name === "React" && <FaReact className="w-4 h-4 text-blue-400" />}
                            {tech.name === "Next.js" && <SiNextdotjs className="w-4 h-4 text-white" />}
                            {tech.name === "TypeScript" && <SiTypescript className="w-4 h-4 text-blue-600" />}
                            {tech.name === "Tailwind" && <SiTailwindcss className="w-4 h-4 text-cyan-400" />}
                            {tech.name === "Node.js" && <FaNodeJs className="w-4 h-4 text-green-500" />}
                            {tech.name === "Express.js" && <SiExpress className="w-4 h-4 text-gray-400" />}
                        ======================================== */}

                        {/* Placeholder dot - REMOVE when adding real icons */}
                        <div className="w-2 h-2 bg-purple-500/70 rounded-full group-hover:bg-purple-400 transition-colors duration-200" />

                        <div className="absolute inset-0 rounded-full bg-purple-700/0 hover:bg-purple-700/20 transition-colors duration-200" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-gray-900/95 border-purple-700/40 text-white text-xs shadow-lg"
                    >
                      {tech.name}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              {technologies.length > 5 && (
                <div className="ml-1 w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 via-purple-950/50 to-gray-900 border border-purple-700/40 flex items-center justify-center hover:scale-110 hover:border-purple-600/60 transition-all duration-200 cursor-pointer shadow-lg shadow-black/30">
                  <span className="text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200">
                    +{technologies.length - 5}
                  </span>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-200 hover:scale-105 transform cursor-pointer">
              Coming Soon
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-200">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam culpa minus nihil totam sit tempora cupiditate quos aut, eveniet ducimus quae deserunt natus, labore molestias vitae eos eius iste official!
              </p>
            </div>

            {/* Static glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-900/0 to-purple-900/0 group-hover:from-purple-900/5 group-hover:to-purple-900/5 transition-all duration-300 pointer-events-none" />
          </CardContent>

          {/* Static corner effects */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-700/8 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-700/8 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Static border effects */}
          <div className="absolute inset-0 rounded-lg border border-purple-800/0 group-hover:border-purple-700/20 transition-all duration-300" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Card>
      </div>
    </TooltipProvider>
  )
}