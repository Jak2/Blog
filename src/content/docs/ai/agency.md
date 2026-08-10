---
title: Agency
description: Terminal AI agent orchestrator (Rust, Lazygit-style TUI) that runs parallel CLI coding agents in isolated git worktrees + tmux sessions
order: 1
---

# Agency

**[tobias-walle/agency](https://github.com/tobias-walle/agency)**

## Overview

Agency is a command-line AI agent orchestrator with a TUI heavily inspired by [Lazygit](https://github.com/jesseduffield/lazygit). It runs multiple CLI coding agents — Claude Code, Codex CLI, Gemini CLI, OpenCode, or any custom command — each in its own isolated environment using git worktrees and tmux, so parallel tasks don't collide.

## What is it?

A Rust binary (`agency-cli` on npm, also installable via Homebrew or `cargo install`) with a daemon + client architecture: a slim background daemon tracks tmux session/task status and notifies clients over a Unix socket, while the CLI/TUI attaches directly to tmux for interactive views. Each task gets its own git worktree and tmux session running the configured agent command, and tasks can be created as drafts, started, attached to, stopped, or merged back into the base branch — all as first-class CLI commands mirrored in the TUI.

## Why use it?

Running several coding-agent sessions in parallel by hand means juggling worktrees, tmux sessions, and merge coordination manually. Agency wraps that entire workflow — create a task, get an isolated worktree + tmux session automatically, attach/detach as needed, merge when done — behind a small, scriptable CLI and a Lazygit-style TUI, without being tied to one specific agent (unlike, say, a Claude-Code-only tool).

## Installation

```bash
# npm
npm install -g agency-cli

# Homebrew
brew install tobias-walle/tap/agency

# From source
cargo install --git https://github.com/tobias-walle/agency
```

Then:

```bash
agency setup   # configure preferences
agency init    # set up Agency in your project
agency         # start the TUI
```

## Basic Usage

```bash
agency new my-task              # create + start + attach a task
agency new --draft my-task      # create a draft without starting
agency start my-task            # start a draft/stopped task
agency attach my-task           # open the agent TUI by slug or ID
agency stop my-task             # stop, keeping worktree + branch
agency merge my-task            # merge task back into base branch
agency tasks                    # list all tasks and status
agency shell my-task            # open a shell in the task's worktree
```

Install the Agency skill so your coding agent knows to parallelize work itself:

```bash
/plugin marketplace add tobias-walle/agency
/plugin install agency@agency
```

## Key Features

- Lazygit-inspired TUI plus a full equivalent CLI command set for automation
- Works with any CLI coding agent (Claude Code, Codex CLI, Gemini CLI, OpenCode, or custom commands via `[agents.my-agent]` config)
- Isolated per-task environments via git worktrees + tmux
- Daemon + client architecture: slim daemon computes status, clients attach directly to tmux
- Layered TOML config (defaults → global → project overrides)
- Installable skill so the agent itself can invoke Agency to parallelize tasks

## Top 5 Use Cases

- Running several independent coding-agent tasks in parallel without worktree/tmux bookkeeping
- Teams standardizing on one orchestration layer across different agent CLIs (Claude Code, Codex, Gemini, OpenCode)
- Reviewing/merging agent-generated branches with a single `agency merge` instead of manual git steps
- Scripting CI-adjacent or batch agent runs via the CLI (no TUI required)
- Developers who want a consistent Lazygit-like keyboard-driven workflow for agent session management

## Comparison

Agency is a lightweight, agent-agnostic session/worktree orchestrator — closer in spirit to tools like Claude Squad or Crystal than to a full IDE like [Kiro](/docs/ai/kiro) or a persistent multi-surface workspace like [Kiro Crew](/docs/ai/kirocrew). It has no built-in memory/learning layer or messaging integrations; its whole job is spinning up and managing isolated sessions for whatever agent you already use. The `awesome-cli-coding-agents` list documents many similar "session managers & parallel runners" (Claude Squad, Crystal, agent-of-empires, Superset) that are Agency's direct peers.

## Competitors

- **Claude Squad** — tmux-based harness specifically for running multiple Claude Code sessions side-by-side
- **Crystal** — executes multiple Codex and Claude Code sessions in parallel git worktrees
- **agent-of-empires** — manages Claude Code, OpenCode, Codex CLI, Gemini CLI, Pi, Copilot CLI, and more from a TUI/web UI using tmux + git worktrees
- **Superset** — a terminal built specifically for orchestrating parallel agent sessions
- **[Kiro Crew](/docs/ai/kirocrew)** — a much heavier persistent Gateway with memory/scheduling/messaging, versus Agency's lightweight session-per-task model

## Pros

- Agent-agnostic — works with any CLI coding agent, including custom commands
- Small, fast Rust binary with no heavy runtime dependencies
- Familiar Lazygit-style TUI lowers the learning curve for git-fluent users
- Full CLI parity with the TUI, so it's automatable/scriptable
- macOS and Linux support via three install methods (npm, Homebrew, source)

## Cons

- No Windows support
- No built-in persistent memory, scheduling, or messaging integrations (unlike Kiro Crew)
- Requires tmux, adding an external dependency and a learning curve for tmux-unfamiliar users
- Small project (25 stars at time of writing) — less battle-tested than Claude Squad or Crystal
- Custom agent configuration requires editing TOML rather than a guided setup

## Resources

- [GitHub Repository](https://github.com/tobias-walle/agency)
- [npm package](https://www.npmjs.com/package/agency-cli)
