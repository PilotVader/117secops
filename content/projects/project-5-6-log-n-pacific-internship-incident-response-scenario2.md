---
title: "Project 5.6: LOG(N) Pacific Internship – Incident Response Scenario 2: PowerShell Suspicious Web Request with Microsoft Sentinel"
description: "Detecting PowerShell-based web payload staging, building Sentinel analytics for Invoke-WebRequest abuse, and walking through end-to-end incident response with Microsoft Defender for Endpoint and Sentinel."
date: "2025-11-10"
author: "Samson Otori"
client: "Personal Project"
challenge: ""
solution: ""
results: []
category: "blue"
tags: ["Incident Response", "Microsoft Sentinel", "Microsoft Defender for Endpoint", "PowerShell", "SOC Operations", "KQL", "Post-Exploitation Detection"]
image: "/images/projects/invoke web request.png"
technologies: ["Microsoft Sentinel", "Microsoft Defender for Endpoint", "PowerShell", "KQL", "Windows"]
series:
  name: "Project 5.6: LOG(N) Pacific Internship – Incident Response Scenario 2: PowerShell Suspicious Web Request with Microsoft Sentinel"
  order: 6
---

## Introduction

Project 5.6: LOG(N) Pacific Internship – Incident Response Scenario 2: PowerShell Suspicious Web Request with Microsoft Sentinel
Scenario Overview
In this scenario of my LOG(N) Pacific internship, I focused on detecting and responding to a post-exploitation technique where PowerShell is used to download and execute remote payloads. The targeted host was a Windows virtual machine named windows-target-1, fully onboarded to Microsoft Defender for Endpoint (MDE) and streaming telemetry into the Microsoft Sentinel Log Analytics workspace.
The objective was to engineer a Sentinel analytics rule that would reliably detect suspicious usage of Invoke-WebRequest from PowerShell, automatically generate an incident, and then walk through the full NIST 800-61 Incident Response Lifecycle: detection, analysis, containment, eradication, and closure.

## Baseline Telemetry and Data Source Validation

Before building any detection logic, I validated that process creation telemetry from Defender for Endpoint was flowing into the DeviceProcessEvents table. I queried recent events and projected core process attributes such as TimeGenerated, DeviceName, FileName, and the full command line. The result set showed a healthy stream of events from multiple VMs in the lab, including GUI components (LogonUI.exe), clipboard redirection (rdpclip.exe), and theme processes, confirming that the telemetry pipeline between MDE and Sentinel was functioning as expected and that DeviceProcessEvents could be trusted as the primary data source for process-level hunting.

## Isolating PowerShell Activity on windows-target-1

With the baseline established, the next step was to scope down to PowerShell activity on the specific host under test. I restricted the query to windows-target-1 and filtered for events where the process image was powershell.exe. The resulting events showed repeated invocations of PowerShell under the NT AUTHORITY\SYSTEM security context with ActionType indicating new process creation.
From a defender’s perspective, this already represented elevated risk. Scripted activity running as SYSTEM typically means either scheduled automation, software deployment tooling, or an attacker operating with full local privileges. Establishing this baseline for how often and in what context PowerShell ran on the host was critical before differentiating benign from malicious execution.

## Hunting for Suspicious PowerShell Web Requests

Once PowerShell executions on the host were isolated, I focused on detecting outbound web activity initiated by those sessions. I refined the analysis to processes whose command lines contained the Invoke-WebRequest cmdlet.
The filtered results showed a series of PowerShell commands using -ExecutionPolicy Bypass combined with Invoke-WebRequest and -Uri parameters pointing at GitHub raw content URLs. The commands wrote output files into C:\ProgramData\, a writable directory that is commonly abused by malware droppers due to its permissive ACLs and relative inconspicuity.
This combination of indicators—PowerShell started under SYSTEM, execution policy override, web requests to external code repositories, and writes into ProgramData—aligned closely with known post-exploitation patterns, particularly staged payload delivery and tool transfer via legitimate system binaries.

<InlineGallery images={powershell-suspicious-web-request} title="PowerShell Suspicious Web Request Detection Workflow" />

## Analytics Rule Engineering in Microsoft Sentinel

