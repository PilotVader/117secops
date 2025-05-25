"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function Background3D() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([])
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 150 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 opacity-50">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${isDark ? "bg-purple-500" : "bg-purple-400"}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 / particle.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  )
}
