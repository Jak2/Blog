---
title: Impeccable
description: Command-driven design guidance system for AI coding agents, with deterministic anti-pattern detection
order: 1
---

# Impeccable

**[pbakaus/impeccable](https://github.com/pbakaus/impeccable)**

## Overview

Impeccable is a design guidance system for AI coding agents that builds on Anthropic's frontend-design skill, giving agents a structured, command-driven workflow to audit, polish, and critique generated interfaces instead of producing common "AI slop" patterns.

## What is it?

A single skill exposing 23 commands via `/impeccable` — including `audit`, `polish`, `critique`, `animate`, and `distill` — backed by 59 deterministic detector rules that catch design anti-patterns without needing an API key. A one-time `/impeccable init` setup documents product context and brand/design preferences into `PRODUCT.md` and `DESIGN.md`, which subsequent commands reference. Also supports live browser iteration for real-time visual refinement.

## Why use it?

Generic AI-generated interfaces tend to repeat the same tells — purple gradients, overused fonts, dated animation patterns. Impeccable's deterministic detectors catch these without relying on another model call, and its `PRODUCT.md`/`DESIGN.md` setup gives every subsequent command persistent project context instead of re-explaining brand/design preferences each session.

## Installation

Five install methods are supported; the CLI installer is recommended:

```bash
npx impeccable install
```

Also available as a git submodule (team vendoring), via the Claude Code / Grok Build plugin marketplace, as a ZIP from impeccable.style, or by manual file copy.

## Basic Usage

```bash
/impeccable init      # one-time: document product/brand context
/impeccable audit      # find design anti-patterns
/impeccable polish      # refine visual details
/impeccable critique   # structured design review
```

## Key Features

- Single skill, 23 commands (`audit`, `polish`, `critique`, `animate`, `distill`, and more)
- 59 deterministic detector rules — no API key required for anti-pattern detection
- `PRODUCT.md`/`DESIGN.md` persistent project context via `/impeccable init`
- Live browser iteration for real-time visual refinement
- Integrates with Claude Code, GitHub Copilot, Cursor, Codex, and Grok Build

## Top 5 Use Cases

1. Full design-review passes on agent-generated frontend work
2. Accessibility and performance auditing alongside visual critique
3. Establishing and enforcing a consistent design system across a project
4. Correcting recurring "AI slop" patterns (purple gradients, generic fonts, dated animation)
5. Live, in-browser visual refinement during active development

## Competitors

- **[taste-skill](/docs/webdev/taste-skill)** — lighter, dial-based (`DESIGN_VARIANCE`/`MOTION_INTENSITY`/`VISUAL_DENSITY`) approach vs. Impeccable's deeper command system and deterministic detectors.
- **emilkowalski/skills** — narrower animation-only focus vs. Impeccable's full design-review scope (accessibility, performance, visual critique).

## Pros

- Apache 2.0 licensed, very large community (57.7k+ stars)
- Deterministic detectors work without an extra API call
- Persistent project context (`PRODUCT.md`/`DESIGN.md`) avoids re-explaining preferences every session
- Multi-tool support (Claude Code, Copilot, Cursor, Codex, Grok Build)

## Cons

- 23-command surface is a larger learning curve than a single-trigger skill
- Setup step (`/impeccable init`) required before getting full value
- Builds on Anthropic's frontend-design skill — some overlap/dependency on that base

## Resources

- [GitHub Repository](https://github.com/pbakaus/impeccable)
- [impeccable.style](https://impeccable.style)
