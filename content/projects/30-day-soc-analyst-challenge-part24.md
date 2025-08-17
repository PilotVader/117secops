---
title: "Part 24: Setting Up and Configuring OS Ticket"
description: "Day 24 of the 30-Day MYDFIR SOC Analyst Challenge: Deploying and configuring OS Ticket on a Windows Server for efficient SOC alert management."
date: "2024-11-24"
author: "Samson Otori"
tags:
  - "OS Ticket"
  - "XAMPP"
  - "SOC"
  - "Security"
  - "Windows Server"
image: "/images/projects/Mydfir 30 day challenge.png"
images: [
  { "src": "/images/projects/30-day-challenge/1-30-days-day-24.png", "alt": "30 Days MYDFIR SOC Analyst Challenge Day 24" },
  { "src": "/images/projects/30-day-challenge/2-Screenshott.png", "alt": "Server Deployment Configuration" },
  { "src": "/images/projects/30-day-challenge/3-Screenshot.png", "alt": "XAMPP Installation and Setup" },
  { "src": "/images/projects/30-day-challenge/4-Screenshot.png", "alt": "OS Ticket Installation Process" },
  { "src": "/images/projects/30-day-challenge/5-Screenshot.png", "alt": "OS Ticket Configuration" }
]
series:
  name: "Project 3: 30-Day MYDFIR SOC Analyst Challenge"
  part: 24
  totalParts: 30
---

## Day 24 of the 30-Day MyDFIR SOC Analyst Challenge: Setting Up and Configuring OS Ticket

## Overview

On Day 24 of the 30-Day MyDFIR SOC Analyst Challenge! I'll dive into OS Ticket, a ticketing system that will be an essential tool for my SOC operations. The aim is to set up OS Ticket successfully and configure it on a Windows Server. This system will streamline ticket management for the alerts we'll deal with throughout the challenge. Let's get started!

## Deploying the Server

The first step in setting up OS Ticket is to deploy a server. I used Vulture for this process, selecting "Cloud Compute" with a shared CPU and Windows Server 2022. The server specifications don't need to be too powerful; I chose 1 CPU and 2 GB of memory. After selecting a location and setting up firewall configurations, the server was ready for Remote Desktop Protocol (RDP) access.

## Setting Up the Web Server

Once connected to the server, I installed XAMPP, a free and open-source cross-platform web server solution. XAMPP makes it easy to set up Apache, MySQL, and PHP, all necessary for OS Ticket to function. After downloading XAMPP, I configured it by:

- Changing the Apache domain name to my server's public IP address
- Modifying the phpMyAdmin configuration to ensure secure access from my SOC analyst laptop

## Configuring Firewall Rules

Before moving further, I created inbound firewall rules for ports 80 and 443. This ensures that only authorized devices can access the web server. With XAMPP running, I started both the Apache and MySQL services and verified that everything was configured correctly.

## Installing OS Ticket

Next, I downloaded OS Ticket from their official site, choosing the latest stable version. After extracting the files, I moved them to the XAMPP htdocs folder to be served by the Apache server. Once the web server was up and running, I accessed the OS Ticket setup page, which prompted me to configure the system. This included:

- Renaming configuration files
- Setting up a MySQL database for OS Ticket to store data

## Finalizing the Installation

With the database created and the necessary configurations in place, the final step was to run the OS Ticket installation. After entering admin details and configuring the database connection, the OS Ticket was successfully installed. I also ensured file permissions were properly set for security.

## Conclusion

With this system, I'll be able to manage SOC alerts efficiently. Up next, I'll explore how to integrate OS Ticket with my tech stack so that alerts automatically generate tickets.

Here's the link to follow along: [30-Day MYDFIR SOC Analyst Challenge](https://www.youtube.com/watch?v=xgxQuLL33oU&list=PLG6KGSNK4PuBWmX9NykU0wnWamjxdKhDJ&index=51)

*Credit: This project was originally created by the MYDFIR YouTube channel. All structure and content was inspired by MYDFIR. Check his channel out: [@MyDFIR](https://www.youtube.com/@MyDFIR)*

#CyberSecurity #SOCAnalyst #OSSTicket #MyDFIRChallenge #Day24 