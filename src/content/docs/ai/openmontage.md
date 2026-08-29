---
title: OpenMontage
description: Agentic video production system that turns AI coding assistants into full video studios, end to end
order: 1
---

# OpenMontage

**[calesthio/OpenMontage](https://github.com/calesthio/OpenMontage)**

![Stars](https://img.shields.io/github/stars/calesthio/OpenMontage?style=flat-square) ![License](https://img.shields.io/github/license/calesthio/OpenMontage?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/calesthio/OpenMontage?style=flat-square)

## Overview

OpenMontage is an open-source, agentic video production system that turns an AI coding assistant into a full video studio — describe what you want in plain language, and the agent handles research, scripting, asset generation, editing, and final composition.

## What is it?

An agent-first system (no code orchestrator — the AI assistant reads pipeline manifests and skill files to orchestrate work itself) offering 12 production pipelines (explainers, talking heads, documentaries, animations, trailers, and more), 100+ integrated tools spanning video/image generation, TTS, and music, and 60+ provider integrations (cloud APIs like Kling/Runway/Google Veo, local models like WAN/Hunyuan, and free stock sources). It supports reference-driven creation (paste a video, get differentiated variants in that style), a real-footage documentary path using free archives without paid video generation, live web research built into the pipeline before scripting, production governance (quality gates, provider scoring, budget controls, audit trails), and a live "Backlot" board showing production stages and approval checkpoints in real time.

## Why use it?

Producing a finished video with AI tools today usually means manually stitching together separate generation, TTS, and editing tools yourself. OpenMontage puts an agent in charge of that whole pipeline — research through final composition — with governance controls (budget, quality gates, audit trail) so the automation stays accountable rather than a black box burning API credits.

## Installation

```bash
git clone https://github.com/calesthio/OpenMontage.git
cd OpenMontage
make setup
```

Manual setup available for systems without `make`.

## Basic Usage

Describe the video you want in plain language to a supported agent (Claude Code, Cursor, GitHub Copilot, Codex, Windsurf), select a production pipeline, and let the agent run research, scripting, asset generation, and composition — reviewing progress on the Backlot live board.

## Key Features

- 12 production pipelines: explainers, talking heads, documentaries, animations, trailers, more
- 100+ integrated tools for video/image generation, TTS, and music
- 60+ provider integrations: cloud APIs, local models, free stock sources
- Reference-driven creation from a pasted example video
- Real-footage documentary path using free archives
- Live web research built into the pre-script phase
- Production governance: quality gates, provider scoring, budget controls, audit trails
- Real-time Backlot board for production stage/approval visibility

## Top 5 Use Cases

1. Educational explainer and tutorial video generation
2. Product marketing and launch teaser production
3. Podcast repurposing into short-form clip factories
4. Documentary montages using free/open archival footage
5. Multi-language localization and dubbing of existing content

## Competitors

- [Archify](/docs/ai/archify)/[OpenDesign](/docs/ai/open-design) — HyperFrames-style HTML-to-video motion graphics is one output mode OpenDesign offers, narrower than OpenMontage's full end-to-end agentic video studio.
- Manual video editing suites (Premiere/DaVinci) — full creative control, but no agent-driven research-to-composition automation.

## Pros

- Very large community (53.9k+ stars, 6.7k+ forks)
- End-to-end agent orchestration — not just a single generation step
- Broad provider flexibility (60+ integrations) avoids lock-in to one video-gen vendor
- Governance controls (budget, quality gates, audit trail) for accountable automation

## Cons

- AGPLv3 license — copyleft with commercial-use restrictions to review before productizing
- Many integrated cloud providers (Kling, Runway, Veo) mean real ongoing API costs at scale
- Agent-first, no-code-orchestrator design means debugging a failed pipeline requires understanding the manifest/skill-file structure

## Resources

- [GitHub Repository](https://github.com/calesthio/OpenMontage)
