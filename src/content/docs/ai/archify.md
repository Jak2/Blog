---
title: Archify
description: AI agent skill that turns codebases and system descriptions into interactive architecture diagrams
order: 1
---

# Archify

**[tt-a1i/archify](https://github.com/tt-a1i/archify)**

![Stars](https://img.shields.io/github/stars/tt-a1i/archify?style=flat-square) ![License](https://img.shields.io/github/license/tt-a1i/archify?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/tt-a1i/archify?style=flat-square)

## Overview

Archify is an agent skill that turns a codebase or system description into interactive, polished diagrams — rendered as self-contained HTML artifacts right inside an AI agent chat interface, covering architecture, workflows, sequences, data flows, and lifecycles.

## What is it?

A skill installable into Cursor, Claude Code, Codex CLI, OpenCode, and Raven that compiles a typed JSON intermediate representation into five diagram types (Architecture, Workflow, Sequence, Data Flow, Lifecycle) with search, upstream/downstream trace, route probing, semantic-role comparison, and guided "story" playback. It supports Architecture Delta (Before/Delta/After comparison for design review), exports to PNG/SVG/WebM and 1200×630 share cards, dark/light themes with finite motion, and evidence-backed nodes that link to Git-verified source files.

## Why use it?

Explaining a system's architecture in prose forces the reader to mentally reconstruct the diagram anyway. Archify generates that diagram directly from the codebase with deterministic, reproducible output (typed JSON IR) and source-verified nodes — so the picture stays traceable back to real files rather than being hand-drawn and quickly stale.

## Installation

```bash
npx skills add tt-a1i/archify -g
```

Also installable via DSH (DeepSeek Harness), an agent-aware Cursor quick start, or manual ZIP extraction for Raven.

## Basic Usage

Install the skill, then ask the connected agent to diagram a repo, workflow, or system description — Archify compiles it to the chosen diagram type and renders an interactive, exportable HTML artifact in the chat.

## Key Features

- Five diagram types: Architecture, Workflow, Sequence, Data Flow, Lifecycle
- Interactive exploration: node search, upstream/downstream trace, route probing, semantic-role comparison, guided story playback
- Architecture Delta: Before/Delta/After comparison for design review
- Export to PNG, SVG, WebM, and 1200×630 share cards
- Typed JSON IR for deterministic, reproducible compilation
- Dark/light themes with finite motion and built-in brand marks
- Evidence-backed nodes linking to Git-verified source files

## Top 5 Use Cases

1. Visualizing runtime architecture straight from a repository
2. Documenting CI/CD workflows and approval processes
3. Explaining API call sequences and cache/fallback patterns
4. Mapping data pipelines with lineage and PII boundaries
5. Design review via Before/After architecture comparison

## Competitors

- Mermaid/PlantUML — hand-authored diagram syntax, lighter weight but no source-verification or interactive exploration.
- Manual whiteboarding/Excalidraw — full creative control, but no auto-generation from actual code or Git-verified accuracy.
- **[GitNexus](/docs/ai/gitnexus)** — queryable knowledge graph with MCP tools for agent-driven impact analysis, vs. Archify's visual diagram generation.

## Pros

- MIT licensed, very large community (30.5k+ stars, 1.9k+ forks)
- Source-verified nodes keep diagrams traceable to real files, not hand-drawn guesses
- Five diagram types cover architecture through lifecycle/state, not just static structure
- Multiple export formats including share-ready cards

## Cons

- Output quality depends on how well the connected agent reads the target codebase
- Skill-based install ties it to supported agent hosts (Cursor, Claude Code, Codex CLI, OpenCode, Raven)
- Deterministic JSON IR compilation adds a step vs. freehand diagramming tools

## Resources

- [GitHub Repository](https://github.com/tt-a1i/archify)
