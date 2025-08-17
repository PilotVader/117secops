---
title: "Part 3: Generating and Ingesting Telemetry"
description: "Setting up telemetry generation and ingestion in our SOC environment using Mimikatz and configuring Wazuh for detection"
date: "2025-03-21"
author: "Samson Otori"
category: "blue"
tags: ["Blue Team", "SOC", "Automation", "SIEM", "Telemetry"]
image: "/images/projects/project 2.png"
images: [
  { "src": "/images/projects/soc-automation/part3/1 Editing ossec config file to ingest sysmon logs.png", "alt": "Editing Wazuh ossec.conf File to Ingest Sysmon Logs" },
  { "src": "/images/projects/soc-automation/part3/2 Sysmon service running on windows for telemetary generation.png", "alt": "Sysmon Service Running on Windows for Telemetry Generation" },
  { "src": "/images/projects/soc-automation/part3/3 Mimikatz downloaded and running on client pc.png", "alt": "Mimikatz Downloaded and Running on Client PC" },
  { "src": "/images/projects/soc-automation/part3/4 Creating index for archives to enable us search all ingested logs.png", "alt": "Creating Index for Archives to Search All Ingested Logs" },
  { "src": "/images/projects/soc-automation/part3/5 Configuring the wazuh ossec.conf file to take all logs of everything happening.png", "alt": "Configuring Wazuh to Log All Events" },
  { "src": "/images/projects/soc-automation/part3/6 changing filebeat config in order for wazuh to ingest logs into archives.png", "alt": "Modifying Filebeat Configuration for Log Archiving" },
  { "src": "/images/projects/soc-automation/part3/7 Mimikatz events logs now ingested into archives and visible on wazuh dashboard.png", "alt": "Mimikatz Event Logs Visible in Wazuh Dashboard" },
  { "src": "/images/projects/soc-automation/part3/8 Rule creation through sysmon targeting event id 1.png", "alt": "Creating Sysmon Rule for Event ID 1" },
  { "src": "/images/projects/soc-automation/part3/9 Crafting rule to detect mimikatz (RULE CRAFTED).png", "alt": "Crafting Detection Rule for Mimikatz" },
  { "src": "/images/projects/soc-automation/part3/10 Alert generated on wazuh on mimikatz usage.png", "alt": "Wazuh Alert Generated for Mimikatz Usage" }
]
series:
  name: "Project 2: SOC Automation Project"
  part: 3
  totalParts: 3
---

# Part 3: Generating and Ingesting Telemetry

## Introduction

In this third part of the MYDFIR SOC Automation Project home lab series, I dive into the critical process of generating telemetry from a Windows 10 machine and ensuring it is correctly ingested into Wazuh. By the end of this session, I would have successfully configured my system to log events, including activity from Mimikatz, and triggered a custom alert. This hands-on process not only enhances my understanding of SIEM operations but also strengthens my ability to detect and analyze security incidents effectively.

## Configuring Wazuh to Ingest Sysmon Logs

To begin, I access the Wazuh configuration settings on my Windows 10 machine. When Wazuh is installed, its configuration files are located under Program Files (x86), specifically within the ek-agent folder. The key file I need to modify is ossec.conf. This file governs how logs are processed and which events are included or excluded from analysis. By default, certain event IDs are excluded using the != operator. However, for my purpose, I need to monitor processes related to Mimikatz, which requires Sysmon to be installed or Windows Security Event ID 4688 to be enabled. Since Sysmon was installed in part two of this series, I opt for that method.

Before making changes, I first create a backup of ossec.conf to safeguard against errors. This allows me to revert back if needed. I then modify the configuration to ingest Sysmon logs by adding a new entry under the localfile section. To locate the correct Sysmon channel name, I open the Windows Event Viewer, navigate to Applications and Services > Microsoft > Windows > Sysmon, and retrieve the operational log name from the properties section. This name is then inserted into my ossec.conf file in place of the existing application log configuration.

## Adjusting Log Categories and Restarting Services

Next, I remove other log categories such as Application, Security, and System, ensuring that only Sysmon logs are forwarded to the Wazuh manager. Once the changes are saved, administrative privileges are required to replace the existing configuration file. After this, I restart the Wazuh service, as any configuration changes must be followed by a service restart to take effect.

## Testing Telemetry with Mimikatz

With the updated configuration in place, I verify the ingestion of Sysmon logs in the Wazuh dashboard. Searching for "Sysmon" in the Alerts index may take some time before logs appear. To test this setup, I download and execute Mimikatz. Since Windows Defender would block this file, I must first exclude the Downloads folder from virus scanning. This is done through Windows Security settings by adding an exclusion for the Downloads directory. Also, Google Chrome may prevent the download, so I disable Safe Browsing under Privacy and Security settings in Chrome before proceeding.

Once Mimikatz is downloaded and extracted, I run it via an administrative PowerShell session and monitor Wazuh for related alerts. If no alerts appear, it is likely because Wazuh only logs events when a predefined rule is triggered. To address this, I modify the ossec.conf file on the Wazuh manager to log all events by default. This is done by enabling the logall and logall_json options in the configuration file. After saving these changes, I restart the Wazuh manager service.

## Enhancing Log Archiving and Indexing

To ensure that all logs are archived and ingested into Wazuh, I also update Filebeat's configuration. This involves navigating to the Filebeat YAML configuration file and changing the archives_enabled setting from false to true. As always, after modifying configurations, I restart the Filebeat service to apply the changes.

Once the configurations are updated, I proceed to create a new index in the Wazuh dashboard for archived logs. This is done through the Stack Management section, where I define a new index pattern named wazuh-archives-*. After setting the timestamp field, I finalize the index creation. Now, when navigating to the Discover section of Wazuh, I can select my newly created index and search for logs related to Mimikatz.

## Troubleshooting Log Ingestion Issues

If events are still not visible, I perform troubleshooting by inspecting the archived log files in the Wazuh manager's CLI. By navigating to /var/ossec/logs/archives/, I list the available log files and use cat and grep commands to search for Mimikatz activity. If the logs are present in the archive but not appearing in the dashboard, it indicates a delay in ingestion, which resolves over time.

## Conclusion

This session underscores the importance of proper log configuration and SIEM tuning. By ensuring that all relevant events are captured and making necessary adjustments, I enhance my detection capabilities. With my telemetry now successfully feeding into Wazuh, I am well-prepared for the final part of the series, where I will further refine my detection rules and automation workflows.

Stay Tuned.

Here's the link to follow along: [SOC Automation Project](https://www.youtube.com/watch?v=amTtlN3uvFU&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=9)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIR #HandsOnExperience #SecurityMonitoring #IncidentResponse 