"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Terminal, Shield } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import Logo3D from "@/components/3d-logo"
import { motion } from "framer-motion"

export function CyberHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-cyber ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-lg cyber-border border-b' 
          : 'bg-background/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 -ml-2 perspective-1000 z-10">
              <Logo3D />
            </div>
            <div className="font-mono hidden sm:block">
              <div className="text-lg font-bold">117 SecOps</div>
              <div className="text-xs text-muted-foreground">Cybersecurity Portfolio</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground transition-cyber"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ModeToggle />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="https://www.linkedin.com/in/otori-samson/" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="sm" 
                  className="cyber-border bg-transparent text-foreground"
                >
                  Contact Me
                </Button>
              </Link>
            </motion.div>

                                    <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <Link href="/firewall">
                            <Button 
                              size="sm" 
                              className="cyber-border bg-red-600 hover:bg-red-700 text-white border-red-500"
                            >
                              <Shield className="w-4 h-4 mr-2" />
                              Activate Firewall
                            </Button>
                          </Link>
                        </motion.div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
          >
            <nav className="py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-sm font-medium text-foreground transition-cyber"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="px-4 py-2 space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center"
                >
                  <ModeToggle />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="https://www.linkedin.com/in/otori-samson/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button 
                      size="sm" 
                      className="w-full cyber-border bg-transparent text-foreground"
                    >
                      Contact Me
                    </Button>
                  </Link>
                </motion.div>
                                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                            >
                              <Link href="/firewall">
                                <Button
                                  size="sm"
                                  className="w-full cyber-border bg-red-600 hover:bg-red-700 text-white border-red-500"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <Shield className="w-4 h-4 mr-2" />
                                  Activate Firewall
                                </Button>
                              </Link>
                            </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
} 