---
title: "Project 6.3: Agent-Based Monitoring on Windows 11 Using Tenable Nessus Agents"
description: "This project focuses on implementing agent-based vulnerability assessment on a Windows 11 host using the Tenable Nessus Agent. The assessment involves deploying a VM, linking it to Tenable, configuring a triggered scan, and validating vulnerability reporting."
date: "2025-11-28"
author: "Samson Otori"
client: "Personal Project"
category: "blue"
tags: ["Vulnerability Management", "Tenable", "Nessus Agent", "Windows 11", "Agent-Based Scanning", "Azure", "Host Security"]
image: "/images/projects/project-6-3/Agent-Based Monitoring on Windows 11 Using Tenable Nessus Agents.png"
technologies: ["Tenable Vulnerability Management", "Nessus Agent", "Azure", "Windows 11", "PowerShell"]
---

## 1. Introduction

This project focuses on implementing agent-based vulnerability assessment on a Windows 11 host using the Tenable Nessus Agent. Unlike authenticated and unauthenticated network scans, the Nessus Agent performs local, host-based analysis, making it ideal for remote or mobile workforce environments where traditional scanning may not be viable.

The assessment involves deploying a Windows 11 VM in Azure, linking the VM to Tenable through an agent installation script, configuring an agent group and a triggered scan, and finally validating that the agent successfully reports host vulnerabilities back to Tenable Vulnerability Management.

## 2. Windows 11 VM Deployment

A Windows 11 Pro virtual machine was provisioned within Azure using a unique username and strong password. Once deployed, the VM is visible in Azure’s control plane, confirming that the operating system, networking, and public IP were successfully assigned.
<InlineGallery images={nessus-agent-vm-deploy} title="Windows 11 VM Deployment" />

Firewall protections were disabled temporarily to avoid interference with the agent’s registration and communication with Tenable.
<InlineGallery images={nessus-agent-firewall} title="Firewall Disabled on VM" />

## 3. Preparing Tenable for Agent-Based Scanning

After logging into Tenable Vulnerability Management:
<InlineGallery images={nessus-agent-dashboard} title="Tenable Dashboard Logged In" />

An **Agent Group** was created to logically isolate Windows 11 agents for scanning and reporting. This ensures all triggered scans target only the assets assigned to this group.
<InlineGallery images={nessus-agent-group} title="Agent Group Created" />

Next, a **Basic Agent Scan** was configured. Instead of using a scan window, the setup used a triggered scan, meaning the local agent initiates the assessment only when a specified file (in this case, `start.txt`) appears in the agent’s trigger directory.
<InlineGallery images={nessus-agent-scan-config} title="Agent Scan Config (Triggered)" />

This method simulates real enterprise workflows where security teams may programmatically trigger host scans without relying on network reachability.

## 4. Installing the Nessus Agent on Windows 11

To link the VM to Tenable, the agent installation command was retrieved from:
**Settings → Sensors → Nessus Agents → Add Nessus Agent**

The platform-specific PowerShell installer string was copied.
<InlineGallery images={nessus-agent-install-cmd} title="Nessus Agent Install Command" />

Before running it, the command was edited in Notepad to populate the correct agent group and remove unnecessary parameters.
<InlineGallery images={nessus-agent-install-edit} title="Edited Agent Install Command" />

Running the script in an elevated PowerShell window initiated the download and installation of the Nessus Agent. The VM then successfully linked to the Tenable cloud infrastructure.
<InlineGallery images={nessus-agent-installation} title="Agent Installation Progress" />

## 5. Triggering the Local Scan

Once the agent was installed, the next step was to navigate to the Windows 11 trigger directory:
`C:\ProgramData\Tenable\Nessus Agent\nessus\triggers`

Initial attempts produced navigation errors because of spacing in the folder name (“Nessus Agent”). After correcting the path using quotes, the correct directory was reached:
<InlineGallery images={nessus-agent-trigger-dir} title="Trigger Directory Located" />

The trigger file `start.txt` was created inside this directory using:

<CyberTerminalCodeBlock
  code={`New-Item -Name start.txt -ItemType File`}
  title="PowerShell Trigger Creation"
  language="powershell"
  prompt="PS C:\ProgramData\Tenable\Nessus Agent\nessus\triggers>"
/>

<InlineGallery images={nessus-agent-trigger-file} title="Trigger File Created" />

Once created, the file remained briefly before being automatically deleted by the Nessus Agent—confirmation that the agent detected the trigger and launched a local vulnerability scan.

## 6. Agent Registration and Scan Completion

Shortly after the trigger file was consumed, the Windows 11 VM appeared under **Settings → Sensors → Nessus Agents** with a status of **Online** and **Healthy**, confirming a successful agent deployment and registration.
<InlineGallery images={nessus-agent-portal} title="Agent Listed in Portal" />

Approximately 30–60 minutes later, Tenable populated the vulnerability data associated with the host and marked the scan as completed.
<InlineGallery images={nessus-agent-summary} title="Scan Summary Completed" />

## 7. Vulnerability Findings and Technical Interpretation

Once processed, Tenable reported nine distinct vulnerabilities affecting the Windows 11 machine. Although the number is small, each issue highlights configuration flaws or outdated software components typically found in newly deployed systems.
<InlineGallery images={nessus-agent-severity} title="Severity Breakdown" />

The findings included a mix of high, medium, and low severity issues:

1. **High-severity** issues were mainly associated with missing security updates for Microsoft Outlook, Teams, and Windows validation mechanisms. These vulnerabilities indicate unpatched components that could be exploited for privilege escalation or remote code execution.
2. **Medium-severity** findings involved deprecated TLS versions and invalid or self-signed certificates. These findings reflect protocol weaknesses rather than software defects, signaling the need for strengthened cryptographic policies.
3. **Low-severity** findings involved ICMP timestamp responses and minor Teams update issues, typically not immediately exploitable but still relevant for overall security posture hardening.

<InlineGallery images={nessus-agent-vuln-list} title="Vulnerability List Populated" />

In addition to vulnerabilities, Tenable recorded a set of compliance-driven audit failures from Windows 11 DISA STIG policies. These audits flagged non-compliant configurations, such as outdated password policies or firewall rules, that would require administrative remediation to align with enterprise or government security standards.
<InlineGallery images={nessus-agent-compliance} title="Compliance Failures" />

The combination of vulnerability and audit data demonstrates the strength of agent-based scanning: full system-level visibility without requiring traditional network access or firewall exceptions.

## 8. Exporting the Host Assessment

Finally, an export of the full host-asset record was generated in CSV format for offline review and archival.
<InlineGallery images={nessus-agent-export} title="Exporting Scan Results" />

**Exported file:**
`/mnt/data/host-asset-samson-windows-11_23_2025_-09_06_24-gmt.csv`

## 9. Conclusion

This project successfully demonstrated the deployment and operation of Tenable’s Nessus Agent for host-based vulnerability scanning on a Windows 11 system. By using a triggered scan model and linking the agent to a designated agent group, vulnerability data was collected reliably without direct network scanning.

The process showcased several key strengths of agent-based scanning:

1. It is unaffected by firewalls or network segmentation.
2. It provides deep OS-level visibility, ideal for mobile or remote assets.
3. It integrates seamlessly with Tenable’s compliance and audit frameworks.

These capabilities make Nessus Agents a critical component of a modern enterprise vulnerability management strategy, especially in distributed, cloud-centric environments.

## Important Link

If you are interested in joining the [CYBER-RANGE COMMUNITY](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5) or following along with the labs, you can check it out here: [LINK](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5)
