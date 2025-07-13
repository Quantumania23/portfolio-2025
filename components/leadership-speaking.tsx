"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, Users, MapPin, ExternalLink, GraduationCap, Filter, Share2 } from "lucide-react"

interface SpeakingEvent {
  id: number
  title: string
  topic: string
  date: string
  year: number
  audience: string
  type: "conference" | "workshop" | "community"
  description: string
  impact?: string
  eventUrl?: string
  slidesUrl?: string
  location: string
}

interface CommunityRole {
  id: number
  title: string
  organization: string
  duration: string
  role: string
  focus: string
  description: string
  icon: string
}

interface Education {
  id: number
  degree: string
  honors: string
  institution: string
  duration: string
  description: string
}

const speakingEvents: SpeakingEvent[] = [
  {
    id: 1,
    title: "Software Quality Conference 2027",
    topic: "Contract Testing with Pact",
    date: "February 2027",
    year: 2027,
    audience: "Software Engineers & QA Professionals",
    type: "conference",
    description:
      "Presented advanced contract testing strategies using Pact framework, demonstrating how to implement consumer-driven contracts for microservices architecture.",
    location: "Nairobi, Kenya",
    eventUrl: "https://example.com/sqc2024",
    slidesUrl: "https://example.com/slides/pact-testing",
  },
  {
    id: 2,
    title: "Safaricom Engineering Summit",
    topic: "Workshop on Safaricom Daraja 3.0 API",
    date: "July 2026",
    year: 2026,
    audience: "Internal Engineering Teams",
    type: "workshop",
    description:
      "Conducted comprehensive workshop on Safaricom's Daraja 2.0 API, covering integration patterns, best practices, and troubleshooting techniques.",
    impact: "Documentation now used by other teams across the organization",
    location: "Safaricom HQ, Nairobi",
  },
  {
    id: 3,
    title: "7th Annual PyConKE Conference",
    topic: "Effective Testing with Python",
    date: "May 2026",
    year: 2026,
    audience: "Python Developers in Kenya",
    type: "community",
    description:
      "Delivered a comprehensive talk on Python testing frameworks, covering pytest, unittest, and testing best practices for scalable applications.",
    location: "University of Nairobi",
    eventUrl: "https://pycon.or.ke/2026",
    slidesUrl: "https://example.com/slides/python-testing",
  },
]

const communityRoles: CommunityRole[] = [
  {
    id: 1,
    title: "AWS Community Builder",
    organization: "Amazon Web Services",
    duration: "In Progress",
    role: "Technical advocate and knowledge sharing",
    focus: "Front-End Web & Mobile",
    description:
      "Will be selected as an AWS Community Builder focusing on frontend and mobile development whilst contributing to community knowledge sharing through technical content, workshops, and mentoring.",
    icon: "☁️",
  },
]

const education: Education[] = [
  {
    id: 1,
    degree: "Diploma in Software Engineering",
    honors: "With Distinction",
    institution: "Nairobits Trust",
    duration: "2022 - 2023",
    description:
      "Comprehensive program combining business acumen with technical expertise in information technology, software development, multidisciplinary design and systems analysis.",
  },
]

const eventTypes = ["All", "Conference", "Workshop", "Community"]
const years = ["All", "2027", "2026"]

