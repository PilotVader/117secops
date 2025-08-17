---
title: "Part 27: Investigating an RDP Brute Force Attack"
description: "Day 27 of the 30-Day MYDFIR SOC Analyst Challenge: Analyzing and investigating RDP brute force attacks using security tools and automated ticketing."
date: "2024-11-27"
author: "Samson Otori"
tags:
  - "RDP"
  - "Brute Force"
  - "SOC"
  - "Security"
  - "Investigation"
image: "/images/projects/Mydfir 30 day challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-27.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 27" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 27
  totalParts: 30
---

## Day 27 of the 30-Day MYDFIR SOC Analyst Challenge: Investigating an RDP Brute Force Attack

## Overview

On Day 27 of my 30-Day MYDFIR SOC Analyst Challenge, I shifted focus to investigating an RDP brute force attack alert. The process follows a similar methodology to investigating an SSH brute force attack, with the only major difference being the protocol in question. Here's how I broke it down.

## Reviewing the Alert

I started by navigating to the alerts section in my web interface, filtering for RDP brute force alerts. Out of 327 total alerts, I found 5 related to RDP brute force. I selected one of the alerts and also took note of the source IP, which had a username attempt of "administrator." There were 5 events in total, so I dug deeper into the details.

## Automating Ticket Creation in OS Ticket

Because I had already set up an automated ticket creation system for SSH brute force alerts, I decided to replicate the process for this RDP alert. Using the existing SSH rule, I copied the webhook details and applied them to the RDP brute force rule. This allowed me to automatically generate a ticket within OS Ticket whenever an RDP brute force attack is detected.

## Investigating the IP Address

For the next steps, I wanted to gather more information about the attacking IP address. First, I used AbuseIPDB, which revealed that the IP had been reported 71 times, with a 63% confidence score of malicious activity, mostly relating to RDP brute force attempts. Then, I checked GreyNoise, which classified the IP as "unknown intent," meaning it was engaged in internet-wide scanning but not specifically targeting my environment. This data gave me enough confidence to mark the IP as associated with RDP brute force activity.

## Analyzing for Affected Users

I next wanted to see if any other users were targeted by the attacker. After filtering my logs for the past 30 days, I found 271 events related to this IP, but all of them were focused on the "administrator" account. This confirmed that no other user accounts had been affected.

## Checking for Successful Logins

A crucial part of any brute force investigation is determining whether the attacker was successful. In this case, I looked for Windows event code 4624, which indicates a successful login. Fortunately, there were no successful authentication attempts from this IP address, so I could confirm that the attack had failed.

## Conclusion

Even though there were no successful logins in this case, the investigation served as a good reminder of the importance of thorough log review and automated alerting. In the next step of this challenge, I'll be diving deeper into another investigation, this time analyzing activity from the Mythic C2 agent. Stay tuned for more insights!

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=l9KA6dPdOs8&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=54)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day27 