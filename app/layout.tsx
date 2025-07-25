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
      default: "Mike Peace | Software Engineer | Kenya | Q23 Studios",
      template: "%s | Mike Peace - Software Engineer"
    },
    description: "Mike Peace - Professional Software Engineer from Kenya specializing in React, Next.js, TypeScript, and full-stack web development. Currently at Q23 Studios delivering innovative digital solutions with 25+ months experience and KES 1.1B+ business impact.",
    
    keywords: [
      "Mike Peace",
      "Mike Peace Software Engineer",
      "Mike Peace Kenya",
      "Mike Peace Developer",
      "Mike Peace Portfolio",
      "Software Engineer",
      "Software Engineer Kenya",
      "Kenya Software Engineer",
      "Web Engineer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "React Developer",
      "React Developer Kenya",
      "Next.js Developer",
      "JavaScript Developer",
      "TypeScript Developer",
      "Node.js Developer",
      "Q23 Studios",
      "Q23 Studios Developer",
      "Tailwind CSS",
      "Web Performance Optimization",
      "Open Source Contributor",
      "Modern Software Development",
      "Web Applications",
      "Clean Code Architecture",
      "Digital Solutions",
      "East Africa Developer",
      "Scalable Web Apps",
      "Nairobi Developer",
      "Kenya Tech",
      "African Developer",
      "Software Development Kenya"
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
      title: "Mike Peace | Software Engineer | Kenya | Q23 Studios",
      description: "Mike Peace - Professional Software Engineer from Kenya at Q23 Studios. Specializing in React, Next.js, TypeScript with 25+ months experience and KES 1.1B+ business impact.",
      siteName: "Mike Peace - Software Engineer Portfolio",
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: "Mike Peace - Professional Software Engineer from Kenya",  
          type: 'image/jpeg',
        },
        {
          url: '/og-image-square.jpg',
          width: 1200,
          height: 1200,
          alt: "Mike Peace - Software Engineer Kenya Q23 Studios",
          type: 'image/jpeg',
        }
      ],
    },
  
    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: "Mike Peace | Software Engineer | Kenya",
      description: "Professional Software Engineer from Kenya at Q23 Studios. React, Next.js, TypeScript specialist with 25+ months experience and KES 1.1B+ business impact.",
      creator: '@Mikepeace981',
      site: '@Mikepeace981',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: "Mike Peace - Software Engineer Kenya",
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
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
          <meta name="google-site-verification" content="lu2o8adyYEKEbj491hVUrs86jLt80NwqEKikVRAz8TA" />

        
        {/* Geographic targeting */}
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Nairobi" />
        <meta name="geo.position" content="-1.286389;36.817223" />
        <meta name="ICBM" content="-1.286389, 36.817223" />
        
        {/* Additional Open Graph tags */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="article:author" content="Mike Peace" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${baseUrl}#person`,
                  "name": "Mike Peace",
                  "alternateName": ["Mike Peace Developer", "Mike Peace Software Engineer", "Mike Peace Kenya"],
                  "jobTitle": "Software Engineer",
                  "description": "Professional Software Engineer from Kenya specializing in React, Next.js, TypeScript, and full-stack web development",
                  "worksFor": {
                    "@type": "Organization",
                    "name": "Q23 Studios",
                    "url": baseUrl
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Nairobi",
                    "addressRegion": "Nairobi County",
                    "addressCountry": "Kenya"
                  },
                  "url": baseUrl,
                  "sameAs": [
                    process.env.NEXT_PUBLIC_GITHUB_URL,
                    process.env.NEXT_PUBLIC_LINKEDIN_URL,
                    process.env.NEXT_PUBLIC_TWITTER_URL,
                  ].filter(Boolean),
                  "email": process.env.NEXT_PUBLIC_EMAIL || "mikepeace981@gmail.com",
                  "knowsAbout": [
                    "JavaScript",
                    "TypeScript", 
                    "React",
                    "Next.js",
                    "Node.js",
                    "Python",
                    "FastAPI",
                    "MongoDB",
                    "PostgreSQL",
                    "AWS",
                    "Web Development",
                    "Software Engineering",
                    "Full Stack Development",
                    "Frontend Development",
                    "Backend Development"
                  ],
                  "hasOccupation": {
                    "@type": "Occupation",
                    "name": "Software Engineer",
                    "occupationLocation": {
                      "@type": "City",
                      "name": "Nairobi, Kenya"
                    }
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": `${baseUrl}#website`,
                  "url": baseUrl,
                  "name": "Mike Peace - Software Engineer Portfolio",
                  "description": "Professional Software Engineer from Kenya specializing in React, Next.js, TypeScript, and full-stack web development",
                  "publisher": {
                    "@id": `${baseUrl}#person`
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": `${baseUrl}?q={search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": `${baseUrl}#organization`,
                  "name": "Q23 Studios",
                  "url": baseUrl,
                  "employee": {
                    "@id": `${baseUrl}#person`
                  }
                }
              ]
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