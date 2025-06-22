"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  ExternalLink,
  Github,
  Share2,
  Code,
  Zap,
  Server,
  FileCode,
  Menu,
  ChevronDown,
  Languages,
  Database,
  Cloud,
  Beaker,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { motion } from "framer-motion";

interface SidebarItem {
  id: number;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  icon: React.ReactNode;
  dateUpdated?: string;
  // For projects
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  challenges?: string[];
  solutions?: string[];
  features?: string[];
  metrics?: string[];
  status?: string;
  difficulty?: string;
  image?: string;
  // For skills
  skills?: string[];
}

interface SidebarNavigationLayoutProps {
  items: SidebarItem[];
  categories?: string[];
  defaultSelected?: SidebarItem;
  sectionTitle: string;
  contentType: "projects" | "skills";
}

export default function SidebarNavigationLayout({
  items,
  categories = ["All"], // Provide default value
  defaultSelected,
  sectionTitle,
  contentType,
}: SidebarNavigationLayoutProps) {
  // Fix the error by ensuring we have proper default values and null checks

  // Update the useState initialization for selectedItem to handle empty arrays
  const [selectedItem, setSelectedItem] = useState<SidebarItem>(() => {
    // If defaultSelected is provided, use it
    if (defaultSelected) return defaultSelected;
    // Otherwise, use the first item if available
    if (items && items.length > 0) return items[0];
    // Fallback to a safe default if items is empty
    return {
      id: 0,
      title: "No items available",
      tagline: "",
      description: "",
      longDescription: "",
      category: "",
      icon: <Code />,
    };
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(items || []);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Filter items based on search and category
  // Update the useEffect for filtering to handle empty arrays
  useEffect(() => {
    if (!items || items.length === 0) {
      setFilteredItems([]);
      return;
    }

    let filtered = [...items];

    if (activeCategory !== "All") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (contentType === "projects" &&
            item.technologies?.some((tech) =>
              tech.toLowerCase().includes(searchQuery.toLowerCase())
            )) ||
          (contentType === "skills" &&
            item.skills?.some((skill) =>
              skill.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      );
    }

    setFilteredItems(filtered);

    // If the currently selected item is not in the filtered list, select the first one if available
    if (
      filtered.length > 0 &&
      !filtered.find((i) => i.id === selectedItem.id)
    ) {
      setSelectedItem(filtered[0]);
    }
  }, [activeCategory, searchQuery, selectedItem.id, items, contentType]);

  // Always set content to visible immediately without waiting for scroll
  useEffect(() => {
    // Set visibility to true immediately when component mounts
    setIsVisible(true);
  }, []);

  // Mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        const currentIndex = filteredItems.findIndex(
          (i) => i.id === selectedItem.id
        );

        if (e.key === "ArrowUp" && currentIndex > 0) {
          handleItemSelect(filteredItems[currentIndex - 1]);
        } else if (
          e.key === "ArrowDown" &&
          currentIndex < filteredItems.length - 1
        ) {
          handleItemSelect(filteredItems[currentIndex + 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredItems, selectedItem.id]);

  // Scroll to top of content when changing items
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [selectedItem]);

  const handleItemSelect = (item: SidebarItem) => {
    setIsLoading(true);
    setSelectedItem(item);
    setIsMobileSidebarOpen(false);

    // Update URL with item ID for deep linking
    window.history.replaceState(null, "", `#${contentType}-${item.id}`);

    // Simulate loading for smoother transitions
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      "E-commerce": "#00d4ff",
      API: "#00ff88",
      Cloud: "#ffd700",
      "AI/Bot": "#ff6b6b",
      "Web App": "#9c5fff",
      Blog: "#00d4ff",
      Corporate: "#00ff88",
      Marketing: "#ffd700",
      Fintech: "#ff6b6b",
      Languages: "#00d4ff",
      Frameworks: "#00ff88",
      DevOps: "#ffd700",
      Databases: "#9c5fff",
      Testing: "#00d4ff",
      CMS: "#00ff88",
    };
    return colorMap[category] || "#00d4ff";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "#00ff88";
      case "In Development":
        return "#ffd700";
      case "Portfolio Piece":
        return "#00d4ff";
      default:
        return "#00d4ff";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "#00ff88";
      case "Intermediate":
        return "#00d4ff";
      case "Advanced":
        return "#ff6b6b";
      default:
        return "#00d4ff";
    }
  };

  const shareItem = (item: SidebarItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url:
          (contentType === "projects" && item.liveUrl) || window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(
        (contentType === "projects" && item.liveUrl) || window.location.href
      );
    }
  };

  // Component simplified - related items section removed

  // Ensure categories is always an array
  const safeCategories = Array.isArray(categories) ? categories : ["All"];

  return (
    <section className="py-12 relative" ref={containerRef}>
      {/* Subtle spotlight effect */}
      <div
        className="absolute pointer-events-none w-[40vw] h-[40vw] rounded-full blur-3xl opacity-20"
        style={{
          backgroundColor: "var(--accent-primary)",
          left: `calc(${mousePosition.x * 100}% - 20vw)`,
          top: `calc(${mousePosition.y * 100}% - 20vw)`,
          transition: "all 0.3s ease",
        }}
      />

      <div>
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="w-full glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <Menu className="w-5 h-5 mr-2 text-[#00d4ff]" />
              <span>{selectedItem.title}</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isMobileSidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Layout */}
        <div
          className={`flex flex-col md:flex-row gap-6 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Left Sidebar - Navigation */}
          <div
            className={cn(
              "md:w-[30%] glass-card p-4 md:max-h-[800px] overflow-hidden flex flex-col",
              isMobileSidebarOpen ? "block" : "hidden md:flex"
            )}
          >
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b4bcd0] w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${contentType}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass-card text-white placeholder-[#b4bcd0] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all duration-300 text-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Filter
                  className="w-4 h-4 mr-2"
                  style={{ color: "var(--accent-primary)" }}
                />

                <h4 className="text-sm font-medium">Filter by Category</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Use safeCategories and add null check before slice */}
                {safeCategories.length > 0 &&
                  safeCategories
                    .slice(0, Math.min(4, safeCategories.length))
                    .map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-2 py-1 text-xs rounded-lg transition-all duration-300 ${
                          activeCategory === category
                            ? "text-[#0a0f1c]"
                            : "glass-card hover:border-[#00d4ff] hover:shadow-lg"
                        }`}
                        style={
                          activeCategory === category
                            ? {
                                backgroundColor: "var(--accent-primary)",
                                color: "#0a0f1c",
                              }
                            : {}
                        }
                      >
                        {category}
                      </button>
                    ))}
              </div>
              {safeCategories.length > 4 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {safeCategories.slice(4).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-2 py-1 text-xs rounded-lg transition-all duration-300 ${
                        activeCategory === category
                          ? "text-[#0a0f1c]"
                          : "glass-card hover:border-[#00d4ff] hover:shadow-lg"
                      }`}
                      style={
                        activeCategory === category
                          ? {
                              backgroundColor: "var(--accent-primary)",
                              color: "#0a0f1c",
                            }
                          : {}
                      }
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <h4 className="text-sm font-medium mb-2 text-[#b4bcd0]">
                {filteredItems.length}{" "}
                {contentType === "projects" ? "Project" : "Skill"}
                {filteredItems.length !== 1 ? "s" : ""}
              </h4>
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemSelect(item)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-300 ${
                      selectedItem.id === item.id
                        ? "bg-gradient-to-r from-[#00d4ff]/20 to-[#00ff88]/20 border-l-4 border-[#00d4ff]"
                        : "glass-card hover:border-[var(--accent-primary)] hover:shadow-lg"
                    }`}
                    style={{ transform: "none" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-3 backdrop-blur-md border-2 transition-all duration-300"
                          style={{
                            backgroundColor: `${getCategoryColor(
                              item.category
                            )}20`,
                            borderColor: getCategoryColor(item.category),
                            color: getCategoryColor(item.category),
                          }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <p className="text-[#b4bcd0] text-xs truncate max-w-[180px]">
                            {item.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {filteredItems.length === 0 && (
                  <div className="text-center py-8 glass-card">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-[#b4bcd0]">No {contentType} found</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("All");
                      }}
                      className="mt-2 text-[#00d4ff] text-sm hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Keyboard Navigation Hint */}
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#b4bcd0] flex items-center justify-center">
              <span className="glass-card px-2 py-1 rounded mr-2">↑</span>
              <span className="glass-card px-2 py-1 rounded mr-2">↓</span>
              <span>to navigate {contentType}</span>
            </div>
          </div>

          {/* Right Content Area - Item Details */}
          <div className="md:w-[70%] glass-card p-6 md:max-h-[800px] overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-t-[#00d4ff] border-r-[#00d4ff] border-b-[#00ff88] border-l-[#00ff88] rounded-full animate-spin"></div>
              </div>
            )}

            <div
              ref={contentRef}
              className="h-full overflow-y-auto custom-scrollbar"
            >
              {/* Item Header */}
              <div className="mb-8 pb-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {selectedItem.title}
                    </h2>
                    <p className="text-[#b4bcd0] text-lg">
                      {selectedItem.tagline}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    {contentType === "projects" && selectedItem.status && (
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: getStatusColor(selectedItem.status),
                          color: "#0a0f1c",
                        }}
                      >
                        {selectedItem.status}
                      </span>
                    )}
                    {contentType === "projects" && selectedItem.difficulty && (
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: getDifficultyColor(
                            selectedItem.difficulty
                          ),
                          color: "#0a0f1c",
                        }}
                      >
                        {selectedItem.difficulty}
                      </span>
                    )}
                    {contentType === "skills" && (
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-[#0a0f1c]"
                        style={{
                          backgroundColor: getCategoryColor(
                            selectedItem.category
                          ),
                        }}
                      >
                        {selectedItem.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tech Stack / Skills Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(contentType === "projects"
                    ? selectedItem.technologies || []
                    : selectedItem.skills || []
                  ).map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-lg"
                      style={{
                        backgroundColor: "var(--accent-primary)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {contentType === "projects" && selectedItem.githubUrl && (
                    <a
                      href={selectedItem.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 glass-card rounded-lg hover:text-[#00d4ff] transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                      <span>View the Code</span>
                    </a>
                  )}
                  {contentType === "projects" && selectedItem.liveUrl && (
                    <a
                      href={selectedItem.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-[#0a0f1c]"
                      style={{
                        backgroundColor: "var(--accent-primary)",
                      }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <button
                    onClick={() => shareItem(selectedItem)}
                    className="inline-flex items-center space-x-2 px-4 py-2 glass-card rounded-lg hover:text-[#00d4ff]  duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                {/* Overview */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    {contentType === "projects" ? (
                      <Globe className="w-5 h-5 mr-2 text-[#00d4ff]" />
                    ) : (
                      <Code className="w-5 h-5 mr-2 text-[#00d4ff]" />
                    )}
                    Overview
                  </h3>
                  <p className="text-[#b4bcd0] leading-relaxed">
                    {selectedItem.longDescription}
                  </p>
                </div>

          {/* Radial background */}
{contentType === "skills" ? (
  <>
    <div className="w-full h-screen relative flex items-center justify-center rounded-full 
                    hidden md:flex bg-circularLight dark:bg-circularDark
                    lg:h-[80vh] sm:h-[60vh] xs:h-[50vh]
                    lg:bg-circularLightLg lg:dark:bg-circularDarkLg
                    md:bg-circularLightMd md:dark:bg-circularDarkMd
                    ">
      {/* Central Skill Item */}
      <motion.div
        className="flex items-center justify-center rounded-full font-semibold 
                   bg-icons-primary p-8 shadow-icons-dark cursor-pointer 
                   dark:text-icons-light 
                   lg:p-6 md:p-4"
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-center text-icons-light">
          {selectedItem.title}
        </span>
      </motion.div>

      {/* Skills positioned like Stack components */}
      {(selectedItem.skills || []).map((skill, index) => {
        // Define manual positions for better control (similar to your Stacks component)
        const positions = [
          { x: "-15vw", y: "-2vw" },   // HTML equivalent
          { x: "11vw", y: "0vw" },    // CSS equivalent
          { x: "0vw", y: "7vw" },     // python equivalent
          { x: "4vw", y: "14vw" },    //JS equivalent
          { x: "-11vw", y: "7vw" },    // TS equivalent
          { x: "15vw", y: "5vw" },   // GraphQl equivalent
          { x: "-9vw", y: "-10vw" },  // Bootstrap equivalent
          { x: "4vw", y: "-13vw" },     // Tailwind equivalent
          { x: "12vw", y: "-5vw" },    // Material UI equivalent
          { x: "17vw", y: "-14vw" },   // MongoDB equivalent
          { x: "18vw", y: "5vw" },     // Adobe Illustrator equivalent
          { x: "18vw", y: "8vw" },    // Firebase equivalent
          { x: "16vw", y: "5vw" },    // NodeJS equivalent
          // Add more positions as needed
          { x: "0vw", y: "-8vw" },
          { x: "0vw", y: "-18vw" },
        ];
        
        // Use position if available, otherwise calculate one
        const position = positions[index] || {
          x: `${Math.cos((index / (selectedItem.skills?.length ?? 1)) * 2 * Math.PI) * 25}vw`,
          y: `${Math.sin((index / (selectedItem.skills?.length ?? 1)) * 2 * Math.PI) * 25}vw`
        };

        return (
          <motion.div
            key={skill}
            className="flex items-center justify-center rounded-full font-semibold 
                         bg-icons-primary text-icons-light py-3 px-6 shadow-dark cursor-pointer absolute 
                         dark:text-icons-dark dark:bg-icons-light
                         lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "var(--accent-primary)",
              color: "#0a0f1c"
            }}
            initial={{ x: 0, y: 0 }}
            whileInView={{ 
              x: position.x, 
              y: position.y, 
              transition: { duration: 1.5, delay: index * 0.1 }
            }}
            viewport={{ once: true }}
          >
            {skill}
          </motion.div>
        );
      })}
    </div>


 {/* Mobile Skills Display - Only visible on sm and below */}
    <div className="block md:hidden w-full py-8">
      {/* Mobile Central Title */}
      <motion.div
        className="flex items-center justify-center rounded-full font-semibold 
                   bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-[#0a0f1c] 
                   p-6 shadow-lg cursor-pointer mx-auto mb-8 w-40 h-40"
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        whileInView={{ 
          scale: 1, 
          opacity: 1, 
          rotate: 360,
          transition: { 
            duration: 1.2,
            type: "spring",
            stiffness: 100,
            damping: 12
          }
        }}
        viewport={{ once: true }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)"
        }}
      >
        <span className="text-center text-lg font-bold">
          {selectedItem.title}
        </span>
      </motion.div>
      
      {/* Mobile Skills as Animated Tags */}
      <div className="mt-8 px-4">
        <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
          {(selectedItem.skills || []).map((skill, index) => (
            <motion.span
              key={`mobile-${skill}`}
              className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer
                         bg-gradient-to-r from-[#00d4ff]/20 to-[#00ff88]/20 
                         border border-[#00d4ff]/50 text-white backdrop-blur-sm
                         hover:from-[#00d4ff]/30 hover:to-[#00ff88]/30
                         hover:border-[#00d4ff] hover:shadow-lg"
              initial={{ 
                scale: 0, 
                opacity: 0, 
                rotate: -360 
              }}
              whileInView={{ 
                scale: 1,
                opacity: 1,
                rotate: 0,
                transition: { 
                  duration: 0.8, 
                  delay: (index * 0.1) + 1.2, // Start after central animation
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }
              }}
              whileHover={{
                scale: 1.1,
                y: -2,
                boxShadow: "0 5px 15px rgba(0, 212, 255, 0.3)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
        
        {/* Optional: Add a subtle pulse animation to the container */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1,
            transition: { 
              delay: (selectedItem.skills?.length || 0) * 0.1 + 2,
              duration: 0.5 
            }
          }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 text-[#b4bcd0] text-xs">
            <motion.div
              className="w-2 h-2 bg-[#00d4ff] rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span>Stacks</span>
          </div>
        </motion.div>
      </div>
    </div>
  </>
) : (
  // Features list for projects (unchanged)
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {(selectedItem.features || []).map((item, index) => (
      <li
        key={index}
        className="flex items-start space-x-2 glass-card p-3 rounded-lg"
      >
        <div className="w-5 h-5 rounded-full bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <div className="w-2 h-2 rounded-full bg-[#00ff88]"></div>
        </div>
        <span className="text-[#b4bcd0]">{item}</span>
      </li>
    ))}
  </ul>
)}

                {/* Challenges & Solutions (Projects only) */}
                {contentType === "projects" &&
                  selectedItem.challenges &&
                  selectedItem.challenges.length > 0 &&
                  selectedItem.solutions &&
                  selectedItem.solutions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">
                          Challenges
                        </h3>
                        <ul className="space-y-3">
                          {selectedItem.challenges.map((challenge, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-5 h-5 rounded-full bg-[#ff6b6b]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-[#ff6b6b]"></div>
                              </div>
                              <span className="text-[#b4bcd0]">
                                {challenge}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4">
                          Solutions
                        </h3>
                        <ul className="space-y-3">
                          {selectedItem.solutions.map((solution, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-5 h-5 rounded-full bg-[#00d4ff]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-[#00d4ff]"></div>
                              </div>
                              <span className="text-[#b4bcd0]">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                {/* Metrics (Projects only) */}
                {contentType === "projects" &&
                  selectedItem.metrics &&
                  selectedItem.metrics.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-[#ffd700]" />
                        Key Metrics
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedItem.metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="glass-card p-4 text-center rounded-lg"
                          >
                            <p className="text-[#b4bcd0]">{metric}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills data and component
const skillsData: SidebarItem[] = [
  {
    id: 1,
    title: "Languages",
    tagline: "Core programming languages and markup technologies",
    description:
      "Core programming languages and markup technologies I use daily",
    longDescription:
      "Fundamental programming languages and markup technologies that form the foundation of modern web development and software engineering.",
    skills: [
      "HTML5",
      "CSS3",
      "Python",
      "JavaScript (ES6)",
      "TypeScript",
      "GraphQL",
      "NodeJS",
      "C++",
      "SQL",
    ],
    category: "Languages",
    icon: <Languages />,
    dateUpdated: "2024-01-15",
  },
  {
    id: 2,
    title: "Frameworks & Libraries",
    tagline: "Modern frameworks and libraries for scalable applications",
    description:
      "Modern frameworks and libraries for building scalable applications",
    longDescription:
      "Cutting-edge frameworks and libraries that enable rapid development of scalable, maintainable applications across different platforms and use cases.",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Flask",
      "FastAPI",
      "Bootstrap5",
      "TailwindCSS",
      "Material UI",
    ],
    category: "Frameworks",
    icon: <Code />,
    dateUpdated: "2024-01-10",
  },
  {
    id: 3,
    title: "DevOps & Tools",
    tagline: "Version control, CI/CD, and containerization tools",
    description: "Version control, CI/CD, and containerization tools",
    longDescription:
      "Essential DevOps tools and practices that streamline development workflows, ensure code quality, and enable efficient deployment and scaling of applications.",
    skills: ["Git", "GitHub", "GitLab", "CircleCI", "GitHub Actions", "Docker"],
    category: "DevOps",
    icon: <Server />,
    dateUpdated: "2024-01-05",
  },
  {
    id: 4,
    title: "Cloud Platforms",
    tagline: "Cloud services and deployment platforms",
    description: "Cloud services and deployment platforms",
    longDescription:
      "Modern cloud platforms that provide scalable infrastructure, deployment solutions, and managed services for building and hosting applications.",
    skills: ["AWS", "Azure", "Digital Ocean"],
    category: "Cloud",
    icon: <Cloud />,
    dateUpdated: "2023-12-20",
  },
  {
    id: 5,
    title: "Databases",
    tagline: "Database systems for data storage and management",
    description: "Database systems for data storage and management",
    longDescription:
      "Robust database systems that handle data storage, retrieval, and management for applications ranging from simple websites to complex enterprise systems.",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
    category: "Databases",
    icon: <Database />,
    dateUpdated: "2023-12-15",
  },
  {
    id: 6,
    title: "Testing Tools",
    tagline: "Testing frameworks and tools for quality assurance",
    description: "Testing frameworks and tools for quality assurance",
    longDescription:
      "Comprehensive testing tools and frameworks that ensure code quality, reliability, and performance across different layers of application development.",
    skills: ["Cypress", "Pytest", "RTL", "Pact", "Jest"],
    category: "Testing",
    icon: <Beaker />,
    dateUpdated: "2023-12-10",
  },
  {
    id: 7,
    title: "CMS & Others",
    tagline: "Content management systems and additional technologies",
    description: "Content management systems and additional technologies",
    longDescription:
      "Content management systems and specialized technologies that enhance development capabilities and provide solutions for specific use cases.",
    skills: ["Sanity", "Shopify", "HygraphCMS", "RabbitMQ"],
    category: "CMS",
    icon: <FileCode />,
    dateUpdated: "2023-12-05",
  },
];

const skillsCategories = [
  "All",
  "Languages",
  "Frameworks",
  "DevOps",
  "Cloud",
  "Databases",
  "Testing",
  "CMS",
];

// Update the ProjectsStyleSkills function to ensure we're passing valid props
export function ProjectsStyleSkills() {
  // Make sure skillsData is defined and not empty before using it
  if (!skillsData || skillsData.length === 0) {
    return <div>No skills data available</div>;
  }

  return (
    <SidebarNavigationLayout
      items={skillsData}
      categories={skillsCategories}
      defaultSelected={skillsData[0]}
      sectionTitle="Skills"
      contentType="skills"
    />
  );
}
