---
title: "Project 4.4: Integrating Wazuh SIEM/XDR and Nessus in a Cybersecurity Home Lab"
description: "A comprehensive walkthrough of deploying Wazuh SIEM/XDR for log correlation and Nessus for vulnerability scanning in a segmented cybersecurity homelab environment."
date: "2025-08-03"
author: "Samson Otori"
tags:
  - "Wazuh"
  - "SIEM"
  - "XDR"
  - "Nessus"
  - "Vulnerability Scanning"
  - "Security Monitoring"
  - "OPNsense"
  - "Docker"
  - "Parrot OS"
  - "Ubuntu"
  - "Proxmox"
  - "VLAN"
  - "Homelab"
  - "Blue Team"
image: "/images/projects/hardware-lab/Image header for project 4.4.JPEG"
images: [
  { "src": "/images/projects/hardware-lab/1-Ubuntu-server-wazuh-summary.png", "alt": "Ubuntu server wazuh summary" },
  { "src": "/images/projects/hardware-lab/2-ubuntuServer-Wazuh-installed.png", "alt": "Ubuntu server Wazuh installed" },
  { "src": "/images/projects/hardware-lab/3-SSHed into wazuh server from parrot OS.png", "alt": "SSHed into wazuh server from parrot OS" },
  { "src": "/images/projects/hardware-lab/4-wazuh-installation.png", "alt": "Wazuh installation" },
  { "src": "/images/projects/hardware-lab/5-wazuh-installed.png", "alt": "Wazuh installed" },
  { "src": "/images/projects/hardware-lab/6-wazuh-login-page.png", "alt": "Wazuh login page" },
  { "src": "/images/projects/hardware-lab/7-wazuh-dashboard.png", "alt": "Wazuh dashboard" },
  { "src": "/images/projects/hardware-lab/8-taking-commands-for-agent-installation-in-wazuh.png", "alt": "Taking commands for agent installation in wazuh" },
  { "src": "/images/projects/hardware-lab/9-wazuh-agent-installation.png", "alt": "Wazuh agent installation" },
  { "src": "/images/projects/hardware-lab/10-wazuh-agent-installed-in-parrot.png", "alt": "Wazuh agent installed in parrot" },
  { "src": "/images/projects/hardware-lab/11-wazuh-agents-installed-in-docker-server.png", "alt": "Wazuh agents installed in docker server" },
  { "src": "/images/projects/hardware-lab/12-installing-dependencies-on-docker-server.png", "alt": "Installing dependencies on docker server" },
  { "src": "/images/projects/hardware-lab/12-still-installing-dependencies-on-docker-server.png", "alt": "Still installing dependencies on docker server" },
  { "src": "/images/projects/hardware-lab/13-adding-config-code to-ossec-file-in-docker-server.png", "alt": "Adding config code to ossec file in docker server" },
  { "src": "/images/projects/hardware-lab/14-agent reflecting.png", "alt": "Agent reflecting" },
  { "src": "/images/projects/hardware-lab/15-logs now being farwarded to wazuh server from docker server.png", "alt": "Logs now being forwarded to wazuh server from docker server" },
  { "src": "/images/projects/hardware-lab/1-enabling secure shell on opnsense.png", "alt": "Enabling secure shell on opnsense" },
  { "src": "/images/projects/hardware-lab/2-SSHing into my firewall.png", "alt": "SSHing into my firewall" },
  { "src": "/images/projects/hardware-lab/3-checking content of FreeBSD config.png", "alt": "Checking content of FreeBSD config" },
  { "src": "/images/projects/hardware-lab/4-using VI to edit FreeBSD content.png", "alt": "Using VI to edit FreeBSD content" },
  { "src": "/images/projects/hardware-lab/5-edited freeBSD content and ran update.png", "alt": "Edited freeBSD content and ran update" },
  { "src": "/images/projects/hardware-lab/6-searching wazuh agent on OPNsense.png", "alt": "Searching wazuh agent on OPNsense" },
  { "src": "/images/projects/hardware-lab/7-Installing recent wazuh agent on OPNsense.png", "alt": "Installing recent wazuh agent on OPNsense" },
  { "src": "/images/projects/hardware-lab/8-wazuh agent installed successfully.jpeg", "alt": "Wazuh agent installed successfully" },
  { "src": "/images/projects/hardware-lab/9-copying localtime to etc and accessing ossec config file for editing.png", "alt": "Copying localtime to etc and accessing ossec config file for editing" },
  { "src": "/images/projects/hardware-lab/10-edited the ossec config file to include wazuh ip.png", "alt": "Edited the ossec config file to include wazuh ip" },
  { "src": "/images/projects/hardware-lab/11-enable wazuh agent on OPNsense firewall.png", "alt": "Enable wazuh agent on OPNsense firewall" },
  { "src": "/images/projects/hardware-lab/12-wazuh agent started successfully.png", "alt": "Wazuh agent started successfully" },
  { "src": "/images/projects/hardware-lab/13-agent showing on wazuh agent dashboard.png", "alt": "Agent showing on wazuh agent dashboard" },
  { "src": "/images/projects/hardware-lab/14 - Creating ubuntu server vm on proxmox for nessus installation.png", "alt": "Creating ubuntu server vm on proxmox for nessus installation" },
  { "src": "/images/projects/hardware-lab/15 - editing the Ipv4 network config.png", "alt": "Editing the Ipv4 network config" },
  { "src": "/images/projects/hardware-lab/16 - Installation of ubuntu server VM started.png", "alt": "Installation of ubuntu server VM started" },
  { "src": "/images/projects/hardware-lab/17 - taking the download link from nessus site.png", "alt": "Taking the download link from nessus site" },
  { "src": "/images/projects/hardware-lab/18 - SSHed into my ubuntu server and downloading nessus via terminal.png", "alt": "SSHed into my ubuntu server and downloading nessus via terminal" },
  { "src": "/images/projects/hardware-lab/19 - extracted  Nessus.png", "alt": "Extracted Nessus" },
  { "src": "/images/projects/hardware-lab/20 - started nessus service on terminal.png", "alt": "Started nessus service on terminal" },
  { "src": "/images/projects/hardware-lab/21 - accessed nessus web interface using ip and port.png", "alt": "Accessed nessus web interface using ip and port" },
  { "src": "/images/projects/hardware-lab/22 - downloading nessus plugin after account setup.png", "alt": "Downloading nessus plugin after account setup" },
  { "src": "/images/projects/hardware-lab/23 - Nessus dashboard loaded.png", "alt": "Nessus dashboard loaded" },
  { "src": "/images/projects/hardware-lab/24 - Trying to set up a new scan.png", "alt": "Trying to set up a new scan" },
  { "src": "/images/projects/hardware-lab/25 - Simple scan details.png", "alt": "Simple scan details" },
  { "src": "/images/projects/hardware-lab/26 - Scan results out 1.png", "alt": "Scan results out 1" },
  { "src": "/images/projects/hardware-lab/27 - scan results out 2.png", "alt": "Scan results out 2" },
  { "src": "/images/projects/hardware-lab/28 - scan results out 3.png", "alt": "Scan results out 3" }
]
series:
  name: "Project 4.4: Integrating Wazuh SIEM/XDR and Nessus in a Cybersecurity Home Lab"
  part: 1
  totalParts: 1
