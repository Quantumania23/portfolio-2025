"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import GradientMagicButton from "./gradient-magic-button";
import Image from "next/image";
import Contact from "@/components/Contacts";

export default function Navigation() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Community", href: "#community" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect which section is currently in view
      const sections = navLinks.map((link) => link.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, isMounted]);

  const socialLinks = [
    {
      name: "GitHub",
      href:
        process.env.NEXT_PUBLIC_GITHUB_URL ||
        "https://github.com/Quantumania23",
      icon: <Github className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      href:
        process.env.NEXT_PUBLIC_LINKEDIN_URL ||
        "https://www.linkedin.com/in/mike-mutuku-0a243a1bb/",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: "Twitter",
      href: process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/Mikepeace981",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      name: "Email",
      onClick: () => setIsContactPopupOpen(true),
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="relative flex items-center justify-between glass-card p-4">
          {/* Logo */}
          <Link
            href="#home"
            className={cn(
              "font-medium text-xl transition-colors duration-300",
              theme === "light"
                ? "hover:text-accent-primary"
                : "hover:text-[#00d4ff]"
            )}
            onClick={() => setActiveSection("home")}
          >
            <Image
              className="text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text rounded-full"
              style={{
                backgroundImage:
                  theme === "light"
                    ? "linear-gradient(to right, #3b82f6, #10b981)"
                    : "linear-gradient(to right, #00d4ff, #00ff88)",
              }}
              src="/Q23.jpeg"
              width={40}
              height={40}
              alt="Logo"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href ?? "#"}
                    className={cn(
                      "text-sm font-medium transition-all duration-300",
                      "hover:text-accent-primary",
                      activeSection === link.name.toLowerCase()
                        ? "text-accent-primary font-semibold"
                        : theme === "light"
                        ? "text-muted-foreground"
                        : "text-text-secondary"
                    )}
                    onClick={() => setActiveSection(link.name.toLowerCase())}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) =>
                link.name === "Email" ? (
                  <button
                    key={link.name}
                    onClick={link.onClick}
                    className={cn(
                      "transition-all duration-300 hover:scale-105",
                      theme === "light"
                        ? "text-muted-foreground hover:text-primary"
                        : "text-text-secondary hover:text-[#00d4ff]"
                    )}
                    aria-label={link.name}
                    type="button"
                  >
                    {link.icon}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href ?? "#"}
                    className={cn(
                      "transition-all duration-300 hover:scale-105",
                      theme === "light"
                        ? "text-muted-foreground hover:text-primary"
                        : "text-text-secondary hover:text-[#00d4ff]"
                    )}
                    aria-label={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </Link>
                )
              )}
            </div>

            <GradientMagicButton
              href={
                process.env.NEXT_PUBLIC_RESUME_LINK ||
                "https://docs.google.com/document/d/1AOGztSR1ueyTft4dnFpBEes6r7cZpq-hEw53EDtiG6M/edit?usp=sharing"
              }
              className={cn(
                "inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-white [&_*]:!text-white"
              )}
              accentColor="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV</span>
            </GradientMagicButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className={cn(
                "transition-colors",
                theme === "light"
                  ? "text-muted-foreground hover:text-primary"
                  : "text-text-secondary hover:text-[#00d4ff]"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden w-full relative mt-2 glass-card p-4 animate-fadeIn">
            <ul className="flex flex-col space-y-4 mb-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href ?? "#"}
                    className={cn(
                      "block text-sm font-medium transition-all duration-300",
                      theme === "light"
                        ? "hover:text-primary"
                        : "hover:text-[#00d4ff]",
                      activeSection === link.name.toLowerCase()
                        ? theme === "light"
                          ? "text-primary"
                          : "text-[#00d4ff]"
                        : theme === "light"
                        ? "text-muted-foreground"
                        : "text-text-secondary"
                    )}
                    onClick={() => {
                      setActiveSection(link.name.toLowerCase());
                      setIsOpen(false);
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Social Links */}
            <div className="flex items-center space-x-4 mb-6">
              {socialLinks.map((link) =>
                link.name === "Email" ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      setIsContactPopupOpen(true);
                      setIsOpen(false); // Optionally close the mobile menu when opening popup
                    }}
                    className={cn(
                      "transition-all duration-300 hover:scale-105",
                      theme === "light"
                        ? "text-muted-foreground hover:text-primary"
                        : "text-text-secondary hover:text-[#00d4ff]"
                    )}
                    aria-label={link.name}
                    type="button"
                  >
                    {link.icon}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href ?? "#"}
                    className={cn(
                      "transition-all duration-300 hover:scale-105",
                      theme === "light"
                        ? "text-muted-foreground hover:text-primary"
                        : "text-text-secondary hover:text-[#00d4ff]"
                    )}
                    aria-label={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </Link>
                )
              )}
            </div>
            {isContactPopupOpen && (
              <Contact handleClose={() => setIsContactPopupOpen(false)} />
            )}

            <GradientMagicButton
              href={
                process.env.NEXT_PUBLIC_RESUME_LINK ||
                "https://docs.google.com/document/d/1AOGztSR1ueyTft4dnFpBEes6r7cZpq-hEw53EDtiG6M/edit?usp=sharing"
              }
              className={cn(
                "inline-flex items-center space-x-2 w-full justify-center px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105",
                theme === "light"
                  ? "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl [&_*]:!text-white"
                  : "text-[#0a0f1c] hover:shadow-glow [&_*]:!text-[#0a0f1c]"
              )}
              style={{ backgroundColor: "var(--accent-primary)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV</span>
            </GradientMagicButton>
          </div>
        )}
      </div>
      {/* Popup for both desktop and mobile */}
      {isContactPopupOpen && (
        <Contact handleClose={() => setIsContactPopupOpen(false)} />
      )}
    </header>
  );
}
