---
title: "Project 5.4: LOG(N) Pacific Internship: Threat Hunting Scenario 4: PwnCrypt Ransomware Outbreak"
description: "A comprehensive threat hunting exercise investigating a PwnCrypt ransomware outbreak, using Microsoft Defender for Endpoint to analyze file encryption activities, process execution chains, and ransomware indicators of compromise."
date: "2025-10-24"
author: "Samson Otori"
client: "Personal Project"
challenge: ""
solution: ""
results: []
category: "blue"
tags: ["Threat Hunting", "Microsoft Defender for Endpoint", "Ransomware Analysis", "Incident Response", "EDR", "KQL", "PowerShell"]
image: "/images/projects/Zero-day-red.jpg"
technologies: ["Microsoft Defender for Endpoint", "KQL", "PowerShell", "Windows"]
series:
  name: "Project 5.4: LOG(N) Pacific Internship: Threat Hunting Scenario 4: PwnCrypt Ransomware Outbreak"
  order: 4
---

## Introduction

This investigation was conducted to examine suspicious file activity observed within the virtual machine samson-windows-, which was onboarded to Microsoft Defender for Endpoint (MDE). The objective was to determine whether abnormal file modification behaviour and ransom instructions on the desktop were the result of ransomware execution, and if so, to identify its origin, propagation chain, and indicators of compromise.

Using Microsoft Defender's advanced hunting capabilities, telemetry from multiple tables — DeviceFileEvents and DeviceProcessEvents — was analyzed to reconstruct the attack sequence.

## Scenario Overview

A new ransomware strain, internally referred to as PwnCrypt, had been reported as circulating in the wild. It leverages a PowerShell-based payload that encrypts local files using AES-256 encryption, appending the custom extension .pwncrypt. The strain also leaves ransom instructions in a desktop file demanding Bitcoin payment for decryption.

During lab testing, the same behaviour appeared on samson-windows-: three files on the Desktop were encrypted, and a text file appeared reading:

"Your files have been encrypted. To get a decryption key, send this amount of Bitcoin to…"

The task was to confirm the root cause of this encryption, identify the executing process chain, and determine whether any persistence or lateral movement mechanisms were present.

## Preparation

Prior to the hunt, the samson-windows- VM was successfully onboarded to MDE, ensuring telemetry ingestion from endpoint sensors. A PowerShell script named pwncrypt.ps1 was executed in the background to simulate a real ransomware infection, but the analysis was performed as if the infection were unknown.

The first step was to establish a baseline of file activity to identify when the anomaly began.

## Data Collection

The analyst verified active log collection across Defender's telemetry tables. Using DeviceFileEvents, all file operations within the last 30 minutes were grouped by timestamp to visualize spikes in file write volume:

-------------------------------------------------------
kql
let VMName = "samson-windows-";
DeviceFileEvents
| where DeviceName == VMName
| where Timestamp >= ago(30m)
| summarize FileEvents = count() by bin(Timestamp, 5m)
| order by Timestamp asc
-------------------------------------------------------

Result: Three distinct spikes appeared within a short interval, suggesting a mass file modification event, the initial indicator of ransomware behavior.

## Data Analysis

### A. Mass File Modification and Extension Changes

To examine which file types were most affected, the following query was run:

-------------------------------------------------------
kql
DeviceFileEvents
| where DeviceName == VMName
| where ActionType in ("FileRenamed","FileCreated","FileModified")
| extend ext = tostring(split(FileName,".")[-1])
| summarize Count = count() by ext
| order by Count desc
-------------------------------------------------------

Observation: Extensions such as .dll, .mui, .xml, and .png appeared frequently normal for background Windows processes — but hidden within the logs were sudden surges of renamed files later correlated with the encryption timestamps.

### B. Folder-Level Analysis (Staging Behaviour)

To determine where encryption occurred:

-------------------------------------------------------
kql
let VMName = "samson-windows-";
DeviceFileEvents
| where DeviceName == VMName and Timestamp >= ago(30m)
| where ActionType == "FileCreated"
| summarize count() by Folder = extract(@"^(.*)\\[^\\]+$",1,FileName)
| order by count_ desc
-------------------------------------------------------

Result: High activity was isolated to a single user folder — C:\Users\samson\Desktop — confirming that encryption primarily targeted the Desktop directory.

### C. Identifying Script Execution

The next step was to look for evidence of any scripts or command-line interpreters responsible for the mass file actions:

-------------------------------------------------------
kql
let VMName = "samson-windows-";
DeviceProcessEvents
| where DeviceName == VMName and Timestamp >= ago(30m)
| where FileName has_any ("powershell","pwsh","cmd.exe","wscript.exe","cscript.exe","wmic.exe")
| project Timestamp, FileName, ProcessCommandLine, InitiatingProcessFileName, InitiatingProcessCommandLine
| order by Timestamp desc
-------------------------------------------------------

Result: Two instances of PowerShell.exe were identified, both launched non-interactively with the parameters:

ExecutionPolicy AllSigned -NoProfile -NonInteractive -Command "& {...}"

The initiator process was senseir.exe, a legitimate Windows background service that had been abused to execute PowerShell. This discovery confirmed that PowerShell was used to deploy or execute the encryption payload.

### D. Tracing Child Processes and Persistence Mechanisms

To verify what PowerShell spawned:

-------------------------------------------------------
kql
DeviceProcessEvents
| where DeviceName == VMName
| where InitiatingProcessFileName == "powershell.exe"
| project Timestamp, FileName, ProcessCommandLine, InitiatingProcessFileName, InitiatingProcessCommandLine
| order by Timestamp desc
-------------------------------------------------------

