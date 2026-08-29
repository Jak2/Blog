---
title: Instatic
description: Self-hosted CMS combining a visual canvas editor, content engine, and static-file publisher
order: 1
---

# Instatic

**[corebunch/instatic](https://github.com/corebunch/instatic)**

![Stars](https://img.shields.io/github/stars/corebunch/instatic?style=flat-square) ![License](https://img.shields.io/github/license/corebunch/instatic?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/corebunch/instatic?style=flat-square)

## Overview

Instatic is a self-hosted, open-source CMS that bundles a visual canvas editor, content engine, and publisher into one app — generating clean, semantic static HTML instead of shipping a heavy framework runtime.

## What is it?

A Bun/TypeScript application with a React 19 admin UI (Vite, Zustand, CodeMirror, dnd-kit) offering a real-time multi-breakpoint canvas editor with live mode, design tokens/fluid typography via its Core Framework, a universal content data model with custom collections and editorial workflows, built-in forms storing submissions in your own database, an AI agent that edits pages from natural-language descriptions, and a sandboxed QuickJS-WASM plugin system with per-plugin permission grants. Publishing bakes pages to static files with in-memory caching for dynamic routes; storage is SQLite or Postgres.

## Why use it?

Most page-builder SaaS tools lock content behind a vendor platform and charge per-tier. Instatic is MIT-licensed with no open-core split, self-hosted, and outputs plain semantic HTML/CSS rather than a JS framework bundle — while still giving non-technical editors a visual canvas, forms, and an AI agent for natural-language edits.

## Installation

```bash
git clone https://github.com/corebunch/instatic.git
cd instatic
bun install
bun run dev
```

Opens at `http://localhost:5173`. One-click Railway deploys for SQLite (single-site) or Postgres (multi-author); Docker, Render, and VPS guides also provided.

## Basic Usage

Run locally or deploy, then build pages in the visual canvas editor, define custom content collections for structured data, and publish — Instatic bakes the result to static HTML with dynamic routes served from an in-memory cache.

## Key Features

- Real-time multi-breakpoint visual canvas editor with live mode
- Core Framework: design tokens, fluid typography, spacing scales
- Universal content data model with custom collections and editorial workflows
- Built-in forms with submissions stored in your own database
- AI agent that edits pages via natural-language instructions
- Sandboxed plugin system (QuickJS-WASM) with explicit per-plugin permissions
- Access control: 38 capabilities, TOTP 2FA, audit logging
- Static-file publishing with in-memory caching for dynamic routes

## Top 5 Use Cases

1. Blogs and portfolio sites needing a visual editor without SaaS lock-in
2. Small business websites with editorial/forms needs
3. Multi-author publications with granular access control
4. Privacy-focused, self-hosted alternative to hosted page builders
5. Custom content workflows via the plugin system and universal data model

## Competitors

- WordPress — much larger plugin ecosystem, but heavier runtime and more historical security surface vs. Instatic's static-output, sandboxed-plugin design.
- Webflow — polished hosted visual builder, but closed-source/SaaS vs. Instatic's self-hosted MIT codebase.
- Astro/Eleventy (static site generators) — code-first static output without a built-in visual editor or CMS admin, vs. Instatic's all-in-one editor+CMS.

## Pros

- MIT licensed, no open-core tiers, sizable community (8.2k+ stars, 753+ forks)
- Static HTML output — fast, low attack surface, no framework runtime to serve
- Sandboxed plugin permissions and granular access control (38 capabilities, 2FA, audit log)
- Self-hosted with one-click Railway deploy and Docker/Render/VPS options

## Cons

- Bun-based — less mainstream tooling/hosting support than Node
- Newer project (1,125 commits) — smaller plugin ecosystem than WordPress
- AI page-editing agent depends on configured LLM provider/API access

## Resources

- [GitHub Repository](https://github.com/corebunch/instatic)
