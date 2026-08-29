---
title: Maxun
description: Open-source no-code platform that turns websites into structured APIs via point-and-click "robots"
order: 1
---

# Maxun

**[getmaxun/maxun](https://github.com/getmaxun/maxun)**

![Stars](https://img.shields.io/github/stars/getmaxun/maxun?style=flat-square) ![License](https://img.shields.io/github/license/getmaxun/maxun?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/getmaxun/maxun?style=flat-square)

## Overview

Maxun is an open-source no-code platform that turns websites into structured APIs — extracting, scraping, crawling, and searching web data through point-and-click "robots" instead of hand-written scraper code.

## What is it?

A Playwright-powered automation platform offering four core modes: Extract (point-and-click recorder or AI-powered natural-language extraction), Scrape (convert pages to clean Markdown/HTML with screenshots), Crawl (full-site traversal with customizable scope), and Search (automated web search with time-based filtering). It handles login-protected sites, integrates with Google Sheets/Airtable, exposes an SDK/CLI for programmatic access, and supports MCP for agent integration. Self-hostable via Docker Compose or a hosted version at app.maxun.dev.

## Why use it?

Writing and maintaining custom scrapers per site is fragile — layout changes break selectors, and JS-heavy sites need real browser automation anyway. Maxun's recorder captures the extraction visually, its AI mode skips selector-writing entirely, and MCP support means an agent can trigger extraction robots directly instead of you scripting Playwright by hand.

## Installation

```bash
# Docker Compose
git clone https://github.com/getmaxun/maxun
cd maxun
docker compose up -d
```

Hosted version also available at [app.maxun.dev](https://app.maxun.dev); local install and full self-hosting docs in the repo.

## Basic Usage

Record a robot by clicking through the target site (or describe the extraction in natural language), configure schedule/output, then run it via the UI, SDK, CLI, or an MCP-connected agent to pull structured data on demand.

## Key Features

- Point-and-click recorder plus AI-powered natural-language extraction
- Scrape mode: clean Markdown/HTML output with screenshot capture
- Crawl mode: full-site traversal with customizable scope
- Search mode: automated web search with time-based filtering
- Authentication support for login-protected sites
- SDK and CLI for programmatic/developer access
- MCP integration for agent-driven extraction
- Integrations: Google Sheets, Airtable, and more; self-hostable

## Top 5 Use Cases

1. Lead generation from directory/listing sites without custom scrapers
2. Market research via scheduled, structured data extraction
3. Content aggregation from multiple sources into one feed
4. Feeding AI workflows/agents structured web data via MCP
5. Document/page-to-Markdown conversion for downstream processing

## Competitors

- Firecrawl — API-first scraping/crawling for LLM pipelines, vs. Maxun's no-code point-and-click robot builder.
- Apify — larger managed actor marketplace/ecosystem, vs. Maxun's self-hostable, open-source-first approach.
- Playwright/Puppeteer (raw) — full manual control, but requires hand-written scraper code vs. Maxun's recorder/AI extraction.
- **[Scrapling](/docs/webdev/scrapling)** — code-first, adaptive-parsing Python framework with anti-bot bypass, vs. Maxun's no-code robot builder.

## Pros

- Large, active community (17.3k+ stars, 1.5k+ forks)
- No-code recorder plus AI extraction — no selector-writing required
- Self-hostable, avoiding per-request scraping API costs
- MCP support lets agents drive extraction directly

## Cons

- AGPLv3 license — copyleft obligations to check before commercial/hosted resale use
- Browser-automation-based (Playwright) — heavier resource footprint than lightweight HTTP scrapers
- Site layout changes can still break recorded robots, same as traditional scrapers

## Resources

- [GitHub Repository](https://github.com/getmaxun/maxun)
- [app.maxun.dev](https://app.maxun.dev)
