---
title: Colibrì
description: Pure C, zero-dependency inference engine that runs 744B–2.8T-parameter MoE models on consumer hardware by treating disk, RAM, and VRAM as one memory tier
order: 3
---

# Colibrì

**[JustVugg/colibri](https://github.com/JustVugg/colibri)**

## Overview

Colibrì ("tiny engine, immense model") is a pure-C, zero-engine-dependency inference engine for running frontier Mixture-of-Experts models — from 744B up to 2.8T parameters — on consumer and heterogeneous hardware. It does this by treating storage, RAM, and VRAM as a single inference hierarchy ("AI memory multitiering") instead of requiring the full model to fit in VRAM.

## What is it?

An open research platform and a usable inference engine at once. Five model families run today — GLM-5.2 (744B), Inkling (975B), Kimi K3 (2.8T), DeepSeek V4 Flash (284B), and OLMoE (7B) — each as one C file behind the same `coli chat` / `coli serve` / `coli web` front end. It streams experts from disk with a measured-routing-heat JIT (per-layer LRU, learned hot-store, one-layer-ahead prefetch), overlaps I/O and compute, and never silently changes model precision or router semantics to hit a speed target.

## Why use it?

Running a 744B–2.8T parameter MoE model normally requires hyperscaler-class GPU clusters. Colibrì's memory-multitiering approach means insufficient fast memory reduces speed rather than making the model unrunnable — so a single workstation with limited VRAM can still run a frontier-scale model, just slower, with full model semantics preserved. It's aimed at people who want to hold and inspect a frontier model directly rather than rent it behind an API.

## Installation

```bash
git clone https://github.com/JustVugg/colibri && cd colibri/c
make -C c glm            # or: inkling, kimi_k3, deepseek-v4, olmoe
```

Requires Python 3 (the launcher and tooling use it) and a downloaded model checkpoint (models are hosted on Hugging Face, e.g. `mastouri/GLM-5.2-colibri-int4-g64-with-int8-mtp`, 372 GB). Optionally `pip install -e .` from a checkout to put `coli` on your PATH. Works on Linux, macOS (CPU/Metal), and Windows (`python coli chat --model D:\glm52_i4`).

## Basic Usage

```bash
COLI_MODEL=/nvme/glm52_i4 ./coli chat     # TUI chat, RAM budget/cache/MTP auto-detected
./coli serve --model /nvme/glm52_i4       # API + web dashboard, headless
./coli web                                 # live dashboard: token metrics, VRAM/RAM/disk tier bar, expert map
```

Point `COLI_MODEL` at a downloaded/converted checkpoint directory; the engine auto-detects available RAM/VRAM and configures caching and speculative decoding accordingly. A GPU only makes it faster — throughput is fundamentally set by disk speed, since experts stream from storage.

## Key Features

- Runs 744B–2.8T parameter MoE models on consumer/heterogeneous hardware, pure C, zero engine dependencies
- Unified VRAM/RAM/storage memory hierarchy — limited fast memory changes speed, not model semantics
- Measured-routing-heat JIT for weights: per-layer LRU, learned pinned hot-store, one-layer-ahead prefetch
- I/O-aware engine: batched expert unions, overlapped reads/compute, `O_DIRECT`, dual-SSD striping
- Heterogeneous execution across CPU, CUDA, Metal, NUMA memory
- Compressed state: 57x smaller MLA KV state, persistent warm conversations
- Native speculative decoding (MTP, grammar-forced drafts), measured end to end and disabled if it doesn't pay off
- Live web dashboard: per-turn timing, VRAM/RAM/disk tier bar, "Brain" and "Atlas" views of live expert routing

## Top 5 Use Cases

- Running a frontier-scale (700B+) open-weight model locally without hyperscaler GPU access
- Research into inference-side systems optimization: memory tiering, speculative decoding, I/O scheduling
- Privately probing/inspecting model internals (expert routing, activation patterns) that an API-gated model hides
- Cost-sensitive local inference for teams that can't justify renting large GPU clusters continuously
- Experimenting with quantization/precision tradeoffs on genuinely large MoE models

## Competitors

- **llama.cpp / ggml** — the closest comparison: CPU/GPU-hybrid inference with quantization, but without Colibrì's explicit disk-as-tier JIT and dual-SSD streaming focus
- **vLLM / TensorRT-LLM** — production-grade GPU-cluster inference servers, assume the model fits in VRAM across GPUs
- **Ollama** — user-friendly local LLM runner, targets much smaller models than 744B–2.8T MoE

Not comparable to the CRM or web/browser tools on this site — it's a different category (local LLM inference infrastructure), most relevant alongside other local-model tooling.

## Pros

- Makes genuinely frontier-scale models (up to 2.8T params) runnable on hardware an individual can own
- Pure C, zero dependencies — small, auditable engine
- Explicit hard guarantee against silently degrading model semantics for speed
- Transparent research methodology: hypotheses tracked with evidence and open experiments in the README
- Rich observability: live dashboard, per-expert routing visualization

## Cons

- Requires very large local storage (models are hundreds of GB) and ideally fast NVMe for usable throughput
- Speed is fundamentally disk-bound — "744B at 4 tok/s" is representative, not fast by API standards
- Early-stage research project; several optimizations are explicitly flagged as unproven hypotheses
- Steeper setup than `ollama run <model>` — requires building from source, downloading multi-hundred-GB checkpoints, tuning per-machine
- Apache-2.0 licensed, which is permissive, but the model weights themselves carry their own separate licenses

## Resources

- [GitHub Repository](https://github.com/JustVugg/colibri)
- [Website](https://justvugg.github.io/colibri)
- [Discord](https://discord.gg/fpQxKnRb)
