import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import CursorSpotlight from "@/components/cursor-spotlight"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

// Base URL for your site - use relative URLs for local development
const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction 
  ? 'https://mikepeace.vercel.app' 
  : ''; // Use relative URLs in development

  export const metadata: Metadata = {
    title: {
      default: "Mike Peace | Software Engineer",
      template: "%s | Mike Peace"
    },
    description: "Explore the work of Mike Peace, a passionate software engineer specializing in scalable, high-performance full-stack applications built with React, Next.js, TypeScript, and NodeJs. Delivering user-centric digital solutions with clean code and modern architecture.",
    
    keywords: [
      "Mike Peace",
      "Software Engineer",
      "Web Engineer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "React Developer",
      "Next.js Developer",
      "JavaScript Developer",
      "TypeScript Developer",
      "Node.js Developer",
      "Tailwind CSS",
      "Web Performance Optimization",
      "Open Source Contributor",
      "Modern Software Development",
      "Web Applications",
      "Clean Code Architecture",
      "Digital Solutions",
      "Kenya Software Engineer",
      "East Africa Developer",
      "Scalable Web Apps"
    ],
    
    authors: [{ name: "Mike Peace", url: baseUrl }],
    creator: "Mike Peace",
    publisher: "Mike Peace",
    generator: 'Next.js',
    applicationName: "Mike Peace - Software Engineer",
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: baseUrl ? new URL(baseUrl) : new URL('http://localhost:3000'),
    alternates: {
      canonical: baseUrl,
    },
    
    // OpenGraph metadata
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      title: "Mike Peace | Software Engineer",
      description: "Discover Mike Peace, a dedicated software engineer crafting innovative full-stack web solutions with React, Next.js, and Python.",
      siteName: "Mike Peace - Software Engineer",
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: "Mike Peace - Professional Software Engineer",  
          type: 'image/jpeg',
        },
        {
          url: '/og-image-square.jpg',
          width: 1200,
          height: 1200,
          alt: "Mike Peace - Software & Web Engineer",
          type: 'image/jpeg',
        }
      ],
    },
  
    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: "Mike Peace | Software Engineer",
      description: "Professional software engineer specializing in modern web technologies, scalable full-stack solutions, and clean architecture.",
      creator: '@Mikepeace981',
      site: '@Mikepeace981',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: "Mike Peace - Software Engineer",
        }
      ],
    },
  };
  

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mike Peace",
              "jobTitle": "Software Engineer",
              "description": "Passionate software engineer specializing in modern web engineering",
              "url": baseUrl,
              "sameAs": [
                process.env.NEXT_PUBLIC_GITHUB_URL,
                process.env.NEXT_PUBLIC_LINKEDIN_URL,
                process.env.NEXT_PUBLIC_TWITTER_URL,
              ].filter(Boolean),
              "email": process.env.NEXT_PUBLIC_EMAIL,
              "knowsAbout": [
                "JavaScript",
                "TypeScript", 
                "React",
                "Next.js",
                "Web Development",
                "Software Engineering"
              ],
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <CursorSpotlight />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}