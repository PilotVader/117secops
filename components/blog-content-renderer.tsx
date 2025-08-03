"use client"

import { useEffect, useState, useRef } from "react"
import { InlineGallery } from "./inline-gallery"

interface BlogContentRendererProps {
  content: string
  groupId?: string
  onImageClick?: (index: number) => void
  inlineComponents?: {
    [key: string]: React.ComponentType<any>
  }
}

export function BlogContentRenderer({ 
  content, 
  groupId = "blog-post", 
  onImageClick,
  inlineComponents = {}
}: BlogContentRendererProps) {
  const [processedContent, setProcessedContent] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!content) {
      setProcessedContent("")
      return
    }

    // Process content to handle inline components
    let newContent = content

    // First, replace component placeholders with markers to preserve them
    newContent = newContent.replace(/<InlineGallery\s+images=\{([^}]+)\}\s+title="([^"]+)"\s*\/>/g, (match, imagesKey, title) => {
      return `{{INLINE_COMPONENT:InlineGallery:${imagesKey}:${title}}}`
    })

    // Convert markdown to HTML (simple conversion for basic elements)
    newContent = newContent
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Paragraphs - handle more carefully
      .replace(/\n\n+/g, '</p><p>')
      // Clean up empty paragraphs
      .replace(/<p><\/p>/g, '')
      .replace(/<p>\s*<\/p>/g, '')

    // Ensure content is wrapped in paragraphs
    if (!newContent.startsWith('<')) {
      newContent = '<p>' + newContent
    }
    if (!newContent.endsWith('>')) {
      newContent = newContent + '</p>'
    }

    setProcessedContent(newContent)
  }, [content])

  useEffect(() => {
    // Add click handlers to images if onImageClick is provided
    if (contentRef.current && onImageClick) {
      const images = contentRef.current.querySelectorAll("img")
      images.forEach((img, index) => {
        img.style.cursor = "pointer"
        img.addEventListener("click", (e) => {
          e.preventDefault()
          onImageClick(index)
        })
      })

      return () => {
        // Clean up event listeners
        images.forEach((img) => {
          img.removeEventListener("click", () => {})
        })
      }
    }
  }, [processedContent, onImageClick])

  // Function to render content with inline components
  const renderContentWithComponents = () => {
    if (!processedContent) return null

    // Split content by component markers
    const parts = processedContent.split(/{{INLINE_COMPONENT:([^}]+)}}/)
    const elements = []

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Regular content
        if (parts[i].trim()) {
          elements.push(
            <div 
              key={`content-${i}`}
              dangerouslySetInnerHTML={{ __html: parts[i] }} 
            />
          )
        }
      } else {
        // Component marker
        const [componentType, imagesKey, title] = parts[i].split(':')
        
        if (componentType === 'InlineGallery') {
          // Get images from the predefined galleries
          const galleryImages = getGalleryImages(imagesKey)
          
          if (galleryImages) {
            elements.push(
              <InlineGallery 
                key={`component-${i}`} 
                images={galleryImages}
                title={title || undefined}
              />
            )
          }
        }
      }
    }

    return elements
  }

  // Function to get gallery images based on key
  const getGalleryImages = (imagesKey: string) => {
    // Define your gallery images here - using exact filenames from directory
    const galleries: { [key: string]: { src: string; alt: string }[] } = {
      "wazuh-server-deployment": [
        { src: "/images/projects/hardware-lab/1-Ubuntu-server-wazuh-summary.png", alt: "Ubuntu server wazuh summary" },
        { src: "/images/projects/hardware-lab/2-ubuntuServer-Wazuh-installed.png", alt: "Ubuntu server Wazuh installed" },
        { src: "/images/projects/hardware-lab/3-SSHed into wazuh server from parrot OS.png", alt: "SSHed into wazuh server from parrot OS" },
        { src: "/images/projects/hardware-lab/4-wazuh-installation.png", alt: "Wazuh installation" },
        { src: "/images/projects/hardware-lab/5-wazuh-installed.png", alt: "Wazuh installed" },
        { src: "/images/projects/hardware-lab/6-wazuh-login-page.png", alt: "Wazuh login page" },
        { src: "/images/projects/hardware-lab/7-wazuh-dashboard.png", alt: "Wazuh dashboard" }
      ],
      "agent-installation": [
        { src: "/images/projects/hardware-lab/8-taking-commands-for-agent-installation-in-wazuh.png", alt: "Taking commands for agent installation in wazuh" },
        { src: "/images/projects/hardware-lab/9-wazuh-agent-installation.png", alt: "Wazuh agent installation" },
        { src: "/images/projects/hardware-lab/10-wazuh-agent-installed-in-parrot.png", alt: "Wazuh agent installed in parrot" },
        { src: "/images/projects/hardware-lab/11-wazuh-agents-installed-in-docker-server.png", alt: "Wazuh agents installed in docker server" },
        { src: "/images/projects/hardware-lab/12-installing-dependencies-on-docker-server.png", alt: "Installing dependencies on docker server" },
        { src: "/images/projects/hardware-lab/12-still-installing-dependencies-on-docker-server.png", alt: "Still installing dependencies on docker server" },
        { src: "/images/projects/hardware-lab/13-adding-config-code to-ossec-file-in-docker-server.png", alt: "Adding config code to ossec file in docker server" },
        { src: "/images/projects/hardware-lab/14-agent reflecting.png", alt: "Agent reflecting" },
        { src: "/images/projects/hardware-lab/15-logs now being farwarded to wazuh server from docker server.png", alt: "Logs now being forwarded to wazuh server from docker server" }
      ],
      "opnsense-setup": [
        { src: "/images/projects/hardware-lab/1-enabling secure shell on opnsense.png", alt: "Enabling secure shell on opnsense" },
        { src: "/images/projects/hardware-lab/2-SSHing into my firewall.png", alt: "SSHing into my firewall" },
        { src: "/images/projects/hardware-lab/3-checking content of FreeBSD config.png", alt: "Checking content of FreeBSD config" },
        { src: "/images/projects/hardware-lab/4-using VI to edit FreeBSD content.png", alt: "Using VI to edit FreeBSD content" },
        { src: "/images/projects/hardware-lab/5-edited freeBSD content and ran update.png", alt: "Edited freeBSD content and ran update" },
        { src: "/images/projects/hardware-lab/6-searching wazuh agent on OPNsense.png", alt: "Searching wazuh agent on OPNsense" },
        { src: "/images/projects/hardware-lab/7-Installing recent wazuh agent on OPNsense.png", alt: "Installing recent wazuh agent on OPNsense" },
        { src: "/images/projects/hardware-lab/8-wazuh agent installed succesfully.png", alt: "Wazuh agent installed successfully" },
        { src: "/images/projects/hardware-lab/9-copying localtime to etc and accessing ossec config file for editing.png", alt: "Copying localtime to etc and accessing ossec config file for editing" },
        { src: "/images/projects/hardware-lab/10-edited the ossec config file to include wazuh ip.png", alt: "Edited the ossec config file to include wazuh ip" },
        { src: "/images/projects/hardware-lab/11-enable wazuh agent on OPNsense firewall.png", alt: "Enable wazuh agent on OPNsense firewall" },
        { src: "/images/projects/hardware-lab/12-wazuh agent started succesfully.png", alt: "Wazuh agent started successfully" },
        { src: "/images/projects/hardware-lab/13-agent showing on wazuh agent dashboard.png", alt: "Agent showing on wazuh agent dashboard" }
      ],
      "nessus-deployment": [
        { src: "/images/projects/hardware-lab/14 - Creating ubuntu server vm on proxmox for nessus installation.png", alt: "Creating ubuntu server vm on proxmox for nessus installation" },
        { src: "/images/projects/hardware-lab/15 - editing the Ipv4 network config.png", alt: "Editing the Ipv4 network config" },
        { src: "/images/projects/hardware-lab/16 - Installation of ubuntu server VM started.png", alt: "Installation of ubuntu server VM started" },
        { src: "/images/projects/hardware-lab/17 - taking the download link from nessus site.png", alt: "Taking the download link from nessus site" },
        { src: "/images/projects/hardware-lab/18 - SSHed into my ubuntu server and downloading nessus via terminal.png", alt: "SSHed into my ubuntu server and downloading nessus via terminal" },
        { src: "/images/projects/hardware-lab/19 - extracted  Nessus .png", alt: "Extracted Nessus" },
        { src: "/images/projects/hardware-lab/20 - started nessus service on terminal.png", alt: "Started nessus service on terminal" },
        { src: "/images/projects/hardware-lab/21 - accessed nessus web interface using ip and port.png", alt: "Accessed nessus web interface using ip and port" },
        { src: "/images/projects/hardware-lab/22 - downloading nessus plugin after account setup.png", alt: "Downloading nessus plugin after account setup" },
        { src: "/images/projects/hardware-lab/23 - Nessus dashboard loaded.png", alt: "Nessus dashboard loaded" },
        { src: "/images/projects/hardware-lab/24 - Trying to set up a new scan.png", alt: "Trying to set up a new scan" },
        { src: "/images/projects/hardware-lab/25 - Simple scan details.png", alt: "Simple scan details" },
        { src: "/images/projects/hardware-lab/26 - Scan results out 1.png", alt: "Scan results out 1" },
        { src: "/images/projects/hardware-lab/27 - scan results out 2.png", alt: "Scan results out 2" },
        { src: "/images/projects/hardware-lab/28 - scan results out 3.png", alt: "Scan results out 3" }
      ]
    }

    return galleries[imagesKey] || null
  }

  return (
    <div className="prose prose-purple max-w-none dark:prose-invert prose-img:rounded-lg prose-img:mx-auto prose-img:shadow-md">
      <div ref={contentRef}>
        {renderContentWithComponents()}
      </div>
    </div>
  )
}
