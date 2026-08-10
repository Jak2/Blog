---
title: SurfSense
description: Open-source NotebookLM alternative with live web-research connectors (Reddit, YouTube, TikTok, Google Search) and an MCP server for agents
order: 1
---

# SurfSense

**[MODSetter/SurfSense](https://github.com/MODSetter/SurfSense)**

## Overview

SurfSense is an open-source research platform that started as a NotebookLM-style "chat with your knowledge base" tool and has since expanded into a live-web-research toolkit for AI agents. It exposes structured, typed connectors — Reddit, YouTube, Instagram, TikTok, Amazon, Walmart, Google Maps, Google Search, Indeed, and generic web crawling — as a REST API and an MCP server, on top of the original document knowledge base, citations, and report/podcast generation features.

## What is it?

A Python-based (self-hostable via Docker) platform with two halves: a knowledge base (upload PDFs/docs/images/audio, sync Google Drive/OneDrive/Dropbox, hybrid semantic+full-text search with cited answers) and a set of live data connectors that return structured JSON instead of scraped HTML, callable directly over REST or as native MCP tools for Claude, Cursor, or any agent framework. It also ships a desktop app and automations that write research results back to Notion, Slack, Linear, and Jira.

## Why use it?

Standard search/scraping tools either answer from a stale web index or hand back unstructured HTML/markdown an agent has to parse. SurfSense's connectors return platform-native structured items (posts, comments, transcripts, reviews) in one HTTP call, avoiding both the token cost of browser-driving agents and the fragility of ad hoc scraping — while the underlying knowledge base still functions as a self-hosted, open-source NotebookLM alternative with no per-source or per-notebook caps.

## Installation

**Self-hosted (Docker, free, billing off):**

```bash
# Linux/macOS
curl -fsSL https://raw.githubusercontent.com/MODSetter/SurfSense/main/docker/scripts/install.sh | bash

# Windows
irm https://raw.githubusercontent.com/MODSetter/SurfSense/main/docker/scripts/install.ps1 | iex
```

Requires Docker Desktop. The installer sets up Watchtower for daily auto-updates (`--no-watchtower` to skip). Docker Compose and manual installs are documented at [surfsense.com/docs](https://www.surfsense.com/docs/).

**Cloud:** sign up at [surfsense.com](https://www.surfsense.com) — new accounts get $5 free credit, no subscription required.

## Basic Usage

Call a connector directly:

```bash
curl -X POST "$SURFSENSE_API_URL/workspaces/$WORKSPACE_ID/scrapers/reddit/scrape" \
  -H "Authorization: Bearer $SURFSENSE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"search_queries": ["your brand"], "community": "SaaS", "sort": "top", "time_filter": "week"}'
```

Or wire the MCP server into an agent:

```json
{
  "mcpServers": {
    "surfsense": {
      "url": "https://mcp.surfsense.com/mcp",
      "headers": { "Authorization": "Bearer ${SURFSENSE_API_KEY}" }
    }
  }
}
```

## Key Features

- Live connectors: Reddit, YouTube, Instagram, TikTok, Google Maps, Google Search, Indeed, Amazon, Walmart, plus generic web crawl
- MCP server exposing every connector as a native agent tool, plus bring-your-own external MCP connectors (Notion, Slack, Jira, one-click OAuth)
- Knowledge base: 50+ file formats, Google Drive/OneDrive/Dropbox sync, hybrid semantic+full-text search, cited answers
- Deliverable studio: AI report generation (PDF/DOCX/HTML/LaTeX/EPUB/ODT), two-host podcasts, editable slide decks, narrated video overviews
- Real-time collaborative chat with RBAC (Owner/Admin/Editor/Viewer)
- Desktop app with global-shortcut "Quick Assist" and local folder watching
- No vendor lock-in: 100+ LLMs via OpenAI spec/LiteLLM, 6,000+ embedding models, full local/private LLM support (vLLM, Ollama)

## Top 5 Use Cases

- Agents researching live social/web sentiment (Reddit threads, TikTok/YouTube reactions) without a browser-driving loop
- Self-hosted NotebookLM replacement for chatting with a personal or team document knowledge base
- Automated, scheduled market/competitor research briefs delivered to Slack or Notion
- Job/product/local-business research via structured Indeed, Amazon, Walmart, and Google Maps connectors
- Teams wanting real-time collaborative AI research chats with citations, on their own infrastructure

## Competitors

- **[LobeHub](/docs/ai/lobehub)** — broader multi-agent operations platform; overlaps only at the edges (LobeHub isn't research/connector-focused)
- **[MaxKB](/docs/ai/maxkb)** — enterprise agent/RAG platform aimed at internal knowledge bases and customer service, not live web connectors
- **Google NotebookLM** — closed-source, Gemini-only, no live web connectors or MCP server, capped sources/notebooks
- **Firecrawl** and other scraping APIs — return markdown blobs, not structured per-platform data, and degrade on bot-protected sites
- **Browserbase / Browser Use** — LLM-driven browser automation, useful for interactive tasks but token- and time-expensive for read-only retrieval
- **Exa / Tavily / Parallel** — search-index APIs, can't pull structured Reddit/TikTok/Maps data
- **Apify** — scraper marketplace with inconsistent per-actor schemas, not a unified typed API

## Pros

- Structured, typed connector output instead of markdown/HTML scraping
- Genuinely open source and self-hostable with billing off
- Broad LLM/embedding model support, including fully local/private stacks
- Combines research connectors with a full knowledge-base/report/podcast suite
- Native MCP server for direct agent integration

## Cons

- Explicitly "not yet production-ready" per its own README
- Cloud connectors are metered/billed per item; self-hosting requires your own infrastructure and model keys
- Broad scope (knowledge base + connectors + automations + desktop app) means more moving parts to operate
- License is not a standard permissive license (GitHub reports it as unassigned/NOASSERTION) — verify terms before commercial use
- Newer connector features may change quickly given active development

## Resources

- [GitHub Repository](https://github.com/MODSetter/SurfSense)
- [Documentation](https://www.surfsense.com/docs/)
- [Discord](https://discord.gg/ejRNvftDp9)
