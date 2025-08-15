---
title: "Project 4.6: Windows Server 2022 & Windows 10 Domain Integration in My Cybersecurity Home Lab"
date: "2025-08-08"
description: "Deploying Windows Server 2022 domain controller and integrating Windows 10 workstation into Active Directory domain within my segmented cybersecurity home lab."
category: "blue"
series: "hardware-lab"
part: 6
image: "/images/projects/hardware-lab/windows server.jpeg"
tags: ["Windows Server 2022", "Active Directory", "Domain Controller", "Windows 10", "DHCP", "DNS", "Group Policy", "VLAN", "Network Security", "Blue Team"]
---

## Project 4.6: Windows Server 2022 & Windows 10 Domain Integration in My Cybersecurity Home Lab

### Overview

In this stage of my cybersecurity home lab build, I focused on deploying a Windows Server 2022 domain controller and integrating a Windows 10 desktop into the domain. This step was crucial in establishing centralized authentication, DNS, DHCP, and Group Policy management within my segmented VLAN architecture. Following the structure of Gerard O'Brien's Building the Ultimate Cybersecurity Lab series, Episode 5, I adapted the process to fit my lab's unique VLAN assignments, IP addressing, and Proxmox-based virtualization environment. The result was a functional Windows Server Active Directory environment, complete with user accounts, security groups, DHCP migration, and automated drive mapping, all verified through a successful workstation domain join.

### Building the Windows Server 2022 Domain Controller

I began by provisioning a new virtual machine in Proxmox to host the domain controller. The VM was configured with Windows Server 2022 Standard (Desktop Experience) and allocated resources sufficient for Active Directory and supporting services. The network interface was connected to my vmbr0 bridge with VLAN 20 tagging to ensure isolation within the lab's network segmentation.

During installation, the Windows setup process initially failed to detect any storage devices. This was due to the absence of necessary VirtIO drivers in the Windows installation media. To resolve this, I attached an additional virtual CD-ROM containing the VirtIO ISO, loaded the appropriate viostor driver for Windows Server 2022, and proceeded with the installation once the 64GB virtual disk became visible.

After completing the installation and setting the initial administrator password, I confirmed that the server had obtained an IP address from my OPNsense firewall. I then reconfigured the NIC with a static IP of **10.10.20.10**, set the gateway to **10.10.20.254**, and assigned DNS to Google's public resolvers. The hostname was updated to Prod-DomainController and the server was rebooted to apply these changes.

With networking finalized, I launched Server Manager and used the "Add Roles and Features" wizard to install Active Directory Domain Services, DNS Server, and DHCP Server. The server was then promoted to a domain controller, creating a new forest with the domain name **samson.local** and a forest functional level set to Windows Server 2016.

<InlineGallery images={windows-server-deployment} title="Windows Server 2022 Domain Controller Deployment" />

### User and Group Configuration

Once Active Directory was operational, I opened Active Directory Users and Computers (ADUC) and created a security group named "Shared Folder Access," intended to control which users would automatically receive mapped network drives. I then created two accounts: a standard user account for workstation logins and a domain administrator account named SOAdmin, which was added to the Domain Admins group.

<InlineGallery images={user-group-configuration} title="User and Group Configuration in Active Directory" />

### Migrating DHCP from the Firewall to the Domain Controller

Prior to this stage, DHCP for VLAN 20 was provided by my OPNsense firewall. To consolidate network services within the domain, I logged into OPNsense, disabled DHCP on VLAN 20, and configured a new DHCP scope on the domain controller. The scope covered IP addresses from **10.10.20.100** to **10.10.20.120**, used a subnet mask of **255.255.255.0**, and specified the default gateway as **10.10.20.254**. The domain controller itself was designated as the primary DNS server. This migration ensured that devices on VLAN 20 would now obtain addressing directly from Active Directory-integrated DHCP.

<InlineGallery images={dhcp-migration} title="DHCP Migration from Firewall to Domain Controller" />

### Implementing Group Policy for Drive Mapping

To automate network drive assignments for authorized users, I used Group Policy Management to create a new GPO named "Map Network Drive." Under User Configuration → Preferences → Windows Settings → Drive Maps, I configured the policy to connect a G: drive to a shared folder on the domain controller. Item-Level Targeting was enabled so that only members of the "Shared Folder Access" security group would receive this mapping.

The shared folder itself was configured in the server's file system with full control permissions granted for the purposes of lab testing, acknowledging that in a production scenario, permissions would be far more restrictive.

<InlineGallery images={group-policy-drive-mapping} title="Group Policy Drive Mapping Configuration" />

<InlineGallery images={group-policy-configuration} title="Group Policy and DHCP Configuration" />

### Deploying and Joining the Windows 10 Workstation

The Windows 10 desktop was provisioned in Proxmox with a network interface on VLAN 20 to ensure DHCP and domain connectivity. As with the domain controller installation, the Windows 10 setup required VirtIO storage drivers, which were loaded from an attached VirtIO ISO before installation could proceed.

Following setup, I confirmed that the workstation received an IP address from the domain controller's DHCP service. I then joined the machine to the **Samson.local** domain by entering the domain name in the System Properties dialog and authenticating with the GEAdmin account. Upon reboot, the "Other User" option was used to log in with the standard domain account created earlier.

The login was successful, and as expected, the Group Policy applied automatically, mapping the G: drive to the shared folder on the domain controller. This confirmed that the domain join process was working correctly and that both DHCP and GPO-driven resource mapping were functioning as intended.

<InlineGallery images={windows-10-domain-join} title="Windows 10 Workstation Domain Integration" />

### Conclusion

<p class="mb-4 leading-relaxed">At this stage, my lab's Windows Server 2022 domain controller and Windows 10 workstation were fully integrated into a functioning Active Directory environment. The deployment included successful configuration of DNS and DHCP, migration of DHCP services from the firewall to the DC, creation of security groups and user accounts, and verification of Group Policy-based resource mapping.</p>

<p class="mb-4 leading-relaxed">This project demonstrates the practical challenges of deploying a Windows domain in a segmented lab network, including overcoming storage driver issues in Proxmox, ensuring proper IP configuration, and managing DHCP migration. These foundational services are now in place to support centralized authentication, resource access control, and further SOC tool integrations in later stages.</p>

<p class="mb-4 leading-relaxed">Stay tuned for the next stage of this project, where these Windows systems will be integrated with other monitoring and detection tools such as Wazuh, Security Onion, and Caldera, forming a complete security operations workflow within the lab.</p>

<p class="mb-4 leading-relaxed"><strong class="font-semibold">Credits:</strong> This walkthrough is based on Episode 5 of the Ultimate Cybersecurity Lab YouTube series by Gerard O'Brien. While the core methodology followed his structure, the implementation was carried out independently by Samson Otori, with network addressing, VLAN assignments, and system configurations customized for my lab environment.</p>

<p class="mb-4 leading-relaxed">Here's a link to his YouTube channel:</p>

<p class="mb-4 leading-relaxed"><a href="https://www.youtube.com/watch?v=ej6iBrBqZEo" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Gerard O'Brien's Channel</a></p>
