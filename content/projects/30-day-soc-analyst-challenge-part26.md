---
title: "Part 26: Investigating an SSH Brute Force Alert"
description: "Day 26 of the 30-Day MYDFIR SOC Analyst Challenge: Analyzing and investigating SSH brute force attacks using security tools and threat intelligence."
date: "2024-03-23"
author: "Samson Otori"
tags:
  - "SSH"
  - "Brute Force"
  - "SOC"
  - "Security"
  - "Investigation"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-26.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 26" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 26
  totalParts: 30
---

## Day 26 of the 30-Day MyDFIR SOC Analyst Challenge: Investigating an SSH Brute Force Alert

## Overview

On Day 26 of the 30-Day MyDFIR SOC Analyst Challenge, I focused on investigating an SSH Brute Force alert, which is a common attack that tries to gain unauthorized access to a server by repeatedly guessing login credentials. This was a great opportunity to apply some detection tools I've set up throughout this challenge.

## Investigating the SSH Brute Force Alert

The first step in my investigation was to navigate to the "Alerts" section in Kibana under the security tab. I had several alerts, so I selected the most recent one, which occurred on September 17th. This alert flagged multiple failed login attempts to the root account from a specific IP address. The next step was to investigate the context behind this alert and understand whether this was a serious threat or just background noise.

## Checking the IP Address Reputation

To determine if the IP address in question was known for malicious activity, I used AbuseIPDB, a reliable source for checking the reputation of IP addresses. Sure enough, the IP had been flagged for abusive behavior over 2000 times, and the reports highlighted failed password attempts, indicating brute-force activity. I also turned to GreyNoise, which further confirmed that the IP was malicious, labeling it as an SSH brute-forcer and showing associated tags for malicious behavior. This gave me enough confidence to mark the IP as a known attacker.

## Analyzing Affected Users

Next, I needed to understand if the IP had targeted other users. I ran a query in Kibana to see the scope of the attack over the past 30 days. The results showed that the IP had attempted to brute force multiple users, including:
- Root account
- Oracle account
- Guest account
- Test accounts

Knowing which accounts were targeted helped me gauge the scale of the attack.

## Checking for Successful Logins

A critical step in the investigation was checking if any of the brute-force attempts had been successful. I searched the logs for successful login attempts but found none. This was a relief because, if successful, the attacker could have caused significant damage by executing commands or downloading malicious scripts.

## Conclusion

With no successful login attempts and the IP flagged as malicious, I felt confident in closing the alert. In a real-world environment, I would document all my findings in the ticketing system and follow up with any necessary changes to ensure similar alerts are handled promptly. This investigation helped reinforce my understanding of SSH brute-force attacks and the importance of monitoring for suspicious activity.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=sXQ1hsAFX7U&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=53)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #Day26 #HandsOnExperience #BruteForce 