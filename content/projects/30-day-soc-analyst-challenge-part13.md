---
title: "Part 13: Installing Elastic Agent On Ubuntu"
description: "Day 13 of the 30-Day MYDFIR SOC Analyst Challenge: Setting up Elastic Agent for centralized log collection and analysis from our SSH server."
date: "2024-11-13"
author: "Samson Otori"
tags:
  - "Elastic Agent"
  - "Log Collection"
  - "Security Monitoring"
  - "SOC"
  - "Ubuntu"
image: "/images/projects/Mydfir 30 day challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-13.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 13" },
  { "src": "/images/projects/30-day-challenge/Image-for-day-13-elastic-agent-install-for-ubuntu.png", "alt": "Elastic Agent Installation Process for Ubuntu" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 13
  totalParts: 30
---

## Day 13 of the 30-Day MYDFIR SOC Analyst Challenge: Installing Elastic Agent On Ubuntu

## Overview

The focus for today was on installing the Elastic agent on the SSH server created on Day 12, which enables us to ingest logs from the server into our Elasticsearch instance, allowing for centralized log querying and analysis.

## Creating an Agent Policy in Elasticsearch

I began by logging into the Elasticsearch web GUI and navigating to Fleet under the Management section. Here, I created a new agent policy named "my-dfir-linux-policy". This policy is crucial as it defines what logs the Elastic agent will collect and forward to Elasticsearch.

Within the policy, I selected the system-3 integration, which is designed to collect system logs from `/var/log/auth.log`.

## Installing the Elastic Agent

With the policy in place, I proceeded to add a new agent. I selected the newly created "my-dfir-linux-policy" and chose the Linux operating system. Elasticsearch provided a command to install the agent, which I copied and pasted into my SSH session on the Linux server.

Initially, the installation failed due to certificate issues, as we're using a self-signed certificate. To resolve this, I added the `--insecure` flag to the installation command, allowing it to bypass certificate validation.

After confirming the installation, the Elastic agent was successfully installed and enrolled in our Fleet.

## Verifying Agent Installation and Data Ingestion

Returning to the Elasticsearch GUI, I confirmed that the agent enrollment was successful and that incoming data was being received. To verify this further, I used the Discover page in Elasticsearch to query the incoming logs.

I filtered the events by the agent name "my-dfir-linux-pilotvader" to focus on logs from our newly connected SSH server. This immediately showed me that log ingestion was working correctly.

## Analyzing Authentication Failures

I investigated authentication failures to demonstrate the power of centralized log analysis. From our previous day's exploration, I knew that many failed login attempts were coming from a specific IP address (110.44.50.140). Using Elasticsearch's query capabilities, I searched for events with "authentication failure" from this IP address. This returned 6744 events, which I could easily view and analyze within the Elasticsearch interface.

To improve readability, I added the "message" field to the table view in Elasticsearch. This allowed me to quickly scan the authentication failure messages, providing a clear view of the attempted breaches.

## Conclusion

In the next part of this challenge, we'll explore creating alerts for brute force activities and develop dashboards to visualize attack origins. These steps will further enhance our ability to detect and respond to potential security threats efficiently.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=QHJr2-Kav4k&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=40)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day13 