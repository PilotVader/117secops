---
title: "Project 6.2: LOG(N) Pacific Internship – Windows 11 Compliance Scanning Using a Custom Tenable Scan Template"
description: "In this project, I built a custom Tenable scan template tailored specifically for Windows 11 DISA STIG compliance auditing. This report captures the full execution, from VM preparation to customized scan engineering, as well as an in-depth analysis of the results."
date: "2025-11-25"
author: "Samson Otori"
client: "Personal Project"
category: "blue"
tags: ["Vulnerability Management", "Tenable", "Windows 11", "Compliance Scanning", "DISA STIG", "Azure", "Configuration Auditing"]
image: "/images/projects/project-6-2/hq720.jpg"
technologies: ["Tenable Vulnerability Management", "Azure", "Windows 11", "DISA STIG", "Networking"]
---

Enterprise vulnerability management extends far beyond detecting CVEs. Mature security programs also assess configuration baselines, hardening standards, and compliance requirements, especially in environments governed by frameworks such as DISA STIG, CIS Benchmarks, or NIST 800-53.

In this project, I built a custom Tenable scan template tailored specifically for Windows 11 DISA STIG compliance auditing. After deploying a new Windows 11 virtual machine in Azure, I intentionally misconfigured several system components to ensure that the compliance engine would flag them. I then used the custom scan template to perform a full vulnerability and compliance evaluation.

This report captures the full execution, from VM preparation to customized scan engineering, as well as an in-depth analysis of the results returned by Tenable.

## 1. Preparing the Windows 11 Virtual Machine

The project began with deploying a Windows 11 VM in Azure. Once the machine was provisioned successfully, its dashboard confirmed the VM was active and ready for configuration.
<InlineGallery images={win11-deployment} title="Windows 11 VM Deployment Completed" />

### Firewall Disabled for Testing

To ensure Tenable could communicate with the VM without restrictions, I disabled all Windows Firewall profiles. This mimics an unprotected system and allows Tenable to interact over every port during compliance checks.
<InlineGallery images={win11-firewall} title="Firewall Disabled" />

### Intentional Misconfigurations Created

To generate meaningful compliance failures, I introduced several weaknesses:

1. Enabled the built-in Administrator account and assigned it the weak password: `password`
2. Enabled the Guest account and elevated it to the **Administrators** group

These actions violate several DISA STIG rules by weakening access control, removing password complexity standards, and enabling unnecessary privileged accounts.
<InlineGallery images={win11-misconfigurations} title="Account Misconfigurations" />

## 2. Azure Network Configuration

To make the VM reachable by Tenable’s internal engine, I allowed all inbound traffic at the NSG level. Although unsafe for production, this was required for unrestricted scanning in a controlled lab environment.
<InlineGallery images={win11-network} title="Azure Network Configuration" />

## 3. Building the Custom Tenable Scan Template

Within Tenable, I logged into the dashboard and accessed the scan template builder. Unlike the previous projects where I used built-in templates, this time I created a fully customized Advanced Network Scan template tailored for Windows 11 compliance auditing.
<InlineGallery images={win11-tenable-dashboard} title="Tenable Dashboard Logged In" />

### Template Configuration (Basic, Discovery, Assessment)

I enabled **Remote Registry**, administrative shares, and the **Server service**, three requirements for deep inspection of Windows hosts.

The **Discovery** tab was configured for fast host detection and TCP port scanning. The **Assessment** tab was configured for thorough testing, with Tenable allowed to attempt default credentials to simulate attacker behavior.
<InlineGallery images={win11-template-config} title="Template Configuration" />

### Credentials & Compliance Audit Pack

I added valid Windows credentials so Tenable could authenticate against the VM.

Next, I attached the **DISA Microsoft Windows 10 STIG audit pack** (the most compatible pack for Windows 11 at the time), enabling Tenable to evaluate the VM against federal compliance standards.
<InlineGallery images={win11-creds-compliance} title="Credentials and Compliance Audit" />

The template was saved and ready for use.

## 4. Running a Scan Using the Custom Template

A new scan was created using the template and pointed at the VM’s private IP address. After verification, the scan was launched.
<InlineGallery images={win11-scan-execution} title="Scan Execution and Summary" />

Once completed, Tenable generated a comprehensive vulnerability and compliance report.

## 5. Analysis of Scan Results

This project produced one of the most detailed Tenable results so far. With authenticated access and DISA STIG auditing enabled, Tenable performed deep OS interrogation, uncovering both security vulnerabilities and strict compliance failures.

### Overall Findings

The scan reported:

1. **1 Critical** vulnerability
2. **15 High**
3. **23 Medium**
4. **2 Low**
5. **Over 140 compliance failures** based on DISA STIG rules

This volume is significantly higher than in earlier projects because compliance auditing inspects far more than CVEs. It evaluates password policies, account security, registry settings, banner configurations, audit policies, and system hardening requirements.

### Key Compliance Failures
<InlineGallery images={win11-compliance-failures} title="Compliance Failures Overview" />

Several findings directly corresponded to the intentional misconfigurations:

1. The **Guest account** being enabled and given administrative privilege triggered multiple STIG failures.
2. The **Administrator account** using a weak password violated password strength, reuse, and history requirements.
3. Password complexity, minimum age, maximum age, and history values all failed because Windows 11 had default or weak configurations.
4. The legal banner settings were absent, causing additional failures in the interactive logon audit checks.
5. Registry and audit policies associated with STIG standards did not match required baselines.

These failures reflect real-world enterprise hardening issues, where even small misconfigurations can violate federal or regulatory compliance standards.

### Vulnerability Plugins & System Weaknesses
<InlineGallery images={win11-remediation} title="Remediation Suggestions" />

Tenable also flagged several operating system vulnerabilities tied to outdated components. Many of these can be remediated simply by:

1. Installing cumulative Windows Updates
2. Updating system components
3. Enforcing password policy changes
4. Disabling unnecessary built-in accounts

The remediation summary revealed that some actions, such as applying Windows Defender security updates, could resolve multiple findings at once, a core benefit of Tenable’s remediation engine.

## 6. Exporting the Final Results

Both the compliance and vulnerability details were exported as a PDF Executive Summary for documentation.
<InlineGallery images={win11-export} title="Exporting Scan Results" />

**PDF — Full Scan Result**
File: `/mnt/data/Win11-DISA-STIG-Template_gqrk32.pdf`

## 7. Conclusion

This project demonstrated how Tenable’s template-based scans can be customized to enforce strict security baselines. Unlike traditional vulnerability scanning, compliance scanning focuses on configuration drift, misalignment with policies, and systemic weaknesses that attackers exploit after they gain initial access.

By combining authenticated scanning with DISA STIG audit checks, Tenable provided a high-fidelity, enterprise-grade evaluation of the Windows 11 system. The volume of findings reflected both intentional vulnerabilities and the natural gaps present in a fresh Windows installation.

This exercise reinforced an important principle in vulnerability management:

**Vulnerabilities reveal what is broken; compliance reveals what is missing.**

Mature security requires both.

This project continues the Vulnerability Management series within the LOG(N) Pacific Internship, deepening my practical experience with Tenable, Azure, Windows hardening, and enterprise-scale compliance auditing.

## Important Link

If you are interested in joining the [CYBER-RANGE COMMUNITY](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5) or following along with the labs, you can check it out here: [LINK](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5)
