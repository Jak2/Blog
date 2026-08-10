---
title: ntfy-android
description: Official Android client for ntfy, with a Firebase-free build option
order: 1
---

# ntfy-android

**[binwiederhier/ntfy-android](https://github.com/binwiederhier/ntfy-android)**

## Overview

ntfy-android is the official Android client for [ntfy](/docs/tools/ntfy), the HTTP-based pub-sub notification service. It subscribes to topics on any ntfy server — the public `ntfy.sh` instance or your own self-hosted one — and surfaces them as native Android push notifications.

## What is it?

A Kotlin Android app that talks to the ntfy server API, storing subscriptions locally (Room database) and delivering notifications either through a foreground service or Firebase Cloud Messaging, depending on the build. It's a companion client, not a standalone product — it needs an ntfy server (public or self-hosted) to be useful.

## Why use it?

Most push notification setups tie you to Google's Firebase infrastructure. ntfy-android supports a Firebase-free build using a persistent foreground service instead, which matters for de-Googled Android setups, privacy-conscious users, or anyone who just doesn't want a Firebase dependency in the loop for simple alerts.

## Installation

Available via:

- Google Play Store
- F-Droid (Firebase-free build)
- Direct `.apk` from [GitHub Releases](https://github.com/binwiederhier/ntfy-android/releases) (SHA-256 signature verification available)

## Basic Usage

1. Install the app from Play Store, F-Droid, or a signed APK.
2. Add a server (defaults to `ntfy.sh`, or point it at your self-hosted instance).
3. Subscribe to a topic.
4. Publish to that topic from anywhere (`curl`, a script, another app) and the notification arrives on the device.

## Key Features

- Subscribe to any number of topics across any number of servers
- Firebase-free build (F-Droid) using a foreground service instead of FCM
- Google Play build using Firebase for battery-friendlier delivery
- Local subscription/message storage (Room)
- Community translations via Weblate

## Top 5 Use Cases

- Receiving self-hosted server/homelab alerts on your phone
- De-Googled or privacy-focused Android setups that avoid Firebase
- Personal script/cron notifications routed to a phone
- Team alerting where everyone subscribes to a shared topic
- Backup/CI pipeline completion notifications on mobile

## Competitors

None directly — this is the official client for ntfy specifically. General alternatives for receiving self-hosted push notifications include Gotify's Android app or Pushover's app, but those require running/paying for a different backend entirely.

**Companion project, not a competitor:** ntfy-android is the Android counterpart to the [ntfy](/docs/tools/ntfy) server — you need one to use the other; they ship from the same author and repo org.

## Pros

- Firebase-free option is a real, working alternative, not just a toggle that silently still uses Google infra
- Free, open-source (Apache 2.0), available on F-Droid
- Works against both the free public `ntfy.sh` and any self-hosted server
- Actively maintained alongside the main ntfy server

## Cons

- Useless without an ntfy server to subscribe to — always a two-part setup
- Firebase-free (foreground service) build trades some battery efficiency for independence from Google infra
- iOS users need a separate app; feature parity between platforms isn't guaranteed

## Resources

- [GitHub Repository](https://github.com/binwiederhier/ntfy-android)
- Server/companion project: [ntfy](/docs/tools/ntfy)
