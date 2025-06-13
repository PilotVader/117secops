---
title: "Part 18: Understanding Command and Control (C2)"
description: "Day 18 of the 30-Day MYDFIR SOC Analyst Challenge: Exploring C2 frameworks, their importance in cyberattacks, and preparing for Mythic implementation."
date: "2024-03-23"
author: "Samson Otori"
tags:
  - "C2"
  - "Mythic"
  - "Security"
  - "SOC"
  - "Threat Detection"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-18.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 18" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 18
  totalParts: 30
---

## Day 18 of the 30-Day MyDFIR SOC Analyst Challenge: Understanding Command and Control (C2)

## Overview

Welcome to Day 18 of the 30-Day MyDFIR SOC Analyst Challenge. Today, our focus would be on an essential part of cyberattacks, Command and Control (C2). In this blog, we'll go over what C2 is, why it's crucial for attackers, and the common tools they use. We'll also look at one particular framework, Mythic, which we will use later in this challenge.

## What is Command and Control?

Command and Control (C2) refers to the techniques attackers use to communicate with systems they have compromised in a victim's network. According to the MITRE ATT&CK framework, C2 allows attackers to maintain control over the compromised system, enabling them to perform various malicious activities.

Once attackers gain access to a victim's machine, they need a way to interact with it remotely. C2 helps them move closer to their end goal, stealing credentials, exfiltrating data, or deploying ransomware.

## Why is Establishing C2 Important?

The importance of C2 for attackers cannot be overstated. Without it, they couldn't perform further actions on the compromised network. C2 is a gateway for attackers to escalate privileges, move laterally, steal sensitive information, or even disrupt services.

For attackers to cause harm, they must maintain access to the network, which they do through C2 channels. The MITRE ATT&CK framework lists 18 different techniques attackers use to establish C2, and understanding these techniques is crucial for any SOC analyst.

## Common Tools and Frameworks for C2

Several C2 frameworks are used in the wild. Let's focus on four of the most common:

### 1. Metasploit
Metasploit is a popular framework used for vulnerability exploitation. It's widely available and often used in ethical hacking environments, but attackers also use it to exploit vulnerable systems.

### 2. Cobalt Strike
Cobalt Strike is a commercial adversary emulation tool. Though it's legitimate software, attackers frequently use it in real-world breaches. Fortunately, because it's so widely used, there are many detection methods available.

### 3. Sliver
Sliver is an open-source alternative to Cobalt Strike, developed by Bishop Fox. It supports multiple protocols like HTTP, HTTPS, and DNS, making it a versatile tool for attackers.

### 4. Mythic
Mythic is the framework I'll be using in this challenge. Built with GoLang and Docker, Mythic provides a user-friendly interface for managing payloads and C2 profiles. This flexibility makes it a favorite for adversary emulation.

## Conclusion

In the next part of the challenge, I'll dive deeper into crafting attacks on our Windows Server and setting up a Mythic C2 server. Stay tuned as we explore how to deploy agents and establish a successful C2 session.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=WnOkhGNPmyA&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=45)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day18 