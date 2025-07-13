"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, Users, MapPin, ExternalLink, Filter, Share2, Clock, Award, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import GradientMagicButton from "./gradient-magic-button"
import Contact from "./Contacts"


// Types for different activities
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
  audienceSize?: number
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
  logo?: string
}

interface VolunteeringActivity {
  id: number
  title: string
  organization: string
  duration: string
  focus: string
  description: string
  impact?: string
  icon: string
  logo?: string
}

// Data for speaking engagements
const speakingEvents: SpeakingEvent[] = [
  {
    id: 1,
    title: "Software Quality Conference 2027",
    topic: "Contract Testing with Pact - Robust Alternative to Integration Testing",
    date: "February 2027",
    year: 2027,
    audience: "Software Engineers & QA Professionals",
    type: "conference",
    description:
      "Presented advanced contract testing strategies using Pact framework, demonstrating how to implement consumer-driven contracts for microservices architecture. Focused on improving deployment flexibility and reducing integration testing overhead.",
    location: "Radison Blu, Nairobi, Kenya",
    eventUrl: "https://www.linkedin.com/",
    slidesUrl: "https://www.canva.com/",
    audienceSize: 100,
  },
  {
    id: 2,
    title: "Safaricom Engineering Summit",
    topic: "Getting Started with Daraja 2.0 API",
    date: "July 2026",
    year: 2026,
    audience: "Internal Engineering Teams",
    type: "workshop",
    description:
      "Conducted comprehensive workshop on Safaricom's Daraja 2.0 API, covering integration patterns, best practices, and troubleshooting techniques for mobile money integration.",
    impact: "Workshop documentation now used by other teams across the organization",
    location: "Sarit Expo Centre, Nairobi",
    audienceSize: 200,
  },
  {
    id: 3,
    title: "PyConKE 2026",
    topic: "Effective Testing of Python Applications using Pytest",
    date: "June 2026",
    year: 2026,
    audience: "Python Developers in Kenya",
    type: "community",
    description:
      "Delivered a comprehensive talk on Python testing frameworks, covering pytest, unittest, and testing best practices for scalable applications. Demonstrated advanced pytest features and patterns for maintainable test suites.",
    location: "USIU, Nairobi",
    eventUrl: "https://sessionize.com/",
    slidesUrl: "https://example.com/slides/python-testing",
    audienceSize: 50,
  },
  {
    id: 4,
    title: "Google I/O 2026 Extended Nairobi",
    topic: "Leveraging Google's Dialogflow to Automate Conversational Applications",
    date: "July 2026",
    year: 2026,
    audience: "Student Developers",
    type: "workshop",
    description:
      "Led a hands-on workshop for student developers on building conversational interfaces using Google's Dialogflow. Participants created a functional chatbot by the end of the session with practical knowledge of NLP concepts.",
    location: "KCA University, Nairobi",
    eventUrl: "https://sessionize.com/",
    audienceSize: 50,
  },
]

// Data for community leadership roles
const communityRoles: CommunityRole[] = [
  {
    id: 1,
    title: "AWS Community Builder",
    organization: "Amazon Web Services",
    duration: "In Progress",
    role: "Technical advocate and knowledge sharing",
    focus: "Front-End Web & Mobile development",
    description:
      "Will be selected as an AWS Community Builder focusing on frontend and mobile development whilst contributing to community knowledge sharing through technical content, workshops, and mentoring.",
    icon: "☁️",
    logo: "/aws-logo.png",
  },
  {
    id: 2,
    title: "Microsoft Learn Student Ambassador",
    organization: "Microsoft",
    duration: "In Progress",
    role: "Gold Student Ambassador",
    focus: "Student community building and tech education",
    description:
      "Will be serving as a Gold Microsoft Learn Student Ambassador, organizing workshops, hackathons, and training sessions to empower students with Microsoft technologies. Mentoring junior ambassadors and facilitating community growth.",
    icon: "🪟",
    logo: "/microsoft-logo.png",
  },
  {
    id: 3,
    title: "Google Developer Student Club Team Lead",
    organization: "Google Developers",
    duration: "In Progress",
    role: "Community Lead",
    focus: "Organizing tech events and workshops",
    description:
      "Led the Google Developer Student Club at my learning institute, organizing technical workshops, coding sessions, and developer meetups. Facilitated learning opportunities in mobile development, web technologies, and cloud computing.",
    icon: "🔍",
    logo: "/google-developers-logo.png",
  },
]

