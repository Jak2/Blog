---
title: Agent Browser
description: Rust-native browser automation CLI built for AI agents, with MCP server mode
order: 1
---

# Agent Browser

**[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)**

## Overview

A command-line browser automation tool built specifically for AI agents rather than human-written test suites. Runs as a Rust daemon, controlling a real browser via deterministic "ref" identifiers instead of fragile CSS/XPath selectors.

## What is it?

A CLI (and MCP server) that wraps browser control — navigation, clicking, form-filling, screenshots, network interception, cookie/storage management — behind commands designed for LLM tool-calling. A "snapshot with refs" command returns the page's interactive elements tagged with short IDs (`@e1`, `@e2`) that an agent can target directly, instead of the agent having to write its own selectors from a screenshot or raw DOM dump.

## Why use it?

Agents driving Playwright/Puppeteer directly tend to fumble selectors and burn tokens parsing full DOM/accessibility trees. agent-browser's ref-based snapshots are built to be LLM-cheap and deterministic, and its daemon persists browser state between CLI invocations (auto-shutting down after an hour idle) so an agent doesn't pay startup cost on every command.

## Installation

```bash
npm install -g agent-browser
agent-browser install
# or: brew install agent-browser
# or: cargo install agent-browser
```

## Basic Usage

```bash
agent-browser navigate https://example.com
agent-browser snapshot          # returns refs for interactive elements
agent-browser click @e3
agent-browser screenshot out.png
```

Can also run as an MCP server so agents (Claude Code, etc.) call it as a tool directly instead of shelling out.

## Key Features

- Ref-based element selection (`@e1`, `@e2`) tuned for LLM token efficiency
- Daemon architecture — persists browser state across commands, auto-idles after 1 hour
- MCP server mode for direct agent tool integration
- Multi-provider: local Chrome, Browserbase, Browserless, Browser Use, Kernel, AgentCore, iOS Simulator
- Network interception, cookie/storage/auth-state management (with optional encryption)
- Accessibility auditing, React introspection, Web Vitals metrics

## Top 5 Use Cases

1. Giving a coding agent hands-on browser control (via MCP) to test a web app it just built
2. Scraping/extracting data from sites without hand-writing selectors per site
3. Running browser automation in CI/agent pipelines without a Node.js runtime dependency
4. Auditing accessibility or Web Vitals as part of an agent-driven QA loop
5. Running against cloud browser providers (Browserbase, Kernel) for scaled/headless agent workflows

## Competitors

- **Playwright / Puppeteer** — the underlying primitives most agents wrap directly; agent-browser adds the LLM-friendly ref/snapshot layer and daemon on top, at the cost of an extra dependency.
- **Selenium** — older, broader browser support, but no agent-specific ergonomics.
- **Cypress** — testing-framework focused, not built for ad hoc agent-driven browsing.
- **BrowserStack** and similar cloud providers — agent-browser can target some of these as backends rather than replacing them outright.

## Pros

- Rust daemon — fast, no Node.js required at runtime
- Deterministic refs reduce selector flakiness for agent-driven interaction
- MCP-native, drops straight into Claude Code and similar tools
- Broad backend support (local + several cloud browser providers)
- Apache-2.0, large and active (40k+ stars)

## Cons

- Another moving part/dependency versus agents just calling Playwright directly
- Daemon architecture adds a background process to reason about (idle timeout, restarts)
- Newer project — smaller community troubleshooting surface than Playwright/Selenium

## Resources

- [GitHub Repository](https://github.com/vercel-labs/agent-browser)
