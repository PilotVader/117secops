---
title: "Part 12: Setting Up an SSH Server and Monitoring Authentication Logs in Real-Time"
description: "Day 12 of the 30-Day MYDFIR SOC Analyst Challenge: Deploying a cloud server and analyzing real-time authentication logs to detect brute force attempts."
date: "2024-11-12"
author: "Samson Otori"
tags:
  - "SSH"
  - "Log Analysis"
  - "Server Security"
  - "SOC"
  - "Security Monitoring"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-12.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 12" },
  { "src": "/images/projects/30-day-challenge/failed-login-attempts-f-9-10-11.png", "alt": "Failed Login Attempts Filtered by Date" },
  { "src": "/images/projects/30-day-challenge/failed-login-attempts-i-failed.png", "alt": "Failed Login Attempts Filtered by 'failed' Keyword" },
  { "src": "/images/projects/30-day-challenge/failed-login-attempts-i-root.png", "alt": "Failed Login Attempts Targeting Root User" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 12
  totalParts: 30
---

## Day 12 of the 30-Day MYDFIR SOC Analyst Challenge: Setting Up an SSH Server and Monitoring Authentication Logs in Real-Time

## Overview

On Day 12 of the 30-Day MYDFIR SOC Analyst Challenge, I focused on setting up an SSH server in the cloud and learning how to review authentication logs in real time. This exercise provides practical experience in server management and log analysis, crucial skills for aspiring SOC analysts.

## SSH Server Setup

I logged into Vultr and deployed a cloud computing instance with Ubuntu 24.04. This lightweight server (1 CPU and 1GB RAM) was perfect for our needs. I then connected via PowerShell, updated the repositories, and ensured my server was fully up to date.

## Exploring Authentication Logs

The next step involved navigating to the directory where authentication logs are stored: `/var/log/auth.log`. These logs provide a view of login attempts on the server. Initially, there was no activity since the server had just been deployed, but I left it running for about 45 minutes. When I returned, I noticed several failed login attempts exactly as MYDFIR predicted.

Using a simple grep command, I filtered the logs to find entries containing the term "failed." Additionally, I isolated attempts that targeted the "root" user, allowing me to focus on the most important data.

## Identifying Attackers

MYDFIR also talked about how to extract IP addresses from these failed login attempts. By using the cut command, I was able to isolate the specific IP addresses responsible for trying to break into the server. It was amazing to see how quickly the logs filled up with attempts to compromise the server.

## Conclusion

By following MYDFIR's guidance, I was able to set up and secure my SSH server, and I gained insight into real-world attack patterns by observing authentication logs. This hands-on experience is invaluable for anyone looking to understand how brute force attacks happen and how to detect them. In the next step, I'll install the Elastic Agent to forward these logs to ElasticSearch for even deeper analysis.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=qsMhmXIqWfc&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=39)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day12 