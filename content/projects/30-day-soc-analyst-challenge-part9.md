---
title: "Part 9: Installing and Configuring Sysmon on Windows Server"
description: "Day 9 of the 30-Day MYDFIR SOC Analyst Challenge: Setting up Sysmon for enhanced endpoint monitoring and security logging."
date: "2024-11-09"
author: "Samson Otori"
tags:
  - "Sysmon"
  - "Windows Server"
  - "Endpoint Security"
  - "SOC"
  - "Security Monitoring"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-9.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 9" },
  { "src": "/images/projects/30-day-challenge/Sysmon-Installation.png", "alt": "Sysmon Installation Process" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 9
  totalParts: 30
---

## Day 9 of the 30-Day MYDFIR SOC Analyst Challenge: Installing and Configuring Sysmon on Windows Server

On Day 9 of the 30-Day MyDFIR SOC Analyst Challenge, I focused on setting up Sysmon on the Windows Server created on Day 5. Sysmon is a powerful tool from Microsoft's Sysinternals suite that enhances endpoint visibility by logging key activities such as process creation, network connections, and more. Here's how I did it.

## Downloading and Installing Sysmon

First, I connected to the Windows Server via Remote Desktop Protocol (RDP). Once connected, I opened Microsoft Edge and searched for Sysmon on the Microsoft Learn site. I then downloaded the latest version of Sysmon (version 15.15 as of this writing) and extracted the contents to a directory on the server.

With the files extracted, I turned my attention to configuring Sysmon. I opted to use Olaf Hartong's popular Sysmon configuration file, which can be found on GitHub. This configuration file is widely used and highly customizable, allowing me to specify which events Sysmon should monitor.

## Configuring Sysmon

After downloading the configuration file (sysmonconfig.xml), I saved it in the Sysmon directory. I then opened PowerShell as an administrator and navigated to the directory where Sysmon was installed.

To install Sysmon with the configuration file, I used the following command in PowerShell:
```
sysmon64.exe -i sysmonconfig.xml
```

This command installs Sysmon and applies the configuration file. Once installed, Sysmon immediately begins logging events as per the configuration.

## Verifying Installation

To confirm that Sysmon was successfully installed, I checked both the Windows Services and Event Viewer. Sysmon appeared as a running service in the Services application. In Event Viewer, under Applications and Services Logs > Microsoft > Windows > Sysmon, I verified that Sysmon was actively generating logs, starting with Event ID 3, which logs network connections.

## Conclusion

With Sysmon now installed and logging critical events, the Windows Server is better equipped for monitoring and detecting malicious activities. In the next step of this challenge, I will learn how to push both Sysmon and Microsoft Defender logs to my Elasticsearch instance, enhancing my visibility and analysis capabilities.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=nzZY9OSfkeg&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=36)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)* 