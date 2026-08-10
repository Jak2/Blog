---
title: Kiro Crew
description: Persistent, self-learning agent workspace (Gateway) that runs Kiro CLI unattended across desktop, dashboard, CLI, Slack, and Discord
order: 1
---

# Kiro Crew

**[kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew)**

## Overview

Kiro Crew is an open-source, persistent development workspace that runs locally or on a remote host you control. Unlike a one-off chat session, it stays alive between conversations — remembering context, learning from corrections, scheduling recurring jobs, and running long tasks unattended — and exposes the same running agent through a desktop app, web dashboard, CLI, and messaging integrations (Slack, Discord, Telegram, Teams, Webex, WeCom, WeChat).

## What is it?

A "Gateway" process is the core: it routes messages from every surface (desktop, web, CLI, messaging), persists session state, injects memory/skills, runs scheduled and reactive work, coordinates subagents, brokers tool approvals, and enforces security policy. Each active conversation or background task is an isolated agent session, backed by `kiro-cli` over the Agent Client Protocol (ACP). "Kiro Crew Apps" package a purpose-built interface (dashboard pages, scoped APIs, hooks) around a specific job.

## Why use it?

Most agent CLIs end their memory and task state when the terminal or chat window closes. Kiro Crew is built specifically to survive that: sessions/memory/schedules/checkpoints persist across Gateway restarts, corrections become durable "lessons," repeated patterns get synthesized into reusable skills, and long tasks can run unattended with retries and validation. It's the right tool when you want an agent that keeps working (and keeps state) after you close the laptop, not just a smarter one-shot terminal session.

## Installation

- **App downloads:** signed desktop builds for macOS and Linux (Stable/Insider/Nightly channels); Windows runs the Gateway from source and uses the browser dashboard
- **One-line install:** `curl -fsSL https://download.crew.kiro.dev/cli.sh | sh` (add `--channel insider` or `--version X.Y.Z` as needed)
- **Docker:** `docker run -d --name kirocrew -p 127.0.0.1:5476:5476 -v kirocrew-home:/home/kirocrew ghcr.io/kirodotdev/kirocrew:stable`
- **Build from source:** requires Python 3.10+, Node.js 22+, npm, and `kiro-cli`:
  ```bash
  git clone https://github.com/kirodotdev/KiroCrew.git
  cd KiroCrew
  make build
  source .venv/bin/activate
  kirocrew setup
  kirocrew doctor
  kirocrew gateway
  ```

## Basic Usage

1. Install via any path above; the first launch installs `kiro-cli` if needed and walks through Kiro device-code sign-in.
2. Open `http://localhost:5476` for the web dashboard (no messaging credentials required).
3. Optionally connect Slack, Discord, Telegram, Teams, Webex, WeCom, or WeChat to continue the same conversation from elsewhere.
4. Give it a task spec for long-running work — it plans, executes, validates, retries on failure, and resumes from checkpoints.
5. Say things like "always run the frontend checks before calling a change done" — corrections become durable, workspace-scoped lessons.
6. Set up recurring jobs ("every weekday at 9, summarize the open work I should review") that deliver to your chosen surface.

## Key Features

- Persistent sessions that survive Gateway restarts, searchable and resumable
- Self-learning: corrections/failures become durable lessons applied to future sessions
- Self-evolving skills synthesized from repeated patterns
- Long-running, checkpointed tasks with validation and retries
- Unattended scheduling and reactive automation (messaging events, webhooks)
- Delegation to isolated subagents for parallel work
- Multi-surface access: desktop app, web dashboard, CLI, and messaging channels
- Defense-in-depth: tool approvals, OS sandboxing, credential redaction, audit events

## Top 5 Use Cases

- Long-running, multi-step tasks you want to kick off and walk away from
- Recurring scheduled reports/jobs (e.g., daily standup summaries) delivered to Slack/Discord
- Teams wanting one agent runtime reachable from desktop, browser, CLI, and chat without losing context
- Building a project-specific agent that accumulates "lessons" and reusable skills over time
- Monitoring/heartbeat-style unattended jobs that only need attention when something breaks

## Comparison

Kiro Crew and [Kiro](/docs/ai/kiro) share the `kirodotdev` org and are complementary: Kiro Crew's Gateway runs `kiro-cli` (Kiro's own CLI) underneath every session, so Kiro Crew is best understood as a persistence/orchestration layer wrapped around Kiro rather than a replacement for it. Use Kiro directly for interactive IDE work; use Kiro Crew when you want that same agent to keep running, remember context, and be reachable from Slack/Discord between sessions.

## Competitors

- **[agency](/docs/ai/agency)** — a much lighter CLI/TUI orchestrator for parallel git-worktree tasks across any CLI agent, without Kiro Crew's persistent-memory/self-learning/messaging-surface layer
- **Kiro Crew Apps ecosystem aside**, general "always-on agent" competitors include LangGraph-based deployment platforms and custom cron+agent scripts, though few match Kiro Crew's multi-surface (desktop/web/CLI/chat) integration out of the box
- **AutoGPT-style autonomous frameworks** — offer unattended looping but generally lack Kiro Crew's persistent Gateway/dashboard/messaging integration

## Pros

- Genuinely persistent: memory, schedules, and task checkpoints survive restarts
- One Gateway reachable from many surfaces without moving agent state
- Self-learning/self-evolving skills reduce repeated prompt engineering over time
- Multiple deployment options: desktop, one-line install, Docker, remote/SSH, source
- Apache-2.0 licensed and permissively usable
- Strong security posture: OS sandboxing, credential redaction, audit trail, governance profiles

## Cons

- Depends on `kiro-cli` and a Kiro account/sign-in, tying it to the Kiro ecosystem
- No native Windows desktop app yet — requires running the Gateway from source and using the browser
- Running Nightly/Insider channels means real instability, since Nightly is untested `main` HEAD
- More moving parts (Gateway, sessions, ACP runtime, dashboard) than a simple CLI agent — more to operate and secure
- Newer project relative to established CLI agents, so ecosystem/integration maturity is still growing

## Resources

- [GitHub Repository](https://github.com/kirodotdev/KiroCrew)
- [Documentation](https://github.com/kirodotdev/KiroCrew/blob/main/docs/README.md)
- [Install guide](https://github.com/kirodotdev/KiroCrew/blob/main/docs/guides/install.md)
