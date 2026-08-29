---
title: Langflow
description: Visual builder for AI agents and workflows with Python-level customization and MCP deployment
order: 1
---

# Langflow

**[langflow-ai/langflow](https://github.com/langflow-ai/langflow)**

![Stars](https://img.shields.io/github/stars/langflow-ai/langflow?style=flat-square) ![License](https://img.shields.io/github/license/langflow-ai/langflow?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/langflow-ai/langflow?style=flat-square)

## Overview

Langflow is a platform for building and deploying AI agents and workflows through a visual builder, while still giving developers direct Python source-code access to every component when they need to go beyond drag-and-drop.

## What is it?

A visual flow builder with an interactive testing environment (step-by-step execution control), customizable components backed by editable Python source, multi-agent orchestration with conversation and data retrieval, API deployment and JSON export for embedding flows in Python apps, MCP server deployment so a flow becomes a tool other agents can call, and integrations with LangSmith/LangFuse for observability.

## Why use it?

Purely visual no-code builders hit a ceiling the moment logic gets non-trivial, while pure code gives up fast iteration. Langflow keeps both: prototype visually, then drop into the actual Python behind any component when the visual layer isn't enough — and ship the result as an API, an MCP tool, or an exported flow rather than being locked to Langflow's own runtime.

## Installation

```bash
uv pip install langflow -U
uv run langflow run
```

Starts at `http://127.0.0.1:7860`. Langflow Desktop also available for Windows/macOS with all dependencies bundled.

## Basic Usage

Open the visual builder, drag components (LLMs, retrievers, agents, tools) onto the canvas and wire them together, test step-by-step in the interactive runner, then deploy the flow as an API endpoint or MCP server.

## Key Features

- Visual builder with drag-and-drop flow construction
- Editable Python source behind every component
- Interactive, step-by-step testing execution
- Multi-agent orchestration with conversation/data retrieval
- API deployment and JSON export for Python integration
- MCP server deployment — flows become callable agent tools
- LangSmith/LangFuse observability integration

## Top 5 Use Cases

1. Prototyping conversational AI agents visually before hardening the code
2. Multi-agent workflow orchestration with a visual debugging view
3. Turning a flow into an MCP tool other agents can call
4. Rapid iteration on RAG/retrieval pipelines with step-by-step testing
5. Enterprise AI tool deployment needing both visual and code-level control

## Competitors

- [Dify](/docs/ai/dify) — similar visual-workflow LLM app platform, with Dify leaning more toward production LLMOps/monitoring, Langflow toward Python-editable flexibility per component.
- [DSPy](/docs/ai/dspy) — code-first, optimization-driven framework, vs. Langflow's visual-first approach with code as an escape hatch.
- Flowise — comparable visual LLM flow builder, smaller ecosystem than Langflow's.

## Pros

- MIT licensed, very large community (153.9k+ stars, 10.0k+ forks)
- Visual builder without giving up direct Python component access
- MCP deployment turns any flow into an agent-callable tool
- Supports major LLMs and vector databases out of the box

## Cons

- Visual flow complexity can grow unwieldy for very large agent systems
- Requires Python 3.10–3.14 environment management
- Overlapping feature space with Dify/Flowise means evaluating which fits your workflow style takes some trial

## Resources

- [GitHub Repository](https://github.com/langflow-ai/langflow)
