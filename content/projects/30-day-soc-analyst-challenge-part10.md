---
title: "Part 10: Ingesting Sysmon and Microsoft Defender Logs"
description: "Day 10 of the 30-Day MYDFIR SOC Analyst Challenge: Setting up log ingestion from Windows Server to Elasticsearch for enhanced security monitoring."
date: "2024-11-10"
author: "Samson Otori"
tags:
  - "Sysmon"
  - "Windows Defender"
  - "Log Ingestion"
  - "SOC"
  - "Security Monitoring"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-10.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 10" },
  { "src": "/images/projects/30-day-challenge/Elasticsearch-Ingest-Data-Image.png", "alt": "Elasticsearch Data Ingestion Process" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 10
  totalParts: 30
---

## Day 10 of the 30-Day MYDFIR SOC Analyst Challenge: Ingesting Sysmon and Microsoft Defender Logs

On Day 10 of the 30-Day MYDFIR SOC Analyst Challenge, I focused on ingesting both Sysmon and Microsoft Defender event logs from the Windows Server into my Elasticsearch instance. This step is crucial for centralizing log data and enhancing my ability to detect and analyze potential security threats.

## Setting Up Custom Windows Event Log Integrations

I began by logging into the Elasticsearch instance and navigating to the Integrations page. I searched for and selected the "Custom Windows Event log" integration, which allows ingesting events from any Windows Event log channel.

For Sysmon, I created an integration named "my-dfir-win-sysmon" with the channel name "Microsoft-Windows-Sysmon/Operational". For Windows Defender, I set up another integration named "my-dfir-win-defender" with the channel "Microsoft-Windows-Windows Defender/Operational". In the Defender integration, I specified event IDs 1116, 1117, and 5001 to focus on malware detection and real-time protection status.

## Troubleshooting Connectivity Issues

Initially, no logs appeared in Elasticsearch. Upon investigating, I discovered that the Elastic agent on the Windows Server couldn't communicate with the Elasticsearch instance. The solution was to add a firewall rule allowing incoming connections to port 9200 on the Elasticsearch server. After implementing this change and restarting the Elastic agent service, logs began flowing into Elasticsearch.

## Verifying Log Ingestion

To confirm successful log ingestion, I used Elasticsearch's Discover page. I searched for Sysmon events with the query "winlog.event_id: 1" and for Windows Defender events with "winlog.event_id: 5001". Both queries returned results, confirming that the logs were being correctly ingested and indexed.

## Conclusion

With Sysmon and Microsoft Defender logs now being successfully ingested into Elasticsearch, I have significantly improved my ability to monitor and analyze security events on my Windows Server. This centralized log collection will be instrumental in detecting and investigating potential security incidents in the future.

In the next part of this challenge, I'll explore how to effectively query and analyze these logs within Elasticsearch, further enhancing my SOC analysis capabilities.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=eOie0SDMuGA&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=37)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)* 

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day10

