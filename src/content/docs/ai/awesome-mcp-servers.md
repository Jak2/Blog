---
title: Awesome MCP Servers
description: Curated directory of Model Context Protocol servers for extending LLM/agent tool capabilities
order: 1
---

# Awesome MCP Servers

**[punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)**

![Stars](https://img.shields.io/github/stars/punkpeye/awesome-mcp-servers?style=flat-square) ![License](https://img.shields.io/github/license/punkpeye/awesome-mcp-servers?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/punkpeye/awesome-mcp-servers?style=flat-square)

## Overview

Awesome MCP Servers is a curated, community-maintained directory of Model Context Protocol (MCP) servers — the standard way to give Claude and other AI systems structured access to external tools, data, and APIs.

## What is it?

A categorized list of MCP server implementations (databases, browsers, file systems, SaaS integrations, dev tools, and more), maintained through active community pull requests and mirrored as a searchable registry at glama.ai/mcp/servers. Available in multiple language translations (Japanese, Korean, Portuguese, Thai, Chinese, Farsi).

## Why use it?

MCP's whole point is standardized tool access, but discovering which server already covers a given integration — a database, a SaaS API, a browser — means searching scattered repos otherwise. This list centralizes that discovery so you connect an existing server instead of writing a new one from scratch.

## Installation

N/A — it's a curated list, not an installable package. Browse the README or the glama.ai registry, then install the specific MCP server you need per its own instructions.

## Basic Usage

Search the list (or glama.ai/mcp/servers) for the integration you need, then follow that server's own install/config instructions to connect it to Claude Code, Claude Desktop, or another MCP-compatible client.

## Key Features

- Categorized directory spanning databases, browsers, file systems, SaaS, dev tools
- Mirrored as a searchable registry at glama.ai/mcp/servers
- Multi-language translations (Japanese, Korean, Portuguese, Thai, Chinese, Farsi)
- Very active community maintenance (thousands of PRs)

## Top 5 Use Cases

1. Finding an existing MCP server before building a custom integration
2. Extending Claude or another AI system with external tool/data access
3. Discovering what's possible with MCP across categories
4. Building AI workflows that need specialized third-party integrations
5. Contributing a new MCP server and getting it discovered

## Competitors

- [Anthropic Skills](/docs/ai/anthropic-skills) — official Agent Skills catalog, a different extension mechanism (skills vs. MCP servers) for extending Claude.
- Official MCP servers repo (modelcontextprotocol/servers) — Anthropic's own reference implementations, narrower than this community-wide catalog.

## Pros

- Very large, extremely active community (93.1k+ stars, 15.2k+ forks)
- MIT licensed
- Multi-language accessibility
- Backed by a searchable registry (glama.ai), not just a static README

## Cons

- A list, not a vetting body — server quality/maintenance varies per entry
- No centralized security review of listed servers before connecting them to an agent
- Fast-moving MCP ecosystem means some entries can lag behind protocol changes

## Resources

- [GitHub Repository](https://github.com/punkpeye/awesome-mcp-servers)
- [glama.ai/mcp/servers](https://glama.ai/mcp/servers)
