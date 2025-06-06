---
title: "Part 3: Generating and Ingesting Telemetry"
description: "Setting up telemetry generation and ingestion in our SOC environment using Mimikatz and configuring Wazuh for detection"
date: "2024-03-21"
author: "Samson Otori"
category: "blue"
tags: ["Blue Team", "SOC", "Automation", "SIEM", "Telemetry"]
image: "/images/projects/soc-automation/soc-automation-project.png"
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

In this third part of the MYDFIR SOC Automation Project home lab series, we dive into the critical process of generating telemetry from a Windows 10 machine and ensuring it is correctly ingested into Wazuh. By the end of this session, we would have successfully configured our system to log events, including activity from Mimikatz, and triggered a custom alert. This hands-on process not only enhances our understanding of SIEM operations but also strengthens our ability to detect and analyze security incidents effectively.

## Configuring Wazuh to Ingest Sysmon Logs

To begin, we access the Wazuh configuration settings on our Windows 10 machine. When Wazuh is installed, its configuration files are located under Program Files (x86), specifically within the ek-agent folder. The key file we need to modify is ossec.conf. This file governs how logs are processed and which events are included or excluded from analysis. By default, certain event IDs are excluded using the != operator. However, for our purpose, we need to monitor processes related to Mimikatz, which requires Sysmon to be installed or Windows Security Event ID 4688 to be enabled. Since Sysmon was installed in part two of this series, we opt for that method.

Before making changes, we first create a backup of ossec.conf to safeguard against errors. This allows us to revert back if needed. We then modify the configuration to ingest Sysmon logs by adding a new entry under the localfile section. To locate the correct Sysmon channel name, we open the Windows Event Viewer, navigate to Applications and Services > Microsoft > Windows > Sysmon, and retrieve the operational log name from the properties section. This name is then inserted into our ossec.conf file in place of the existing application log configuration.

## Adjusting Log Categories and Restarting Services

Next, we remove other log categories such as Application, Security, and System, ensuring that only Sysmon logs are forwarded to the Wazuh manager. Once the changes are saved, administrative privileges are required to replace the existing configuration file. After this, we restart the Wazuh service, as any configuration changes must be followed by a service restart to take effect.

## Testing Telemetry with Mimikatz

With the updated configuration in place, we verify the ingestion of Sysmon logs in the Wazuh dashboard. Searching for "Sysmon" in the Alerts index may take some time before logs appear. To test this setup, we download and execute Mimikatz. Since Windows Defender would block this file, we must first exclude the Downloads folder from virus scanning. This is done through Windows Security settings by adding an exclusion for the Downloads directory. Also, Google Chrome may prevent the download, so we disable Safe Browsing under Privacy and Security settings in Chrome before proceeding.

Once Mimikatz is downloaded and extracted, we run it via an administrative PowerShell session and monitor Wazuh for related alerts. If no alerts appear, it is likely because Wazuh only logs events when a predefined rule is triggered. To address this, we modify the ossec.conf file on the Wazuh manager to log all events by default. This is done by enabling the logall and logall_json options in the configuration file. After saving these changes, we restart the Wazuh manager service.

## Enhancing Log Archiving and Indexing

To ensure that all logs are archived and ingested into Wazuh, we also update Filebeat's configuration. This involves navigating to the Filebeat YAML configuration file and changing the archives_enabled setting from false to true. As always, after modifying configurations, we restart the Filebeat service to apply the changes.

Once the configurations are updated, we proceed to create a new index in the Wazuh dashboard for archived logs. This is done through the Stack Management section, where we define a new index pattern named wazuh-archives-*. After setting the timestamp field, we finalize the index creation. Now, when navigating to the Discover section of Wazuh, we can select our newly created index and search for logs related to Mimikatz.

## Troubleshooting Log Ingestion Issues

If events are still not visible, we perform troubleshooting by inspecting the archived log files in the Wazuh manager's CLI. By navigating to /var/ossec/logs/archives/, we list the available log files and use cat and grep commands to search for Mimikatz activity. If the logs are present in the archive but not appearing in the dashboard, it indicates a delay in ingestion, which resolves over time.

## Conclusion

This session underscores the importance of proper log configuration and SIEM tuning. By ensuring that all relevant events are captured and making necessary adjustments, we enhance our detection capabilities. With our telemetry now successfully feeding into Wazuh, we are well-prepared for the final part of the series, where we will further refine our detection rules and automation workflows.

Stay Tuned.

#CyberSecurity #SOCAnalyst #MYDFIR #HandsOnExperience #SecurityMonitoring #IncidentResponse 