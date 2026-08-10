---
title: agents-cli
description: Google's CLI and skills that make any coding assistant expert at building, evaluating, and deploying agents on Gemini Enterprise Agent Platform
order: 1
---

# agents-cli

**[google/agents-cli](https://github.com/google/agents-cli)**

## Overview

`agents-cli` is not itself a coding agent — it's a CLI plus a set of installable "skills" that teach an existing coding assistant (Claude Code, Antigravity CLI, Codex, or others) how to scaffold, evaluate, deploy, and observe ADK (Agent Development Kit) agents on Google Cloud's Gemini Enterprise Agent Platform.

## What is it?

A Python package (`google-agents-cli` on PyPI) installed via `uvx google-agents-cli setup`, which installs both the CLI binary and a library of agent skills into whatever coding tool you use. The skills cover the full agent lifecycle: workflow/dev-lifecycle rules, ADK Python API knowledge, project scaffolding, evaluation methodology (LLM-as-judge, adaptive rubrics), deployment (Agent Runtime, Cloud Run, GKE, CI/CD), Gemini Enterprise publishing, and observability (Cloud Trace, logging). The CLI itself is also usable standalone without any coding agent.

## Why use it?

Building production-grade agents on Google Cloud means learning ADK, evaluation tooling, deployment infra, and Gemini Enterprise registration — each with its own conventions. `agents-cli` packages that knowledge as skills your coding agent already knows how to use, so instead of hand-rolling deployment scripts or evaluation harnesses you can ask your agent "deploy this to Cloud Run" and have it use the right command. It explicitly is not a competitor to Claude Code/Codex/Antigravity — it's a tool *for* them.

## Installation

Requires Python 3.11+, [uv](https://docs.astral.sh/uv/getting-started/installation/), and Node.js.

```bash
uvx google-agents-cli setup
```

Or install just the skills and let your coding agent handle the rest:

```bash
npx skills add google/agents-cli
```

## Basic Usage

1. Run `uvx google-agents-cli setup` to install the CLI and skills into your coding agent(s).
2. Open Claude Code, Codex, Antigravity CLI, or another coding agent.
3. Ask it to build something, e.g. "Use agents-cli to build an agent that summarizes tickets."
4. Use `agents-cli scaffold <name>` to create a project, `agents-cli eval generate`/`grade` to evaluate it, and `agents-cli deploy` to ship it to Google Cloud.
5. `agents-cli publish gemini-enterprise` registers the finished agent with Gemini Enterprise.

## Key Features

- Skill packs covering scaffold, ADK code patterns, eval, deploy, publish, and observability
- `agents-cli scaffold` / `enhance` / `upgrade` for project lifecycle management
- Built-in evaluation pipeline: generate traces, grade against metrics, synthesize multi-turn scenarios, compare/analyze failure modes, auto-tune prompts
- One-command deploy to Agent Runtime, Cloud Run, or GKE with CI/CD scaffolding
- Works standalone from the terminal, or as skills consumed by any coding agent
- Local development possible without Google Cloud via an AI Studio API key

## Top 5 Use Cases

- Teams building production agents on Google Cloud's ADK/Gemini Enterprise stack
- Adding a rigorous eval pipeline (LLM-as-judge, adaptive rubrics) to an existing agent project
- Standing up CI/CD and multi-environment (staging/prod) infra for agent deployment quickly
- Giving any coding agent (not just Google's own) fluency in ADK-specific patterns via installable skills
- Prototyping locally with just an AI Studio key before committing to full Google Cloud deployment

## Comparison

`agents-cli` sits in a different layer than [Kiro](/docs/ai/kiro) or [agency](/docs/ai/agency): it doesn't compete with coding agents/orchestrators, it makes them better at one specific job (building Google Cloud/ADK agents). It explicitly works alongside Claude Code and Codex rather than replacing them, and its README calls this out directly. If you're comparing agent-building toolchains rather than coding-agent harnesses, its closest peer is `adk` itself (the underlying framework) — `agents-cli` adds the lifecycle tooling ADK alone doesn't provide.

## Competitors

- **ADK (Agent Development Kit)** directly — the framework `agents-cli` builds on; using it raw means hand-rolling scaffolding/eval/deploy tooling yourself
- **LangChain / LangGraph deployment tooling** — comparable agent-framework-plus-deploy story, but not Google Cloud-native
- **AWS Bedrock Agents tooling** / **Azure AI Foundry** — cloud-native equivalents for building/deploying agents on other clouds
- **[agent-skills](https://github.com/addyosmani/agent-skills)** — general software-engineering skill suite (ideation, planning, code review) that `agents-cli`'s own README suggests pairing with it for non-agent-building workflows

## Pros

- Free, Apache-2.0 licensed, and works with any coding agent, not locked to Google's own tools
- Covers the entire agent lifecycle (scaffold → eval → deploy → publish → observe) in one CLI
- Local development path (AI Studio key) doesn't require a Google Cloud account
- Skills are inspectable and reusable outside the CLI itself
- Backed by Google with an active roadmap driven by GitHub issues

## Cons

- Tied to Google Cloud/ADK/Gemini Enterprise for anything beyond local dev — not cloud-agnostic
- Deployment features require a paid Google Cloud project and carry real billing risk
- Adds another layer of tooling/skills a coding agent must learn correctly to use well
- Younger project (PyPI package, evolving docs) compared to mature deployment tooling elsewhere

## Resources

- [GitHub Repository](https://github.com/google/agents-cli)
- [Documentation](https://google.github.io/agents-cli/)
- [PyPI package](https://pypi.org/project/google-agents-cli/)
