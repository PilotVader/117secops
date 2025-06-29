---
title: "Segmenting My Cybersecurity Homelab Using VLANs"
description: "A detailed walkthrough of implementing VLAN segmentation in my cybersecurity homelab using OPNsense, Cisco switches, and Proxmox for better traffic control and security isolation."
date: "2025-06-29"
author: "Samson Otori"
tags:
  - "VLAN"
  - "Network Segmentation"
  - "OPNsense"
  - "Cisco Switch"
  - "Proxmox"
  - "Infrastructure"
  - "Homelab"
image: "/images/projects/hardware-lab/home-lab-image.jpeg"
images: [
  { "src": "/images/projects/hardware-lab/home-lab-image.jpeg", "alt": "Homelab Overview" }
]
series:
  name: "Project 4.1: VLANs Segmentation In My Homelab"
  part: 1
  totalParts: 1
category: "Infrastructure"
---

## Segmenting My Cybersecurity Homelab Using VLANs

After completing the initial build of my cybersecurity homelab, I knew the next big milestone was network segmentation. I wanted to separate my environment into distinct VLANs for better traffic control, improved security, and a more organized deployment of my tools and virtual machines. The concept was simple in theory, separate traffic logically while maintaining complete control from a single pane.

My initial spark for this came from Gerard O'Brien, whose breakdown of homelab network segmentation introduced me to the idea of creating isolated VLANs for each category of devices or services. It made perfect sense: isolate your security tools, isolate vulnerable machines, isolate test environments, all while routing through a central firewall. Along the way, I hit several roadblocks. That's where Koroma Tech came in. His YouTube series covered VLAN segmentation using OPNsense, Cisco switches, and Proxmox, the exact gear I had. His breakdown helped untangle many of the issues I ran into and became an invaluable guide during troubleshooting.

## Initial Vision

I began with a vision of building an enterprise-style segmented lab. The goal was to use OPNsense as my central router and firewall, Proxmox to host all VMs, and a Cisco switch to trunk the VLANs across the environment. I planned four main VLANs:

A VLAN for security tools, which would house platforms like Wazuh and TheHive. A separate VLAN for vulnerable machines, which I could target with Kali Linux and test detection pipelines. Another VLAN would be reserved for a Windows environment, where I could simulate real endpoints and domain controllers. Finally, I wanted a VLAN for Docker containers, to explore containerized security tools and microservices.

All of this was connected by a Cisco SG500X-24 switch, a Proxmox server with multiple bonded NICs, and an OPNsense firewall running on a dedicated thin client. Internet was shared into the lab via Ethernet from a laptop using a Wi-Fi uplink, serving as a temporary ISP connection.

## Configuring the Cisco Switch

The first step was to configure VLANs on the Cisco switch. Inside the VLAN Management interface, I created VLANs 1 (default), 5, 10, 20, and 30. I used port GE1 as the trunk port connected to the Proxmox server and port GE2 as the uplink to the OPNsense firewall.

Trunking configuration was critical. GE1 needed to be tagged for VLANs 5, 10, 20, and 30. This would allow Proxmox to forward VLAN-tagged traffic into the switch and out toward the firewall. Cisco switches, however, require each port to have one untagged VLAN. I initially attempted to remove all untagged VLANs but was met with an error. It turns out VLAN 1 must remain as the untagged VLAN by default. I left it in place and tagged the rest.

Ports assigned to VM-specific devices were configured as access ports, tagged only for their respective VLANs. For example, GE5 might be an access port for VLAN 20 (Windows), and GE6 for VLAN 10 (Kali Linux).

## VLAN Interface Setup in OPNsense

On the OPNsense firewall, the VLAN interfaces were built on top of the physical NIC (RE2) connected to the Cisco switch. For each VLAN, I created a corresponding virtual interface, such as RE2_vlan20 for VLAN 20, and then assigned it inside the OPNsense GUI.

