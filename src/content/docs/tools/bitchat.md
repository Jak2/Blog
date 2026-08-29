---
title: BitChat
description: Decentralized peer-to-peer messaging over Bluetooth mesh and Nostr — no accounts, phone numbers, or servers
order: 1
---

# BitChat

**[permissionlesstech/bitchat](https://github.com/permissionlesstech/bitchat)**

![Stars](https://img.shields.io/github/stars/permissionlesstech/bitchat?style=flat-square) ![License](https://img.shields.io/github/license/permissionlesstech/bitchat?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/permissionlesstech/bitchat?style=flat-square)

## Overview

BitChat is a decentralized messaging app for peer-to-peer communication without accounts, phone numbers, or central servers — combining Bluetooth mesh networking for fully offline messaging with the Nostr protocol for internet-connected global reach.

## What is it?

A dual-transport messenger: Bluetooth LE mesh routes messages device-to-device with no infrastructure required, while Nostr handles messaging when internet is available. It offers location-based channels via geohash coordinates, end-to-end encryption (Noise Protocol plus BitChat private envelopes, XChaCha20-Poly1305), an IRC-style command interface (`/slap`, `/msg`, `/who`), native iOS/macOS clients, and a triple-tap emergency wipe for immediate data deletion.

## Why use it?

Centralized messengers require phone numbers, accounts, and a working server — all single points of failure or surveillance in disaster zones, protests, or remote areas with no connectivity. BitChat's Bluetooth mesh keeps messages flowing device-to-device with zero infrastructure, while Nostr fills in global reach when internet exists, without either transport requiring identity registration.

## Installation

Available via App Store or Play Store. For development:

```bash
git clone https://github.com/permissionlesstech/bitchat
# build via Xcode or the `just` command-line tool
```

## Basic Usage

Open the app — no signup — and it automatically discovers nearby peers over Bluetooth mesh, or connects via Nostr for internet-based chats. Join location-based channels by geohash, or message peers directly with IRC-style commands.

## Key Features

- Dual transport: Bluetooth mesh (offline) and Nostr protocol (internet)
- Location-based channels via geohash coordinates
- No infrastructure required — works fully offline
- End-to-end encryption: Noise Protocol, BitChat private envelopes, XChaCha20-Poly1305
- IRC-style command interface (`/slap`, `/msg`, `/who`)
- Native iOS and macOS clients
- Emergency triple-tap wipe for immediate data deletion

## Top 5 Use Cases

1. Offline communication during disasters or infrastructure outages
2. Protest/event coordination without a traceable phone number or account
3. Remote-area connectivity with no cellular/internet coverage
4. Location-based community chat via geohash channels
5. Privacy-preserving messaging without centralized server dependency

## Competitors

- Signal — strong E2E encryption but requires a phone number and internet/server infrastructure, vs. BitChat's infrastructure-free Bluetooth mesh option.
- Briar — similar mesh/offline-first messaging concept, Android/Linux-focused vs. BitChat's iOS/macOS native clients.
- Meshtastic — LoRa-based mesh messaging with longer range but requires dedicated hardware, vs. BitChat's phone-only Bluetooth approach.

## Pros

- Public domain (Unlicense) — zero licensing restrictions
- Large, active community (36k+ stars, 5.7k+ forks)
- No accounts, phone numbers, or central servers required
- Emergency data-wipe feature for high-risk usage contexts

## Cons

- iOS/macOS only — no Android or cross-platform native client yet
- Bluetooth mesh range is inherently short compared to internet-based messaging
- Nostr-based internet messaging still depends on relay availability

## Resources

- [GitHub Repository](https://github.com/permissionlesstech/bitchat)
