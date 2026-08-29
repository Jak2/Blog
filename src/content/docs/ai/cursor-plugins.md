---
title: Cursor Plugins
description: Official plugin specification and marketplace for the Cursor AI code editor
order: 1
---

# Cursor Plugins

**[cursor/plugins](https://github.com/cursor/plugins)**

![Stars](https://img.shields.io/github/stars/cursor/plugins?style=flat-square) ![License](https://img.shields.io/github/license/cursor/plugins?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/cursor/plugins?style=flat-square)

## Overview

Cursor Plugins is the official plugin specification and marketplace for Cursor, hosting 50+ official plugins in a standardized directory structure — from developer-tool utilities to third-party SaaS integrations.

## What is it?

A centralized plugin collection covering developer utilities (Teaching for skill mapping, Thermos for code audits, Orchestrate for parallel task distribution), third-party integrations (Gmail, Google Drive, Calendar, GitHub, Playwright, Salesforce, HubSpot, and more), and agent-focused design features (CLI patterns, compatibility audits, structured handoffs). Each plugin follows a standardized `.cursor-plugin/plugin.json` manifest.

## Why use it?

Extending an AI coding agent with real external tool access — email, CRM, browser automation, code audits — otherwise means writing each integration yourself. Cursor Plugins packages those as installable, standardized units so an agent gains a capability (send an email, run a Playwright test, query Salesforce) through a manifest-defined plugin instead of custom glue code per integration.

## Installation

Browse and install through Cursor's plugin marketplace UI, or reference a plugin's `.cursor-plugin/plugin.json` directly per the repo's documented structure.

## Basic Usage

Open Cursor's plugin marketplace, find the integration or utility needed (e.g. GitHub, Playwright, Orchestrate), install it, and the agent gains access to that plugin's tools/commands in subsequent sessions.

## Key Features

- 50+ official plugins in a standardized directory structure
- Developer utilities: Teaching (skill mapping), Thermos (code audits), Orchestrate (parallel task distribution)
- Third-party integrations: Gmail, Drive, Calendar, GitHub, Playwright, Salesforce, HubSpot, and more
- Agent-focused design: CLI patterns, compatibility audits, structured handoffs
- Standardized `.cursor-plugin/plugin.json` manifests

## Top 5 Use Cases

1. Automating email, calendar, and document workflows from the agent
2. Integrating CRM/sales platforms (Salesforce, HubSpot) into agent tasks
3. Running code reviews and security audits via AI agent plugins
4. Building browser automation and testing workflows (Playwright)
5. Coordinating parallel agent task distribution via Orchestrate

## Competitors

- [Claude Code Plugins](/docs/ai/claude-plugins-official) — Anthropic's equivalent official plugin marketplace, for Claude Code instead of Cursor.
- [Awesome MCP Servers](/docs/ai/awesome-mcp-servers) — broader, community-curated MCP server directory vs. this repo's Cursor-specific, officially maintained plugin set.

## Pros

- MIT licensed, solid community (6.1k+ stars, 485+ forks)
- Officially maintained — consistent manifest structure across all plugins
- Broad third-party SaaS coverage (productivity, CRM, dev tools) out of the box
- Agent-focused design features (structured handoffs, compatibility audits) baked in

## Cons

- Tied specifically to the Cursor editor — not portable to other agent hosts
- Smaller catalog (50+) than community-driven MCP server directories
- Third-party integrations still require the underlying service's own credentials/setup

## Resources

- [GitHub Repository](https://github.com/cursor/plugins)
