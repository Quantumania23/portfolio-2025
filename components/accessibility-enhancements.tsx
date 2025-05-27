"use client"

import { useEffect, useState } from "react"

export default function AccessibilityEnhancements() {
  const [showSkipLink, setShowSkipLink] = useState(false)

  useEffect(() => {
    // Add keyboard navigation indicators
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation")
        setShowSkipLink(true)
      }
    }

    const handleMouseDown = () => {
      document.body.classList.remove("keyboard-navigation")
      setShowSkipLink(false)
    }

    // Focus trap for modals
    const trapFocus = (element: HTMLElement) => {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              e.preventDefault()
            }
          }
        }
      }

      element.addEventListener("keydown", handleTabKey)
      return () => element.removeEventListener("keydown", handleTabKey)
    }

    // Apply focus trap to modals
    const modals = document.querySelectorAll('[role="dialog"]')
    const cleanupFunctions: (() => void)[] = []
    modals.forEach((modal) => {
      if (modal instanceof HTMLElement) {
        cleanupFunctions.push(trapFocus(modal))
      }
    })

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleMouseDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleMouseDown)
      cleanupFunctions.forEach((cleanup) => cleanup())
    }
  }, [])

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className={`fixed top-4 left-4 z-50 px-4 py-2 glass-card rounded-lg transition-all duration-300 ${
          showSkipLink ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{
          backgroundImage: "linear-gradient(to right, var(--accent-primary), var(--accent-secondary))",
          color: "#0a0f1c",
        }}
      >
        Skip to main content
      </a>

      {/* Screen reader announcements */}
      <div id="sr-announcements" className="sr-only" aria-live="polite" aria-atomic="true" />
    </>
  )
}
