---
title: "Building a Full Hardware Cybersecurity Home Lab"
description: "A comprehensive guide on transitioning from VirtualBox to building a fully equipped hardware cybersecurity home lab, complete with network design, hardware choices, and virtual machine configurations."
date: "2024-03-21"
author: "Samson Otori"
tags:
  - "Home Lab"
  - "Hardware"
  - "Networking"
  - "Infrastructure"
  - "Virtualization"
image: "/images/projects/home-lab.png"
images: [
  { "src": "/images/projects/hardware-lab/1-router.jpg", "alt": "Router Configuration - Initial Setup" },
  { "src": "/images/projects/hardware-lab/2-router.jpg", "alt": "Router Configuration - Network Settings" },
  { "src": "/images/projects/hardware-lab/3-router.jpg", "alt": "Router Configuration - Final Setup" },
  { "src": "/images/projects/hardware-lab/4-switch.jpg", "alt": "Switch Installation - Hardware View" },
  { "src": "/images/projects/hardware-lab/5-switch.jpg", "alt": "Switch Configuration - Port Setup" },
  { "src": "/images/projects/hardware-lab/6-server.jpg", "alt": "Server Hardware - Front View" },
  { "src": "/images/projects/hardware-lab/7-server.jpg", "alt": "Server Hardware - Internal Components" },
  { "src": "/images/projects/hardware-lab/8-devices-connection.png", "alt": "Network Devices Connection Diagram" },
  { "src": "/images/projects/hardware-lab/9-connection.jpg", "alt": "Physical Network Connections - Setup 1" },
  { "src": "/images/projects/hardware-lab/10-connection.jpg", "alt": "Physical Network Connections - Setup 2" },
  { "src": "/images/projects/hardware-lab/11-connection.jpg", "alt": "Physical Network Connections - Setup 3" },
  { "src": "/images/projects/hardware-lab/12-connection.jpg", "alt": "Physical Network Connections - Setup 4" },
  { "src": "/images/projects/hardware-lab/13-setup.jpg", "alt": "Complete Lab Setup - View 1" },
  { "src": "/images/projects/hardware-lab/14-setup.jpg", "alt": "Complete Lab Setup - View 2" },
  { "src": "/images/projects/hardware-lab/15-proxmox.png", "alt": "Proxmox VE - Installation" },
  { "src": "/images/projects/hardware-lab/16-proxmox.png", "alt": "Proxmox VE - Configuration" },
  { "src": "/images/projects/hardware-lab/17-proxmox.png", "alt": "Proxmox VE - VM Setup" },
  { "src": "/images/projects/hardware-lab/18-proxmox.png", "alt": "Proxmox VE - Network Configuration" },
  { "src": "/images/projects/hardware-lab/19-OPNSense.png", "alt": "OPNSense Firewall Dashboard" },
  { "src": "/images/projects/hardware-lab/20-switch.png", "alt": "Switch Management Interface" }
]
series:
  name: "Project 4: Building a Full Hardware Cybersecurity Home Lab"
  part: 1
  totalParts: 1
category: "Infrastructure"
---

## Levelling Up: From VirtualBox to a Full Hardware Cybersecurity Home Lab (Project V117)

If there's one thing that's been both my playground as a cybersecurity enthusiast, it's my home lab. I didn't just throw hardware together, I engineered a mini datacenter that lets me break things, fix them, and build skills that go beyond the classroom or certification paths.

So let me walk you through how I set it all up, from network design, hardware choices, and wiring, to the virtual machines running inside.

## The Blueprint

Before buying a single cable, I sat down and mapped out what I needed:
- A solid core network
- A powerful, reliable server
- A firewall/router to control traffic
- A proper switch to interconnect everything
- And most importantly: internet access without having to buy a new broadband plan

## The Physical Stack

Here's the physical breakdown of what I used:

### The Switch
At the heart of my lab sits a Cisco SG500X-24, a 24-port managed switch with RJ45 1GbE ports. This switch gives me full control over VLANs, trunking, port security, and QoS, which is perfect for mimicking enterprise-level setups. I got this because later in future I plan to manually configure VLANs for different zones (e.g., management, attack, internal, DMZ), so I could isolate traffic and simulate real-world networks.

