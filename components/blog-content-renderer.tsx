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
            // Get descriptive image names
            const imageNames = getImageNames(imagesKey)
            
            // Debug: Log the image names to see if they're being passed correctly
            console.log('Gallery:', imagesKey, 'Image Names:', imageNames)
            
            elements.push(
              <InlineGallery 
                key={`component-${i}`} 
                images={galleryImages}
                imageNames={imageNames}
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
      ],
      // Security Onion deployment walkthrough (Project 4.5)
      "security-onion-deployment": [
        "/images/projects/hardware-lab/23 - Security Onion specifications during vm creation.png",
        "/images/projects/hardware-lab/24 - adding second netwrok adapter for security onion.png",
        "/images/projects/hardware-lab/25 - Security Onion installation started.png",
        "/images/projects/hardware-lab/26 - security onion installation process.png",
        "/images/projects/hardware-lab/27 - Installation finally complete after 2 hours!!!!.png",
        "/images/projects/hardware-lab/28 - accessing the security onion web interface.png",
        "/images/projects/hardware-lab/29 - security onion overview page.png",
        "/images/projects/hardware-lab/30 - security onion dashboard beautiful.png"
      ],
      // Caldera deployment walkthrough (Project 4.5)
      "caldera-deployment": [
        "/images/projects/hardware-lab/1 - Caldera VM specifications during creation.png",
        "/images/projects/hardware-lab/2 - ubuntu server for caldera installation started.png",
        "/images/projects/hardware-lab/3 - ubuntu server installation for caldera complete .png",
        "/images/projects/hardware-lab/4 - SSHed into caldera ubuntu VM on proxmox.png",
        "/images/projects/hardware-lab/5 - caldera documentation that would be used for installation.png",
        "/images/projects/hardware-lab/6 - caldera download started from github repo.png",
        "/images/projects/hardware-lab/7 - python3 installation for caldera.png",
        "/images/projects/hardware-lab/8 - installing pip requirement .png",
        "/images/projects/hardware-lab/8 - installing pip requirement coming out with an error.png",
        "/images/projects/hardware-lab/9 - installing python virtal environment to install pip3 requirements.png",
        "/images/projects/hardware-lab/10 - now in the virtual environment.png",
        "/images/projects/hardware-lab/11 - installing requirements in virtual environment.png",
        "/images/projects/hardware-lab/12 - installing requirements in virtual environment 2.png",
        "/images/projects/hardware-lab/13 - error when trying to start caldera server.png",
        "/images/projects/hardware-lab/14 - error continuation.png",
        "/images/projects/hardware-lab/15 - error again when trying to build - so would install nodejs first.png",
        "/images/projects/hardware-lab/16 - nodejs installation started.png",
        "/images/projects/hardware-lab/17 - re-entered virtual env and building again.png",
        "/images/projects/hardware-lab/18 - build process running and was succesful.png",
        "/images/projects/hardware-lab/19 - caldera started.png",
        "/images/projects/hardware-lab/20 - caldera web interface accessed.png",
        "/images/projects/hardware-lab/21 - loggin into caldera as red.png",
        "/images/projects/hardware-lab/22 - logging into caldera as blue.png"
      ],
      // Windows Server 2022 deployment walkthrough (Project 4.6)
      "windows-server-deployment": [
        "/images/projects/hardware-lab/1 - Creating windows server 2022 VM on proxmox.png",
        "/images/projects/hardware-lab/2 - Added second iso file for driver during installation.png",
        "/images/projects/hardware-lab/3 - Windwos server installation started.png",
        "/images/projects/hardware-lab/4 - No disk here because of driver issue - so we have to load the driver.png",
        "/images/projects/hardware-lab/5 - Loading driver from the second CD rom drive that was added.png",
        "/images/projects/hardware-lab/6 - this is the path to the driver.png",
        "/images/projects/hardware-lab/7 - this is the driver we are loading.png",
        "/images/projects/hardware-lab/8 - drive now showing after driver installation.png",
        "/images/projects/hardware-lab/9 - windows server 2022 installation complete.png",
        "/images/projects/hardware-lab/10 - windows servfer 2022.png",
        "/images/projects/hardware-lab/11 - windows server with the assigned address.png",
        "/images/projects/hardware-lab/12 - windows server dashboard.png",
        "/images/projects/hardware-lab/13 - GIVING THE WINDOWS SERVER A STATIC IP.png",
        "/images/projects/hardware-lab/14 - verifying the static ip settings.png",
        "/images/projects/hardware-lab/15 - Changed name for the server.png",
        "/images/projects/hardware-lab/16 - Adding features and services in my windows server.png",
        "/images/projects/hardware-lab/17 - selected services installing.png",
        "/images/projects/hardware-lab/18 - services installed succesfully.png",
        "/images/projects/hardware-lab/19 - promoting the server to a domain controller .png",
                 "/images/projects/hardware-lab/20 - configured and passed checked for installation.png",
         "/images/projects/hardware-lab/21 - Domain controller configured and reboot next.png"
       ],
       // User and Group Configuration walkthrough (Project 4.6)
       "user-group-configuration": [
         "/images/projects/hardware-lab/22 - Security groups and users creation.png",
         "/images/projects/hardware-lab/23 - Group creation.png",
         "/images/projects/hardware-lab/24 - 1st User creation.png",
         "/images/projects/hardware-lab/25 - 1st user created.png",
         "/images/projects/hardware-lab/26 - 2nd user created.png",
         "/images/projects/hardware-lab/27 - Adding admin user to Domian Admins group.png"
       ],
       // DHCP Migration walkthrough (Project 4.6)
       "dhcp-migration": [
         "/images/projects/hardware-lab/28 - disabling dhcp on vlan 20 to move it accross to the DC firewall.png",
         "/images/projects/hardware-lab/29 - moving dhcp from router to dc firewall.png",
         "/images/projects/hardware-lab/30 - dhcp moved from router to dc firewall.png"
       ],
       // Group Policy Drive Mapping walkthrough (Project 4.6)
       "group-policy-drive-mapping": [
         "/images/projects/hardware-lab/31 - SHARED FOLDER CREATION TO BE MAPPED AS A DRIVE ACCROSS THE WORKSTATIONS.png",
         "/images/projects/hardware-lab/31.5 - SHARED FOLDER CREATION TO BE MAPPED AS A DRIVE ACCROSS THE WORKSTATIONS.png",
         "/images/projects/hardware-lab/32 - using group policy to make the shared folder a drive.png",
         "/images/projects/hardware-lab/33 - made group policy to ensure the shared folder is seen as a drive.png",
         "/images/projects/hardware-lab/33.5 - made group policy to ensure the shared folder is seen as a drive.png",
         "/images/projects/hardware-lab/34 - making my initially created user part of the security group.png",
         "/images/projects/hardware-lab/35 - making the admin user part of the security group also.png"
       ],
       // Windows 10 Workstation Domain Join walkthrough (Project 4.6)
       "windows-10-domain-join": [
         "/images/projects/hardware-lab/36 - windows 10 already built hardware settings.png",
         "/images/projects/hardware-lab/37 - adding my windows 10 to my domian account.png",
         "/images/projects/hardware-lab/38 - windows 10 added to domian.png",
         "/images/projects/hardware-lab/39 - loggin in as my domain user account in windows 10.png",
         "/images/projects/hardware-lab/40 - shared folder to server as drive displaying in my windows 10 account after logging in to my domain account from my windows server.png",
         "/images/projects/hardware-lab/41 - test file showing in the shared folder directory.png"
       ]
     }

    return galleries[imagesKey] || []
  }

  // Function to get descriptive image names based on key
  const getImageNames = (imagesKey: string) => {
    const imageNames: { [key: string]: string[] } = {
      "wazuh-server-deployment": [
        "Ubuntu Server Wazuh Summary",
        "Wazuh Installation on Ubuntu Server",
        "SSH Connection to Wazuh Server",
        "Wazuh Installation Process",
        "Wazuh Successfully Installed",
        "Wazuh Login Interface",
        "Wazuh Dashboard Overview"
      ],
      "agent-installation": [
        "Agent Installation Commands",
        "Wazuh Agent Installation Process",
        "Agent Installed on Parrot OS",
        "Agents Installed on Docker Server",
        "Installing Dependencies on Docker",
        "Dependencies Installation Progress",
        "OSSEC Configuration File Setup",
        "Agent Status Verification",
        "Log Forwarding to Wazuh Server"
      ],
      "opnsense-setup": [
        "Enabling Secure Shell on OPNsense",
        "SSH Connection to Firewall",
        "FreeBSD Configuration Check",
        "Editing FreeBSD Configuration",
        "FreeBSD Configuration Update",
        "Searching for Wazuh Agent",
        "Installing Wazuh Agent on OPNsense",
        "Wazuh Agent Installation Success",
        "Timezone and OSSEC Config Setup",
        "OSSEC Configuration with Wazuh IP",
        "Enabling Wazuh Agent on Firewall",
        "Wazuh Agent Service Started",
        "Agent Dashboard Verification"
      ],
      "nessus-deployment": [
        "Creating Ubuntu VM for Nessus",
        "IPv4 Network Configuration",
        "Ubuntu Server VM Installation",
        "Nessus Download Link",
        "SSH and Nessus Download",
        "Nessus Package Extraction",
        "Starting Nessus Service",
        "Nessus Web Interface Access",
        "Nessus Plugin Download",
        "Nessus Dashboard Loaded",
        "Setting Up New Scan",
        "Simple Scan Configuration",
        "Scan Results Overview 1",
        "Scan Results Overview 2",
        "Scan Results Overview 3"
      ],
      // Security Onion deployment walkthrough (Project 4.5)
      "security-onion-deployment": [
        "VM specs for Security Onion",
        "Add second network adapter",
        "Installation started",
        "Installation progress",
        "Installation complete (~2 hours)",
        "Access Security Onion web UI",
        "Overview page",
        "Dashboard view"
      ],
      // Caldera deployment walkthrough (Project 4.5) - concise, human-friendly titles
      "caldera-deployment": [
        "Proxmox VM specs for Caldera",
        "Ubuntu Server setup begins",
        "Ubuntu install complete",
        "SSH into Caldera VM",
        "Caldera install docs",
        "Cloning Caldera from GitHub",
        "Install Python 3",
        "Install pip dependencies",
        "Pip error encountered",
        "Create Python virtual environment",
        "Virtual environment activated",
        "Install requirements in venv",
        "Requirements installation progress",
        "Server start error",
        "Error details",
        "Build fails — installing Node.js",
        "Node.js installation",
        "Rebuild inside virtual env",
        "Build succeeded",
        "Caldera server running",
        "Caldera web UI accessed",
        "Login as Red Team",
        "Login as Blue Team"
      ],
      // Windows Server 2022 deployment walkthrough (Project 4.6) - concise, human-friendly titles
      "windows-server-deployment": [
        "Creating Windows Server 2022 VM in Proxmox",
        "Adding VirtIO ISO for driver support",
        "Windows Server installation begins",
        "Storage device not detected - driver issue",
        "Loading VirtIO driver from second CD-ROM",
        "Driver file path location",
        "Selecting the appropriate driver",
        "Storage drive now visible after driver install",
        "Windows Server 2022 installation complete",
        "Windows Server 2022 desktop",
        "Server with DHCP-assigned IP address",
        "Windows Server dashboard",
        "Configuring static IP address",
        "Verifying static IP configuration",
        "Renaming server to PROJECT-DC",
        "Adding Active Directory roles and features",
        "Installing selected services",
        "Services installation completed successfully",
        "Promoting server to domain controller",
                 "Configuration validation passed",
         "Domain controller configured - reboot required"
       ],
       // User and Group Configuration walkthrough (Project 4.6) - concise, human-friendly titles
       "user-group-configuration": [
         "Security groups and users creation overview",
         "Creating Shared Folder Access security group",
         "Creating first user account",
         "First user account successfully created",
         "Second user account created",
         "Adding admin user to Domain Admins group"
       ],
       // DHCP Migration walkthrough (Project 4.6) - concise, human-friendly titles
       "dhcp-migration": [
         "Disabling DHCP on VLAN 20 to migrate to domain controller",
         "Moving DHCP service from router to domain controller",
         "DHCP successfully migrated from router to domain controller"
       ],
       // Group Policy Drive Mapping walkthrough (Project 4.6) - concise, human-friendly titles
       "group-policy-drive-mapping": [
         "Creating shared folder for network drive mapping",
         "Shared folder creation continued",
         "Configuring Group Policy for drive mapping",
         "Group Policy configuration for shared folder drive",
         "Group Policy drive mapping configuration continued",
         "Adding first user to security group",
         "Adding admin user to security group"
       ],
       // Windows 10 Workstation Domain Join walkthrough (Project 4.6) - concise, human-friendly titles
       "windows-10-domain-join": [
         "Windows 10 VM hardware configuration",
         "Adding Windows 10 workstation to domain",
         "Windows 10 successfully joined to domain",
         "Logging in with domain user account",
         "Shared folder mapped as network drive",
         "Test file visible in shared folder"
       ]
     }

    return imageNames[imagesKey] || []
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
