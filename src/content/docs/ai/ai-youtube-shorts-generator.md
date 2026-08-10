---
title: AI Youtube Shorts Generator (AutoShorts AI)
description: Python pipeline that turns a topic into a fully edited faceless YouTube Short/TikTok using Gemini, Pexels stock footage, and FFmpeg
order: 1
---

# AI Youtube Shorts Generator (AutoShorts AI)

**[SaarD00/AI-Youtube-Shorts-Generator](https://github.com/SaarD00/AI-Youtube-Shorts-Generator)**

## Overview

AutoShorts AI is a Python automation pipeline that produces faceless short-form videos end to end: give it a topic, and it writes a script, generates a voiceover, sources two distinct stock clips per scene from Pexels, and edits them together with transitions and an optional avatar overlay.

## What is it?

A CLI-driven video factory. It uses Google Gemini 2.0 Flash for structured scriptwriting, `edge-tts` for free voiceover, the Pexels API for stock footage (two clips per scene, switched mid-scene as an "A/B split" for retention), and FFmpeg for assembly, silence removal, and audio/video sync. A user-supplied avatar clip can be injected into random scenes for brand consistency.

## Why use it?

It removes the manual grind of short-form content production — no camera, no manual editing, no stock-footage hunting — while staying free/local aside from API keys. Good fit for anyone wanting to batch-produce faceless Shorts/TikToks without a subscription-based SaaS tool.

## Installation

```bash
git clone https://github.com/SaarD00/AI-Youtube-Shorts-Generator.git
cd AI-Youtube-Shorts-Generator
pip install -r requirements.txt
# install FFmpeg separately, verify with: ffmpeg -version
mkdir -p assets/avatar   # optional: add avatars.mp4 for avatar overlay
cp .env.example .env      # add Gemini + Pexels API keys
```

## Basic Usage

```bash
python main.py
# enter a topic when prompted
# output: assets/final/final_short.mp4
```

## Key Features

- Gemini-driven scriptwriting with structured storytelling
- Two stock clips per scene from Pexels, switched mid-scene ("A/B split")
- Optional avatar video injected into random scenes
- Free voiceover via `edge-tts`
- Automatic silence removal and audio/video sync
- Windows-optimized FFmpeg render flags

## Top 5 Use Cases

- Batch-producing faceless educational Shorts
- Viral-style trivia/list videos for TikTok
- Edutainment channels without on-camera talent
- Rapid prototyping of short-form content ideas
- Adding a consistent brand avatar to auto-generated videos

## Competitors

- **[VUZA](/docs/ai/vuza)** — same faceless-video niche, but sources media from Pinterest/Pexels/Pixabay instead of Pexels-only, and targets longer scripted videos as well as shorts
- **[YouTube Automation Agent](/docs/ai/youtube-automation-agent)** — broader full-channel automation (thumbnails, SEO, scheduling, publishing, analytics) rather than a single-video generator
- **MoneyPrinter Turbo** — similar faceless-video generator concept
- **Pictory AI / InVideo AI** — commercial, subscription-based equivalents

## Pros

- Free and open-source (MIT), no subscription
- Structured "A/B split" editing is a genuinely useful retention trick
- Simple single-command workflow
- Avatar overlay adds branding without filming

## Cons

- Requires managing Gemini + Pexels API keys yourself
- FFmpeg rendering flags are Windows-optimized, may need tweaking elsewhere
- Only produces one video per run — no scheduling/publishing built in
- Quality depends heavily on Pexels stock footage matching the script

## Resources

- [GitHub Repository](https://github.com/SaarD00/AI-Youtube-Shorts-Generator)
