---
title: "Part 4: Setting Up Kibana"
description: "Day 4 of the 30-Day MYDFIR SOC Analyst Challenge: Setting up Kibana for powerful data visualization and analysis."
date: "2024-03-23"
author: "Samson Otori"
tags:
  - "Kibana"
  - "Visualization"
  - "Elastic Stack"
  - "SOC"
  - "Security Analysis"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/Kibana-Interface.png", "alt": "Kibana Interface" },
  { "src": "/images/projects/30-day-challenge/30-Days-Day-4.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 4" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 4
  totalParts: 30
---

# Day 4 of the 30-Day MYDFIR SOC Analyst Challenge: Setting Up Kibana

## Overview

Today's focus was on setting up Kibana, a powerful data visualization tool. So I started by downloading Kibana from Elastic's website and installing it on my server. Once installed, I dove into configuring Kibana to ensure it was accessible from any device, not just the local host. This required updating the kibana.yml configuration file and replacing the default localhost setting with my server's public IP.

## Service Configuration

After configuration, I needed to ensure Kibana would start automatically whenever my server rebooted. This involved enabling and starting the Kibana service. Once everything was running, I verified the service status to confirm that it was active.

## Secure Connection to Elasticsearch

Next, I generated an Elasticsearch enrollment token, a crucial step for securely connecting Kibana to Elasticsearch. This token was stored safely for later use.

## Troubleshooting Access

While attempting to access Kibana through my browser, I encountered a connection timeout error. This led me to adjust my firewall settings both on Vultr, my cloud provider and on the Ubuntu server itself. Once these adjustments were made, I successfully accessed the Kibana web interface.

## Security Settings and Final Steps

Inside Kibana, I proceeded to configure security settings, adding encryption keys for saved objects to ensure data integrity and security. With everything set up and running smoothly, Kibana was fully operational, marking a successful completion of Day 4.

## Conclusion

This day was essential in setting up the foundation for future data analysis. Kibana is the gateway to visualizing and interacting with data stored in Elasticsearch, making it an indispensable tool for any SOC analyst. Next, I'll be focusing on setting up a Windows server to act as a target machine for further exploration.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=nBlCuLMq-zA&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=32)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day4 