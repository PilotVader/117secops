---
title: "Part 7: Installing Elastic Agent and Setting Up Fleet Server"
description: "Day 7 of the 30-Day MYDFIR SOC Analyst Challenge: Setting up Elastic Agent and Fleet Server for centralized log management."
date: "2024-03-23"
author: "Samson Otori"
tags:
  - "Elastic Agent"
  - "Fleet Server"
  - "Log Management"
  - "SOC"
  - "Security Monitoring"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-7.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 7" },
  { "src": "/images/projects/30-day-challenge/Elastic-agent-Installation-on-fleet-server.png", "alt": "Elastic Agent Installation on Fleet Server" },
  { "src": "/images/projects/30-day-challenge/Elastic-agent-installation-on-windows-server.png", "alt": "Elastic Agent Installation on Windows Server" },
  { "src": "/images/projects/30-day-challenge/Fleet-Installed-Image-on-elastic-gui.png", "alt": "Fleet Installation on Elastic GUI" },
  { "src": "/images/projects/30-day-challenge/Logs-Captured-from-Elastic-GUI.png", "alt": "Logs Captured from Elastic GUI" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 7
  totalParts: 30
---

## Day 7 of the 30-Day MYDFIR SOC Analyst Challenge: Installing Elastic Agent and Setting Up Fleet Server

Welcome to Day 7 of the 30-Day My DFIR SOC Analyst Challenge, I took critical steps toward building a robust monitoring system by installing the Elastic Agent on a Windows Server and setting up a Fleet server for centralized management. This process is vital for SOC analysts to efficiently manage logs across multiple endpoints.

## Deploying the Fleet Server

I began with deploying an Ubuntu server to act as the Fleet server. This server plays a pivotal role by allowing me to manage multiple Elastic Agents from a single location. By centralizing the management of these agents, I can easily push updates, modify policies, and ensure all endpoints are correctly configured without needing to access each one individually.

## Setting Up in Kibana

Next, I moved into Kibana's interface, where I configured the Fleet server. This step involved generating enrollment tokens and policies that would allow the Elastic Agents to communicate securely with the Fleet server and Elasticsearch. In a real-world SOC environment, getting these configurations right is crucial, as they dictate how data flows between my endpoints and my central log management system.

## Overcoming Connectivity Challenges.

A key part of this process was troubleshooting connectivity issues. The initial setup ran into problems due to restrictive firewall rules that blocked the necessary communication between the Fleet server and the Elasticsearch instance. Adjusting both the VPC and server-level firewall rules allowed for the proper connections to be established. This scenario underscored the delicate balance I must strike between securing my systems and maintaining operational functionality.

## Installing the Elastic Agent on Windows Server

Once the Fleet server was configured, the next task was to install the Elastic Agent on my Windows Server. This agent is essential for collecting logs and metrics, and forwarding them to my Elasticsearch instance via the Fleet server. During this step, I encountered a few errors related to certificate validation and network connectivity. However, by utilizing the --insecure flag and ensuring the correct firewall ports were open, I successfully enrolled the Windows Server into the Fleet.

## Conclusion

Day 7 was all about setting up the infrastructure needed for effective log management. By successfully installing the Elastic Agent and configuring a Fleet server, I laid the groundwork for a scalable, manageable, and secure logging environment. In the next session, I'll dive deeper into system activity monitoring by installing Sysmon on my Windows Server, further enhancing my ability to detect and respond to threats.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=P2SFC6Kwae0&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=34)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)* 