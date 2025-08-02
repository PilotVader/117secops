"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Terminal, X, Monitor, Command, ArrowUp, ArrowDown, ExternalLink } from "lucide-react"
import Image from "next/image"

interface CommandHistory {
  command: string
  output: string
  timestamp: Date
  isTyping?: boolean
  typedOutput?: string
}

interface TerminalCommand {
  name: string
  description: string
  action: (args?: string[]) => string
  aliases?: string[]
}

interface Project {
  name: string
  slug: string
  description: string
}

interface BlogPost {
  title: string
  slug: string
  description: string
}

export function TerminalInterface({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [currentDirectory, setCurrentDirectory] = useState("~")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showCursor, setShowCursor] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Sample data - you can replace with actual data from your API
  const projects: Project[] = [
    { name: "Upgrade 1: 4TB SATA Hard Drive Installation", slug: "upgrade-1-4tb-sata-hard-drive-proxmox", description: "Hardware upgrade and troubleshooting" },
    { name: "Project 4.1: VLANs Segmentation", slug: "vlans-segmentation-homelab", description: "Network segmentation implementation" },
    { name: "SOC Automation Project", slug: "soc-automation-project", description: "Security operations automation" },
    { name: "30-Day SOC Analyst Challenge", slug: "30-day-mydfir-soc-analyst-challenge-part0", description: "SOC analyst training challenge" }
  ]

  const blogPosts: BlogPost[] = [
    { title: "Advanced Security Monitoring Tools", slug: "advanced-security-monitoring-tools", description: "Overview of security monitoring solutions" },
    { title: "Building a Resilient Security Culture", slug: "building-a-resilient-security-culture", description: "Security culture development" },
    { title: "Cybersecurity Tools Showcase", slug: "cybersecurity-tools-showcase", description: "Essential cybersecurity tools" },
    { title: "Introduction to Zero Trust", slug: "introduction-to-zero-trust-copy", description: "Zero trust security model" }
  ]

  const certifications = [
    { name: "Google IT Support Professional", image: "/images/google-it-support-cert.png" },
    { name: "IBM IT Support Professional", image: "/images/ibm-it-support-cert.png" },
    { name: "Microsoft Security Fundamentals", image: "/images/microsoft-security-cert.png" },
    { name: "ISO/IEC 27001 Lead Auditor", image: "/images/ISO-IEC-27001-Cert.png" }
  ]

  // Keyword-to-Project Mapping
  const projectMap: { [key: string]: string } = {
    buildlab: '/projects/building-cybersecurity-home-lab',
    socauto: '/projects/soc-automation-project',
    mydfir30: '/projects/30-day-mydfir-soc-analyst-challenge-part0',
    hardwarelab: '/projects/building-full-hardware-cybersecurity-homelab',
    vlans: '/projects/vlans-segmentation-homelab',
    dockersetup: '/projects/ubuntu-server-docker-portainer',
    vulnmachines: '/projects/vulnerable-machines-installation',
    upgrade1: '/projects/upgrade-1-4tb-sata-hard-drive-proxmox',
  }

  useEffect(() => {
    setMounted(true)
    if (inputRef.current) {
      inputRef.current.focus()
    }
    
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Blinking cursor animation
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => {
      clearInterval(timer)
      clearInterval(cursorTimer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const isDarkMode = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  // Typewriter animation function
  const typeText = async (text: string, speed: number = 30): Promise<string> => {
    let result = ""
    for (let i = 0; i < text.length; i++) {
      result += text[i]
      await new Promise(resolve => setTimeout(resolve, speed))
    }
    return result
  }

  // Available commands
  const commands: TerminalCommand[] = [
    {
      name: "welcome",
      description: "Show welcome message",
      action: () => {
        return `Hi, I'm Samson Otori, a Cybersecurity Analyst.

Welcome to my interactive SOC Automation portfolio terminal!
Type 'help' to see available commands.`
      }
    },
    {
      name: "help",
      description: "Show available commands",
      action: () => {
                      return `Available commands:
  help                    - Show this help
  about                   - About me
  projects                - View my projects
  skills                  - My technical skills
  experience              - Work experience
  contact                 - Contact information
  education               - Educational background
  certifications          - Professional certificates
  sudo su                 - Gain root access
  clear                   - Clear terminal
  exit                    - Exit terminal mode`
      }
    },
    {
      name: "about",
      description: "About me",
      action: () => {
        return `Samson Otori
Cybersecurity Analyst | SOC Analyst | Security Engineer

I'm passionate about cybersecurity and specialize in:
• Security Operations Center (SOC) analysis
• Incident response and threat hunting
• Network security and monitoring
• Security automation and orchestration
• Vulnerability assessment and penetration testing

Currently focused on building hands-on cybersecurity projects
and documenting my learning journey through practical experience.`
      }
    },
    {
      name: "projects",
      description: "View my projects",
      action: () => {
        return `🚀 Projects:

1. Upgrade 1: 4TB SATA Hard Drive Installation
   Hardware upgrade and troubleshooting for Proxmox VE server
   Technologies: Proxmox, Linux, SATA, Storage Management
   Link: [CLICK:/projects/upgrade-1-4tb-sata-hard-drive-proxmox]

2. Project 4.1: VLANs Segmentation
   Network segmentation implementation in cybersecurity homelab
   Technologies: OPNsense, VLANs, Network Security, Proxmox
   Link: [CLICK:/projects/vlans-segmentation-homelab]

3. SOC Automation Project
   Security operations automation and monitoring implementation
   Technologies: Wazuh, TheHive, Elastic Stack, Security Automation
   Link: [CLICK:/projects/soc-automation-project]

4. 30-Day SOC Analyst Challenge
   SOC analyst training challenge and hands-on learning
   Technologies: Security Monitoring, Incident Response, Threat Hunting
   Link: [CLICK:/projects/30-day-mydfir-soc-analyst-challenge-part0]

5. Building a Cybersecurity Home Lab
   Comprehensive cybersecurity homelab setup and configuration
   Technologies: Proxmox, OPNsense, Security Tools, Virtualization
   Link: [CLICK:/projects/building-cybersecurity-home-lab]

6. Full Hardware Cybersecurity Lab
   Complete hardware-based cybersecurity laboratory setup
   Technologies: Hardware Security, Network Infrastructure, Security Tools
   Link: [CLICK:/projects/building-full-hardware-cybersecurity-homelab]

7. Ubuntu Server, Docker and Portainer Installation
   Containerization setup with Docker and Portainer management
   Technologies: Ubuntu Server, Docker, Portainer, Containerization
   Link: [CLICK:/projects/ubuntu-server-docker-portainer]

8. Vulnerable Machine Installation
   Setup and configuration of vulnerable machines for testing
   Technologies: Virtual Machines, Security Testing, Penetration Testing
   Link: [CLICK:/projects/vulnerable-machines-installation]

Type 'help' to see available commands, or 'contact' to discuss collaborations!`
      }
    },
    {
      name: "skills",
      description: "My technical skills",
      action: () => {
        return `Technical Skills:

Security Tools:
• Wazuh, TheHive, Elastic Stack
• Metasploit, Nmap, Wireshark
• OPNsense, Proxmox, Docker

Programming & Scripting:
• Python, Bash, PowerShell
• JavaScript, TypeScript, React
• SQL, HTML/CSS

Security Frameworks:
• NIST Cybersecurity Framework
• MITRE ATT&CK
• ISO 27001

Operating Systems:
• Linux (Ubuntu, Kali, Parrot)
• Windows Server, macOS
• Virtualization & Containers`
      }
    },
         {
       name: "experience",
       description: "Work experience",
       action: () => {
         return `Work Experience:

[Cybersecurity Engineer – Softdroom HQ, May 2022 – Oct 2023]
- Performed vulnerability scans, config reviews, and assisted with DevSecOps in CI/CD pipelines.
- Supported user-reported incident investigations, reinforced platform security.
- Gained hands-on exposure to OWASP Top 10, secure coding, and compliance reviews.

[System Operator – Transmission Company of Nigeria, June 2021 – Apr 2022]
- Monitored SCADA systems and infrastructure security.
- Helped detect faults and reduce collapse incidents through real-time telemetry analysis.
- Supported ICS/OT cybersecurity event handling and technical response.

[Backend & Infrastructure Engineer – Versuspay, Mar 2020 – May 2021]
- Worked on backend security and API testing for payment systems.
- Supported DevOps routines, CI/CD pipelines, and infrastructure hardening.

[Intern – HiiT plc, Mar 2018 – Sept 2018]
- Developed a Hospital Management System using Java and MySQL.
- Built front-end interfaces and maintained backend databases.`
       }
     },
         {
       name: "contact",
       description: "Contact information",
       action: () => {
         return `Contact Information:

LinkedIn: [CLICK:https://www.linkedin.com/in/otori-samson/]
Portfolio: [CLICK:https://117secops.com]`
       }
     },
         {
       name: "education",
       description: "Educational background",
       action: () => {
         return `Education:

[MSc Cybersecurity, Edge Hill University, UK — 2024–2025]
Focus: Malware Analysis, Infrastructure Security, Penetration Testing.

[BSc Computer Science, Veritas University, Abuja — 2015–2020]
Focus: Networks, Security, Software Engineering.`
       }
     },
         {
       name: "certifications",
       description: "Professional certifications",
       action: () => {
         return `Certifications:

- Microsoft Security, Compliance & Identity Fundamentals (2024)
- Google IT Support Professional (2022)
- IBM Technical Support Professional (2022)
- FMVA – Financial Modelling & Valuation Analyst (2022)
- Google Digital Marketing Fundamentals (2021)
- Oracle Certified Java Professional SE7 (2018)`
       }
     },

         {
       name: "sudo su",
       description: "Gain root access",
       action: () => {
         return `Nice try! You can never be root.
 Only Samson can be root.
 But I like how you think — you're thinking like a security professional.`
       }
     },
    {
      name: "open",
      description: "Open a specific project or section",
      action: (args) => {
        const target = args?.[0]
        if (!target) {
          return `Usage: open <keyword>\n\nAvailable keywords:
• buildlab     - Building a Cybersecurity Home Lab
• socauto      - SOC Automation Project
• mydfir30     - 30-Day MYDFIR SOC Analyst Challenge
• hardwarelab  - Full Hardware Cybersecurity Lab
• vlans        - VLAN Segmentation
• dockersetup  - Docker Installation
• vulnmachines - Vulnerable Machine Installation
• upgrade1     - Proxmox 4TB Upgrade

Or use 'projects' to see all available projects.`
        }
        
        // Check if it's a number (1-8)
        const projectNumber = parseInt(target)
        if (projectNumber >= 1 && projectNumber <= 8) {
          const projectUrls = [
            '/projects/upgrade-1-4tb-sata-hard-drive-proxmox',
            '/projects/vlans-segmentation-homelab',
            '/projects/soc-automation-project',
            '/projects/30-day-mydfir-soc-analyst-challenge-part0',
            '/projects/building-cybersecurity-home-lab',
            '/projects/building-full-hardware-cybersecurity-homelab',
            '/projects/ubuntu-server-docker-portainer',
            '/projects/vulnerable-machines-installation'
          ]
          const projectNames = [
            'Upgrade 1: 4TB SATA Hard Drive Installation',
            'Project 4.1: VLANs Segmentation',
            'SOC Automation Project',
            '30-Day SOC Analyst Challenge',
            'Building a Cybersecurity Home Lab',
            'Full Hardware Cybersecurity Lab',
            'Ubuntu Server, Docker and Portainer Installation',
            'Vulnerable Machine Installation'
          ]
          window.open(projectUrls[projectNumber - 1], "_blank")
          return `Opening ${projectNames[projectNumber - 1]} in new tab...`
        }
        
        // Check keyword mapping
        const keyword = target.toLowerCase()
        if (projectMap[keyword]) {
          window.open(projectMap[keyword], "_blank")
          return `Opening ${target} in new tab...`
        }
        
        // Fallback to project name search
        const project = projects.find(p => p.name.toLowerCase().includes(target.toLowerCase()))
        if (project) {
          window.open(`/projects/${project.slug}`, "_blank")
          return `Opening ${project.name} in new tab...`
        } else {
          return `Project '${target}' not found. Use 'open' without arguments to see available keywords, or use numbers 1-8 to open projects.`
        }
      }
    },
    {
      name: "clear",
      description: "Clear terminal",
      action: () => {
        return ""
      }
    },
    {
      name: "exit",
      description: "Exit terminal mode",
      action: () => {
        onClose()
        return ""
      }
    }
  ]

  const addToHistory = (command: string, output: string) => {
    const newEntry: CommandHistory = {
      command,
      output,
      timestamp: new Date(),
      isTyping: true,
      typedOutput: ""
    }
    
    setHistory(prev => [...prev, newEntry])
    setCommandHistory(prev => [...prev, command])
    
    // Start typing animation
    animateOutput(output, history.length)
  }

  const animateOutput = async (output: string, entryIndex: number) => {
    if (output === "") {
      // Handle clear command
      setHistory([])
      return
    }

    let typedText = ""
    const speed = 13 // milliseconds per character (70% faster - 40% + 30%)

    for (let i = 0; i < output.length; i++) {
      typedText += output[i]
      
      setHistory(prev => prev.map((entry, index) => 
        index === entryIndex 
          ? { ...entry, typedOutput: typedText }
          : entry
      ))
      
      // Force scroll to bottom every few characters for smooth scrolling
      if (i % 3 === 0 && terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
      
      await new Promise(resolve => setTimeout(resolve, speed))
    }

    // Mark typing as complete
    setHistory(prev => prev.map((entry, index) => 
      index === entryIndex 
        ? { ...entry, isTyping: false }
        : entry
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const parts = input.split(" ")
    const commandName = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Handle multi-word commands like "sudo su"
    let fullCommand = input.trim()
    let command = commands.find(cmd => 
      cmd.name === commandName || cmd.aliases?.includes(commandName)
    )

    // If single word command not found, try to match the full input
    if (!command) {
      command = commands.find(cmd => 
        cmd.name === fullCommand || cmd.aliases?.includes(fullCommand)
      )
    }

    if (command) {
      const output = command.action(args)
      addToHistory(input, output)
    } else {
      addToHistory(input, `Command '${fullCommand}' not found. Type 'help' for available commands.`)
    }

    setInput("")
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      // Basic tab completion
      const currentInput = input.toLowerCase()
      const suggestions = commands.filter(cmd => 
        cmd.name.startsWith(currentInput) || 
        cmd.aliases?.some(alias => alias.startsWith(currentInput))
      )
      
      if (suggestions.length === 1) {
        setInput(suggestions[0].name + " ")
      }
    }
  }

  // Handle input focus for mobile keyboard visibility
  const handleInputFocus = () => {
    if (isMobile && inputRef.current) {
      // Small delay to ensure keyboard is visible
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }, 300)
    }
  }

  const handleMenuClick = (command: string) => {
    if (isTyping) return
    setInput(command)
    handleSubmit({ preventDefault: () => {} } as any)
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Auto-scroll during typing animation
  useEffect(() => {
    if (terminalRef.current && isTyping) {
      const scrollToBottom = () => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
      }
      
      // Scroll every 50ms during typing to keep up with the animation
      const scrollInterval = setInterval(scrollToBottom, 50)
      
      return () => clearInterval(scrollInterval)
    }
  }, [isTyping])

  // Auto-scroll when history changes (for new commands)
  useEffect(() => {
    if (terminalRef.current) {
      const scrollToBottom = () => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
      }
      
      // Small delay to ensure DOM is updated
      setTimeout(scrollToBottom, 10)
    }
  }, [history])

  // Auto-run welcome command on first load
  useEffect(() => {
    if (history.length === 0) {
      const welcomeCommand = commands.find(cmd => cmd.name === "welcome")
      if (welcomeCommand) {
        const output = welcomeCommand.action()
        addToHistory("welcome", output)
      }
    }
  }, [])

    return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black text-red-500 font-mono flex flex-col"
    >
             {isMobile ? (
         // Mobile Layout - Full Screen Terminal
         <div className="flex flex-col h-full">
           {/* Mobile Header */}
           <div className="flex justify-between items-center p-4 border-b-2 border-red-500">
             <h1 className="text-xl font-bold text-red-500">Otori Samson</h1>
             <button
               onClick={onClose}
               className="text-red-500 hover:text-red-400 font-bold text-sm px-3 py-1 border border-red-500 rounded"
             >
               EXIT
             </button>
           </div>

                                   {/* Mobile Terminal Content */}
            <div className="flex-1 flex flex-col justify-start px-4 py-4 overflow-y-auto">
              {/* Terminal Output */}
              <div 
                ref={terminalRef}
                className="w-full text-sm"
              >
                {/* Command History */}
                {history.map((entry, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400">
                        samson@117secops:~$
                      </span>
                      <span className="text-white">{entry.command}</span>
                    </div>
                    {entry.output && (
                      <div className="mt-1 ml-4 whitespace-pre-wrap text-white overflow-x-auto">
                        <span className="font-mono">
                          {(entry.typedOutput || '').split('[CLICK:').map((part, index) => {
                            if (index === 0) return part;
                            const [url, ...rest] = part.split(']');
                            const remainingText = rest.join(']');
                            return (
                              <span key={index}>
                                <button
                                  onClick={() => window.open(url, '_blank')}
                                  className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
                                >
                                  {url}
                                </button>
                                {remainingText}
                              </span>
                            );
                          })}
                          {entry.isTyping && (
                            <span className={`inline-block w-3 h-5 bg-red-500 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Input Line */}
                <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full relative mt-4">
                  <span className="text-blue-400 text-sm">
                    samson@117secops:~$
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputFocus}
                    className="flex-1 bg-transparent outline-none text-white text-sm"
                    style={{
                      caretColor: 'transparent'
                    }}
                    placeholder=""
                    disabled={isTyping}
                  />
                  <div 
                    className={`w-3 h-5 bg-red-500 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                    style={{
                      position: 'absolute',
                      left: `${(input.length * 6) + 170}px`,
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  ></div>
                </form>
              </div>
            </div>

            {/* Mobile Bottom Status Bar */}
            <div className="flex justify-between items-center text-xs text-red-400/70 border-t-2 border-red-500 p-4">
              <div>
                samson@117secops:~$
              </div>
              <div className="flex items-center space-x-4">
                <span>{currentTime.toLocaleTimeString()}</span>
                <span>{currentTime.toLocaleDateString()}</span>
              </div>
            </div>
         </div>
      ) : (
        // Desktop Layout - Original Split Screen
        <>
          {/* Header Menu Bar */}
          <div className="flex justify-between items-center p-4 border-b-2 border-red-500 bg-black">
            <div className="text-red-500 font-bold text-lg">
              117secops.com Terminal
            </div>
            <div className="flex items-center space-x-4 text-sm">
                             {["help", "about", "projects", "skills", "experience", "contact", "education", "certifications", "sudo su", "clear"].map((item, index) => (
                <div key={item} className="flex items-center">
                  <button
                    onClick={() => handleMenuClick(item)}
                    className="text-red-500 hover:text-red-400 hover:underline cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isTyping}
                  >
                    {item}
                  </button>
                                     {index < 9 && (
                     <span className="text-red-500 mx-2">|</span>
                   )}
                </div>
              ))}
              <button
                onClick={onClose}
                className="text-red-500 hover:text-red-400 hover:underline cursor-pointer"
              >
                exit
              </button>
            </div>
          </div>

          {/* Main Content - Split Layout */}
          <div className="flex flex-1 overflow-hidden border-2 border-red-500">
            {/* Left Side - 3D ID Card */}
            <div className="w-1/3 flex items-center justify-center p-8 border-r-2 border-red-500">
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-80 h-48 bg-gradient-to-br from-red-500/10 to-red-600/10 border-2 border-red-500 rounded-lg p-6 backdrop-blur-sm"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Card Content */}
                <div className="flex items-center space-x-4 h-full">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/images/placeholder-user.jpg"
                      alt="Samson Otori"
                      fill
                      className="object-cover rounded-full border-2 border-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-red-300 mb-1">
                      Samson Otori
                    </h2>
                    <p className="text-red-400 text-sm mb-2">
                      @samson_otori
                    </p>
                    <p className="text-red-500 text-xs">
                      Cybersecurity Analyst
                    </p>
                    <p className="text-red-500 text-xs">
                      SOC Analyst | Security Engineer
                    </p>
                  </div>
                </div>
                
                {/* Card Details */}
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="text-xs text-red-400/70">
                    <div>Portfolio: www.117secops.com</div>
                    <div>Status: Active</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Terminal */}
            <div className="w-2/3 flex flex-col p-6">
              {/* Terminal Output */}
              <div 
                ref={terminalRef}
                className="flex-1 overflow-y-auto mb-4 text-sm"
              >
                {/* Command History */}
                {history.map((entry, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400">
                        samson@117secops:~$
                      </span>
                      <span>{entry.command}</span>
                    </div>
                    {entry.output && (
                      <div className="mt-1 ml-4 whitespace-pre-wrap text-white">
                        <span>
                          {(entry.typedOutput || '').split('[CLICK:').map((part, index) => {
                            if (index === 0) return part;
                            const [url, ...rest] = part.split(']');
                            const remainingText = rest.join(']');
                            return (
                              <span key={index}>
                                <button
                                  onClick={() => window.open(url, '_blank')}
                                  className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
                                >
                                  {url}
                                </button>
                                {remainingText}
                              </span>
                            );
                          })}
                          {entry.isTyping && (
                            <span className={`inline-block w-3 h-5 bg-red-500 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                                 {/* Current Input Line */}
                 <form onSubmit={handleSubmit} className="flex items-center space-x-2 relative">
                  <span className="text-blue-400">
                    samson@117secops:~$
                  </span>
                                 <input
                 ref={inputRef}
                 type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={handleKeyDown}
                 className="flex-1 bg-transparent outline-none text-red-500"
                 style={{
                   caretColor: 'transparent'
                 }}
                 placeholder=""
                 disabled={isTyping}
               />
               <div 
                 className={`w-3 h-5 bg-red-500 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                 style={{
                   position: 'absolute',
                   left: `${(input.length * 8) + 150}px`,
                   top: '50%',
                   transform: 'translateY(-50%)'
                 }}
               ></div>
                </form>
              </div>

              {/* Bottom Status Bar */}
              <div className="flex justify-between items-center text-xs text-red-400/70 border-t-2 border-red-500 pt-2">
                <div>
                  samson@117secops:~$
                </div>
                <div className="flex items-center space-x-4">
                  <span>Content Script</span>
                  <span>{currentTime.toLocaleTimeString()}</span>
                  <span>{currentTime.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
} 