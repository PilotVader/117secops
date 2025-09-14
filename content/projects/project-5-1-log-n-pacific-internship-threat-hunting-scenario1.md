---
title: "Project 5.1: LOG(N) Pacific Internship: Threat Hunting Scenario 1"
client: "Personal Project"
description: "A comprehensive threat hunting exercise investigating devices accidentally exposed to the internet, using Microsoft Defender for Endpoint and Microsoft 365 Security suite to analyze brute-force attempts and validate unauthorized access."
date: "2025-09-14"
author: "Samson Otori"
image: "/images/projects/microsoft defender image.jpeg"
technologies: ["Microsoft Defender for Endpoint", "Microsoft 365 Security", "Advanced Hunting Queries", "MITRE ATT&CK", "Threat Hunting", "Incident Response"]
category: "blue"
tags: ["Blue Team", "Threat Hunting", "Microsoft Security", "Incident Response", "Brute Force Analysis", "Security Investigation", "MDE"]
series:
  name: "Project 5.1: LOG(N) Pacific Internship: Threat Hunting Scenario 1"
  part: 1
  totalParts: 1
---

# Introduction

As part of my continuous threat hunting practice, I conducted a scenario using Microsoft Defender for Endpoint (MDE) and the Microsoft 365 Security suite. The objective was to investigate devices that may have been unintentionally exposed to the public internet, assess potential brute-force attempts, and determine whether unauthorized access occurred.

For this exercise, I worked with a VM in my environment, `nick-test-vm-md`, and the account of interest was `nick-labuser`. This project demonstrates my ability to use advanced hunting queries, analyze telemetry, apply the MITRE ATT&CK framework, and document findings in a professional format.

## Scenario Overview

### Context

During routine maintenance, the security team was tasked with investigating any VMs in the shared services cluster (DNS, Domain Services, DHCP, etc.) that were mistakenly exposed to the internet. The goal was to:

- Identify misconfigured VMs exposed to the public internet
- Investigate brute-force login attempts or successes
- Validate whether unauthorized access took place
- Document findings, map them to MITRE ATT&CK TTPs, and propose improvements

## Investigation Process and Findings

### Internet-Facing Device Check

The first step was to verify which devices were exposed to the internet. Using MDE's DeviceInfo table, I confirmed that the VM `nick-test-vm-md` had been internet-facing for several days.

----------------------

```kql
DeviceInfo
| where DeviceName == "nick-test-vm-md"
| where IsInternetFacing == true
| order by Timestamp desc


----------------------

**Result**: Confirmed that nick-test-vm-md was indeed internet-facing, which posed a significant security risk.

<InlineGallery images={internet-facing-device-investigation} title="Internet-Facing Device Investigation Process" />

### Failed Login Attempts Analysis

Next, I investigated failed login attempts to identify potential brute-force attacks targeting the exposed VM.

----------------------

```kql
DeviceLogonEvents
| where DeviceName == "nick-test-vm-md"
| where LogonType has_any("Network", "Interactive", "RemoteInteractive", "Unlock")
| where ActionType == "LogonFailed"
| where isnotempty(RemoteIP)
| summarize Attempts = count() by ActionType, RemoteIP, DeviceName
| order by Attempts desc


----------------------

**Findings**: Multiple bad actors attempted to log into nick-test-vm-md from various external IP addresses, indicating clear evidence of brute-force attempts.

<InlineGallery images={brute-force-analysis} title="Brute Force Attack Analysis" />

### Validation of Brute Force Success Attempts

To determine if any of the persistent attackers succeeded, I checked whether the top malicious IPs were able to gain unauthorized access.

----------------------

```kql
let RemoteIPsInQuestion = dynamic(["84.38.185.58","91.203.60.30", "171.254.92.66", "14.169.16.183", "185.243.96.107", "102.88.21.213", "62.60.136.105"]);
DeviceLogonEvents
| where LogonType has_any("Network","Interactive","RemoteInteractive","Unlock")
| where ActionType == "LogonSuccess"
| where RemoteIP has_any(RemoteIPsInQuestion)


----------------------

**Result**: No successful logons were found from any of the malicious IP addresses.

<InlineGallery images={malicious-ip-validation} title="Malicious IP Validation Analysis" />

### Account-Specific Analysis

I then focused on the legitimate account nick-labuser to analyze its authentication patterns.

#### Failed Logons for nick-labuser

----------------------

```kql
DeviceLogonEvents
| where DeviceName == "nick-test-vm-md"
| where LogonType == "Network"
| where ActionType == "LogonFailed"
| where AccountName == "nick-labuser"
| summarize count()


