---
title: Awesome Free LLM APIs
description: Curated, daily-updated directory of free LLM API providers, rate limits, and one-click config snippets for coding agents
order: 1
---

# Awesome Free LLM APIs

**[open-free-llm-api/awesome-freellm-apis](https://github.com/open-free-llm-api/awesome-freellm-apis)**

## Overview

This is not a tool but a curated, machine-readable directory of free LLM API providers — currently listing 400+ free models across 30+ providers (Groq, Google Gemini, NVIDIA NIM, Cloudflare Workers AI, Mistral, Cohere, Hugging Face, and more). It's paired with a companion site, freellm.net, and the data is refreshed daily via automation rather than being a static, aging list.

## What is it?

A GitHub README/table (plus a live site) tracking which LLM providers offer permanently-free tiers, what their rate limits and context windows are, whether they require a credit card or phone verification, and direct links to get an API key. It also includes ready-to-copy configuration snippets for popular AI coding tools (Claude Code, Cursor, Codex CLI, Aider, Cline, Open WebUI, and others), since most listed providers expose an OpenAI-compatible endpoint.

## Why use it?

Finding which LLM providers still have a free tier, and what their actual limits are, normally means checking a dozen scattered docs pages or relying on stale "awesome list" style repos. This project keeps the data current (auto-refreshed daily) and adds practical details most lists skip — credit-card/phone-verification requirements and per-tool config snippets — so you can go from "I need a free API key" to a working config in under a minute.

## Installation

Not applicable — this is a reference list/directory, not installable software. Use the README table directly or browse [freellm.net](https://freellm.net).

## Basic Usage

Pick a provider from the Provider Directory table, get a free API key via its listed link, then plug the base URL + key into any OpenAI-compatible client:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",  # free, no credit card
    api_key="GROQ_API_KEY",
)

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "Hello!"}],
)
```

Tool-specific config snippets (Claude Code, Cursor, Codex, Aider, Cline, Open WebUI, etc.) are available at [freellm.net/config](https://freellm.net/config/).

## Key Features

- 400+ free LLM models tracked across 30+ providers, refreshed daily
- Clear labeling of credit-card/phone-verification requirements per provider
- Max context window and supported modalities (text, vision, audio, video, reasoning, embedding, rerank) per provider
- Direct "Get API Key" links for every listed provider
- One-click config snippets for 10+ AI coding tools
- Live companion site with a searchable model browser and playground
- Available in multiple languages (English, Chinese, Japanese, Korean, and more)

## Top 5 Use Cases

- Quickly finding a genuinely free, no-credit-card LLM API to prototype with
- Configuring a coding agent (Claude Code, Cursor, Codex) to use a free-tier model instead of a paid key
- Comparing context-window and rate-limit tradeoffs across free providers before committing to one
- Building a fallback chain of free providers for hobby projects or demos
- Reference source for tools like [OmniRoute](/docs/ai/omniroute) that aggregate/route across free-tier providers

## Competitors

- **[OmniRoute](/docs/ai/omniroute)** — automates switching across free-tier providers via a gateway, rather than listing them for manual selection
- **OpenRouter** — a live marketplace/router across many providers (free and paid), but not a plain curated reference list
- Various other "awesome-llm" GitHub lists — typically static and update far less frequently than this repo's daily-refreshed data

## Pros

- Genuinely useful, low-friction reference — no signup or install needed to browse it
- Daily-refreshed data instead of a stale, manually-maintained list
- Practical extras (card/phone requirements, per-tool configs) most competing lists omit
- MIT-licensed content

## Cons

- Being a list, it has no functionality of its own — you still need to integrate providers yourself (or pair it with a gateway like OmniRoute)
- Free tiers listed are third-party and can change or disappear at any time regardless of this repo's freshness
- Heavy promotion of its companion site (freellm.net) throughout the README
- No way to verify listed rate limits/requirements beyond trusting the automated refresh and the providers' own docs

## Resources

- [GitHub Repository](https://github.com/open-free-llm-api/awesome-freellm-apis)
- [freellm.net](https://freellm.net)
- [Config generator](https://freellm.net/config/)
