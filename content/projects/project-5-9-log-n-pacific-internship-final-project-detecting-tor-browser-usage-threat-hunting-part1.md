---
title: "Project 5.9: LOG(N) Pacific Internship Final Project – Detecting Tor Browser Usage on Corporate Endpoint - Threat Hunting Scenario (Part 1: Malicious Activity Simulation)"
description: "Simulating malicious employee behaviour in a controlled cyber-range environment by downloading and using TOR Browser on a corporate workstation, generating telemetry for threat hunting analysis in Microsoft Defender for Endpoint."
date: "2025-11-17"
author: "Samson Otori"
client: "Personal Project"
challenge: ""
solution: ""
results: []
category: "blue"
tags: ["Blue Team", "Cloud", "Threat Hunting", "Microsoft Defender for Endpoint", "TOR Browser", "Dark Web", "SOC Operations", "KQL", "Endpoint Security"]
image: "/images/projects/MDE VS TOR.png"
technologies: ["Microsoft Defender for Endpoint", "TOR Browser", "KQL", "Windows", "Endpoint Security"]
series:
  name: "Project 5.9: LOG(N) Pacific Internship Final Project – Detecting Tor Browser Usage on Corporate Endpoint - Threat Hunting Scenario"
  part: 1
  totalParts: 2
---

## Introduction

During this stage of my internship with LOG(N) Pacific, I focused on generating real-world malicious behaviour inside a controlled cyber-range environment to prepare for the threat-hunting phase of the final project. This scenario simulated an employee intentionally downloading, installing, and using the TOR Browser on a corporate workstation, an activity that violates enterprise security policy and often signals attempts to bypass monitoring controls or access high-risk resources such as dark-web marketplaces.

The purpose of this part of the project was not to detect or investigate the activity yet, but to intentionally create telemetry across device process logs, file modifications, browser activity, and network connections. All this data would later be used in Part 2 to conduct a full hunting operation inside Microsoft Defender.

Every action taken during this simulation from downloading TOR to accessing onion-based dark-web sites was performed strictly for educational and defensive research purposes inside an isolated lab machine that was already onboarded to Microsoft Defender for Endpoint.

## Simulating Malicious Employee Behaviour

The simulation began by visiting the TOR Project website and downloading the Windows portable installer. This action alone generates Defender browser events, network logs, and file-write operations on the endpoint, forming the foundation for later threat hunts.

<InlineGallery images={tor-simulation-downloading} title="Downloading TOR Browser" />

After the download completed, I opened an elevated command prompt and navigated to the user's Downloads directory. This is an important detail in a threat-hunting scenario because command-line execution often provides defenders with clearer indicators of intent.

<InlineGallery images={tor-simulation-cmd} title="Navigating to TOR App in Command Prompt" />

From there, I initiated a silent installation of the TOR Browser by calling the executable directly through CMD. This method avoids the typical GUI installer and often appears suspicious when observed in process-execution logs.

<InlineGallery images={tor-simulation-installation} title="Silent Installation of TOR Browser" />

Once the installation completed, a TOR Browser folder appeared on the desktop. Opening it and launching the browser immediately generated additional execution and network telemetry within Defender.

<InlineGallery images={tor-simulation-opening} title="Opening TOR Browser from Desktop" />

After launching the browser, I established a connection to the TOR network. This stage triggers unique patterns of encrypted outbound connections that are very distinct from normal enterprise traffic.

<InlineGallery images={tor-simulation-connection} title="Establishing TOR Network Connection" />

To confirm the anonymized routing behaviour of TOR, I checked my geolocation via a public IP-lookup website. The TOR exit node placed the system in Stockholm, Sweden, which contrasted sharply with the actual geographic region tied to the device, an important indicator in any impossible-travel or suspicious browsing investigation.

<InlineGallery images={tor-simulation-location} title="Checking Geolocation via TOR Exit Node" />

Next, I accessed the official onion link for Dread, a well-known dark-web community. This action is logged as network traffic to an '.onion' endpoint, another high-value indicator for threat hunters.

<InlineGallery images={tor-simulation-dread-url} title="Checking Dread Onion URL" />

After confirming the correct URL, I proceeded into the Dread forum homepage. This provided a realistic browsing pattern for later hunting, ensuring Defender captured page loads, process interactions, and encrypted traffic.

<InlineGallery images={tor-simulation-darkweb} title="Accessing Dread Dark Web Forum" />

To further diversify the telemetry, I navigated through multiple sections of the dark-web platform, generating additional resource loads and interaction data that would later be visible in the DeviceNetworkEvents and BrowserEvents tables.

<InlineGallery images={tor-simulation-navigating} title="Navigating Dark Web Pages" />

To simulate intent, I created a text file on the desktop titled "tor-shopping-list.txt," listing various items as if the user planned to purchase illicit products. This file creation, modification, and eventual deletion would later appear in Defender's DeviceFileEvents table.

<InlineGallery images={tor-simulation-shopping-list} title="Creating Shopping List File" />

Once the browsing activity was complete, I deleted the file and confirmed it appeared in the Recycle Bin. This sequence of create → modify → delete produces a clear chain of file events, valuable for detection engineering.

<InlineGallery images={tor-simulation-deleting} title="Deleting Shopping List File" />

Finally, I validated that Defender for Endpoint was successfully ingesting the activity. Reviewing the DeviceFileEvents table showed multiple entries associated with TOR-related processes, including file creation, renaming, and deletion events. This confirmed that the environment had captured enough telemetry to support Part 2 of the project (the threat hunt).

<InlineGallery images={tor-simulation-validation} title="Validating Microsoft Defender Log Ingestion" />

## Important Ethical Note

All actions performed in this scenario were executed strictly for cybersecurity learning purposes inside a controlled, isolated lab environment.

No real dark-web purchases were made, and no illegal activity was conducted.

The intent of this exercise was to generate realistic indicators of compromise so they can be analyzed, hunted, and documented professionally in the next stage of the internship project.

## Conclusion

This phase of the project successfully generated a complete trail of suspicious endpoint activity: downloading unauthorized software, executing it through the command line, visiting dark-web onion sites, interacting with TOR-routed IP addresses, and creating and deleting files related to illicit activity. All of this telemetry now exists inside Microsoft Defender and will be used in the upcoming threat-hunting stage.

Part 2 will focus entirely on analyzing this telemetry, reconstructing the user's behaviour, identifying the IOCs created during this simulation, and producing a full threat-hunting report.

## Important Link

If you are interested in joining the [CYBER-RANGE COMMUNITY](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5) or following along with the labs, you can check it out here: [LINK](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5)