// Data for volunteering activities
const volunteeringActivities: VolunteeringActivity[] = [
  {
    id: 1,
    title: "Youth leader & Graphic Designer",
    organization: "Deliverance Church Kariobangi",
    duration: "July 2022 - Present",
    focus: "Empowering youthful minds in technology and design",
    description:
      "Serving as a graphic designer for Deliverance Church for over 1.5 years, guiding youths in software development and design principles. Created visual assets for educational content and marketing materials.",
    impact: "Boosted social media engagement with consistent, professional design assets that strengthened the Church's brand presence",
    icon: "🎨",
    logo: "https://maps.app.goo.gl/rAzb7HT7wUK16LL89",
  },
  {
    id: 2,
    title: "Technical Writer",
    organization: "Q23 Studdios",
    duration: "May 2022 - Present",
    focus: "Creating technical content for an up and coming company",
    description:
      "Contributing technical articles and tutorials to support techies across Africa. Topics include web development for underrepresented groups in tech.",
    impact: "Articles reached some readers, contributing to increased participation in tech events",
    icon: "✍️",
    logo: "/Q23.jpeg",
  },
  {
    id: 3,
    title: "Author",
    organization: "freeCodeCamp & Medium",
    duration: "September 2022 - Present",
    focus: "Educational content creation",
    description:
      "Created in-depth technical tutorials and articles for freeCodeCamp's publication, focusing on web development, Python, and cloud technologies. Contributed to making technical education accessible to learners worldwide.",
    impact: "Published 2 articles with a substantial amount of views",
    icon: "📝",
    logo: "/freeCodeCamp-logo.png",
  },
]

// Event types and years for filtering
const eventTypes = ["All", "Conference", "Workshop", "Community"]
const years = ["All", "2027", "2026"]

type TabType = "speaking" | "leadership" | "volunteering"

