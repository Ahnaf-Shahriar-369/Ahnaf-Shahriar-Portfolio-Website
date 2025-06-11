"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
// import Image from "next/image"
import RightSection from "./right2"
import { useTranslation } from "react-i18next"

const About = () => {
  const { t } = useTranslation()

  const [isVisible, setIsVisible] = useState(false)
  const [isLeftHovered, setIsLeftHovered] = useState(false)
  const [isRightClicked, setIsRightClicked] = useState(false)

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

  // Reset click state after animation completes
  useEffect(() => {
    if (isRightClicked) {
      const timer = setTimeout(() => {
        setIsRightClicked(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isRightClicked])

  return (
    <section className="about-section py-16 md:py-24 px-4 text-center w-[100%]" id="about">
      <div className="background-effects"></div>
      <div className="container mx-auto max-w-6xl">
        {/* Top part with heading and paragraph */}
        <div className="mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-purple-200 max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("Description")}
          </motion.p>
        </div>
        {/* Two containers - personal info and image - with perfect alignment */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-3xl mx-auto animate-float mb-16">
          {/* Left section with personal info */}
          <motion.div
            className={`personal-info-card p-6 rounded-3xl text-left flex-1  ${isLeftHovered ? "card-3d-effect" : ""}`}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
            style={{
              transform: isLeftHovered
                ? "perspective(1000px) rotateY(10deg) rotateX(5deg) scale(1.03)"
                : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
              transition: "transform 0.5s ease",
            }}
          >
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-purple-400 font-medium w-24">{t("Name")}:</span>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient truncate">
                  {t("NameValue")}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 font-medium w-24">{t("Age")}:</span>
                <span className="text-purple-100">{t("AgeValue")}</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 font-medium w-24">{t("Location")}:</span>
                <span className="text-purple-100">{t("LocationValue")}</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 font-medium w-24">{t("Education")}:</span>
                <span className="text-purple-100">{t("EducationValue")}</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 font-medium w-24">{t("Languages")}:</span>
                <span className="text-purple-100">{t("LanguagesValue")}</span>
              </div>
            </div>
          </motion.div>

          <RightSection />
        </div>
      </div>
    </section>
  )
}

export default About