Result: PowerShell launched several cmd.exe and svchost.exe instances. These, in turn, executed processes such as python.exe, GameBarElevatedFT_Alias.exe, and MediaPlayer.exe, which were all generated within C:\Users\samson\AppData\Local\Temp — a common ransomware staging area.

### E. File Events Linked to User Folders

To focus on desktop encryption evidence:

-------------------------------------------------------
kql
let VMName = "samson-windows-";
DeviceFileEvents
| where DeviceName == VMName
| where Timestamp >= ago(24h)
| where ActionType in ("FileCreated","FileRenamed","FileModified")
| where FolderPath has_any("Desktop","\\Users\\")
| project Timestamp, ActionType, FileName, FolderPath, InitiatingProcessFileName
| order by Timestamp desc
-------------------------------------------------------

Result:

A file named __decryption-instructions.lnk appeared on the desktop immediately after hundreds of file renames and creations, confirming the delivery of the ransom note. The parent process was explorer.exe, which executed after system encryption had completed, a typical behaviour of ransomware scripts displaying ransom messages post-infection.

### F. Process Chain Correlation – Root Cause Determination

Finally, to reconstruct the infection path:

-------------------------------------------------------
kql
let VMName = "samson-windows-";
DeviceProcessEvents
| where DeviceName == VMName
| where Timestamp between (ago(120m) .. now())
| where FileName in~ ("powershell.exe","cmd.exe","services.exe","svchost.exe")
| project Timestamp, FileName, ProcessCommandLine, InitiatingProcessFileName, InitiatingProcessCommandLine, AccountName
| order by Timestamp asc
-------------------------------------------------------

Findings:

1. powershell.exe (initiated by senseir.exe) executed a hidden script with an AllSigned policy bypass.
2. This instance spawned cmd.exe, which registered background services.
3. services.exe then created multiple svchost.exe processes running under SYSTEM and Network Service accounts.
4. These service-hosted processes performed the encryption routines on user data.

<InlineGallery images={pwncrypt-ransomware-investigation} title="PwnCrypt Ransomware Investigation and Analysis Process" />

## Investigation Summary

The analysis confirmed that samson-windows- was infected with PwnCrypt ransomware delivered via a PowerShell payload. The encryption occurred under SYSTEM privileges, appending custom extensions to files and generating a ransom note on the desktop.

Execution Chain:
senseir.exe → powershell.exe → cmd.exe → services.exe → svchost.exe → file encryption (.pwncrypt)

## Response and Containment

1. Isolated the compromised VM from the network using Defender's Isolate Device function.
2. Conducted a full antivirus and Defender scan; confirmed malicious artifacts were limited to the VM.
3. Recommended a complete VM rebuild to remove any residual persistence.
4. Captured SHA-1 hashes of key malicious files (__decryption-instructions.lnk, encrypted files) for threat-intel reference.
5. Logged the incident for follow-up reporting to management and for potential YARA-rule creation.

## Documentation

Each phase of this investigation — preparation, data collection, analysis, and response — was recorded within Microsoft Defender's query history and screenshots for audit and learning purposes.

All queries were executed methodically to trace the incident from initial file-system anomalies to the responsible process hierarchy.

## MITRE ATT&CK Mapping

The PwnCrypt ransomware activity observed in samson-windows- aligns with several stages of the MITRE ATT&CK framework.

1. **Initial Access (T1204.002 – User Execution)**: Infection began through manual execution of a malicious PowerShell script.
2. **Execution (T1059.001 / T1059.003)**: PowerShell and CMD were used to run the payload and supporting commands.
3. **Persistence (T1543.003)**: New service-host processes were created to maintain execution.
4. **Privilege Escalation & Defense Evasion (T1569.002 / T1562.001 / T1036.005)**: Ransomware leveraged elevated service contexts, bypassed PowerShell policies, and masqueraded as legitimate Windows binaries.
5. **Discovery (T1082)**: Enumerated user directories such as C:\Users\samson\Desktop before encryption.
6. **Impact (T1486 / T1491.001)**: Encrypted user files with the .pwncrypt extension and dropped a ransom note (__decryption-instructions.lnk).

Overall, the attack followed a full ransomware kill chain — Execution → Persistence → Privilege Escalation → Defence Evasion → Impact — demonstrating how PowerShell abuse and service creation can rapidly lead to data encryption and ransom deployment.

## Improvement and Lessons Learned

1. **Restrict PowerShell usage**: Configure Constrained Language Mode and allow only signed scripts.
2. **Implement application whitelisting**: Block unauthorized interpreters (cmd.exe, powershell.exe, etc.) in user space.
3. **Monitor mass file modifications**: Create a detection rule for spikes in FileModified and FileRenamed actions per host.
4. **Enhance user awareness**: Ransomware often enters through phishing or drive-by downloads; continuous education is essential.
5. **Segment the network**: Prevent lateral propagation between machines by enforcing least-privilege access controls.

## Conclusion

The investigation conclusively determined that the observed encryption on samson-windows- was caused by the PwnCrypt ransomware, executed via a PowerShell-based payload with SYSTEM privileges.

Although contained within the lab environment, the event accurately simulated a real-world ransomware outbreak and demonstrated how rapid detection through telemetry correlation from file anomalies to process hierarchies enables timely containment.

Through disciplined analysis and structured response, this project reinforced the value of proactive threat-hunting practices using Microsoft Defender for Endpoint.

## Important Link

If you are interested in joining the [CYBER-RANGE COMMUNITY](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5) or following along with the labs, you can check it out here: [LINK](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5)
