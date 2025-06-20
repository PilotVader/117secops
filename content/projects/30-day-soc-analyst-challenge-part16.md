---
title: "Part 16: Windows Authentication Logs and RDP/SSH Brute Force Alerts"
description: "Day 16 of the 30-Day MYDFIR SOC Analyst Challenge: Analyzing Windows authentication logs and creating sophisticated alerts for brute force detection."
date: "2024-11-16"
author: "Samson Otori"
tags:
  - "Windows"
  - "Authentication"
  - "Alerts"
  - "SOC"
  - "Security Monitoring"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-16.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 16" },
  { "src": "/images/projects/30-day-challenge/Elastisearch-query-breached.png", "alt": "Elasticsearch Query for Breached Attempts" },
  { "src": "/images/projects/30-day-challenge/overview.png", "alt": "Overview of Authentication Monitoring" },
  { "src": "/images/projects/30-day-challenge/RDP-brute-force-attempt.png", "alt": "RDP Brute Force Attempt Detection" },
  { "src": "/images/projects/30-day-challenge/SSH-brute-for-attempt.png", "alt": "SSH Brute Force Attempt Detection" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 16
  totalParts: 30
---

## Day 16 of the 30-Day MYDFIR SOC Analyst Challenge: Windows Authentication Logs and RDP/SSH Brute Force Alerts

## Overview

On Day 16 of our challenge, I delved into the task of analyzing Windows authentication logs and creating alerts for RDP and SSH Brute Force attempts. This exercise built upon our previous work, further improving my skills as a SOC analyst.

## Analyzing Windows Authentication Logs

I began by accessing the Elastic web GUI and filtering events specifically for my Windows RDP server. My primary objective was to identify failed authentication attempts, which are key indicators of potential Brute Force activities. Through my research, I discovered that Event ID 4625 is associated with failed logon attempts on Windows systems, providing me with a specific marker to focus on.

## Customizing Data View

To gain a comprehensive understanding of these failed attempts, I tailored my data view in Elastic. I focused on three critical pieces of information:
- The failed attempts themselves (represented by Event ID 4625)
- The source IP address of the login attempt
- The username being targeted

This customized view allowed me to quickly assess the nature and scope of potential attacks. I then verified my setup by performing a test login attempt, ensuring that my system accurately captured RDP-specific events.

## Creating RDP And SSH Brute Force Alerts

My initial approach involved setting up a basic alert that would trigger when Event ID 4625 occurred more than five times within a five-minute window. However, I quickly realized that this alert lacked the detail necessary for effective threat analysis.

To address this, I developed an enhanced custom rule. This improved alert incorporated specific usernames, such as "administrator," and grouped events by both source IP and username. I also increased the frequency of our checks, configuring the system to analyze data every minute while looking back over five minutes.

## Conclusion

Through this exercise, I gained several valuable insights:
- The importance of fine-tuning alerts to provide truly actionable information
- A deeper understanding of various authentication event IDs and their significance in Windows environments
- The value of correlating events across multiple data points for a more comprehensive picture
- The need for continuous refinement of alert systems to minimize false positives

As I move forward, our next session will focus on creating dashboards to visualize the sources of these authentication attempts, further enhancing my ability to detect and respond to threats efficiently.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=11eBIfDeZ7k&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=43)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day16 