After validating the hunting query, I operationalized it by converting it into a Scheduled Analytics Rule within Sentinel. From the Sentinel Analytics blade, I created a rule named “Samson – Powershell Suspicious Web Request”. The rule description explicitly documented its purpose: detecting PowerShell using Invoke-WebRequest on windows-target-1 to download remote scripts.
The rule was configured to run periodically against the Log Analytics workspace, inspecting a 24-hour window of DeviceProcessEvents for the characteristic pattern of powershell.exe commands embedding Invoke-WebRequest on windows-target-1. The rule threshold was set such that any matching activity would generate an alert and automatically open an incident, ensuring that even a single suspicious web request would be escalated for analysis.
Entity mapping was configured so Sentinel could build a rich graph during investigation. The AccountName field was bound to an Account entity, DeviceName to a Host entity, and the full ProcessCommandLine to a Process entity with a CommandLine identifier. This mapping allows Sentinel’s investigation experience to correlate which identity executed which command on which host without additional manual stitching by the analyst.
For threat modeling alignment, I tagged the rule with relevant MITRE ATT&CK techniques: script-based execution via command interpreter, and command-and-control style tool transfer over web protocols. These tags ensure that the detection fits cleanly into existing ATT&CK-based reporting and help with macro-level coverage analysis across the SOC detection portfolio.
As shown in the Sentinel dashboard, the final rule summary reflected a medium-severity analytic, enabled, running every four hours over the last day of telemetry, with automatic incident creation and event grouping into a single incident instance for each detection cycle.

<InlineGallery images={powershell-analytics-rule-engineering} title="Sentinel Analytics Rule Configuration for PowerShell Web Requests" />

## Simulated Adversary Execution and Alert Generation

To drive the detection end-to-end, I executed a controlled PowerShell command on windows-target-1 that mimicked an attacker staging secondary payloads. The command used Invoke-WebRequest with an execution policy bypass flag to pull a test script from a GitHub raw URL and write it into C:\ProgramData\eicar.ps1.
This activity immediately produced new DeviceProcessEvents entries reflecting the outbound HTTP request and file write. Shortly after the telemetry reached Sentinel, the analytics rule evaluated the data, matched the pattern, and raised an alert which Sentinel promoted to an incident. The incident list in Sentinel now showed a new entry titled “Samson – Powershell Suspicious Web Request” with a medium severity and an alert count of one, confirming that the analytic was functioning as designed.

## Incident Triage, Ownership, and Context Establishment

Opening the incident revealed a structured summary generated by Sentinel. The description explicitly stated that the detection was based on PowerShell using Invoke-WebRequest on windows-target-1 to download remote scripts. The evidence section enumerated the number of correlated events, and the tactics and techniques section reflected the Execution and Command and Control mappings defined during rule creation.
At this point, I transitioned from detection to analysis by assigning the incident to myself and updating its status from New to Active. This step is important in a SOC workflow because it establishes single-analyst ownership, preventing duplicated effort and enabling accurate tracking of investigation state.

<InlineGallery images={powershell-incident-triage} title="Sentinel Incident Triage and Ownership" />

## Graph-Based Investigation and Process Attribution

From the incident view, I launched the Sentinel Investigation experience. The investigation graph rendered an incident-centric view with windows-target-1 as the host node connected to several powershell.exe process nodes representing the suspicious executions observed. This graph confirmed that all the activity was localized to a single endpoint and a single process family, with no evidence of lateral movement at this stage.
Switching to the Entities view provided a tabular list of these process entities. Each entity displayed the full command line, including the Invoke-WebRequest with the GitHub URL and the -OutFile C:\programdata\eicar.ps1 directive. This made it trivial to reconstruct exactly what the system executed without having to pivot back into raw process logs. The commands were effectively performing a staged download of a script payload into ProgramData, consistent with malware dropper behavior, although in this lab the content was a benign EICAR-style test script.

## Execution Validation and Script Behavior Analysis

