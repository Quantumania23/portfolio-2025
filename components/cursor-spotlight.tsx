"use client"

import { useEffect, useState } from "react"

export default function CursorSpotlight() {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== "undefined"
  
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Don't run this effect on the server
    if (!isBrowser) return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isBrowser])
  
  // Don't render anything on the server
  if (!isBrowser) return null

  return (
    <div
      className="fixed pointer-events-none z-50 w-64 h-64 rounded-full mix-blend-screen blur-xl"
      style={{
        backgroundImage: "linear-gradient(to right, rgba(0,212,255,0.15), rgba(0,255,136,0.15))",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  )
}
