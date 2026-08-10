---
title: HyperFrames
description: Open-source framework and agent skill set for turning plain HTML/CSS into deterministic, render-to-MP4 videos
order: 1
---

# HyperFrames

**[heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)**

## Overview

HyperFrames, built by HeyGen, is an open-source framework for producing deterministic MP4 videos from plain HTML, CSS, media, and seekable animations — no React or proprietary timeline format required. It ships as a CLI/renderer plus a set of 19 "skills" that teach AI coding agents (Claude Code, Cursor, Gemini CLI, Codex, etc.) how to plan, write, and render videos end-to-end from a natural-language brief.

## What is it?

A Node.js (22+) toolchain built around the idea that a video composition is just an HTML file with `data-*` timing attributes and a `class="clip"` convention, animated via adapters for GSAP, CSS, Lottie, Three.js, Anime.js, or WAAPI. The renderer seeks each frame in headless Chrome and encodes with FFmpeg, so the same input deterministically produces the same output — useful for CI and regression testing, not just one-off video generation. It also ships a component catalog, a Studio browser editor, and AWS Lambda-based distributed rendering.

## Why use it?

Existing programmatic video tools (notably Remotion) bet on React as the authoring model, which is a mismatch for agents that already write HTML/CSS fluently and don't need a bundler in the loop. HyperFrames' HTML-native, no-build-step approach means an agent (or human) can hand off a single `index.html` that previews directly in a browser and renders identically every time — plus its skill pack gives agents a structured production workflow (plan → write HTML → animate → lint → preview → render) instead of ad hoc prompting.

## Installation

**As agent skills:**

```bash
npx skills add heygen-com/hyperframes --full-depth
```

Non-interactive/agent runs should instead use:

```bash
npx hyperframes skills update
```

which installs exactly the core skill set (the `--full-depth` flag is required either way to get current `main` rather than a stale registry snapshot).

**As a CLI project:**

```bash
npx hyperframes init my-video
cd my-video
npx hyperframes preview   # live-reload browser preview
npx hyperframes render    # render to MP4
```

Requirements: Node.js 22+, FFmpeg.

## Basic Usage

```html
<div id="stage" data-composition-id="launch" data-start="0" data-width="1920" data-height="1080">
  <video class="clip" data-start="0" data-duration="6" data-track-index="0" src="intro.mp4" muted playsinline></video>
  <h1 id="title" class="clip" data-start="1" data-duration="4" data-track-index="1">Launch day</h1>
  <audio data-start="0" data-duration="6" data-track-index="2" data-volume="0.5" src="music.wav"></audio>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script>
    const tl = gsap.timeline({ paused: true });
    tl.from("#title", { opacity: 0, y: 40, duration: 0.8 }, 1);
    window.__timelines = window.__timelines || {};
    window.__timelines.launch = tl;
  </script>
</div>
```

Preview in the browser, then render locally, in Docker, or via AWS Lambda for distributed rendering.

## Key Features

- HTML-native compositions: no React, no bundler, `index.html` plays as-is
- Deterministic, frame-accurate rendering via headless Chrome + FFmpeg
- Adapter-based animation: GSAP, CSS, Lottie, Three.js, Anime.js, WAAPI, or custom runtimes
- 19 on-demand agent skills covering planning, animation, keyframes, media sourcing, CLI ops, and Figma import
- Component catalog (`npx hyperframes add <block>`) for transitions, overlays, charts, and effects
- Local, Docker, and AWS Lambda distributed rendering paths
- `frame.md`/`DESIGN.md` workflow for translating a web design system into video-ready design tokens

## Top 5 Use Cases

- AI coding agents generating product-launch or feature-announcement videos from a brief or URL
- Automated PR-to-video changelog/feature-reveal explainers driven from a GitHub PR
- Data visualizations and chart-race style videos rendered deterministically for reports
- CI-driven regression testing of motion-graphics/video output (same input, same frames, every run)
- Social/marketing video pipelines needing captions, overlays, and beat-synced music at scale

## Competitors

- **Remotion** — the direct inspiration and closest competitor; React-based authoring vs. HyperFrames' plain-HTML model, source-available license vs. Apache 2.0, and Remotion's cloud renderer is more mature than HyperFrames' Lambda path
- **Creatomate / Shotstack** — hosted, template-driven video-generation APIs, not open source or agent-native in the same way
- **FFmpeg-based custom pipelines** — lower-level, no composition/timing abstraction or agent skill layer

## Pros

- Apache 2.0 license, no per-render fees or commercial-use thresholds
- No build step — plain HTML previews and hands off cleanly to non-React tooling/agents
- Deterministic output makes it viable for CI and regression testing, unlike typical video tools
- Purpose-built agent skill pack, actively used in production at HeyGen and by teams like tldraw and TanStack
- Distributed rendering via AWS Lambda included

## Cons

- Newer and narrower ecosystem than Remotion, which has a larger community and more mature cloud rendering
- Headless Chrome + FFmpeg rendering has real compute cost for longer/complex videos, especially without Lambda set up
- Agent skill installation footguns are called out explicitly in the README (interactive picker vs. non-interactive `skills update` installing different sets) — easy to over-install by accident
- Repo uses Git LFS for ~240MB of regression-test video fixtures, adding friction to a full clone
- Requires Node 22+ and FFmpeg locally, which is a heavier prerequisite than a pure API-based video service

## Resources

- [GitHub Repository](https://github.com/heygen-com/hyperframes)
- [Documentation](https://hyperframes.heygen.com/introduction)
- [Playground](https://www.hyperframes.dev/)
- [HyperFrames vs Remotion guide](https://hyperframes.heygen.com/guides/hyperframes-vs-remotion)