category: "blue"
---

## Project 4.4: Integrating Wazuh SIEM/XDR and Nessus in a Cybersecurity Home Lab

### Building the SIEM Foundation: Wazuh Server Deployment

Continuing from the previous episodes of my cybersecurity home lab journey, I entered the next to introduce Wazuh as the SIEM and XDR solution for telemetry collection, log correlation, and detection engineering. I provisioned a new Ubuntu server virtual machine on Proxmox with 4 vCPUs, 8GB of RAM, and 160GB of disk space, ensuring it resided within VLAN 5 (my security tools network) using the IP 10.10.5.51/24. The Wazuh installation process was straightforward. After setting a static IP and configuring DNS and gateway entries, I initiated a basic update and upgrade cycle, then ran the official Wazuh installation script from their GitHub repository.

Once the installation was completed, I accessed the Wazuh dashboard via HTTPS at https://10.10.5.51, authenticated using the auto-generated credentials, and confirmed a successful deployment. With the Wazuh manager operational, the next step was deploying agents across key systems in the lab.

<InlineGallery images={wazuh-server-deployment} title="Wazuh Server Deployment" />

### Deploying Agents: Parrot OS and Docker Server Integration

The first endpoint I configured was my Parrot OS. I elevated to root and ran the prescribed commands to add the Wazuh repository, perform an update, and install the agent. I edited the agent configuration to point it at the Wazuh manager IP and verified connectivity. Upon launching the agent, it registered on the Wazuh dashboard and began transmitting logs shortly after.

I replicated the same process on my Ubuntu Docker server (10.10.30.100), again ensuring root privileges, repository addition, and agent configuration. I initiated the agent and confirmed its visibility on the Wazuh interface. To extend observability into containerised environments, I proceeded to install the Wazuh Docker Listener and configured the Docker API for telemetry ingestion. I appended the required JSON configuration into the agent's config file, restarted the service, and enabled the module on the Wazuh dashboard under Settings > Modules > Docker Listener. Container-level logs began appearing as I restarted a few test containers to validate.

