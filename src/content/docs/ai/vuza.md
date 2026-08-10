---
title: VUZA
description: Free, open-source faceless video creator with AI voiceover, subtitles, and a built-in Pinterest video scraper
order: 1
---

# VUZA

**[AliRash3ed/VUZA-Free-AI-Video-Creator-and-Pinterest-Video-Scraper](https://github.com/AliRash3ed/VUZA-Free-AI-Video-Creator-and-Pinterest-Video-Scraper)**

## Overview

VUZA is a free, open-source alternative to paid tools like Pictory AI, InVideo AI, and MoneyPrinter Turbo. It generates complete faceless videos from a script: AI keyword extraction, multi-source media scraping (including its own Pinterest video scraper), free voiceover, and styled subtitles — at $0 cost.

## What is it?

A local web app (Flask, run via `python app.py`) that takes a script or topic, extracts search keywords per sentence using three "vibe modes" (Aesthetic, LoFi, General), pulls matching HD media in parallel from Pinterest (its own scraper, built with Playwright), Pexels, and Pixabay, generates a voiceover with Microsoft Edge TTS, adds word-by-word styled subtitles, and assembles the final video with FFmpeg.

## Why use it?

Most faceless-video tools either cost money or rely on a single paid stock-footage API. VUZA is notable for including a free Pinterest video scraper as a media source alongside Pexels/Pixabay, and for its fallback system that retries with simplified queries across sources if the primary search comes up empty — reducing failed generations.

## Installation

```bash
git clone https://github.com/AliRash3ed/VUZA-Free-AI-Video-Creator-and-Pinterest-Video-Scraper.git
cd VUZA-Free-AI-Video-Creator-and-Pinterest-Video-Scraper
pip install -r requirements.txt
playwright install chromium
python app.py
# open http://localhost:8000
```

Add free API keys (OpenRouter, Pexels, Pixabay) in the app's settings.

## Basic Usage

1. Open `http://localhost:8000`.
2. Paste a script or topic, pick an aspect ratio (9:16 TikTok, 16:9 YouTube, 1:1 Instagram).
3. VUZA extracts keywords, scrapes/downloads matching media in parallel, generates voiceover and subtitles.
4. Download the assembled video.

## Key Features

- AI keyword extraction with three "vibe modes" (Aesthetic, LoFi, General)
- Multi-source media scraping: Pinterest (own scraper), Pexels, Pixabay
- Free voiceover via Microsoft Edge TTS, multiple voices/languages
- Word-by-word styled subtitles
- Universal fallback system across sources/queries
- Parallel downloads, multiple aspect ratios

## Top 5 Use Cases

- Faceless YouTube/TikTok/Reels videos without stock-footage subscriptions
- Educational and motivational content at zero cost
- News-summary style videos
- Testing content ideas before investing in paid tools
- Multi-language voiceover videos

## Competitors

- **[AI Youtube Shorts Generator](/docs/ai/ai-youtube-shorts-generator)** — narrower focus on short-form (Shorts/TikTok), single stock source (Pexels), adds an avatar-overlay feature VUZA lacks
- **[YouTube Automation Agent](/docs/ai/youtube-automation-agent)** — full channel management (SEO, scheduling, publishing) rather than a single-video generator
- **Pictory AI / InVideo AI / MoneyPrinter Turbo** — the paid tools VUZA explicitly positions itself as a free alternative to

## Pros

- Genuinely free — no paid stock-media API required (Pinterest scraping)
- Fallback system reduces failed generations
- Multiple vibe modes give some creative control over media style
- Web UI, not just a CLI

## Cons

- Relies on scraping Pinterest, which can break if Pinterest changes its site or blocks automation
- Playwright/Chromium dependency adds setup weight
- MIT license but scraping-based attribution expectations noted for the Pinterest feature
- No built-in publishing/scheduling — output is a local video file only

## Resources

- [GitHub Repository](https://github.com/AliRash3ed/VUZA-Free-AI-Video-Creator-and-Pinterest-Video-Scraper)
