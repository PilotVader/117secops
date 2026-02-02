---
title: "Snowflake Customer Data Breaches: How Stolen Credentials Led to Mass Data Exposure"
date: "2026-02-02"
excerpt: "An analysis of the mid-2024 identity-centric campaign that targeted Snowflake customer environments, highlighting the shift toward identity as the new perimeter."
author: "Samson Otori"
category: "Incidents"
image: "/images/blog/snowflake-breach-2024/header.jpg"
tags: [
  "Data Breach",
  "Cloud Security",
  "Snowflake",
  "Identity Security",
  "MFA",
  "Incident Analysis",
]
readTime: 10
---

## Introduction: When One Compromise Becomes Many

In mid-2024, the cybersecurity community observed not just one catastrophic
breach, but over 150 organisations reporting an identity-centric campaign that
targeted vulnerabilities in how their Snowflake environments were configured and
accessed. What made this incident significant wasn't just the number of victims,
but the pattern it revealed. It was credential theft at scale, exploiting a
fundamental weakness that defenders have struggled with for years: identity is
the new perimeter.

The Snowflake customer data breaches matter because it illustrates how a common
failure pattern across organisations, can scale into systemic harm across the
cloud ecosystem. Junior and mid-level SOC analysts, blue-team engineers, and
hiring managers evaluating incident analysis capability should view this as a
case study in identity misuse, cloud shared responsibility misunderstanding, and
detection shortfalls.

This post breaks down what happened, how stolen credentials enabled widespread
data exposure, where detection failed, and what SOC teams must learn to prevent
similar incidents.

<div class="my-10">
  <img src="/images/blog/snowflake-breach-2024/breach-pattern.jpg" alt="One Compromise, Many Breaches: The Snowflake Pattern" class="w-full h-auto rounded-xl shadow-lg border border-slate-200 dark:border-slate-800" />
  <p class="text-center text-sm text-slate-500 mt-4 italic">A single stolen credential enabled access to over 150 Snowflake customer environments, demonstrating how identity has become the critical attack surface.</p>
</div>

<br>

### Incident Overview

