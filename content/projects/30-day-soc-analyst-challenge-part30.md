---
title: "Part 30: Conclusion of the 30-Day MyDFIR SOC Analyst Challenge"
description: "Day 30 of the 30-Day MYDFIR SOC Analyst Challenge: Reflecting on the journey and key learnings in SOC operations and cybersecurity."
date: "2024-03-23"
author: "Samson Otori"
tags:
  - "Conclusion"
  - "SOC"
  - "Security"
  - "Learning"
  - "Career Development"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30Days-MYDFIR-Challenge.png", "alt": "30 Days MYDFIR SOC Analyst Challenge" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 30
  totalParts: 30
---

## Day 30 of the 30-Day MyDFIR SOC Analyst Challenge: Conclusion

## Overview

As I complete the 30-Day MyDFIR SOC Analyst Challenge, the journey has significantly deepened my understanding of SOC operations and cybersecurity best practices. Over these 30 days, I've worked with key tools, investigated real-world threats, and honed my incident response skills. Here's a recap of the most valuable lessons from this experience.

## Setting Up the Foundation: Elasticsearch, Kibana, and OS Ticket

The challenge began with setting up the core tools for a functional SOC environment: Elasticsearch and Kibana. These tools allowed me to collect, visualize, and analyze security data. I learned how to create dashboards that provided real-time insights into:
- Brute-force attacks
- Login attempts
- Suspicious RDP activity

Integrating OS Ticket into my environment was a significant milestone, as it automated incident management, ensuring every alert was systematically tracked and addressed.

## Advanced Detection and Response

As the challenge progressed, I encountered various real-world attack simulations. Investigating brute-force attacks—both SSH and RDP—taught me the importance of:
- Log analysis
- IP reputation checking
- Using tools like AbuseIPDB and GreyNoise

I gained hands-on experience in identifying and responding to malicious activity. Automating ticket creation for brute-force alerts streamlined the incident-handling process, reinforcing how crucial automation is in a fast-paced SOC environment.

## Command and Control (C2) Detection

A key highlight of the challenge was investigating the Mythic C2 framework, which provided insight into how attackers use Command and Control (C2) agents to maintain access to compromised systems. I utilized:
- Network telemetry
- Tools like RITA to identify beaconing behavior
- Process creation logs

This experience demonstrated the importance of understanding network traffic and process creation logs in detecting persistent threats.

## Endpoint Security with Elastic Defend

One of the most critical components of the challenge was deploying Elastic Defend for endpoint detection and response (EDR). By testing:
- Malware detection
- Host isolation
- Telemetry data analysis

I experienced firsthand how EDR solutions play a vital role in securing endpoints. I explored Elastic's telemetry data to investigate threats more deeply and learned how to prevent and mitigate attacks by quarantining malicious files and isolating compromised hosts.

## Looking Ahead

A big thank you to [@MyDFIR](https://www.youtube.com/@MyDFIR) for creating this challenge. It provided invaluable hands-on experience, deepened my technical skills, and gave me valuable insights into the day-to-day work of a SOC analyst. The challenge has equipped me with practical skills in:
- Threat detection
- Incident response
- Endpoint security

This journey has reinforced my passion for cybersecurity, and I'm eager to continue growing as a SOC analyst.

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#MyDFIR #SOCAnalyst #MYDFIRChallenge 