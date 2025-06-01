---
title: "SOC Automation Project"
client: "Personal Project"
description: "Building a home lab SOC environment for hands-on experience with SOAR tools like Wazuh, The Hive, and Shuffle."
date: "2025-05-12"
author: "Samson Otori"
challenge: "Gaining practical experience in SOC tasks like alert management, response actions, and data enrichment using a functional SOAR setup."
solution: "Building a home lab environment from scratch, diagramming the architecture, and planning the deployment of Wazuh, The Hive, and Shuffle for event logging, alert triggering/enrichment, and case management."
results: [
  "Planned the SOC lab infrastructure",
  "Created a logical flow diagram using Draw.io",
  "Outlined the main workflow from event generation to case management",
  "Mapped alert flow using color-coded connections"
]
image: "/images/projects/soc-automation/soc-automation-project.png"
technologies: ["Wazuh", "The Hive", "Shuffle", "Windows 10", "Draw.io"]
category: "blue"
tags: ["Blue Team", "Infrastructure", "SIEM", "SOAR"]
images: [
  { "src": "/images/projects/soc-automation/detailed-workflow.png", "alt": "Detailed SOC Automation Workflow showing connections between Wazuh, Shuffle, TheHive and other components" },
  { "src": "/images/projects/soc-automation/simple-workflow.png", "alt": "Simplified SOC Automation Workflow diagram showing the basic data flow between components" }
]
series:
  name: "Project 2: SOC Automation Project"
  part: 1
  totalParts: 3
---

# Part 1: Planning the Infrastructure

As I continue my journey into cybersecurity, I've embarked on a SOC Automation Project aimed at building a home lab environment from scratch. The ultimate goal is to create a fully functional Security Orchestration, Automation, and Response (SOAR) setup, with tools like Wazuh, The Hive, and Shuffle for case management and automation. This project will enable hands-on experience critical for Security Operations Center (SOC) tasks, providing a foundation for alert management, response actions, and data enrichment.

## Diagramming the Lab Environment

This week, I began by visualizing the lab's architecture, which will guide deploying various SOC components. Using Draw.io, I created a logical flow diagram, depicting the interaction of key elements like a Windows 10 client with Wazuh and SOAR tools (The Hive and Shuffle) across different network layers. This visual roadmap is crucial, as many cybersecurity interviews require candidates to whiteboard a secure lab setup—a skill that this project will reinforce.

## The main workflow consists of:

1. **Event Generation**: The Windows 10 client will send event logs to Wazuh, acting as the lab's SIEM system. This data flow simulates the information-sharing pipeline from the endpoint to SIEM.
2. **Alert Triggering and Enrichment**: Wazuh will analyze these events and generate alerts, which are then forwarded to Shuffle for enrichment with open-source intelligence (OSINT).
3. **Case Management**: Finally, the enriched data and actionable alerts will be logged in The Hive, streamlining incident tracking and case management.

## Connecting the Dots

To logically map how alerts will flow, color-coded connections will be implemented in the diagram to track data from generation, through analysis, to final case management. For example, alerts from Wazuh to Shuffle are labeled in blue, indicating a "send alert" action, while OSINT data flows in green to enrich the incident context. These connections provide a cohesive view of how data travels within the SOC environment, aligning the diagram to real-world incident workflows.

## Future Plans

In my upcoming posts, I'll move into deploying these tools on virtual machines, configuring Wazuh and The Hive, and connecting them with my local workstation. This setup will allow me to simulate common security alerts, test case management processes, and refine my incident response workflows.

Stay tuned as I document each stage, including implementation challenges, configurations, and SOC analysis techniques.

#MYDFIR #CyberSecurity #SOCAnalyst #HomeLab #Automation #HandsOnExperience
\`