"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"

interface Card3DProps {
  children: ReactNode
  className?: string
  depth?: number
  onClick?: () => void
}

export default function Card3D({ children, className = "", depth = 10, onClick }: Card3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate mouse position relative to card center
    const x = e.clientX - centerX
    const y = e.clientY - centerY

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: "1000px",
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Shadow element */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-black/20 blur-md"
        style={{
          zIndex: -1,
          scale: 0.95,
          opacity: isHovered ? 0.3 : 0.1,
        }}
      />

      {/* Card content */}
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease",
        }}
      >
        <Card className={`overflow-hidden transition-all duration-400 cursor-pointer`}>{children}</Card>
      </motion.div>

      {/* 3D depth effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10"
        style={{
          zIndex: 10,
          pointerEvents: "none",
          opacity: isHovered ? 0.1 : 0,
        }}
      />
    </motion.div>
  )
}
