---
title: DeerFlow
description: Open-source super agent harness for long-horizon research, coding, and content tasks built on LangGraph
order: 1
---

# DeerFlow

**[bytedance/deer-flow](https://github.com/bytedance/deer-flow)**

![Stars](https://img.shields.io/github/stars/bytedance/deer-flow?style=flat-square) ![License](https://img.shields.io/github/license/bytedance/deer-flow?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/bytedance/deer-flow?style=flat-square)

## Overview

DeerFlow is a ByteDance-built open-source "super agent" harness for AI agents that need to handle complex, long-horizon tasks spanning minutes to hours — orchestrating sub-agents, memory, and sandboxed execution to research, code, and create.

## What is it?

Built on LangGraph and LangChain, DeerFlow gives an agent progressive-loading skills (research, report generation, slide creation, web operations, image/video generation), custom MCP-server tool support, sandboxed code execution (Docker/Kubernetes/local), spawnable sub-agents for multi-step workflows, long-term memory across conversations, and thread-scoped session goals with automatic completion evaluation. It also ships native chat integrations for Telegram, Slack, Feishu, WeChat, WeCom, DingTalk, Discord, and Buzz. DeerFlow 2.0 is a ground-up rewrite sharing no code with v1.

## Why use it?

Long-running agent tasks need more than a single prompt loop — they need memory, safe execution sandboxes, sub-agent orchestration, and a way to know when the task is actually done. DeerFlow bundles all of that plus ready-made chat-platform integrations, rather than requiring you to assemble LangGraph primitives, a sandbox, and IM bots yourself.

## Installation

```bash
git clone https://github.com/bytedance/deer-flow.git
cd deer-flow
make setup          # interactive wizard
make docker-start    # or: make dev (local)
```

Access at `http://localhost:2026`.

## Basic Usage

Run the setup wizard to configure LLM providers and integrations, start via Docker Compose or local dev mode, then interact through the web UI or a connected IM channel (Telegram, Slack, Discord, etc.) to kick off research/coding/content tasks.

## Key Features

- Progressive-loading skills: research, report generation, slide creation, web ops, image/video generation
- Custom tool support via MCP servers
- Sandboxed execution: Docker, Kubernetes, or local
- Sub-agent spawning for complex multi-step workflows
- Long-term memory persisted across conversations
- Thread-scoped session goals with automatic completion evaluation
- Native IM integrations: Telegram, Slack, Feishu, WeChat, WeCom, DingTalk, Discord, Buzz

## Top 5 Use Cases

1. Deep research tasks that run unattended for extended periods
2. Automated code generation and refactoring with sandboxed execution
3. Report and slide-deck generation from research output
4. Chat-driven agent workflows via Telegram/Slack/Discord/Feishu
5. Multi-agent pipelines needing persistent memory across sessions

## Competitors

- **[Dify](/docs/ai/dify)** — visual workflow/RAG platform for building LLM apps, vs. DeerFlow's code-first long-horizon agent harness with sub-agents and sandboxing.

## Pros

- MIT licensed, very large community (80.8k+ stars, 11.1k+ forks)
- Built-in sandboxed execution (Docker/Kubernetes/local) rather than bolt-on
- Broad native IM/chat platform integration out of the box
- Long-term memory and explicit session-goal completion tracking

## Cons

- Heavier infra footprint (Docker Compose, optional Kubernetes) than a single-file agent script
- LangGraph/LangChain-based — tied to that ecosystem's concepts and update cadence
- v2.0 rewrite shares no code with v1 — v1-based setups need a full migration

## Resources

- [GitHub Repository](https://github.com/bytedance/deer-flow)
