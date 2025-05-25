"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animations"

export default function Hero3D() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([])

  useEffect(() => {
    setMounted(true)

    // Generate random particles
    const newParticles = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
    }))

    setParticles(newParticles)
  }, [])

  if (!mounted) return null

  return (
    <section className="hero-gradient text-white py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* CSS-based particle background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-white opacity-30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0.3, 0],
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
      </div>
      <motion.div
        className="absolute inset-0 bg-purple-500/10 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center space-y-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tighter"
            variants={fadeIn}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            Welcome To My Cybersecurity Journey
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100"
            variants={fadeIn}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            Documenting hands-on labs, expert tutorial breakdowns, and original projects as I develop Security
            Operations skills
          </motion.p>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <motion.div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </section>
  )
}
