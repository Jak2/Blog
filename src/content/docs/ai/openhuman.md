---
title: OpenHuman
description: Open-source personal AI assistant combining persistent local memory, agent orchestration, and research tooling
order: 1
---

# OpenHuman

**[tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman)**

## Overview

OpenHuman is an open-source personal AI assistant platform aiming to be a comprehensive "brain": persistent local memory, visual agent-workflow orchestration, and integrated research/communication tooling, rather than a stateless chat window.

## What is it?

A Rust-core, Tauri-based desktop app (with a TypeScript/Node.js UI and Python support) built around a "Memory Tree + Obsidian Wiki" — compressed knowledge stored as local Markdown files in SQLite, auto-refreshed from 100+ OAuth integrations and thousands of MCP servers. On top of memory sits a visual workflow builder for agent-proposed automations, checkpointed multi-agent orchestration graphs, and encrypted agent-to-agent messaging (Signal protocol, with x402 USDC micropayments). Research tooling includes web search (Exa), scraping, browser control, voice (Whisper), meeting-agent integration (Meet/Zoom/Teams/Webex), and image/video generation.

## Why use it?

Most AI assistants either forget everything between sessions or store memory in someone else's cloud. OpenHuman's pitch is local-first persistent memory plus visual, human-approved automation — appealing if you want an assistant that accumulates real long-term context about your life/work without shipping it to a third party, and where automations are proposed and approved rather than run silently.

## Installation

Desktop installers are published at tinyhumans.ai/openhuman and on GitHub Releases:

- Homebrew (macOS)
- Debian/Ubuntu `.deb`
- AUR (Arch Linux)
- Platform install scripts — see the repo's `INSTALL.md`

Building from source requires Rust/Cargo, pnpm, CMake, and Ninja.

## Basic Usage

1. Install the desktop app for your platform.
2. Connect data sources (OAuth integrations, MCP servers) you want it to remember from.
3. Let the background "subconscious" loop build memory and generate briefings.
4. Review and approve proposed workflow automations in the visual builder.
5. Use research/voice/meeting tools directly, or delegate tasks to sub-agents.

## Key Features

- Local Memory Tree + Obsidian-style Markdown/SQLite knowledge store
- Auto-fetch from 100+ OAuth integrations and 5,000+ MCP servers every ~20 minutes
- Background "subconscious" loop that advances goals and drafts briefings
- Visual workflow builder with human-approved agent automations
- Multi-level agent hierarchies with checkpointed, resumable graph runs
- Encrypted agent-to-agent messaging (Signal protocol) with x402 USDC payments
- Integrated web search (Exa), scraping, browser control, Whisper voice
- Meeting agent for Meet/Zoom/Teams/Webex; 17 messaging channels incl. native email

## Top 5 Use Cases

- Personal knowledge management that persists and compounds across sessions
- Autonomous but human-approved workflow automation
- Multi-source research synthesis (web + connected accounts + MCP servers)
- Meeting notes/summaries across common video call platforms
- Running a small fleet of specialized sub-agents for delegated tasks

## Competitors

- **Claude Cowork** — proprietary, cloud-only, minimal persistent memory
- **OpenClaw** — MIT-licensed and open, but terminal-first with limited memory
- **Hermes Agent** — MIT-licensed and open, but needs substantial manual configuration
- **agentmemory** — a narrower, drop-in memory layer for coding agents specifically, rather than a full personal-assistant platform ([full writeup](/docs/ai/agentmemory))

## Pros

- Local-first memory model avoids sending personal life/work data to a third-party cloud by default
- Human-in-the-loop approval on automations rather than silent background action
- Broad integration surface (100+ OAuth, 5,000+ MCP servers) out of the box
- Open source with a genuinely capable, cross-platform desktop app (not just a CLI)

## Cons

- GPL-3.0 — copyleft, may complicate commercial/closed derivative use
- Very broad feature surface (memory + orchestration + payments + comms) — more to configure and trust than a single-purpose tool
- Newer/smaller project; agent-to-agent crypto payments (x402/USDC) is a nonstandard, higher-risk feature to audit
- Local-first memory still depends on you securing the device it runs on

## Resources

- [GitHub Repository](https://github.com/tinyhumansai/openhuman)
