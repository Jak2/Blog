---
title: ntfy
description: Simple HTTP-based pub-sub push notification service, self-hostable or free at ntfy.sh
order: 1
---

# ntfy

**[binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)**

## Overview

ntfy ("notify") is a simple pub-sub push notification service you talk to over plain HTTP. Send a `PUT`/`POST` to a topic URL and every subscriber (phone, desktop, browser) gets a push notification — no account, no SDK, no app-specific setup.

## What is it?

A Go server exposing a REST API for publishing and subscribing to notification "topics," plus a web UI, CLI, and native Android/iOS apps. Use the free public instance at `ntfy.sh`, or self-host the same server binary/Docker image for full control.

## Why use it?

Most notification platforms want an account, an SDK, or a locked-in vendor. ntfy reduces sending a push notification to a single `curl` call, which makes it a natural fit for scripts, cron jobs, CI pipelines, and home-server alerting where you just want a ping on your phone.

## Installation

```bash
# self-host via Docker
docker run -p 80:80 -it binwiederhier/ntfy serve

# or use the free public instance directly, no install needed:
curl -d "backup done" ntfy.sh/mytopic
```

Native apps: Google Play, F-Droid, App Store, or the [ntfy-android](/docs/tools/ntfy-android) companion app for a Firebase-free Android setup.

## Basic Usage

1. Pick a topic name (treat it like a password if it's sensitive — anyone who knows it can publish/subscribe).
2. Send: `curl -d "message" ntfy.sh/mytopic`.
3. Subscribe from the app, web UI, or CLI to receive it as a push notification.
4. Optionally self-host the server for private topics, auth, and no third-party dependency.

## Key Features

- Zero-setup HTTP PUT/POST publishing, no account required
- Free public instance (`ntfy.sh`) or self-hosted Docker/binary
- Native Android and iOS apps, web UI, and CLI
- Attachments, custom sounds, priorities, action buttons
- Email-to-notification via SMTP
- Web push support

## Top 5 Use Cases

- Fire-and-forget alerts from scripts, cron jobs, or CI pipelines
- Home-server / NAS monitoring alerts
- Backup job completion/failure notifications
- Lightweight uptime/status alerting without a monitoring platform
- Personal reminders sent from any device that can make an HTTP request

## Competitors

- **Pushover** — commercial, polished, but paid and closed-source
- **Gotify** — self-hosted alternative, similar niche, smaller feature set
- **Firebase Cloud Messaging (raw)** — requires SDK integration and a Google account, no plain-HTTP simplicity

## Pros

- Genuinely zero-setup: a single `curl` command is enough to start
- Dual-licensed (Apache 2.0 / GPLv2), self-hostable with no vendor lock-in
- Companion Android app ([ntfy-android](/docs/tools/ntfy-android)) supports a Firebase-free build
- Mature, actively maintained Go server with a real production track record

## Cons

- Public `ntfy.sh` topics are unauthenticated by default — anyone who guesses the topic name can publish/subscribe
- Self-hosting for private use means running and securing your own instance
- Free tier on the hosted service has rate limits; heavier use needs ntfy Pro or self-hosting

## Resources

- [GitHub Repository](https://github.com/binwiederhier/ntfy)
- Companion project: [ntfy-android](/docs/tools/ntfy-android)
