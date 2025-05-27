"use client"

import { useEffect, useState } from "react"

export default function EnhancedMicroInteractions() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Add morphing button effects
    const buttons = document.querySelectorAll("button, a")
    buttons.forEach((button) => {
      const htmlButton = button as HTMLElement; // Cast to HTMLElement
      htmlButton.addEventListener("mouseenter", () => {
        htmlButton.style.transform = "scale(1.05) translateY(-2px)"
        htmlButton.style.boxShadow = "0 10px 25px rgba(0, 212, 255, 0.3)"
      })

      htmlButton.addEventListener("mouseleave", () => {
        htmlButton.style.transform = "scale(1) translateY(0)"
        htmlButton.style.boxShadow = "none"
      })
    })

    // Add icon animations on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const icons = entry.target.querySelectorAll("svg")
          icons.forEach((icon, index) => {
            const svgIcon = icon as SVGElement; // Cast to SVGElement
            setTimeout(() => {
              svgIcon.style.animation = "bounce 0.6s ease-in-out"
            }, index * 100)
          })
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll("section")
    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      buttons.forEach((button) => {
        const htmlButton = button as HTMLElement; // Cast to HTMLElement
        htmlButton.removeEventListener("mouseenter", () => {})
        htmlButton.removeEventListener("mouseleave", () => {})
      })
    }
  }, [isMounted])

  return null
}
