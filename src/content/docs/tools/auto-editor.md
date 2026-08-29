---
title: Auto-Editor
description: Command-line tool that auto-cuts silence and dead space from video/audio using loudness and motion detection
order: 1
---

# Auto-Editor

**[WyattBlue/auto-editor](https://github.com/WyattBlue/auto-editor)**

![Stars](https://img.shields.io/github/stars/WyattBlue/auto-editor?style=flat-square) ![License](https://img.shields.io/github/license/WyattBlue/auto-editor?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/WyattBlue/auto-editor?style=flat-square)

## Overview

Auto-Editor is a command-line tool that automatically edits video and audio by detecting silence, motion, and other content patterns — cutting the "dead space" that would otherwise take a human editor hours to trim by hand.

## What is it?

A CLI that analyzes a video/audio file by audio loudness, motion detection, or custom thresholds, then removes inactive sections automatically. It supports a flexible labeling system (0–255) that assigns different actions to different content types, margin control to pad cuts for natural-feeling edits, and exports compatible with Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, Shotcut, and Kdenlive — so the cut can be handed off to a full NLE for finishing touches. Also available as a web app and downloadable desktop build.

## Why use it?

Manually scrubbing through a podcast or screen recording to cut silence is slow, repetitive work. Auto-Editor automates the first-pass edit from the command line, then exports directly into the editor you already use for polish — rather than forcing an all-or-nothing web-only workflow.

## Installation

```bash
pip install auto-editor
```

## Basic Usage

```bash
auto-editor path/to/your/video.mp4
auto-editor path/to/video.mp4 --margin 0.2sec --edit audio
```

## Key Features

- Automatic cutting of silent/inactive sections
- Multiple edit methods: audio loudness, motion detection, custom thresholds
- Flexible labeling system (0–255) with per-label actions
- Margin control for natural-feeling cut padding
- Export to Premiere Pro, DaVinci Resolve, Final Cut Pro, Shotcut, Kdenlive
- Web app and desktop app in addition to the CLI

## Top 5 Use Cases

1. Automating first-pass silence removal for podcasts/interviews
2. Speeding up screen-recording and tutorial video editing
3. Trimming dead space before handing footage to a full NLE
4. Batch-processing large volumes of raw recorded content
5. Speech-focused video trimming for content creators

## Competitors

- Descript — full transcript-based editor with a GUI, vs. Auto-Editor's scriptable CLI-first workflow.
- Manual NLE editing (Premiere/DaVinci/Final Cut) — full control but no automated first-pass cut.

## Pros

- Public Domain (Unlicense) — no licensing restrictions at all
- Active community (5.1k+ stars, 624+ forks)
- Exports directly into major NLEs instead of locking you into one editor
- Scriptable CLI fits into automated batch pipelines

## Cons

- Written in Nim — less common tooling/ecosystem than Python-based alternatives for contributors
- CLI-first — less approachable for non-technical editors than a full GUI tool
- Automatic cuts still need a manual review pass for edge cases (natural pauses, sound effects)

## Resources

- [GitHub Repository](https://github.com/WyattBlue/auto-editor)
