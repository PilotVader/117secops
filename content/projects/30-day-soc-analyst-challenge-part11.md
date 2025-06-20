---
title: "Part 11: Brute Force Attacks – Techniques, Tools, and Defense Strategies"
description: "Day 11 of the 30-Day MYDFIR SOC Analyst Challenge: Understanding brute force attacks and implementing effective defense strategies."
date: "2024-11-11"
author: "Samson Otori"
tags:
  - "Brute Force"
  - "Security Defense"
  - "Attack Prevention"
  - "SOC"
  - "Security Monitoring"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-11.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 11" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 11
  totalParts: 30
---

## Day 11 of the 30-Day MYDFIR SOC Analyst Challenge: Brute Force Attacks – Techniques, Tools, and Defense Strategies

## What I Learned About Brute Force Attacks

MYDFIR explained that a brute force attack is essentially trying every password combination until the correct one is found, much like forgetting the combination to a luggage lock. Attackers typically target services like Remote Desktop Protocol (RDP) that are exposed to the internet, making these attacks quite common.

## Key Types of Brute Force Attacks

We focused on three main types of brute force attacks:

Simple Brute Force Attack: 
Like cracking a lock, attackers try various combinations of characters to guess a password.

Dictionary Attack:
This involves using word lists that contain common passwords or phrases from known credential dumps.

Credential Stuffing:
Attackers use stolen username-password pairs from previous breaches and test them on various systems to gain access.

## Defending Against Brute Force Attacks

MYDFIR taught me three essential ways to defend against brute force attacks:

Longer Passwords or Passphrases: The longer and more complex a password, the harder it is for an attacker to crack. Tools like password managers can help create and store strong passwords.

Multifactor Authentication (MFA): Enabling MFA provides an additional layer of security. Even if an attacker guesses my password, they'll need another form of verification, like a code sent via an app.

Awareness and Vigilance: MYDFIR emphasized the importance of being cautious, especially when receiving suspicious emails or login requests. Signing up for alerts if my email is compromised is also a good practice.

## Common Brute Force Tools in the Wild

I was introduced to three popular tools used for brute force attacks:
- Hydra
- Hashcat
- John the Ripper

These tools, often found in ethical hacking distributions like Kali Linux, can be used to simulate brute force attacks, but only in a controlled environment where I have permission.

## Conclusion

Tomorrow, I will set up an SSH server in the cloud, allowing me to observe brute-force attacks in real-time. It's an exciting opportunity to see how these attacks manifest and learn how to detect and stop them.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=eOie0SDMuGA&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=37)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day11 