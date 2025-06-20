---
title: "Part 17: Building a Dashboard for RDP And SSH Activity"
description: "Day 17 of the 30-Day MYDFIR SOC Analyst Challenge: Creating comprehensive dashboards to monitor and analyze RDP and SSH authentication attempts."
date: "2024-11-17"
author: "Samson Otori"
tags:
  - "RDP"
  - "SSH"
  - "Dashboards"
  - "SOC"
  - "Security Monitoring"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-17.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 17" },
  { "src": "/images/projects/30-day-challenge/Dashboard-1.png", "alt": "RDP Authentication Dashboard Overview" },
  { "src": "/images/projects/30-day-challenge/Dashboard-2.png", "alt": "Detailed Authentication Analysis Dashboard" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 17
  totalParts: 30
---

## Day 17 of the 30-Day MyDFIR SOC Analyst Challenge: Building a Dashboard for RDP And SSH Activity

## Overview

Today I focused on creating a dashboard to monitor Remote Desktop Protocol (RDP) and Secure Shell (SSH) activity. This is critical for understanding authentication attempts on the Windows Server set up earlier in the challenge. Here's how I did it.

## Querying for Failed RDP Authentication Attempts

The first step was to log into the Elastic web GUI. I navigated to the "Maps" section by clicking the hamburger icon on the left sidebar. Since I needed to query for failed RDP attempts, I returned to the "Discover" tab to check a previous query. Using the search for failed authentication attempts, I retrieved a query using the event code 4625, which represents failed logon events in Windows.

With the query set, I added a new layer to my map. I chose "world countries" as the boundary and the country ISO code as the join field, allowing me to see where the failed RDP attempts were coming from. The results were striking, over 131,276 failed attempts from Ukraine alone!

## Querying for Successful RDP Authentication Attempts

Next, I needed to monitor successful RDP logins. I used the event code 4624, which represents successful logons. However, to specifically track RDP logins, I focused on logon types 10 and 7, which are associated with RDP connections. I updated the query to look for successful authentications of these types.

After running the query in the "Discover" tab, I saved it and moved it to the dashboard. I duplicated the earlier failed authentication dashboard and updated the query with my new one for successful RDP logins. Once saved, the dashboard displayed successful RDP connections, including their geographical origin — in my case, the United Kingdom.

## Adding a Table for Easier Analysis

To enhance my dashboard, I added a table showing the username, source IP, and country for each failed and successful RDP attempt. In the "Discover" tab, I created a new search query for failed attempts using event code 4625 and then did the same for successful attempts.

I added these saved searches to the dashboard and arranged them as tables beneath the maps. This gave me a clearer view of which usernames were being targeted and from which countries. Finally, I sorted the data to display the top values, showing the most frequent IP addresses and usernames involved in failed and successful logins.

## Conclusion

By setting up dashboards for both failed and successful RDP and SSH attempts, I can now better monitor authentication activity on my Windows Server. With this visibility, I am equipped to detect potential threats, particularly from brute force attacks on RDP and SSH. Next, I'll dive into command and control (C2) techniques using Mythic's framework.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=pAfIi6Z6a2g&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=44)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day17 