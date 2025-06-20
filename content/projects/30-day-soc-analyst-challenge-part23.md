---
title: "Part 23: Understanding and Implementing a Ticketing System"
description: "Day 23 of the 30-Day MYDFIR SOC Analyst Challenge: Exploring ticketing systems and their crucial role in tracking security alerts and managing SOC operations."
date: "2024-11-23"
author: "Samson Otori"
tags:
  - "Ticketing"
  - "OS Ticket"
  - "SOC"
  - "Security"
  - "Incident Management"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-23.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 23" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 23
  totalParts: 30
---

## Day 23 of the 30-Day MyDFIR SOC Analyst Challenge: Understanding and Implementing a Ticketing System

## Overview

On Day 23 of the 30-Day MyDFIR SOC Analyst Challenge, I explored the significance of tracking security alerts and how a ticketing system plays a crucial role. Tracking an alert in any security tool is vital for identifying misconfigurations, and potential attacks, or understanding how it was handled. This is where a ticketing system comes in.

## What Is a Ticketing System?

A ticketing system is a tool designed to create and manage tickets for various tasks or incidents. These tickets can represent anything from security alerts to troubleshooting requests or customer complaints. The goal of a ticketing system is to provide an organized method to track issues, offer an audit trail, and ensure accountability. In the context of cybersecurity, having a ticketing system satisfies one of the three As of security: Authentication, Authorization, and Accounting (AAA).

Popular ticketing systems used in real-world environments include:
- Jira
- ServiceNow
- Freshdesk
- Zendesk

However, these are commercial products, and today, I'll introduce you to an open-source alternative that you can set up for free: OS Ticket.

## Introducing OS Ticket

OS Ticket, developed by Enhancesoft, is an open-source ticketing system that offers a wide range of features to fulfill core responsibilities found in commercial products. Some of the features include:

- Customizable fields
- Ticket filters for routing
- Assigning and transferring tickets
- Setting up a Service Level Agreement (SLA)

By integrating OS Ticket into your SOC workflow, you can begin mimicking the operations of a small SOC, gaining practical experience as you go.

You can choose to either self-host the OS Ticket (on-premise) or have the service managed for you, but the self-hosted option is completely free. While the free version only supports email integrations, this is sufficient for this challenge.

## Getting Started with OS Ticket

In the next step of this challenge, I will be going through setting up and configuring OS Ticket, allowing us to integrate it into our SOC analyst workflow. By doing so, I'll gain firsthand experience in:

- Tracking incidents
- Improving my skills in audit trails
- Understanding how ticketing systems contribute to security operations

## Conclusion

With OS Ticket, you now have a powerful tool to manage alerts, track tasks, and enhance the efficiency of your SOC environment. As we move forward, I will continue to explore how to leverage this system in practical scenarios.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=kvTCA4FQET0&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=50)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day23 