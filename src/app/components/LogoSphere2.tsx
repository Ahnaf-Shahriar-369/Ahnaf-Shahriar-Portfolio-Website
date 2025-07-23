"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import tagCanvas from "tag-canvas"

// All skill logos with display names
const skills = [
  { id: "bootstrap", name: "Bootstrap" },
  { id: "css", name: "CSS3" },
  { id: "material", name: "Material UI" },
  { id: "express", name: "Express.js" },
  { id: "shadecn", name: "Shadcn/UI" },
  { id: "git", name: "Git" },
  { id: "github", name: "GitHub" },
  { id: "html", name: "HTML5" },
  { id: "javascript", name: "JavaScript" },
  { id: "mongodb", name: "MongoDB" },
  { id: "prisma", name: "Prisma" },
  { id: "nextjs", name: "Next.js" },
  { id: "nodejs", name: "Node.js" },
  { id: "react", name: "React" },
  { id: "redux", name: "Redux" },
  { id: "sass", name: "Sass" },
  { id: "tailwind", name: "Tailwind CSS" },
  { id: "vercel", name: "Vercel" },
]

export default function LogoSphere2() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 })
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [touchedTech, setTouchedTech] = useState<string | null>(null)

  // Handle responsive sizing - made larger for mobile
  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 768
      const isSmallMobile = window.innerWidth < 480
      let size = 400 // desktop

      if (isSmallMobile) {
        size = 320 // increased from 200 to 320
      } else if (isMobile) {
        size = 380 // increased from 250 to 380
      }

      setDimensions({ width: size, height: size })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !listRef.current) return

    try {
      tagCanvas.Start("skillCanvas", "skillTags", {
        // Continuous auto-rotation
        animate: true,
        initial: [0.1, -0.1],
        // Enable mouse interaction
        noMouse: false,
        // Enable drag to rotate
        dragControl: true,
        // Make hovered logo come forward but don't navigate
        clickToFront: 300,
        // Rotation speed range
        minSpeed: 0.02,
        maxSpeed: 0.08,
        // Perspective depth
        depth: 0.6,
        // Image settings - adjust for mobile
        imageScale: window.innerWidth < 768 ? 1.0 : 1.2,
        imageMode: "both",
        // Smoother motion
        decel: 0.95,
        // No reversing axis
        reverse: false,
        // Disable text selection
        textColour: null,
        outlineColour: null,
      })
    } catch (e) {
      console.error("TagCanvas init failed", e)
    }

    return () => {
      try {
        tagCanvas.Delete("skillCanvas")
      } catch (e) {
  console.error("Error deleting canvas:", e)
}
    }
  }, [dimensions])

  const handleTechHover = (techId: string) => {
    const skill = skills.find((s) => s.id === techId)
    setHoveredTech(skill ? skill.name : null)
  }

  const handleTechLeave = () => {
    setHoveredTech(null)
  }

  const handleTouchStart = (techId: string) => {
    const skill = skills.find((s) => s.id === techId)
    setTouchedTech(skill ? skill.name : null)
  }

  const handleTouchEnd = () => {
    // Keep the tooltip for a moment on mobile
    setTimeout(() => {
      setTouchedTech(null)
    }, 1500)
  }

  return (
    <div className="flex justify-center w-full relative">
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        <canvas
          id="skillCanvas"
          width={dimensions.width}
          height={dimensions.height}
          ref={canvasRef}
          className="cursor-pointer relative z-10"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <div id="skillTags" ref={listRef} className="hidden">
          {skills.map((skill) => (
            <a
              key={skill.id}
              href="#"
              title={skill.name}
              onMouseEnter={() => handleTechHover(skill.id)}
              onMouseLeave={handleTechLeave}
              onTouchStart={() => handleTouchStart(skill.id)}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => e.preventDefault()}
              className="cursor-pointer"
            >
              <Image
                src={`/logos/${skill.id}.svg`}
                alt={skill.name}
                width={typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 48}
                height={typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 48}
                className="pointer-events-auto"
              />
            </a>
          ))}
        </div>

        {/* Tooltip for desktop hover */}
        {hoveredTech && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/20">
              {hoveredTech}
            </div>
          </div>
        )}

        {/* Tooltip for mobile touch */}
        {touchedTech && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div className="bg-black/90 text-white px-4 py-3 rounded-lg text-base font-medium backdrop-blur-sm border border-white/30 shadow-lg">
              {touchedTech}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
