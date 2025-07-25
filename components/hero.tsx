"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, ExternalLink, Code, Sparkles, FileText, Play, Pause } from "lucide-react"
import Hero3DScene from "./hero-3d-scene"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  // Typing animation for the main text
  const [displayText, setDisplayText] = useState("")
  const fullText = "Building digital experiences that matter"
  
  useEffect(() => {
    if (!isMounted) return
    
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    
    return () => clearInterval(timer)
  }, [isMounted])

  // Handle mouse movement for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    setIsMounted(true)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      ref={containerRef}
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1c] via-[#1a1f2e] to-[#0a0f1c]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Text content */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-12 pt-20 lg:pt-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm w-fit"
            variants={itemVariants}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            <span className="text-sm text-white/70">Available for opportunities</span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-6xl lg:text-8xl font-bold text-white leading-none">
              Mike
              <br />
              <span className="text-transparent bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text">
                Peace
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-xl lg:text-2xl text-[#00d4ff] font-medium">
              Software Engineer
            </h2>
            <p className="text-white/60">
              Currently at Q23 Studios
            </p>
          </motion.div>

          {/* Animated description */}
          <motion.div variants={itemVariants} className="py-6">
            <p className="text-2xl lg:text-3xl text-white/90 font-light leading-relaxed">
              {displayText}
              <span className="animate-blink">|</span>
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.a
              href="#projects"
              className="group relative overflow-hidden rounded-xl px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-medium transition-all duration-300"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                View My Work
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.a>

            <motion.a
              href={process.env.NEXT_PUBLIC_RESUME_LINK || "https://docs.google.com/document/d/1AOGztSR1ueyTft4dnFpBEes6r7cZpq-hEw53EDtiG6M/edit?usp=sharing"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl border-2 border-white/20 px-8 py-4 text-white transition-all duration-300 hover:border-white/40"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                View Resume
                <FileText className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
              </span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="pt-8">
            <div className="flex flex-wrap gap-8 text-sm text-white/60">
              <div>
                <div className="text-2xl font-bold text-white">25+</div>
                <div>Months Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">KES 1.1B+</div>
                <div>Business Impact</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">12+</div>
                <div>Organizations</div>
              </div>
            </div>
          </motion.div>

          {/* 3D Scene control */}
          <motion.div variants={itemVariants} className="pt-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm">{isPlaying ? 'Pause' : 'Play'} Animation</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right side - 3D Scene */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0">
            <Hero3DScene />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <button
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors duration-300"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.section>
  )
}
