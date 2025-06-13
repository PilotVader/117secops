---
title: "Part 29: Installing and Exploring Elastic Defend on Windows Server"
description: "Day 29 of the 30-Day MYDFIR SOC Analyst Challenge: Setting up and testing Elastic Defend EDR solution for comprehensive endpoint protection."
date: "2024-03-23"
author: "Samson Otori"
tags:
  - "Elastic Defend"
  - "EDR"
  - "SOC"
  - "Security"
  - "Windows Server"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-29.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 29" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 29
  totalParts: 30
---

## Day 29 of the 30-Day MyDFIR SOC Analyst Challenge: Installing and Exploring Elastic Defend on Windows Server

## Overview

On Day 29, I focused on Elastic's Endpoint Detection and Response (EDR) tool—Elastic Defend. This powerful EDR solution offers comprehensive endpoint protection and valuable telemetry to help monitor and respond to threats.

## Setting Up Elastic Defend

Elastic Defend is part of the Elastic Stack, and with the free 30-day trial, I could unlock additional features like full telemetry and host isolation. To get started, I accessed the Integrations section in Elastic, From there, I added Elastic Defend to my environment. Elastic Defend offers several configuration options, including:
- Data Collection
- Next-Gen Antivirus
- Essential EDR
- Complete EDR

For this challenge, I chose Complete EDR, I then deployed Elastic Defend to my Windows Server using a Fleet server, allowing centralized management of multiple endpoints.

## Monitoring and Testing

With Elastic Defend successfully installed, I checked the Security section in Kibana to ensure the endpoint appeared, confirming the agent was active. Elastic Defend offers multiple actions, including the ability to isolate the host, which is available with the trial version.

I wanted to test Elastic Defend's malware detection capabilities, so I ran the pilotvader.exe process on my Windows Server, simulating a malicious action. As expected, Elastic Defend instantly flagged and blocked the file. A message appeared stating that the operation couldn't be completed because the file contained a virus, and I received a malware prevention alert confirming the file had been quarantined.

## Investigating Telemetry

To dive deeper, I went into the Discover tab in Kibana and filtered the logs to view recent events. There, I found the malware prevention alert with detailed information about the malicious file, including:
- File hash
- Quarantine path
- Directory (C:\Users\Public\Downloads)

In the Security tab, I also explored the process tree, which showed the relationship between the legitimate explorer.exe process and the blocked pilotvader.exe. If the malware had spawned other processes, they would have also appeared here.

## Isolating the Host

Next, I tested Elastic Defend's host isolation feature. After initiating an infinite ping to Google's DNS (8.8.8.8), I re-downloaded the malicious file, which Elastic Defend promptly quarantined again. Soon after, the host was isolated, demonstrating Elastic Defend's ability to take responsive action against threats.

## Conclusion

Day 29 was a valuable deep dive into Elastic Defend. I learned how to install, monitor, and test its EDR capabilities, reinforcing its importance for endpoint security. I'll wrap up the challenge tomorrow by reviewing troubleshooting techniques and fine-tuning detection strategies.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=Ec-Ab8TbJKs&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=56)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day29 