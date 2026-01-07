"use client"

import { useEffect, useState, useRef } from "react"
import { InlineGallery } from "./inline-gallery"
import { CyberTerminalCodeBlock } from "./cyber-terminal-code-block"

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
      .replace(/<InlineGallery images=\{([^}]+)\} title="([^"]*)" \/>/g, '{{INLINE_COMPONENT:$1:$2}}')
      .replace(/<CyberTerminalCodeBlock code=(["'])(.*?)\1(?: title=(["'])(.*?)\3)? \/>/g, (match, q1, code, q2, title) => {
        return `{{CYBER_TERMINAL:${encodeURIComponent(code)}:${encodeURIComponent(title || "")}}}`
      })

      // Headers with proper spacing
      .replace(/^### (.*$)/gim, '\n<h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">$1</h3>\n')
      .replace(/^## (.*$)/gim, '\n<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">$1</h2>\n')
      .replace(/^# (.*$)/gim, '\n<h1 class="text-3xl font-bold mt-10 mb-6 text-gray-900 dark:text-gray-100">$1</h1>\n')

      // Ensure all paragraph text has consistent colors
      .replace(/^([^<\n].*)$/gm, '<p class="text-gray-900 dark:text-gray-100 mb-4">$1</p>')

      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      // Links with proper styling
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')

      // Force the specific write-up link FIRST (before general name replacement)
      .replace(/\[Felix Boulet's Original Write-up\]\([^)]+\)/g, '<a href="https://blog.qwertysecurity.com/Articles/blog3.html" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Felix Boulet\'s Original Write-up</a>')
      .replace(/Felix Boulet's Original Write-up/g, '<a href="https://blog.qwertysecurity.com/Articles/blog3.html" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Felix Boulet\'s Original Write-up</a>')

      // Specific name links (after the specific write-up link) - only replace standalone names, not within sentences
      .replace(/\bFelix Boulet\b(?!'s Original Write-up)/g, '<a href="https://www.linkedin.com/in/felix-boulet/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Felix Boulet</a>')
      .replace(/Philippe Dugre/g, '<a href="https://www.linkedin.com/in/zer0x64/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Philippe Dugre</a>')

      // Terminal → format - make it display on separate lines (process before inline code)
      .replace(/\*\*Terminal →\*\*\s*\r?\n\s*\r?\n\s*`([^`]+)`/g, (match, command) => {
        console.log('TERMINAL MATCH FOUND:', { match: match.substring(0, 50), command: command.substring(0, 30) })
        return '<div class="my-4"><div class="text-red-500 font-semibold mb-2">Terminal →</div><div class="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm"><code>' + command + '</code></div></div>'
      })

      // Fallback: Replace any remaining Terminal → text
      .replace(/Terminal →/g, '<div class="my-4"><div class="text-red-500 font-semibold mb-2">Terminal →</div></div>')

      // Code blocks - style as italic text
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const cleanCode = code.trim()
        return `<pre class="italic font-normal bg-gray-50 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code>${cleanCode}</code></pre>`
      })
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
          img.removeEventListener("click", () => { })
        })
      }
    }
  }, [processedContent, onImageClick])

  // Function to render content with inline components
  const renderContentWithComponents = () => {
    if (!processedContent) return null

    // Split content by component markers
    const parts = processedContent.split(/{{(INLINE_COMPONENT|CYBER_TERMINAL):([^}]+)}}/)
    const elements = []

    for (let i = 0; i < parts.length; i += 3) {
      // 1. Regular HTML Content (at part i)
      if (parts[i] && parts[i].trim()) {
        elements.push(
          <div
            key={`content-${i}`}
            dangerouslySetInnerHTML={{ __html: parts[i] }}
          />
        )
      }

      // If we are at the end, stop (captured parts are ahead)
      if (i + 2 >= parts.length) break

      const type = parts[i + 1]
      const data = parts[i + 2]

      if (type === "INLINE_COMPONENT") {
        const [imagesKey, ...titleParts] = data.split(':')
        const title = titleParts.join(':')
        const galleryImages = getGalleryImages(imagesKey)
        const galleryImageNames = getImageNames(imagesKey)

        if (galleryImages.length > 0) {
          elements.push(
            <InlineGallery
              key={`gallery-${i}`}
              images={galleryImages}
              title={title}
              imageNames={galleryImageNames}
              onImageClick={(imgIndex: number) => {
                // If onImageClick is provided (for lightbox), we just pass the local index for now
                // to avoid the complex global index calculation which is missing
                if (onImageClick) {
                  onImageClick(imgIndex)
                }
              }}
            />
          )
        }
      }
      else if (type === "CYBER_TERMINAL") {
        // Data is now colon-separated encoded strings: encodedCode:encodedTitle
        const parts = data.split(':')
        const encodedCode = parts[0]
        const encodedTitle = parts[1]

        const code = decodeURIComponent(encodedCode || "")
        // Handle cases where encodedTitle might be empty or undefined
        const title = encodedTitle ? decodeURIComponent(encodedTitle) : ""

        elements.push(
          <CyberTerminalCodeBlock
            key={`terminal-${i}`}
            code={code}
            title={title || "~/cyber-lab"}
          />
        )
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
      ],
      // TheHive Configuration walkthrough (Project 4.7)
      "internet-facing-device-investigation": [
        "/images/projects/project-5-1/1 - Using this query to get a general overview of the table content.png",
        "/images/projects/project-5-1/2 - Narrowing down to see all distinct devices in the table.png",
        "/images/projects/project-5-1/3 - Narrowing down further to the scope - i.e the computer im working with.png",
        "/images/projects/project-5-1/4 - picking one and checking for relevant information- here we can see the field isinternetfacing is 1 meaning the vm was online.png",
        "/images/projects/project-5-1/5 - narrowing further by viewing only the records where isinternetfacing is true and view them from most recent.png",
        "/images/projects/project-5-1/6 - getting into the windows logon events for the target system.png"
      ],
      "brute-force-analysis": [
        "/images/projects/project-5-1/7 - further streamline to see how many times diffrent IP addresses targeted a brute force attack on our target machine.png"
      ],
      "malicious-ip-validation": [
        "/images/projects/project-5-1/8 - Taking the top 7 desprate brute force attackers IP addresses to see if any of them have been able to login succesfully into our target machine .png"
      ],
      "account-failed-logons": [
        "/images/projects/project-5-1/9 - fine tuning the query to only see if the account name nicklabuser for the target machine has failed a login attempt.png",
        "/images/projects/project-5-1/12 - checking to see how many times the account nicklabuser has failed to login to the target machine.png"
      ],
      "account-successful-logons": [
        "/images/projects/project-5-1/10 - checking to see how many times the account nicklabuser has been able to login succesfully to the target machine.png",
        "/images/projects/project-5-1/11 - checking to see all the ip addresses that the account nicklabuser has used to login to this target machine.png"
      ],
      "thehive-configuration": [
        "/images/projects/hardware-lab/1 - Accessing the hive site.png",
        "/images/projects/hardware-lab/2 - the hive download page.png",
        "/images/projects/hardware-lab/3 - taking the ocker compose file to import in docker.png",
        "/images/projects/hardware-lab/4 - back to portainer to add new stack.png",
        "/images/projects/hardware-lab/5 - givint the stack a name and pasting the yml compose file content.png",
        "/images/projects/hardware-lab/6 - stack created.png",
        "/images/projects/hardware-lab/7 - All containers deployed.png",
        "/images/projects/hardware-lab/8 - the hive login accessed using the port.png",
        "/images/projects/hardware-lab/9 - the hive dashboard.png",
        "/images/projects/hardware-lab/10 - creating new organization.png",
        "/images/projects/hardware-lab/11 - adding user to the organization.png"
      ],
      // Cortex Setup walkthrough (Project 4.7)
      "cortex-setup": [
        "/images/projects/hardware-lab/12 - cortex login accessed.png",
        "/images/projects/hardware-lab/13 - loggin into cortex with created credential.png",
        "/images/projects/hardware-lab/14 - cortex dashboard accessed .png"
      ],
      // Docker CVE-2025-9074 demonstration walkthrough
      "docker-cve-demonstration": [
        "/images/blog/1 - Downloaded the older version of docker for desktop - the vilnerable version.png",
        "/images/blog/2 - POC testing .png",
        "/images/blog/3 - text file created in the host C drive.png",
        "/images/blog/4 - text content -pwned- written into the file from container to host machine.png"
      ],
      // VM Setup and Microsoft Defender Onboarding (Project 5.2)
      "vm-setup-onboarding": [
        "/images/projects/1- created new vm.png",
        "/images/projects/2 - RDP into the created vm .png",
        "/images/projects/3 - downloading the onboarding package for microsoft defender.png",
        "/images/projects/4 - extracted and running the package as an administrator.png",
        "/images/projects/5 - onboarding process started and eventually completed succesfully.png",
        "/images/projects/6 - VM showing in windows defender and active.png"
      ],
      // Network Investigation Analysis (Project 5.2)
      "network-investigation-analysis": [
        "/images/projects/7 - ran the code given in the excercise in my VM to observe with MD.png",
        "/images/projects/8 - checking what data is in the netwrok event logs for investigation.png",
        "/images/projects/9 - device file event logs for investigation.png",
        "/images/projects/10 - device process events logs for investigation.png"
      ],
      // Port Scan Investigation and Device Isolation (Project 5.2)
      "port-scan-investigation-isolation": [
        "/images/projects/11 - Samson-windows- failing connection requests.png",
        "/images/projects/12 - running another query and finding out its relation to being a port scan.png",
        "/images/projects/13 - checking to see what might had trigered the port scan and noticing a powershell script named portscanps1.png",
        "/images/projects/14 - I logged into the suspected computer to observe the powershell script that was used to conduct the port scan.png",
        "/images/projects/15 - next step taken was to isolate the device.png"
      ],
      // Data Exfiltration Detection and Analysis (Project 5.3)
      "data-exfiltration-detection-analysis": [
        "/images/projects/1 - Running the powershell command in the vm to get logs and for the scenerio.png",
        "/images/projects/2 - checking the suspected vm for any activity relating to zip files or data transfer.png",
        "/images/projects/3 - Narrowing down within a specific event to see what happend around that time frame and noticing sucpicious activities.png",
        "/images/projects/4 - these 2 activities where when the user installed 7zip app and used it to export and zip employee data .png",
        "/images/projects/5 - narrowing down to get more information on the software install process.png",
        "/images/projects/6 - narrowing down on this time frame to comfirm if this was actually a data exfiltration process and it was.png"
      ],
      // PwnCrypt Ransomware Investigation and Analysis (Project 5.4)
      "pwncrypt-ransomware-investigation": [
        "/images/projects/1 - Running the powershell script on the VM to generate telemetry for the scenario.png",
        "/images/projects/2 - Mass file modification high write volume detecting a device with a sudden spike in file modifications.png",
        "/images/projects/3 - Looking for many file rename extension changes.png",
        "/images/projects/4 - Looking for many files created in a specific folder staging behavior.png",
        "/images/projects/5 - Find evidence of script execution, downloads, or suspicious command lines.png",
        "/images/projects/6 - Search for process names commonly used to run scripts PowerShell, cmd, wmic, cscript, wscript.png",
        "/images/projects/7 - broaden my search window and include child relationships.png",
        "/images/projects/8 - pivoting to locate secondary payloads or delayed activity.png",
        "/images/projects/9 - pivoting into targeted IOC hunting for PwnCrypt activity.png",
        "/images/projects/10 - summarizing and pivoting to final verification.png",
        "/images/projects/11 - Find file events on Desktop Users that show created renamed modified files.png",
        "/images/projects/12 - confirming the presence of encrypted files in the target VM.png",
        "/images/projects/13 - confirming infection scope & origin (final KQL pivot).png",
        "/images/projects/14 - To confirm the link between powershell.exe and services.exe (and ensure it was not a legitimate service operation).png"
      ],
      // Brute Force Detection Workflow (Project 5.5)
      "brute-force-detection-workflow": [
        "/images/projects/01-logon-events-defender.png",
        "/images/projects/02-latest-logs.png",
        "/images/projects/03-bruteforce-detection-query.png",
        "/images/projects/04-create-analytics-rule.png",
        "/images/projects/05-trigger-rule.png"
      ],
      // Brute Force Investigation Workflow (Project 5.5)
      "brute-force-investigation-workflow": [
        "/images/projects/06-incident-detected.png",
        "/images/projects/07-incident-assigned.png",
        "/images/projects/08-investigation-map.png",
        "/images/projects/09-logon-success-check.png"
      ],
      // Brute Force Response and Closure (Project 5.5)
      "brute-force-response-closure": [
        "/images/projects/10-defender-scan or isolate device.png",
        "/images/projects/11-nsg-lockdown.png",
        "/images/projects/12-incident-documentation.png",
        "/images/projects/13-incident-closed.png"
      ],
      // PowerShell Suspicious Web Request Detection Workflow (Project 5.6)
      "powershell-suspicious-web-request": [
        "/images/projects/1 - Baseline DeviceProcessEvents - Verifying DeviceProcessEvents telemetry is flowing into the Log Analytics workspace..png",
        "/images/projects/2 – PowerShell activity on windows-target-1 Filtering DeviceProcessEvents to show only PowerShell executions on windows-target-1.png",
        "/images/projects/3 – Invoke-WebRequest detections Detecting PowerShell using Invoke-WebRequest to pull remote content on Windows-target-1.png"
      ],
      // PowerShell Analytics Rule Engineering (Project 5.6)
      "powershell-analytics-rule-engineering": [
        "/images/projects/4 – Analytics rule general settings Creating a Sentinel analytics rule to detect suspicious PowerShell web requests..png",
        "/images/projects/5 – Rule logic with query Scheduled rule logic running the PowerShell Invoke-WebRequest query every 4 hours over 24 hours of data.png",
        "/images/projects/6 – Entity mappings Mapping account, host, and process entities so Sentinel can build a meaningful investigation graph..png",
        "/images/projects/7 – MITRE ATT&CK selection Tagging the detection with relevant MITRE ATT&CK techniques for PowerShell and tool transfer..png",
        "/images/projects/8 – Rule summary Final confirmation of the analytics rule before deployment.png"
      ],
      // PowerShell Incident Triage (Project 5.6)
      "powershell-incident-triage": [
        "/images/projects/9 – PowerShell web request on the VM malicious PowerShell download executed on windows-target-1.png",
        "/images/projects/10 – Incident created Sentinel incident automatically created from the PowerShell Suspicious Web Request analytics rule..png",
        "/images/projects/11 – Incident assigned and set to Active Taking ownership of the incident and moving it into Active investigation.png"
      ],
      // PowerShell Investigation and Containment (Project 5.6)
      "powershell-investigation-containment": [
        "/images/projects/12 – Investigation graph Investigating the incident graph to see how PowerShell activity on windows-target-1 ties to accounts and processes..png",
        "/images/projects/13 – PowerShell commands from the incident Reviewing the exact PowerShell Invoke-WebRequest commands that downloaded remote scripts to windows-target-1.png",
        "/images/projects/14 – Script execution confirmation Confirming which downloaded PowerShell scripts were actually executed on samson-windows- and under which account..png",
        "/images/projects/15 – Defender actions on windows-target-1 Using Microsoft Defender for Endpoint to scan windows-target-1 and isolate it during investigation..png"
      ],
      // PowerShell Incident Closure (Project 5.6)
      "powershell-closure-documentation": [
        "/images/projects/16 – Incident activity log with notes Documenting investigation findings, containment actions, and lessons learned directly in the Sentinel incident..png",
        "/images/projects/17 – Incident closed as true positive Closing the PowerShell Suspicious Web Request incident as a true positive after completing investigation and response..png"
      ],
      // Impossible Travel Query Results (Project 5.7)
      "impossible-travel-query-results": [
        "/images/projects/2 – Potential impossible travel query results.png"
      ],
      // Impossible Travel Analytics Rule General Settings (Project 5.7)
      "impossible-travel-analytics-rule": [
        "/images/projects/3 – Analytics rule general settings.png"
      ],
      // Impossible Travel Rule Configuration and Incident (Project 5.7)
      "impossible-travel-rule-configuration": [
        "/images/projects/4 – Rule logic with KQL.png",
        "/images/projects/5 – Entity mappings for account.png",
        "/images/projects/6 – Rule summary before creation.png",
        "/images/projects/7 – Incident created from Potential Impossible Travel rule.png"
      ],
      // Impossible Travel Incident Investigation (Project 5.7)
      "impossible-travel-incident-investigation": [
        "/images/projects/8 – Incident details overview.png",
        "/images/projects/9 – Incident assigned and set to Active.png",
        "/images/projects/10 – Investigation graph for impossible travel.png"
      ],
      // Impossible Travel User Analysis and Closure (Project 5.7)
      "impossible-travel-user-analysis": [
        "/images/projects/11 – Detailed signin pattern for User A.png",
        "/images/projects/12 – Detailed signin pattern for User B.png",
        "/images/projects/16 – Incident closed with classification.png"
      ],
      // Excessive Azure Resource Creation/Deletion Detection Engineering (Project 5.8)
      "excessive-azure-resource-detection": [
        "/images/projects/2-azureactivity-baseline.png",
        "/images/projects/3-excessive-write-delete-query.png",
        "/images/projects/4-analytics-rule-general.png",
        "/images/projects/5-rule-logic-kql.png",
        "/images/projects/6-entity-mapping.png",
        "/images/projects/7-rule-summary-before-save.png"
      ],
      // Excessive Azure Resource Incident Triage (Project 5.8)
      "excessive-azure-resource-triage": [
        "/images/projects/8-incident-created.png",
        "/images/projects/9-incident-assigned-active.png"
      ],
      // Excessive Azure Resource Investigation and Closure (Project 5.8)
      "excessive-azure-resource-investigation": [
        "/images/projects/10-investigation-graph.png",
        "/images/projects/11-user-activity-pattern.png",
        "/images/projects/13-the-incident-closed.png"
      ],
      // TOR Browser Simulation - Downloading (Project 5.9)
      "tor-simulation-downloading": [
        "/images/projects/1 - downoloading tor with the office system.png"
      ],
      // TOR Browser Simulation - CMD Navigation (Project 5.9)
      "tor-simulation-cmd": [
        "/images/projects/2 - Navigate to the downloaded tor app in cmd .png"
      ],
      // TOR Browser Simulation - Silent Installation (Project 5.9)
      "tor-simulation-installation": [
        "/images/projects/3 - silently installing the tor browser on the system which creates a folder on the desktop.png"
      ],
      // TOR Browser Simulation - Opening Browser (Project 5.9)
      "tor-simulation-opening": [
        "/images/projects/4 - opening the tor browser from the folder in the desktop.png"
      ],
      // TOR Browser Simulation - Establishing Connection (Project 5.9)
      "tor-simulation-connection": [
        "/images/projects/5 - establishing connection.png"
      ],
      // TOR Browser Simulation - Location Check (Project 5.9)
      "tor-simulation-location": [
        "/images/projects/6 - checking current location through the the tor browser and seeing sweden.png"
      ],
      // TOR Browser Simulation - Dread URL (Project 5.9)
      "tor-simulation-dread-url": [
        "/images/projects/7 - checking to see the current dread url link .png"
      ],
      // TOR Browser Simulation - Accessing Dark Web (Project 5.9)
      "tor-simulation-darkweb": [
        "/images/projects/8 - accessing the dark web.png"
      ],
      // TOR Browser Simulation - Navigating Dark Web (Project 5.9)
      "tor-simulation-navigating": [
        "/images/projects/9 - another page within the dark web just to generate logs.png"
      ],
      // TOR Browser Simulation - Shopping List (Project 5.9)
      "tor-simulation-shopping-list": [
        "/images/projects/10 - list of drugs user bought from the darkweb.png"
      ],
      // TOR Browser Simulation - Deleting File (Project 5.9)
      "tor-simulation-deleting": [
        "/images/projects/11 - user deleting the list of drugs purchased made from the computer.png"
      ],
      // TOR Browser Simulation - Validating Logs (Project 5.9)
      "tor-simulation-validation": [
        "/images/projects/12 - just checking Microsoft defender to see if logs are coming in.png"
      ],
      // TOR Threat Hunt - File Discovery (Project 5.9 Part 2)
      "tor-threat-hunt-file-discovery": [
        "/images/projects/2-devicefileevents-tor-file-hits.png"
      ],
      // TOR Threat Hunt - Silent Installation (Project 5.9 Part 2)
      "tor-threat-hunt-installation": [
        "/images/projects/3-deviceprocessevents-silent-install.png"
      ],
      // TOR Threat Hunt - Browser Launch (Project 5.9 Part 2)
      "tor-threat-hunt-browser-launch": [
        "/images/projects/4-deviceprocessevents-tor-browser-launch.png"
      ],
      // TOR Threat Hunt - Network Activity (Project 5.9 Part 2)
      "tor-threat-hunt-network": [
        "/images/projects/6-networkevents-tor-ip-connection.png"
      ],
      // TOR Threat Hunt - Shopping List (Project 5.9 Part 2)
      "tor-threat-hunt-shopping-list": [
        "/images/projects/7-devicefileevents-shopping-list.png"
      ],
      // Tenable Vulnerability Management (Project 6.0)
      "tenable-dashboard": [
        "/images/projects/project-6-0/2 - Tenable Dashboard — Logged In.png"
      ],
      "tenable-firewall": [
        "/images/projects/project-6-0/3 - Firewall Disabled on VM.png"
      ],
      "tenable-registry": [
        "/images/projects/project-6-0/4 - LocalAccountTokenFilterPolicy Enabled.png"
      ],
      "tenable-nsg": [
        "/images/projects/project-6-0/5 - NSG Rule — Allow All Inbound Traffic.png"
      ],
      "tenable-ping": [
        "/images/projects/project-6-0/6 - Ping Test to Windows VM.png"
      ],
      "tenable-basic-config": [
        "/images/projects/project-6-0/7 - Tenable Scan Configuration — Basic Tab.png"
      ],
      "tenable-discovery-config": [
        "/images/projects/project-6-0/8 - Tenable Scan Configuration — Discovery Tab.png"
      ],
      "tenable-unauth-running": [
        "/images/projects/project-6-0/9 - Unauthenticated Scan pending.png",
        "/images/projects/project-6-0/10 - Unauthenticated Scan Running.png"
      ],
      "tenable-unauth-results": [
        "/images/projects/project-6-0/11 - Unauthenticated Scan Completed — Summary.png"
      ],
      "tenable-unauth-export": [
        "/images/projects/project-6-0/12 - Exporting Unauthenticated Scan Results.png"
      ],
      "tenable-creds": [
        "/images/projects/project-6-0/13 - Authenticated Credentials Added.png"
      ],
      "tenable-auth-running": [
        "/images/projects/project-6-0/14 - Authenticated Scan Running.png"
      ],
      "tenable-auth-results": [
        "/images/projects/project-6-0/15 - Authenticated Scan Completed — Summary.png"
      ],
      "tenable-auth-export": [
        "/images/projects/project-6-0/16 - Authenticated Results Exported.png"
      ],
      "tenable-comparison": [
        "/images/projects/project-6-0/17 - Side-by-Side Comparison — Auth vs Unauth.png"
      ],
      // Tenable Vulnerability Management - Linux (Project 6.1)
      "tenable-linux-dashboard": [
        "/images/projects/project-6-1/5 - Tenable Dashboard Login.png"
      ],
      "tenable-linux-vm-created": [
        "/images/projects/project-6-1/1 - Linux VM Created.png"
      ],
      "tenable-linux-nsg": [
        "/images/projects/project-6-1/2 - NSG Allow All Inbound.png"
      ],
      "tenable-linux-ping": [
        "/images/projects/project-6-1/3 - Ping Test to Linux VM.png"
      ],
      "tenable-linux-ssh": [
        "/images/projects/project-6-1/4 - SSH Logged Into Linux VM.png"
      ],
      "tenable-linux-basic-config": [
        "/images/projects/project-6-1/6 - Tenable Basic Config for Linux.png"
      ],
      "tenable-linux-discovery-config": [
        "/images/projects/project-6-1/7 - Tenable Discovery Config Linux.png"
      ],
      "tenable-linux-unauth-running": [
        "/images/projects/project-6-1/8 - Linux Unauthenticated Scan Running.png"
      ],
      "tenable-linux-unauth-results": [
        "/images/projects/project-6-1/9 - Linux Unauthenticated Scan Results.png"
      ],
      "tenable-linux-unauth-export": [
        "/images/projects/project-6-1/10 - Linux Unauthenticated PDF Export.png"
      ],
      "tenable-linux-root-login": [
        "/images/projects/project-6-1/11 - Root SSH Login Successful.png"
      ],
      "tenable-linux-creds": [
        "/images/projects/project-6-1/12 - Tenable Linux SSH Credentials Added.png"
      ],
      "tenable-linux-auth-running": [
        "/images/projects/project-6-1/13 - Linux Authenticated Scan Running.png"
      ],
      "tenable-linux-auth-results": [
        "/images/projects/project-6-1/14 - Linux Authenticated Scan Results.png"
      ],
      "tenable-linux-auth-export": [
        "/images/projects/project-6-1/15 - Linux Authenticated PDF Export.png"
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
      ],
      // Internet-Facing Device Investigation (Project 5.1) - concise, human-friendly titles
      "internet-facing-device-investigation": [
        "Using KQL query to get general overview of table content",
        "Narrowing down to see all distinct devices in the table",
        "Narrowing down further to the target computer",
        "Checking relevant information - VM was internet-facing",
        "Filtering records where IsInternetFacing is true and viewing most recent",
        "Accessing Windows logon events for the target system"
      ],
      // Brute Force Analysis (Project 5.1) - concise, human-friendly titles
      "brute-force-analysis": [
        "Analyzing brute force attack attempts from different IP addresses"
      ],
      // Malicious IP Validation (Project 5.1) - concise, human-friendly titles
      "malicious-ip-validation": [
        "Checking if top 7 persistent brute force attackers gained unauthorized access"
      ],
      // Account Failed Logons (Project 5.1) - concise, human-friendly titles
      "account-failed-logons": [
        "Fine-tuning query to check for failed login attempts on nick-labuser account",
        "Analyzing failed login attempts count for nick-labuser account"
      ],
      // Account Successful Logons (Project 5.1) - concise, human-friendly titles
      "account-successful-logons": [
        "Checking successful login attempts for nick-labuser account on target machine",
        "Analyzing all IP addresses used by nick-labuser account for logins"
      ],
      // TheHive Configuration walkthrough (Project 4.7) - concise, human-friendly titles
      "thehive-configuration": [
        "Accessing TheHive website",
        "TheHive download page",
        "Copying Docker Compose file for import",
        "Returning to Portainer to add new stack",
        "Naming the stack and pasting YAML content",
        "Stack successfully created",
        "All containers deployed and running",
        "TheHive login accessed via port",
        "TheHive dashboard overview",
        "Creating new organization",
        "Adding user to the organization"
      ],
      // Cortex Setup walkthrough (Project 4.7) - concise, human-friendly titles
      "cortex-setup": [
        "Cortex login accessed",
        "Logging into Cortex with created credentials",
        "Cortex dashboard accessed"
      ],
      // Docker CVE-2025-9074 demonstration walkthrough - concise, human-friendly titles
      "docker-cve-demonstration": [
        "Downloaded vulnerable Docker Desktop version",
        "Proof of concept testing in progress",
        "Text file created on host C: drive",
        "Pwned text written from container to host"
      ],
      // VM Setup and Microsoft Defender Onboarding (Project 5.2) - concise, human-friendly titles
      "vm-setup-onboarding": [
        "Created new VM in the environment",
        "RDP connection established to the VM",
        "Downloading Microsoft Defender onboarding package",
        "Running the onboarding package as administrator",
        "Onboarding process completed successfully",
        "VM showing as active in Windows Defender portal"
      ],
      // Tenable Vulnerability Management (Project 6.0)
      "tenable-dashboard": [
        "Tenable Dashboard View - Logged In"
      ],
      "tenable-firewall": [
        "Windows Firewall Disabled on VM"
      ],
      "tenable-registry": [
        "LocalAccountTokenFilterPolicy Enabled in Registry"
      ],
      "tenable-nsg": [
        "Azure NSG Rule Allowing All Inbound Traffic"
      ],
      "tenable-ping": [
        "Ping Test Validating VM Reachability"
      ],
      "tenable-basic-config": [
        "Tenable Scan Basic Configuration Tab"
      ],
      "tenable-discovery-config": [
        "Tenable Scan Discovery Configuration Tab"
      ],
      "tenable-unauth-running": [
        "Unauthenticated Scan Pending",
        "Unauthenticated Scan Running"
      ],
      "tenable-unauth-results": [
        "Unauthenticated Scan Completed Summary"
      ],
      "tenable-unauth-export": [
        "Exporting Unauthenticated Scan Results"
      ],
      "tenable-creds": [
        "Authenticated Credentials Added"
      ],
      "tenable-auth-running": [
        "Authenticated Scan Running"
      ],
      "tenable-auth-results": [
        "Authenticated Scan Completed Summary"
      ],
      "tenable-auth-export": [
        "Exporting Authenticated Scan Results"
      ],
      "tenable-comparison": [
        "Side-by-Side Comparison: Authenticated vs Unauthenticated"
      ],
      // Tenable Vulnerability Management - Linux (Project 6.1)
      "tenable-linux-dashboard": [
        "Tenable Dashboard View"
      ],
      "tenable-linux-vm-created": [
        "Ubuntu 22.04 VM Created in Azure"
      ],
      "tenable-linux-nsg": [
        "NSG Configuration - Allow All Inbound"
      ],
      "tenable-linux-ping": [
        "Ping Test - Verifying Connectivity"
      ],
      "tenable-linux-ssh": [
        "SSH Connection to Linux VM"
      ],
      "tenable-linux-basic-config": [
        "Tenable Basic Scan Configuration"
      ],
      "tenable-linux-discovery-config": [
        "Tenable Discovery Tab Configuration"
      ],
      "tenable-linux-unauth-running": [
        "Unauthenticated Scan In Progress"
      ],
      "tenable-linux-unauth-results": [
        "Unauthenticated Scan Results Summary"
      ],
      "tenable-linux-unauth-export": [
        "Exporting Unauthenticated Results to PDF"
      ],
      "tenable-linux-root-login": [
        "Root SSH Login Successfully Enabled"
      ],
      "tenable-linux-creds": [
        "SSH Credentials Added to Tenable"
      ],
      "tenable-linux-auth-running": [
        "Authenticated Scan In Progress"
      ],
      "tenable-linux-auth-results": [
        "Authenticated Scan Results Summary"
      ],
      "tenable-linux-auth-export": [
        "Exporting Authenticated Results to PDF"
      ],
      // Network Investigation Analysis (Project 5.2) - concise, human-friendly titles
      "network-investigation-analysis": [
        "Executing PowerShell script to generate network activity",
        "Analyzing network event logs for investigation",
        "Reviewing device file event logs for investigation",
        "Examining device process events logs for investigation"
      ],
      // Port Scan Investigation and Device Isolation (Project 5.2) - concise, human-friendly titles
      "port-scan-investigation-isolation": [
        "Samson-windows- device showing multiple failed connection requests",
        "Running additional queries to identify port scan activity",
        "Identifying PowerShell script as the source of port scanning",
        "Logging into suspected computer to examine the PowerShell script",
        "Isolating the compromised device from the network"
      ],
      // Data Exfiltration Detection and Analysis (Project 5.3) - concise, human-friendly titles
      "data-exfiltration-detection-analysis": [
        "Running the PowerShell command in the VM to generate logs for the scenario",
        "Checking the suspected VM for any activity relating to zip files or data transfer",
        "Narrowing down within a specific event to see what happened around that timeframe and noticing suspicious activities",
        "These 2 activities were when the user installed 7-Zip app and used it to export and zip employee data",
        "Narrowing down to get more information on the software install process",
        "Narrowing down on this timeframe to confirm if this was actually a data exfiltration process and it was"
      ],
      // PwnCrypt Ransomware Investigation and Analysis (Project 5.4) - concise, human-friendly titles
      "pwncrypt-ransomware-investigation": [
        "Running the PowerShell script on the VM to generate telemetry for the scenario",
        "Mass file modification high write volume detecting a device with a sudden spike in file modifications",
        "Looking for many file rename extension changes",
        "Looking for many files created in a specific folder staging behavior",
        "Find evidence of script execution, downloads, or suspicious command lines",
        "Search for process names commonly used to run scripts PowerShell, cmd, wmic, cscript, wscript",
        "Broaden my search window and include child relationships",
        "Pivoting to locate secondary payloads or delayed activity",
        "Pivoting into targeted IOC hunting for PwnCrypt activity",
        "Summarizing and pivoting to final verification",
        "Find file events on Desktop Users that show created renamed modified files",
        "Confirming the presence of encrypted files in the target VM",
        "Confirming infection scope & origin (final KQL pivot)",
        "To confirm the link between powershell.exe and services.exe (and ensure it was not a legitimate service operation)"
      ],
      // Brute Force Detection Workflow (Project 5.5) - concise, human-friendly titles
      "brute-force-detection-workflow": [
        "Reviewing Defender logon events for failed attempts",
        "Inspecting latest login failure telemetry",
        "Building Sentinel KQL query for brute-force detection",
        "Creating scheduled analytics rule in Sentinel",
        "Observing triggered incident from the analytics rule"
      ],
      // Brute Force Investigation Workflow (Project 5.5) - concise, human-friendly titles
      "brute-force-investigation-workflow": [
        "New Sentinel incident detected from analytics rule",
        "Assigning the incident for triage",
        "Visualizing entities on Sentinel investigation graph",
        "Validating successful logons to confirm no compromise"
      ],
      // Brute Force Response and Closure (Project 5.5) - concise, human-friendly titles
      "brute-force-response-closure": [
        "Reviewing Defender response options for the device",
        "Locking down Azure NSG to restrict RDP access",
        "Documenting findings in Sentinel incident notes",
        "Closing the incident after confirming containment"
      ],
      // PowerShell Suspicious Web Request Detection Workflow (Project 5.6) - concise, human-friendly titles
      "powershell-suspicious-web-request": [
        "Validating DeviceProcessEvents telemetry flow",
        "Filtering PowerShell executions on windows-target-1",
        "Detecting Invoke-WebRequest usage delivering remote content"
      ],
      // PowerShell Analytics Rule Engineering (Project 5.6) - concise, human-friendly titles
      "powershell-analytics-rule-engineering": [
        "Configuring Sentinel analytics rule settings",
        "Defining scheduled KQL logic for Invoke-WebRequest detection",
        "Mapping entities for investigation context",
        "Selecting relevant MITRE ATT&CK techniques",
        "Reviewing the analytics rule summary"
      ],
      // PowerShell Incident Triage (Project 5.6) - concise, human-friendly titles
      "powershell-incident-triage": [
        "PowerShell web request executed on windows-target-1",
        "Sentinel incident generated by analytics rule",
        "Incident assigned and moved to Active investigation"
      ],
      // PowerShell Investigation and Containment (Project 5.6) - concise, human-friendly titles
      "powershell-investigation-containment": [
        "Investigating Sentinel graph relationships",
        "Reviewing PowerShell Invoke-WebRequest commands",
        "Confirming executed scripts and accounts",
        "Running Defender scan and isolation actions"
      ],
      // PowerShell Incident Closure (Project 5.6) - concise, human-friendly titles
      "powershell-closure-documentation": [
        "Documenting investigation and response notes",
        "Closing incident as true positive"
      ],
      // Impossible Travel Query Results (Project 5.7) - concise, human-friendly titles
      "impossible-travel-query-results": [
        "Potential impossible travel query results showing multi-region authentication patterns"
      ],
      // Impossible Travel Analytics Rule General Settings (Project 5.7) - concise, human-friendly titles
      "impossible-travel-analytics-rule": [
        "Analytics rule general settings for impossible travel detection"
      ],
      // Impossible Travel Rule Configuration and Incident (Project 5.7) - concise, human-friendly titles
      "impossible-travel-rule-configuration": [
        "Rule logic with KQL query for geographic divergence detection",
        "Entity mappings for account normalization",
        "Rule summary before deployment",
        "Incident created from Potential Impossible Travel rule"
      ],
      // Impossible Travel Incident Investigation (Project 5.7) - concise, human-friendly titles
      "impossible-travel-incident-investigation": [
        "Incident details overview showing multi-region authentication",
        "Incident assigned and set to Active status",
        "Investigation graph visualizing entity relationships"
      ],
      // Impossible Travel User Analysis and Closure (Project 5.7) - concise, human-friendly titles
      "impossible-travel-user-analysis": [
        "Detailed signin pattern analysis for User A",
        "Detailed signin pattern analysis for User B",
        "Incident closed with final classification"
      ],
      // Excessive Azure Resource Creation/Deletion Detection Engineering (Project 5.8) - concise, human-friendly titles
      "excessive-azure-resource-detection": [
        "AzureActivity baseline query validation",
        "Excessive write/delete query results",
        "Analytics rule general configuration",
        "Rule logic with KQL query",
        "Entity mapping configuration",
        "Rule summary before deployment"
      ],
      // Excessive Azure Resource Incident Triage (Project 5.8) - concise, human-friendly titles
      "excessive-azure-resource-triage": [
        "Incident created from analytics rule",
        "Incident assigned and set to Active status"
      ],
      // Excessive Azure Resource Investigation and Closure (Project 5.8) - concise, human-friendly titles
      "excessive-azure-resource-investigation": [
        "Investigation graph showing entity relationships",
        "User activity pattern analysis",
        "Incident closed with final classification"
      ],
      // TOR Browser Simulation - Downloading (Project 5.9) - concise, human-friendly titles
      "tor-simulation-downloading": [
        "Downloading TOR Browser from official website"
      ],
      // TOR Browser Simulation - CMD Navigation (Project 5.9) - concise, human-friendly titles
      "tor-simulation-cmd": [
        "Navigating to downloaded TOR app in command prompt"
      ],
      // TOR Browser Simulation - Silent Installation (Project 5.9) - concise, human-friendly titles
      "tor-simulation-installation": [
        "Silently installing TOR Browser creating desktop folder"
      ],
      // TOR Browser Simulation - Opening Browser (Project 5.9) - concise, human-friendly titles
      "tor-simulation-opening": [
        "Opening TOR Browser from desktop folder"
      ],
      // TOR Browser Simulation - Establishing Connection (Project 5.9) - concise, human-friendly titles
      "tor-simulation-connection": [
        "Establishing connection to TOR network"
      ],
      // TOR Browser Simulation - Location Check (Project 5.9) - concise, human-friendly titles
      "tor-simulation-location": [
        "Checking geolocation showing Sweden exit node"
      ],
      // TOR Browser Simulation - Dread URL (Project 5.9) - concise, human-friendly titles
      "tor-simulation-dread-url": [
        "Checking Dread onion URL link"
      ],
      // TOR Browser Simulation - Accessing Dark Web (Project 5.9) - concise, human-friendly titles
      "tor-simulation-darkweb": [
        "Accessing Dread dark web forum homepage"
      ],
      // TOR Browser Simulation - Navigating Dark Web (Project 5.9) - concise, human-friendly titles
      "tor-simulation-navigating": [
        "Navigating through dark web pages to generate logs"
      ],
      // TOR Browser Simulation - Shopping List (Project 5.9) - concise, human-friendly titles
      "tor-simulation-shopping-list": [
        "Creating shopping list file on desktop"
      ],
      // TOR Browser Simulation - Deleting File (Project 5.9) - concise, human-friendly titles
      "tor-simulation-deleting": [
        "Deleting shopping list file and confirming in Recycle Bin"
      ],
      // TOR Browser Simulation - Validating Logs (Project 5.9) - concise, human-friendly titles
      "tor-simulation-validation": [
        "Validating Microsoft Defender logs are being ingested"
      ],
      // TOR Threat Hunt - File Discovery (Project 5.9 Part 2) - concise, human-friendly titles
      "tor-threat-hunt-file-discovery": [
        "DeviceFileEvents query results showing Tor-related artifacts"
      ],
      // TOR Threat Hunt - Silent Installation (Project 5.9 Part 2) - concise, human-friendly titles
      "tor-threat-hunt-installation": [
        "DeviceProcessEvents showing silent installation command"
      ],
      // TOR Threat Hunt - Browser Launch (Project 5.9 Part 2) - concise, human-friendly titles
      "tor-threat-hunt-browser-launch": [
        "DeviceProcessEvents showing Tor Browser launch processes"
      ],
      // TOR Threat Hunt - Network Activity (Project 5.9 Part 2) - concise, human-friendly titles
      "tor-threat-hunt-network": [
        "DeviceNetworkEvents showing Tor IP connections"
      ],
      // TOR Threat Hunt - Shopping List (Project 5.9 Part 2) - concise, human-friendly titles
      "tor-threat-hunt-shopping-list": [
        "DeviceFileEvents showing shopping list file activity"
      ]
    }

    return imageNames[imagesKey] || []
  }

  return (
    <div
      ref={contentRef}
      className={`blog-content prose prose-gray dark:prose-invert max-w-none ${groupId}`}
    >
      {renderContentWithComponents()}
    </div>
  )
}
