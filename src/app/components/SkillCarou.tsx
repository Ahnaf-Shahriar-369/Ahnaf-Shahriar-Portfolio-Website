"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SkillCard from "./SkillCard"
import "./skillCarou.css"
import { useTranslation } from "react-i18next"

interface Skill {
    id: number
    key: string
    imageSrc: string
}

export default function SkillsCarousel() {
    const { t } = useTranslation()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const progressTimerRef = useRef<NodeJS.Timeout | null>(null)

    // Use translation keys for all skills
    const skills = useMemo<Skill[]>(
        () => [
            { id: 1, key: "react", imageSrc: "/logos/react.svg" },
            { id: 2, key: "nextjs", imageSrc: "/logos/nextjs.svg" },
            { id: 3, key: "nodejs", imageSrc: "/logos/nodejs.svg" },
            { id: 4, key: "expressjs", imageSrc: "/logos/expressjs.svg" },
            { id: 5, key: "mongodb", imageSrc: "/logos/mongodb.svg" },
            { id: 6, key: "tailwind", imageSrc: "/logos/tailwind.svg" },
            { id: 7, key: "typescript", imageSrc: "/logos/typescript.svg" },
            { id: 8, key: "git", imageSrc: "/logos/git.svg" },
            { id: 9, key: "github", imageSrc: "/logos/github.svg" },
            { id: 10, key: "prisma", imageSrc: "/logos/prisma.svg" },
            { id: 11, key: "redux", imageSrc: "/logos/redux.svg" },
            { id: 12, key: "framermotion", imageSrc: "/logos/framermotion.svg" },
            { id: 13, key: "figma", imageSrc: "/logos/figma.svg" },
            { id: 14, key: "vercel", imageSrc: "/logos/vercel.svg" },
            { id: 15, key: "shadcn", imageSrc: "/logos/shadcn.svg" },
            { id: 16, key: "bootstrap", imageSrc: "/logos/bootstrap.svg" },
            { id: 17, key: "material", imageSrc: "/logos/material.svg" },
            { id: 18, key: "vscode", imageSrc: "/logos/vscode.svg" },
        ],
        [],
    )

    // Determine how many cards to show based on screen size
    // Adjusted for the fixed 20rem (320px) card size
    const cardsToShow = isMobile ? 1 : isTablet ? 2 : 3
    const totalSlides = Math.ceil(skills.length / cardsToShow)

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth
            setIsMobile(width < 768)
            setIsTablet(width >= 768 && width < 1200)
        }

        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)
        const loadTimer = setTimeout(() => setIsLoaded(true), 100)

        return () => {
            window.removeEventListener("resize", checkScreenSize)
            clearTimeout(loadTimer)
        }
    }, [])

    useEffect(() => {
        if (!isPaused && isLoaded) {
            if (timerRef.current) clearTimeout(timerRef.current)
            if (progressTimerRef.current) clearInterval(progressTimerRef.current)

            const progressInterval = 40
            progressTimerRef.current = setInterval(() => {
                // Progress tracking logic here if needed
            }, progressInterval)

            timerRef.current = setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % totalSlides)
            }, 4000)
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
            if (progressTimerRef.current) clearInterval(progressTimerRef.current)
        }
    }, [currentIndex, isPaused, isLoaded, totalSlides])

    const goToNextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }

    const goToPrevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    const handleMouseEnter = () => setIsPaused(true)
    const handleMouseLeave = () => setIsPaused(false)

    const getVisibleCards = () => {
        const startIdx = currentIndex * cardsToShow
        return skills.slice(startIdx, Math.min(startIdx + cardsToShow, skills.length))
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    if (!isLoaded) {
        return (
            <section className="skills-section">
                <div className="skills-container">
                    <div className="loading-skeleton">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-subtitle"></div>
                        <div className="skeleton-cards">
                            {[...Array(cardsToShow)].map((_, i) => (
                                <div key={i} className="skeleton-card"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <motion.section
            className="skills-section"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="skills-container">
                <motion.h2 className="skills-title" variants={itemVariants}>
                    {t("nav.skills", "My Skills")}
                </motion.h2>
                <motion.div className="skills-description" variants={itemVariants}>
                    <p>
                        {t(
                            "skills_section_description",
                            "I specialize in these key areas to deliver exceptional digital experiences that bring value to your business and delight your users.",
                        )}
                    </p>
                </motion.div>
                <motion.div
                    className="skills-carousel-container"
                    variants={itemVariants}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.button
                        className="nav-button prev-button"
                        onClick={() => {
                            goToPrevSlide()
                            setIsPaused(false)
                        }}
                        aria-label="Previous skills"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft size={isMobile ? 18 : 24} />
                    </motion.button>

                    <div className="skills-cards-container">
                        <motion.div
                            className="skills-cards-wrapper"
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            {getVisibleCards().map((skill, index) => (
                                <motion.div
                                    className="skill-card-wrapper"
                                    key={skill.id}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.6,
                                        ease: "easeOut",
                                    }}
                                >
                                    <SkillCard
                                        name={t(`skills.${skill.key}.name`, skill.key)}
                                        description={t(`skills.${skill.key}.description`, `${skill.key} technology`)}
                                        imageSrc={skill.imageSrc}
                                        imageAlt={t(`skills.${skill.key}.name`, skill.key) + " logo"}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.button
                        className="nav-button next-button"
                        onClick={() => {
                            goToNextSlide()
                            setIsPaused(false)
                        }}
                        aria-label="Next skills"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        disabled={currentIndex === totalSlides - 1}
                    >
                        <ChevronRight size={isMobile ? 18 : 24} />
                    </motion.button>
                </motion.div>

                <motion.div className="slide-info" variants={itemVariants}>
                    <span className="slide-info-text">{totalSlides > 0 ? `${currentIndex + 1} of ${totalSlides}` : ""}</span>
                </motion.div>

                <motion.div className="timer-indicators" variants={itemVariants}>
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <motion.div
                            key={idx}
                            className="timer-indicator-container"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div
                                className={`timer-indicator-background ${idx === currentIndex ? "active" : ""}`}
                                onClick={() => {
                                    setCurrentIndex(idx)
                                    setIsPaused(false)
                                }}
                            >
                                {idx === currentIndex && (
                                    <motion.div
                                        className="timer-indicator-progress"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 4, ease: "linear" }}
                                        key={`progress-${currentIndex}`}
                                    />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    )
}
