---
title: Ollama
description: Open-source platform for running large language models locally, with a REST API and multi-language SDKs
order: 1
---

# Ollama

**[ollama/ollama](https://github.com/ollama/ollama)**

![Stars](https://img.shields.io/github/stars/ollama/ollama?style=flat-square) ![License](https://img.shields.io/github/license/ollama/ollama?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/ollama/ollama?style=flat-square)

## Overview

Ollama is an open-source platform for downloading, running, and interacting with large language models entirely on your own machine — no cloud API, no per-token cost, no data leaving the device.

## What is it?

A Go-based runtime (built on the llama.cpp backend, with MLX framework compatibility) that pulls and runs models like Gemma, DeepSeek, and Qwen locally, exposing a full REST API for programmatic access plus official Python and JavaScript SDKs. It integrates with coding tools (Claude Code, Copilot CLI), AI assistants, and chat interfaces, and runs cross-platform on macOS, Windows, Linux, and Docker.

## Why use it?

Cloud LLM APIs mean per-token cost, network latency, and sending data to a third party — a non-starter for privacy-sensitive work, offline environments, or just experimenting without racking up a bill. Ollama makes running a local model as simple as `ollama run <model>`, then exposes the same interaction via a REST API so any app or agent can talk to it exactly like a cloud provider, just pointed at localhost.

## Installation

```bash
# macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
irm https://ollama.com/install.ps1 | iex

# Docker
docker run -d -p 11434:11434 ollama/ollama
```

## Basic Usage

```bash
ollama run gemma3
```

Or call the REST API directly:

```bash
curl http://localhost:11434/api/generate -d '{"model": "gemma3", "prompt": "Why is the sky blue?"}'
```

## Key Features

- Local execution of open models (Gemma, DeepSeek, Qwen, and more)
- Full REST API for programmatic access and chat
- Official Python and JavaScript SDKs
- Integrations with coding tools (Claude Code, Copilot CLI) and AI assistants
- Cross-platform: macOS, Windows, Linux, Docker
- llama.cpp backend with MLX framework compatibility

## Top 5 Use Cases

1. Running LLMs locally for privacy-sensitive or offline work
2. Building apps against a local model via the REST API, mirroring a cloud LLM provider's shape
3. Experimenting with open models without per-token API costs
4. Powering local LLM apps on constrained/private hardware (e.g. self-hosted or mobile-adjacent setups)
5. Backing a coding agent or chat interface with a fully local model

## Competitors

- [TurboFieldfare](/docs/ai/turbo-fieldfare) — narrower, Swift/Metal-specific runtime for running Gemma on Apple Silicon with 8GB RAM, vs. Ollama's broader cross-platform model support.
- LM Studio — GUI-first local LLM runner, vs. Ollama's CLI/API-first, more scriptable approach.
- llama.cpp (direct) — the lower-level engine Ollama builds on; using it directly trades Ollama's convenience for finer control.
- **[Project AIRI](/docs/ai/airi)** — full AI-companion framework (avatar, voice, gaming) that uses Ollama as one of its local-model backends, not a competing runtime.

## Pros

- MIT licensed, extremely large community (~180k+ stars, ~17.6k+ forks)
- Simple one-command model pulls and runs
- REST API mirrors cloud LLM providers, making local/cloud swaps easy
- Broad ecosystem integration (coding tools, SDKs, chat apps)

## Cons

- Local model quality/speed is capped by the hardware running it
- Larger models need substantial RAM/VRAM — not every model runs well on modest hardware
- No built-in cloud fallback — purely local, which is a feature until local hardware isn't enough

## Resources

- [GitHub Repository](https://github.com/ollama/ollama)
- [ollama.com](https://ollama.com)
