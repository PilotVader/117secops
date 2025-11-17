---
title: "Project 5.9: LOG(N) Pacific Internship Final Project – Detecting Tor Browser Usage on Corporate Endpoint - Threat Hunting Scenario (Part 2: The Threat Hunt)"
description: "Conducting a full threat-hunting investigation using Microsoft Defender for Endpoint to identify and reconstruct Tor Browser misuse on a corporate endpoint, correlating file system activity, process execution logs, and network telemetry."
date: "2025-11-17"
author: "Samson Otori"
client: "Personal Project"
challenge: ""
solution: ""
results: []
category: "blue"
tags: ["Blue Team", "Cloud", "Threat Hunting", "Microsoft Defender for Endpoint", "TOR Browser", "KQL", "SOC Operations", "Endpoint Security", "Advanced Hunting"]
image: "/images/projects/MDE VS TOR.png"
technologies: ["Microsoft Defender for Endpoint", "KQL", "Windows", "Endpoint Security", "Advanced Hunting"]
series:
  name: "Project 5.9: LOG(N) Pacific Internship Final Project – Detecting Tor Browser Usage on Corporate Endpoint - Threat Hunting Scenario"
  part: 2
  totalParts: 2
---

## Introduction

During this stage of my internship with LOG(N) Pacific, I carried out a full threat-hunting investigation focused on identifying potential misuse of the Tor Browser on a corporate endpoint. The scenario originated from management concerns after encrypted outbound traffic patterns were observed, as well as anonymous reports of employees discussing ways to bypass security controls. Tor is explicitly prohibited on corporate networks, so my task was to determine whether the browser had been downloaded, installed, launched, and actively used on my assigned endpoint.

All hunting activities were limited strictly to my virtual machine samson-windows- to avoid pulling in telemetry from other student environments. Using Microsoft Defender's Advanced Hunting engine, I reconstructed the entire activity chain, from initial file creation, to silent installation, to browser execution, and finally the Tor network traffic itself.

This investigation is strictly for educational, homelab, and professional training purposes only.

## Initial File Discovery – Indicators of Tor-Related Artifacts

My first step was to hunt for filesystem traces of Tor. Using DeviceFileEvents, I filtered for filenames containing the string "tor", which immediately surfaced a long list of Tor-related artifacts, including tor.exe, extracted Tor Browser folders, and the suspicious tor-shopping-list.txt file on the Desktop.

<InlineGallery images={tor-threat-hunt-file-discovery} title="DeviceFileEvents Tor File Discovery" />

The density of file creation, modification, and rename operations showed that the Tor Browser had not only been downloaded but fully unpacked and interacted with.

## Silent Installation – Evidence of Intentional Execution

Next, I pivoted into DeviceProcessEvents, this time searching for Tor-related process command lines.

This revealed the most critical early-stage indicator: the installer was executed with a silent install flag.

<InlineGallery images={tor-threat-hunt-installation} title="DeviceProcessEvents Silent Installation Detection" />

A silent installation demonstrates deliberate intent to install the browser without drawing attention, reinforcing that the behavior was intentional rather than accidental.

## Browser Launch – Successful Tor Browser Execution

With installation confirmed, I searched process telemetry for Tor's executable variants (tor.exe, firefox.exe, and tor-browser.exe). The results clearly showed that the browser was launched several times from within the Tor Browser directory.

<InlineGallery images={tor-threat-hunt-browser-launch} title="DeviceProcessEvents Tor Browser Launch" />

Multiple subprocesses were spawned, consistent with Tor's hardened Firefox-based architecture. This confirmed that the browser was not only installed but actively launched.

## Network Activity – Verified Connections to Tor Network

To confirm live network use, I investigated DeviceNetworkEvents filtered by Tor-related ports (9001, 9030, 9050, 9051, 9150) and Tor-associated executable names.

<InlineGallery images={tor-threat-hunt-network} title="DeviceNetworkEvents Tor Network Connections" />

The results showed successful outbound connections on port 9150 to Tor-related IP ranges, as well as additional HTTPS traffic tied to Tor processes. These connections confirmed actual Tor-network usage, not just installation.

## User Intent – Creation and Deletion of the Tor Shopping List File

