"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FirewallPage() {
  const [glitchText, setGlitchText] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [asciiFrame, setAsciiFrame] = useState(0)

  const originalText = "Hello there!\nI'm Otori Samson, but you can call me 'PilotVader', or simply '117'\nA cybersecurity analyst\nI'm here to ensure that digital threats meet their match.\nI secure, I protect, I conquer.\nWelcome to my portfolio site"

  // ASCII Parrot animation frames
  const parrotFrames = [
    `
    ╭─────────────────╮
    │   🦜 PARROT     │
    │     /\\___/\\     │
    │    (  o o  )    │
    │     (  =  )     │
    │      ---m-m     │
    │   Dancing...    │
    ╰─────────────────╯
    `,
    `
    ╭─────────────────╮
    │   🦜 PARROT     │
    │     /\\___/\\     │
    │    (  o o  )    │
    │     (  =  )     │
    │      ---m-m     │
    │   Dancing...    │
    ╰─────────────────╯
    `,
    `
    ╭─────────────────╮
    │   🦜 PARROT     │
    │     /\\___/\\     │
    │    (  o o  )    │
    │     (  =  )     │
    │      ---m-m     │
    │   Dancing...    │
    ╰─────────────────╯
    `
  ]

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 100)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  // ASCII animation
  useEffect(() => {
    const asciiInterval = setInterval(() => {
      setAsciiFrame((prev) => (prev + 1) % parrotFrames.length)
    }, 500)

    return () => clearInterval(asciiInterval)
  }, [])

  // Text glitch effect
  useEffect(() => {
    if (glitchActive) {
      const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
      const glitchedText = originalText
        .split("")
        .map((char, i) => {
          if (Math.random() < 0.3) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          }
          return char
        })
        .join("")
      setGlitchText(glitchedText)
    } else {
      setGlitchText(originalText)
    }
  }, [glitchActive])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center relative overflow-hidden">
      {/* Matrix background effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          >
            {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* ASCII Art */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <pre className="text-xs md:text-sm text-green-400 whitespace-pre">
            {parrotFrames[asciiFrame]}
          </pre>
        </motion.div>

        {/* Glitchy Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <h1 className={`text-2xl md:text-4xl font-bold mb-6 transition-all duration-100 ${
            glitchActive ? 'text-red-500' : 'text-green-400'
          }`}>
            <Shield className="inline-block w-8 h-8 mr-2" />
            README.md
          </h1>
          
          <div className={`text-lg md:text-xl leading-relaxed ${
            glitchActive ? 'text-red-400' : 'text-green-300'
          }`}>
            <pre className="whitespace-pre-line font-mono">
              {glitchText}
            </pre>
          </div>
        </motion.div>

        {/* Status indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
                     <div className="flex justify-center">
             <div className="bg-green-900/20 border border-green-500/30 p-4 rounded">
               <div className="flex items-center justify-center mb-2">
                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                 <span>STATUS: ONLINE</span>
               </div>
             </div>
           </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white border border-green-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Base
            </Button>
          </Link>
          
                                   <Button 
               variant="outline"
               className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
               onClick={() => {
                 setGlitchActive(true)
                 setTimeout(() => setGlitchActive(false), 500)
               }}
             >
               <Zap className="w-4 h-4 mr-2" />
               Stop Glitch
             </Button>
        </motion.div>

        
      </div>
    </div>
  )
} 