export default function CommunityImpact() {
  const [activeTab, setActiveTab] = useState<TabType>("speaking")
  const [activeFilter, setActiveFilter] = useState("All")
  const [activeYear, setActiveYear] = useState("All")
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [filteredEvents, setFilteredEvents] = useState(speakingEvents)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false);
    const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Set content to be immediately visible when component mounts
  useEffect(() => {
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

  const handleTabChange = (tab: TabType) => {
    setIsLoading(true)
    setActiveTab(tab)

    // Reset filters when changing tabs
    setActiveFilter("All")
    setActiveYear("All")
    setExpandedCard(null)

    // Simulate loading for smoother transitions
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
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

  const handleContactPopupOpen = () => {
    setIsContactPopupOpen(true);
  };

  const handleContactPopupClose = () => {
    setIsContactPopupOpen(false);
  };

  return (
    <section
      id="community"
      className="community-impact-section min-h-screen py-12 md:py-24 px-2 md:px-6 relative"
      ref={containerRef}
    >
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

      <div className="container mx-auto w-full sm:max-w-6xl px-2 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 md:mb-16 mt-4 md:mt-0 text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              color: "var(--accent-primary)",
              transform: `translate(${moveX * -0.3}px, ${moveY * -0.3}px)`,
              transition: "transform 0.3s ease",
            }}
          >
            Community Impact & Leadership
          </h2>
          <p className="text-[#b4bcd0] text-lg max-w-2xl mx-auto">
            Speaking engagements, community contributions, and volunteering activities
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-6 md:mb-8 gap-1 md:gap-2">
          <button
            onClick={() => handleTabChange("speaking")}
            className={cn(
              "flex items-center space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105",
              activeTab === "speaking" ? "text-[#0a0f1c]" : "glass-card hover:text-[#00d4ff]",
            )}
            style={
              activeTab === "speaking"
                ? { backgroundColor: "var(--accent-primary)" }
                : {}
            }
          >
            <Award className="w-5 h-5" style={activeTab === "speaking" ? { color: '#ffff' } : {}} />
            <span className="hidden sm:inline" style={activeTab === "speaking" ? { color: '#ffff' } : {}}>Speaking Engagements</span>
            <span className="sm:hidden" style={activeTab === "speaking" ? { color: '#ffff' } : {}}>Speaking</span>
          </button>

          <button
            onClick={() => handleTabChange("leadership")}
            className={cn(
              "flex items-center space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105",
              activeTab === "leadership" ? "text-[#ffff]" : "glass-card hover:text-[#00d4ff]",
            )}
            style={
              activeTab === "leadership"
                ? { backgroundColor: "var(--accent-primary)" }
                : {}
            }
          >
            <Users className="w-5 h-5" />
            <span className="hidden sm:inline" style={activeTab === "leadership" ? { color: '#ffff' } : {}}>Community Leadership</span>
            <span className="sm:hidden" style={activeTab === "leadership" ? { color: '#ffff' } : {}}>Leadership</span>
          </button>

          <button
            onClick={() => handleTabChange("volunteering")}
            className={cn(
              "flex items-center space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105",
              activeTab === "volunteering" ? "text-[#ffff]" : "glass-card hover:text-[#00d4ff]",
            )}
            style={
              activeTab === "volunteering"
                ? { backgroundColor: "var(--accent-primary)" }
                : {}
            }
          >
            <Heart className="w-5 h-5" style={activeTab === "volunteering" ? { color: '#ffff' } : {}} />
            <span className="hidden sm:inline" style={activeTab === "volunteering" ? { color: '#ffff' } : {}}>Volunteering & Mentorship</span>
            <span className="sm:hidden" style={activeTab === "volunteering" ? { color: '#ffff' } : {}}>Volunteering</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[500px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="glass-card p-8 rounded-lg">
                <div className="w-12 h-12 border-4 border-t-[#00d4ff] border-r-[#00d4ff] border-b-[#00ff88] border-l-[#00ff88] rounded-full animate-spin"></div>
              </div>
            </div>
          )}

          {/* Speaking Engagements Tab */}
          <div
            className={cn(
              "transition-all duration-300",
              activeTab === "speaking" && !isLoading
                ? "opacity-100"
                : "absolute opacity-0 pointer-events-none",
            )}
          >
            {/* Filters */}
            <div className="mb-6 md:mb-12 px-4">
            
              {/* Event Type Filters */}
              <div className="mb-6 glass-card p-4 rounded-lg">
                <h4 className="text-sm font-medium text-[#b4bcd0] mb-3 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Event Type
                </h4>
                <div className="flex flex-wrap gap-2 mt-4">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveFilter(type)}
                      className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 hover:scale-105 ${
                        activeFilter === type ? "text-[#ffff]" : "glass-card hover:text-[#00d4ff]"
                      }`}
                      style={
                        activeFilter === type
                        ? { backgroundColor: "var(--accent-primary)" }

                          : {}
                      }
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filters */}
              <div className="glass-card p-4 rounded-lg">
                <h4 className="text-sm font-medium text-[#b4bcd0] mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Filter by Year
                </h4>
                <div className="flex flex-wrap gap-2 mt-4">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setActiveYear(year)}
                      className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 hover:scale-105 ${
                        activeYear === year ? "text-[#ffff]" : "glass-card hover:text-[#00d4ff]"
                      }`}
                      style={
                        activeYear === year
                          ? {
                              backgroundColor: "var(--accent-primary)",
                            }
                          : {}
                      }
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Speaking Events Timeline */}
            <div className="relative">
              {/* Timeline container with proper positioning */}
              <div className="community-timeline-container relative">
                {/* Timeline Line - positioned relative to container */}
                <div
                  className="community-timeline-line absolute top-0 w-1 bg-gradient-to-b from-[#00d4ff] to-[#00ff88] opacity-50"
                  style={{
                    left: isMounted && window.innerWidth < 768 ? "16px" : "24px",
                    height: "100%",
                    zIndex: 1,
                  }}
                />

                {/* Timeline Events */}
                <div className="space-y-8 pl-8 md:pl-16">
                  {filteredEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="community-timeline-item relative"
                    >
                      {/* Event indicator dot - positioned relative to the timeline line */}
                      <div
                        className="community-timeline-dot absolute w-8 h-8 rounded-full border-2 border-white"
                        style={{
                          backgroundColor: getEventTypeColor(event.type),
                          boxShadow: `0 0 10px ${getEventTypeColor(event.type)}`,
                          top: "24px",
                          left: isMounted && window.innerWidth < 640 ? "-18px" : "-42px", // Responsive positioning for mobile
                          zIndex: 2,
                        }}
                      />

                      <div
                        className="glass-card overflow-hidden cursor-pointer transition-colors duration-300 hover:border-[var(--accent-primary)] hover:shadow-sm"
                        onClick={() => toggleCard(event.id)}
                        onKeyDown={(e) => e.key === 'Enter' && toggleCard(event.id)}
                        tabIndex={0}
                        role="button"
                        aria-expanded={expandedCard === event.id}
                      >
                        {/* Rest of the card content remains the same */}
                        <div className="p-4 md:p-6">
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

                          <div className="flex flex-wrap items-center gap-4 text-[#b4bcd0] text-sm">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{event.audience}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            {event.audienceSize && (
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{event.audienceSize}+ attendees</span>
                              </div>
                            )}
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

              {/* No Results */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-16 glass-card p-8">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-2">No events found</h3>
                  <p className="text-[#b4bcd0]">Try adjusting your filters or check back later for updates</p>
                </div>
              )}
            </div>
          </div>

          {/* Community Leadership Tab */}
          <div
            className={cn(
              "transition-all duration-300",
              activeTab === "leadership" && !isLoading
                ? "opacity-100"
                : "absolute opacity-0 pointer-events-none",
            )}
          >
            <div className="grid md:grid-cols-1 gap-8">
              {communityRoles.map((role, index) => (
                <div
                  key={role.id}
                  className="glass-card p-4 md:p-6 lg:p-8 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Organization Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg glass-card flex items-center justify-center overflow-hidden">
                        {role.logo ? (
                          <img
                            src={role.logo || "/placeholder.svg"}
                            alt={role.organization}
                            className="w-16 h-16 object-contain"
                          />
                        ) : (
                          <span className="text-4xl">{role.icon}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h4 className="text-2xl font-semibold mb-1">{role.title}</h4>
                          <p className="text-[#00d4ff] font-medium">{role.organization}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <div className="flex items-center space-x-2 text-[#b4bcd0]">
                            <Clock className="w-4 h-4" />
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

            {/* Leadership Stats */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: "0.6s",
              }}
            >
              <div className="glass-card p-6 text-center">
                <div
                  className="text-3xl font-bold mb-2 text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  3+
                </div>
                <p className="text-[#b4bcd0] text-sm">Years in Community Leadership</p>
              </div>

              <div className="glass-card p-6 text-center">
                <div
                  className="text-3xl font-bold mb-2 text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  3
                </div>
                <p className="text-[#b4bcd0] text-sm">Major Tech Communities</p>
              </div>

              <div className="glass-card p-6 text-center">
                <div
                  className="text-3xl font-bold mb-2 text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  500+
                </div>
                <p className="text-[#b4bcd0] text-sm">Community Members Impacted</p>
              </div>
            </div>
          </div>

          {/* Volunteering & Mentorship Tab */}
          <div
            className={cn(
              "transition-all duration-300",
              activeTab === "volunteering" && !isLoading
                ? "opacity-100"
                : "absolute opacity-0 pointer-events-none",
            )}
          >
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {volunteeringActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="glass-card p-4 md:p-6 lg:p-8 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg glass-card flex items-center justify-center overflow-hidden">
                        {activity.logo ? (
                          <img
                            src={activity.logo ?? "/placeholder.svg"}
                            alt={activity.organization}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <span className="text-3xl">{activity.icon}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-semibold mb-1">{activity.title}</h4>
                          <p className="text-[#00d4ff]">{activity.organization}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <div className="flex items-center space-x-2 text-[#b4bcd0] text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="mb-2">
                          <span className="text-[#00ff88] font-medium text-sm">Focus: </span>
                          <span className="text-[#b4bcd0] text-sm">{activity.focus}</span>
                        </div>
                        <p className="text-[#b4bcd0] text-sm leading-relaxed mb-3">{activity.description}</p>

                        {activity.impact && (
                          <div className="glass-card p-3 mt-3">
                            <h5 className="font-medium text-[#00ff88] text-sm mb-1">Impact:</h5>
                            <p className="text-[#b4bcd0] text-sm">{activity.impact}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Volunteering Impact Summary */}
            <div
              className="glass-card p-8 mt-12"
            >
              <h3 className="text-xl font-bold mb-4 text-center">Volunteering Impact Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div
                    className="text-3xl font-bold mb-2 text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    2+ Years
                  </div>
                  <p className="text-[#b4bcd0] text-sm">Active Volunteering</p>
                </div>

                <div>
                  <div
                    className="text-3xl font-bold mb-2 text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    Some Individuals
                  </div>
                  <p className="text-[#b4bcd0] text-sm">Directly Impacted</p>
                </div>

                <div>
                  <div
                    className="text-3xl font-bold mb-2 text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, #00d4ff, #00ff88)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    50+ Views
                  </div>
                  <p className="text-[#b4bcd0] text-sm">Educational Content</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="glass-card rounded-xl overflow-hidden p-4 md:p-8 mt-8 md:mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Interested in Collaboration?</h3>
          <p className="text-[#b4bcd0] mb-6 max-w-2xl mx-auto">
            I'm always open to speaking opportunities, community initiatives, and mentorship. Let's connect and make an
            impact together.
          </p>
          <GradientMagicButton
                  onClick={handleContactPopupOpen}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                  style={{ color: "#ffff" }}
                  accentColor="primary"
                >
                  <Users className="w-5 h-5" />
                  <span>Get in Touch</span>
                </GradientMagicButton>
        </div>
      </div>
      <div className="community-section-end"></div>
      {/* Contact Form Popup */}
      {isContactPopupOpen && <Contact handleClose={handleContactPopupClose} />}
    </section>
  )
}
