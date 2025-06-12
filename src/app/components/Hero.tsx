"use client"

import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import LogoSphere from "./LogoSphere"
import "./Hero.css"


export default function Hero() {
  
  const { t } = useTranslation()
  


  const [isGithubHovered, setIsGithubHovered] = useState(false)
  const [isResumeHovered, setIsResumeHovered] = useState(false)
  const [isGithubClicked, setIsGithubClicked] = useState(false)
  const [isResumeClicked, setIsResumeClicked] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isTextChanging, setIsTextChanging] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  

  const rotatingTexts = useMemo(
  () =>
    t("rotatingTexts", { returnObjects: true }) as string[],
  [t]
)

  // Optimized loading animation effect
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval)
          setTimeout(() => setIsLoaded(true), 300)
          return 100
        }
        return prev + 3
      })
    }, 40)
    return () => clearInterval(loadingInterval)
  }, [])

  // Optimized rotating text effect
  useEffect(() => {
    if (!isLoaded) return
    const interval = setInterval(() => {
      setIsTextChanging(true)
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
        setIsTextChanging(false)
      }, 400)
    }, 3500)
    return () => clearInterval(interval)
  }, [rotatingTexts.length, isLoaded])

  // Optimized button handlers
  const handleGithubInteraction = useCallback((type: "hover" | "leave" | "down" | "up") => {
    switch (type) {
      case "hover":
        setIsGithubHovered(true)
        break
      case "leave":
        setIsGithubHovered(false)
        setIsGithubClicked(false)
        break
      case "down":
        setIsGithubClicked(true)
        break
      case "up":
        setIsGithubClicked(false)
        break
    }
  }, [])

  const handleResumeInteraction = useCallback((type: "hover" | "leave" | "down" | "up") => {
    switch (type) {
      case "hover":
        setIsResumeHovered(true)
        break
      case "leave":
        setIsResumeHovered(false)
        setIsResumeClicked(false)
        break
      case "down":
        setIsResumeClicked(true)
        break
      case "up":
        setIsResumeClicked(false)
        break
    }
  }, [])

  if (!isLoaded) {
    return (
      <div className="loadingContainer">
        <div className="loadingContent text-center relative">
          <div className="relative w-[120px] h-[120px] mx-auto mb-8">
            <div
              className="absolute border-[3px] border-transparent rounded-full animate-spin w-[120px] h-[120px]"
              style={{
                borderTopColor: "#ec4899",
                animationDuration: "2s",
              }}
            />
            <div
              className="absolute border-[3px] border-transparent rounded-full animate-spin w-[90px] h-[90px] top-[15px] left-[15px]"
              style={{
                borderTopColor: "#8b5cf6",
                animationDuration: "1.5s",
                animationDirection: "reverse",
              }}
            />
            <div
              className="absolute border-[3px] border-transparent rounded-full animate-spin w-[60px] h-[60px] top-[30px] left-[30px]"
              style={{
                borderTopColor: "#3b82f6",
                animationDuration: "1s",
              }}
            />
          </div>
          <div className="loadingText">
            <span className="block text-2xl font-semibold mb-6 bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent animate-pulse">
              Welcome to My Portfolio!
            </span>
            <div className="progressBar w-[220px] h-1 rounded-full mx-auto mb-4 overflow-hidden">
              <div
                className="progressFill h-full rounded-full transition-all duration-300 relative"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 animate-shimmer" />
              </div>
            </div>
            <span className="progressText text-sm font-medium">{loadingProgress}%</span>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-floatUp"
                style={{
                  top: `${60 + (i % 4) * 10}%`,
                  left: `${10 + i * 8}%`,
                  background: "linear-gradient(45deg, #a855f7, #ec4899, #10b981)",
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="heroContainer min-h-screen relative overflow-hidden font-inter w-screen m-0 p-0">
      {/* Enhanced Background Effects */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full transform -skew-x-12 z-[1] animate-backgroundShine"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.04), rgba(236, 72, 153, 0.06), rgba(59, 130, 246, 0.04), transparent)",
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[1]">
        <div
          className="absolute -top-1/2 -left-1/2 w-[150%] h-[150%] rounded-full animate-wave"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.02) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute -top-[30%] -right-1/2 w-[150%] h-[150%] rounded-full animate-wave"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.02) 0%, transparent 70%)",
            animationDelay: "10s",
          }}
        />
        <div
          className="absolute -bottom-1/2 -left-[30%] w-[150%] h-[150%] rounded-full animate-wave"
          style={{
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.02) 0%, transparent 70%)",
            animationDelay: "20s",
          }}
        />
      </div>

      {/* Optimized Floating Particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[2]">
        {[
          { top: "10%", left: "10%", size: "3px", gradient: "linear-gradient(45deg, #a855f7, #ec4899)", delay: "0s" },
          { top: "20%", right: "15%", size: "4px", gradient: "linear-gradient(45deg, #3b82f6, #a855f7)", delay: "4s" },
          {
            bottom: "30%",
            left: "20%",
            size: "2px",
            gradient: "linear-gradient(45deg, #ec4899, #f59e0b)",
            delay: "8s",
          },
          { top: "60%", right: "25%", size: "3px", gradient: "linear-gradient(45deg, #8b5cf6, #10b981)", delay: "2s" },
          {
            bottom: "15%",
            right: "10%",
            size: "2px",
            gradient: "linear-gradient(45deg, #3b82f6, #ec4899)",
            delay: "6s",
          },
          { top: "40%", left: "5%", size: "2px", gradient: "linear-gradient(45deg, #10b981, #3b82f6)", delay: "10s" },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-40 animate-float"
            style={{
              ...particle,
              width: particle.size,
              height: particle.size,
              background: particle.gradient,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Optimized Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]">
        <div
          className="absolute top-[10%] left-[80%] w-[50px] h-[50px] rounded-full animate-rotate"
          style={{
            border: "1px solid rgba(168, 85, 247, 0.15)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[10%] w-[30px] h-[30px] transform rotate-45 animate-rotate"
          style={{
            border: "1px solid rgba(236, 72, 153, 0.15)",
            animationDelay: "25s",
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex flex-col-reverse md:flex-row justify-between items-center p-6 md:p-12 lg:p-20 relative z-10 min-h-screen w-full m-0 gap-8 md:gap-12 max-w-[1400px] mx-auto">
        {/* Left Side - Enhanced Text Content */}
        <div className="z-10 flex flex-col justify-center w-full max-w-[650px] animate-slideInLeft">
          <div className="glassCard transition-all duration-400 relative overflow-hidden hover:transform hover:-translate-y-2 group">
            <div className="cardGlow" />

            <h1 className="nameGradient text-5xl md:text-7xl leading-tight font-extrabold mb-6">
              {t("heroTitle").split("\n").map((line, idx) => (
              <span key={idx}>
              {line}
              <br />
              </span>
              ))}
            </h1>

            <div
              className="perspective-1000 animate-fadeInUp"
              style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="rotatingTextContainer group/text">
                <div className="textGlow" />
                <span
                  className={`rotatingText ${isTextChanging ? "opacity-0 transform translate-y-[-8px] rotate-x-[-90deg] tracking-[2px]" : "opacity-100 transform translate-y-0 rotate-x-0 tracking-normal"}`}
                >
                  {rotatingTexts[currentTextIndex]}
                </span>
              </div>
            </div>

            <p
  className="subtitleText text-lg leading-7 mb-8 font-normal animate-fadeInUp"
  style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
