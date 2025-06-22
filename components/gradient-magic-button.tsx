"use client"

import type React from "react"

import type { ReactNode } from "react"

interface GradientMagicButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  accentColor?: "primary" | "secondary" | "purple" | "orange"
  as?: "a" | "button"
  target?: string
  rel?: string
  showCursor?: boolean
}

export default function GradientMagicButton({
  children,
  href,
  onClick,
  className = "",
  style = {},
  accentColor = "primary",
  as = "a",
  target,
  rel,
  showCursor = true,
}: GradientMagicButtonProps) {
    const gradientMap = {
        primary:
          "linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover, color-mix(in srgb, var(--accent-primary) 80%, black)))",
        secondary:
          "linear-gradient(135deg, var(--accent-secondary), var(--accent-secondary-hover, color-mix(in srgb, var(--accent-secondary) 80%, black)))",
        purple: "linear-gradient(135deg, var(--accent-purple), color-mix(in srgb, var(--accent-purple) 80%, black))",
        orange: "linear-gradient(135deg, var(--accent-orange), color-mix(in srgb, var(--accent-orange) 80%, black))",
      }
  const combinedStyle = {
    ...style,
    background: gradientMap[accentColor],
    position: "relative" as const,
    overflow: "hidden" as const,
    cursor: showCursor ? "pointer" : "default",
  }

  const Component = as

  const commonProps = {
    className: `${className} group`,
    style: combinedStyle,
    ...(href && { href }),
    ...(onClick && { onClick }),
    ...(as === "a" && target && { target }),
    ...(as === "a" && rel && { rel }),
  }

  return (
    <Component {...commonProps}>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>

      {/* Content with relative positioning to stay above overlay */}
      <div className="relative z-10 flex items-center space-x-2">{children}</div>
    </Component>
  )
}