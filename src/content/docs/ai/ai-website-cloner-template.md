---
title: AI Website Cloner Template
description: GitHub template that has an AI coding agent recreate any website as a clean Next.js app via a multi-phase clone pipeline
order: 1
---

# AI Website Cloner Template

**[JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)**

## Overview

A GitHub template repository (not a library you `npm install`) that gives an AI coding agent a URL and has it recreate that website as a clean Next.js 16 app. Best results are with Claude Code + Opus 5, but it also supports Codex CLI, OpenCode, GitHub Copilot, Kiro, Cursor, Windsurf, Gemini CLI, Cline, Roo Code, Continue, Amazon Q, and Augment Code.

## What is it?

A pre-scaffolded Next.js project (App Router, React 19, TypeScript strict, shadcn/ui + Tailwind CSS v4) bundled with a `/clone-website` skill that runs a five-phase pipeline: reconnaissance (screenshots, design-token extraction, interaction sweep), foundation (fonts/colors/globals/assets), component specs (exact `getComputedStyle()` values written to markdown), parallel build (builder agents dispatched into separate git worktrees per section), and assembly & QA (merge, wire up, visual diff against the original). `AGENTS.md` is the single source of truth for instructions, with `CLAUDE.md`/`GEMINI.md` and per-platform skill files generated from it via sync scripts.

## Why use it?

Rebuilding a legacy or platform-locked site (WordPress/Webflow/Squarespace) into a modern, maintainable codebase is normally slow, manual work — measuring computed styles, matching breakpoints, re-extracting assets by hand. This template turns that into a scripted agent pipeline: it captures exact style values instead of letting the agent guess, and parallelizes component builds across git worktrees so a full clone doesn't run in one long serial session.

## Installation

Requires Node.js 24+ and one of the supported AI coding agents.

```bash
# 1. Click "Use this template" on GitHub — do not clone the template repo directly
git clone https://github.com/YOUR-USERNAME/YOUR-NEW-REPOSITORY.git
cd YOUR-NEW-REPOSITORY
npm install
```

## Basic Usage

```bash
claude --chrome        # start Claude Code (recommended, with browser access)
```

Then inside the agent:

```
/clone-website <target-url1> [<target-url2> ...]
```

If your client doesn't expose slash commands, ask in natural language: "Clone `<target-url>` using the clone-website workflow." Standard project scripts also apply:

```bash
npm run dev     # start dev server
npm run build   # production build
npm run check   # lint + typecheck + build
```

## Key Features

- Five-phase clone pipeline: reconnaissance → foundation → component specs → parallel build → assembly & QA
- Builder agents run in isolated git worktrees, one per section/component, for parallel throughput
- Exact computed-style extraction (not guessed CSS) feeds each builder agent's spec
- Visual diff QA step against the original site before calling the clone done
- Broad agent support (13 platforms) via a single `AGENTS.md` source-of-truth synced to platform-specific files
- Modern output stack: Next.js 16 App Router, React 19, TypeScript strict, shadcn/ui, Tailwind v4
- Docker Compose support for both production and dev-mode runs

## Top 5 Use Cases

- Migrating a site off WordPress/Webflow/Squarespace into a modern Next.js codebase
- Recovering source code for a live site whose original repo/developer is gone
- Learning how a production site achieves specific layouts, animations, or responsive behavior by studying real regenerated code
- Rapidly bootstrapping a visually-matched redesign starting point before custom iteration
- Teams standardizing a repeatable "clone → rebuild → customize" workflow across many client sites

## Comparison

This tool solves a narrow, specific problem (site-to-Next.js cloning) rather than competing with general coding agents like [Kiro](/docs/ai/kiro) or orchestrators like [agency](/docs/ai/agency) — it's a template/skill that runs on top of those agents (it explicitly lists Kiro as a supported platform). Its closest competitors are other scraping/cloning tools and website-to-code generators, not agent harnesses.

## Competitors

- **HTTrack / wget mirroring** — static HTML/asset mirroring with no component decomposition or framework output
- **v0.dev / Bolt.new / Lovable** — AI-generated UI from prompts or screenshots, but not a faithful clone-an-existing-site pipeline with computed-style extraction
- **Locofy / Anima** — Figma/design-to-code tools, closer to design handoff than live-site cloning
- **Manual dev-tools-based rebuilds** — the traditional approach this template is designed to replace

## Pros

- Free, MIT-licensed, and works with 13 different AI coding agents
- Multi-phase pipeline with explicit QA (visual diff) rather than one-shot generation
- Parallel git-worktree builds meaningfully speed up multi-component clones
- Produces a modern, maintainable stack (Next.js 16, TypeScript strict) instead of scraped HTML
- Clear ethical guardrails documented (no phishing/impersonation, respect ToS, don't infringe brand assets)

## Cons

- Best results require Claude Code + Opus 5 specifically — other agents are "supported" but may produce lower-fidelity clones
- Cloning some sites may violate their terms of service — legal/ethical review needed per target
- Next.js/React-specific output only — not useful if your target stack differs
- Template workflow (not a package), so staying current means re-pulling template updates manually
- Multi-phase, multi-worktree pipeline consumes significant agent context/tokens for larger sites

## Resources

- [GitHub Repository](https://github.com/JCodesMore/ai-website-cloner-template)
- [Demo video](https://youtu.be/O669pVZ_qr0)
