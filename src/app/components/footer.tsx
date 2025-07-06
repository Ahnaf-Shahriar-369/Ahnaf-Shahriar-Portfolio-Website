"use client"

import { useTranslation } from "react-i18next"


import { useState, useEffect } from "react"
import { Mail, Linkedin, Github, FileText } from "lucide-react"
import Image from "next/image"
import "./footer.css"


export default function FooterSection() {

  const { t } = useTranslation()



  // const [ setIsVisible] = useState(false)
  const [clicked, setClicked] = useState<string | null>(null)

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    const section = document.getElementById("footer")
    if (section) observer.observe(section)
    return () => {
      if (section) observer.disconnect()
    }
  }, [])

  // Enhanced star positions for better visual effect
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
    { top: "12%", left: "55%", duration: 2.6, delay: 1.6 },
    { top: "45%", left: "5%", duration: 2.9, delay: 0.2 },
    { top: "75%", left: "90%", duration: 2.3, delay: 1.8 },
    { top: "5%", left: "30%", duration: 3.2, delay: 0.9 },
    { top: "90%", left: "50%", duration: 2.7, delay: 2.1 },
  ]

  // Enhanced floating particles for footer
  const particles = [
    { top: "15%", left: "10%", size: "2px", gradient: "linear-gradient(45deg, #a855f7, #ec4899)", delay: "0s" },
    { top: "25%", right: "15%", size: "3px", gradient: "linear-gradient(45deg, #3b82f6, #a855f7)", delay: "3s" },
    { bottom: "30%", left: "20%", size: "2px", gradient: "linear-gradient(45deg, #ec4899, #f59e0b)", delay: "6s" },
    { top: "60%", right: "25%", size: "2px", gradient: "linear-gradient(45deg, #8b5cf6, #10b981)", delay: "1.5s" },
    { top: "40%", left: "70%", size: "3px", gradient: "linear-gradient(45deg, #10b981, #3b82f6)", delay: "9s" },
    { bottom: "50%", right: "40%", size: "2px", gradient: "linear-gradient(45deg, #a855f7, #ec4899)", delay: "12s" },
  ]

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
    <footer className="footerContainer theme-transition relative overflow-hidden" id="footer">
      {/* Enhanced Background Effects */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full transform -skew-x-12 z-[1] animate-backgroundShine"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.04), rgba(236, 72, 153, 0.06), rgba(59, 130, 246, 0.04), transparent)",
        }}
      />

      {/* Multiple Wave Layers */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[1]">
        <div
          className="absolute -top-1/2 -left-1/2 w-[150%] h-[150%] rounded-full animate-wave"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.03) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute -top-[30%] -right-1/2 w-[150%] h-[150%] rounded-full animate-wave"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, transparent 70%)",
            animationDelay: "15s",
          }}
        />
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[2]">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-40 animate-floatParticle"
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

      {/* Enhanced Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 footerStar rounded-full animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Landscape Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 z-[2]">
        <svg viewBox="0 0 1200 100" className="w-full h-full footerLandscape">
          <path d="M0,100 L0,60 Q150,40 300,50 T600,45 T900,55 Q1050,65 1200,50 L1200,100 Z" />
          <path d="M0,100 L0,70 Q200,50 400,60 T800,55 Q1000,65 1200,60 L1200,100 Z" opacity="0.5" />
        </svg>
      </div>

      <div className="footerContent relative z-10 px-4 sm:px-8 py-12 sm:py-16">
        {/* Quote Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="footerQuoteCard theme-transition relative">
            <div className="cardGlow theme-transition" />
            <p className="footerQuote text-lg sm:text-xl lg:text-2xl font-medium italic">
              <span className="footerQuoteText">
                {t("footer.quote").split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center">
          {/* Left Content */}
          <div className="footerLeftSection space-y-6">
            <div className="footerTextCard theme-transition relative">
              <div className="cardGlow theme-transition" />
              <div>
                <h3 className="footerHeading text-2xl sm:text-3xl font-bold mb-2">{t("footer.coding_canvas")}</h3>
                <h3 className="footerHeading text-2xl sm:text-3xl font-bold mb-6">
                  {t("footer.coding_masterpiece")}
                </h3>
              </div>
              <p className="footerDescription text-base sm:text-lg leading-relaxed max-w-md">
                {t("footer.description")}
              </p>
            </div>
          </div>

          {/* Middle GIF Container */}
          <div className="flex justify-center items-center">
            <div className="footerGifContainer relative group">
              <div className="footerGifWrapper w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 relative overflow-hidden rounded-full">
                {/* GIF */}
                <div className="absolute inset-0 flex items-center justify-center blur bg-transparent">
                  <Image
                    unoptimized
                    src="/sphere (1).gif"
                    width={200}
                    height={200}
                    alt="Animated GIF"
                    className="w-full h-full object-cover footerGif rounded-full"
                  />
                </div>

                {/* Overlay Effects */}
                <div className="footerGifOverlay absolute inset-0 rounded-full">
                  <div className="w-full h-full footerGifGradient rounded-full"></div>
                </div>

                {/* Border Effect */}
                <div className="footerGifBorder absolute inset-0 border-2 rounded-full"></div>

                {/* Interactive Hover Effect */}
                <div className="footerGifHover absolute inset-0 rounded-full"></div>
              </div>

              {/* Glow Effect */}
              <div className="footerGifGlow absolute -inset-2 rounded-full"></div>

              {/* Floating Particles */}
              <div className="absolute -inset-8 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-2 h-2 footerFloatingParticle1 rounded-full"></div>
                <div className="absolute bottom-0 left-1/4 w-1.5 h-1.5 footerFloatingParticle2 rounded-full"></div>
                <div className="absolute top-1/3 right-0 w-1 h-1 footerFloatingParticle3 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Social Buttons */}
          <div className="flex justify-center md:justify-end">
            <div className="footerSocialGrid grid grid-cols-2 gap-4 sm:gap-3">
              {socials.map(({ icon: Icon, label, darkColor, glow, delay, href }) => (
                <a
                  key={label}
                  href={href}
                  target={label === t("footer.resume") ? "_blank" : label === t("footer.email") ? "_self" : "_blank"}
                  rel={label !== t("footer.email") ? "noopener noreferrer" : undefined}
                  className={`footerSocialBtn relative overflow-hidden w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 group
                    ${clicked === label ? `${darkColor} ${glow} border-none` : ""}
                  `}
                  style={{ animationDelay: `${delay}ms` }}
                  aria-label={label}
                  onClick={(e) => {
                    setClicked(label)
                    if (label !== t("footer.email")) {
                      e.preventDefault()
                      window.open(href, "_blank", "noopener,noreferrer")
                    }
                  }}
                >
                  {clicked !== label && (
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 footerSocialIcon transition-all duration-300 group-hover:scale-110 z-10" />
                  )}
                  {clicked === label && (
                    <span className="absolute inset-0 rounded-full footerSocialShine pointer-events-none"></span>
                  )}
                  <div className="footerSocialGlow"></div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8">
          <div className="footerCopyrightCard theme-transition relative">
            <div className="cardGlow theme-transition" />
            <p className="footerCopyright text-sm">
              {t("footer.copyright")}
              <br />
              <span className="footerCopyrightName">{t("footer.author")}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Pattern Overlay */}
      <div
        className="absolute top-0 left-0 w-[200%] h-[200%] z-0 animate-moveLines"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 400px, rgba(147, 51, 234, 0.008) 400px, rgba(147, 51, 234, 0.008) 402px)",
        }}
      />
    </footer>
  )
}
