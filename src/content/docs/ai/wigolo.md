---
title: Wigolo
description: Local-first web search, fetch, crawl, and research MCP server for AI coding agents — no API keys, no cloud, $0 per query
order: 2
---

# Wigolo

**[KnockOutEZ/wigolo](https://github.com/KnockOutEZ/wigolo)**

## Overview

Wigolo gives an AI agent one surface for everything web-related — search, fetch, crawl, extract, cache, find-similar, and autonomous research — without requiring API keys or sending data to a cloud service. It runs as an MCP server, a REST endpoint, or an embedded SDK, and is built to match the quality of paid tools like Firecrawl, Exa, and Tavily while staying free and local.

## What is it?

A Node.js (≥20) local engine that installs a headless browser and on-device ranking/embedding models under `~/.wigolo/`. It exposes a set of MCP tools — `search`, `fetch`, `crawl`, `extract`, `cache`, `find_similar`, `research`, `agent`, `diff`, `watch` — that any MCP client (Claude Code, Cursor, Codex, Gemini CLI, VS Code, Zed, LangChain, CrewAI, n8n, etc.) can call directly.

## Why use it?

Cloud web-search/research APIs (Firecrawl, Exa, Tavily) meter usage and require API keys; wigolo's core tools (search, fetch, crawl, extract, cache, find-similar) run entirely on-device with public search engine adapters and local reranking, so there's no bill that grows with agent usage. Results carry explainable per-result scoring, byte-exact source spans, and honest failure labeling (e.g. `blocked_by_challenge`) instead of silently returning degraded content.

## Installation

```bash
npx wigolo init                              # set up the local engine
npx wigolo init --agents=claude-code,cursor  # set up + wire specific agents
```

Requires Node ≥20 and ~1.5 GB free disk (macOS, Linux, Windows). Check health anytime with `npx wigolo doctor`; uninstall cleanly with `npx wigolo config --uninstall --yes`. For synthesized/cited answers from `research` and `agent`, set an LLM provider (a free Gemini key, Anthropic, OpenAI, Groq, or a local Ollama endpoint work).

## Basic Usage

1. Run `npx wigolo init --agents=<your-agent>` to install and wire your coding agent's MCP config.
2. Call `search`, `fetch`, or `crawl` from the agent for keyless, cached web access.
3. Use `extract` for structured data (tables, JSON-LD, named schemas) from a page.
4. Use `research` or `agent` for multi-step, cited synthesis (needs an LLM key or local Ollama).
5. Use `diff`/`watch` to track page changes over time.

## Key Features

- 18 direct search engine adapters with rank fusion and on-device ML reranking
- Tiered `fetch` router: plain HTTP escalates to headless browser on anti-bot/SPA
- Whole-site `crawl` (BFS/DFS/sitemap) with per-domain rate limits and robots.txt respect
- Structured `extract`: tables, metadata, JSON-LD, named schemas, custom JSON Schema
- Semantic + keyword `cache` search over everything previously fetched
- `research`/`agent` autonomous gather loops with citations and step logs
- `diff`/`watch` for page change tracking, deliverable to a webhook
- Zero API keys and $0 per query for the core tools; everything stored under `~/.wigolo/`

## Top 5 Use Cases

- Giving a coding agent (Claude Code, Cursor, etc.) web search/fetch without a metered API bill
- Building autonomous research agents that need cited, byte-pinned evidence
- Whole-site crawling and structured extraction for data pipelines
- Self-hosted/local-first agent stacks (LangChain, CrewAI, n8n) needing a web layer with no cloud dependency
- Tracking page changes over time (`diff`/`watch`) for monitoring or competitive research

## Competitors

- **Firecrawl** — cloud crawl/extract API, paid, no local-first keyless mode
- **Exa** — cloud neural search API, strong at rendering structured comparisons, paid
- **Tavily** — cloud search API built for LLM agents, paid, keyed
- **Built-in agent WebSearch tools** — simpler, no byte-pinned evidence or explainable scoring

Not directly comparable to [Databasement](/docs/tools/databasement), [PinchTab](/docs/tools/pinchtab), or the CRM tools on this site — wigolo is a web-research layer, not database or browser-automation infrastructure, though it can complement [PinchTab](/docs/tools/pinchtab) in an agent stack (wigolo for search/research, PinchTab for direct browser control/interaction).

## Pros

- No API keys needed for search, fetch, crawl, extract, cache, find-similar
- $0 per query, cached, so re-querying is instant and free
- Broad ecosystem support: any MCP client plus LangChain/CrewAI/LlamaIndex/Vercel AI SDK
- Transparent, explainable scoring and honest failure/degradation reporting
- Everything stays local under `~/.wigolo/` unless you opt into a cloud LLM for synthesis

## Cons

- AGPL-3.0 license — copyleft, may complicate closed-source commercial embedding
- Public beta status — expect rough edges and fast-changing APIs
- `research`/`agent` synthesis quality depends on an LLM provider you configure (keyless mode gives raw briefs, not finished answers)
- ~1.5 GB local disk footprint for the browser engine and on-device models
- Multi-engine search quality depends on public search engines staying scrapeable

## Resources

- [GitHub Repository](https://github.com/KnockOutEZ/wigolo)
- [Documentation](https://github.com/KnockOutEZ/wigolo/blob/main/docs/README.md)
- [Installation Guide](https://github.com/KnockOutEZ/wigolo/blob/main/docs/installation.md)
