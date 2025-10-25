---
title: "Project 5.2: LOG(N) Pacific Internship: Threat Hunting Scenario 2: Sudden Network Slowdown"
description: "A comprehensive threat hunting exercise investigating sudden network performance degradation caused by internal port scanning activity, using Microsoft Defender for Endpoint to identify unauthorized reconnaissance within the network."
date: "2025-10-14"
author: "Samson Otori"
client: "Personal Project"
challenge: ""
solution: ""
results: []
category: "blue"
tags: ["Threat Hunting", "Microsoft Defender for Endpoint", "Network Security", "Port Scanning", "EDR", "KQL", "PowerShell"]
image: "/images/projects/Windows Defender Fir..._imresizer.jpg"
technologies: ["Microsoft Defender for Endpoint", "KQL", "PowerShell", "Windows"]
series:
  name: "Project 5.2: LOG(N) Pacific Internship: Threat Hunting Scenario 2: Sudden Network Slowdown"
  order: 2
---

## Introduction

This threat hunting exercise was focused on investigating a sudden and unexplained network slowdown observed within a simulated enterprise lab environment. Using Microsoft Defender for Endpoint (MDE), the purpose of this hunt was to determine whether the performance degradation was caused by malicious internal activity, excessive resource usage, or misconfigured systems.

The environment consisted of my onboarded virtual machine named samson-windows-1, which was actively reporting telemetry to Microsoft Defender for Endpoint. The goal was to use real-time logs and threat hunting queries to identify abnormal behaviors that could suggest internal reconnaissance, port scanning, or other unauthorized actions within the network.

This scenario demonstrates a practical application of endpoint detection and response (EDR) data in uncovering internal security issues and applying structured analysis techniques to isolate potential causes.

## Scenario Overview

The issue began when the server team observed an overall slowdown across multiple legacy devices in the 10.0.0.0/16 subnet. External DDoS attacks were ruled out, meaning the cause was likely internal. The unrestricted internal network environment, where all hosts could communicate freely and PowerShell was allowed without restriction, created a perfect scenario for internal misuse or exploitation.

The working hypothesis for this hunt was that one of the systems inside the local network could have been performing unauthorized port scanning or large data transfers, which would naturally create latency or bandwidth congestion. The objective was to identify the specific device responsible for this unusual activity and determine whether it was a deliberate or automated action.

## Preparation

Before starting the hunt, I ensured that my virtual machine, samson-windows-, was properly onboarded to Microsoft Defender for Endpoint. Once confirmed, I simulated an internal event by executing a PowerShell command designed to initiate a controlled port scan within the local subnet. This step was necessary to generate realistic logs for analysis, mimicking what a real-world internal threat might look like.

<InlineGallery images={vm-setup-onboarding} title="VM Setup and Microsoft Defender Onboarding Process" />

### PowerShell Command
-------------------------------------------------------
powershell
Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/joshmadakor1/lognpacific-public/refs/heads/main/cyber-range/entropy-gorilla/portscan.ps1' -OutFile 'C:\programdata\portscan.ps1';cmd /c powershell.exe -ExecutionPolicy Bypass -File C:\programdata\portscan.ps1
-------------------------------------------------------

This PowerShell command downloaded and executed a script that scanned a range of IPs within the 10.0.0.x subnet, sequentially probing ports on other devices. In a real enterprise setting, this would represent a potential reconnaissance operation, something commonly done by attackers or misconfigured tools trying to map network exposure.

After executing the command, I allowed several minutes for the resulting logs to populate in Microsoft Defender for Endpoint's hunting tables. The preparation phase was crucial, as it ensured that the system had generated enough telemetry to analyze behaviors such as failed connection attempts, sequential port scanning, and process execution traces.

## Data Collection

Once the environment was prepared, the next phase involved verifying that telemetry data was actively being received across the three key Defender tables: DeviceNetworkEvents, DeviceFileEvents, and DeviceProcessEvents.

I began by executing a simple query to confirm that new logs were flowing in correctly. By ordering results by timestamp and taking the most recent entries, I could confirm that MDE was actively collecting data and that there were no ingestion delays.

### KQL Check for Recent Network Logs
-------------------------------------------------------
kql
DeviceNetworkEvents
| order by Timestamp desc
| take 10
-------------------------------------------------------

The timestamps confirmed that logs were being generated in real time. Having verified the data sources, I was confident that the environment was providing the necessary visibility to conduct meaningful analysis.

In a real security operations environment, this phase mimics ensuring that sensors and logging mechanisms are functioning correctly before an investigation begins. Without fresh telemetry, an analyst could end up drawing conclusions from outdated or incomplete information.

## Data Analysis

The analysis phase began with looking for signs of network anomalies, specifically focusing on connection attempts that had either failed or succeeded in large quantities. A sudden burst of such activity could be indicative of scanning or enumeration attempts within the network.

### KQL – Count Failed Connections
-------------------------------------------------------
kql
DeviceNetworkEvents
| where ActionType == "ConnectionFailed"
| summarize FailedConnectionsAttempts = count() by DeviceName, ActionType, LocalIP, RemoteIP
| order by FailedConnectionsAttempts desc
-------------------------------------------------------

When the results came back, the data immediately pointed to samson-windows- as the primary contributor to abnormal connection failures. The logs revealed that the device had failed over a hundred connection attempts, some directed at its own IP address and others toward another host in the subnet. Such behavior was a strong indicator of either misconfiguration or automated probing.

To further understand the scope of the activity, I drilled down into specific IP addresses that exhibited the highest failure rates. This approach mirrors a real-world scenario where analysts pivot from a general pattern to a specific anomaly for deeper inspection.

