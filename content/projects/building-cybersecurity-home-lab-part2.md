---
title: "Part 2: Generating Telemetry and Analyzing Attacks"
client: "Personal Project"
description: "Generating telemetry and analyzing attacks in our cybersecurity home lab."
date: "2024-11-23"
author: "Samson Otori"
challenge: "Generate and analyze telemetry data to detect malicious activities."
solution: "Used Nmap for reconnaissance, Metasploit for attack simulation, and Splunk for log analysis."
results: [
  "Successfully generated attack telemetry",
  "Implemented attack detection capabilities",
  "Gained hands-on experience with security tools"
]
image: "/images/projects/homelab-coding.jpg"
technologies: ["Nmap", "Metasploit", "Python", "Splunk"]
category: "blue"
tags: ["Blue Team", "Home Lab", "SIEM"]
series:
  name: "Project 1: Building a Cybersecurity Home Lab"
  part: 2
  totalParts: 2
images: [
  { "src": "/images/projects/homelab-part2/1 RDP Port Opened on windows 10 NMAP SCAN.png", "alt": "RDP Port Opened on Windows 10 - NMAP Scan" },
  { "src": "/images/projects/homelab-part2/2 MSFVEnoM.png", "alt": "MSFVenom Configuration" },
  { "src": "/images/projects/homelab-part2/3 msfvenom payload i will use.png", "alt": "MSFVenom Payload Selection" },
  { "src": "/images/projects/homelab-part2/4 Malware Creation RESUME.png", "alt": "Malware Creation Process" },
  { "src": "/images/projects/homelab-part2/5 msfconsole.png", "alt": "MSFConsole Interface" },
  { "src": "/images/projects/homelab-part2/6 payload options .png", "alt": "Payload Options Configuration" },
  { "src": "/images/projects/homelab-part2/7 Changing the payload options.png", "alt": "Modifying Payload Options" },
  { "src": "/images/projects/homelab-part2/8 Settings LHOST to Attacker IP.png", "alt": "Setting LHOST to Attacker IP" },
  { "src": "/images/projects/homelab-part2/9 Listening and waiting for test machine to execute malware.png", "alt": "Listener Waiting for Test Machine" },
  { "src": "/images/projects/homelab-part2/10 Http server setup for test machine to download malware.png", "alt": "HTTP Server Setup for Malware Download" },
  { "src": "/images/projects/homelab-part2/11 Disabling windows defender.png", "alt": "Disabling Windows Defender" },
  { "src": "/images/projects/homelab-part2/12 Accessing attacker server to download malware.png", "alt": "Accessing Attacker Server" },
  { "src": "/images/projects/homelab-part2/13 downloaded malware without file extension.png", "alt": "Downloaded Malware Without Extension" },
  { "src": "/images/projects/homelab-part2/14 Established connection between attacker and test machine after executing malware.png", "alt": "Established Connection After Malware Execution" },
  { "src": "/images/projects/homelab-part2/15 Confirmation of process running on task manager.png", "alt": "Process Confirmation in Task Manager" },
  { "src": "/images/projects/homelab-part2/16 Connection created at my handler.png", "alt": "Connection Created at Handler" },
  { "src": "/images/projects/homelab-part2/17 Commands ran on the test machine from the attacker machine SHELL then NET USER.png", "alt": "Commands Execution - SHELL and NET USER" },
  { "src": "/images/projects/homelab-part2/18 COMMAND NET LOCAL GROUP on shell .png", "alt": "NET LOCAL GROUP Command Execution" },
  { "src": "/images/projects/homelab-part2/19 COMMAND ipconfig on SHELL.png", "alt": "IPCONFIG Command Execution" },
  { "src": "/images/projects/homelab-part2/20 quering my attackig ip address on splunk.png", "alt": "Querying Attacker IP in Splunk" },
  { "src": "/images/projects/homelab-part2/21 Quering RESUMEdotPDFdotEXE.png", "alt": "Querying Malware Execution in Splunk" },
  { "src": "/images/projects/homelab-part2/22 Sticking with event code 1.png", "alt": "Event Code 1 Analysis" },
  { "src": "/images/projects/homelab-part2/23 Parentprocess SPLUNK.png", "alt": "Parent Process Analysis in Splunk" },
  { "src": "/images/projects/homelab-part2/24 what the parent process spawned cmd.exe.png", "alt": "Parent Process Spawning CMD.exe" },
  { "src": "/images/projects/homelab-part2/25 with process id.png", "alt": "Process ID Information" },
  { "src": "/images/projects/homelab-part2/26 Searching through processguid and structuring query.png", "alt": "Process GUID Search and Query Structure" },
  { "src": "/images/projects/homelab-part2/27 Searching through processguid and structuring query to know what exactly happened.png", "alt": "Detailed Query Structure Analysis" },
  { "src": "/images/projects/homelab-part2/28 Python http server to deply malware online for download.png", "alt": "Python HTTP Server for Malware Deployment" }
]
---

# Part 2: Generating Telemetry and Analyzing Attacks

My focus has shifted to generating telemetry data for analysis, a critical step in detecting malicious activities.

## Scanning with Nmap

I started the telemetry generation process with Nmap. This enabled me to conduct a comprehensive scan of my Windows VM, identifying open ports and services that could be potential attack vectors. This reconnaissance phase helped me understand the attack surface and assess vulnerabilities within my environment.

The scan revealed several open ports, notably Port 3389, associated with Remote Desktop Protocol (RDP). Identifying such services is crucial as they can serve as entry points for attackers seeking to exploit system weaknesses.

## Crafting Malware with Metasploit

After reconnaissance, I shifted to creating a simulated attack using Metasploit, a widely used framework for penetration testing. I crafted a reverse shell payload, a common technique used by attackers to gain unauthorized access to target systems. This exercise provided insight into the attack lifecycle and how malicious actors exploit systems.

With the malicious executable ready, I set up a listener in Metasploit to capture any incoming connections from the reverse shell. This involved configuring the Metasploit environment for potential exploitation attempts from the crafted payload.

## Executing the Malware

Once the payload and listener were in place, I set up an HTTP server using Python on my attacking OS. I accessed the server from my Windows machine to download the malware. To simulate a real-world scenario, I disabled Windows Defender to allow the payload to execute unhindered.

After running the payload, I monitored my parrot machine for an incoming connection, indicating a successful exploit. I executed basic commands like SHELL, NET USER, and IP CONFIG to generate telemetry data.

## Analyzing Telemetry with Splunk

With the simulated attack executed, I turned to analyzing the telemetry generated by the activities in my lab. I configured Splunk to ingest system logs from Sysmon, setting up an index dedicated to endpoint monitoring.

By correlating telemetry data with events from the attack simulation, I gained insights into the attack lifecycle. I reviewed logs for indicators of compromise, including the creation and execution of the reverse shell. This analysis is essential for developing effective detection strategies in a real-world Security Operations Center (SOC).

## Conclusion

Through these exercises, I've deepened my understanding of the attack lifecycle and the importance of telemetry in incident response. Generating and analyzing telemetry data is fundamental for any aspiring SOC analyst. In the coming days, I plan to refine my detection capabilities further and explore additional avenues for generating and analyzing telemetry.

Here's the link to follow along: [Building A Basic Home Lab](https://www.youtube.com/watch?v=-8X7Ay4YCoA&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=3)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

_#CyberSecurity #SOCAnalyst #MYDFIR #HandsOnExperience_ 