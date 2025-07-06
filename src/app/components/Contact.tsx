"use client"

import type React from "react"

import { useTranslation } from "react-i18next"


import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import NeonTicTacToe from "./Tic"
import FooterSection from "./footer"
import "./Contact.css"

export default function ContactForm() {

  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  // const [ setIsVisible] = useState(false)

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
    const section = document.getElementById("contact")
    if (section) observer.observe(section)
    return () => {
      if (section) observer.disconnect()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  // Enhanced floating particles configuration
  const particles = [
    { top: "10%", left: "15%", size: "3px", gradient: "linear-gradient(45deg, #a855f7, #ec4899)", delay: "0s" },
    { top: "25%", right: "20%", size: "4px", gradient: "linear-gradient(45deg, #3b82f6, #a855f7)", delay: "4s" },
    { bottom: "35%", left: "25%", size: "2px", gradient: "linear-gradient(45deg, #ec4899, #f59e0b)", delay: "8s" },
    { top: "65%", right: "30%", size: "3px", gradient: "linear-gradient(45deg, #8b5cf6, #10b981)", delay: "2s" },
    { top: "40%", left: "10%", size: "2px", gradient: "linear-gradient(45deg, #10b981, #3b82f6)", delay: "6s" },
    { top: "80%", left: "60%", size: "3px", gradient: "linear-gradient(45deg, #a855f7, #ec4899)", delay: "10s" },
    { top: "15%", left: "70%", size: "2px", gradient: "linear-gradient(45deg, #3b82f6, #a855f7)", delay: "12s" },
    { bottom: "20%", right: "15%", size: "4px", gradient: "linear-gradient(45deg, #ec4899, #f59e0b)", delay: "14s" },
  ]

  const floatingIcons = [
    { icon: "💌", top: "15%", right: "10%", delay: "0s" },
    { icon: "✨", bottom: "25%", left: "8%", delay: "2.5s" },
    { icon: "🎯", top: "60%", right: "15%", delay: "5s" },
    { icon: "💫", top: "35%", left: "5%", delay: "7.5s" },
    { icon: "🚀", top: "70%", left: "80%", delay: "10s" },
    { icon: "⭐", bottom: "40%", right: "25%", delay: "12.5s" },
  ]

  // Geometric shapes for background
  const geometricShapes = [
    { type: "circle", top: "20%", right: "15%", size: "60px", delay: "0s" },
    { type: "square", bottom: "30%", left: "10%", size: "40px", delay: "5s" },
    { type: "triangle", top: "50%", right: "25%", size: "50px", delay: "10s" },
    { type: "circle", bottom: "15%", right: "40%", size: "35px", delay: "15s" },
  ]

  return (
    <section className="contactContainer theme-transition min-h-screen relative overflow-hidden w-full" id="contact">
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
        <div
          className="absolute -bottom-1/2 -left-1/3 w-[120%] h-[120%] rounded-full animate-wave"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.015) 0%, transparent 60%)",
            animationDelay: "20s",
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

      {/* Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]">
        {geometricShapes.map((shape, i) => (
          <div
            key={i}
            className={`absolute animate-rotateGeometry opacity-10 ${
              shape.type === "circle" ? "rounded-full" : shape.type === "square" ? "rounded-lg" : ""
            }`}
            style={{
              ...shape,
              width: shape.size,
              height: shape.size,
              border: "1px solid rgba(168, 85, 247, 0.2)",
              animationDelay: shape.delay,
              ...(shape.type === "triangle" && {
                width: 0,
                height: 0,
                borderLeft: `${Number.parseInt(shape.size) / 2}px solid transparent`,
                borderRight: `${Number.parseInt(shape.size) / 2}px solid transparent`,
                borderBottom: `${shape.size} solid rgba(168, 85, 247, 0.1)`,
                border: "none",
              }),
            }}
          />
        ))}
      </div>

      {/* Enhanced Floating Icons */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[5]">
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className="absolute text-2xl md:text-3xl opacity-50 animate-floatIcon"
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

      {/* Grid Pattern Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[1] opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10 py-8 md:py-12 lg:py-20 px-4 md:px-6 lg:px-12 xl:px-20 w-full">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="contactTitle text-4xl md:text-6xl lg:text-7xl font-bold mb-8">Let&apos;s Connect</h1>
          <div className="contactTitleUnderline w-24 h-1 mx-auto mb-8 rounded-full theme-transition"></div>
          <div className="contactDescription text-lg md:text-xl max-w-3xl mx-auto leading-relaxed theme-transition">
            <p>
              Ready to bring your ideas to life? I&apos;m here to help you create something amazing. Whether it&apos;s a new
              project or collaboration, let&apos;s start the conversation.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-start max-w-6xl mx-auto">
          {/* Left Section - Contact Form */}
          <div className="order-2 lg:order-1 w-full">
            <div className="contactCard theme-transition relative w-full">
              <div className="cardGlow theme-transition" />

              <h2 className="contactCardTitle text-xl md:text-2xl lg:text-3xl font-bold mb-2">Send Message</h2>
              <div className="contactCardUnderline w-16 h-0.5 mb-6 lg:mb-8 rounded-full theme-transition"></div>

              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6 w-full">
                {/* Name Field */}
                <div className="contactFormGroup w-full">
                  <Label htmlFor="name" className="contactLabel">
                    Name
                  </Label>
                  <div className="contactInputWrapper w-full">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="contactInput theme-transition w-full"
                      required
                    />
                    <div className="contactInputGlow"></div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="contactFormGroup w-full">
                  <Label htmlFor="email" className="contactLabel">
                    Email
                  </Label>
                  <div className="contactInputWrapper w-full">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="contactInput theme-transition w-full"
                      required
                    />
                    <div className="contactInputGlow"></div>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="contactFormGroup w-full">
                  <Label htmlFor="subject" className="contactLabel">
                    Subject
                  </Label>
                  <div className="contactInputWrapper w-full">
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project collaboration"
                      className="contactInput theme-transition w-full"
                      required
                    />
                    <div className="contactInputGlow"></div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="contactFormGroup w-full">
                  <Label htmlFor="message" className="contactLabel">
                    Message
                  </Label>
                  <div className="contactInputWrapper w-full">
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project ideas..."
                      rows={4}
                      className="contactInput contactTextarea theme-transition resize-none w-full"
                      required
                    />
                    <div className="contactInputGlow"></div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="contactSubmitBtn theme-transition w-full relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        {t("contact_form_send")}
                        <span className="transform transition-transform group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </span>
                  <div className="contactSubmitGlow"></div>
                </Button>
              </form>

              {/* Decorative Elements */}
              <div className="contactCardDecor1 theme-transition"></div>
              <div className="contactCardDecor2 theme-transition"></div>
            </div>
          </div>

          {/* Right Section - Game */}
          <div className="order-1 lg:order-2 w-full">
            {/* Game Section */}
            <div className="contactGameCard theme-transition relative w-full">
              <div className="cardGlow theme-transition" />

              <h3 className="contactGameTitle text-lg md:text-xl lg:text-2xl font-bold mb-4 text-center">
                {t("contact_game_title")}
              </h3>

              <div className="flex justify-center w-full">
                <div className="w-full max-w-sm">
                  <NeonTicTacToe />
                </div>
              </div>
            </div>
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

      <FooterSection />
    </section>
  )
}
