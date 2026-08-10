---
title: Chatwoot
description: Open-source, self-hostable customer support platform — an alternative to Intercom/Zendesk
order: 1
---

# Chatwoot

**[chatwoot/chatwoot](https://github.com/chatwoot/chatwoot)**

## Overview

Chatwoot is an open-source customer support/omnichannel messaging platform, positioned as a self-hostable alternative to Intercom and Zendesk. It centralizes live chat, email, social, and messaging-app conversations into one team inbox.

## What is it?

A full customer-support suite: a shared team inbox across channels (live chat widget, email, Facebook, Instagram, Twitter, WhatsApp, Telegram, SMS), an AI agent ("Captain") for automated responses, a help-center/FAQ portal, and collaboration tools (private notes, mentions, labels, canned responses). It ships with analytics/reporting and integrates with Slack, Dialogflow, Shopify, Linear, and Google Translate.

## Why use it?

Companies that want Intercom/Zendesk-level support tooling without vendor lock-in or per-seat SaaS pricing can self-host Chatwoot instead, keeping customer data in-house while still getting omnichannel inbox, automation, and reporting.

## Installation

- **One-click deploy**: Heroku or DigitalOcean Kubernetes buttons in the README
- **Docker/other methods**: documented at chatwoot.com/deploy
- Requires configuring environment variables for mail, storage, and channel integrations
- Self-hosted or use Chatwoot's own hosted cloud offering

## Basic Usage

1. Deploy Chatwoot (one-click host or Docker) and complete initial setup.
2. Connect channels: website live-chat widget, email inbox, social/messaging accounts.
3. Invite agents, set up teams and automated routing rules.
4. Handle conversations from the unified inbox, using canned responses/notes/labels.
5. Publish a help-center for self-service, and review analytics on response/resolution times.

## Key Features

- Omnichannel inbox (chat, email, social, WhatsApp, Telegram, SMS)
- AI agent ("Captain") for automated replies
- Help Center / FAQ portal
- Team collaboration: private notes, mentions, canned responses, labels
- Contact/customer segmentation and campaigns
- Integrations: Slack, Dialogflow, Shopify, Linear, Google Translate
- Real-time analytics and reporting

## Top 5 Use Cases

- Self-hosted alternative to Intercom/Zendesk for cost or data-control reasons
- Startups wanting an omnichannel support inbox without per-agent SaaS pricing
- Businesses needing WhatsApp/Telegram support alongside email and web chat
- Teams wanting a self-service help center bundled with live support
- Automating routine support replies with the built-in AI agent

## Competitors

- **Intercom** — commercial, cloud-only customer messaging platform; more polished/managed but no self-hosting and higher cost at scale.
- **Zendesk** — established commercial support-ticketing suite; more enterprise features, closed-source, no self-hosting.
- **Freshdesk** — commercial helpdesk/ticketing platform, similar omnichannel ambitions, closed-source.
- **Crisp** — commercial live-chat/support tool with a free tier, closed-source.

Chatwoot's differentiator against all of these is being fully open source and self-hostable while still covering most of the omnichannel/automation feature set.

## Pros

- MIT licensed — permissive, no copyleft restrictions
- True self-hosting option for full data control and cost control at scale
- Broad channel coverage (chat, email, WhatsApp, Telegram, SMS, social)
- Active project with a large contributor base and frequent releases
- Built-in AI automation and help-center features included, not paywalled add-ons

## Cons

- Self-hosting requires real ops investment (Rails app, background jobs, storage, channel webhooks)
- Feature depth on advanced enterprise workflows still trails Zendesk/Intercom in places
- Channel integrations (WhatsApp Business API, etc.) can require third-party API costs regardless of self-hosting
- Mobile apps and some premium capabilities are more polished on Chatwoot's own hosted cloud plan than self-hosted

## Resources

- [GitHub Repository](https://github.com/chatwoot/chatwoot)
- [chatwoot.com/deploy](https://www.chatwoot.com/deploy)
