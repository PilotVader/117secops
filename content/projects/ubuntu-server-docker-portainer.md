---
title: "Ubuntu Server, Docker and Portainer Installation in My Homelab"
description: "A detailed walkthrough of deploying Ubuntu Server with Docker and Portainer in my segmented cybersecurity homelab, including remote SSH management and VLAN integration."
date: "2025-07-03"
author: "Samson Otori"
tags:
  - "Ubuntu Server"
  - "Docker"
  - "Portainer"
  - "SSH"
  - "VLAN"
  - "Containerization"
  - "Homelab"
  - "Proxmox"
  - "Remote Management"
image: "/images/projects/hardware-lab/ubuntu-docker-portainer.jpeg"
images: [
  { "src": "/images/projects/hardware-lab/Assigning cpu cores for processor.png", "alt": "Assigning cpu cores for processor" },
  { "src": "/images/projects/hardware-lab/assigning internal network vlan30.png", "alt": "Assigning internal network vlan30" },
  { "src": "/images/projects/hardware-lab/assigning ram.png", "alt": "Assigning ram" },
  { "src": "/images/projects/hardware-lab/assigning storage.png", "alt": "Assigning storage" },
  { "src": "/images/projects/hardware-lab/During server installation this shows our dhcp is active with right ip address.png", "alt": "During server installation this shows our dhcp is active with right ip address" },
  { "src": "/images/projects/hardware-lab/Installing ubuntu server to create docker.png", "alt": "Installing ubuntu server to create docker" },
  { "src": "/images/projects/hardware-lab/Logged into ubuntu server on proxmox.png", "alt": "Logged into ubuntu server on proxmox" },
  { "src": "/images/projects/hardware-lab/Selecting ubuntu server image.png", "alt": "Selecting ubuntu server image" },
  { "src": "/images/projects/hardware-lab/Starting ubuntu server installation.png", "alt": "Starting ubuntu server installation" },
  { "src": "/images/projects/hardware-lab/summary of setup.png", "alt": "Summary of setup" },
  { "src": "/images/projects/hardware-lab/Ubuntu server installation process running .png", "alt": "Ubuntu server installation process running" },
  { "src": "/images/projects/hardware-lab/Pinging ubuntu server from my parrot OS.png", "alt": "Pinging ubuntu server from my parrot OS" },
  { "src": "/images/projects/hardware-lab/SSHed into my ubuntu server from parrot OS.png", "alt": "SSHed into my ubuntu server from parrot OS" },
  { "src": "/images/projects/hardware-lab/Docker installation from parrot OS on ubuntu server .png", "alt": "Docker installation from parrot OS on ubuntu server" },
  { "src": "/images/projects/hardware-lab/Sudo docker run hello world test which shows docker installed.png", "alt": "Sudo docker run hello world test which shows docker installed" },
  { "src": "/images/projects/hardware-lab/Portainer volume creation and installation.png", "alt": "Portainer volume creation and installation" },
  { "src": "/images/projects/hardware-lab/sudo docker ps to see the port its running on.png", "alt": "Sudo docker ps to see the port its running on" },
  { "src": "/images/projects/hardware-lab/accessing portainer dashboard in browser.png", "alt": "Accessing portainer dashboard in browser" },
  { "src": "/images/projects/hardware-lab/Portainer dashboard.png", "alt": "Portainer dashboard" },
  { "src": "/images/projects/hardware-lab/portainer dashboard 2.png", "alt": "Portainer dashboard 2" }
]
series:
  name: "Project 4.2: Ubuntu Server, Docker and Portainer Installation"
  part: 1
  totalParts: 1
category: "blue"
---

## Ubuntu Server, Docker and Portainer Installation in My Homelab

After successfully segmenting my home lab using VLANs, the next major step was to deploy an Ubuntu Server dedicated to containerized tools using Docker and Portainer. Instead of using the Proxmox console directly throughout the process, I took a more modular and realistic approach: I SSHed into the Ubuntu server remotely from another laptop running Parrot OS. This Parrot OS laptop was physically connected to my Cisco switch using an RJ45 cable and had already been assigned to VLAN 5, the dedicated Security Tools segment in my lab.

