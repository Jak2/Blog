---
title: Anthropic Skills
description: Official repository of Agent Skills — folders of instructions and resources Claude loads dynamically for specialized tasks
order: 1
---

# Anthropic Skills

**[anthropics/skills](https://github.com/anthropics/skills)**

## Overview

The official Anthropic repository of Agent Skills — folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks, spanning creative, technical, document, and enterprise domains.

## What is it?

A collection of pre-built skills (creative/design, development/technical, enterprise/communication, and document manipulation for PDF/DOCX/PPTX/XLSX), plus the Agent Skills specification and a starter template for authoring new skills. Each skill is a YAML-frontmatter + Markdown folder Claude can load on demand rather than keeping every capability in context permanently.

## Why use it?

Cramming every specialized instruction set into a single system prompt bloats context and dilutes focus. Skills let Claude load only what's relevant to the task at hand, on demand — and this repo is the canonical source for both ready-to-use skills and the spec for building your own that follow the same conventions.

## Installation

```bash
# Claude Code
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

Also usable via Claude.ai (upload custom skills, paid plans) or the Claude API's Skills endpoint.

## Basic Usage

Install a skill via the plugin marketplace, then let Claude invoke it automatically when a task matches — e.g. `docx` when generating a Word document, or a technical skill when testing a web app.

## Key Features

- Creative/design, development/technical, and enterprise/communication skill categories
- Document manipulation skills for PDF, DOCX, PPTX, XLSX
- Official Agent Skills specification (`./spec/`)
- Starter template for authoring new skills (`./template/`)
- Installable via Claude Code plugin marketplace, Claude.ai, or the Skills API

## Top 5 Use Cases

1. Adding document generation/editing (Word, Excel, PowerPoint, PDF) to an agent workflow
2. Testing web apps via a technical skill instead of hand-writing test scaffolding
3. Learning the Agent Skills spec to author custom skills consistently
4. Bootstrapping enterprise communication/branding workflows in Claude
5. Extending Claude Code with domain-specific skills via the plugin marketplace

## Competitors

- **[emilkowalski/skills](/docs/webdev/emilkowalski-skills)** — narrower, animation/design-focused skill set from an independent author, vs. Anthropic's broad official catalog.
- **[taste-skill](/docs/webdev/taste-skill)** — single design-taste skill with tunable dials, a different scope than this multi-category official repo.
- **[Impeccable](/docs/webdev/impeccable)** — one deep design-review skill vs. this repo's breadth across creative, technical, and document domains.
- **[Awesome MCP Servers](/docs/ai/awesome-mcp-servers)** — community catalog of MCP tool servers, a different extension mechanism (external tools/data) than this repo's Agent Skills.
- **[Awesome LLM Apps](/docs/ai/awesome-llm-apps)** — community-driven collection of full deployable apps, vs. this repo's official, narrower skill catalog.

## Pros

- Official, canonical source — the spec other skill repos implicitly follow
- Broad category coverage (creative, technical, document, enterprise)
- Very large, active community (170k+ stars)
- Most skills Apache 2.0 licensed

## Cons

- Document skills (docx/pdf/pptx/xlsx) are source-available, not Apache 2.0 — different terms to check before certain uses
- Effectiveness depends on the host agent correctly triggering the right skill
- Broad scope means less depth per skill than a narrowly-focused third-party skill repo

## Resources

- [GitHub Repository](https://github.com/anthropics/skills)
- [Skills API docs](https://docs.claude.com/en/api/skills-guide)
