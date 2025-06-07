import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Mike's Portfolio | Articles Page",
  description: "Explore insightful articles on React, JavaScript, and web development. Learn through practical tutorials and guides.",
  keywords: ["React", "JavaScript", "Web Development", "Tutorials", "Programming"],
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}