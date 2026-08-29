---
title: OpenDesign
description: Open-source, agent-native design engine — turns coding agents into prototype/deck/dashboard/video generators
order: 1
---

# OpenDesign

**[nexu-io/open-design](https://github.com/nexu-io/open-design)**

![Stars](https://img.shields.io/github/stars/nexu-io/open-design?style=flat-square) ![License](https://img.shields.io/github/license/nexu-io/open-design?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/nexu-io/open-design?style=flat-square)

## Overview

OpenDesign bills itself as the open-source Claude Design alternative — turning coding agents into a design engine that generates prototypes, landing pages, dashboards, presentations, images, and videos with real exportable output (HTML/CSS/PDF/PPTX/MP4), all from a local-first desktop app.

## What is it?

An agent-native, model-agnostic platform working with 25+ coding agents (Claude Code, DeepSeek Harness, Cursor, Copilot, and more) through a unified skill protocol. It ships 151 pre-built brand-grade design systems (Shopify, Stripe, Apple, Tesla, etc.) centered on portable `DESIGN.md` contracts, 100+ functional skills and 277 plugins for prototypes/decks/dashboards/migrations, HyperFrames integration for HTML-to-video motion graphics with audio, and multi-format export (HTML, PDF, PPTX, MP4, Markdown) from single artifacts. Runs local-first on macOS/Windows/Linux/Docker with sandboxed previews and BYOK support for any OpenAI-compatible endpoint.

## Why use it?

Design output from coding agents tends to look generic without a real design system behind it, and most design tools aren't built to be driven by an agent in the first place. OpenDesign supplies both: 151 real brand design systems as portable contracts an agent can follow, plus a skill protocol that works across whichever coding agent you already use — rather than locking you into one closed design tool or one AI vendor.

## Installation

```bash
# Desktop app (recommended) — download from open-design.ai

# CLI integration into an existing agent
od mcp install <agent>   # e.g. claude, cursor, copilot

# Docker
docker compose up -d     # from the deploy/ directory

# From source
git clone https://github.com/nexu-io/open-design
pnpm install && pnpm tools-dev run web
```

## Basic Usage

Install the desktop app or connect via `od mcp install` to your coding agent, pick a brand design system or start from a `DESIGN.md` contract, then have the agent generate a prototype/dashboard/deck/video artifact and export it in the format you need.

## Key Features

- Agent-native, model-agnostic — works with 25+ coding agents via a unified skill protocol
- 151 pre-built brand-grade design systems with portable `DESIGN.md` contracts
- 100+ functional skills and 277 plugins for prototypes, decks, dashboards, migrations
- Multi-format export: HTML, PDF, PPTX, MP4, Markdown from one artifact
- HyperFrames: HTML-to-video motion graphics with audio
- Local-first, sandboxed previews (macOS/Windows/Linux/Docker)
- BYOK for any OpenAI-compatible endpoint with SSRF protection

## Top 5 Use Cases

1. Generating landing pages, SaaS dashboards, and mobile interfaces from an agent
2. Migrating Figma/Pencil design workflows into React/Next.js/Vue code
3. Refreshing an existing codebase to match a brand's design system
4. Building presentation decks with pre-built templates and themes
5. Producing motion-graphic videos from design artifacts via HyperFrames

## Competitors

- Claude Design — the closed platform this positions itself as an open alternative to.
- Figma + hand-coding — full design control, but no agent-native skill protocol or brand-system automation.
- v0/Vercel — AI UI generation tied to one vendor's stack, vs. OpenDesign's 25+ agent, model-agnostic approach.

## Pros

- Apache 2.0 licensed, very large community (92.6k+ stars, 10.7k+ forks)
- Works across 25+ coding agents instead of locking into one
- 151 real brand design systems, not generic templates
- Multi-format export (including video via HyperFrames) from one artifact

## Cons

- Bundled templates carry mixed licenses (some MIT) — worth checking per-template before reuse
- Large feature surface (100+ skills, 277 plugins) has a learning curve
- Local-first desktop/Docker setup is heavier than a pure web-based tool

## Resources

- [GitHub Repository](https://github.com/nexu-io/open-design)
- [open-design.ai](https://open-design.ai)