<InlineGallery images={agent-installation} title="Agent Installation Process" />

### OPNsense Firewall Agent Issues: Encountering the PID File Roadblock

With both endpoint systems operational in Wazuh, I turned my attention to integrating my OPNsense firewall (192.168.1.1) running on dedicated hardware. This step diverged significantly from the Linux-based agents, as it required enabling FreeBSD repositories and handling configuration in a constrained BSD environment. I SSHed into OPNsense, enabled SSH under System > Advanced, and modified the FreeBSD.conf file to set enabled=YES. Unlike the tutorial, I found only the freebsd.conf file available, not pfsense.conf, due to architectural differences between OPNsense and pfSense.

Following the installation instructions, I attempted to run the agent-auth binary to register the agent with the manager. However, I encountered a persistent error: agent-auth: CRITICAL (1212): Unable to create PID file. This indicated a permission or filesystem-level issue preventing the Wazuh agent from properly initialising. Further troubleshooting revealed that the ossec user and group did not exist by default. Attempts to assign ownership using chown -R ossec:ossec /var/ossec returned "illegal group name" errors.

I manually verified write permissions by creating and removing test files under /var/ossec, which confirmed basic functionality. Despite that, the Wazuh agent daemon (wazuh-agentd) consistently failed to start. Configuration and log file reviews pointed to missing or incompatible startup routines specific to FreeBSD. I eventually confirmed that even after enabling FreeBSD package support and properly configuring ossec.conf to include the manager IP, the agent appeared on the Wazuh dashboard but failed to show "Active" status.

At this point, I decided to temporarily pause work on the OPNsense agent integration. The issue remained unresolved, likely due to deeper compatibility mismatches or required kernel parameters not present on the OPNsense BSD environment. I plan to revisit this with a custom-built FreeBSD agent installation script or by manually creating missing users and startup routines. But if anyone has encountered this issue, please reach out to me with suggestions, I'll really appreciate.

<InlineGallery images={opnsense-setup} title="OPNsense Firewall Configuration" />

### Deploying Nessus: Introducing Vulnerability Scanning to the Lab

With the SIEM side in partial production, I progressed to deploying Nessus for vulnerability scanning. I created a new Ubuntu VM on Proxmox with 4 vCPUs, 4 GB RAM, and 40 GB disk, assigning it the IP address 10.10.5.52/24 within VLAN 5. After configuring static networking and enabling SSH, I logged in and ran the commands to download the latest Nessus Debian package. I installed it using dpkg and started the nessusd service.

Accessing Nessus via the browser at https://10.10.5.52:8834 allowed me to register for the Essentials version and input the activation key. The platform then began downloading its full set of plugins and signature files. Once installation was completed, I created a quick scan targeting the Metasploitable2 VM. Even with the basic scan template, the results after the scan show that it was successful even with limited information, confirming its functionality.

<InlineGallery images={nessus-deployment} title="Nessus Vulnerability Scanner Setup" />

### Conclusion

At this point, I had a partially complete security monitoring stack within my home lab. Wazuh was successfully collecting logs from my Parrot OS and Docker machines and even parsing Docker container activity. Nessus was active and ready to scan targets across VLAN 5. However, OPNsense integration remained incomplete due to agent startup issues tied to BSD permission handling. I plan to circle back to this issue later with a deeper understanding of BSD service management or possibly using Syslog forwarding as a temporary workaround.

This project showcases the real-world challenges of building a hybrid monitoring environment, integrating both Linux and BSD-based systems into a centralised SIEM. It's a valuable case study for anyone deploying Wazuh in a segmented network and dealing with heterogeneous operating systems. My next step will be to document the resolution of the OPNsense agent issue and expand Wazuh's use to include alert rule tuning and dashboard customisation.

Stay tuned for the next stage of this project as we integrate more detection and response tools.

**Credits:** This walkthrough is based on Episode 2 of the Ultimate Cybersecurity Lab YouTube series by Gerard O'Brien. While the steps closely followed his guidance, the project was independently implemented by Samson Otori, with custom network configurations and host assignments tailored to fit a pre-existing VLAN-segmented lab environment.

Here's a link to his YouTube channels:

[Gerard O'Brien's Channel](https://www.youtube.com/watch?v=ytWZ6OrFEQE&list=PL3ljjyal211AbTqlxSo6CGBiVqsXw8wrp&index=9) 