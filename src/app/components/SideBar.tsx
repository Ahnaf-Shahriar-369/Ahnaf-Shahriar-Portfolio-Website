// src/app/components/SideBar.tsx
"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, FileText } from "lucide-react"
import "./SideBar.css"

interface SidebarIconProps {
  icon: React.ReactNode
  href: string
  delay: number
  badge?: number
  color?: string
}

const SidebarIcon: React.FC<SidebarIconProps> = ({
  icon,
  href,
  delay,
  badge,
  color = "sidebar-icon-default",
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <Link
      href={href}
      className={`sidebar-icon ${color} ${isClicked ? "sidebar-icon-clicked" : ""}`}
      style={{
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onClick={() => {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 300)
      }}
    >
      {icon}
      {badge !== undefined && (
        <span className="sidebar-icon-badge">{badge}</span>
      )}
      {isHovered && (
        <span className="sidebar-icon-tooltip">
          {href.replace("https://", "").replace("mailto:", "")}
        </span>
      )}
    </Link>
  )
}

export default function Sidebar() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    const mountTimer = setTimeout(() => {
      setMounted(true)
    }, 2100)
    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(mountTimer)
    }
  }, [])

  if (!mounted || isLoading) return null

  return (
    <div className="sidebar-outer">
      <div className="sidebar-bg">
        <SidebarIcon icon={<Github size={28} />} href="https://github.com/Ahnaf-Shahriar-369" delay={0} />
        <SidebarIcon icon={<Linkedin size={28} />} href="https://linkedin.com" delay={0.5} color="sidebar-icon-linkedin" />
        <SidebarIcon
          icon={<Mail size={28} />}
          href="mailto:ahnafshahriar.dev@protonmail.com"
          delay={1}
          color="sidebar-icon-mail"
        />
        <SidebarIcon icon={<FileText size={28} />} href="https://drive.proton.me/urls/TP91KF853M#cQz2bligep2m" delay={1.5} color="sidebar-icon-file" />
      </div>
    </div>
  )
}