>
  {t("heroSubtitle")}
</p>

            <div
              className="flex gap-6 flex-wrap animate-fadeInUp"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              

<Link
  href="https://github.com/Ahnaf-Shahriar-369"
  className={`githubButton buttonEffect group/github ${isGithubClicked ? "buttonClicked" : ""}`}
  onMouseEnter={() => handleGithubInteraction("hover")}
  onMouseLeave={() => handleGithubInteraction("leave")}
  onMouseDown={() => handleGithubInteraction("down")}
  onMouseUp={() => handleGithubInteraction("up")}
  onTouchStart={() => handleGithubInteraction("down")}
  onTouchEnd={() => handleGithubInteraction("up")}
>
  <div className="buttonGlow" />
  <AnimatePresence mode="wait" initial={false}>
    <motion.span
      key={t("githubButton")}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="inline-block"
    >
      {t("githubButton")}
    </motion.span>
  </AnimatePresence>
  <ArrowRight
    size={18}
    className={`transition-all duration-300 ${isGithubHovered ? "transform translate-x-1.5" : ""}`}
  />
</Link>

<Link
  href="https://drive.proton.me/urls/HBH57DYT3W#pt5IXOFVa9a3"
  className={`resumeButton buttonEffect group/resume ${isResumeClicked ? "buttonClicked" : ""}`}
  onMouseEnter={() => handleResumeInteraction("hover")}
  onMouseLeave={() => handleResumeInteraction("leave")}
  onMouseDown={() => handleResumeInteraction("down")}
  onMouseUp={() => handleResumeInteraction("up")}
  onTouchStart={() => handleResumeInteraction("down")}
  onTouchEnd={() => handleResumeInteraction("up")}