Detection of a download is only one part of the problem; a critical follow-up question is whether the downloaded content actually executed. To answer this, I performed targeted hunting in Sentinel over DeviceProcessEvents for PowerShell executions that referenced script filenames of interest in their command lines.
The analysis showed that three scripts eicar.ps1, portscan.ps1, and pwncrypt.ps1 were not only downloaded but also executed on windows-target-1. All executions occurred under the SYSTEM account, indicating that the scripts ran with the highest local privileges.
From a behavioral standpoint, these scripts represented different categories of malicious functionality in a real environment. The EICAR script is designed to trigger AV engines as a benign equivalent of malware. A port scanning script would typically be used for internal reconnaissance, attempting connections to multiple ports on remote hosts to map exposed services. A ransomware-style script such as pwncrypt.ps1 would normally handle bulk file enumeration and encryption operations. In the Cyber-Range context, these scripts simulated those behaviors without causing real damage, but the telemetry and incident artifacts were indistinguishable from an actual compromise from Sentinel’s point of view, which is ideal for training.

## Endpoint Containment and Host-Level Triage

With confirmation that privileged PowerShell scripts had executed, I shifted to the containment and eradication phase using Microsoft Defender for Endpoint. From the Defender device page for windows-target-1, I verified the endpoint’s overall exposure state, onboarded status, and last-seen telemetry time. The actions menu exposed multiple remote response operations, including device isolation and AV scanning.
To emulate a realistic incident response workflow, I initiated a Defender antivirus scan of the host and logically treated the device as isolated for the duration of the analysis. Isolation in a production environment would restrict the machine’s network communication to only the Defender cloud back end, cutting off any ongoing command-and-control channels or lateral movement while still allowing remote investigation.
The scan returned no additional malicious detections, which aligned with expectations for this lab where the payloads are intentionally benign. This result nonetheless validated that Defender’s scanning engine had full visibility into the files generated by the PowerShell scripts and that no other suspicious binaries or persistence mechanisms were present.

<InlineGallery images={powershell-investigation-containment} title="Investigation Deep Dive and Containment Actions" />

## Documentation, and Incident Closure

After completing technical analysis and simulated containment, I documented the entire incident directly within Sentinel’s Incident activity log. The summary described the detection source, the host involved, and the sequence of events from initial PowerShell web request through script execution. It explicitly noted that three scripts eicar.ps1, portscan.ps1, and pwncrypt.ps1 were both downloaded and executed under the SYSTEM account, and that they simulated malware, port scanning, and ransomware behavior but were confirmed to be benign lab artifacts. The actions taken section captured the verification via DeviceProcessEvents, the Defender antivirus scan on windows-target-1, and the final assessment that no real compromise occurred.
With analysis and documentation complete, I reclassified the incident as True Positive – Suspicious Activity, reflecting that the analytic correctly detected behavior that would be malicious in production, even though it was simulated in this lab environment. The incident status was moved from Active to Closed, and Sentinel recorded the final classification and comment history for future reference and tuning.

<InlineGallery images={powershell-closure-documentation} title="Incident Documentation and Closure" />

## Conclusion

This project demonstrated how tightly integrated telemetry and analytics between Microsoft Defender for Endpoint and Microsoft Sentinel enable fine-grained detection of script-based attacks that operate fully within native binaries like PowerShell. By leveraging DeviceProcessEvents as the authoritative source for process creation and command-line arguments, it is possible to identify subtle but high-fidelity signals such as execution policy bypass combined with outbound web requests and staged payload writes into high-risk directories.
The exercise also reinforced the value of Sentinel’s entity mapping and investigation graph. Automatically binding Account, Host, and Process entities allowed rapid reconstruction of who executed what, where, and how, without manual correlation of individual log records. Aligning the detection with MITRE ATT&CK techniques ensured that the rule fit logically into a broader detection engineering strategy and could be evaluated alongside other coverage in an ATT&CK-centric SOC program.
Finally, by following the NIST 800-61 lifecycle end-to-end verification of telemetry, detection engineering, alerting, triage, investigation, containment, and closure the scenario mirrored a real SOC workflow for handling PowerShell-based tool transfer and post-exploitation activity on an endpoint.

## Important Link

If you are interested in joining the [CYBER-RANGE COMMUNITY](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5) or following along with these labs, you can check it out here: [LINK](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5)

