---
title: "Part 20: Setting Up Mythic C2"
description: "Day 20 of the 30-Day MYDFIR SOC Analyst Challenge: Deploying and configuring Mythic C2 framework on a cloud server with enhanced security settings."
date: "2024-11-20"
author: "Samson Otori"
tags:
  - "Mythic"
  - "C2"
  - "SOC"
  - "Security"
  - "Cloud Security"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-20.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 20" },
  { "src": "/images/projects/30-day-challenge/Mythic-CLI.png", "alt": "Mythic Command Line Interface" },
  { "src": "/images/projects/30-day-challenge/mythic-dashboard.png", "alt": "Mythic Dashboard Interface" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 20
  totalParts: 30
---

## Day 20 of the 30-Day MyDFIR SOC Analyst Challenge: Setting Up Mythic C2

## Overview

On Day 20 of the 30-Day MyDFIR SOC Analyst Challenge, I set up Mythic C2, a command-and-control (C2) framework. This day's challenge was focused on getting familiar with the Mythic interface, installing it on a cloud server, and tightening its security configurations.

## Deploying Mythic on Vulture Cloud

The first step was logging into the Vulture cloud provider and deploying a new server. I opted for Cloud Compute with a shared CPU, choosing Ubuntu with 4GB of RAM. After naming the server and starting the deployment, I prepared to install Kali Linux on my machine.

## Installing Kali Linux

I headed to the official Kali site and downloaded the VMware version for the Kali Linux setup, as I would run it on a virtual machine. After extracting the download, I loaded the .vmx file into VMware Workstation, started Kali, and ensured it ran smoothly.

## SSH Into Mythic Server

With the Mythic server ready on Vulture, I accessed it using SSH through PowerShell. After logging in, I updated the system repositories with apt-get update and apt-get upgrade. I then installed Docker, Docker Compose, and the make tool to ensure Mythic would run correctly.

## Installing Mythic

Next, I cloned the Mythic repository from GitHub and navigated into the directory. The installation process was initiated using a shell script designed for Docker on Ubuntu. Once the installation was completed, I encountered a minor issue with Docker not starting but resolved it by restarting the service.

## Configuring Mythic

With Mythic running, I began configuring the system. To enhance security, I created a custom firewall rule that only allowed my machine and specific agents to communicate with the Mythic server. This step ensured that no unauthorized IPs could attempt to access the server.

## Accessing Mythic's Web GUI

Finally, I logged into Mythic's web GUI using the server's IP and port 7443. I retrieved the login credentials from the environment variables stored on the server and successfully accessed the dashboard, where I explored the various options for managing payloads, callbacks, and more.

## Conclusion

With Mythic C2 set up and configured, I'm now ready to start generating payloads and testing them against our Windows server in future challenges. This setup is crucial for understanding C2 frameworks and is a key step for any SOC analyst. Stay tuned as I dive deeper into Mythic's capabilities in the upcoming challenges!

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=JKO1pZ45_5I&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=47)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day20 