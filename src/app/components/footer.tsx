"use client"

import { useState } from "react"
import { Mail, Linkedin, Github, FileText } from "lucide-react"
import Image from "next/image"

export default function FooterSection() {
  // Fixed star positions and timings for hydration-safe rendering
  const stars = [
    { top: "10%", left: "15%", duration: 2.5, delay: 0.2 },
    { top: "20%", left: "40%", duration: 3, delay: 0.5 },
    { top: "30%", left: "70%", duration: 2.2, delay: 1 },
    { top: "50%", left: "25%", duration: 2.8, delay: 0.7 },
    { top: "60%", left: "60%", duration: 3.1, delay: 1.2 },
    { top: "75%", left: "80%", duration: 2.6, delay: 0.4 },
    { top: "15%", left: "85%", duration: 2.9, delay: 0.9 },
    { top: "35%", left: "10%", duration: 2.3, delay: 1.1 },
    { top: "55%", left: "50%", duration: 3.2, delay: 0.6 },
    { top: "65%", left: "35%", duration: 2.7, delay: 1.3 },
    { top: "80%", left: "20%", duration: 2.4, delay: 0.8 },
    { top: "25%", left: "60%", duration: 3, delay: 1.4 },
    { top: "40%", left: "80%", duration: 2.5, delay: 0.3 },
    { top: "70%", left: "45%", duration: 2.8, delay: 1.1 },
    { top: "85%", left: "70%", duration: 3.1, delay: 0.5 },
    { top: "10%", left: "60%", duration: 2.6, delay: 1.2 },
    { top: "20%", left: "30%", duration: 2.9, delay: 0.7 },
    { top: "60%", left: "10%", duration: 2.3, delay: 1.3 },
    { top: "75%", left: "55%", duration: 3.2, delay: 0.6 },
    { top: "50%", left: "90%", duration: 2.7, delay: 1.4 },
  ]

  // Track which social button was clicked
  const [clicked, setClicked] = useState<string | null>(null)

  // Social button configs
  const socials = [
    {
      icon: Mail,
      label: "Email",
      color: "hover:bg-red-500",
      darkColor: "bg-red-800",
      glow: "shadow-[0_0_24px_6px_rgba(220,38,38,0.7)]",
      delay: 0,
      href: "mailto:ahnafshahriar.dev@protonmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:bg-blue-600",
      darkColor: "bg-blue-900",
      glow: "shadow-[0_0_24px_6px_rgba(30,64,175,0.7)]",
      delay: 100,
      href: "https://linkedin.com/in/yourprofile",
    },
    {
      icon: Github,
      label: "GitHub",
      color: "hover:bg-gray-700",
      darkColor: "bg-gray-900",
      glow: "shadow-[0_0_24px_6px_rgba(55,65,81,0.7)]",
      delay: 200,
      href: "https://github.com/Ahnaf-Shahriar-369",
    },
    {
      icon: FileText,
      label: "Resume",
      color: "hover:bg-green-600",
      darkColor: "bg-green-900",
      glow: "shadow-[0_0_24px_6px_rgba(22,163,74,0.7)]",
      delay: 300,
      href: "https://drive.proton.me/urls/HBH57DYT3W#pt5IXOFVa9a3",
    },
  ]

  return (
    <footer className="relative">
      <div className="bg-gradient-to-b from-slate-900/80 via-slate-800/70 to-slate-900/80 backdrop-blur-xl border border-white/10 relative overflow-hidden rounded-3xl">
        {/* Animated stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                top: star.top,
                left: star.left,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              }}
            ></div>
          ))}
        </div>

        {/* Landscape silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20">
          <svg viewBox="0 0 1200 100" className="w-full h-full fill-black/30">
            <path d="M0,100 L0,60 Q150,40 300,50 T600,45 T900,55 Q1050,65 1200,50 L1200,100 Z" />
          </svg>
        </div>

        <div className="relative z-10 px-4 sm:px-8 py-12 sm:py-16">
          {/* Quote */}
          <div className="text-center mb-12 sm:mb-16 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <p className="text-yellow-400 text-lg sm:text-xl lg:text-2xl font-medium italic transform transition-all duration-500 hover:scale-105">
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient truncate">`If you can see the stars from the gutter,  you can see the universe from your inside.`</span>
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-[fadeInLeft_0.8s_ease-out_forwards]">
              <div>
                <h3 className="text-yellow-400 text-2xl sm:text-3xl font-bold mb-2 transform transition-all duration-500 hover:translate-x-2">
                  Coding is my canvas,
                </h3>
                <h3 className="text-yellow-400 text-2xl sm:text-3xl font-bold mb-6 transform transition-all duration-500 hover:translate-x-2 delay-100">
                  every project is a new masterpiece.
                </h3>
              </div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-md transform transition-all duration-500 hover:text-white">
                I offer professional web development services with a focus on creating user-friendly, responsive, and
                beautiful websites. Let&apos;s work together to bring your ideas to life!
              </p>
            </div>

            {/* Middle GIF Container */}
            <div className="flex justify-center items-center animate-[fadeInUp_0.8s_ease-out_forwards]">
              <div className="relative group">
                {/* GIF Container with circular clip path */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 relative overflow-hidden rounded-full">
                  {/* Actual GIF */}
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    <Image  
                      
                      loading="eager"
                      
                      src="/sphere (1).gif"
                      width={200}
                      height={200}
                      alt="Animated GIF"
                      className="w-full h-full object-cover animate-[pulseSlow_3s_ease-in-out_infinite] rounded-full"
                    />
                  </div>

                  {/* Circular overlay */}
                  <div
                    className="absolute inset-0 bg-transparent backdrop-blur-sm border border-white/20 rounded-full"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-white/20 via-purple-500/20 to-blue-500/20 rounded-full"></div>
                  </div>

                  {/* Border effect */}
                  <div
                    className="absolute inset-0 border-2 border-purple-400/50 animate-[spin_8s_linear_infinite] rounded-full"
                  ></div>

                  {/* Interactive hover effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"
                  ></div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 blur-md transition-all duration-500 -z-10 animate-[pulseGlow_2s_ease-in-out_infinite] rounded-full"></div>

                {/* Floating particles */}
                <div className="absolute -inset-8 pointer-events-none">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-[float_3s_ease-in-out_infinite]"></div>
                  <div className="absolute bottom-0 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-[float_3s_ease-in-out_0.5s_infinite]"></div>
                  <div className="absolute top-1/3 right-0 w-1 h-1 bg-pink-400 rounded-full animate-[float_3s_ease-in-out_1s_infinite]"></div>
                </div>
              </div>
            </div>
            {/* End Middle GIF Container */}

            {/* Right Social Buttons */}
            <div className="flex justify-center md:justify-end animate-[fadeInRight_0.8s_ease-out_forwards]">
              <div className="grid grid-cols-2 gap-4 sm:gap-3">
                {socials.map(({ icon: Icon, label, color, darkColor, glow, delay, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={label === "Resume" ? "_blank" : label === "Email" ? "_self" : "_blank"}
                    rel={label !== "Email" ? "noopener noreferrer" : undefined}
                    className={`relative overflow-hidden backdrop-blur-sm border-2 border-white/20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-transparent text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${color} hover:border-transparent hover:shadow-xl hover:shadow-blue-500/25 group
                      ${clicked === label ? `${darkColor} ${glow} border-none` : ""}
                    `}
                    style={{ animationDelay: `${delay}ms` }}
                    aria-label={label}
                    onClick={e => {
                      setClicked(label)
                      // Optionally open in new tab for external links
                      if (label !== "Email") {
                        e.preventDefault()
                        window.open(href, "_blank", "noopener,noreferrer")
                      }
                    }}
                  >
                    {/* Hide icon if clicked */}
                    {clicked !== label && (
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 group-hover:scale-110 group-hover:text-white z-10" />
                    )}
                    {/* Shine effect */}
                    {clicked === label && (
                      <span className="absolute inset-0 rounded-full animate-shine pointer-events-none"></span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-700 animate-[fadeInUp_0.8s_1s_ease-out_forwards]">
            <p className="text-gray-400 text-sm transform transition-all duration-300 hover:text-gray-300">
              ©All Rights Reserved 2025 | Made with ❤️ by - Ahnaf Shahriar
            </p>
          </div>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes shine {
          0% {
            opacity: 0.2;
            background: linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%);
            transform: translateX(-100%);
          }
          60% {
            opacity: 0.7;
            transform: translateX(100%);
          }
          100% {
            opacity: 0.2;
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 1s linear;
          background: linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%);
          opacity: 0.7;
          z-index: 1;
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  )
}