---
title: "Project 5.5: LOG(N) Pacific Internship – Incident Response Scenario 1: Brute Force Attack Detection with Microsoft Sentinel"
description: "Investigating a simulated brute-force attack scenario using Microsoft Sentinel and Defender for Endpoint, following the NIST 800-61 incident response lifecycle."
date: "2025-11-08"
author: "Samson Otori"
client: "Personal Project"
challenge: ""
solution: ""
results: []
category: "blue"
tags: ["Incident Response", "Microsoft Sentinel", "Microsoft Defender for Endpoint", "KQL", "SOC Operations", "Azure", "Brute Force Detection"]
image: "/images/projects/detection-brute-force.png"
technologies: ["Microsoft Sentinel", "Microsoft Defender for Endpoint", "KQL", "Azure", "Windows"]
series:
  name: "Project 5.5: LOG(N) Pacific Internship – Incident Response Scenario 1: Brute Force Attack Detection with Microsoft Sentinel"
  order: 5
---

## Introduction

Project 5.5: LOG(N) Pacific Internship – Incident Response Scenario 1: Brute Force Attack Detection with Microsoft Sentinel
During this phase of my internship with LOG(N) Pacific, I focused on investigating a simulated brute-force attack scenario against a Windows virtual machine using Microsoft Sentinel and Defender for Endpoint. This project was designed to replicate a real-world incident response workflow from detection and alerting to analysis, containment, and closure following the NIST 800-61 Incident Response Lifecycle.

## Scenario Overview

The lab environment was already integrated between Microsoft Defender for Endpoint (MDE) and Microsoft Sentinel, ensuring telemetry from all onboarded virtual machines was ingested into the DeviceLogonEvents table. My goal was to detect and respond to repeated login failures indicative of brute-force activity, correlate them to source IP addresses, and ensure proper mitigations were in place to prevent unauthorized access.

## Detecting the Brute Force Attempt

To begin, I crafted a KQL query in Sentinel to identify repeated failed login attempts originating from the same remote IP against the same VM within a defined time window. The query looked for events where the ActionType was "LogonFailed", counted occurrences per Remote IP and Device Name, and filtered for instances exceeding ten failures within five hours. Once validated, I turned this query into an Analytics Rule under Sentinel → Analytics → Scheduled Query Rules, configuring it to run every 4 hours, check data from the past 5 hours, and automatically generate incidents whenever triggered.
As shown in the Sentinel dashboard below, the rule titled “Samson – Brute Force Detection” successfully mapped to MITRE ATT&CK tactics of Initial Access (T1078), Credential Access (T1110), and Discovery (T1082). It was set to medium severity, enabled automatic incident creation, and mapped the entity relationships for the host and remote IPs.
After deploying the rule, I simulated multiple failed RDP login attempts to trigger it. Within minutes, Sentinel’s Incidents panel reflected a new alert under my workspace, confirming that the rule had successfully detected multiple failed logons from several external IP addresses targeting my VM (samson-windows).

<InlineGallery images={brute-force-detection-workflow} title="Brute Force Detection Workflow in Microsoft Sentinel" />

## Investigating the Incident

Clicking into the incident revealed useful context: Sentinel automatically grouped failed logon attempts from multiple IP addresses against a collection of VMs, with my host samson-windows among them. The Investigation Graph, as shown in the Sentinel interface, provided a visual correlation of all the entities remote IPs, devices, and associated alert data linked through the incident.
At this stage, I assigned the incident to myself and marked its status as Active, beginning the investigation phase. Using Microsoft Defender for Endpoint, I cross-referenced the host’s activity timeline. The Defender timeline displayed expected legitimate system activities DLL loads, Explorer executions, and normal agent cleanup confirming there were no malicious payloads or unauthorized processes spawned as a result of the failed logons.
To confirm there had been no successful compromises, I ran another query in Sentinel against the DeviceLogonEvents table, this time filtering for "LogonSuccess" actions on the target device (samson-windows). The result confirmed that only legitimate user accounts (my own) had successfully authenticated to the VM while the external IPs only produced failed logons. This validation step was essential to ensure that while the brute-force attempts were real, they had not succeeded in breaching the system.

<InlineGallery images={brute-force-investigation-workflow} title="Sentinel Incident Investigation and Validation" />

## Containment and Mitigation

Following proper incident response practice, I simulated containment actions. Within Microsoft Defender for Endpoint, the Device actions menu provided several response capabilities, including Isolate Device, Restrict App Execution, Initiate Antivirus Scan, and Collect Investigation Package. In a real-world scenario, these options would be critical in stopping lateral movement or data exfiltration if the host had been compromised.
Since this was a simulated attack, I applied containment at the network level instead. In the Azure portal, I accessed the Network Security Group (NSG) associated with the VM and modified the inbound rule set. Previously, the NSG allowed wide-open inbound RDP access from any source, a serious misconfiguration often exploited in brute-force attacks. I locked down the NSG to only permit TCP port 3389 (RDP) connections from my specific IP address, effectively restricting all public access to the virtual machine.
This remediation step mirrors how a security team would respond in production: isolating exposure points, updating access policies, and implementing least-privilege network design.

## Documenting and Closing the Incident

Once the threat was contained, I recorded my findings directly in the Microsoft Sentinel incident pane. The summary comment captured key details:
“Incident Summary: Multiple failed RDP logins detected from 6 IPs targeting samson-windows-. No successful logins confirmed. Mitigation included NSG hardening and simulated AV scan. Recommended enforcing NSG restrictions by default.”
The incident was then classified as True Positive – Suspicious Activity, with the following closing note:
“Confirmed true brute-force activity. No compromise detected. Preventive NSG policy recommended.”
After documentation, the incident was closed, completing the Detection, Analysis, and Containment phases of the NIST incident response lifecycle.

<InlineGallery images={brute-force-response-closure} title="Response Actions, Documentation, and Closure" />

## Conclusion

This simulation reinforced the importance of layered detection and automated response mechanisms in a SOC workflow. Sentinel’s ability to correlate multiple failed logon events across devices and visualize attack sources made it easy to distinguish between random noise and coordinated brute-force activity.
By pairing Defender for Endpoint telemetry with Sentinel analytics rules, it becomes possible not only to detect early brute-force attempts but also to automate future responses such as isolating the VM or applying adaptive network restrictions.
From a prevention standpoint, this exercise highlighted the criticality of secure NSG configurations, limited RDP exposure, and continuous log monitoring. While brute-force attacks are common, their success depends heavily on weak authentication practices and permissive access controls. Hardening policies, enforcing MFA, and reducing external attack surfaces remain fundamental defense strategies.

## Important Link

If you are interested in joining the [CYBER-RANGE COMMUNITY](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5) or following along with the labs, you can check it out here: [LINK](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5)

