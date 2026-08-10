---
title: SideScreen
description: Turn an Android tablet into a low-latency second display for macOS over USB-C or WiFi
order: 1
---

# SideScreen

**[tranvuongquocdat/SideScreen](https://github.com/tranvuongquocdat/SideScreen)**

## Overview

SideScreen turns an Android tablet into a genuine extended display for macOS — drag windows onto it, touch to interact — over USB-C or WiFi, filling a gap Apple's Sidecar leaves for Android devices.

## What is it?

A two-part app: a Swift macOS client and a Kotlin Android client, connected over ADB (USB-C) or WiFi with QR-code pairing. It streams a virtual display using hardware-accelerated H.265 encoding, aiming for sub-30ms frame delivery, with HiDPI/Retina rendering and touch-latency compensation. It is not related to AI video generation — it's a screen/display-extension productivity tool.

## Why use it?

Android tablets are common but Apple's Sidecar only supports iPads. SideScreen fills that gap for anyone who already owns an Android tablet and wants a second screen — including a "headless Mac" mode for a portable workstation with no built-in display attached.

## Installation

- **macOS**: download the `.dmg` from GitHub Releases, drag SideScreen into Applications. If macOS flags it as damaged: `sudo xattr -cr /Applications/SideScreen.app`
- **Android**: install the `.apk` (enable "Unknown sources" if needed)
- **Requirement**: `brew install --cask android-platform-tools` (for ADB, USB mode)
- Needs macOS 13+, Android 8.0+ with H.265 decode support

## Basic Usage

- **USB mode**: connect the tablet via USB-C, launch the app on both devices, tap Connect on the tablet.
- **Wireless mode**: generate a QR code on the Mac, scan it with the tablet; it auto-reconnects afterward.
- **Headless mode**: enable auto-start in Settings so streaming begins on login, useful for a Mac with no monitor attached.

## Key Features

- USB-C (minimal latency) and WiFi (QR-pairing) connectivity
- True extended display, not mirroring — drag windows naturally
- Hardware-accelerated H.265 encoding, sub-30ms target latency
- Touch input with latency compensation
- HiDPI/Retina rendering
- Gaming Mode: 120 FPS, 1 Gbps bitrate
- Headless Mac support (auto-start streaming on login)

## Top 5 Use Cases

- Extending a laptop's workspace using a spare Android tablet
- Driving a headless Mac (e.g. Mac mini) with no monitor attached
- Low-latency creative work needing extra screen real estate
- Casual gaming on a second, high-refresh display
- Repurposing an old Android tablet instead of leaving it idle

## Competitors

- **Apple Sidecar** — Apple's own solution, iPad-only
- **Luna Display** — commercial second-display app, supports iPad and Mac/PC as a second display
- **Duet Display** — commercial cross-platform second-screen app
- **spacedesk** — free Windows-focused second-screen tool, weaker macOS support

## Pros

- Free (MIT) alternative to paid second-display apps
- Genuinely low-latency claims backed by hardware H.265 encoding
- True extend mode with touch support, not just mirroring
- Headless Mac mode is a distinctive feature paid tools don't always offer

## Cons

- Requires manually bypassing macOS Gatekeeper (`xattr -cr`) since the app isn't notarized/signed through the App Store
- ADB dependency adds setup friction for USB mode
- Requires an Android tablet with H.265 decode support — older/cheap tablets may not qualify
- Newer project; latency/stability claims aren't independently benchmarked

## Resources

- [GitHub Repository](https://github.com/tranvuongquocdat/SideScreen)
