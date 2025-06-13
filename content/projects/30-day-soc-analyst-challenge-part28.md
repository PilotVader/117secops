---
title: "Part 28: Investigating the Mythic C2 Framework"
description: "Day 28 of the 30-Day MYDFIR SOC Analyst Challenge: Analyzing and investigating Command and Control (C2) framework activities using network telemetry and process logs."
date: "2024-03-23"
author: "Samson Otori"
tags:
  - "C2"
  - "Mythic"
  - "SOC"
  - "Security"
  - "Investigation"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-28.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 28" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 28
  totalParts: 30
---

## Day 28 of the 30-Day MyDFIR SOC Analyst Challenge: Investigating the Mythic C2 Framework

## Overview

On Day 28 of the 30-Day MyDFIR SOC Analyst Challenge, I shifted my focus to the Mythic Command and Control (C2) framework. Attackers widely use this framework to maintain control over compromised systems, allowing them to execute commands, steal data, and conduct other malicious activities without detection. My task was to investigate how the Mythic agent svchost_pilotvader.exe operated and how its communication could be detected.

## Tracing the Mythic C2 Agent

My investigation's first step was locating the Mythic C2 agent on one of the compromised systems. Armed with the knowledge of the agent's name, I used the Kibana Discover tool to search through the logs, narrowing the time range to the past 30 days. This allowed me to pinpoint 25 distinct events associated with the agent. Sorting these events chronologically, I was able to reconstruct the timeline of the agent's activity, gaining critical insight into how it interacted with the system over time.

## Identifying C2 Traffic Through Network Telemetry

In cases where the agent's name isn't known, identifying suspicious traffic can be challenging. Network telemetry analysis plays a critical role in detecting C2 activity. I began by analyzing network logs to identify the "top talkers"—the machines that generated the most traffic. Since Mythic, like most C2 frameworks, relies on consistent communication between the infected host and the attacker's server, unusual traffic patterns often stand out.

To refine my detection, I utilized RITA (Real Intelligence Threat Analytics), a tool designed to detect beaconing behavior in C2 traffic. Beaconing occurs when an infected machine regularly checks in with a C2 server, and identifying these intervals allowed me to isolate Mythic's communication patterns. The detection of this regular network activity provided strong evidence of the C2 framework's presence.

## Investigating Process Creation Logs

Beyond network traffic, process creation analysis was essential for tracing the agent's activity. By examining these logs, I could see the exact processes initiated by the Mythic agent and track the attacker's movement within the system. These logs offer a detailed view of how the agent behaves, from its initial execution to spawning other processes critical to maintaining control over the system.

## Conclusion

Day 28's deep dive into the Mythic C2 framework offered valuable lessons in tracking adversary behavior. By leveraging network telemetry, beaconing detection, and process creation logs, I was able to uncover the activities of the Mythic agent and better understand its communication patterns. As the challenge nears its end, these investigations continue to hone my skills in threat detection and incident response.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=b11TuDx_CjU&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=55)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day28 