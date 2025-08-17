---
title: "Project 4.7: TheHive & Cortex Deployment in My Cybersecurity Home Lab"
date: "2025-08-15"
description: "Deploying TheHive incident response platform and Cortex automated analysis engine in my segmented cybersecurity home lab for enhanced SOC workflow capabilities."
category: "blue"
series: "hardware-lab"
part: 7
image: "/images/projects/hardware-lab/The-Hive-and-Cortex.png"
tags: ["TheHive", "Cortex", "Incident Response", "SOC", "Docker", "Portainer", "Cassandra", "Elasticsearch", "Case Management", "Automated Analysis", "Blue Team", "Incident Management"]
---

## Project 4.7: TheHive & Cortex Deployment in My Cybersecurity Home Lab

### Overview

With the foundation of my segmented cybersecurity home lab steadily taking shape, the next step was to integrate an incident response and analysis layer. For this stage, I deployed TheHive and Cortex, two powerful, open-source tools designed for incident management, case collaboration, and automated analysis.

This build forms a critical part of my SOC workflow. TheHive serves as a centralized incident response platform, while Cortex allows for automated enrichment and analysis of observables. Together, they streamline investigations, improve collaboration, and create a more responsive detection and response cycle in my lab environment.

### Deployment Approach

While TheHive and Cortex can be installed directly on a Linux host or via automated scripts, I opted for a Docker-based deployment through Portainer for speed, maintainability, and container isolation. The process began with pulling the official Docker Compose configuration from TheHive documentation, which includes all required services. TheHive, Cortex, Cassandra, and Elasticsearch pre-configured to work together.

After logging into Portainer, I created a new stack, named it thehive-cortex, pasted in the full Docker Compose configuration, and deployed. Within minutes, the stack creation was successful, and the containers for all components were visible and running.

### Initial Configuration of TheHive

Accessing TheHive was straightforward navigating to my lab IP (10.10.30.100:9000) brought up the login page. Using the default credentials (admin@thehive.local / secret), I entered the admin console, where I began configuring the platform for my lab:

- Created a new organization for my lab environment, representing my segmented network.
- Added a dedicated admin user tied to my internal domain (samson.local), assigning full organization administrator rights.
- Configured a secure password and prepared the account for operational use.

While TheHive offers extensive options for branding, Cortex integration, and case templates, my priority at this stage was preparing the environment to receive alerts from Wazuh, my SIEM/XDR platform deployed earlier in Project 4.3.

<InlineGallery images={thehive-configuration} title="TheHive Initial Configuration and Organization Setup" />

### Cortex Setup

Cortex, accessible on port 9001, was initialized in a similar fashion, logging in with the admin account created earlier and verifying the platform's readiness for analyzer configuration. Cortex will eventually process observables from TheHive cases, performing automated enrichment through analyzers such as VirusTotal, MISP, and WHOIS lookups.

I held off on detailed analyzer configuration for now, as the immediate focus is ensuring proper alert ingestion from Wazuh into TheHive. This will allow me to establish a case-driven workflow where detection events trigger investigations that are enriched automatically via Cortex.

<InlineGallery images={cortex-setup} title="Cortex Platform Initialization and Configuration" />

### Next Steps in the Workflow

Once integration is complete, the workflow will look like this:

1. Wazuh detects a security event in my lab environment.
2. Alert is forwarded to TheHive, where it appears as a case or alert entry.
3. Cortex automatically enriches observables, providing intelligence for quicker triage.
4. Response actions are documented and executed directly from within TheHive.

This aligns with the SOC triage and investigation process used in real-world enterprise environments.

### Conclusion

<p class="mb-4 leading-relaxed">TheHive and Cortex deployment marks the second-to-last stage in the base build of my home lab. The final foundational stage will involve cloud expansion, where I will connect my lab to Azure via a site-to-site VPN. This will extend my testing capabilities, enabling hybrid cloud security monitoring and cross-environment threat detection.</p>

<p class="mb-4 leading-relaxed">Once integration between Wazuh, TheHive, and Cortex is fully operational, I will move into advanced detection engineering, creating adversary simulations in Caldera, monitoring network telemetry in Security Onion, and refining detection rules across my SOC toolchain.</p>

<p class="mb-4 leading-relaxed">This project demonstrates the practical implementation of enterprise-grade incident response tools in a home lab environment, showcasing how Docker-based deployments can simplify complex SOC tool integration while maintaining the flexibility needed for custom configurations and testing scenarios.</p>

<p class="mb-4 leading-relaxed"><strong class="font-semibold">Credits:</strong> This walkthrough is based on Episode 6 of the Ultimate Cybersecurity Lab YouTube series by Gerard O'Brien. While the core methodology followed his structure, the implementation was carried out independently by Samson Otori, with network addressing, VLAN assignments, and system configurations customized for my lab environment.</p>

<p class="mb-4 leading-relaxed">Here's a link to his YouTube channel:</p>

<p class="mb-4 leading-relaxed"><a href="https://www.youtube.com/watch?v=ej6iBrBqZEo" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Gerard O'Brien's Channel</a></p>
