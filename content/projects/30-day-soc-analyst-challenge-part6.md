---
title: "Part 6: Centralized Management with Fleet Server and Elastic Agent"
description: "Day 6 of the 30-Day MYDFIR SOC Analyst Challenge: Exploring centralized management solutions for security agents across multiple endpoints."
date: "2024-03-23"
author: "Samson Otori"
tags:
  - "Fleet Server"
  - "Elastic Agent"
  - "Centralized Management"
  - "SOC"
  - "Security Monitoring"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-6.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 6" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 6
  totalParts: 30
---

## Day 6 of the 30-Day MYDFIR SOC Analyst Challenge: Centralized Management with Fleet Server and Elastic Agent

On Day 6 of the 30-Day My Def for SOC Analyst Challenge, I explored the importance of centralized management for security agents across multiple endpoints. Imagine the hassle of manually configuring 100 machines. This is where Fleet Server and Elastic Agent come into play, making life much easier for a SOC analyst.

## Understanding Elastic Agent

The Elastic Agent is a key component in my setup, allowing me to monitor logs, metrics, and various types of data from different endpoints. It simplifies what used to be a complex process by acting as a single unified agent that can manage multiple data types. With Elastic Agent, I no longer have to deploy numerous Beats (specialized agents) on a single host. Instead, the Elastic Agent can handle it all, whether it's logs from applications, system metrics, or even security-related data.

This agent can be installed in two modes: Standalone or Fleet-managed. For this challenge, I'm focusing on Fleet-managed mode because it allows centralized management. This will enable me to push updates, manage configurations, and control all my agents from one place.

## Fleet Server: Centralized Control

The Fleet Server acts as the central hub where I manage all the Elastic Agents. This is crucial because it lets me update policies, add integrations, and adjust configurations from one place. Without it, I'd be stuck making changes manually on each endpoint, which is impractical and error-prone.

For instance, if I want to configure my agents to collect PowerShell logs, I can push that update through the Fleet Server instead of manually touching each machine. Similarly, if I want to change where my logs are being sent—whether to ElasticSearch or Logstash—I can do that centrally through Fleet. This flexibility is invaluable for managing a large environment.

## Elastic Agent vs. Beats

Beats are specialized agents that collect specific data types, like Filebeat for log files or Metricbeat for metrics. While Beats are great for specific tasks, the Elastic Agent consolidates all these capabilities into a single package, making it more versatile and easier to manage.

Choosing between Beats and Elastic Agent depends on the specific needs of my environment. However, Elastic Agent often provides a more streamlined approach, especially when managing multiple data types across numerous endpoints.

## Conclusion

Concluding Day 6, I had a solid understanding of how to use Fleet Server and Elastic Agent to simplify and centralize my SOC environment's management. In the next session, I'll dive deeper into setting up Elastic Agent and configuring Fleet Server, ensuring all my endpoints are ready for centralized management.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=0WklP6ZsP1g&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=33)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)* 