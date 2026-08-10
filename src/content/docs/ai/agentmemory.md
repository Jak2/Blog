---
title: agentmemory
description: Persistent, auto-captured memory layer for AI coding agents with hybrid search across sessions
order: 1
---

# agentmemory

**[rohitg00/agentmemory](https://github.com/rohitg00/agentmemory)**

## Overview

agentmemory is a persistent memory system for AI coding agents. It automatically captures session context via lifecycle hooks and makes it searchable in future sessions, so an agent doesn't need the project re-explained every time you start a new conversation.

## What is it?

A TypeScript/Node.js tool (installed as `@agentmemory/agentmemory`) that wires into coding agents — Claude Code, GitHub Copilot CLI, Cursor, Gemini CLI, Codex, and 30+ others via MCP — through 12 auto-capture lifecycle hooks. It stores memories in SQLite plus an in-memory vector index, retrieves via hybrid search (BM25 keyword + vector embeddings + knowledge-graph traversal), organizes them into four tiers (working, episodic, semantic, procedural), and exposes 54 MCP tools for search/save/governance. A real-time dashboard on port 3113 shows memory being built live.

## Why use it?

Re-explaining a codebase's architecture, past decisions, and known bug patterns at the start of every agent session wastes tokens and time. agentmemory's own benchmarks claim 95.2% R@5 retrieval accuracy on LongMemEval-S and ~92% token savings versus LLM-summarization approaches to context — the pitch is drop-in persistent memory without hand-building retrieval plumbing yourself.

## Installation

```bash
npm install -g @agentmemory/agentmemory
agentmemory                       # start the server
agentmemory connect claude-code   # wire into your agent
npx skills add rohitg00/agentmemory -y   # install companion skills
```

## Basic Usage

1. Install and start the local server.
2. Connect it to your coding agent (Claude Code, Copilot CLI, Cursor, etc.).
3. Work normally — the 12 lifecycle hooks capture tool usage automatically.
4. On future sessions, the agent retrieves relevant prior context via hybrid search instead of starting cold.
5. Use the port-3113 dashboard to inspect what's been captured or replay a session.

## Key Features

- Auto-capture via 12 lifecycle hooks — no manual memory-saving required
- Hybrid search: BM25 keyword + vector embeddings + knowledge-graph traversal
- 4-tier memory consolidation (working, episodic, semantic, procedural)
- 54 MCP tools, including `memory_smart_search` and governance operations
- Real-time dashboard with live memory building and session replay
- Privacy-first: strips secrets/API keys before storage
- Local embeddings (`all-MiniLM-L6-v2`) or cloud providers (OpenAI, Gemini, Voyage)

## Top 5 Use Cases

- Persistent project context across coding sessions without re-explaining architecture
- Shared knowledge base for multi-agent or multi-tool teams
- Living documentation of code architecture built up passively over time
- Bug-pattern detection/recall across a project's history
- Cross-project memory retention for developers working across many repos

## Competitors

- **mem0** — general-purpose agent memory layer, less coding-agent-specific
- **Letta / MemGPT** — memory-focused agent framework with a different (more agent-native) architecture
- **Khoj** — personal AI/search assistant with memory, broader than coding
- **supermemory** — similar drop-in memory positioning for agents
- **MemPalace** — comparable persistent-memory tool for coding agents/IDE assistants

## Pros

- Apache-2.0, fully open source
- Zero external database requirement — SQLite + in-memory vector index, easy to self-host
- Broad agent compatibility (30+ agents via MCP) rather than locked to one tool
- Reported strong retrieval accuracy and meaningful token savings vs. naive summarization

## Cons

- Benchmarks (95.2% R@5, ~92% token savings) are self-reported — worth validating on your own workload
- Adds a persistent local server/process to your dev environment
- Privacy-stripping of secrets before storage is a strong claim to verify yourself before pointing it at sensitive codebases
- Newer project relative to established memory frameworks like mem0/MemGPT — smaller track record

## Resources

- [GitHub Repository](https://github.com/rohitg00/agentmemory)
