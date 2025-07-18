---
title: "Upgrade 1: Installing a 4TB SATA Hard Drive in My Proxmox Server"
description: "A detailed walkthrough of expanding Proxmox VE storage with a 4TB SATA drive, including troubleshooting detection issues and proper system integration."
date: "2025-07-18"
author: "Samson Otori"
tags:
  - "Proxmox"
  - "Storage"
  - "Hardware"
  - "SATA"
  - "Linux"
  - "System Administration"
  - "Troubleshooting"
  - "Infrastructure"
  - "Homelab"
image: "/images/projects/hardware-lab/20250712_133828.jpg"
images: [
  { "src": "/images/projects/hardware-lab/20250712_133903.jpg", "alt": "4TB SATA hard drive installation process" },
  { "src": "/images/projects/hardware-lab/20250712_133922.jpg", "alt": "Hardware connection verification" },
  { "src": "/images/projects/hardware-lab/20250712_141335.jpg", "alt": "System detection troubleshooting" },
  { "src": "/images/projects/hardware-lab/20250712_133957.jpg", "alt": "Drive mounting and configuration" },
  { "src": "/images/projects/hardware-lab/20250712_141450.jpg", "alt": "Final system integration" },
  { "src": "/images/projects/hardware-lab/New 4 TB HArd drive.png", "alt": "New 4TB hard drive overview" }
]
series:
  name: "Upgrade 1: Installing a 4TB SATA Hard Drive in My Proxmox Server"
  part: 1
  totalParts: 1
category: "Infrastructure"
---

## Installing a 4TB SATA Hard Drive in My Proxmox Server

### Overview

To expand my Proxmox VE bare-metal server's storage, I installed a 4TB SATA 3.5" hard drive. Although the hardware was correctly connected, the drive initially failed to appear in Proxmox or in the system's disk utilities. This write-up documents how I diagnosed and resolved the issue.

### Initial Symptoms

After physically installing the drive with both SATA power and data cables connected to the motherboard, the system did not detect the disk. Tools like `lsblk`, `fdisk -l`, and the Proxmox GUI showed no sign of it.

Despite this, the drive was powered—audibly spinning—and `dmesg` logs showed that SATA link negotiation occurred at 6.0 Gbps. However, there was no device registered as `/dev/sdX`, suggesting a failure in initialization.

### Diagnostic Process

I confirmed the SATA cable and power lines were functional by testing them with other working drives. Swapping ports on the motherboard yielded no change. BIOS settings were inspected to confirm that AHCI mode was enabled and that all SATA ports were active.

I then tested the drive using a USB-to-SATA adapter. While a smaller 2.5" drive was successfully detected through the adapter, the 3.5" drive failed to power up correctly—implying insufficient power delivery via USB.

### Resolution

A full system reboot with the drive plugged into a known-good SATA port allowed proper detection. Upon restart, the disk appeared in `fdisk -l` and `lsblk` as `/dev/sdX`.

With the device now detected, I wiped previous signatures using `wipefs -a`, then formatted it using `mkfs.ext4`. I mounted the drive under `/mnt/4tbdrive` and added the appropriate entry to `/etc/fstab` for persistence.

### Conclusion

This issue highlighted how a drive may appear to function at the hardware level while still failing OS-level detection due to incomplete initialisation. A simple reboot can often trigger proper enumeration. It's a reminder to combine physical verification with system-level diagnostics and to never overlook the importance of full reboots in hardware troubleshooting.

### CREDIT

This project was independently researched, designed, and implemented by me, Samson Otori, as part of my hands-on journey in cybersecurity.

---

**Tags:** #Proxmox #Storage #Hardware #SATA #Linux #SystemAdministration #Troubleshooting #Infrastructure #Homelab #HardwareUpgrade #StorageExpansion #ProxmoxVE #BareMetal #DiskManagement 