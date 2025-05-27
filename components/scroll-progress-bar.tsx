"use client"

import { useState, useEffect } from "react"

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Set isMounted to true when component mounts on the client side
    setIsMounted(true)
    
    // Only run in the browser
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)))
    }

    // Initial check in case the page is loaded with a scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't render anything during server-side rendering
  if (!isMounted) return null

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-black/20">
      <div
        className="h-full transition-all duration-150 ease-out bg-blue-500 rounded-r-sm"
        style={{
          width: `${scrollProgress}%`,
        }}
      />
    </div>
  )
}
