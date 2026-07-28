---
title: ComfyUI
description: Node-based, modular GUI/backend for Stable Diffusion, Flux, video, audio, and 3D generation workflows
order: 2
---

# ComfyUI

**[comfy-org/ComfyUI](https://github.com/comfy-org/comfyui)**

![Stars](https://img.shields.io/github/stars/comfy-org/comfyui?style=flat-square) ![License](https://img.shields.io/github/license/comfy-org/comfyui?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/comfy-org/comfyui?style=flat-square)

## Overview
ComfyUI is the most widely used node-based interface, API, and backend for diffusion-model content generation. Instead of a fixed UI with hidden logic, every step of an image/video/audio generation pipeline is a visible, connectable node — giving full control over the process without writing code.

## What is it?
A Python/PyTorch application that exposes Stable Diffusion (1.x/2.x/SDXL/SD3/3.5), Flux, video models (Mochi, LTX-Video, and others), audio generation, and 3D model generation through a drag-and-drop graph editor. Workflows are just JSON graphs, so they can be saved, shared, and re-run exactly. It also runs headless as an API/backend for other apps.

## Why use it?
Simple prompt boxes (like Automatic1111 or basic web UIs) hide what's actually happening and make advanced pipelines (multi-stage upscaling, ControlNet chains, LoRA stacking, inpainting workflows) awkward. ComfyUI makes the pipeline itself the interface — every node is inspectable and swappable — which is why it became the standard for power users, researchers, and teams building production image/video pipelines. It's also efficient: it only re-executes graph nodes whose inputs changed, and it manages VRAM aggressively so it runs on modest GPUs.

## Installation
**Desktop app (easiest — Windows/macOS):** download the installer from the [releases page](https://github.com/comfy-org/ComfyUI/releases) or comfy.org; bundles Python and dependencies.

**Windows portable build:** a standalone zip with an embedded Python — unzip and run, no install needed.

**Manual install (all platforms):**
```bash
git clone https://github.com/comfy-org/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
python main.py
```
Requires Python 3.12+ and PyTorch 2.5+. Supports NVIDIA (CUDA), AMD (ROCm), Intel, Apple Silicon (MPS), and CPU-only fallback.

**Cloud:** Comfy Cloud offers a hosted version with no local GPU required.

## Basic Usage
1. Launch with `python main.py` (or the desktop app) and open the browser UI (default `localhost:8188`).
2. Drag in a checkpoint/model loader node, connect it to a sampler, prompt (CLIP text encode), and output/save-image node.
3. Adjust parameters (steps, CFG, sampler, resolution) on each node.
4. Press `Ctrl+Enter` to queue the generation; `Ctrl+S` saves the workflow as JSON.
5. Load community workflows (JSON files, often embedded in generated PNGs) to reproduce complex pipelines instantly.

## Key Features
- Node/graph editor for building arbitrary generation pipelines visually
- Broad model support: SD1.x/2.x, SDXL, SD3/3.5, Flux, video (Mochi, LTX-Video), audio, and 3D generation
- Smart caching — only re-runs graph nodes affected by a changed input
- Aggressive memory management with GPU offloading for low-VRAM cards
- First-class support for LoRAs, embeddings, ControlNets, and upscalers
- Fully offline-capable, no telemetry required
- Workflows are portable JSON — shareable, embeddable in output images
- Runs as GUI, headless API, or backend for third-party frontends
- Huge plugin/custom-node ecosystem (ComfyUI-Manager, etc.)

## Top 5 Use Cases
- Building custom, repeatable image-generation pipelines (multi-stage refine/upscale/inpaint)
- Text-to-video and image-to-video generation workflows
- Prototyping and serving generative AI features via the ComfyUI API/backend
- Research/experimentation with new diffusion architectures and techniques (ControlNet, IP-Adapter, etc.)
- Batch/production content pipelines for studios, indie creators, and generative-art businesses

## Competitors
- **Automatic1111 (AUTOMATIC1111/stable-diffusion-webui)** — the original popular SD web UI, simpler but less modular
- **Fooocus** — simplified, opinionated SDXL UI aimed at ease of use over control
- **InvokeAI** — polished node + canvas hybrid UI, more consumer-friendly
- **SD.Next** — a fork/evolution of Automatic1111 with broader model support
- **Midjourney / DALL-E / commercial SaaS tools** — closed, hosted alternatives with no local control

## Pros
- Extremely flexible — supports workflows no simpler UI can express
- Efficient execution (caching, VRAM management) — runs on modest hardware
- Large, active community and plugin ecosystem
- Free, open-source (GPL-3.0), fully offline-capable
- Workflows are reproducible and shareable as JSON

## Cons
- Steep learning curve — the node graph is intimidating for beginners
- Complex workflows can get visually cluttered and hard to debug
- Requires understanding of the underlying diffusion pipeline to use well
- Desktop app aside, manual setup still involves Python/dependency management
- Custom-node ecosystem is unmoderated — quality and security vary

## Resources
- [GitHub repo](https://github.com/comfy-org/comfyui)
- [comfy.org](https://www.comfy.org/)
- [Releases](https://github.com/comfy-org/ComfyUI/releases)
- [Comfy Cloud](https://www.comfy.org/cloud)
