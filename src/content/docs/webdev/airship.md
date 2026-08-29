---
title: Airship
description: Visual editor that connects to your dev server so AI coding agents can edit UI from the browser
order: 1
---

# Airship

**[0xnyn/airship](https://github.com/0xnyn/airship)**

![Stars](https://img.shields.io/github/stars/0xnyn/airship?style=flat-square) ![License](https://img.shields.io/github/license/0xnyn/airship?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/0xnyn/airship?style=flat-square)

## Overview

Airship is a visual editor that sits in front of your running dev server as a reverse proxy, letting you select UI elements in the browser and hand off change requests to an AI coding agent — which edits your source code directly, without you leaving the page.

## What is it?

A zero-config proxy (no plugins, no build changes) offering a multi-device canvas (desktop and mobile frames live and editable side-by-side from one source), inspector panels for element properties/CSS/DOM navigation, and two view modes — a pannable infinite canvas or inline overlay. It integrates with Claude Code, Codex, and OpenCode agents (switchable), keeps file history for undo across all agents, and has a `--safe` flag confining edits to the project directory and blocking dangerous commands.

## Why use it?

Describing a UI change in words and waiting for an agent to guess the right element is slower than pointing at it. Airship closes that loop — click the element, describe the change, the agent edits the real source file — while staying framework-agnostic (Vite, Next, Remix, Rails, etc.) since it just proxies your existing dev server.

## Installation

```bash
npx @airshiplabs/cli --target 3000
# or globally:
npm i -g @airshiplabs/cli
airship --target 3000
```

Requires Node.js 22.13+.

## Basic Usage

Point Airship at your dev server's port, open the proxied URL, select an element in the canvas or inline view, and describe the change — the connected agent (Claude Code, Codex, or OpenCode) applies it directly to source.

## Key Features

- Zero-config reverse proxy — no plugins or build changes
- Multi-device canvas: desktop + mobile frames, live and editable from one source
- Agent integration with Claude Code, Codex, OpenCode — switchable mid-session
- Inspector panels: element properties, CSS rules, DOM tree navigation
- Undo support via maintained file history across all agents
- Canvas (pannable infinite workspace) or inline (overlaid) view modes
- `--safe` flag confines edits to project directory, blocks dangerous commands

## Top 5 Use Cases

1. Rapid UI iteration with an AI agent while staying in the browser
2. Responsive design testing across desktop/mobile simultaneously
3. Pointing an agent at a specific element instead of describing it in text
4. Keeping AI-generated code changes synchronized with the real codebase
5. Framework-agnostic visual editing (Vite, Next, Remix, Rails, etc.)

## Competitors

- Browser DevTools + manual editing — direct control but no AI hand-off; Airship adds the agent-edit loop on top.
- Framework-specific visual editors (e.g. builder.io style tools) — often tied to one stack/CMS, vs. Airship's zero-config, framework-agnostic proxy approach.

## Pros

- MIT licensed, active community (620+ stars, 70+ forks)
- Zero configuration — works via proxy, no project changes needed
- Multi-agent support with mid-session switching and unified undo
- `--safe` flag adds a guardrail for agent-driven edits

## Cons

- Requires a running dev server and a supported coding agent already set up
- Reverse-proxy approach may not suit every framework's dev-server setup out of the box
- Newer, smaller project than established DevTools-based workflows

## Resources

- [GitHub Repository](https://github.com/0xnyn/airship)