[Snowflake](https://www.snowflake.com/en/resources/learn/snowflake-security-hub/) is a cloud-native data warehousing and analytics platform used globally by enterprises to store and process large volumes of structured and unstructured data. Organisations deploy Snowflake instances to serve business analytics, customer information, and operational reporting.

According to a report by
[The Register](https://www.theregister.com/2024/05/31/snowflake_breach_report),
Mandiant notified a victim whose Snowflake instance had been compromised by a
threat actor identified as UNC5537, using credentials previously stolen via
infostealer malware sometime in May, 2024. This initial discovery quickly
expanded into a much broader campaign. On 22nd May 2024, upon obtaining
additional intelligence identifying a broader campaign targeting additional
Snowflake customer instances, Mandiant immediately contacted Snowflake and began
notifying potential victims.

The incident was not due to a breach of the Snowflake service itself, but
through the use of legitimate credentials belonging to users at those
organisations. Investigations traced each observed intrusion back to stolen
usernames and passwords that were valid at the time of login. Snowflake and
incident responders confirmed that no vulnerability within Snowflake's
infrastructure was exploited.

As reported by
[CRN](https://www.crn.com/news/security/2024/more-than-2-million-people-impacted-in-snowflake-related-attack),
the critical failure point across nearly all affected organisations was the
absence of Multi-Factor Authentication (MFA) on the compromised accounts.
Without this second layer of defence, possessors of stolen credentials were able
to log in directly to customer environments with legitimate privileges.

Once authenticated, the attackers executed queries to exfiltrate substantial
volumes of data. The scale was significant, affecting over a hundred
organisations and involving terabytes of sensitive data, leading to high-profile
extortion attempts.

The threat actor, UNC5537, enumerated user roles, session IDs, and schemas, then
exfiltrated data from databases. The stolen data was then published on
cybercrime forums or used as leverage to extort victim companies. Ticketmaster,
Santander Bank and Advance Auto Parts are among the known impacted
organisations, with some reporting exposure of millions of customers' personal
records.

<br>

### The Initial Access Vector: Stolen Credentials & Identity Abuse

<div class="my-10">
  <img src="/images/blog/snowflake-breach-2024/flow-chart.jpg" alt="How stolen credentials bypass traditional defences" class="w-full h-auto rounded-xl shadow-lg border border-slate-200 dark:border-slate-800" />
  <p class="text-center text-sm text-slate-500 mt-4 italic">Flow chart illustrating how stolen credentials bypass traditional defences in the absence of MFA.</p>
</div>

According to
[Cybernews](https://cybernews.com/security/data-heist-affecting-165-snowflake-customers-mandiant/),
the attack chain began long before attackers ever touched Snowflake. The users
had been infected with infostealer malware that harvested credentials from user
devices over an extended period via several infostealer malware variants,
including Vidar, Risepro, Redline, Racoon Stealer, Lumma and Metastealer.

These malware families scrape stored usernames and passwords from browsers or
local password vaults and funnel them back to cybercriminal marketplaces. These
stolen credentials then circulated on dark web forums for years and were still
valid at the time of exploitation.

From a defensive perspective, this represents the worst-case scenario, since the
success of this vector relied on the premise that a correct username and
password equal a legitimate user. In environments without enforced MFA, this
premise is fatally flawed.

From a network perspective, the attacker's traffic appeared harmless. It used
standard encrypted protocols (HTTPS) to connect to a legitimate public-facing
SaaS endpoint. Traditional perimeter controls, such as firewalls or standard IDS
signatures designed to catch exploit traffic, were rendered irrelevant because
the attack was simply a successful login.

This is a demonstration that in cloud-native environments, identity is the new
attack surface, not just an authentication check, but the gateway to all data
the identity can reach.

<br>

### Detection Gaps: Why the Activity Went Unnoticed

This campaign exposed several visibility and detection gaps. Because the
attacker used valid credentials, traffic appeared to originate from authentic
user logins rather than flagged as abnormal. Without MFA logs or conditional
access events, there were few red flags in native authentication telemetry.
Organisations frequently lacked monitoring for:

- Anomalous login behaviour (logins from novel locations or at odd times)
- Suspicious data access patterns (massive exports or unusual query volumes)
- Elevated read privileges being exercised by identities that seldom performed
  such tasks.
  ([Cybernews](https://cybernews.com/security/data-heist-affecting-165-snowflake-customers-mandiant/))

Traditional security controls focus on preventing unauthorised access,
firewalls, intrusion detection, and endpoint protection. When access is
authorised but abused, those controls provide no visibility. Detection must
shift to behaviour, anomaly identification, and data access monitoring.

<br>

### Incident Response Challenges in Cloud & SaaS Environments

Responding to these breaches posed unique operational hurdles.

- **Shared responsibility created confusion about who owns what.** Snowflake
  operates under a shared security model where customers manage access controls,
  whilst Snowflake secures infrastructure, creating critical blind spots where
  customers assumed Snowflake handled threat detection, whilst Snowflake relied
  on clients to implement MFA and monitor credentials. During the incident
  response, this ambiguity delayed coordinated action. Customers waited for
  Snowflake to provide indicators of compromise. Snowflake waited for customers
  to implement recommended security controls. Neither party had complete
  visibility into the full attack surface.
- **Log availability was another concern**, as many customers did not retain
  logs long enough to reconstruct the attacker's activities, complicating
  remediation timelines.
- **Coordinating response across cloud provider channels**, multiple affected
  tenants and internal stakeholders also slowed containment. Legal and
  communications teams were further challenged by the difficulty in definitively
  proving what data was taken, complicating breach notification timelines.

<br>

### Lessons Learned for SOC and Security Teams

The Snowflake breaches provide clear, actionable lessons for defensive security
teams.

1. Identity must be treated as a crown-jewel asset: credentials are the keys to
   everything.
2. Organisations cannot treat MFA as optional; it should be enforced universally
   and shown in logs that it is actually in use.
3. Detection strategies must evolve beyond simple rule-based trigger points to
   include behavioural analytics, identifying anomalies in data access and query
   patterns even when identities are legitimate.
4. Data access monitoring is as important as system access. Organisations also
   need proactive rotation policies, credential-exposure monitoring, and fast
   revocation of leaked credentials. Data access monitoring requires
   instrumentation, logging infrastructure, and analytical capability, but it's
   the only way to detect authorised users abusing their access.
5. Detection speed directly drives damage control. Early alerts on risky
   sign-ins or anomalous access patterns can drastically shorten attacker dwell
   time.

<br>

### How This Incident Reflects a Broader Trend

The Snowflake customer breaches represent a larger shift in adversary tactics.
Rather than relying on zero-day exploits or complex malware, attackers
increasingly hunt for legitimate access paths they can abuse. Identity-based
attacks, credential theft, token theft, and session replay have become dominant
because they bypass many traditional perimeter defences. A single weak control
can cascade into widespread compromise across organisations using the same SaaS
platform.

<br>

### Conclusion

The series of Snowflake customer data compromises was not a hack of the
Snowflake platform; it was a failure of identity controls across customer
tenants. Stolen credentials and weak authentication allowed threat actors to
masquerade as legitimate users, evade detection and exfiltrate data at scale.

For SOC teams and security engineers, the takeaway is simple: enforce strong
identity controls, invest in behavioural and data-centric detection, and assume
attackers will come through valid authentication channels. Future cloud security
incidents will likely follow this identity-first pattern, and defenders must
adapt accordingly.
