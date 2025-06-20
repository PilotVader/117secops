---
title: "Part 15: Remote Desktop Protocol Introduction"
description: "Day 15 of the 30-Day MYDFIR SOC Analyst Challenge: Understanding RDP vulnerabilities, detection tools, and security best practices."
date: "2024-11-15"
author: "Samson Otori"
tags:
  - "RDP"
  - "Remote Access"
  - "Security"
  - "SOC"
  - "Network Security"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-15.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 15" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 15
  totalParts: 30
---

## Day 15 of the 30-Day MYDFIR SOC Analyst Challenge: Remote Desktop Protocol Introduction

## Overview

On Day 15 of the MyDFIR SOC Analyst Challenge, I dove into Remote Desktop Protocol (RDP), a commonly used but frequently abused protocol. According to Sophos, RDP was involved in 90% of ransomware breaches in 2023. This session focused on understanding RDP, its vulnerabilities, and how to secure it.

## The Risks of RDP

RDP allows users to remotely access machines over the internet, operating on Port 3389. While this offers convenience, especially for remote work or troubleshooting, the same accessibility makes RDP a prime target for attackers. They exploit open RDP services via brute-force attacks or use stolen credentials, to gain access to an organization's internal systems. Once inside, attackers can escalate privileges, steal data, or deploy ransomware.

## Tools for Detecting Exposed RDP

I learned about Shodan and Censys, two powerful search engines for internet-connected devices. By searching for Port 3389, I identified millions of devices with RDP exposed to the internet. Organizations should regularly use these tools to audit their exposure and assess whether sensitive services are unnecessarily open to the public.

## Securing RDP

To mitigate the risks associated with RDP, I learned five key measures:

1. Disable RDP when not in use to limit exposure.
2. Enable multi-factor authentication (MFA) for an added layer of security.
3. Restrict access by using firewalls or VPNs, limiting RDP to trusted networks.
4. Enforce strong passwords, ideally with a privileged access management (PAM) tool.
5. Disable default accounts and create custom admin accounts to reduce attack vectors.

## Importance of Auditing and Monitoring

Auditing authentication logs is crucial for identifying suspicious activity, such as login attempts from unusual geographic locations. Early detection of unauthorized access can prevent further exploitation.

## Conclusion

Day 15 emphasized the critical nature of RDP security. RDP is a convenient tool, but its vulnerabilities require careful management. By following these best practices, organizations can significantly reduce the risk of RDP-based attacks and stay ahead of emerging threats.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=tNhGxtKZo7c&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=42)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day15 