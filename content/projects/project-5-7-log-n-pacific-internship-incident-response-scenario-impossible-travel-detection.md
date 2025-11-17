---
title: "Project 5.7: LOG(N) Pacific Internship – Incident Response Scenario: Impossible Travel Detection with Microsoft Sentinel"
description: "Analysing identity-based threat scenarios through impossible travel detection in Microsoft Sentinel, evaluating Azure AD authentication patterns, and executing full incident response following NIST 800-61 guidelines."
date: "2025-11-15"
author: "Samson Otori"
client: "Personal Project"
challenge: ""
solution: ""
results: []
category: "blue"
tags: ["Blue Team", "Cloud", "Incident Response", "Microsoft Sentinel", "Azure AD", "Entra ID", "Identity Security", "SOC Operations", "KQL", "Impossible Travel", "Geographic Detection"]
image: "/images/projects/impossible-travel-detection.jpg"
technologies: ["Microsoft Sentinel", "Azure AD", "Entra ID", "KQL", "Identity Security"]
series:
  name: "Project 5.7: LOG(N) Pacific Internship – Incident Response Scenario: Impossible Travel Detection with Microsoft Sentinel"
  order: 7
---

## Introduction

During this stage of my internship with LOG(N) Pacific, I focused on analysing an identity-based threat scenario centred around impossible travel detection within Microsoft Sentinel. Unlike host-level attacks that rely on endpoint telemetry, this scenario evaluates authentication patterns across Azure AD (Entra ID) and identifies logon behaviour that violates physical or policy-defined geographic constraints.

The objective of this project was to design and deploy a Sentinel analytics rule capable of detecting Azure sign-ins occurring from two or more distinct geographic regions within a short time window. This behaviour is often indicative of account compromise, unauthorized VPN usage, policy violations, or malicious session hijacking. Following detection, I executed a full investigation in Sentinel, pivoted through SigninLogs, validated the user's activity pattern, documented findings, and closed the incident in accordance with NIST 800-61.

## Baseline Reconnaissance & Understanding the Dataset

Before creating the detection logic, I validated that the environment was ingesting Azure identity telemetry correctly. The SigninLogs table served as the foundational dataset for this scenario, capturing every successful authentication event alongside its geographic metadata, including:

1. City
2. State
3. Country or region
4. User Principal Name
5. Azure AD User ID
6. Timestamp

Running the initial baseline query confirmed that the workspace was receiving steady, high-volume identity logs. From this point forward, the environment was ready for rule development.

<InlineGallery images={impossible-travel-query-results} title="Baseline Query Results for Impossible Travel Detection" />

## Creating the Impossible Travel Analytics Rule

Using the verified telemetry, I proceeded to create a scheduled analytics rule in Sentinel to detect suspicious multi-region authentication patterns.

### General Configuration

I titled the rule "Samson – Potential Impossible Travel", clearly identifying ownership and purpose. The description highlighted the behavioural deviation the rule intends to capture: single-user sign-ins from multiple distinct geographic locations within seven days, suggesting VPN abuse or account compromise. I mapped this activity to relevant MITRE ATT&CK tactics, including Credential Access and Initial Access.

<InlineGallery images={impossible-travel-analytics-rule} title="Analytics Rule General Configuration for Impossible Travel Detection" />

### Rule Logic – Evaluating Geographic Divergence

Within the rule logic section, I inserted the KQL used earlier in the Log Analytics workspace. The query analyses the SigninLogs table, enumerating distinct geographic regions per user.

Although the same query produced valid output in Log Analytics, the Scheduled Query UI initially highlighted the parsing of JSON fields. The parsing behaviour can sometimes be CPU expensive, but since the dataset was small and the function was already tested, I implemented it without further modification.

Query scheduling was configured as follows:

1. Run frequency: every 4 hours
2. Lookup period: last 7 hours
3. Trigger threshold: more than 0 results
4. Suppression enabled: stop running after the first alert within 24 hours

### Entity Mappings – Normalizing Identity for Investigation

For Sentinel to stitch together entities in the investigation graph, I configured entity mappings for:

