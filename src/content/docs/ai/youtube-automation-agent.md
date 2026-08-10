---
title: YouTube Automation Agent
description: Node.js dashboard that runs a full AI-driven YouTube channel — topic discovery, scripting, video/thumbnail generation, SEO, scheduling, and publishing
order: 1
---

# YouTube Automation Agent

**[darkzOGx/youtube-automation-agent](https://github.com/darkzOGx/youtube-automation-agent)**

## Overview

YouTube Automation Agent is a fully automated channel-management system. Instead of generating one video at a time, it runs the entire channel loop with AI agents: trending-topic discovery, scriptwriting, thumbnail generation, video production, SEO optimization, upload scheduling, and performance analytics — with a local dashboard to configure and monitor it.

## What is it?

A Node.js/Express app with a custom agent architecture and fallback chains: if a premium provider isn't configured, the pipeline simulates that step so it keeps running end to end. It supports multiple AI providers (OpenAI, Gemini, OpenRouter, Kimi, MiMo, GLM, Claude), several TTS backends (ElevenLabs, OpenAI TTS, Azure Speech), FFmpeg/Playwright/Wan 2.7 for video production, and SQLite for state. A guided setup walkthrough live-tests credentials and opens browser windows for auth (including YouTube Data API).

## Why use it?

The three shorts/faceless-video generators in this space (this repo, AutoShorts AI, VUZA) each produce a single video from a prompt. This one goes further — it's an always-on channel operator: it decides what to make, makes it, optimizes metadata, schedules the upload, and reports back on performance, on a recurring schedule (content generation daily at 06:00, publish queue every 15 minutes, analytics at 09:00).

## Installation

```bash
git clone https://github.com/darkzOGx/youtube-automation-agent.git
cd youtube-automation-agent
npm install
npm run walkthrough   # guided setup, tests credentials, opens auth windows
npm start
# dashboard at http://localhost:3456
```

Requires Node.js 18+, a Google account with YouTube Data API access, and at least one AI provider key.

## Basic Usage

```bash
curl -X POST http://localhost:3456/generate \
  -H "x-api-key: $API_KEY" \
  -d '{"topic": "Top 10 Life Hacks", "style": "list"}'
```

Or leave the scheduler running and let it operate the channel automatically.

## Key Features

- Multi-AI provider support with OpenRouter routing to 300+ models
- Graceful fallbacks that simulate unconfigured premium steps so the pipeline never blocks
- Guided setup walkthrough with live credential testing
- Automated daily content generation, 15-minute publish queue, daily analytics
- Optional API-key protection on generation/publish endpoints
- Thumbnail generation and SEO optimization built in

## Top 5 Use Cases

- Bootstrapping a YouTube channel with zero manual content production
- Running multiple channels on a consistent, hands-off upload schedule
- A/B testing thumbnails and SEO metadata automatically
- Testing content strategies at scale before investing production time
- Teams wanting a self-hosted alternative to paid "AI channel" SaaS products

## Competitors

- **[AI Youtube Shorts Generator](/docs/ai/ai-youtube-shorts-generator)** — single-video generator only, no scheduling/publishing/analytics
- **[VUZA](/docs/ai/vuza)** — single-video generator only, no scheduling/publishing/analytics
- **TubeBuddy / VidIQ** — SEO/analytics tooling for existing creators, not generative
- Commercial "AI YouTube automation" SaaS agencies/tools

## Pros

- Covers the entire channel loop, not just video generation
- Multi-provider AI support avoids lock-in to one vendor
- Fallback/simulation design means it runs even with a minimal setup
- Self-hosted, MIT-licensed, no subscription

## Cons

- Requires a Google account with YouTube Data API access — more setup than a single-script generator
- Broader surface area (scheduling, publishing, analytics) means more that can go wrong
- Automating full channel operation risks running afoul of YouTube's spam/authenticity policies if content quality isn't monitored
- Newer/larger codebase than the single-purpose generators, more to audit before self-hosting

## Resources

- [GitHub Repository](https://github.com/darkzOGx/youtube-automation-agent)
