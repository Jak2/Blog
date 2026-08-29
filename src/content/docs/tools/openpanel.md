---
title: OpenPanel
description: Open-source, privacy-focused web and product analytics platform — a self-hostable Mixpanel alternative
order: 1
---

# OpenPanel

**[Openpanel-dev/openpanel](https://github.com/Openpanel-dev/openpanel)**

![Stars](https://img.shields.io/github/stars/Openpanel-dev/openpanel?style=flat-square) ![License](https://img.shields.io/github/license/Openpanel-dev/openpanel?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/Openpanel-dev/openpanel?style=flat-square)

## Overview

OpenPanel is an open-source, self-hostable web and product analytics platform built as a privacy-focused alternative to Mixpanel — giving teams full data control without sacrificing advanced analytics features.

## What is it?

A full analytics stack combining funnels, cohorts, and user profiles; session replay with privacy controls; real-time interactive dashboards; A/B testing with variant breakdowns; cookieless, GDPR-compliant tracking; revenue tracking for purchases/subscriptions; and SDKs for web, mobile, and server-side integration. It also ships an MCP server so Claude/Cursor can query analytics data directly.

## Why use it?

Hosted analytics platforms often gate advanced features behind usage-based pricing and keep your product/user data on their infrastructure. OpenPanel is self-hostable and open-source, so teams get funnels/cohorts/session-replay-grade analytics with transparent, predictable costs and no third party holding the data — plus MCP integration lets an AI agent query analytics directly instead of you exporting CSVs.

## Installation

```bash
git clone https://github.com/Openpanel-dev/openpanel
cd openpanel
pnpm install
# configure environment, then:
docker compose up -d
# run migrations
```

Requires Docker, Node, and pnpm.

## Basic Usage

Self-host via Docker Compose (or use OpenPanel's hosted option), install the client SDK in your web/mobile/server app to start sending events, then explore funnels, cohorts, and session replays in the dashboard — or query the data via the MCP server from Claude/Cursor.

## Key Features

- Funnels, cohorts, and user profiles
- Session replay with privacy controls
- Real-time dashboards and interactive charts
- A/B testing with detailed variant breakdowns
- Cookieless, GDPR-compliant tracking
- Revenue tracking for purchases and subscriptions
- Web, mobile, and server-side SDKs
- MCP server for Claude/Cursor to query analytics directly

## Top 5 Use Cases

1. Self-hosted product analytics for teams wanting full data control
2. Privacy/GDPR-conscious tracking without third-party data sharing
3. Funnel and cohort analysis for product growth teams
4. Session replay debugging alongside quantitative analytics
5. Letting an AI agent query product analytics via MCP

## Competitors

- Mixpanel — mature hosted product analytics, but closed-source and usage-based pricing vs. OpenPanel's self-hosted, transparent-cost model.
- PostHog — broader open-source product suite (feature flags, surveys, etc.), vs. OpenPanel's more focused analytics scope.
- Plausible/Umami — simpler privacy-focused web analytics, lighter than OpenPanel's funnels/cohorts/session-replay feature set.

## Pros

- Active community (6.8k+ stars, 457+ forks)
- Self-hostable with transparent pricing, no hidden usage limits
- Cookieless, GDPR-compliant tracking by default
- MCP integration for direct AI-agent querying

## Cons

- AGPL-3.0 license — copyleft obligations to check before commercial/hosted resale use
- Self-hosting requires a meaningful stack (PostgreSQL, ClickHouse, Redis, BullMQ)
- Smaller ecosystem/community than Mixpanel or PostHog

## Resources

- [GitHub Repository](https://github.com/Openpanel-dev/openpanel)
