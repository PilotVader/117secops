---
title: "Vulnerable Machines Installation (Metasploitable2, DVWA, bWAPP, WebGoat)"
description: "A comprehensive guide to installing and configuring vulnerable machines and applications in a segmented cybersecurity homelab for penetration testing and security training."
date: "2025-07-05"
author: "Samson Otori"
tags:
  - "Metasploitable2"
  - "DVWA"
  - "bWAPP"
  - "WebGoat"
  - "Vulnerable Machines"
  - "Penetration Testing"
  - "Docker"
  - "MacVLAN"
  - "VLAN"
  - "Homelab"
  - "Proxmox"
  - "Cybersecurity"
  - "Security Training"
  - "Web Vulnerabilities"
  - "Containerization"
image: "/images/projects/hardware-lab/Vulnerable machines installation.jpeg"
images: [
  { "src": "/images/projects/hardware-lab/1 Metasploitable Installation started.png", "alt": "1 Metasploitable Installation started" },
  { "src": "/images/projects/hardware-lab/2 Not using any installation media.png", "alt": "2 Not using any installation media" },
  { "src": "/images/projects/hardware-lab/3 leave all as is.png", "alt": "3 leave all as is" },
  { "src": "/images/projects/hardware-lab/4 CPU.png", "alt": "4 CPU" },
  { "src": "/images/projects/hardware-lab/5 RAM.png", "alt": "5 RAM" },
  { "src": "/images/projects/hardware-lab/6 Placing it in the right segment of my network vlan10.png", "alt": "6 Placing it in the right segment of my network vlan10" },
  { "src": "/images/projects/hardware-lab/7 Summary of the configuration.png", "alt": "7 Summary of the configuration" },
  { "src": "/images/projects/hardware-lab/8 SSHed into my proxmox server  from parrot OS.png", "alt": "8 SSHed into my proxmox server from parrot OS" },
  { "src": "/images/projects/hardware-lab/9 downloading metasploitable 2.png", "alt": "9 downloading metasploitable 2" },
  { "src": "/images/projects/hardware-lab/10 downloading of the metasploitable 2 in progress.png", "alt": "10 downloading of the metasploitable 2 in progress" },
  { "src": "/images/projects/hardware-lab/11 Metasploitable downloaded successfully.png", "alt": "11 Metasploitable downloaded successfully" },
  { "src": "/images/projects/hardware-lab/12 renaming metasploitable and trying to extract.png", "alt": "12 renaming metasploitable and trying to extract" },
  { "src": "/images/projects/hardware-lab/13 installing unzip for extraction of metasploitable.png", "alt": "13 installing unzip for extraction of metasploitable" },
  { "src": "/images/projects/hardware-lab/14 extracted matasploitable.png", "alt": "14 extracted matasploitable" },
  { "src": "/images/projects/hardware-lab/15 converted metasploitable to another type.png", "alt": "15 converted metasploitable to another type" },
  { "src": "/images/projects/hardware-lab/16 changing the highlighted to point to metasploitable.png", "alt": "16 changing the highlighted to point to metasploitable" },
  { "src": "/images/projects/hardware-lab/17 changing the file to point to metasploitable.png", "alt": "17 changing the file to point to metasploitable" },
  { "src": "/images/projects/hardware-lab/18 AFTER PARROT back to proxmox to confirm insertation of metasploitable vm on created vm MAIN.png", "alt": "18 AFTER PARROT back to proxmox to confirm insertation of metasploitable vm on created vm MAIN" },
  { "src": "/images/projects/hardware-lab/19 AFTER PARROT Error when trying to start the VM.png", "alt": "19 AFTER PARROT Error when trying to start the VM" },
  { "src": "/images/projects/hardware-lab/20 AFTER WINDOWS Editing the storageCFG file to fix the VM not starting issue.png", "alt": "20 AFTER WINDOWS Editing the storageCFG file to fix the VM not starting issue" },
  { "src": "/images/projects/hardware-lab/21 AFTER PARROT metasploitable now started properly.png", "alt": "21 AFTER PARROT metasploitable now started properly" },
  { "src": "/images/projects/hardware-lab/22 AFTER PARROT Confirming the IP address of the metasploitable machine.png", "alt": "22 AFTER PARROT Confirming the IP address of the metasploitable machine" },
  { "src": "/images/projects/hardware-lab/23 AFTER PARROT Pinged my firewall and google and all worked properly.png", "alt": "23 AFTER PARROT Pinged my firewall and google and all worked properly" },
  { "src": "/images/projects/hardware-lab/24 AFTER WINDOWS Accessing Metasploitable dashboard via ip address on parrot os.png", "alt": "24 AFTER WINDOWS Accessing Metasploitable dashboard via ip address on parrot os" },
  { "src": "/images/projects/hardware-lab/25 Creating a test container in docker nginx.png", "alt": "25 Creating a test container in docker nginx" },
  { "src": "/images/projects/hardware-lab/26 nginx deployed.png", "alt": "26 nginx deployed" },
  { "src": "/images/projects/hardware-lab/27 nginx accessed and working.png", "alt": "27 nginx accessed and working" },
  { "src": "/images/projects/hardware-lab/28 confirming my network adapter.png", "alt": "28 confirming my network adapter" },
  { "src": "/images/projects/hardware-lab/29 Network Configuration Complet for vlan30 on portainer.png", "alt": "29 Network Configuration Complet for vlan30 on portainer" },
  { "src": "/images/projects/hardware-lab/30 Vlan30 Config has been created.png", "alt": "30 Vlan30 Config has been created" },
  { "src": "/images/projects/hardware-lab/31 Creating another network and selecting the initially created vlan30 config.png", "alt": "31 Creating another network and selecting the initially created vlan30 config" },
  { "src": "/images/projects/hardware-lab/32 Creating another containder to be under vlan30.png", "alt": "32 Creating another containder to be under vlan30" },
  { "src": "/images/projects/hardware-lab/33 nginx now deplored and having its own dedicated ip address.png", "alt": "33 nginx now deplored and having its own dedicated ip address" },
  { "src": "/images/projects/hardware-lab/34 creating contianer for bwapp.png", "alt": "34 creating contianer for bwapp" },
  { "src": "/images/projects/hardware-lab/35 bwapp login page after installation.png", "alt": "35 bwapp login page after installation" },
  { "src": "/images/projects/hardware-lab/36 dvwa installation.png", "alt": "36 dvwa installation" },
  { "src": "/images/projects/hardware-lab/37 dvwa installed login page accessed.png", "alt": "37 dvwa installed login page accessed" },
  { "src": "/images/projects/hardware-lab/38 webgoat intsallation process.png", "alt": "38 webgoat intsallation process" },
  { "src": "/images/projects/hardware-lab/39 webgoat loging page accessed.png", "alt": "39 webgoat loging page accessed" }
]
series:
  name: "Project 4.3: Vulnerable Machines Installation (Metasploitable2, DVWA, bWAPP, WebGoat)"
  part: 1
  totalParts: 1
