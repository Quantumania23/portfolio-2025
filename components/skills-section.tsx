"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Database, Cloud, Server, Beaker, FileCode, Languages, Layers } from "lucide-react"

interface SkillCategory {
  name: string
  icon: React.ReactNode
  skills: string[]
  color: string
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("Languages")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skillCategories: SkillCategory[] = [
    {
      name: "Languages",
      icon: <Languages className="w-4 h-4" />,
      color: "bg-blue-500",
      skills: ["HTML5", "CSS3", "Python", "JavaScript (ES6)", "TypeScript", "GraphQL", "MongoDB", "C++", "SQL"],
    },
    {
      name: "Frameworks & Libraries",
      icon: <Layers className="w-4 h-4" />,
      color: "bg-emerald-500",
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "Unreal Engine",
        "Three.js",
        "ShadCn",
        "FastAPI",
        "Bootstrap5",
        "TailwindCSS",
        "Material UI",
      ],
    },
    {
      name: "DevOps & Tools",
      icon: <Server className="w-4 h-4" />,
      color: "bg-purple-500",
      skills: ["Git", "GitHub", "GitLab", "CircleCI", "GitHub Actions", "Docker"],
    },
    {
      name: "Cloud Platforms",
      icon: <Cloud className="w-4 h-4" />,
      color: "bg-sky-500",
      skills: ["AWS", "Azure", "Digital Ocean"],
    },
    {
      name: "Databases",
      icon: <Database className="w-4 h-4" />,
      color: "bg-amber-500",
      skills: ["MySQL", "PostgreSQL", "MongoDB"],
    },
    {
      name: "Testing",
      icon: <Beaker className="w-4 h-4" />,
      color: "bg-rose-500",
      skills: ["Cypress", "Pytest", "RTL", "Pact", "Jest"],
    },
    {
      name: "CMS & Others",
      icon: <FileCode className="w-4 h-4" />,
      color: "bg-indigo-500",
      skills: ["Sanity", "Shopify", "HygraphCMS", "RabbitMQ"],
    },
  ]

  const activeSkills = skillCategories.find((category) => category.name === activeCategory)?.skills || []

  // Animation variants - removed delays for better UX
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0, // Removed stagger delay
        duration: 0.1, // Faster transition
      },
    },
  }

  const skillVariants = {
    hidden: { opacity: 0, y: 0 }, // Removed y offset for instant appearance
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.1 } // Fast transition
    },
  }

  return (
    <div className="container mx-auto max-w-6xl px-6">
      <div className="bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden shadow-xl">
        {/* Category Navigation */}
        <div className="flex overflow-x-auto scrollbar-hide py-2 px-2 bg-slate-800/50 border-b border-slate-700/50">
          {skillCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 mr-2 ${
                activeCategory === category.name
                  ? `${category.color} text-white shadow-lg`
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {category.icon}
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="p-6">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {activeSkills.map((skill) => {
              const category = skillCategories.find((c) => c.name === activeCategory)!

              return (
                <motion.div
                  key={skill}
                  variants={skillVariants}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`relative rounded-lg p-3 transition-all duration-300 border border-transparent ${
                    hoveredSkill === skill
                      ? `border-${category.color.split("-")[1]}-500/50 bg-slate-800/80`
                      : "bg-slate-800/40 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${category.color}`}
                      style={{
                        boxShadow: hoveredSkill === skill ? `0 0 12px 0 ${category.color.replace("bg-", "")}` : "none",
                      }}
                    />
                    <span className="text-sm font-medium text-white">{skill}</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
