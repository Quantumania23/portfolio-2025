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
  Home,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Contact from "@/components/Contacts";
import GradientMagicButton from "@/components/gradient-magic-button";

export default function ArticlesNavigation() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

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
            href="/"
            className={cn(
              "font-medium text-xl transition-colors duration-300",
              theme === "light"
                ? "hover:text-accent-primary"
                : "hover:text-[#00d4ff]"
            )}
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
            {/* Home Link */}
            <Link
              href="/"
              className={cn(
                "inline-flex items-center space-x-2 text-sm font-medium transition-all duration-300",
                "hover:text-accent-primary",
                theme === "light"
                  ? "text-muted-foreground"
                  : "text-text-secondary"
              )}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

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
            {/* Home Link */}
            <div className="mb-6">
              <Link
                href="/"
                className={cn(
                  "inline-flex items-center space-x-2 text-sm font-medium transition-all duration-300",
                  theme === "light"
                    ? "hover:text-primary text-muted-foreground"
                    : "hover:text-[#00d4ff] text-text-secondary"
                )}
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </div>

            {/* Mobile Social Links */}
            <div className="flex items-center space-x-4 mb-6">
              {socialLinks.map((link) =>
                link.name === "Email" ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      setIsContactPopupOpen(true);
                      setIsOpen(false);
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
      
      {/* Contact Popup */}
      {isContactPopupOpen && (
        <Contact handleClose={() => setIsContactPopupOpen(false)} />
      )}
    </header>
  );
}