---
title: "Part 21: Brute Force Attack & Establishing a C2 Session"
description: "Day 21 of the 30-Day MYDFIR SOC Analyst Challenge: Executing a brute force attack, generating a Mythic agent, and establishing a Command and Control session on a Windows Server."
date: "2024-11-21"
author: "Samson Otori"
tags:
  - "Brute Force"
  - "C2"
  - "SOC"
  - "Security"
  - "Windows Security"
image: "/images/projects/Mydfir 30 day challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/1-30-days-day-21.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 21" },
  { "src": "/images/projects/30-day-challenge/2-Screenshot.png", "alt": "Initial Screenshot" },
  { "src": "/images/projects/30-day-challenge/3-rdp-windows-server-on-parrot.png", "alt": "RDP Connection to Windows Server from Parrot" },
  { "src": "/images/projects/30-day-challenge/4-running-command-on-windows-server.png", "alt": "Running Commands on Windows Server" },
  { "src": "/images/projects/30-day-challenge/5-turning-off-windows-defender-on-windows-server.png", "alt": "Disabling Windows Defender" },
  { "src": "/images/projects/30-day-challenge/6-established-connection.png", "alt": "Established Connection" },
  { "src": "/images/projects/30-day-challenge/7-mythic-dashboard-apollo-install.png", "alt": "Mythic Dashboard Apollo Installation" },
  { "src": "/images/projects/30-day-challenge/8-C2-install-on-Mythic.png", "alt": "C2 Installation on Mythic" },
  { "src": "/images/projects/30-day-challenge/9-command-and-control-stage.png", "alt": "Command and Control Stage" },
  { "src": "/images/projects/30-day-challenge/10-exfiltration.png", "alt": "Data Exfiltration" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 21
  totalParts: 30
---

## Day 21 of the 30-Day MyDFIR SOC Analyst Challenge: Brute Force Attack & Establishing a C2 Session

## Overview

Today, I focused on executing a brute force attack, generating a Mythic agent, and establishing a Command and Control (C2) session on a Windows Server.

## Brute Force Attack on Windows Server

I started by connecting to the target Windows server via Remote Desktop Protocol (RDP). For this, I intentionally set a weak password on the server: Winter2024! This allowed me to simulate a typical scenario where an attacker might exploit weak credentials.

Next, I used the Crowbar tool on my Parrot OS machine to brute-force the RDP login. With the weak password added to a wordlist, I ran Crowbar, which quickly cracked the credentials. Using the recovered password, I accessed the server via xfreerdp, verifying the successful login by executing basic commands like Whoami and ipconfig.

## Disabling Windows Defender for Defense Evasion

Once inside the Windows server, my first task was to disable its defenses. I navigated to the Windows Security settings and manually turned off real-time protection along with other key security features.

## Generating the Mythic Agent

With the server exposed, I generated a Mythic C2 payload. Mythic is a popular Command and Control (C2) framework used by attackers to remotely control compromised systems. I installed the Apollo agent and the HTTP C2 Profile on my Mythic platform, customizing the settings to ensure the payload would effectively communicate back to my control server.

After setting up the Mythic agent, I created a Windows executable payload. This payload would be used to establish a persistent connection between the compromised server and the Mythic C2 server.

## Establishing the C2 Session

To deliver the payload to the Windows server, I used Python's http.server on port 9999 and PowerShell's Invoke-WebRequest to download it onto the target machine. Once the payload was executed on the server, it successfully connected to the Mythic C2 platform.

## Data Exfiltration

With full control established, I moved on to exfiltrate data. Specifically, I retrieved a file named passwords.txt from the server's Documents folder. Using the download command in Mythic, I successfully downloaded the file, confirming the presence of the weak password, Winter2024!

## Conclusion

I simulated a brute force attack, compromised a Windows server, and used Mythic to establish a C2 session for remote control and data exfiltration. This activity demonstrates the methods attackers use to infiltrate systems and the importance of maintaining strong security practices, such as enforcing complex passwords and securing endpoints.

Next, I'll focus on creating alerts and dashboards to detect Mythic activity and defend against similar attacks. Stay tuned!

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=85x0NLj2zUo&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=48)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day21 