Finally, I examined the suspicious tor-shopping-list.txt file using a targeted search for filenames containing "shopping".

<InlineGallery images={tor-threat-hunt-shopping-list} title="DeviceFileEvents Shopping List File Activity" />

The logs showed repeated creation and modification events, followed by deletion into the Recycle Bin. This file appeared to contain a mock list of "dark web purchases" created for lab simulation. Regardless, the behavior mimicked evidence-removal actions often seen in real insider threat cases.

## Chronological Event Timeline

Below is a clear timeline reconstruction of the user's activity based entirely on Defender telemetry from your system:

### 1. File Download – Tor Installer

**Timestamp:** Nov 16, 2025 – 1:53 PM

**Event:** User "samson" downloaded the Tor Browser installer into the Downloads folder.

**Action:** File download detected.

**File Path:**
`C:\Users\samson\Downloads\tor-browser-windows-x86_64-portable-15.0.1.exe`

### 2. Process Execution – Silent Tor Installation

**Timestamp:** Nov 16, 2025 – 1:56 PM

**Event:** The employee executed the Tor installer using a silent installation command.

**Action:** Process creation detected.

**Command:**
`tor-browser-windows-x86_64-portable-15.0.1.exe /S`

**File Path:**
`C:\Users\samson\Downloads\tor-browser-windows-x86_64-portable-15.0.1.exe`

### 3. Process Execution – Tor Browser Launch

**Timestamp:** Nov 16, 2025 – 2:01–2:02 PM

**Event:** Multiple Tor Browser processes (firefox.exe, tor.exe) were created, indicating the browser launched successfully.

**Action:** Process creation of Tor Browser–related executables.

**File Path:**
`C:\Users\samson\Desktop\Tor Browser\Browser\TorBrowser\Tor\tor.exe`

and

`C:\Users\samson\Desktop\Tor Browser\Browser\firefox.exe`

### 4. Network Connection – Tor Network Activity

**Timestamp:** Nov 16, 2025 – 1:58:57 PM

**Event:** A successful network connection to 5.2.79.190 over port 9001 was made using a Tor-related process.

**Action:** ConnectionSuccess

**Process:** firefox.exe

**File Path:**
`C:\Users\samson\Desktop\Tor Browser\Browser\firefox.exe`

### 5. Additional Network Connections – Extended Tor Usage

**Timestamps & Connections:**

1. 1:59:00 PM – 185.129.61.6:443
2. 1:59:02 PM – 96.9.98.70:443
3. 1:59:58 PM – 87.118.88.94:443
4. 2:00:00 PM – 127.0.0.1:9150 (Tor local SOCKS proxy)

**Event:** Multiple outbound HTTPS and Tor-port connections were established.

**Action:** ConnectionSuccess

These confirm ongoing Tor network activity.

### 6. File Creation – The Tor Shopping List

**Timestamp:** Nov 16, 2025 – 3:07–3:08 PM

**Event:** The user created and repeatedly modified tor-shopping-list.txt on the Desktop.

**Action:** File creation & modification.

**File Path:**
`C:\Users\samson\Desktop\tor-shopping-list.txt`

## Summary

The user on the endpoint samson-windows- downloaded, silently installed, launched, and actively used the Tor Browser. Network telemetry confirmed real connections to Tor relays, and a Tor-related document was created and later deleted.

This sequence demonstrates intentional Tor usage, anonymized browsing, and file activity indicating user intent.

## Response Taken

Tor usage was successfully confirmed. In a real corporate environment, the device would be isolated, SOC leadership notified, and HR engaged for policy violation review.

## Conclusion

This threat hunt provided a full end-to-end reconstruction of Tor Browser misuse on a corporate endpoint. By correlating file system activity, process execution logs, and network telemetry, the investigation produced a clear narrative showing intentional installation, execution, and use of Tor for anonymized browsing activity.

While this scenario was fully simulated in a controlled cyber-range environment, the workflow mirrors real-world SOC and IR processes for insider misuse detection. It strengthened my expertise in KQL pivoting, threat-hunting methodology, evidence correlation, and professional incident documentation.

## Important Link

If you are interested in joining the [CYBER-RANGE COMMUNITY](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5) or following along with the labs, you can check it out here: [LINK](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5)