----------------------

**Result**: 0 failed logon attempts for the `nick-labuser` account, making brute-force success unlikely.

<InlineGallery images={account-failed-logons} title="Account Failed Logons Analysis" />

#### Successful Logons for nick-labuser

----------------------

```kql
DeviceLogonEvents
| where DeviceName == "nick-test-vm-md"
| where LogonType == "Network"
| where ActionType == "LogonSuccess"
| where AccountName == "nick-labuser"
| summarize LoginCount = count() by DeviceName, ActionType, AccountName, RemoteIP


----------------------

**Findings**: 18 total successful logons, all from consistent, legitimate IP addresses with no signs of compromise.

<InlineGallery images={account-successful-logons} title="Account Successful Logons Analysis" />

## Analysis

### Key Findings

1. Device Exposure: The VM nick-test-vm-md was confirmed to be internet-facing for several days
2. Brute Force Activity: Clear evidence of multiple failed login attempts from external malicious IPs
3. No Successful Compromise: Despite persistent attacks, no unauthorized access was achieved
4. Legitimate Account Security: The nick-labuser account showed no signs of compromise with 18 successful logons from legitimate IPs

### Security Assessment

Though nick-test-vm-md was internet-facing and subjected to clear brute-force attempts, there is no evidence of successful brute force or unauthorized access:

1. The legitimate account nick-labuser showed 18 successful logins, all from valid IPs
2. No failed logons were associated with nick-labuser
3. No malicious IPs were able to gain access

## MITRE ATT&CK Framework Mapping

This investigation identified several relevant MITRE ATT&CK techniques:

1. T1190 – Exploit Public-Facing Application: The internet-facing VM represented a potential attack vector
2. T1078 – Valid Accounts: Legitimate logons by nick-labuser demonstrated normal account usage
3. T1110 – Brute Force: Multiple failed attempts from external IPs constituted brute-force attacks
4. T1587.001 – Develop Capabilities: Exploit Code: Inference from multiple bad actors attempting access suggests organized attack attempts

## Response Recommendations

If this were a real enterprise environment, the following actions should be implemented:

1. Network Security: Restrict inbound access via Network Security Groups (NSGs) to only trusted IPs
2. Multi-Factor Authentication: Enforce MFA on critical accounts such as nick-labuser
3. Account Lockout Policy: Implement an account lockout policy to prevent unlimited login attempts
4. Continuous Monitoring: Monitor failed login telemetry continuously for early detection

## Improvement & Reflection

### Lessons Learned

1. VM Hardening: Strengthen VM hardening by default to avoid unnecessary public exposure
2. Query Efficiency: Improve efficiency of hunting queries by pre-building templates for repeated use
3. Investigation Workflow: Enhance investigation workflow with automated enrichment of IP reputation and geolocation

### Professional Development

This threat hunting exercise demonstrates the process of validating whether an exposed VM has been compromised. Even though nick-test-vm-md was subject to persistent brute-force attempts, proper analysis confirmed no successful intrusion.

Regular hunts like this not only uncover potential misconfigurations but also build proactive defense habits, mapping every finding against MITRE ATT&CK to ensure structured threat coverage.

## Conclusion

This scenario provided valuable hands-on experience with enterprise-grade security tools and real-world threat hunting methodologies. The systematic approach to investigation, from initial discovery through detailed analysis and documentation, mirrors the processes used in professional SOC environments.

The successful identification and analysis of the brute-force attempts, combined with the validation that no compromise occurred, demonstrates the importance of thorough investigation and proper security controls. This experience reinforces the value of continuous monitoring, proper network segmentation, and the application of structured frameworks like MITRE ATT&CK in cybersecurity investigations.
