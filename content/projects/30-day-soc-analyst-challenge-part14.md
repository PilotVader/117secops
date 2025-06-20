---
title: "Part 14: Creating an SSH Brute Force Alert and Dashboard"
description: "Day 14 of the 30-Day MYDFIR SOC Analyst Challenge: Setting up real-time alerts and dashboards to monitor and visualize SSH brute-force attacks."
date: "2024-11-14"
author: "Samson Otori"
tags:
  - "SSH"
  - "Alerts"
  - "Dashboards"
  - "SOC"
  - "Security Monitoring"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-14.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 14" },
  { "src": "/images/projects/30-day-challenge/Alert-creation-and-dashboard-on-Kibana-day-14.png", "alt": "Alert Creation and Dashboard Configuration in Kibana" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 14
  totalParts: 30
---

## Day 14 of the 30-Day MYDFIR SOC Analyst Challenge: Creating an SSH Brute Force Alert and Dashboard

## Overview

Today, I focused on setting up real-time alerts and dashboards to monitor brute-force activity from unauthorized sources. This exercise taught me how to visualize, monitor, and respond to SSH brute-force attacks more efficiently.

## Querying SSH Logs

The first task involved querying logs from my SSH server, which had already been ingested into ElasticSearch. By accessing the Discover tab, I could filter out logs specific to my SSH server. I found it crucial to focus on specific fields like `system.auth.ssh.event` and `user.name` to track failed authentication attempts. The process began by filtering for failed SSH authentication attempts. This was accomplished by searching for logs where the `system.auth.ssh.event` field indicated failed attempts, giving me an initial view of how many attempts were occurring and from where.

## Building the Brute Force Alert

Next, I focused on creating an alert for SSH brute-force attempts. The goal was to automate the detection process and trigger an alert based on predefined thresholds. Using ElasticSearch's alert feature, I created a search-based threshold rule. My rule was set to trigger if more than five failed login attempts occurred within five minutes, a common indicator of brute-force activity.

I also configured how frequently the rule should check for new logs. To ensure near real-time monitoring, I set it to check every minute. While this was a basic alert configuration, it showcased the power of automating log analysis in detecting potential threats. Though this particular rule may not be perfect, it sets a solid foundation for building more sophisticated alerts later.

## Visualizing with Dashboards

To complement the alert system, I created a visual dashboard to track the geographical origins of these brute-force attempts. By navigating to the Maps section in ElasticSearch, I built a dashboard that plotted failed authentication attempts based on their source IP geolocation. This allowed me to see patterns of attack, such as which regions were targeting my SSH server the most.

For example, I noticed most failed attempts came from countries like North Korea and China. Using the choropleth layer in the map, I visualized these locations, providing an easy-to-understand view of attack origins.

## Conclusion

By the end of Day 14, I had successfully created both an alert system and a dashboard for monitoring SSH brute-force attacks. The combination of real-time alerts and visualization tools has significantly improved my ability to detect and respond to these types of attacks quickly.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=AdUMhT1l1eY&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=41)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day14 