>
  <div className="buttonGlow" />
  <AnimatePresence mode="wait" initial={false}>
    <motion.span
      key={t("resumeButton")}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="inline-block"
    >
      {t("resumeButton")}
    </motion.span>
  </AnimatePresence>
  <Download
    size={18}
    className={`transition-all duration-300 ${isResumeHovered ? "transform translate-y-1" : ""}`}
  />
</Link>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Tech Sphere */}
        <div className="relative h-[500px] md:h-[550px] w-full max-w-[550px] flex items-center justify-center transform-gpu animate-slideInRight">
          <div className="sphereGlassContainer animate-spherePulse">
            <div
              className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%] rounded-full animate-innerGlow"
              style={{ background: "radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)" }}
            />
            <div
              className="absolute -top-[25px] -left-[25px] -right-[25px] -bottom-[25px] rounded-full animate-outerRing"
              style={{ border: "1px solid rgba(147, 51, 234, 0.08)" }}
            />
            <div
              className="absolute -top-[12px] -left-[12px] -right-[12px] -bottom-[12px] rounded-full animate-middleRing"
              style={{ border: "1px solid rgba(236, 72, 153, 0.1)" }}
            />
            <LogoSphere />
            <div
              className="absolute -top-[20px] -left-[20px] -right-[20px] -bottom-[20px] rounded-full animate-ripple"
              style={{
                border: "1px solid rgba(147, 51, 234, 0.15)",
                animationDelay: "0s",
              }}
            />
            <div
              className="absolute -top-[30px] -left-[30px] -right-[30px] -bottom-[30px] rounded-full animate-ripple"
              style={{
                border: "1px solid rgba(236, 72, 153, 0.1)",
                animationDelay: "3s",
              }}
            />
          </div>

          {/* Enhanced Shine Effects */}
          <div
            className="absolute bottom-0 left-0 w-full h-[40%] z-[2] rounded-b-[50%] animate-techSphereShineBottom"
            style={{ background: "linear-gradient(0deg, rgba(168, 85, 247, 0.1) 0%, transparent 100%)" }}
          />
        </div>
      </main>

      {/* Enhanced Interactive Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[5]">
        {[
          { icon: "⚡", top: "15%", left: "85%", delay: "0s" },
          { icon: "🚀", bottom: "25%", left: "5%", delay: "2.5s" },
          { icon: "💎", top: "75%", right: "15%", delay: "5s" },
          { icon: "✨", top: "45%", left: "15%", delay: "7.5s" },
        ].map((item, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-50 animate-floatIcon"
            style={{
              ...item,
              filter: "drop-shadow(0 0 12px rgba(147, 51, 234, 0.3))",
              animationDelay: item.delay,
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Optimized Global Pattern Overlay */}
      <div
        className="absolute top-0 left-0 w-[200%] h-[200%] z-0 animate-moveLines"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 400px, rgba(147, 51, 234, 0.008) 400px, rgba(147, 51, 234, 0.008) 402px)",
        }}
      />
    </div>
  )
}
