"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
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

    // Refs for scroll animations
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descriptionRef = useRef<HTMLDivElement>(null)
    const carouselRef = useRef<HTMLDivElement>(null)

    // Scroll detection hooks
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
    const isTitleInView = useInView(titleRef, { once: true, amount: 0.8 })
    const isDescriptionInView = useInView(descriptionRef, { once: true, amount: 0.8 })
    const isCarouselInView = useInView(carouselRef, { once: true, amount: 0.3 })

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
        if (!isPaused && isLoaded && isCarouselInView) {
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
    }, [currentIndex, isPaused, isLoaded, totalSlides, isCarouselInView])

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

    // Enhanced animation variants with scroll triggers
    const sectionVariants = {
        hidden: {
            opacity: 0,
            y: 100,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.2,
            },
        },
    }

    const titleVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -15,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
            },
        },
    }

    const descriptionVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2,
            },
        },
    }

    const carouselVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            rotateY: -10,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateY: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.4,
                staggerChildren: 0.1,
            },
        },
    }

    const cardWrapperVariants = {
        hidden: {
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotateY: -20,
        },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            transition: {
                delay: index * 0.15,
                duration: 0.7,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        }),
    }

    const navigationVariants = {
        hidden: {
            opacity: 0,
            scale: 0.5,
            rotate: -180,
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.8,
                type: "spring",
                stiffness: 200,
            },
        },
    }

    const indicatorVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scaleX: 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            scaleX: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 1,
                staggerChildren: 0.1,
            },
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
            ref={sectionRef}
            className="skills-section"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={sectionVariants}
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="skills-container">
                <motion.h2
                    ref={titleRef}
                    className="skills-title"
                    initial="hidden"
                    animate={isTitleInView ? "visible" : "hidden"}
                    variants={titleVariants}
                >
                    {t("nav.skills", "My Skills")}
                </motion.h2>

                <motion.div
                    ref={descriptionRef}
                    className="skills-description"
                    initial="hidden"
                    animate={isDescriptionInView ? "visible" : "hidden"}
                    variants={descriptionVariants}
                >
                    <p>
                        {t(
                            "skills_section_description",
                            "I specialize in these key areas to deliver exceptional digital experiences that bring value to your business and delight your users.",
                        )}
                    </p>
                </motion.div>

                <motion.div
                    ref={carouselRef}
                    className="skills-carousel-container"
                    initial="hidden"
                    animate={isCarouselInView ? "visible" : "hidden"}
                    variants={carouselVariants}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.button
                        className="nav-button prev-button"
                        variants={navigationVariants}
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
                                    custom={index}
                                    initial="hidden"
                                    animate={isCarouselInView ? "visible" : "hidden"}
                                    variants={cardWrapperVariants}
                                    whileHover={
                                        !isMobile
                                            ? {
                                                y: -10,
                                                scale: 1.02,
                                                rotateY: 5,
                                                transition: { duration: 0.3 },
                                            }
                                            : {}
                                    }
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
                        variants={navigationVariants}
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

                <motion.div
                    className="slide-info"
                    initial="hidden"
                    animate={isCarouselInView ? "visible" : "hidden"}
                    variants={indicatorVariants}
                >
                    <span className="slide-info-text">{totalSlides > 0 ? `${currentIndex + 1} of ${totalSlides}` : ""}</span>
                </motion.div>

                <motion.div
                    className="timer-indicators"
                    initial="hidden"
                    animate={isCarouselInView ? "visible" : "hidden"}
                    variants={indicatorVariants}
                >
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <motion.div
                            key={idx}
                            className="timer-indicator-container"
                            variants={{
                                hidden: { opacity: 0, scaleX: 0 },
                                visible: {
                                    opacity: 1,
                                    scaleX: 1,
                                    transition: { delay: idx * 0.1 },
                                },
                            }}
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

