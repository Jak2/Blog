---
title: Project AIRI
description: Open-source framework for self-hosted AI virtual companions with voice, gaming, and avatar animation
order: 1
---

# Project AIRI

**[moeru-ai/airi](https://github.com/moeru-ai/airi)**

![Stars](https://img.shields.io/github/stars/moeru-ai/airi?style=flat-square) ![License](https://img.shields.io/github/license/moeru-ai/airi?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/moeru-ai/airi?style=flat-square)

## Overview

Project AIRI is an open-source framework for building self-hosted AI virtual companions inspired by the AI VTuber Neuro-sama — customizable digital beings with real-time voice interaction, gaming ability, and avatar animation, running across web, desktop, and mobile.

## What is it?

A monorepo framework combining VRM/Live2D avatar rendering (with auto-blink and eye-tracking), real-time voice chat (speech recognition and synthesis), game-playing integrations (Minecraft, Factorio, Kerbal Space Program), and multi-channel bot support (Discord, Telegram, Minecraft). It supports 20+ LLM API providers (OpenAI, Anthropic, and more) plus local models, an in-browser memory system via DuckDB WASM, and runs on browser, Windows, macOS, with experimental iOS/Android.

## Why use it?

AI VTuber/companion setups are typically closed commercial products or one-off hobbyist scripts. Project AIRI packages the full stack — avatar rendering, voice pipeline, game control, LLM backend, memory — as an open, self-hostable framework, so building a custom AI companion means configuring an existing system instead of assembling avatar rendering, STT/TTS, and LLM plumbing from scratch.

## Installation

```bash
# Windows
winget install MoeruAI.AIRI

# macOS
brew install --cask airi
```

Or visit [airi.moeru.ai](https://airi.moeru.ai) for the web version, or download desktop builds from GitHub releases.

## Basic Usage

Install the desktop app or open the web version, connect an LLM provider (API key or local model), configure a VRM/Live2D avatar, and interact via voice or text — optionally connecting Discord/Telegram/Minecraft integrations for multi-channel presence.

## Key Features

- Game-playing: Minecraft, Factorio, Kerbal Space Program
- Real-time voice chat with speech recognition and synthesis
- VRM and Live2D avatar animation with auto-blink and eye-tracking
- Cross-platform: browser, Windows, macOS, experimental iOS/Android
- 20+ LLM provider support including local models
- In-browser memory via DuckDB WASM, experimental memory features
- Multi-channel: Discord, Telegram, Minecraft bot integrations

## Top 5 Use Cases

1. Personal AI companion for gaming and casual conversation
2. Streaming assistant or self-hosted VTuber platform
3. Developer experimentation with agent/avatar/voice pipelines
4. Cross-platform voice interaction interface
5. Multi-channel AI presence across Discord/Telegram/Minecraft

## Competitors

- [Ollama](/docs/ai/ollama) — one of AIRI's supported local-model backends, not a competing companion framework.
- Closed commercial VTuber/companion products — polished but closed and not self-hostable, vs. AIRI's open MIT-licensed framework.

## Pros

- MIT licensed, very large community (48.6k+ stars, 4.8k+ forks)
- Full stack in one framework — avatar, voice, gaming, LLM, memory
- Broad LLM provider support including local models for privacy
- True cross-platform reach, including experimental mobile

## Cons

- Large feature surface (gaming, voice, avatars, memory) means real setup complexity
- Mobile (iOS/Android) support explicitly experimental
- Voice/avatar pipeline performance depends heavily on local hardware for local-model setups

## Resources

- [GitHub Repository](https://github.com/moeru-ai/airi)
- [airi.moeru.ai](https://airi.moeru.ai)