Each VLAN interface was given a static IP address, for example, 10.10.20.1/24 for VLAN 20, and a DHCP server was configured to assign IPs within that range. I added basic allow-all rules in the firewall for each VLAN subnet to ensure traffic could flow during testing. One misstep I encountered was related to firewall rules: DHCP leases weren't being issued at first, and I later discovered that a deny rule was taking precedence above my allow rule. Once I reordered them, DHCP worked flawlessly.

## Bridging and Bonding in Proxmox

This was one of the trickiest parts of the build. My Proxmox server had three network interfaces, enp10s0, enp9s0, and enp6s0, which were originally bonded into a single interface, bond0. This bond0 wasn't attached to vmbr0, my default Linux bridge, which wasn't VLAN-aware.

Inspired by Koroma Tech's video, I thought I needed to separate one NIC and create a new Linux bridge, vmbr1, for the VLANs. I detached enp6s0 from the bond and attached it to vmbr1. This led to chaos: Proxmox VMs could no longer reach the internet, static IPs weren't being assigned, DHCP requests failed, and the web interface became intermittently unreachable. I had to access the server via shell and manually fix /etc/network/interfaces. A simple ifreload -a command even took the network down temporarily.

The realization hit after consulting Koroma Tech and rewatching his video (Thanks for his response): I never needed a second bridge. The original vmbr0, was to be made to point to bond0, and that would have been perfectly capable of handling VLAN-tagged traffic, provided the VLAN-aware checkbox was enabled, which I eventually did. So I reverted everything. I re-added enp6s0 to the bond, reset the bridge to vmbr0, and things began to work.

## Assigning VLANs to VMs in Proxmox

With vmbr0 correctly configured, the next step was assigning VLAN tags to the VMs. In each VM configuration, I went to Hardware → Network Device, edited the NIC, and added the VLAN tag that matched the desired segment. For instance, the Windows VM was given VLAN 20, Kali got VLAN 10, and my Docker VM received VLAN 30.

Once this was done, I rebooted the VMs and ran ipconfig or ifconfig to verify the network settings. To my satisfaction, each VM pulled the correct IP address from its respective VLAN subnet, configured on OPNsense and trunked through the Cisco switch.

## The Debugging Journey

I ran into every possible issue: Proxmox network down, static IP not picked, DHCP not working, OPNsense not receiving traffic, and even Cisco switch ports refusing certain configs. I spent hours running packet captures on OPNsense to see if DHCP DISCOVER packets were even hitting the firewall, in many cases, they weren't, due to tagging or misassigned switch ports.

It wasn't until I fully understood how each layer, Proxmox, the switch, and OPNsense, handled tagged traffic that things started to align. The concept of trunk ports, access ports, tagging at the VM level, VLAN-aware bridges, and proper interface assignment all had to be in perfect harmony.

## Conclusion

This project pushed me. I'm proud of how it turned out, not just because everything is now working, but because I truly understand the system I built. VLANs are no longer just theory to me. I've lived the chaos, the packet loss, the empty DHCP leases, and the recovery.

Massive thanks to Gerard O'Brien for the foundational inspiration and to Koroma Tech for the actionable guidance and video breakdowns that helped me debug when things went south. He even took time to respond to my messages, and that helped keep me grounded.

If you're reading this and planning to segment your own lab: take it slow, understand each component, and know that breaking things is part of the journey. My next steps will be building services like Wazuh, TheHive, and Arkime inside their respective VLANs, and expanding the lab even further, now with a proper backbone in place.

Credits: This project was independently implemented by Samson Otori, with conceptual inspiration from Gerard O'Brien and valuable technical guidance from Koroma Tech, whose content and support were instrumental in shaping and troubleshooting the VLAN segmentation setup.

Here's a link to their YouTube channels:
- [Gerard O'Brien's Channel](https://www.youtube.com/@techwithgerard)
- [Koroma Tech Channel](https://www.youtube.com/@KoromaTech)

---

**Tags:** #VLAN #NetworkSegmentation #OPNsense #CiscoSwitch #Proxmox #Infrastructure #Homelab #Cybersecurity #NetworkSecurity #Virtualization #Firewall #DHCP #Trunking #AccessPorts #VLANAware #NetworkConfiguration #SecurityTools #WindowsEnvironment #KaliLinux #DockerContainers 