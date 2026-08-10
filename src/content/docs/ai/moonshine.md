---
title: Moonshine
description: On-device voice AI toolkit for low-latency STT, intent recognition, and TTS
order: 1
---

# Moonshine

**[moonshine-ai/moonshine](https://github.com/moonshine-ai/moonshine)**

## Overview

Moonshine Voice is an open-source, on-device voice AI toolkit: speech-to-text, intent recognition, and text-to-speech, built for real-time voice agents rather than batch transcription.

## What is it?

A C++ core engine with bindings for Python, Swift, Java, and JavaScript, running across iOS, Android, macOS, Windows, Linux, Raspberry Pi, and the browser. It includes language-specific STT models (English, Spanish, Mandarin, Japanese, Korean, Vietnamese, Ukrainian, Arabic), TTS with voice cloning via ZipVoice, and an "AgentFlow" layer for multi-turn voice interactions.

## Why use it?

Built explicitly to beat Whisper on latency and flexibility for live use: no fixed 30-second input window, a streaming architecture with caching, and reported latency around 74ms (Medium Streaming model, MacBook Pro) versus 11+ seconds for Whisper Large V3. Its 245M-parameter model reports 6.65% WER on HuggingFace's OpenASR leaderboard, competitive with Whisper Large's 1.5B params.

## Installation

```bash
pip install moonshine-voice
# or via platform-specific bindings (Swift Package Manager, npm, Maven)
```

## Basic Usage

```python
from moonshine import Moonshine

model = Moonshine("base")
text = model.transcribe(audio_stream)
```

Event-driven APIs handle microphone capture, voice activity detection, speaker ID, and phrase matching without wiring together separate libraries.

## Key Features

- Streaming STT with flexible (non-fixed) input windows
- Multi-language STT and 20+ language TTS with voice cloning
- AgentFlow for multi-turn conversational voice apps
- Cross-platform: mobile, desktop, embedded (Raspberry Pi), web
- Fully on-device — no cloud round-trip required

## Top 5 Use Cases

1. Real-time voice assistants that need sub-100ms response latency
2. On-device transcription where sending audio to the cloud isn't acceptable (privacy/offline)
3. Embedded/edge voice apps (Raspberry Pi, mobile) where a 1.5B-parameter Whisper model won't fit
4. Multi-turn voice agents needing STT + intent + TTS in one framework
5. Voice cloning for TTS output in an app's own voice/brand

## Competitors

- **OpenAI Whisper** — Moonshine's main point of comparison; Whisper has broader community/tooling support but fixed-window batch-style inference and much higher latency for live use.
- **Vosk** — another on-device STT toolkit, lighter-weight but without Moonshine's TTS/AgentFlow layer.

## Pros

- Genuinely low latency for live/streaming use, not just marketing claims — orders of magnitude faster than Whisper Large in their benchmarks
- Fully on-device, cross-platform, multi-language
- Smaller model size for comparable accuracy
- MIT licensed, active project (10.8k stars)

## Cons

- Newer/smaller ecosystem than Whisper — fewer third-party integrations and less community troubleshooting content
- Per-language model quality still likely trails Whisper for lower-resource languages
- On-device tradeoff: still constrained by target hardware capability

## Resources

- [GitHub Repository](https://github.com/moonshine-ai/moonshine)
