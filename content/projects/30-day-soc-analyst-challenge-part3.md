---
title: "Part 3: Setting up Elastic Search"
description: "Day 3 of the 30-Day MYDFIR SOC Analyst Challenge: Setting up your own Elastic Search instance for foundational security analysis."
date: "2024-11-03"
author: "Samson Otori"
tags:
  - "Elastic Search"
  - "Vultr"
  - "Cloud"
  - "SOC"
  - "Security Analysis"
image: "/images/projects/Mydfir 30 day challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/30-days-day-3.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 3" },
  { "src": "/images/projects/30-day-challenge/Elasticsearch-Installation.png", "alt": "Elasticsearch Installation" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 3
  totalParts: 30
---

# Day 3 of the 30-Day MYDFIR SOC Analyst Challenge: Setting up Elastic Search

## Overview

The focus for today was on setting up my own Elastic Search instance, following practical steps to build a foundational environment for security analysis.

## Cloud Environment Setup

First, I signed up on Vultr, a cloud service provider, which was used to create a Virtual Private Cloud (VPC) network. To avoid connectivity issues, I ensured that all resources, including virtual machines (VMs), were in the same location as my VPC. For instance, I created the VPC in Manchester, so I deployed my VM in the same region.

After configuring my VPC, I deployed a server on Vultr with Ubuntu as the operating system. The server had 4 virtual CPUs and 16 GB of RAM to run Elastic Search. I opted out of unnecessary features like auto-backups and IPv6, keeping the setup streamlined, I then associated the VM with my VPC network to ensure it could communicate internally.

## Elastic Search Installation

Next, I accessed the server via SSH, using PowerShell to connect to my VM through its public IP address. Inside the VM, I updated the repositories and installed Elastic Search. During the installation, I was provided with critical security information, including a password for the built-in superuser account. I stored this information securely for future reference.

## Security Configuration

One essential step was configuring Elastic Search to be accessible beyond the local host. By modifying the network settings in the elasticsearch.yml configuration file, I allowed remote access from my SOC analyst laptop, making sure it was securely configured.

To tighten security, I created a firewall group in Vultr, limiting access to only trusted IP addresses, in this case, I gave access to my IP alone. This ensured that only authorized connections could reach the Elastic Search instance.

## Final Steps

Finally, I started the Elastic Search service and confirmed it was running smoothly. This marked the completion of setting up the Elastic Search instance, laying the groundwork for the next step—configuring Kibana, the visualization tool for Elastic Search.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=ypXARA5Uk4I&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=30)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #MYDFIRChallenge #HandsOnExperience #Day3 