---
title: "Project 6.4: Agent-Based Vulnerability Monitoring on Linux with Tenable Nessus Agent"
description: "This project demonstrates the deployment and configuration of a Tenable Nessus Agent on an Ubuntu Linux VM in Azure. It covers agent group creation, valid trigger configuration, installation via command line, and troubleshooting of trigger file mismatches."
date: "2025-12-05"
author: "Samson Otori"
client: "Personal Project"
category: "blue"
tags: ["Vulnerability Management", "Tenable", "Nessus Agent", "Linux", "Ubuntu", "Agent-Based Scanning", "Azure", "Host Security"]
image: "/images/projects/project-6-4/Agent-Based Vulnerability Monitoring on Linux with Tenable Nessus Agent.png"
technologies: ["Tenable Vulnerability Management", "Nessus Agent for Linux", "Azure", "Ubuntu Linux", "Bash"]
---

## 1. Provisioning the Linux Virtual Machine

The first phase involved creating the Ubuntu 22.04 VM in Azure. I deployed the machine inside my designated Resource Group, using password authentication for the lab.

Once the deployment completed, Azure displayed the successful provisioning confirmation for the Linux VM.

<InlineGallery images={linux-agent-vm-deploy} title="Linux VM Deployment Complete" />

## 2. Creating the Linux Agent Group in Tenable

With the VM ready, I logged into the Tenable Vulnerability Management portal and navigated to:

**Settings → Sensors → Nessus Agents → Agent Groups**

Here, I created a dedicated group named for this project to ensure the agent would be linked correctly once installed. Agent groups help Tenable associate incoming agent traffic with the appropriate scan configuration.

<InlineGallery images={linux-agent-group} title="Linux Agent Group Created" />

## 3. Configuring the Trigger-Based Agent Scan

Next, I created the scan that will be executed by the agent itself.

The scan type used was Basic Agent Scan, with the scan mode set to Triggered Scan instead of interval-based scanning. Triggered scans activate only when a specific file appears inside the agent’s trigger directory.

I initially planned to use the recommended filename `dishsoap.lol`, but changed it later during troubleshooting. The final and correct trigger filename was `write.txt`.

<InlineGallery images={linux-agent-scan-config} title="Linux Agent Scan Trigger Configured" />

## 4. SSH Access to the Linux VM

I connected to the VM using SSH from my machine:

<CyberTerminalCodeBlock
  code={`ssh labuser@<public-ip>`}
  title="SSH Connection"
  language="bash"
/>

Authentication succeeded and I gained shell access to begin the installation.

<InlineGallery images={linux-agent-ssh} title="SSH Logged Into Linux VM" />

## 5. Retrieving and Editing the Nessus Agent Installation Command

Inside the Tenable portal, I selected:

**Settings → Sensors → Nessus Agents → Add Nessus Agent**

I copied the Linux installation command, which is a curl instruction that pulls down the installation script and configures the agent using my unique key and group assignment.

<InlineGallery images={linux-agent-install-cmd} title="Copying Linux Agent Install Command" />

Before running it, I opened a local editor (Notepad) to modify the command:

*   I removed the `name=` parameter so the agent would use the VM’s hostname.
*   I inserted the correct `groups=` value matching my Linux agent group.

<InlineGallery images={linux-agent-install-edit} title="Edited Linux Agent Install Command" />

## 6. Installing the Nessus Agent on Linux

Back on the VM, I elevated to a root shell:

<CyberTerminalCodeBlock
  code={`sudo -I`}
  title="Elevate Privileges"
  language="bash"
/>

Then I pasted the edited command.
The installation began immediately, fetching the agent package, validating the key, registering it with the Tenable cloud, and linking it.

<InlineGallery images={linux-agent-installation} title="Linux Agent Installation In Progress" />

When the agent finished linking successfully, Tenable confirmed that the agent was healthy and connected.

<InlineGallery images={linux-agent-install-success} title="Linux Agent Installation Successful" />

## 7. Locating the Trigger Directory on the Linux VM

Tenable agents on Linux monitor the following folder for trigger files:

<CyberTerminalCodeBlock
  code={`/opt/nessus_agent/var/nessus/triggers`}
  title="Trigger Directory Path"
  language="bash"
/>

I navigated to this directory using:

<CyberTerminalCodeBlock
  code={`cd /opt/nessus_agent/var/nessus/triggers`}
  title="Navigate to Directory"
  language="bash"
/>

<InlineGallery images={linux-agent-trigger-dir} title="Linux Trigger Directory Located" />

## 8. Creating the Trigger File — Debugging a Critical Mistake

Initially, I used the filename `write.txt`, thinking it matched my scan configuration.
However, the scan was actually configured for `start.txt` earlier during setup.

Because the filenames did not match, the agent ignored the file completely.
The file remained inside the directory and never disappeared, meaning the scan would never trigger.

<InlineGallery images={linux-agent-trigger-mistake} title="start.txt Trigger File Created" />

After reviewing the screenshots and the scan settings, I realized the mismatch.
I deleted the incorrect file, corrected the scan configuration, and recreated the correct trigger file in the directory.

The file finally disappeared after the agent detected it.

<InlineGallery images={linux-agent-trigger-fixed} title="Trigger File Disappeared" />

This disappearance is Tenable’s confirmation that the agent has begun the local vulnerability assessment.

## 9. Verifying Linux Agent Registration in Tenable

Once the agent received the trigger, it linked properly to Tenable and showed up under:

**Settings → Sensors → Nessus Agents**

This is a key diagnostic step because if the agent does not appear here, it will never send results.

<InlineGallery images={linux-agent-portal} title="Linux Agent Appearing in Portal" />

## 10. Reviewing the Completed Linux Agent Scan Results

After some time (typically 20–40 minutes depending on workload), the triggered scan populated with detailed vulnerability findings.

The agent-based assessment identified multiple risks including critical kernel vulnerabilities, outdated system libraries, and compliance deviations.

<InlineGallery images={linux-agent-results} title="Linux Scan Summary Completed" />

The results included full plugin-level detail.

<InlineGallery images={linux-agent-vuln-list} title="Linux Vulnerability List Populated" />

Compliance audit results were also included for system posture evaluation.

<InlineGallery images={linux-agent-compliance} title="Linux Compliance - Host Audits" />

Finally, I exported the agent scan as CSV for reporting and archival.

<InlineGallery images={linux-agent-export} title="Exporting Linux Scan Results" />

**📄 Exported Results File:**
`agent-samson-linux-os-11_23_2025_-14_46_57-gmt.csv`

## 11. Conclusion

This project demonstrated the full deployment lifecycle of a Tenable Nessus agent on a Linux virtual machine, including group assignment, triggered scanning, endpoint monitoring, and troubleshooting. Compared to Windows agents, the Linux workflow is more command-line oriented but follows the same principles of registration, linking, local execution, and remote reporting.

The debugging experience with the incorrect trigger filename (`write.txt`) was particularly valuable. It reinforced the importance of aligning scan configuration values with agent-side trigger actions. A single character mismatch will stop the entire scan pipeline.

The final scan results confirmed that the agent was functioning correctly and able to identify OS-level vulnerabilities, package-related weaknesses, and compliance deviations, illustrating how agent-based scanning provides accurate coverage even for isolated hosts.

This project extends my hands-on capability with enterprise vulnerability management and completes the parallel workflow to the Windows agent deployment.

## Important Link

If you are interested in joining the [CYBER-RANGE COMMUNITY](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5) or following along with the labs, you can check it out here: [LINK](https://www.skool.com/cyber-range/about?ref=b6e2c83b43e243d2b690aa6ea6c383b5)
