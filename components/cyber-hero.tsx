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
            <span className="bg-cyber-gradient bg-clip-text text-transparent">
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
                className="cyber-border bg-primary text-primary-foreground"
              >
                <Terminal className="w-5 h-5 mr-2" />
                Explore My Work
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowTerminal(true)}
              className="cyber-border bg-card/50 backdrop-blur-sm border-red-500 text-red-500"
            >
              <Shield className="w-5 h-5 mr-2" />
              Terminal Mode
            </Button>
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