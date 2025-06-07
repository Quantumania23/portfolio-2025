"use client"

import { useEffect, useState } from "react"
import Loader from "@/components/Loader"
import Hero from "@/components/hero"
import AchievementsSection from "@/components/achievements-section"
import Navigation from "@/components/navigation"
import About from "@/components/about"
import Experience from "@/components/experience"
import CommunityImpact from "@/components/community-impact"
import ProjectsSidebar from "@/components/projects-sidebar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import ThemeCustomizationPanel from "@/components/theme-customization-panel"
import InteractiveStatsPanel from "@/components/interactive-stats-panel"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import EnhancedMicroInteractions from "@/components/enhanced-micro-interactions"
import ToastNotifications from "@/components/toast-notifications"
import AccessibilityEnhancements from "@/components/accessibility-enhancements"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Optional: this can also be managed in <Loader /> with onComplete
    // but for flexibility, you can change timeout duration here
    const timer = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />
  }

  return (
    <main className="min-h-screen relative overflow-hidden" id="main-content">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <AchievementsSection />
        <About />
        <Experience />
        <CommunityImpact />
        <ProjectsSidebar />
        <Contact />
        <Footer />

        {/* Advanced Features */}
        <BackToTop />
        <ThemeCustomizationPanel />
        <InteractiveStatsPanel />
        <ScrollProgressBar />
        <EnhancedMicroInteractions />
        <ToastNotifications />
        <AccessibilityEnhancements />
      </div>
    </main>
  )
}

function ParticleBackground() {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    width: 50 + (i % 5) * 20,
    height: 50 + (i % 5) * 20,
    top: (i * 5) % 100,
    left: (i * 7) % 100,
    duration: 10 + (i % 10),
    delay: i % 5,
    opacity: 0.1 + (i % 5) * 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  )
}
