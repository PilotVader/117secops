---
title: "Part 22: Creating Alerts and Dashboards for Mythic C2 Detection"
description: "Day 22 of the 30-Day MYDFIR SOC Analyst Challenge: Building alerts and dashboards to detect and monitor Mythic C2 activity in the SOC environment."
date: "2024-11-22"
author: "Samson Otori"
tags:
  - "Alerts"
  - "Dashboards"
  - "SOC"
  - "Security"
  - "Threat Detection"
image: "/images/projects/Mydfir 30 day challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/1-30-days-day-22.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 22" },
  { "src": "/images/projects/30-day-challenge/2-Mythic-C2-Apollo-Agent-Detection-Rule.png", "alt": "Mythic C2 Apollo Agent Detection Rule" },
  { "src": "/images/projects/30-day-challenge/3-Mythic-Alert.png", "alt": "Mythic Alert Configuration" },
  { "src": "/images/projects/30-day-challenge/4-MyDFIR-Suspicious-Activity.png", "alt": "MyDFIR Suspicious Activity Dashboard" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 22
  totalParts: 30
---

## Day 22 of the 30-Day MyDFIR SOC Analyst Challenge: Creating Alerts and Dashboards for Mythic C2 Detection

## Overview

On Day 22 of the 30-Day MyDFIR SOC Analyst Challenge, I focused on creating alerts and dashboards to detect Mythic C2 activity, building on the groundwork from Day 21. This step is crucial in setting up efficient monitoring and detection of suspicious activity within the SOC environment.

## Creating the Alert

I started by accessing the Elastic web UI, navigating to the Discover section, and resetting the view. To ensure I captured relevant events, I set the time range to 30 days. This gave me a clear view of the events linked to "svchost-pilotvader.exe," which was triggered by our Mythic C2 agent in the previous exercise.

The next step was filtering the process creation events using Sysmon's event code 1. This allowed me to see details like the MD5 hash of the binary associated with Mythic C2. Using this information, I further investigated the event by cross-referencing the SHA-1 hash with VirusTotal for additional context. Since the agent was newly created, the results were limited but still useful.

Interestingly, the original file name of the Mythic C2 agent was "apollo.exe," even though it was executed as "svchost-pilotvader.exe." This discrepancy helped pinpoint the activity more accurately, making it a prime candidate for alert creation.

## Setting the Alert

I created a query based on event code 1 for process creation. The query focused on the SHA-256 hash and the original file name "apollo.exe." Once the alert was set, it was designed to trigger whenever Mythic C2 activity surfaced in the environment.

## Building the Dashboard

Next, I built a dashboard to visualize the Mythic C2 activity. By leveraging Elastic's Kibana features, I set up visualizations that track key metrics, such as:

- Process creation events
- File hashes
- Network connections linked to Mythic C2

The dashboard provides real-time insights, allowing for faster detection and response to similar threats in the future.

## Conclusion

With the alert and dashboard in place, I've taken an important step toward proactive monitoring of Mythic C2 activity. These tools will enhance the detection and visibility of malicious actions within the environment. Next, I'll refine my detection capabilities by expanding these alerts and dashboards to cover more complex threats.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=WcVuUamMApA&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=49)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day22 