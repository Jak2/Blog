---
title: LobeHub
description: Open-source AI agent operations platform for hiring, scheduling, and running a team of AI agents ("Chief Agent Operator")
order: 1
---

# LobeHub

**[lobehub/lobehub](https://github.com/lobehub/lobehub)**

## Overview

LobeHub (formerly best known as an open-source AI chat/agent UI, "Lobe Chat") has repositioned itself as a "Chief Agent Operator" platform — a work-and-lifestyle space for hiring, scheduling, and getting reports from a team of AI agents, rather than a single chat window. It treats "agents as the unit of work" and provides infrastructure for humans and agents to collaborate continuously (7x24), not just in one-off conversations.

## What is it?

A self-hostable (Vercel, Docker, Zeabur, Sealos, Alibaba Cloud) TypeScript platform combining: an agent "Operator" for hiring/scheduling/reporting on agent work, agent creation tools, collaboration/network features for multi-agent teamwork, and an evolving memory/context layer so agents retain state across sessions instead of resetting per conversation. It still functions as a rich multi-model AI chat interface underneath, with a plugin ecosystem.

## Why use it?

Most chat UIs treat each conversation as disposable — no persistent context, no scheduling, no delegation across a team of agents. LobeHub's pitch is infrastructure for running agents more like employees: assign them recurring work, keep them online without you being online, and get reports back, while still supporting the underlying multi-model chat experience developers already use LobeHub/Lobe Chat for.

## Installation

**One-click deploy:** Vercel, Zeabur, Sealos, or Alibaba Cloud (fork the repo first, see README for exact buttons/links).

**Docker:**

```bash
# see README's "Deploying with Docker" section for the current compose/run command
```

**Local development:**

```bash
git clone https://github.com/lobehub/lobehub.git
cd lobehub
# see README for pnpm install / dev commands
```

Requires an OpenAI (or compatible) API key at minimum, configurable via environment variables; many other model providers are supported.

## Basic Usage

1. Deploy or self-host the platform.
2. Configure at least one model provider API key via environment variables.
3. Use the Operator view to define agents, schedule recurring work, and review reports.
4. Chat directly with individual agents/models as needed, using the plugin ecosystem for extended capabilities.
5. Scale up to multi-agent collaboration workflows as your usage grows.

## Key Features

- Operator: hire, schedule, and get reports from AI agents without staying online
- Agent creation tools treating "agents as the unit of work"
- Multi-agent collaboration/network features
- Persistent memory/context layer for agent continuity across sessions
- Multi-model chat support with a broad plugin ecosystem
- Multiple self-hosting options: Vercel, Docker, Zeabur, Sealos, Alibaba Cloud
- Active ecosystem of related "More Products" from the same team

## Top 5 Use Cases

- Running recurring/scheduled AI agent tasks without manual prompting each time
- Self-hosted alternative to closed multi-agent orchestration platforms
- Teams wanting a shared, persistent AI chat/agent workspace instead of per-person disposable chats
- Developers who want a pluggable multi-model chat UI and are willing to grow into its agent-operations features
- Organizations standardizing on one self-hosted front end for multiple LLM providers

## Competitors

- **[MaxKB](/docs/ai/maxkb)** — narrower focus on RAG/knowledge-base chatbots and enterprise workflow automation rather than multi-agent "operations"
- **[SurfSense](/docs/ai/surfsense)** — narrower focus on live web research connectors and a NotebookLM-style knowledge base, not general agent scheduling/operations
- **Open WebUI** — simpler, more chat-focused self-hosted UI without the agent-operations layer
- **Dify** — workflow/agent-building platform with a more visual, low-code orchestration focus
- **AutoGen / CrewAI** — code-first multi-agent orchestration frameworks rather than a hosted UI/platform

## Pros

- Large, active open-source community (very high star count, frequent releases)
- Multiple self-hosting deployment options
- Broad multi-model and plugin support inherited from its chat-UI roots
- Ambitious agent-operations direction beyond a plain chat UI

## Cons

- License is not a standard permissive OSS license per GitHub metadata (reported as unassigned/NOASSERTION) — check exact terms before commercial use
- Rapidly evolving product direction (rebrand from chat UI to "agent operator") means docs/features may shift quickly
- Broader scope than a simple self-hosted chat app, which raises operational complexity for teams that just want chat
- Newer "Operator" agent-scheduling features are less battle-tested than the long-standing chat functionality

## Resources

- [GitHub Repository](https://github.com/lobehub/lobehub)
- [Official Site](https://lobehub.com)
- [Documentation](https://lobehub.com/docs)
