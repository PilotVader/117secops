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

    let newContent = content
      // Process InlineGallery components first
      .replace(/<InlineGallery images=\{([^}]+)\} title="([^"]*)" \/>/g, '{{INLINE_COMPONENT:InlineGallery:$1:$2}}')
      
      // Headers with proper spacing
      .replace(/^### (.*$)/gim, '\n<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>\n')
      .replace(/^## (.*$)/gim, '\n<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>\n')
      .replace(/^# (.*$)/gim, '\n<h1 class="text-3xl font-bold mt-10 mb-6">$1</h1>\n')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Links with proper styling
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
      
      // Code blocks
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      
      // Paragraphs with proper spacing
      .replace(/\n\n+/g, '</p>\n<p class="mb-4 leading-relaxed">')
      
      // Clean up empty paragraphs
      .replace(/<p><\/p>/g, '')
      .replace(/<p>\s*<\/p>/g, '')
      .replace(/<p>\s*<\/p>/g, '')

    // Ensure content is wrapped in paragraphs
    if (!newContent.startsWith('<')) {
      newContent = '<p class="mb-4 leading-relaxed">' + newContent
    }
    if (!newContent.endsWith('>')) {
      newContent = newContent + '</p>'
    }

    // Add proper spacing around headers
    newContent = newContent
      .replace(/(<h[1-3][^>]*>)/g, '\n$1')
      .replace(/(<\/h[1-3]>)/g, '$1\n')

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
    const galleries: { [key: string]: string[] } = {
      "wazuh-server-deployment": [
        "/images/projects/hardware-lab/1-Ubuntu-server-wazuh-summary.png",
        "/images/projects/hardware-lab/2-ubuntuServer-Wazuh-installed.png",
        "/images/projects/hardware-lab/3-SSHed into wazuh server from parrot OS.png",
        "/images/projects/hardware-lab/4-wazuh-installation.png",
        "/images/projects/hardware-lab/5-wazuh-installed.png",
        "/images/projects/hardware-lab/6-wazuh-login-page.png",
        "/images/projects/hardware-lab/7-wazuh-dashboard.png"
      ],
      "agent-installation": [
        "/images/projects/hardware-lab/8-taking-commands-for-agent-installation-in-wazuh.png",
        "/images/projects/hardware-lab/9-wazuh-agent-installation.png",
        "/images/projects/hardware-lab/10-wazuh-agent-installed-in-parrot.png",
        "/images/projects/hardware-lab/11-wazuh-agents-installed-in-docker-server.png",
        "/images/projects/hardware-lab/12-installing-dependencies-on-docker-server.png",
        "/images/projects/hardware-lab/12-still-installing-dependencies-on-docker-server.png",
        "/images/projects/hardware-lab/13-adding-config-code to-ossec-file-in-docker-server.png",
        "/images/projects/hardware-lab/14-agent reflecting.png",
        "/images/projects/hardware-lab/15-logs now being farwarded to wazuh server from docker server.png"
      ],
      "opnsense-setup": [
        "/images/projects/hardware-lab/1-enabling secure shell on opnsense.png",
        "/images/projects/hardware-lab/2-SSHing into my firewall.png",
        "/images/projects/hardware-lab/3-checking content of FreeBSD config.png",
        "/images/projects/hardware-lab/4-using VI to edit FreeBSD content.png",
        "/images/projects/hardware-lab/5-edited freeBSD content and ran update.png",
        "/images/projects/hardware-lab/6-searching wazuh agent on OPNsense.png",
        "/images/projects/hardware-lab/7-Installing recent wazuh agent on OPNsense.png",
        "/images/projects/hardware-lab/8-wazuh agent installed succesfully.png",
        "/images/projects/hardware-lab/9-copying localtime to etc and accessing ossec config file for editing.png",
        "/images/projects/hardware-lab/10-edited the ossec config file to include wazuh ip.png",
        "/images/projects/hardware-lab/11-enable wazuh agent on OPNsense firewall.png",
        "/images/projects/hardware-lab/12-wazuh agent started succesfully.png",
        "/images/projects/hardware-lab/13-agent showing on wazuh agent dashboard.png"
      ],
      "nessus-deployment": [
        "/images/projects/hardware-lab/14 - Creating ubuntu server vm on proxmox for nessus installation.png",
        "/images/projects/hardware-lab/15 - editing the Ipv4 network config.png",
        "/images/projects/hardware-lab/16 - Installation of ubuntu server VM started.png",
        "/images/projects/hardware-lab/17 - taking the download link from nessus site.png",
        "/images/projects/hardware-lab/18 - SSHed into my ubuntu server and downloading nessus via terminal.png",
        "/images/projects/hardware-lab/19 - extracted  Nessus .png",
        "/images/projects/hardware-lab/20 - started nessus service on terminal.png",
        "/images/projects/hardware-lab/21 - accessed nessus web interface using ip and port.png",
        "/images/projects/hardware-lab/22 - downloading nessus plugin after account setup.png",
        "/images/projects/hardware-lab/23 - Nessus dashboard loaded.png",
        "/images/projects/hardware-lab/24 - Trying to set up a new scan.png",
        "/images/projects/hardware-lab/25 - Simple scan details.png",
        "/images/projects/hardware-lab/26 - Scan results out 1.png",
        "/images/projects/hardware-lab/27 - scan results out 2.png",
        "/images/projects/hardware-lab/28 - scan results out 3.png"
      ]
    }

    return galleries[imagesKey] || []
  }

  return (
    <div 
      ref={contentRef}
      className={`prose prose-gray dark:prose-invert max-w-none ${groupId}`}
    >
      {renderContentWithComponents()}
    </div>
  )
}
