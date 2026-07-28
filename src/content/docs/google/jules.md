---
title: Jules
description: Google's asynchronous, autonomous AI coding agent that works directly in your GitHub repos
order: 4
---

# Jules

## Overview
Jules is Google's autonomous AI coding agent — you hand it a task against a real repository and it works asynchronously in a secure cloud environment, planning steps, editing files, and opening changes for review.

## What is it?
An agentic coding assistant (powered by Gemini 2.5 Pro for planning) that integrates with GitHub. Unlike inline autocomplete, Jules takes a task description, clones/reads the repo, plans a multi-step approach, and executes it — writing code, fixing bugs, writing tests, and generating things like audio changelogs — largely unattended. It has exited public beta and now also ships a CLI ("Jules Tools") and an early-access API.

## Why use it?
- Handles longer-horizon, multi-file tasks asynchronously instead of requiring you to babysit every suggestion.
- Frees you to hand off well-scoped chores (bug fixes, test writing, small features) while you work elsewhere.
- CLI and API mean it can be scripted into existing workflows, not just used via a web UI.

## Installation (how to access)
- Web: [jules.google](https://jules.google/) — sign in with Google, connect a GitHub repo.
- CLI: Jules Tools, for driving Jules from the terminal.
- API: early access, for integrating Jules into custom systems/CI.
- Access is rolling out to Google AI Pro and Ultra subscribers (eligible students can get a free year of AI Pro); check current plan requirements as this has changed since beta.

## Basic Usage
1. Connect a GitHub repository to Jules.
2. Submit a task in natural language (e.g., "fix the failing test in auth.py", "add input validation to the signup form").
3. Jules plans the approach, reads relevant code, and makes changes in an isolated cloud environment.
4. Review the resulting diff/PR before merging — Jules proposes changes, it doesn't push directly to main unsupervised.

## Key Features
- Asynchronous execution — submit a task and check back later
- GitHub integration (reads/writes against real repos)
- Gemini 2.5 Pro-driven planning for multi-step tasks
- Audio changelogs summarizing what changed
- Jules Tools CLI for terminal-driven workflows
- Early-access public API for custom integrations

## Top 5 Use Cases
1. Automated bug fixing from an issue description
2. Writing or expanding test coverage for existing code
3. Small, well-scoped feature additions
4. Dependency/version bump and refactor chores
5. Batch cleanup tasks (linting fixes, dead code removal) across a repo

## Competitors
- GitHub Copilot Workspace / Copilot coding agent
- OpenAI Codex (agentic mode)
- Cursor (agent mode)
- Claude Code / Claude in GitHub Actions
- Devin (Cognition)

## Pros
- True async/autonomous operation — not just inline suggestions
- Tight GitHub integration for real-world repo workflows
- CLI + API extend it beyond a single web UI
- Backed by Gemini 2.5 Pro's planning ability

## Cons
- Now gated behind Google AI Pro/Ultra subscriptions rather than fully free
- Autonomous multi-file changes still need careful human review before merge
- Newer product line (API is early access) — expect rough edges and change
- Quality on large/complex codebases is inherently less predictable than scoped, human-reviewed diffs

## Resources
- [Official site](https://jules.google/)
- [Getting started docs](https://jules.google/docs)
- [Google Labs blog: Jules autonomous coding agent](https://blog.google/innovation-and-ai/models-and-research/google-labs/jules/)
- [Jules out of public beta](https://blog.google/technology/google-labs/jules-now-available/)
- [Jules Tools CLI + API announcement](https://blog.google/technology/google-labs/jules-tools-jules-api/)
