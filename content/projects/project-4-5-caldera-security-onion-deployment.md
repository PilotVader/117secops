---
title: "Project 4.5: Caldera & Security Onion Deployment in my Cybersecurity Home Lab"
date: "2025-08-08"
description: "Deploying MITRE Caldera for adversary emulation and Security Onion for network-based detection and threat hunting in my cybersecurity home lab."
category: "blue"
series: "hardware-lab"
part: 5
image: "/images/projects/hardware-lab/Caldera and security onion.png"
tags: ["Caldera", "Security Onion", "MITRE", "Adversary Emulation", "Threat Hunting", "SOC", "Network Security", "Blue Team", "Red Team"]
---

## Project 4.5: Caldera & Security Onion Deployment in my Cybersecurity Home Lab

### Overview

Over the past few weeks, my home lab has been steadily evolving into a fully functional, segmented cybersecurity test environment. Following the blueprint from Gerard O'Brien's Building the Ultimate Cybersecurity Lab series, I've reached one of the most exciting milestones so far: deploying MITRE Caldera for adversary emulation and Security Onion for network-based detection and threat hunting.

Both tools play crucial roles in a mature SOC workflow, and getting them online was a mix of straightforward installs, unexpected technical snags, and valuable troubleshooting lessons.

### Deploying MITRE Caldera

Caldera is an adversary emulation platform developed by MITRE, designed to simulate real-world attacker behaviours and techniques in a controlled environment. The goal in my lab is to use it to generate realistic attack traffic and test detection capabilities across my monitoring stack.

While the transcript in the tutorial followed a clean, predictable installation of Caldera 4.2, my own journey involved a few detours.

### Initial Setup and Configuration

I provisioned a new Ubuntu Server VM in Proxmox with 8GB of RAM, two vCPUs, and a 50GB disk, connected to my VLAN 1 "Security Tools" network. This ensured that Caldera would have unrestricted communication with the rest of my detection infrastructure. The static IP for this server was set to **10.10.5.53**.

After cloning the Caldera repository from GitHub and moving into its directory, I attempted to install dependencies with the command `sudo pip3 install -r requirements.txt`.

### Overcoming Python Environment Issues

This is where I hit the first hurdle. Ubuntu 22.04 now ships with Python in a "externally managed" mode, meaning pip cannot directly install packages system-wide without bypassing the system package manager. The installation aborted with a message advising me to either use apt install for Debian packages or create a Python virtual environment.

The latter was the more controlled option, so I created and activated a virtual environment using these commands:

`python3 -m venv venv`
`source venv/bin/activate`

With the virtual environment active, pip installed the required packages cleanly. However, the next attempt to start Caldera using this command:

`python3 server.py --insecure --build`

triggered another failure, this time related to a missing npm command. The --build flag instructs Caldera to compile its Vue.js frontend, but this requires Node.js and npm. Installing them inside the VM resolved the problem:

`sudo apt install nodejs npm`

### Final Deployment and Verification

Once Node.js was in place, I ran the build process again. The frontend compiled successfully, but npm threw network timeout errors at one point. This was due to npm's registry connection attempts failing intermittently, which I fixed by retrying the install after confirming the VM's DNS and gateway settings were correct.

Finally, Caldera's web server launched without further issues, listening on port 8888. Accessing **http://10.10.5.53:8888** presented the login interface, where I could sign in as either the red team user (red:admin) or blue team user (blue:admin). This marked the successful deployment of Caldera 4.2, ready for later integration into attack simulation workflows.

<InlineGallery images={caldera-deployment} title="Caldera Deployment Walkthrough" />

### Installing Security Onion

Next came Security Onion, a full-featured open-source platform for network security monitoring, intrusion detection, and threat hunting. Unlike Caldera's lightweight footprint, Security Onion's requirements are substantial—the standalone deployment calls for at least 16GB of RAM, four vCPUs, 200GB of storage, and dual network interfaces.

### System Requirements and Preparation

I created a new Proxmox VM meeting these specs and uploaded the latest Security Onion ISO. The primary NIC was connected to VLAN 1 for management, while a second NIC was reserved for potential sniffing or monitoring duties. Initially, I left the second NIC disconnected during installation to avoid known setup errors.

### Installation Process

The installation process began with selecting "Install Security Onion" and providing a username, password, and other initial setup details. The configuration was set to STANDALONE mode, with the management interface assigned a static IP.

This is where an important adjustment was necessary. In the tutorial, the gateway was set to **10.10.1.254**, but in my network, the correct gateway for VLAN 1 is **10.10.5.254**. Using the wrong gateway would have left the system unable to route traffic correctly. DNS servers included my OPNsense firewall (**192.168.1.1**) and public resolvers (**8.8.8.8, 8.8.4.4**).

After confirming the settings, the installation began, and this was not a quick process. Despite being on modern hardware, Security Onion's post-install configuration took over two hours to complete, performing extensive service installations, database setups, and Elastic Stack provisioning. Patience was essential here.

### Accessing the Platform

When the setup finally completed, I accessed the web interface by navigating to **https://10.10.5.54** from a browser on my management network. Logging in with the credentials created earlier presented the full Security Onion dashboard, ready to begin ingesting data from across the lab.

<InlineGallery images={security-onion-deployment} title="Security Onion Deployment Walkthrough" />

### Conclusion

<p class="mb-4 leading-relaxed">At this point, I had successfully deployed both Caldera and Security Onion in my cybersecurity home lab. Caldera was operational and ready for adversary emulation, while Security Onion was configured for network-based detection and threat hunting. Both tools were integrated within my segmented VLAN architecture, providing a solid foundation for advanced security testing and monitoring.</p>

<p class="mb-4 leading-relaxed">This project showcases the real-world challenges of deploying complex security tools in a home lab environment. The dependency issues with Python's managed mode and the resource-intensive nature of Security Onion highlighted the importance of proper planning and patience in cybersecurity engineering. The next phase will involve integrating these tools with Wazuh, running simulated attack campaigns, and validating that alerts are generated and correlated correctly.</p>

<p class="mb-4 leading-relaxed">Stay tuned for the next stage of this project as we include our Windows Server and Windows 10 environment.</p>

<p class="mb-4 leading-relaxed"><strong class="font-semibold">Credits:</strong> This walkthrough is based on Episode 4 of the Ultimate Cybersecurity Lab YouTube series by Gerard O'Brien. While the steps closely followed his guidance, the project was independently implemented by Samson Otori, with custom network configurations and host assignments tailored to fit a pre-existing VLAN-segmented lab environment.</p>

<p class="mb-4 leading-relaxed">Here's a link to his YouTube channels:</p>

<p class="mb-4 leading-relaxed"><a href="https://www.youtube.com/watch?v=ej6iBrBqZEo" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Gerard O'Brien's Channel</a></p>
