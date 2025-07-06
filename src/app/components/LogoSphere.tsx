"use client"

import { useEffect, useRef } from "react"
import TagCloud from "TagCloud"

const logos = [
  "bootstrap",
  "css",
  "material",
  "express",
  "shadecn",
  "git",
  "github",
  "html",
  "javascript",
  "mongodb",
  "prisma",
  "nextjs",
  "nodejs",
  "react",
  "redux",
  "sass",
  "tailwind",
  "vercel",
].map(
  (name) =>
    `<div class="tech-item" title="${name}">
      <img src="/logos/${name}.svg" alt="${name}" />
      <span class="tooltip">${name}</span>
    </div>`,
)

export default function LogoSphere() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) {
      console.error("containerRef is null")
      return
    }

    console.log("Initializing TagCloud with logos:", logos)

    try {
      const tagCloud = TagCloud([containerRef.current], logos, {
        radius: window.innerWidth < 768 ? 120 : 180,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
        useHTML: true,
      })

      return () => tagCloud.destroy()
    } catch (error) {
      console.error("Error initializing TagCloud:", error)
    }
  }, [])

  return <div className="logo-sphere-container" ref={containerRef} />
}