The entire flow unfolded like this:

First, I logged into Proxmox and created a new virtual machine. I named it something like UbuntuServer-docker and assigned it to VLAN 30, which is where all my Docker/container workloads reside. I used the Ubuntu Server live image, selected ZFS as the storage type, and allocated 16GB RAM to ensure smooth performance.

During the Ubuntu installation, I carefully observed the DHCP setup, a critical step. I confirmed that the system automatically received an IP address, which meant my OPNsense DHCP service was working flawlessly across VLAN 30. This gave me confidence that VLAN isolation and interconnectivity were functioning as intended.

As I proceeded through the installer, I enabled OpenSSH so I could manage the server from my Parrot OS machine instead of using the Proxmox console. Once the installation was complete and the VM rebooted, I tested connectivity from Parrot OS by running a simple ping to the new server. It responded successfully.

I then established an SSH session using:

```bash
ssh <pilotvader>@<10.10.30.100>
```

Inside the SSH session, I manually installed Docker. This included:

1. Removing conflicting packages (if any)
2. Setting up the Docker repository
3. Installing Docker Engine
4. Verifying with `sudo docker run hello-world`

The confirmation message "Hello from Docker!" appeared, a satisfying sign that the installation was successful. Running `sudo docker ps` showed no running containers, just as expected.

Next, I proceeded to install Portainer (Community Edition) by:

1. Creating a Docker volume:

```bash
sudo docker volume create portainer_data
```

2. Running the Portainer container:

```bash
sudo docker run -d -p 8000:8000 -p 9443:9443 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

Once the container was running, I opened a browser on my Parrot OS laptop and navigated to:

```
https://<10.10.30.100>:9443
```

There, I set my Portainer admin password and accessed the local environment, where I could already see two containers:

1. The Portainer container itself
2. The hello-world container Docker had used for verification

To clean up, I deleted the hello-world container via the Portainer interface.

At this point, my Ubuntu Server in VLAN 30 was now a fully functional Docker host, securely managed over VLAN 5 from my Parrot OS laptop. The whole setup reflected a real-world SOC design, segmentation, remote management, container orchestration, and will serve as the backbone for deploying security tools like Wazuh, TheHive, and Arkime in future phases.

## Conclusion

The installation of Ubuntu Server, Docker, and Portainer has laid a solid foundation for the Security Tools section of my home lab. A notable part of this setup was accessing the Ubuntu Server via SSH from a Parrot OS laptop that was physically connected, via RJ45 cable, to a specifically configured port on my Cisco switch assigned to VLAN 5 (Security Tools). This deliberate port configuration allowed the laptop to join the segmented network, and the successful DHCP assignment from my OPNsense firewall confirmed that the VLAN setup and network services were functioning properly. This mirrored the physical isolation strategy used by Gerard O'Brien and demonstrated secure out-of-band management in a segmented environment.

With Portainer deployed on top of Docker, I now have a streamlined interface to manage containers across different network zones. This sets the stage for the next phase, where I'll deploy vulnerable applications like Metasploitable2, DVWA, and WebGoat for simulation and detection exercises. Before moving forward, it's crucial to ensure all infrastructure components, network segmentation, firewall configurations, and remote management, are fully operational. This step-by-step approach highlights the value of building a secure and modular lab environment from the ground up.

Credits: This project was independently implemented by Samson Otori, drawing conceptual inspiration from Gerard O'Brien's Ultimate Cybersecurity Lab series.

Here's a link to his YouTube channels:
- [Gerard O'Brien's Channel](https://www.youtube.com/@techwithgerard)

---

**Tags:** #UbuntuServer #Docker #Portainer #SSH #VLAN #Containerization #Homelab #Proxmox #Cybersecurity #Infrastructure #Virtualization #NetworkSegmentation #SecurityTools #RemoteManagement #ContainerOrchestration 