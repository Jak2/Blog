---
title: TurboFieldfare
description: Runs Gemma 4 26B-A4B on 8GB Apple Silicon Macs using ~2GB RAM via SSD-streamed experts
order: 1
---

# TurboFieldfare

**[drumih/turbo-fieldfare](https://github.com/drumih/turbo-fieldfare)**

## Overview

TurboFieldfare is a custom Swift and Metal runtime that runs Google's Gemma 4 26B-A4B mixture-of-experts model on Apple Silicon Macs using only ~2GB of RAM — making a 26-billion-parameter model usable on an entry-level 8GB MacBook Air by streaming experts from SSD on demand instead of loading the whole model into memory.

## What is it?

A native macOS app (SwiftUI), CLI tool, and OpenAI-compatible local server, backed by custom Metal kernels for quantized operations. Instead of holding all MoE experts resident in RAM, it streams only the experts needed for the current inference step from disk, keeping memory footprint far below what the full model would normally require.

## Why use it?

Running a 26B-parameter model normally needs far more RAM than an 8GB Mac has. TurboFieldfare's on-demand expert streaming sidesteps that entirely, at a real but tolerable throughput cost — enabling local inference on hardware that would otherwise be locked out of models this size.

## Installation

```bash
git clone https://github.com/drumih/turbo-fieldfare
cd turbo-fieldfare
swift build -c release
.build/release/TurboFieldfareMac
```

First run downloads the ~15GB model from Hugging Face.

## Basic Usage

Launch the macOS app for a SwiftUI chat interface, or run the CLI/server binary directly for an OpenAI-compatible local API endpoint other tools can point at.

## Key Features

- Runs Gemma 4 26B-A4B on 8GB+ Apple Silicon Macs with ~2GB memory footprint
- SSD-streamed mixture-of-experts — no need to hold the full model in RAM
- Native macOS app, CLI, and OpenAI-compatible local server
- Custom Metal kernels for quantized operations
- Measured throughput: 5-6 tokens/sec on M2, 31-35 tokens/sec on M5

## Top 5 Use Cases

1. Running a large local LLM on a low-RAM MacBook Air
2. Offline/private inference without cloud API costs
3. Local OpenAI-compatible endpoint for existing tooling
4. Testing large MoE models on hardware that can't fit them in RAM normally
5. Apple Silicon-specific inference experimentation with Metal kernels

## Competitors

- **llama.cpp** — broader model/hardware support, but doesn't do the same on-demand SSD expert streaming; needs more RAM for comparably sized MoE models.
- **Ollama** — easier general-purpose local model management, not optimized for running MoE models this large on memory-constrained Macs specifically.
- **MLX (Apple)** — Apple's own ML framework, faster on Apple Silicon when the model fits in RAM, but lacks TurboFieldfare's low-memory streaming trick for oversized MoE models.

## Pros

- Makes a 26B model usable on 8GB RAM — otherwise impossible
- Native Metal implementation, tuned for Apple Silicon
- OpenAI-compatible server simplifies integration with existing tools
- Apache 2.0 licensed

## Cons

- macOS 26+, arm64-only — no cross-platform or Intel Mac support
- Throughput is modest on older Apple Silicon (5-6 tok/s on M2)
- Single-model-focused (Gemma 4 26B-A4B), not a general-purpose inference runtime
- Model weights carry separate Hugging Face license terms from the Apache 2.0 code

## Resources

- [GitHub Repository](https://github.com/drumih/turbo-fieldfare)
