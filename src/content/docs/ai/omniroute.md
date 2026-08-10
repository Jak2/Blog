---
title: OmniRoute
description: Free, self-hosted AI gateway that routes coding-agent traffic across 290+ LLM providers with auto-fallback and token compression
order: 1
---

# OmniRoute

**[diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)**

## Overview

OmniRoute is a self-hosted AI gateway/router aimed squarely at coding agents (Claude Code, Codex, Cursor, Cline, Copilot, and others). It presents a single OpenAI-compatible endpoint in front of a large catalog of LLM providers — including many with free tiers — with automatic fallback when a provider is rate-limited or out of quota, plus a built-in token-compression pipeline. It's MIT-licensed and ships as an npm CLI, Docker image, and Electron desktop app.

Note: the project's own README is heavily marketing-driven (large claimed numbers like "290 providers," "500+ contributors," "~1.53B free tokens/month," 43 translated READMEs), so treat specific figures as the maintainer's self-reported marketing copy rather than independently verified facts.

## What is it?

A local gateway process (`npm install -g omniroute && omniroute`) that exposes a dashboard and an OpenAI-compatible API (`localhost:20128/v1`). It aggregates free and paid tiers from many LLM providers behind one endpoint, applies configurable routing strategies (the README claims 19, including a zero-config `auto` mode), falls back automatically when a provider errors or hits a limit, and layers a multi-stage compression pipeline over requests to reduce token usage before they reach the upstream provider.

## Why use it?

Wiring a coding agent to multiple free-tier LLM providers by hand means juggling several SDKs, base URLs, and rate limits, and manually switching when one runs out. OmniRoute centralizes that into one endpoint with fallback baked in, which is attractive if you want to stretch free-tier quotas across CLIs like Claude Code, Cursor, or Codex without managing several API keys and configs yourself.

## Installation

```bash
npm install -g omniroute
omniroute
```

Dashboard: `http://localhost:20128` · API: `http://localhost:20128/v1`

Also available via Docker Hub (`diegosouzapw/omniroute`), pnpm/source build, and as an Electron desktop app — see the README's "More install methods" section for details.

## Basic Usage

Point any OpenAI-compatible client at the local gateway:

```bash
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="omniroute-local"
```

Then configure provider API keys inside the OmniRoute dashboard, choose a routing strategy (or leave it on `auto`), and let it fall back across providers automatically. It also runs as an MCP server so agents can inspect/control routing directly, and supports a "remote mode" (CLI local, OmniRoute running on a VPS).

## Key Features

- OpenAI-compatible single endpoint in front of a large multi-provider catalog (free + paid tiers)
- Automatic fallback across providers on rate-limit/error (claimed 3-layer resilience)
- Configurable routing strategies, including a zero-config `auto` mode
- Token-compression pipeline (multi-engine, claims 15–95% token reduction)
- CLI, Docker image, Electron desktop app, and remote/VPS deployment mode
- MCP and A2A support so agents can control the router itself
- Free-tier usage dashboard (`/dashboard/free-tiers`) tracking documented provider quotas

## Top 5 Use Cases

- Stretching multiple free-tier LLM quotas across a single coding-agent workflow
- Avoiding manual provider-switching when a CLI (Claude Code, Cursor, Codex) hits a rate limit
- Self-hosted gateway for teams that want one endpoint/API-key surface instead of per-provider configs
- Reducing per-request token/cost via built-in compression before requests leave the gateway
- Running an agent-controllable router (via MCP) that can reconfigure routing at runtime

## Competitors

- **LiteLLM** — the more established, widely-adopted open-source LLM proxy/gateway with broad provider support and a mature Python ecosystem
- **OpenRouter** — hosted (not self-run) unified API/marketplace across many model providers, simpler but not self-hosted or free-tier-stacking focused
- **Portkey / Helicone** — gateway + observability platforms aimed more at production monitoring than free-tier stacking
- **[awesome-freellm-apis](/docs/ai/awesome-freellm-apis)** — a curated list rather than a gateway, but solves an adjacent problem (finding free LLM API tiers) that OmniRoute automates the switching for

## Pros

- MIT-licensed, self-hosted, single endpoint for many providers
- Free and open source with no per-request fees from the tool itself
- Built-in fallback removes manual provider-juggling
- Multiple deployment modes (CLI, Docker, Electron, remote/VPS)

## Cons

- README is unusually promotional in tone; claimed numbers (provider counts, contributor counts, token savings) are self-reported and should be verified independently before relying on them
- Aggregating many third-party free tiers means behavior depends on providers' own (frequently changing) terms and limits — some are explicitly flagged in the README as "ToS-flagged"
- Newer/high-churn project (frequent large README rewrites) — check current provider/feature status against the live repo rather than any cached description
- Adds an extra local process/dependency versus a more established gateway like LiteLLM

## Resources

- [GitHub Repository](https://github.com/diegosouzapw/OmniRoute)
- [Website](https://omniroute.online)
- [Free tiers methodology](https://github.com/diegosouzapw/OmniRoute/blob/main/docs/reference/FREE_TIERS.md)
