---
title: OpenHands
description: Self-hosted developer control center for running and automating coding agents across local, remote, and cloud backends
order: 1
---

# OpenHands

**[OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)**

![Stars](https://img.shields.io/github/stars/OpenHands/OpenHands?style=flat-square) ![License](https://img.shields.io/github/license/OpenHands/OpenHands?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/OpenHands/OpenHands?style=flat-square)

## Overview

OpenHands is a self-hosted developer control center for running and automating coding agents — a single place to run agents locally or across distributed backends, and manage scheduled/event-triggered automations wired into tools like Slack and GitHub.

## What is it?

A platform supporting any Agent-Client Protocol (ACP)-compatible agent — OpenHands' own, Claude Code, Codex, Gemini, or others — running on laptops, dedicated machines, VMs, or cloud infrastructure with the LLM of your choice. It handles multi-backend switching (local/remote/cloud), automation workflows (scheduled tasks, event-triggered runs) integrated with third-party services, and a TypeScript/React frontend over a Python Agent Server SDK backend.

## Why use it?

Running one coding agent interactively is straightforward; running many agents persistently, on a schedule, triggered by GitHub/Slack events, across a team's infrastructure is not. OpenHands is built for that operational layer — self-hosted so you control the backend and LLM choice, and agent-agnostic so you're not locked into one agent implementation.

## Installation

```bash
# NPM
npm install -g @openhands/agent-canvas

# Docker
docker run ghcr.io/openhands/agent-canvas:1.16.0

# From source
git clone https://github.com/OpenHands/OpenHands
npm install && npm run dev
```

## Basic Usage

Deploy OpenHands on your chosen backend (local, VM, or cloud), connect an ACP-compatible agent and your LLM of choice, then configure scheduled or event-triggered automations (e.g. a GitHub issue triggers a decomposition task, a Slack command triggers a report).

## Key Features

- Multi-backend: switch between local, remote, and cloud agent environments
- Agent-agnostic via Agent-Client Protocol — OpenHands, Claude Code, Codex, Gemini, others
- Scheduled and event-triggered automation workflows
- Self-hosted on laptops, dedicated machines, VMs, or cloud
- Bring-your-own LLM
- Integrations with Slack, GitHub, and other third-party services

## Top 5 Use Cases

1. Automating code review and dependency updates across a team
2. Decomposing GitHub issues into agent-executable tasks
3. Scheduled/event-triggered agent runs (e.g. nightly reports to Slack)
4. Running persistent coding agents across team infrastructure
5. Self-hosting agent orchestration to keep LLM/backend choice flexible

## Competitors

- [DeerFlow](/docs/ai/deer-flow) — similar long-horizon agent orchestration harness, DeerFlow leans more toward research/content workflows vs. OpenHands' developer-automation focus.
- GitHub Actions + custom scripts — more manual assembly required, vs. OpenHands' purpose-built agent automation layer.

## Pros

- MIT licensed, very large community (85.6k+ stars, 11.2k+ forks)
- Agent-agnostic — not locked to one coding agent implementation
- Self-hosted with full backend/LLM control
- Built-in automation triggers, not just interactive agent sessions

## Cons

- Multi-backend, self-hosted setup carries real operational overhead
- Requires an ACP-compatible agent — non-compatible agents need adaptation
- Automation workflows need careful scoping to avoid unintended agent actions on live systems

## Resources

- [GitHub Repository](https://github.com/OpenHands/OpenHands)