1. Account → AadUserId (UserId)
2. Account → DisplayName (UserPrincipalName)

This allowed Sentinel to normalize authentication activity and map events, alerts, and users efficiently.

## Rule Deployment & Validation

After verifying that all configuration sections passed validation, I deployed the rule. Sentinel immediately began evaluating historical data using the configured parameters.

## Triggering the Alert

Once the rule was active, I logged into Azure from a separate VM located in a different geographic region (East US). This generated the required multi-region sign-in pattern, allowing the analytics rule to fire.

Shortly afterward, a new incident appeared in Sentinel under Threat Management → Incidents.

<InlineGallery images={impossible-travel-rule-configuration} title="Rule Configuration, Deployment, and Incident Creation" />

## Investigating the Impossible Travel Incident

Opening the incident revealed two distinct accounts and multiple sign-in events associated with widely separated geographic regions. The overview pane provided:

1. The first alert timestamp
2. Two mapped identity entities
3. Severity classification: Medium
4. MITRE mappings
5. The associated analytics rule

I then assigned the incident to myself, moving it into Active status to begin the analysis stage.

## Graph-Level Correlation & Behavioural Patterning

Launching the investigation graph offered a visual representation of how the entities, alerts, and the detection rule were linked. Although this scenario did not include device involvement, the correlation graph still provided a clean mapping between the alert logic and the identities involved.

<InlineGallery images={impossible-travel-incident-investigation} title="Incident Investigation and Graph Analysis" />

## Deep-Dive: Validating Multi-Region Logons

The next step was manual validation. I pivoted back into Log Analytics and executed a user-targeted KQL query to enumerate all sign-ins associated with the impacted user identities within the 7-day threshold.

### User A Analysis

User A displayed a pattern of authentication across two geographically distant regions:

1. Barton-Upon-Humber (United Kingdom)
2. Boydton, Virginia (United States)

This transition could be legitimate depending on corporate policy, travel, or approved remote work. The travel gap was realistic and not indicative of compromise.

### User B Analysis

User B showed an even more interesting pattern:

1. Da Nang, Vietnam
2. Tokyo, Japan
3. Miami, Florida, United States

These regions spanned multiple continents within short time intervals. While this can occur through VPN chaining or cloud-based infrastructure, it exceeds what would typically be considered business-as-usual authentication behaviour.

However, for this training lab environment, these patterns are expected and benign.

<InlineGallery images={impossible-travel-user-analysis} title="User Signin Pattern Analysis and Incident Closure" />

## Documenting Findings in the Incident

I added a final analyst comment summarizing the investigation:

"Final Review: The detection surfaced multiple multi-region authentication instances across two user accounts. After reviewing SigninLogs for both identities, the behaviour was determined to be benign and consistent with expected lab activity. No evidence of account compromise or malicious lateral movement was identified. Incident classified as Benign Positive."

This aligned with the NIST 800-61 guidelines for the Post-Incident Activity phase, ensuring all evidence and reasoning were preserved in the incident timeline.

## Closing the Case

With analysis complete and no malicious indicators identified, I closed the incident as a Benign Positive, finalizing the response cycle for this identity-centric investigation.

## Conclusion & Reflections

This project reinforced the importance of identity telemetry in cloud-focused SOC workflows. Unlike endpoint attacks, identity-based threats require a deep understanding of authentication geography, session behaviour, user patterns, and environmental norms. Microsoft Sentinel's ability to correlate geographic data across SigninLogs and build entity relationships through analytics rules made it possible to identify anomalies rapidly and evaluate them with precision.

The exercise highlighted how behavioural analytics, even when triggered by benign conditions, can surface valuable insights into user activity patterns. More importantly, it emphasised the significance of establishing strong baselines, understanding normal authentication geography, and using KQL to validate identity anomalies before making any containment decisions such as disabling accounts or enforcing geo-fencing.

## Important Link

If you are interested in joining the [CYBER-RANGE COMMUNITY](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5) or following along with the labs, you can check it out here: [LINK](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5)