### KQL – Inspect All Failed Connections from a Specific IP
-------------------------------------------------------
kql
let IPInQuestion = "10.0.0.5";
DeviceNetworkEvents
| where ActionType == "ConnectionFailed"
| where LocalIP == IPInQuestion
| order by Timestamp desc
-------------------------------------------------------

Upon reviewing the sequence of failed connection attempts, it became clear that the remote ports being contacted followed a sequential pattern: ports 21, 23, 25, 53, 80, 110, 443, and others. This pattern matched the signature of a port scanning activity, which is typically used to identify open services running across hosts. Sequential probing of well-known ports is rarely accidental and often indicates reconnaissance or mapping behavior within the network.

At this stage, I had high confidence that the slowdown was caused by internal scanning originating from the samson-windows- VM.

<InlineGallery images={network-investigation-analysis} title="Network Investigation and Analysis Process" />

## Investigation

To confirm the origin of this suspicious activity, I pivoted to the DeviceProcessEvents table to look for the process responsible for initiating these connections. By focusing on a specific time window surrounding the detected network anomalies, I aimed to identify any executable or script that matched the port scanning behavior.

### KQL – Correlate Process Activity around the Port Scan Time
-------------------------------------------------------
kql
let VMName = "samson-windows-";
let specificTime = datetime(2025-10-12T13:15:03.9576325Z);
DeviceProcessEvents
| where Timestamp between ((specificTime - 10m) .. (specificTime + 10m))
| where DeviceName == VMName
| order by Timestamp desc
| project Timestamp, FileName, InitiatingProcessCommandLine
-------------------------------------------------------

The query output revealed that a PowerShell script named portscan.ps1 had been executed under the System account. This was a significant finding because the System account generally has administrative-level privileges and is not typically used to execute network scanning scripts.

Upon logging into the VM, I located the file in C:\ProgramData\portscan.ps1 and reviewed its contents. The script was intentionally scanning hosts in the subnet, sequentially testing common ports. This confirmed that the slowdown was caused by repeated internal scanning initiated by the PowerShell script.

### Snippet of the observed PowerShell script:
-------------------------------------------------------
powershell
for ($i=4; $i -le 10; $i++) {
   Test-NetConnection "10.0.0.$i" -Port 21,23,25,53,80,110,443
}
-------------------------------------------------------

Since the script was running under the System account and not triggered by an identifiable user, I concluded that the activity was automated and potentially malicious. I proceeded to isolate the samson-windows- VM from the network using Defender for Endpoint's built-in Isolate Device feature.

After isolating the system, I ran a full malware scan to check for persistence mechanisms or additional payloads. The scan returned clean, but ideally you are to request a full rebuild of the VM. In a production setting, this step ensures that any potential hidden or dormant artifacts are fully removed.

<InlineGallery images={port-scan-investigation-isolation} title="Port Scan Investigation and Device Isolation Process" />

## Response and MITRE ATT&CK Mapping

This scenario corresponded with several techniques in the MITRE ATT&CK Framework, helping align the observed activity with recognized adversarial tactics:

1. **Reconnaissance (T1046 – Network Service Scanning)**: The port scanning activity represented a clear attempt to enumerate open services.
2. **Execution (T1059.001 – PowerShell)**: The PowerShell script was used as the execution medium for network probing.
3. **Privilege Escalation (T1078 – Valid Accounts / System Context)**: The script ran under the System account, suggesting a high privilege level.
4. **Lateral Movement (T1021 – Remote Services)**: The scanning pattern indicated attempts to discover reachable hosts for potential lateral movement.

By isolating the device, scanning for malware, and scheduling a reimage, the risk of any further impact was neutralized.

## Documentation

Throughout the course of this investigation, I documented every major step and observation to ensure a clear understanding of how the event unfolded. The investigation began with an initial hypothesis of possible internal misuse, which evolved into the discovery of systematic port scanning. Each query used in Defender for Endpoint was recorded alongside its findings to form an evidence trail.

This documentation not only captured the technical steps taken, such as verifying logs, pivoting between tables, and confirming the script execution but also reflected the reasoning behind each action. Maintaining detailed documentation like this allows for transparency, consistency, and reproducibility in future hunts. It also helps build reference material that can be used by other analysts for similar incidents, ensuring the organization's knowledge base grows with every investigation.

## Improvement

After analyzing the entire scenario, several improvement points were identified. First, it became clear that PowerShell execution policies were too relaxed in this environment. Restricting PowerShell to only run signed scripts would immediately reduce the risk of arbitrary script execution.

Second, the internal network lacked segmentation, allowing one compromised host to communicate freely with all others. In a real corporate setup, proper network segmentation would ensure that unnecessary east-west traffic is limited and monitored.

Third, implementing automated alerting for abnormal internal traffic patterns, such as repeated connection failures to sequential ports, would enable the SOC team to detect similar behavior earlier. Additionally, conducting proactive threat hunts on a routine basis helps catch reconnaissance activities before they evolve into actual compromise events.

Ultimately, this scenario reinforced the importance of combining technical detection with procedural discipline, ensuring every hunt improves the overall security posture of the environment.

## Conclusion

The sudden network slowdown was traced to a PowerShell-based port scanning script executed under the System account on samson-windows-. Although no active compromise was found, the activity realistically simulated how internal reconnaissance could degrade performance and increase exposure within an unrestricted network.

This hunt demonstrated the power of Microsoft Defender for Endpoint in identifying behavioral anomalies, correlating telemetry across different data sources, and facilitating immediate containment actions.

Through structured investigation and methodical documentation, this exercise emphasized how internal misconfigurations or unauthorized automation can lead to observable network symptoms, and how disciplined threat hunting can quickly uncover their root cause.

## Important Link

If you are interested in joining the [CYBER-RANGE COMMUNITY](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5) or following along with the labs, you can check it out here: [LINK](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5)

