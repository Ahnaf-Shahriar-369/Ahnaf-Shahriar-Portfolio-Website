"use client"
import { useTranslation } from "react-i18next"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import "./NavBar.css"

export default function Navbar() {

    const { t } = useTranslation()


  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("home")
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navbarRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const visibilityTimer = setTimeout(() => {
      setIsVisible(true)
    }, 2100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(loadingTimer)
      clearTimeout(visibilityTimer)
    }
  }, [])

  // Intersection Observer for scroll-based navigation
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects"]

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visibleSections.length > 0) {
        const mostVisible = visibleSections[0]
        const sectionId = mostVisible.target.id

        if (sections.includes(sectionId) && sectionId !== activeLink) {
          setActiveLink(sectionId)
        }
      }
    }

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [activeLink])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
    setIsMenuOpen(false)

    const element = document.getElementById(link)
    if (element) {
      // Temporarily disconnect observer to prevent conflicts during manual navigation
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      element.classList.add("section-active")
      setTimeout(() => {
        element.classList.remove("section-active")
      }, 1000)

      element.scrollIntoView({ behavior: "smooth" })

      // Reconnect observer after scroll animation
      setTimeout(() => {
        const sections = ["home", "about", "skills", "projects"]
        const observerOptions = {
          root: null,
          rootMargin: "-20% 0px -60% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
          const visibleSections = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

          if (visibleSections.length > 0) {
            const mostVisible = visibleSections[0]
            const sectionId = mostVisible.target.id

            if (sections.includes(sectionId) && sectionId !== activeLink) {
              setActiveLink(sectionId)
            }
          }
        }

        observerRef.current = new IntersectionObserver(observerCallback, observerOptions)

        sections.forEach((sectionId) => {
          const element = document.getElementById(sectionId)
          if (element && observerRef.current) {
            observerRef.current.observe(element)
          }
        })
      }, 1500)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed top-[39px] left-0 right-0 z-40 flex justify-center items-center">
        <div className="navbar-loading w-[200px] h-[60px] backdrop-blur-xl rounded-full shadow-lg flex justify-center items-center">
          <p className="navbar-loading-text text-lg font-medium loading-dots">Loading</p>
        </div>
      </div>
    )
  }

  return (
    <nav
      ref={navbarRef}
      className={`navbar-container animate-float fixed top-[9px] left-0 right-0 z-40 transition-all duration-700 ${scrolled ? "py-2" : "py-4"} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`navbar-bg relative w-[600px] max-w-full mx-auto 
          rounded-full shadow-lg 
          transition-all duration-500 ease-in-out
          border border-white/20
          hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
          ${scrolled ? "scale-95" : "scale-100"}
          ${isMenuOpen ? "!rounded-3xl" : "rounded-full"}
          `}
        >
          <div className="navbar-glow absolute inset-0 rounded-full opacity-0 transition-opacity duration-500"></div>

          <div className="flex items-center justify-between px-6 py-2 relative z-10">
            <div className="flex items-center space-x-3 flex-shrink-0 mr-6">
              <div className="relative w-10 h-10 overflow-hidden rounded-full transition-transform duration-500 hover:scale-110 group">
                <Image
                  src="/coder.png"
                  alt="Coder Logo"
                  width={40}
                  height={40}
                  className="object-cover transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 opacity-0 group-hover:opacity-100 animate-shine"></div>
              </div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient truncate">
      {t("navbarName")}
    </h1>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              {["home", "about", "skills", "projects"].map((link) => (
  <div key={link} className="nav-link-container">
    <Link
      href={`#${link}`}
      onClick={() => handleLinkClick(link)}
      className={`navbar-link ${activeLink === link ? "navbar-link-active" : ""}`}
    >
      <span>{t(`nav.${link}`)}</span>
    </Link>
    <div className={`nav-link-bg ${activeLink === link ? "nav-link-active-bg" : ""}`}></div>
  </div>
))}
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`navbar-menu-button p-2 rounded-full transition-all duration-300 hover:bg-white/20 active:scale-95 relative z-20`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={24} className="animate-spin-once" />
                ) : (
                  <Menu size={24} className="animate-pulse-slow" />
                )}
              </button>
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out relative z-10 ${
              isMenuOpen ? "max-h-[200px] opacity-100 mb-2" : "max-h-0 opacity-0"
            }`}
          >
            <div className={`navbar-dropdown flex flex-col space-y-2 py-2 px-4 mx-2 mb-2 rounded-xl`}>
              {["home", "about", "skills", "projects"].map((link) => (
                <div key={link} className="nav-link-mobile-container">
                  <Link
                    href={`#${link}`}
                    onClick={() => handleLinkClick(link)}
                    className={`navbar-dropdown-link px-3 py-2 rounded-md transition-all duration-300 relative z-10 cursor-pointer ${
                      activeLink === link ? "text-white" : "hover:bg-white/20 hover:scale-105"
                    }`}
            
                  >
                    <span>{t(`nav.${link}`)}</span>
                  </Link>
                  <div
                    className={`absolute inset-0 rounded-md transition-all duration-300 ${
                      activeLink === link ? "nav-link-active-bg-mobile" : "opacity-0"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}