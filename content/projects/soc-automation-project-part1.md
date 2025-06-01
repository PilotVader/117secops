---
title: "Infrastructure Setup"
description: "Setting up the core infrastructure components for our SOC automation environment including Wazuh, Windows client, and TheHive"
date: "2024-03-20"
author: "Samson Otori"
category: "blue"
tags: ["Blue Team", "SOC", "Automation", "SIEM", "Infrastructure"]
image: "/images/projects/soc-automation/soc-automation-project.png"
images: [
  { "src": "/images/projects/soc-automation/part2/1 Windows 10 virtual machine properties.png", "alt": "Windows 10 Virtual Machine Setup Properties" },
  { "src": "/images/projects/soc-automation/part2/2 Ubuntu OS Virtual Machine properties.png", "alt": "Ubuntu OS Virtual Machine Properties" },
  { "src": "/images/projects/soc-automation/part2/3 Wazuh Installation.png", "alt": "Wazuh Installation Process" },
  { "src": "/images/projects/soc-automation/part2/4 Deploying New Agent To Wazuh MAIN.png", "alt": "Deploying New Agent to Wazuh" },
  { "src": "/images/projects/soc-automation/part2/5 Generating Key For Newly Created Agent.png", "alt": "Generating Key for New Wazuh Agent" },
  { "src": "/images/projects/soc-automation/part2/6 Adding Agent Key to my wazuh manager on windows machine MAIN.png", "alt": "Adding Agent Key to Wazuh Manager on Windows" },
  { "src": "/images/projects/soc-automation/part2/7 Wazuh Login Page.png", "alt": "Wazuh Dashboard Login Page" },
  { "src": "/images/projects/soc-automation/part2/8 The Hive Installation in Parrot.png", "alt": "TheHive Installation in Parrot OS" },
  { "src": "/images/projects/soc-automation/part2/9 Cassandra Installation in Parrot.png", "alt": "Cassandra Installation in Parrot OS" },
  { "src": "/images/projects/soc-automation/part2/10 TheHive Configuration.png", "alt": "TheHive Configuration Setup" },
  { "src": "/images/projects/soc-automation/part2/11 Changing RPC Address in Cassandra.png", "alt": "Configuring RPC Address in Cassandra" },
  { "src": "/images/projects/soc-automation/part2/12 Changing Listening address in Cassandra.png", "alt": "Setting Cassandra Listening Address" },
  { "src": "/images/projects/soc-automation/part2/13 Thehive service started.png", "alt": "TheHive Service Successfully Started" },
  { "src": "/images/projects/soc-automation/part2/14 TheHive Loginpage.png", "alt": "TheHive Login Page" },
  { "src": "/images/projects/soc-automation/part2/15 Wazuh agent dashboard with Active agent MAIN.png", "alt": "Wazuh Agent Dashboard Showing Active Agent" },
  { "src": "/images/projects/soc-automation/part2/16 Sample file creation for FILE MONITORING.png", "alt": "Testing File Monitoring with Sample File Creation" },
  { "src": "/images/projects/soc-automation/part2/17 Alert for file added to endpoint on wazuh.png", "alt": "Wazuh Alert for File Addition on Endpoint" }
]
series:
  name: "Project 2: SOC Automation Project"
  part: 2
  totalParts: 3
---

# Part 2: Infrastructure Setup

My focus has shifted to establishing the core infrastructure and generating telemetry data for analysis, a critical foundation for any Security Operations Center (SOC). This phase involves setting up essential components including a Windows client, Wazuh server, and TheHive for comprehensive security monitoring and incident response.

## Setting Up the Windows Environment

I began the infrastructure deployment with a Windows 10 virtual machine, ensuring I had a proper endpoint for monitoring. Using VirtualBox to create the VM, I allocated appropriate resources and installed Windows 10 with the necessary configurations to support my security tools.

Sysmon, a critical component for endpoint monitoring, was installed using PowerShell with administrative privileges. This installation required careful attention to the placement of the configuration file and proper execution of the installation commands on Windows PowerShell. After installation, I verified Sysmon's presence through the Services console and Event Viewer, confirming it was actively monitoring system events.

## Deploying Wazuh Server

With the endpoint ready, I moved to setting up the Wazuh server, my primary security monitoring platform. On the same VirtualBox, I deployed the Ubuntu 22.04 virtual machine. I also configured VirtualBox's network settings and set it to a bridged adapter to allow communication with my endpoint (Windows 10 OS).

The Wazuh installation process involved running their official installation script, which automatically configured the basic components. These included the indexer, server, and dashboard components, which form the core of Wazuh's security monitoring capabilities. The installation provided secure credentials for accessing the dashboard, which I carefully documented for future use.

Wazuh serves as the log manager and intrusion detection system. The setup begins by accessing the Wazuh dashboard and retrieving the necessary credentials for configuration. To integrate a Windows client, the agent configuration command is generated from the Wazuh dashboard, tailored to the server's IP. This command is then executed on the Windows machine, establishing a connection with the Wazuh server. Although this method didn't work for me after so many trials, I eventually had to use another method where I had to generate a key through the Wazuh agent manager on my Ubuntu terminal by running `/var/ossec/bin/manage_agents`. I then used the agent manager desktop interface on my Windows 10 to register the windows as an endpoint using the key generated. The client's status was then monitored and was active, and I could confirm telemetry was being successfully transmitted.

## Configuring TheHive with Cassandra

TheHive's efficiency depends heavily on its backend database, Cassandra. The configuration starts with modifying the Cassandra settings to align with the lab setup. This includes navigating to the configuration file and updating parameters like the cluster name and listen address to ensure proper connectivity. Restarting the Cassandra service and confirming its active status are crucial steps to ensure everything runs smoothly.

To integrate theHive with Cassandra, adjustments to the application settings file are required. This involves specifying the cluster name and database connection details. To avoid operational issues, it is vital to ensure that TheHive has the correct permissions to access necessary directories. Once configured, TheHive services are started, and the application becomes accessible through its designated URL.

For this section, I used a separate machine running Parrot operating system.

## Establishing Connectivity

After configuring all components, and confirming my endpoint status on my Wazuh dashboard as "Active", I focused on establishing proper connectivity between systems. The Windows agent was deployed to my Wazuh server, creating a secure communication channel for transmitting security events. Wazuh's role in the lab setup revolves around monitoring and alert generation. By installing Wazuh and connecting it to TheHive, alerts become actionable incidents for investigation. This is what I'll explore in further episodes of this post.

I decided to test telemetry ingestion on my Wazuh server by creating a file document on my endpoint to see if I could see any alert related to the action, and it was a success.

## Conclusion

Through these exercises, I've established a robust foundation for security monitoring and incident response. In the next chapter of this series, I will be going more in-depth with telemetry generation using Mimikatz, which is a powerful tool used for extracting credentials from Windows systems, I will learn how to send telemetry containing mimikatz, configure Wazuh to log all telemetry and craft custom rule to detect mimikatz usage. In further chapter, I will also explore the use of TheHive which I've just set up in the chapter.

Stay tuned.

#CyberSecurity #SOCAnalyst #MYDFIR #HandsOnExperience #SecurityMonitoring #IncidentResponse 