### The Server
Then comes my main server, which I affectionately call the Node-V117.
- CPU: Intel Xeon E5-2689 (8 cores, 16 threads)
- RAM: 64 GB ECC (Error Correcting Code)
- Storage: 3 SSDs for fast I/O
- GPU: NVIDIA Quadro card, mostly used for potential GPU passthrough and future ML experiments

This beast runs Proxmox VE, a Type-1 hypervisor that gives me the power to run several virtual machines and containers. If you're serious about virtualisation, Proxmox is the real deal.

### The OPNsense Firewall
For routing and security experimentation, I installed OPNsense on an HP T730 Thin Client. It's a sleek, fanless device that runs silently and comes equipped with a dual 2.5GbE NIC, perfect for future networking experiments. I configured the interfaces for WAN (connected to my laptop for internet) and LAN (connected to the switch), giving me complete control over firewall rules, NAT, and traffic shaping. Right now, it's sitting in place and connected, ready to be the core of my network security setup when I begin more advanced testing.

## The Wiring and Internet Hack

One of the most interesting parts of my setup was getting the entire homelab online, without a dedicated internet line. For now, I bridged my laptop's internet connection to the firewall as a temporary workaround. It works for basic connectivity and testing, but I'm already seeing its limitations in bandwidth, stability, and accessibility. Eventually, I plan to set up a dedicated internet line for the lab to unlock more advanced use cases, such as remote access, persistent services, and uninterrupted updates.

Here's how I did it:

1. Laptop Internet Sharing
   - My laptop connects to Wi-Fi
   - I shared this connection through the Ethernet port using Windows' Internet Sharing feature

2. Cable Run
   - I plugged an Ethernet cable from the laptop into the WAN port of the HP T730 running OPNsense

3. Firewall Setup
   - In OPNsense, I configured the WAN interface to get an IP via DHCP (coming from the laptop)
   - Then set the LAN IP range (e.g., 192.168.100.1/24) and turned on DHCP for internal devices

4. Switch Cabling
   - The LAN port of the firewall connects to port 1 on the Cisco switch
   - My server's NIC connects to port 2
   - The remaining ports were available for VMs or any other device I want to simulate

## Virtual Machines

On Proxmox, I spun up multiple VMs, each serving a different purpose:
- Windows 10 & 11: For endpoint security testing, malware analysis, and AD simulations
- Ubuntu Server: Hosting lightweight services, honeypots, and ELK stack
- Kali Linux: My offensive workstation, preloaded with tools like Burp Suite, Metasploit, and Nmap

Later, as I expand my knowledge, I would place each VM on its own VLAN or subnet, and intentionally misconfigure some for security testing, because what's a lab without vulnerabilities?

## Use Cases and Next Steps

With this lab, I can:
- Simulate red vs. blue team scenarios
- Build and monitor logs from Windows endpoints
- Train with SIEM tools like Wazuh
- Set up phishing simulations and response workflows
- Test firewall rules, intrusion detection, and segmentation

The plan is to keep building on this, maybe add Active Directory, integrate SOAR tools like Shuffle(which I'm already working on currently), and even try deploying a Kubernetes cluster on Ubuntu.

## Conclusion

Setting up this lab wasn't just about putting hardware together, it was about creating an environment where I could think like an attacker, build like an engineer, and defend like a blue teamer. Every time I boot up a VM, I'm building muscle memory for real-world problem solving.

If you're thinking of building your own lab, start small but think big. And don't wait for the perfect setup. I started out running labs in VirtualBox, just trying to get a feel for the tools and workflows. But eventually, I knew I needed to experience real hardware and full network environments. So I made this work, with shared internet and repurposed gear. It's not about perfection; it's about progress.

Got questions or thinking of building your own lab? I'd be happy to chat or help, just click on the "Contact Me" button anywhere on this site to reach out to me on LinkedIn. 

*NOTE: This project was independently researched, designed, and implemented by me, Samson Otori, as part of my hands-on journey in cybersecurity.* 