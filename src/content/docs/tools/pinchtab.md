---
title: PinchTab
description: Small Go binary giving AI agents direct, token-efficient HTTP control over Chrome — browser automation, profiles, and site audits
order: 2
---

# PinchTab

**[pinchtab/pinchtab](https://github.com/pinchtab/pinchtab)**

## Overview

PinchTab is a standalone HTTP server, written in Go, that gives AI agents direct control over Chrome. It runs as a lightweight local daemon so multiple agent tools can share the same browser control plane, instead of each agent spinning up its own browser instance.

## What is it?

A small Go binary exposing browser automation over an HTTP API (and MCP server): headless navigation, structured content extraction, headed Chrome profiles with saved auth/cookies/extensions, and whole-site audits (screenshots, console errors, broken assets, accessibility, Core Web Vitals, security findings) with visual before/after comparison. It's designed first for local, single-user use on a machine you control; remote/distributed deployments are supported but treated as advanced, operator-managed setups.

## Why use it?

Letting an agent drive a full browser through raw HTML or screenshots burns tokens fast. PinchTab exposes purpose-built tools for navigation, DOM interaction, and structured extraction so an agent gets clean, token-efficient output instead of raw page dumps — while running as a small Go binary rather than a heavyweight browser-automation framework.

## Installation

```bash
curl -fsSL https://pinchtab.com/install.sh | bash
# or
pinchtab daemon install
```

This installs the control-plane server and starts a default headless Chrome instance. On Windows, or if you don't want a daemon, run `pinchtab server` (control-plane) or `pinchtab bridge` (single browser runtime) directly. `pinchtab` alone launches an interactive CLI for setup.

## Basic Usage

1. Install and start the daemon (`pinchtab daemon install`).
2. Connect an agent skill/MCP client to the local control plane.
3. Issue natural-language browser tasks — navigation, extraction, form interaction.
4. Create headed Chrome profiles for authenticated sites (e.g. "log into my work profile and download the weekly report").
5. Run `pinchtab audit <url>` for site-level screenshots, accessibility, Core Web Vitals, and security checks, or `--sitemap` to audit a whole site.

## Key Features

- HTTP API + MCP server for browser control, tuned to minimize token usage
- Headless and headed Chrome, with named/persistent profiles (auth, cookies, extensions)
- Structured DOM extraction — no raw HTML/screenshot parsing required
- Site audits: screenshots, console errors, broken assets, accessibility score, Core Web Vitals, security findings
- Visual diffing between two site versions before a release
- Local-first security posture by default: binds to `127.0.0.1`, sensitive endpoints disabled, IDPI local-only allowlist
- Small single Go binary, no heavyweight framework dependency

## Top 5 Use Cases

- Giving a coding agent hands-on browser control for testing or scraping without token-heavy raw HTML
- Automating logged-in workflows via saved headed Chrome profiles
- Pre-release site audits: accessibility, Core Web Vitals, broken assets, security
- Visual regression comparison between site versions
- Local, single-user browser automation shared across multiple agent tools on one machine

## Competitors

- **Playwright / Puppeteer** — full browser automation libraries, more code required, no built-in agent-facing MCP surface
- **Browserless / Browserbase** — cloud browser-as-a-service, not local-first
- **Stagehand** — AI-driven browser automation framework, higher-level but heavier dependency footprint

Complements rather than competes with [Wigolo](/docs/ai/wigolo): wigolo covers web search/fetch/crawl/research, PinchTab covers direct interactive browser control (clicking, typing, authenticated sessions, audits). An agent stack can reasonably use both.

## Pros

- Small, fast Go binary — no heavy runtime dependency
- Token-efficient structured output instead of raw HTML/screenshots
- Local-first security defaults (loopback bind, disabled sensitive endpoints, local-only browsing allowlist)
- Built-in site audit and visual-diff tooling beyond basic automation
- Apache 2.0 licensed

## Cons

- Explicitly not designed for multi-tenant or public-internet exposure without careful hardening
- Remote/distributed deployments are advanced, operator-managed setups — not turnkey
- Newer project relative to Playwright/Puppeteer, smaller community and ecosystem
- Requires understanding its security model before exposing beyond localhost

## Resources

- [GitHub Repository](https://github.com/pinchtab/pinchtab)
- [Documentation](https://pinchtab.com/docs)
- [Security Guide](https://github.com/pinchtab/pinchtab/blob/main/docs/guides/security.md)
