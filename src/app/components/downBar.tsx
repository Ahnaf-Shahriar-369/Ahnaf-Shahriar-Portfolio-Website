"use client"

import { useTranslation } from "react-i18next"
import '../../i18n'

import { useState, useRef, useEffect } from "react"
import { Play, CirclePause, Moon, Sun } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import "./downBar.css"

function DownBar() {

  const { i18n } = useTranslation()
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isEnglish, setIsEnglish] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Simulate loading animation
  useEffect(() => {
    setIsLoading(true)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    setMounted(true)
    return () => clearTimeout(loadingTimer)
  }, [])

  // Sync isEnglish with i18n.language
  useEffect(() => {
    setIsEnglish(i18n.language === "en")
  }, [i18n.language])

  const togglePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Toggle language and call i18n.changeLanguage
  const toggleLanguage = () => {
    if (isEnglish) {
      changeLanguage("bn")
    } else {
      changeLanguage("en")
    }
  }

  return (
    <>
      <audio loop ref={audioRef} src="/in-slow-motion-inspiring-ambient-lounge-219592.mp3"></audio>

      {/* Responsive DownBar */}
      <div className="downbar-container fixed bottom-4 left-4 right-4 flex justify-center items-center z-50">
        <div
          className={`downbar-bg backdrop-blur-xl bg-white/30 text-white py-3 px-6 rounded-full shadow-lg flex justify-center items-center space-x-4 transition-all duration-500 
          border border-white/40 hover:bg-white/40 hover:scale-105
          ${isLoading ? "opacity-0" : "opacity-100"}
          sm:py-2 sm:px-4 sm:space-x-3`}
        >
          <div className="downbar-glow absolute inset-0 rounded-full opacity-60 pointer-events-none"></div>

          {/* Play/Pause button */}
          <div className="relative group">
            <button
              type="button"
              className="downbar-button cursor-pointer p-2 rounded-full hover:bg-gray-200/50 transition-all duration-300 hover:scale-110 active:scale-95 sm:p-1"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause Music" : "Play Music"}
            >
              {isPlaying ? <CirclePause size={20} /> : <Play size={20} />}
            </button>
            <span className="downbar-tooltip absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </div>

          {/* Dark/Light mode button */}
          <div className="relative group">
            <button
              type="button"
              className="downbar-button cursor-pointer p-2 rounded-full hover:bg-gray-200/50 transition-all duration-300 hover:scale-110 active:scale-95 sm:p-1"
              onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              aria-label={
                mounted
                  ? resolvedTheme === "dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                  : undefined
              }
            >
              {mounted &&
                (resolvedTheme === "dark" ? (
                  <Sun size={20} className="downbar-sun-icon text-yellow-300" />
                ) : (
                  <Moon size={20} className="downbar-moon-icon" />
                ))}
            </button>
            <span className="downbar-tooltip absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {mounted && resolvedTheme === "dark" ? "Light" : "Dark"}
            </span>
          </div>

          {/* Language button */}
          <div className="relative group">
            <button
              type="button"
              className="downbar-button cursor-pointer p-2 rounded-full hover:bg-gray-200/50 transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 sm:p-1"
              onClick={toggleLanguage}
              aria-label={`Switch to ${isEnglish ? "Bangla" : "English"}`}
            >
              {/* Show Bangladesh flag when language is English, and UK/US flag when language is Bangla */}
              <Image
                src={isEnglish ? "/bang.png" : "/eng.png"}
                alt={isEnglish ? "Bangla" : "English"}
                width={20}
                height={20}
                className="rounded-full"
              />
            </button>
            <span className="downbar-tooltip absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {isEnglish ? "Bangla" : "English"}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default DownBar