export default function LeadershipSpeaking() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [activeYear, setActiveYear] = useState("All")
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [filteredEvents, setFilteredEvents] = useState(speakingEvents)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter events based on type and year
  useEffect(() => {
    let filtered = speakingEvents

    if (activeFilter !== "All") {
      filtered = filtered.filter((event) => event.type === activeFilter.toLowerCase())
    }

    if (activeYear !== "All") {
      filtered = filtered.filter((event) => event.year.toString() === activeYear)
    }

    setFilteredEvents(filtered)
  }, [activeFilter, activeYear])

  // Set content to be immediately visible without waiting for scroll
  useEffect(() => {
    // Immediately set content to visible without waiting for scroll
    setIsVisible(true)
  }, [])

  // Mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const moveX = mousePosition.x * 10 - 5
  const moveY = mousePosition.y * 10 - 5

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "conference":
        return "#00d4ff"
      case "workshop":
        return "#00ff88"
      case "community":
        return "#ffd700"
      default:
        return "#00d4ff"
    }
  }

  const shareEvent = (event: SpeakingEvent) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `${event.topic} - ${event.date}`,
        url: event.eventUrl || window.location.href,
      })
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(event.eventUrl || window.location.href)
    }
  }

  return (
    <section id="leadership" className="min-h-screen py-24 px-6 relative" ref={containerRef}>
      {/* Subtle spotlight effect */}
      <div
        className="absolute pointer-events-none w-[35vw] h-[35vw] rounded-full blur-3xl opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,212,255,0.15), rgba(0,255,136,0.15))",
          left: `calc(${mousePosition.x * 100}% - 17.5vw)`,
          top: `calc(${mousePosition.y * 100}% - 17.5vw)`,
          transition: "all 0.3s ease",
        }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              transform: `translate(${moveX * -0.3}px, ${moveY * -0.3}px)`,
              transition: "transform 0.3s ease",
            }}
          >
            Leadership & Community Impact
          </h2>
          <p className="text-[#b4bcd0] text-lg max-w-2xl mx-auto">
            Speaking engagements, community contributions, and educational achievements
          </p>
        </div>

        {/* Filters */}
        <div
          className={`mb-12 transform transition-all duration-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100"
          }`}
        >
          {/* Event Type Filters */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-[#b4bcd0] mb-3 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter by Event Type
            </h4>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 hover:scale-105 ${
                    activeFilter === type ? "text-[#0a0f1c] bg-[var(--accent-primary)]" : "glass-card hover:text-[#00d4ff]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filters */}
          <div>
            <h4 className="text-sm font-medium text-[#b4bcd0] mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Filter by Year
            </h4>
            <div className="flex flex-wrap gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 hover:scale-105 ${
                    activeYear === year ? "text-[#0a0f1c]" : "glass-card hover:text-[#00d4ff]"
                  }`}
                  style={activeYear === year ? { backgroundColor: "var(--accent-primary)", color: "#0a0f1c" } : {}}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Speaking Events Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Speaking Engagements</h3>

          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-8 top-0 w-1 bg-gradient-to-b from-[#00d4ff] to-[#00ff88] opacity-30"
              style={{
                height: `${filteredEvents.length * 250}px`,
              }}
            />

            {/* Timeline Events */}
            <div className="space-y-8 ml-20">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`transform transition-all duration-1000 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${0.2 + index * 0.1}s`,
                  }}
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute left-6 w-5 h-5 rounded-full border-2 border-white"
                    style={{
                      backgroundColor: getEventTypeColor(event.type),
                      boxShadow: `0 0 15px ${getEventTypeColor(event.type)}`,
                      marginTop: "24px",
                    }}
                  />

                  <div
                    className="glass-card overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => toggleCard(event.id)}
                  >
                    {/* Card Header */}
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span
                              className="px-2 py-1 text-xs font-medium rounded-full text-[#0a0f1c] capitalize"
                              style={{
                                backgroundColor: getEventTypeColor(event.type),
                              }}
                            >
                              {event.type}
                            </span>
                            <span className="text-[#b4bcd0] text-sm">{event.date}</span>
                          </div>
                          <h4 className="text-xl font-semibold mb-1">{event.title}</h4>
                          <p className="text-[#00d4ff] font-medium">{event.topic}</p>
                        </div>

                        <div className="flex items-center space-x-2 mt-4 md:mt-0">
                          {event.eventUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(event.eventUrl, "_blank")
                              }}
                              className="p-2 glass-card rounded-lg hover:text-[#00d4ff] transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              shareEvent(event)
                            }}
                            className="p-2 glass-card rounded-lg hover:text-[#00d4ff] transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-[#b4bcd0] text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{event.audience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        expandedCard === event.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-white/20 pt-4">
                          <p className="text-[#b4bcd0] mb-4 leading-relaxed">{event.description}</p>

                          {event.impact && (
                            <div className="mb-4">
                              <h5 className="font-medium text-[#00ff88] mb-2">Impact:</h5>
                              <p className="text-[#b4bcd0] text-sm">{event.impact}</p>
                            </div>
                          )}

                          {event.slidesUrl && (
                            <a
                              href={event.slidesUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 px-4 py-2 glass-card rounded-lg hover:text-[#00d4ff] transition-colors text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>View Slides</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Leadership */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Community Leadership</h3>

          <div className="grid md:grid-cols-1 gap-6">
            {communityRoles.map((role, index) => (
              <div
                key={role.id}
                className={`glass-card p-8 transform transition-all duration-1000 hover:scale-105 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${0.6 + index * 0.1}s`,
                }}
              >
                <div className="flex items-start space-x-6">
                  <div className="text-4xl">{role.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-semibold mb-1">{role.title}</h4>
                        <p className="text-[#00d4ff] font-medium">{role.organization}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <div className="flex items-center space-x-2 text-[#b4bcd0]">
                          <Calendar className="w-4 h-4" />
                          <span>{role.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[#00ff88] font-medium">Role: </span>
                        <span className="text-[#b4bcd0]">{role.role}</span>
                      </div>
                      <div>
                        <span className="text-[#00ff88] font-medium">Focus: </span>
                        <span className="text-[#b4bcd0]">{role.focus}</span>
                      </div>
                      <p className="text-[#b4bcd0] leading-relaxed">{role.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-center">Education</h3>

          <div className="grid md:grid-cols-1 gap-6">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`glass-card p-8 transform transition-all duration-1000 hover:scale-105 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${0.8 + index * 0.1}s`,
                }}
              >
                <div className="flex items-start space-x-6">
                  <div className="text-4xl">
                    <GraduationCap className="w-12 h-12 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-semibold mb-1">{edu.degree}</h4>
                        <p className="text-[#00ff88] font-medium">{edu.honors}</p>
                        <p className="text-[#00d4ff]">{edu.institution}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <div className="flex items-center space-x-2 text-[#b4bcd0]">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.duration}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[#b4bcd0] leading-relaxed">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
