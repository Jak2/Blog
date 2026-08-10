---
title: Kiro
description: Amazon/AWS agentic IDE and CLI for spec-driven development, agent hooks, and natural-language coding
order: 1
---

# Kiro

**[kirodotdev/Kiro](https://github.com/kirodotdev/Kiro)**

## Overview

Kiro is Amazon's agentic IDE and companion CLI, built to take a project "from prototype to production" using spec-driven development rather than open-ended chat. It ships as both a standalone desktop application (macOS, Windows, Linux) and a command-line interface, backed by AWS.

## What is it?

An IDE/CLI pair centered on turning natural-language prompts into structured specs — requirements broken into implementation plans the agent then executes. Around that core sit hooks (automated triggers on file changes/dev events), steering files (markdown rules that shape agent behavior per project), MCP server support, and "Powers" (on-demand specialized context/tools for agents). It supports one-click migration of VS Code extensions and settings.

## Why use it?

Kiro targets teams who want AI coding assistance to produce reviewable, structured plans instead of unstructured diffs — the spec step forces intent to be written down before code changes happen. Its steering + hooks combo also gives repeatable, project-specific automation without hand-writing new tooling each time. Being AWS-backed means enterprise security/privacy claims and paid AWS support are available.

## Installation

- **IDE:** Download the desktop app directly from [kiro.dev](https://kiro.dev)
- **CLI:** Follow the install instructions at [kiro.dev/cli](https://kiro.dev/cli)

## Basic Usage

1. Install the IDE or CLI and complete the first-project walkthrough.
2. Set up steering files for project-specific guidance.
3. Write a spec describing a feature; Kiro breaks it into a structured implementation plan.
4. Configure hooks to run automatically on file-change/dev events.
5. Connect MCP servers for external tool/data access.
6. Optionally migrate existing VS Code extensions/settings in one click.

## Key Features

- Specs: natural-language prompts turned into structured requirements + implementation plans
- Hooks: automated triggers on file changes and dev events
- Agentic Chat: full-project-context conversational coding
- Steering: markdown-based custom rules guiding agent behavior
- MCP server support for external tools/data
- Powers: on-demand specialized context/tools for agents
- Desktop app (macOS/Windows/Linux) + CLI, with one-click VS Code migration

## Top 5 Use Cases

- Spec-first feature development where a written plan is required before code changes
- Automating repetitive dev tasks (linting, formatting, doc updates) via hooks
- Onboarding a codebase-context-aware agent for teams already using VS Code
- Enterprise teams wanting AWS-backed support/security guarantees for AI coding tools
- CI/CD or scripted workflows via the Kiro CLI

## Comparison

Kiro and [Kiro Crew](/docs/ai/kirocrew) are both from the `kirodotdev` org and are complementary rather than competing: Kiro is the IDE/CLI that does the actual editing and spec-to-code work per session, while Kiro Crew is a separate, persistent Gateway/workspace layer (self-learning, schedules, multi-surface access via Slack/Discord/CLI) that runs Kiro CLI underneath for long-running, unattended, or multi-session work. Kiro Crew's own docs describe every install path as running on `kiro-cli`.

## Competitors

- **[agents-cli](/docs/ai/agents-cli)** (Google) — not a competing IDE; a skills/CLI layer that makes any coding agent (including Kiro) better at building Google Cloud agents specifically
- **[agency](/docs/ai/agency)** — a lighter-weight, agent-agnostic CLI orchestrator (works with Claude Code, Codex CLI, Gemini CLI, OpenCode) rather than an IDE with its own model/spec workflow
- **Cursor** — AI-native code editor with inline chat/composer, no spec-driven workflow by default
- **Windsurf** — AI-native IDE with "Cascade" agentic flows, closer competitor in UX approach
- **GitHub Copilot / Copilot Workspace** — spec-like workspace features exist but less structured than Kiro's spec system
- **Claude Code** — terminal-first agent without a dedicated IDE or spec-plan structure

## Pros

- Spec-driven workflow gives a reviewable plan before code changes land
- Steering + hooks provide durable, project-specific automation
- Backed by AWS with enterprise support and security posture
- Available as both IDE and CLI, fitting different workflows
- One-click VS Code settings/extension migration lowers switching cost

## Cons

- No LICENSE file in the repo — unclear open-source licensing terms for the core product
- Tied to AWS/Amazon account and support infrastructure, which may not suit non-AWS shops
- Windows/Linux desktop support trails macOS in some feature rollouts historically for IDE forks in this space
- Newer spec-driven paradigm has a learning curve versus plain chat-based assistants
- Billing/support routed through AWS Support, which can be heavier process than a simple subscription

## Resources

- [GitHub Repository](https://github.com/kirodotdev/Kiro)
- [kiro.dev](https://kiro.dev)
- [Kiro CLI docs](https://kiro.dev/cli)
