"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <Image
        src={isDarkMode ? "/images/hero/hero-section.jpeg" : "/images/hero/hero-section-white.jpeg"}
        alt="Hero background"
        fill
        className="object-cover transition-all duration-300"
        priority
        quality={100}
      />
      
      {/* Dark/Light Gradient Overlay */}
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? "bg-gradient-to-r from-purple-950/90 via-purple-950/80 to-transparent" 
          : "bg-gradient-to-r from-white/90 via-white/80 to-transparent"
      }`} />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex items-center min-h-screen">
        <div className="max-w-3xl">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-l-4 border-purple-500 pl-6 mb-8"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 -mt-[35%] ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Hi, I'm Samson Otori
            </h2>
            
            <h3 className={`text-xl md:text-2xl font-semibold mb-4 ${
              isDarkMode ? "text-purple-200" : "text-purple-700"
            }`}>
              Cybersecurity Analyst | SOC Analyst | Security Engineer
            </h3>

            <p className={`text-lg mb-6 ${
              isDarkMode ? "text-purple-100/90" : "text-gray-700"
            }`}>
              Welcome to my portfolio site, where I document my journey through cybersecurity experiments, projects, and learning experiences.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/projects">
                <Button
                  size="lg"
                  className={`px-8 ${
                    isDarkMode 
                      ? "bg-purple-600 hover:bg-purple-700 text-white" 
                      : "bg-purple-700 hover:bg-purple-800 text-white"
                  }`}
                >
                  Explore My Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 