category: "red"
---

## Project 4.3: Vulnerable Machines Installation (Metasploitable2, DVWA, bWAPP, WebGoat)

Following the successful deployment of Docker and Portainer within VLAN 5 of my home lab, the next step in my cybersecurity lab project was to populate the environment with intentionally vulnerable systems. These systems will serve as practical targets for future testing, detection, and simulation scenarios. In this post, I document the installation and configuration of four key vulnerable systems: Metasploitable2, Damn Vulnerable Web Application (DVWA), bWAPP (Buggy Web Application), and WebGoat.

## Installing Metasploitable2 (MSF2)

Metasploitable2, a vulnerable Linux VM maintained by Rapid7, is designed for penetration testing training and exploits development. It's a go-to machine for beginners looking to understand service-level vulnerabilities.

To begin, I created a new VM in Proxmox with the following details:
- VM ID: 105
- VM Name: Meta-Sploit-Able2
- Media Type: No media
- Disk Interface: IDE
- Network VLAN: VLAN 10 (Vulnerable Machines)

After provisioning the VM shell, I SSHed into the Proxmox server from my Parrot OS laptop and navigated to `/var/lib/vz/images/`. Inside this directory, I created a folder named `105`, matching the VM ID. The reason for SSH access instead of using Proxmox's UI was to maintain an isolated and secure management workflow.

Using wget, I attempted to download the Metasploitable2 image. After resolving a few download errors, I extracted the ZIP file and located the necessary VMDK disk image. This image had to be converted to the QCOW2 format, which is preferred in Proxmox for virtual disk usage. The conversion was done using the qemu-img convert command:

```bash
qemu-img convert -f vmdk -O qcow2 Metasploitable2-Linux.vmdk Metasploitable2-Linux.qcow2
```

Next, I edited the configuration file of VM 105 (`/etc/pve/qemu-server/105.conf`) and pointed the VM to the newly converted QCOW2 disk image. I saved and verified the change from the Proxmox UI under "Hardware."

