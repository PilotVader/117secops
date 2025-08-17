---
title: "Part 19: Creating an Attack Diagram"
description: "Day 19 of the 30-Day MYDFIR SOC Analyst Challenge: Mapping out a comprehensive attack plan using Draw.io, from initial access to data exfiltration."
date: "2024-11-19"
author: "Samson Otori"
tags:
  - "Attack Diagram"
  - "Draw.io"
  - "SOC"
  - "Security"
  - "Threat Detection"
image: "/images/projects/Mydfir 30 day challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-19.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 19" },
  { "src": "/images/projects/30-day-challenge/attack-diagram-1.png", "alt": "Attack Diagram Overview" },
  { "src": "/images/projects/30-day-challenge/attack-diagram-22.png", "alt": "Attack Diagram Phase 22" },
  { "src": "/images/projects/30-day-challenge/attack-diagram-3.png", "alt": "Attack Diagram Phase 3" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 19
  totalParts: 30
---

## Day 19 of the 30-Day MyDFIR SOC Analyst Challenge: Creating an Attack Diagram

## Overview

The focus for today is on using Draw.io, mapping out a plan to compromise a target machine, focusing on brute-forcing RDP credentials, disabling Windows Defender, and establishing a C2 connection.

## Building the Attack Diagram

The essential components of our attack:

- **Mythic C2 Server** – This is the command and control server that we'll use to manage our attack.
- **Windows Server** – This will be our target machine.
- **Attacker Laptop** – Running Kali Linux, this is the machine we'll be using for the attack.

A cloud represents the internet and connects all the components accordingly. The Kali Linux laptop will be on a separate network, while the Mythic C2 server will run in the cloud.

## Phase 1: Initial Access – Brute Force

In this phase, the attacker's laptop will attempt a brute force attack over Remote Desktop Protocol (RDP) to gain access to the Windows Server. This will serve as the initial access point. If successful, we will authenticate and proceed to the next phase.

## Phase 2: Discovery – Gathering Information

Once inside the Windows Server, the next step is Discovery. The attacker will run a series of commands like:

- whoami
- ipconfig
- net user
- net group

These commands help us learn about the system, its users, and network settings. This information is crucial for planning our next moves.

## Phase 3: Defense Evasion – Disabling Defender

Before executing any malicious payloads, we need to bypass Windows Defender. The focus of this phase is defense evasion. Using our elevated privileges, we will attempt to disable Windows Defender on the server to prevent it from detecting our actions.

## Phase 4: Execution – Downloading and Running Mythic Agent

Once the defenses are down, we move to execution. In this phase, the Windows Server will reach out to our Mythic C2 server to download an agent. This will be done using PowerShell's Invoke-Expression (IEX) command to fetch and run the agent.

## Phase 5: Command and Control – Establishing C2

With the Mythic agent successfully installed, we establish a C2 connection between the compromised Windows Server and the Mythic C2 server. At this point, the attacker has full control over the target machine, enabling further malicious actions.

## Phase 6: Exfiltration – Stealing Data

The final phase is exfiltration. Creating a fake password file called passwords.txt on the Windows Server. Using the established C2 session, we'll download this file from the compromised server, mimicking a data theft scenario.

## Conclusion

This attack diagram is a simplified blueprint of how to compromise a machine, which is strictly for educational purposes only. Next, we'll go over how to set up the Mythic server and begin executing these steps. Stay tuned!

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=jv-qiugJGHg&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=46)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day19 