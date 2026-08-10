---
title: OmniParser
description: Parses UI screenshots into structured elements for vision-based GUI agents
order: 1
---

# OmniParser

**[microsoft/OmniParser](https://github.com/microsoft/OmniParser)**

## Overview

OmniParser parses a raw UI screenshot into structured, machine-readable elements — icons, text, buttons, with bounding boxes and semantic descriptions — so a vision-based GUI agent can ground its actions in actual interface structure instead of guessing pixel coordinates from a screenshot.

## What is it?

A two-stage pipeline: a YOLOv9-based detection model finds interactable regions on screen, and a captioning model describes what each region is/does. The combined structured output ("this box at (x,y) is a Save button") is what gets fed to an LLM driving the agent, instead of the LLM parsing the raw image itself.

## Why use it?

Vision-language models are inconsistent at pinpointing exact click coordinates from a screenshot alone. OmniParser offloads that grounding problem to purpose-built detection/captioning models, which is why it topped Windows Agent Arena benchmarks and trended #1 on Hugging Face — it measurably improves action accuracy for any GUI agent built on top of it (OpenAI, Anthropic, DeepSeek, Qwen models all reported compatible).

## Installation

```bash
git clone https://github.com/microsoft/OmniParser
cd OmniParser
# Python 3.12 environment
pip install -r requirements.txt
# download model weights from Hugging Face per README
```

## Basic Usage

```bash
python gradio_demo.py
```

Or work through `demo.ipynb` directly — feed it a screenshot, get back structured element data to hand off to an LLM for action planning.

## Key Features

- YOLOv9-based UI element detection (MIT-licensed detector)
- Captioning model describing each detected element's function
- v2.0: improved detection models, multi-LLM integration (OpenAI, DeepSeek, Qwen, Anthropic)
- Gradio demo + notebook for quick experimentation
- Benchmarked #1 on Windows Agent Arena at release

## Top 5 Use Cases

1. Grounding a computer-use agent's clicks/actions in real UI structure instead of raw pixels
2. Building a custom GUI-automation agent on top of any LLM (not locked to one vendor)
3. Accessibility tooling that needs structured descriptions of on-screen elements
4. RPA-style automation for apps without an API
5. Benchmarking/research on vision-grounded agent action accuracy

## Competitors

- Vendor-native computer-use models (Anthropic's Claude computer-use, OpenAI's CUA) — bundle their own screen-grounding internally; OmniParser is a swappable, model-agnostic front-end for the same problem.
- Traditional OS-level accessibility APIs (UI Automation, AXUI) — more precise when available, but many apps don't expose rich accessibility trees, which is the gap OmniParser's vision-based approach fills.

## Pros

- Strong benchmark results (Windows Agent Arena #1 at release)
- Model-agnostic — works with multiple LLM backends, not locked to one vendor
- MIT-licensed detector/caption models, easy to self-host
- Active, Microsoft-backed, large community (25k+ stars)

## Cons

- Parsing layer only — still need an LLM and agent loop on top to actually act
- GPU/compute overhead for running detection + captioning models locally
- CC-BY-4.0 overall license (attribution required) even though sub-models are MIT — worth checking before commercial redistribution

## Resources

- [GitHub Repository](https://github.com/microsoft/OmniParser)
