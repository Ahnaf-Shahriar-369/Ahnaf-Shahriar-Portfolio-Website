"use client"
import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const NotFound = () => {
  // const [ setIsVisible] = useState(false)
  const [glitchEffect, setGlitchEffect] = useState(false)

  useEffect(() => {
    // setIsVisible(true)
    // Add periodic glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 200)
    }, 3000)
    return () => clearInterval(glitchInterval)
  }, [])

  // Floating particles for atmosphere
  const particles = useMemo(
    () => [
      { top: "10%", left: "10%", size: "4px", gradient: "linear-gradient(45deg, #a855f7, #ec4899)", delay: "0s" },
      { top: "20%", right: "15%", size: "3px", gradient: "linear-gradient(45deg, #3b82f6, #a855f7)", delay: "2s" },
      { bottom: "25%", left: "20%", size: "5px", gradient: "linear-gradient(45deg, #ec4899, #f59e0b)", delay: "4s" },
      { top: "60%", right: "25%", size: "3px", gradient: "linear-gradient(45deg, #8b5cf6, #10b981)", delay: "1s" },
      { bottom: "15%", right: "10%", size: "4px", gradient: "linear-gradient(45deg, #10b981, #3b82f6)", delay: "3s" },
      { top: "75%", left: "15%", size: "2px", gradient: "linear-gradient(45deg, #f59e0b, #ec4899)", delay: "5s" },
    ],
    [],
  )

  const floatingIcons = useMemo(
    () => [
      { icon: "❓", top: "15%", right: "8%", delay: "0s" },
      { icon: "🔍", bottom: "20%", left: "5%", delay: "2s" },
      { icon: "💫", top: "70%", right: "12%", delay: "4s" },
      { icon: "🌟", top: "25%", left: "8%", delay: "1s" },
    ],
    [],
  )

  return (
    <div className="min-h-screen relative overflow-hidden w-full bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      {/* Background Effects */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full transform -skew-x-12 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.06), rgba(236, 72, 153, 0.08), rgba(59, 130, 246, 0.06), transparent)",
          animation: "backgroundShine 15s infinite linear",
        }}
      />

      {/* Animated Wave Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[1]">
        <div
          className="absolute -top-1/2 -left-1/2 w-[150%] h-[150%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.03) 0%, transparent 70%)",
            animation: "wave 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-[150%] h-[150%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, transparent 70%)",
            animation: "wave 30s ease-in-out infinite reverse",
            animationDelay: "5s",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[2]">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-60"
            style={{
              ...particle,
              width: particle.size,
              height: particle.size,
              background: particle.gradient,
              animation: `floatParticle 8s ease-in-out infinite`,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]">
        <div
          className="absolute top-[20%] right-[15%] w-[60px] h-[60px] rounded-full"
          style={{
            border: "2px solid rgba(168, 85, 247, 0.2)",
            animation: "rotateGeometry 40s linear infinite",
          }}
        />
        <div
          className="absolute bottom-[25%] left-[10%] w-[40px] h-[40px]"
          style={{
            border: "1px solid rgba(236, 72, 153, 0.2)",
            transform: "rotate(45deg)",
            animation: "rotateGeometry 35s linear infinite reverse",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-12">
        {/* 404 Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            className={`text-8xl md:text-9xl font-bold mb-4 ${glitchEffect ? "animate-pulse" : ""}`}
            style={{
              background:
                "linear-gradient(135deg, #a855f7 0%, #ec4899 20%, #3b82f6 40%, #10b981 60%, #f59e0b 80%, #a855f7 100%)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: "gradientShift 8s ease infinite",
              filter: "drop-shadow(0 4px 12px rgba(168, 85, 247, 0.3))",
            }}
          >
            404
          </h1>
          <div
            className="w-32 h-1 mx-auto rounded-full"
            style={{
              background: "linear-gradient(90deg, #a855f7, #ec4899)",
            }}
          />
        </motion.div>

        {/* Human-shaped placeholder for anime girl gif */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Glowing background effects */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(45deg, #a855f7, #ec4899, #3b82f6)",
              filter: "blur(30px)",
              opacity: 0.4,
              animation: "spherePulse 12s ease-in-out infinite",
              transform: "scale(1.2)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(45deg, #ec4899, #a855f7, #10b981)",
              filter: "blur(40px)",
              opacity: 0.2,
              animation: "spherePulse 15s ease-in-out infinite reverse",
              transform: "scale(1.4)",
            }}
          />

          {/* Human-shaped container for anime gif */}
          <div
            className="relative w-64 h-80 md:w-80 md:h-96 mx-auto"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2), inset 0 0 40px rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Placeholder content */}
            <Image 
            src="/shishiro.gif" 
            alt="Anime girl" 
            fill
            className="object-cover"
            style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
/>

            {/* Decorative border glow */}
            <div
              className="absolute -inset-1 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(45deg, #a855f7, #ec4899, #3b82f6, #10b981)",
                filter: "blur(8px)",
                zIndex: -1,
              }}
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div
            className="max-w-2xl mx-auto p-8 rounded-3xl mb-8"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.1)",
            }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Oops! The page you&apos;re looking for seems to have wandered off into the digital void. Don&apost worry though,
              even our anime guide couldn&apos;t find it!
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="/">
            <Button
              className="px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                border: "none",
                boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)",
              }}
            >
              🏠 Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            className="px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(168, 85, 247, 0.3)",
              color: "#a855f7",
            }}
            onClick={() => window.history.back()}
          >
            ← Go Back
          </Button>
        </motion.div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[3]">
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-40"
            style={{
              ...item,
              filter: "drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))",
              animation: `floatIcon 12s ease-in-out infinite`,
              animationDelay: item.delay,
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Pattern Overlay */}
      <div
        className="absolute top-0 left-0 w-[200%] h-[200%] z-0 opacity-30"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 300px, rgba(168, 85, 247, 0.02) 300px, rgba(168, 85, 247, 0.02) 302px)",
          animation: "moveLines 60s linear infinite",
        }}
      />

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes spherePulse {
          0%, 100% { transform: scale(1.2); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }
        @keyframes backgroundShine {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(100%) skewX(-20deg); }
        }
        @keyframes wave {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.03; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 0.05; }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        @keyframes rotateGeometry {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-15px) scale(1.1); opacity: 0.6; }
        }
        @keyframes moveLines {
          0% { transform: translate(-100px, -100px); }
          100% { transform: translate(100px, 100px); }
        }
      `}</style>
    </div>
  )
}

export default NotFound
