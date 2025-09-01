"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Terminal, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { TerminalInterface } from "./terminal-interface"

export function CyberHero() {
  const [typedText, setTypedText] = useState("")
  const [showTerminal, setShowTerminal] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [glitchText, setGlitchText] = useState("Check Out My Blog")
  const roles = ["Cybersecurity Analyst", "SOC Analyst", "Security Engineer"]
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (typedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setTypedText(currentRole.slice(0, typedText.length + 1))
        }, 100)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1))
        }, 50)
      } else {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [typedText, isTyping, currentRoleIndex, roles])

  // Glitch effect for the announcement button
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 150)
    }, 3000) // Glitch every 3 seconds

    return () => clearInterval(glitchInterval)
  }, [])

  // Text glitch effect
  useEffect(() => {
    const originalText = "Check Out My Blog"
    
    if (glitchActive) {
      const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
      const glitchedText = originalText
        .split('')
        .map(char => {
          if (Math.random() < 0.3) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          }
          return char
        })
        .join('')
      
      setGlitchText(glitchedText)
    } else {
      setGlitchText(originalText)
    }
  }, [glitchActive])

  return (
    <>
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Matrix background effect */}
        <div className="absolute inset-0 matrix-bg opacity-50" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Status badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="outline" className="cyber-border bg-card/50 backdrop-blur-sm">
              <Shield className="w-3 h-3 mr-1 text-cyber-green" />
              Security Specialist
            </Badge>
            <Badge variant="outline" className="cyber-border bg-card/50 backdrop-blur-sm">
              <Terminal className="w-3 h-3 mr-1 text-primary" />
              SOC Analyst
            </Badge>
            <Badge variant="outline" className="cyber-border bg-card/50 backdrop-blur-sm">
              <Zap className="w-3 h-3 mr-1 text-cyber-orange" />
              Threat Hunter
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-mono">
            <span className="text-cyber-glow">Hi, I'm</span>
            <br />
            <span className="text-cyber-glow">
              Samson Otori
            </span>
          </h1>

          {/* Typing animation for roles */}
          <div className="text-2xl md:text-3xl lg:text-4xl mb-8 h-16 flex items-center justify-center">
            <span className="text-muted-foreground font-mono">
              {typedText}
              <span className="text-primary animate-blink">|</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Welcome to my portfolio site, where I document my journey through 
            cybersecurity experiments, projects, and learning experiences.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/projects">
              <Button 
                size="lg" 
                className="cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white"
              >
                <Terminal className="w-5 h-5 mr-2" />
                Explore My Work
              </Button>
            </Link>
                         <Button 
               size="lg"
               onClick={() => setShowTerminal(true)}
               className="cyber-border bg-transparent text-foreground hover:bg-red-600 hover:text-white"
             >
               <Shield className="w-5 h-5 mr-2" />
               Terminal Mode
             </Button>
            <Link href="/blog">
              <Button 
                size="lg"
                className={`cyber-border bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 relative overflow-hidden group animate-pulse ${
                  glitchActive ? 'shadow-lg shadow-red-500/50' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-bounce ${
                  glitchActive ? 'bg-red-400' : 'bg-yellow-400'
                }`} />
                <div className={`relative flex items-center ${
                  glitchActive ? 'text-red-300' : 'text-white'
                }`}>
                  <span className={`mr-2 font-bold ${
                    glitchActive ? 'text-red-300' : 'text-white'
                  }`}>NEW</span>
                  <span className={glitchActive ? 'text-red-300' : 'text-white'}>
                    {glitchText}
                  </span>
                </div>
              </Button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-primary" />
          </div>
        </div>
      </section>

      {/* Terminal Interface */}
      {showTerminal && (
        <TerminalInterface onClose={() => setShowTerminal(false)} />
      )}
    </>
  )
} 