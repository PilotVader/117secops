---
title: "Part 5: Deploying Windows Server in the Cloud"
description: "Day 5 of the 30-Day MYDFIR SOC Analyst Challenge: Setting up a Windows Server instance in the cloud for security analysis."
date: "2024-03-23"
author: "Samson Otori"
tags:
  - "Windows Server"
  - "Cloud Security"
  - "Network Architecture"
  - "SOC"
  - "Security Analysis"
image: "/images/projects/30-day-soc-analyst-challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/Windows-server-image.png", "alt": "Windows Server Deployment" },
  { "src": "/images/projects/30-day-challenge/30-days-day-5.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 5" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 5
  totalParts: 30
---

## Day 5 of the 30-Day MYDFIR SOC Analyst Challenge: Deploying Windows Server in the Cloud.

Day 5 of the challenge focused on deploying a Windows Server instance in the cloud, with a particular emphasis on network security and architecture decisions. This setup would serve as a target machine for generating security logs and analyzing potential threats.

## Initial Setup and Network Architecture

I began by logging into my Vultr account and preparing to set up a new Windows Server instance. The first crucial decision involved determining whether to include this server in our previously configured Virtual Private Cloud (VPC). Our instructor provided valuable insights into network architecture, highlighting the importance of network segmentation and security.

## Security Considerations

The core concept we explored was network isolation and its role in security. By keeping the Windows Server separate from the VPC, we could better protect our internal network from potential threats. This isolation is particularly crucial because internet exposure increases the server's risk profile, and separation prevents lateral movement in case of compromise. It effectively reduces the overall attack surface and provides better damage control in case of a breach.

## Deployment Configuration

With these security considerations in mind, I proceeded with the deployment. I deployed the server outside the VPC, configuring it without private IP address space connection. The server was set up with public IP access only, and I accessed it through Vultr's console. This configuration aligned with our security-first approach to the deployment.

## Remote Access Setup

The next critical step was configuring Remote Desktop Protocol (RDP) access. I exposed RDP to the internet for remote management, fully acknowledging the increased attack surface this would create. This setup was intentional, as it would allow the server to generate security logs from various access attempts. After configuration, I verified that RDP functionality was working as expected.

## Next Steps

The server is now operational and will begin accumulating logs from various access attempts. These logs will be crucial for analyzing unauthorized access attempts, identifying potential threats, and developing security monitoring strategies. This data will form the foundation for our future analysis exercises.

## Conclusion

This day's work established a crucial component of our security lab - a Windows Server instance that will generate real-world security logs. The careful consideration of network architecture and security implications provided valuable insights into enterprise security practices. In the next session, I'll be configuring a Fleet Server to enhance our lab's endpoint management capabilities.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=nBlCuLMq-zA&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=32)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)* 