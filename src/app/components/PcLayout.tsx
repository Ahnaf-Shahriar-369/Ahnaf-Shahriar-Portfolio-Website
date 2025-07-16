"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectCard from "./ProjectCard"
import "./PcLayout.css"
import { useTranslation } from "react-i18next"

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "Portfolio Website (Current)",
    description:
      "My personal (Web Dev) portfolio website showcasing my skills, projects, and experience. Built with modern web technologies for a responsive and engaging user experience.",
     technologies: [
        { id: 1, name: "Next.js", icon: "/logos/nextjs.svg" },
        { id: 2, name: "Shadcn UI", icon: "/logos/shadecn.svg" },
        { id: 3, name: "TypeScript", icon: "/logos/typescript.svg" },
        { id: 4, name: "Framer Motion", icon: "/logos/framermotion.svg" },
        { id: 5, name: "Tailwind CSS", icon: "/logos/tailwind.svg" },
        {id: 6, name: "React", icon: "/logos/react.svg" }
    ],
        githubUrl: "https://github.com/Ahnaf-Shahriar-369/Ahnaf-Shahriar-Portfolio-Website.git",
    liveUrl: "https://ahnafshahriar.vercel.app/",
    imageUrl: "/Ahnaf-Shahriar.png",
    videoUrl: "/project-videos/P1.webm" 
  },
  {
    id: 2,
    title: "Coming Soon",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    technologies: [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" },
    ],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
  },
  {
    id: 3,
    title: "Coming Soon",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    technologies: [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" },
    ],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
  },
  {
    id: 4,
    title: "Coming Soon",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    technologies: [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" },
    ],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
  },
  {
    id: 5,
    title: "Coming Soon",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    technologies: [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" },
    ],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
  },
  {
    id: 6,
    title: "Coming Soon",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    technologies: [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" },
    ],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
  },
  {
    id: 7,
    title: "Coming Soon",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    technologies: [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" },
    ],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
  },
  {
    id: 8,
    title: "Coming Soon",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    technologies: [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" },
    ],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
  },
  {
    id: 9,
    title: "Coming Soon",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    technologies: [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" },
    ],
    githubUrl: "#",
    liveUrl: "#",
    imageUrl: "",
  },
]

export default function ProjectLayout() {

  const { t } = useTranslation()


  const [showMore, setShowMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isLoadingLess, setIsLoadingLess] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState<typeof projectsData>([])
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleProjects(projectsData.slice(0, 3))
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Handle show more functionality
  const handleShowMore = async () => {
    setIsLoadingMore(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVisibleProjects(projectsData)
    setShowMore(true)
    setIsLoadingMore(false)
  }

  // Handle show less functionality
  const handleShowLess = async () => {
    setIsLoadingLess(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setVisibleProjects(projectsData.slice(0, 3))
    setShowMore(false)
    setIsLoadingLess(false)
  }

  // Floating particles data
  const particles = [
    { top: "15%", left: "15%", size: "3px", gradient: "linear-gradient(45deg, #a855f7, #ec4899)", delay: "0s" },
    { top: "25%", right: "20%", size: "4px", gradient: "linear-gradient(45deg, #3b82f6, #a855f7)", delay: "4s" },
    { bottom: "35%", left: "25%", size: "2px", gradient: "linear-gradient(45deg, #ec4899, #f59e0b)", delay: "8s" },
    { top: "65%", right: "30%", size: "3px", gradient: "linear-gradient(45deg, #8b5cf6, #10b981)", delay: "2s" },
    { top: "45%", left: "10%", size: "2px", gradient: "linear-gradient(45deg, #10b981, #3b82f6)", delay: "6s" },
    { bottom: "20%", right: "15%", size: "3px", gradient: "linear-gradient(45deg, #f59e0b, #ec4899)", delay: "10s" },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="w-full max-w-xs mx-auto">
      <div className="loadingSkeleton theme-transition relative overflow-hidden shadow-xl rounded-lg">
        <div className="relative p-3 space-y-2">
          <div className="loadingSkeletonImage theme-transition relative h-44 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="loadingSkeletonTech theme-transition w-8 h-8 rounded-full" />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <div className="loadingSkeletonText theme-transition h-6 rounded" />
            <div className="loadingSkeletonText theme-transition h-4 rounded" />
            <div className="loadingSkeletonText theme-transition h-4 w-3/4 rounded" />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className="projectsContainer theme-transition min-h-screen relative overflow-hidden w-full" id="projects">
      {/* Background Effects - Same as About */}
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

      {/* Floating Particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[2]">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="floatingParticle"
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

      {/* Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]">
        <div
          className="absolute top-[15%] right-[10%] w-[40px] h-[40px] rounded-full animate-rotateGeometry"
          style={{
            border: "1px solid rgba(168, 85, 247, 0.15)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute bottom-[25%] left-[8%] w-[30px] h-[30px] animate-rotateGeometry"
          style={{
            border: "1px solid rgba(236, 72, 153, 0.12)",
            transform: "rotate(45deg)",
            animationDelay: "15s",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20">
        {/* Header Section */}
        <motion.div variants={titleVariants} initial="hidden" animate="visible" className="text-center mb-20 md:mb-32">
          <h2 className="projectsTitle text-5xl md:text-7xl font-bold mb-8">{t("projects_title")}</h2>

          <motion.div
            className="projectsTitleUnderline w-24 h-1 mx-auto mb-12 rounded-full theme-transition"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.div
            className="projectsDescription text-lg md:text-xl max-w-4xl mx-auto leading-relaxed theme-transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>{t("projects_section_description")}</p>

          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {[...Array(3)].map((_, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <LoadingSkeleton />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {visibleProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="flex justify-center"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show More/Less Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <AnimatePresence mode="wait">
            {!showMore ? (
              <motion.button
                key="show-more"
                onClick={handleShowMore}
                disabled={isLoadingMore}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className={`projectsButton theme-transition relative ${
                  isButtonHovered ? "projectsButtonHovered" : ""
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="projectsDecor1 theme-transition" />
                <div className="projectsDecor2 theme-transition" />

                <div className="relative flex items-center space-x-3">
                  <AnimatePresence mode="wait">
                    {isLoadingMore ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
<span className="font-medium">{t("projects_loading_more")}</span>

                      </motion.div>
                    ) : (
                      <motion.div
                        key="show-more"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-3"
                      >
<span className="font-medium">{t("projects_show_more")}</span>
                        <span className="text-lg">→</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ) : (
              <motion.button
                key="show-less"
                onClick={handleShowLess}
                disabled={isLoadingLess}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className={`projectsButton theme-transition relative ${
                  isButtonHovered ? "projectsButtonHovered" : ""
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="projectsDecor1 theme-transition" />
                <div className="projectsDecor2 theme-transition" />

                <div className="relative flex items-center space-x-3">
                  <AnimatePresence mode="wait">
                    {isLoadingLess ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span className="font-medium">{t("projects_collapsing")}</span>

                      </motion.div>
                    ) : (
                      <motion.div
                        key="show-less"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-3"
                      >
                        <span className="text-lg">←</span>
                        <span className="font-medium">{t("projects_show_less")}</span>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Pattern Overlay */}
      <div
        className="absolute top-0 left-0 w-[200%] h-[200%] z-0"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 400px, rgba(168, 85, 247, 0.008) 400px, rgba(168, 85, 247, 0.008) 402px)",
        }}
      />
    </section>
  )
}