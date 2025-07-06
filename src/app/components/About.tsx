"use client"
import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import RightSection from "./right2"
import { useTranslation } from "react-i18next"
import "./About.css"


const About = () => {
  const { t, i18n } = useTranslation()

  const [isVisible, setIsVisible] = useState(false)
  const [isLeftHovered, setIsLeftHovered] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const [isLanguageChanging, setIsLanguageChanging] = useState(false)

  // Simple intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    const section = document.getElementById("about")
    if (section) observer.observe(section)
    return () => {
      if (section) observer.disconnect()
    }
  }, [])

  // Optimized language change detection
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      setIsLanguageChanging(true)
      const timer = setTimeout(() => {
        setCurrentLanguage(i18n.language)
        setIsLanguageChanging(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [i18n.language, currentLanguage])

  // Simplified text animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  // Memoize personal info items for better performance
  const personalInfoItems = useMemo(
    () => [
      { label: t("Name"), value: t("NameValue"), gradient: true },
      { label: t("Age"), value: t("AgeValue") },
      { label: t("Location"), value: t("LocationValue") },
      { label: t("Education"), value: t("EducationValue") },
      { label: t("Languages"), value: t("LanguagesValue") },
    ],
    [t],
  )

  // Reduced number of particles for better performance
  const particles = useMemo(
    () => [
      { top: "15%", left: "15%", size: "3px", gradient: "linear-gradient(45deg, #a855f7, #ec4899)", delay: "0s" },
      { top: "25%", right: "20%", size: "4px", gradient: "linear-gradient(45deg, #3b82f6, #a855f7)", delay: "4s" },
      { bottom: "35%", left: "25%", size: "2px", gradient: "linear-gradient(45deg, #ec4899, #f59e0b)", delay: "8s" },
      { top: "65%", right: "30%", size: "3px", gradient: "linear-gradient(45deg, #8b5cf6, #10b981)", delay: "2s" },
    ],
    [],
  )

  const floatingIcons = useMemo(
    () => [
      { icon: "💡", top: "20%", right: "10%", delay: "0s" },
      { icon: "🎨", bottom: "30%", left: "8%", delay: "2.5s" },
      { icon: "⭐", top: "70%", right: "20%", delay: "5s" },
    ],
    [],
  )

  return (
    <section className="aboutContainer theme-transition min-h-screen relative overflow-hidden w-full" id="about">
      {/* Simplified Background Effects */}
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
      </div>

      {/* Reduced Floating Particles */}
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

      {/* Simplified Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]">
        <div
          className="absolute top-[15%] right-[10%] w-[40px] h-[40px] rounded-full animate-rotateGeometry"
          style={{
            border: "1px solid rgba(168, 85, 247, 0.15)",
            animationDelay: "0s",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20">
        {/* Header Section - TRANSITION for "About Me" */}
        <div className="text-center mb-20 md:mb-32 animate-slideInLeft">
          <AnimatePresence mode="wait">
            <motion.h2
              key={`aboutme-heading-${currentLanguage}`}
              className="aboutTitle text-5xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {t("AboutMe")}
            </motion.h2>
          </AnimatePresence>
          <motion.div
            className="aboutTitleUnderline w-24 h-1 mx-auto mb-12 rounded-full theme-transition"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          ></motion.div>
          <motion.div
            className="aboutDescription text-lg md:text-xl max-w-4xl mx-auto leading-relaxed theme-transition"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={`description-${currentLanguage}`}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={isLanguageChanging ? "language-changing" : ""}
              >
                {t("Description")}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-24 max-w-6xl mx-auto">
          {/* Left Section with h1 Personal Info Header */}
          <motion.div
            className={`aboutCard theme-transition relative text-left flex-1 max-w-lg transition-all duration-300 ${
              isLeftHovered ? "aboutCardHovered" : ""
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
          >
            <div className="cardGlow theme-transition" />

            {/* Added h1 Personal Info Header */}
            <h1 className="personalInfoHeader theme-transition">Personal Info</h1>

            <div className="space-y-6 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-items-${currentLanguage}`}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.1,
                      },
                    },
                    exit: {
                      opacity: 0,
                      transition: {
                        staggerChildren: 0.03,
                        staggerDirection: -1,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={isLanguageChanging ? "language-changing" : ""}
                >
                  {personalInfoItems.map((item, index) => (
                    <motion.div
                      key={`${item.label}-${index}`}
                      className="flex items-center aboutInfoItem theme-transition"
                      variants={textVariants}
                    >
                      <span className="aboutInfoLabel text-sm uppercase tracking-wider w-28 theme-transition">
                        {item.label}:
                      </span>
                      <span
                        className={`text-lg font-medium theme-transition ${
                          item.gradient ? "aboutInfoValueGradient font-bold text-xl" : "aboutInfoValue"
                        }`}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decorative Elements */}
            <div className="aboutCardDecor1 theme-transition"></div>
            <div className="aboutCardDecor2 theme-transition"></div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="flex-1 flex justify-center animate-slideInRight"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative">
              <div className="aboutImageGlow theme-transition"></div>
              <div className="aboutImageGlowSecondary theme-transition"></div>
              <RightSection />
            </div>
          </motion.div>
        </div>

        {/* Bottom Spacing */}
        <div className="mt-32 mb-16">
          <motion.div
            className="aboutBottomDecor w-32 h-0.5 mx-auto rounded-full theme-transition"
            initial={{ width: 0, opacity: 0 }}
            animate={isVisible ? { width: 128, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1.2, delay: 1.4 }}
          ></motion.div>
        </div>
      </div>

      {/* Reduced Interactive Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[5]">
        {floatingIcons.map((item, i) => (
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

      {/* Simplified Pattern Overlay */}
      <div
        className="absolute top-0 left-0 w-[200%] h-[200%] z-0 animate-moveLines"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 400px, rgba(147, 51, 234, 0.008) 400px, rgba(147, 51, 234, 0.008) 402px)",
        }}

      >
        

      </div>
      
    </section>
  )
}

export default About