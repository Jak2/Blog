---
title: Scrapling
description: Adaptive Python web scraping framework that relocates elements after site redesigns and bypasses anti-bot protections
order: 1
---

# Scrapling

**[D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling)**

![Stars](https://img.shields.io/github/stars/D4Vinci/Scrapling?style=flat-square) ![License](https://img.shields.io/github/license/D4Vinci/Scrapling?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/D4Vinci/Scrapling?style=flat-square)

## Overview

Scrapling is an adaptive Python web scraping framework built to survive the two things that break most scrapers: site redesigns and anti-bot protections — auto-relocating HTML elements when a page changes and bypassing protections like Cloudflare Turnstile.

## What is it?

A framework spanning single HTTP requests up to large-scale crawls, with a Scrapy-like Spiders module (concurrent crawling, pause/resume checkpoints, multi-session support, automatic throttling), multiple fetchers (plain HTTP, dynamic browser automation via Playwright/Chromium, and stealth modes), adaptive parsing that tracks elements across redesigns using similarity algorithms, persistent session/cookie management with proxy rotation, and AI integration (an MCP server for agents, RAG-ready Markdown conversion, and agent skills). Also ships an interactive shell and CLI.

## Why use it?

Traditional scrapers break the moment a site's HTML structure shifts, and increasingly need to clear anti-bot checks just to load the page at all. Scrapling's adaptive parsing keeps selectors working across redesigns via similarity matching, and its stealth fetchers handle the anti-bot layer — while staying fast (roughly 1.99ms text extraction vs. 1500ms+ for BeautifulSoup-based approaches).

## Installation

```bash
pip install "scrapling[all]"
scrapling install
```

## Basic Usage

```python
from scrapling.fetchers import Fetcher

page = Fetcher.get('https://example.com')
page.css('.product-title').text
```

Or use the Spiders module for concurrent, resumable crawls, and the CLI/shell for quick extraction without writing a script.

## Key Features

- Spiders framework: concurrent crawling, pause/resume, multi-session, auto-throttling
- Multiple fetchers: HTTP, browser automation (Playwright/Chromium), stealth modes
- Adaptive parsing that tracks elements through site redesigns
- Persistent cookies/session state with proxy rotation
- MCP server for AI agents, RAG-ready Markdown conversion, agent skills
- Interactive shell, CLI, Docker support, comprehensive type hints

## Top 5 Use Cases

1. E-commerce catalog scraping resilient to layout changes (built-in Shopify support)
2. Scraping sites behind anti-bot protections like Cloudflare Turnstile
3. Large-scale, resumable multi-domain crawls
4. Building RAG systems from scraped website content
5. Feeding an AI agent live web data via the MCP server

## Competitors

- [Maxun](/docs/tools/maxun) — no-code point-and-click scraping robots, vs. Scrapling's code-first, adaptive-parsing Python framework.
- Scrapy — the established Python crawling framework Scrapling's Spiders module takes inspiration from, without Scrapling's adaptive re-parsing or stealth fetchers.
- Playwright/Puppeteer (raw) — full manual browser control, vs. Scrapling's higher-level adaptive scraping abstractions built on top.

## Pros

- BSD-3-Clause licensed, large and fast-growing community (77.1k+ stars, 7.7k+ forks)
- Adaptive parsing survives site redesigns that break selector-based scrapers
- Built-in stealth/anti-bot bypass, not a separate add-on
- Significantly faster text extraction than BeautifulSoup-based alternatives

## Cons

- Bypassing anti-bot protections can violate a target site's terms of service — check before deploying
- Browser-automation fetchers (Playwright/Chromium) add resource overhead vs. plain HTTP scraping
- Python-only — no equivalent in other languages

## Resources

- [GitHub Repository](https://github.com/D4Vinci/Scrapling)
