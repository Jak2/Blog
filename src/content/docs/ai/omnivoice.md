---
title: OmniVoice
description: Massively multilingual zero-shot TTS (600+ languages) with fast diffusion-language-model architecture
order: 3
---

# OmniVoice

**[k2-fsa/OmniVoice](https://github.com/k2-fsa/OmniVoice)**

![Stars](https://img.shields.io/github/stars/k2-fsa/OmniVoice?style=flat-square) ![License](https://img.shields.io/github/license/k2-fsa/OmniVoice?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/k2-fsa/OmniVoice?style=flat-square)

## Overview
OmniVoice is an open-source, massively multilingual, zero-shot text-to-speech (TTS) model from the k2-fsa team (the group behind k2/icefall/sherpa speech tooling). It targets 600+ languages with a diffusion-language-model hybrid architecture that is notably fast at inference.

## What is it?
A TTS model that combines diffusion-model speech quality with LLM-style autoregressive generation speed. It supports zero-shot voice cloning (from a short reference clip), voice design (specifying speaker traits like gender, age, pitch, accent/dialect instead of a reference voice), and "auto voice" generation. Non-verbal control tokens like `[laughter]` and pronunciation-correction hooks give fine-grained control over output.

## Why use it?
Most open TTS models cover a handful of languages well (English, Chinese, a few European languages) and either sacrifice speed for quality or vice versa. OmniVoice's pitch is breadth (600+ languages, useful for low-resource-language applications) plus speed (RTF as low as 0.025, ~40x faster than real-time) without giving up zero-shot voice cloning quality — the paper reports it beating F5-TTS, ZipVoice, and MaskGCT on the Emilia benchmark and competing with CosyVoice3 on multilingual benchmarks.

## Installation
**pip:**
```bash
# install a matching PyTorch build for your hardware first
pip install omnivoice
```

**uv (from source):**
```bash
git clone https://github.com/k2-fsa/OmniVoice.git
cd OmniVoice
uv sync
```

## Basic Usage
- **Web UI:**
  ```bash
  omnivoice-demo --ip 0.0.0.0 --port 8001
  ```
  Opens a Gradio interface for voice cloning, voice design, and auto-voice generation in the browser.
- **Python API:** call the three generation modes (clone / design / auto) directly, passing text plus a reference clip or speaker-attribute description.
- **CLI:** single-file and batch inference commands are provided for scripted/offline use.
- **Hosted options:** a HuggingFace Space and Google Colab notebook are available for trying it without local setup.
- Optional Whisper ASR integration for auto-transcribing reference audio when no transcript is supplied.

## Key Features
- Zero-shot voice cloning from a short reference audio sample
- Voice design mode — specify gender, age, pitch, accent, dialect instead of a reference clip
- 600+ language coverage — among the broadest of any open TTS model
- Fast inference (RTF ~0.025, ~40x real-time) via diffusion-language-model hybrid architecture
- Fine-grained control via non-verbal tags (e.g. `[laughter]`) and pronunciation correction
- Gradio web demo, Python API, and CLI (single + batch) interfaces
- Optional Whisper-based auto-transcription for reference audio

## Top 5 Use Cases
- Multilingual voiceovers/dubbing for video or e-learning content, including low-resource languages
- Voice cloning for personalized assistants, audiobook narration, or content creator tools
- Synthetic-voice generation for accessibility (screen readers, text-to-speech for non-native speakers)
- Rapid prototyping of voice products where 600+ language coverage matters more than hand-tuned single-language quality
- Research/benchmarking baseline for zero-shot multilingual TTS work

## Competitors
- **F5-TTS** — popular open flow-matching zero-shot TTS, fewer languages
- **CosyVoice / CosyVoice3** (Alibaba) — strong multilingual zero-shot TTS, flow-matching on AR tokens
- **XTTS (Coqui)** — widely used open zero-shot voice-cloning TTS, ~17 languages
- **MaskGCT, ZipVoice** — other open non-autoregressive zero-shot TTS baselines cited in the OmniVoice paper
- **ElevenLabs** — leading commercial/closed multilingual voice-cloning TTS service

## Pros
- Broadest language coverage of any open TTS project reviewed here (600+)
- Very fast inference relative to reported quality (real-time or faster)
- Multiple generation modes (clone, design, auto) in one model
- Apache 2.0 license — permissive for commercial use
- Multiple access paths: pip, source, Colab, HF Space

## Cons
- Newer/smaller project — thinner documentation and community than F5-TTS/CosyVoice/XTTS at time of writing
- Backed mainly by research paper + repo; less battle-tested in production than commercial alternatives
- Quality across all 600+ languages is unlikely to be uniform — the breadth claim needs per-language verification for serious use
- Requires matching PyTorch/GPU setup manually (no one-click installer like ComfyUI's desktop app)

## Resources
- [GitHub repo](https://github.com/k2-fsa/OmniVoice)
- [Hugging Face model page](https://huggingface.co/k2-fsa/OmniVoice)
- [Paper: OmniVoice: Towards Omnilingual Zero-Shot Text-to-Speech with Diffusion Language Models](https://arxiv.org/abs/2604.00688)
