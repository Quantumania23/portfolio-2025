"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Database, Cloud, Server, Beaker, FileCode, Languages } from "lucide-react"

interface SkillCategory {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  skills: string[]
}

export default function SkillsSidebarLayout() {
  const [activeCategory, setActiveCategory] = useState("languages")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const skillCategories: SkillCategory[] = [
    {
      id: "languages",
      name: "Languages",
      icon: <Languages className="w-5 h-5" />,
      description: "Core programming languages and markup technologies I use daily",
      skills: ["HTML5", "CSS3", "C++", "JavaScript (ES6)", "TypeScript", "MongoDB", "GraphQl", "C++", "SQL"],
    },
    {
      id: "frameworks",
      name: "Frameworks & Libraries",
      icon: <Code className="w-5 h-5" />,
      description: "Modern frameworks and libraries for building scalable applications",
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
      id: "devops",
      name: "DevOps & Tools",
      icon: <Server className="w-5 h-5" />,
      description: "Version control, CI/CD, and containerization tools",
      skills: ["Git", "GitHub", "GitLab", "CircleCI", "GitHub Actions", "Docker"],
    },
    {
      id: "cloud",
      name: "Cloud Platforms",
      icon: <Cloud className="w-5 h-5" />,
      description: "Cloud services and deployment platforms",
      skills: ["AWS", "Azure", "Digital Ocean"],
    },
    {
      id: "databases",
      name: "Databases",
      icon: <Database className="w-5 h-5" />,
      description: "Database systems for data storage and management",
      skills: ["MySQL", "PostgreSQL", "MongoDB"],
    },
    {
      id: "testing",
      name: "Testing Tools",
      icon: <Beaker className="w-5 h-5" />,
      description: "Testing frameworks and tools for quality assurance",
      skills: ["Cypress", "Pytest", "RTL", "Pact", "Jest"],
    },
    {
      id: "cms",
      name: "CMS & Others",
      icon: <FileCode className="w-5 h-5" />,
      description: "Content management systems and additional technologies",
      skills: ["Sanity", "Shopify", "HygraphCMS", "RabbitMQ", "WordPress"],
    },
  ]

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return

    setIsLoading(true)
    setActiveCategory(categoryId)

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent, categoryId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleCategoryChange(categoryId)
    }
  }

  // Filter categories based on search query
  const filteredCategories = skillCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get current category
  const currentCategory = skillCategories.find((category) => category.id === activeCategory)

  return (
    <div className="skills-section-container flex max-w-[95%] mx-auto my-8 bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl">
      {/* Left Sidebar */}
      <div className="skills-sidebar w-[30%] bg-white/[0.05] border-r border-white/10 p-8 h-[500px] overflow-y-auto backdrop-blur-md">
        <h3 className="sidebar-header text-lg font-semibold text-white mb-6 pb-2 border-b border-white/10">
          Skill Categories
        </h3>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        {/* Category List */}
        <nav className="space-y-2">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              onKeyDown={(e) => handleKeyDown(e, category.id)}
              className={`skill-category-item block w-full text-left py-4 px-6 mb-2 text-slate-400 rounded-lg transition-all duration-300 cursor-pointer border-l-[3px] border-transparent hover:bg-white/[0.05] hover:text-white hover:translate-x-1 ${
                activeCategory === category.id ? "bg-blue-500/10 text-blue-500 border-l-blue-500" : ""
              }`}
              aria-selected={activeCategory === category.id}
              tabIndex={0}
            >
              <div className="flex items-center gap-3">
                {category.icon}
                <span>{category.name}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Right Content Area */}
      <div ref={contentRef} className="skills-content-area w-[70%] p-8 min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Skeleton Loading State
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <div className="h-8 w-48 bg-white/10 rounded-md mb-4 animate-pulse"></div>
              <div className="h-4 w-full bg-white/5 rounded-md mb-8 animate-pulse"></div>
              <div className="flex flex-wrap gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-10 w-24 bg-white/5 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {currentCategory && (
                <>
                  <h2 className="skills-category-title text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                    {currentCategory.icon}
                    {currentCategory.name}
                  </h2>

                  <p className="skills-category-description text-slate-400 mb-8 leading-relaxed">
                    {currentCategory.description}
                  </p>

                  <div className="skills-grid flex flex-wrap gap-3">
                    {currentCategory.skills.map((skill) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="skill-chip bg-white/[0.08] border border-white/15 rounded-xl px-5 py-2.5 text-white text-sm font-medium transition-all duration-300 cursor-default hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/15"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
