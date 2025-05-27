"use client"

import { useState, useEffect } from "react"
import { Settings, X, Palette, Zap, Eye, Moon, Sun, Monitor } from "lucide-react"

interface ThemeSettings {
  colorScheme: "dark" | "light" | "auto"
  accentColor: "blue" | "emerald" | "purple" | "amber"
  animationSpeed: "slow" | "normal" | "fast"
  reducedMotion: boolean
  highContrast: boolean
}

const accentColors = {
  blue: { primary: "#3B82F6", secondary: "#10B981" },
  emerald: { primary: "#10B981", secondary: "#3B82F6" },
  purple: { primary: "#8B5CF6", secondary: "#F59E0B" },
  amber: { primary: "#F59E0B", secondary: "#8B5CF6" },
}

export default function ThemeCustomizationPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<ThemeSettings>({
    colorScheme: "dark",
    accentColor: "blue",
    animationSpeed: "normal",
    reducedMotion: false,
    highContrast: false,
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      // Load settings from localStorage
      const savedSettings = localStorage.getItem("theme-settings")
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings) as ThemeSettings;
          // Optional: Add validation for parsedSettings structure if necessary
          setSettings(parsedSettings)
        } catch (error) {
          console.error("Failed to parse theme settings from localStorage:", error);
          // Fallback or remove corrupted data
          localStorage.removeItem("theme-settings");
        }
      }
    }
  }, [isMounted])

  useEffect(() => {
    if (isMounted) {
      // Save settings to localStorage and apply to document
      localStorage.setItem("theme-settings", JSON.stringify(settings))
      applyThemeSettings(settings)
    }
  }, [settings, isMounted])

  const applyThemeSettings = (newSettings: ThemeSettings) => {
    const root = document.documentElement

    // Apply color scheme
    root.setAttribute("data-theme", newSettings.colorScheme)

    // Apply accent colors
    const colors = accentColors[newSettings.accentColor]
    root.style.setProperty("--accent-primary", colors.primary)
    root.style.setProperty("--accent-secondary", colors.secondary)

    // Apply animation speed
    const speedMultiplier =
      newSettings.animationSpeed === "slow" ? 1.5 : newSettings.animationSpeed === "fast" ? 0.5 : 1
    root.style.setProperty("--animation-speed", speedMultiplier.toString())

    // Apply reduced motion
    if (newSettings.reducedMotion) {
      root.style.setProperty("--animation-duration", "0.01ms")
    } else {
      root.style.removeProperty("--animation-duration")
    }

    // Apply high contrast
    root.setAttribute("data-high-contrast", newSettings.highContrast.toString())

    // Apply additional text contrast for light mode
    if (newSettings.colorScheme === "light") {
      document.body.classList.add("light-mode-contrast")
    } else {
      document.body.classList.remove("light-mode-contrast")
    }
  }

  const updateSetting = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <>
      {/* Settings Button - positioned above back-to-top */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 sm:bottom-24 right-4 sm:right-8 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center z-40 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:-translate-y-1"
        aria-label="Open theme settings"
      >
        <Settings className="w-6 h-6 animate-spin-slow" />
      </button>

      {/* Settings Panel */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-80 glass-card transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Customize Experience</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:text-blue-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Color Scheme */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Color Scheme
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(["dark", "light", "auto"] as const).map((scheme) => (
                  <button
                    key={scheme}
                    onClick={() => updateSetting("colorScheme", scheme)}
                    className={`p-3 rounded-lg text-sm transition-all duration-300 ${
                      settings.colorScheme === scheme ? "bg-blue-500 text-white" : "glass-card hover:text-blue-500"
                    }`}
                  >
                    {scheme === "dark" && <Moon className="w-4 h-4 mx-auto mb-1" />}
                    {scheme === "light" && <Sun className="w-4 h-4 mx-auto mb-1" />}
                    {scheme === "auto" && <Monitor className="w-4 h-4 mx-auto mb-1" />}
                    {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Accent Color
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(accentColors) as Array<keyof typeof accentColors>).map((color) => (
                  <button
                    key={color}
                    onClick={() => updateSetting("accentColor", color)}
                    className={`p-3 rounded-lg text-sm transition-all duration-300 text-white ${
                      settings.accentColor === color ? "ring-2 ring-white" : "hover:scale-105"
                    }`}
                    style={{
                      backgroundColor: accentColors[color].primary,
                    }}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Animation Speed */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Animation Speed
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(["slow", "normal", "fast"] as const).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => updateSetting("animationSpeed", speed)}
                    className={`p-2 rounded-lg text-sm transition-all duration-300 ${
                      settings.animationSpeed === speed ? "bg-blue-500 text-white" : "glass-card hover:text-blue-500"
                    }`}
                  >
                    {speed.charAt(0).toUpperCase() + speed.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility Options */}
            <div className="space-y-4">
              <h3 className="font-medium">Accessibility</h3>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">Reduced Motion</span>
                <div
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    settings.reducedMotion ? "bg-blue-500" : "bg-white/20"
                  }`}
                  onClick={() => updateSetting("reducedMotion", !settings.reducedMotion)}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                      settings.reducedMotion ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">High Contrast</span>
                <div
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    settings.highContrast ? "bg-blue-500" : "bg-white/20"
                  }`}
                  onClick={() => updateSetting("highContrast", !settings.highContrast)}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                      settings.highContrast ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </div>
              </label>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                const defaultSettings: ThemeSettings = {
                  colorScheme: "dark",
                  accentColor: "blue",
                  animationSpeed: "normal",
                  reducedMotion: false,
                  highContrast: false,
                }
                setSettings(defaultSettings)
              }}
              className="w-full mt-6 p-3 glass-card rounded-lg hover:text-blue-500 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
