"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Sun, Moon, Heart, Home } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Contact from "@/components/Contacts"

export default function ArticlesFooter() {
  
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const { theme, setTheme } = useTheme()
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null)
  const [serviceStatus, setServiceStatus] = useState<boolean>(true)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())

    // Calculate page load time
    if (typeof window !== "undefined" && window.performance) {
      // Use a more reliable method to calculate page load time
      let loadTime;
      
      if (performance.getEntriesByType && performance.getEntriesByType("navigation").length > 0) {
        // Modern browsers - use Navigation Timing API Level 2
        const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        loadTime = Math.round(navEntry.loadEventEnd);
      } else if (performance.timing) {
        // Fallback to older Navigation Timing API
        loadTime = Math.round(performance.timing.loadEventEnd - performance.timing.navigationStart);
      } else {
        // Simple fallback
        loadTime = Math.round(performance.now());
      }
      
      // Ensure we don't have negative values
      loadTime = loadTime > 0 ? loadTime : Math.round(performance.now());
      setPageLoadTime(loadTime)
      
      // Simulate service status check - in a real app, this would be an API call
      // This simulates a 99.9% uptime service
      const checkServiceStatus = () => {
        // 99.9% chance of being online (1 in 1000 chance of being offline)
        const isServiceUp = Math.random() < 0.999;
        setServiceStatus(isServiceUp);
      };
      
      // Initial check
      checkServiceStatus();
      
      // In a real app, you might periodically check the service status
      const interval = setInterval(checkServiceStatus, 60000); // Check every minute
      
      return () => {
        clearInterval(interval);
      }
    }
  }, [])

  const toggleTheme = () => {
    // Get current settings from localStorage
    const savedSettings = localStorage.getItem("theme-settings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        // Toggle the color scheme
        const newColorScheme = parsedSettings.colorScheme === 'dark' ? 'light' : 'dark'
        
        // Update settings
        const updatedSettings = {
          ...parsedSettings,
          colorScheme: newColorScheme
        }
        
        // Save back to localStorage
        localStorage.setItem("theme-settings", JSON.stringify(updatedSettings))
        
        // Apply the theme settings
        const root = document.documentElement
        root.setAttribute("data-theme", newColorScheme)
        
        // Apply additional text contrast for light mode
        if (newColorScheme === "light") {
          document.body.classList.add("light-mode-contrast")
        } else {
          document.body.classList.remove("light-mode-contrast")
        }
        
        // Update the theme state
        setTheme(newColorScheme)
      } catch (error) {
        console.error("Failed to parse theme settings from localStorage:", error)
        // Fallback to simple toggle
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }
    } else {
      // No settings found, use simple toggle
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }

  const socialLinks = [
    { name: "GitHub", href: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Quantumania23", icon: <Github className="w-5 h-5" /> },
    { name: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/mike-mutuku-0a243a1bb/", icon: <Image src={'/In.gif'} alt="LinkedIn" width={1} height={1} className="w-6 h-6" /> },
    { name: "Twitter", href: process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/Mikepeace981", icon: <Twitter className="w-5 h-5" /> },
    {
      name: "Email",
      onClick: () => setIsContactPopupOpen(true),
      icon: <Image src={'/Email.gif'} alt="Email" width={1} height={1} className="w-5 h-5" />
    },
  ];

  return (
    <footer className="py-12 px-6 relative">
      <div className="container mx-auto w-full sm:max-w-6xl px-2 sm:px-6">
        {/* Main Footer Content */}
        <div className="glass-card p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Logo & Info */}
            <div>
              <Link
                href="/"
                className="text-2xl font-bold mb-4 inline-block text-transparent"
                style={{
                  backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Mike Peace
              </Link>
              <p className="text-[#b4bcd0] mb-4">
                Software Engineer specializing in creating exceptional digital experiences.
              </p>
              <div className="flex items-center text-[#b4bcd0] mb-4">
                <span className="flex items-center">
                  Made with <Heart className="w-4 h-4 text-[#ff6b6b] mx-1" fill="#ff6b6b" /> by Q23 Studios.
                </span>
              </div>

              {/* Home Link */}
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-[#b4bcd0] hover:text-[#00d4ff] transition-colors duration-300"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>

            {/* Social Links & Theme Toggle */}
            <div className="flex flex-col space-y-6">
              {/* Social Links */}
              <div>
                <h3 className="font-bold mb-4">Connect</h3>
                <div className="flex space-x-3">
                  {socialLinks.map((link) =>
                    link.name === "Email" ? (
                      <button
                        key={link.name}
                        onClick={link.onClick}
                        className="glass-card p-2 rounded-lg hover:text-[#00d4ff] transition-all duration-300 hover:scale-110"
                        aria-label={link.name}
                        type="button"
                      >
                        {link.icon}
                      </button>
                    ) : (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-2 rounded-lg hover:text-[#00d4ff] transition-all duration-300 hover:scale-110"
                        aria-label={link.name}
                      >
                        {link.icon}
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Theme Toggle */}
              <div>
                <h3 className="font-bold mb-4">Preferences</h3>
                <button
                  onClick={toggleTheme}
                  className="glass-card px-4 py-2 rounded-lg flex items-center hover:text-[#00d4ff] transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  {theme === 'dark' ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#b4bcd0]">
          <div>© {currentYear} Mike Peace. All rights reserved.</div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            {/* Service Status Indicator */}
            <span className="glass-card px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${serviceStatus ? 'bg-[#008855] animate-pulse' : 'bg-red-500'}`}></span>
              <span className="flex items-center">
                {serviceStatus ? 'Online' : 'Offline'}
              </span>
            </span>
            
            {/* Page Load Time */}
            {pageLoadTime && (
              <span className="glass-card px-3 py-1 rounded-full text-xs">
                Page loaded in {pageLoadTime < 1000 ? `${pageLoadTime}ms` : `${(pageLoadTime / 1000).toFixed(2)}s`}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Contact Popup */}
      {isContactPopupOpen && (
        <Contact handleClose={() => setIsContactPopupOpen(false)} />
      )}
    </footer>
  )
}