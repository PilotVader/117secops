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
image: "/images/projects/hardware-lab/Image header for project 4.4.jpeg"
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