After powering on the VM, I logged in using the default Metasploitable credentials (`msfadmin` / `msfadmin`). I confirmed the system had joined VLAN 10 correctly by checking its IP address: `10.10.10.100`. I also validated DHCP functionality, DNS resolution, and connectivity to my firewall.

To finish this section, I browsed to the Metasploitable2 IP from my parrot OS and confirmed that its web interface, including DVWA (which comes preinstalled), was accessible.

## Setting Up Docker Networking with MacVLAN

Before continuing to deploy the rest of the vulnerable apps as containers, I had to address Docker's default behavior of assigning container IPs behind a bridge. This would prevent each container from having its own IP on the subnet, which was necessary for scanning them individually with tools like Nessus later on.

To solve this, I logged into Portainer and configured custom Docker networks using MacVLAN. I created two networks:

1. `vlan30-config` (on `10.10.30.0/24`): Provided the container IP range using MACVLAN driver.
2. `vlan30`: Attached directly to VLAN 30 (Docker-Containers).

I retrieved the correct network adapter name using `ip a` command on the Ubuntu Docker host and configured gateway and subnet ranges carefully. This configuration allowed containers to pull individual IPs within VLAN 30, just like physical devices.

To test the new network configuration, I deployed a test Nginx container and confirmed it received a proper IP within the range (e.g., `10.10.30.128`) and was accessible via browser.

## Deploying bWAPP (Buggy Web Application)

bWAPP, which stands for Buggy Web Application, is a PHP/MySQL-based deliberately insecure web app developed for educational purposes. It contains over 100 web vulnerabilities.

Inside Portainer, I added a new container:
- Name: `prod-bwapp`
- Image: Pulled from Docker Hub
- Network: Attached to `vlan30` (configured earlier with MacVLAN)

After deployment, I copied its assigned IP and accessed it via browser. The bWAPP interface loaded successfully. I followed the on-screen prompt to complete the installation, setting up the database via the `/install.php` page. Once installed, the login screen confirmed successful setup.

## Deploying Damn Vulnerable Web Application (DVWA)

DVWA, or Damn Vulnerable Web Application, is another PHP/MySQL web app with known vulnerabilities. It's widely used to practice web-based attacks such as SQL injection, XSS, CSRF, etc.

Just like with bWAPP, I deployed DVWA through Portainer:
- Name: `prod-dvwa`
- Image: Pulled from Docker Hub
- Network: Connected to `vlan30`

Upon deployment, I accessed the IP in the browser. DVWA was reachable, and the default login screen appeared. All services were running correctly within the expected Docker environment.

## Deploying WebGoat

WebGoat is a deliberately insecure Java-based web application maintained by OWASP to teach application security lessons.

Following the same container deployment process:
- Name: `prod-webgoat`
- Image: Pulled from Docker Hub
- Network: Connected to `vlan30`

After the container started, I accessed it via the browser using the assigned IP and port 8080 (e.g., `http://10.10.30.135:8080`). WebGoat loaded successfully, providing access to a series of vulnerable coding labs that simulate real-world scenarios.

## Conclusion

At this point, my Vulnerable Machines segment is fully functional. The following systems are now live and operating on VLAN 10 and VLAN 30:

- Metasploitable2 (IP: `10.10.10.51`) on VLAN 10
- bWAPP, DVWA, and WebGoat as Docker containers with unique IPs on VLAN 30

These machines will now serve as valuable assets for upcoming simulations, scanning, alerting, and response workflows in the lab. Their intentional vulnerabilities are essential for testing detection tools like Wazuh and Nessus, which will be covered in future posts.

If you're following along with this project, make sure your VLAN segmentation, DHCP assignment, and Docker networking are properly configured. Having each container accessible via its own IP is key to realistic and scalable security testing.

Stay tuned for the next stage of this project as we integrate more detection and response tools.

Credits: This walkthrough is based on Episode 2 of the Ultimate Cybersecurity Lab YouTube series by Gerard O'Brien. While the steps closely followed his guidance, the project was independently implemented by Samson Otori, with custom network configurations and host assignments tailored to fit a pre-existing VLAN-segmented lab environment.

Here's a link to his YouTube channels:
- [Gerard O'Brien's Channel](https://www.youtube.com/@techwithgerard)

---

**Tags:** #Metasploitable2 #DVWA #bWAPP #WebGoat #VulnerableMachines #PenetrationTesting #Docker #MacVLAN #VLAN #Homelab #Proxmox #Cybersecurity #SecurityTraining #WebVulnerabilities #Containerization 