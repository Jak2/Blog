---
title: Handy
description: Free, open-source, offline speech-to-text app — press a shortcut, speak, get text in any field
order: 1
---

# Handy

**[cjpais/handy](https://github.com/cjpais/handy)**

![Stars](https://img.shields.io/github/stars/cjpais/handy?style=flat-square) ![License](https://img.shields.io/github/license/cjpais/handy?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/cjpais/handy?style=flat-square)

## Overview
Handy is a free, open-source, cross-platform desktop app that turns speech into text anywhere on your machine. Press a keyboard shortcut, talk, and the transcribed text is inserted into whatever text field is active — entirely offline.

## What is it?
A local speech-to-text utility built with Tauri (Rust backend, React/TypeScript/Tailwind frontend). It runs Whisper-family models, Parakeet V3, Moonshine, GigaAM, Canary, and SenseVoice locally, with optional GPU acceleration, and uses Silero VAD to strip silence before transcription. No audio ever leaves the device.

## Why use it?
Paid dictation tools (Wispr Flow, Superwhisper, AquaVoice) are polished but cloud-based, subscription-priced, and send your voice to a third party. Handy targets people who want dictation that is free, private-by-default, and works the same on Windows, macOS, and Linux without a recurring bill.

## Installation
- Download a prebuilt binary from the [releases page](https://github.com/cjpais/Handy/releases) or [handy.computer](https://handy.computer).
- macOS: `brew install` (Homebrew cask) or the release DMG.
- Windows: `winget` or the release installer.
- Linux: release build for your distro.
- After install, grant microphone and accessibility permissions when prompted (required for global shortcut + text insertion).

## Basic Usage
1. Open Handy and set a keyboard shortcut (push-to-talk or toggle mode).
2. Click into any text field in any app.
3. Hold/press the shortcut and speak.
4. Release — the transcription is pasted at the cursor automatically.
5. Optionally swap the underlying model (Whisper, Parakeet, etc.) in settings to trade off speed vs. accuracy.

## Key Features
- 100% local/offline transcription — no cloud calls, no account
- Cross-platform: Windows, macOS, Linux
- Multiple model families supported (Whisper, Parakeet V3, Moonshine, GigaAM, Canary, SenseVoice) with GPU acceleration
- Voice Activity Detection (Silero VAD) to skip silence
- Configurable push-to-talk or toggle recording shortcuts
- Raycast extension for macOS power users
- MIT-licensed core (brand/logo assets excluded from the open license)

## Top 5 Use Cases
- Dictating emails, docs, or chat messages hands-free
- Fast note-taking during meetings without a cloud transcription vendor
- Coding by voice (dictating comments, commit messages, prompts to an AI tool)
- Accessibility — an alternative input method for users who find typing difficult
- Privacy-sensitive dictation (legal, medical, journaling) where audio can't leave the device

## Competitors
- **Superwhisper** (macOS/iOS) — polished, paid, feature-rich local dictation
- **Wispr Flow** — cloud-based, rewrites speech into clean prose, subscription
- **VoiceInk** — open-source-adjacent, often cited as a stronger Superwhisper alternative
- **Whispering** — another free/open-source cross-platform Whisper-based dictation tool
- **AquaVoice**, **VoiceDash**, **Willow Voice** — paid, polish-focused alternatives with mobile support

## Pros
- Free and fully offline — strong privacy story
- Cross-platform (rare for this category; most competitors are macOS-only)
- Choice of multiple speech models to balance speed/accuracy/hardware
- Actively maintained, simple scope (does one thing)

## Cons
- Less polished UX than paid tools like Superwhisper or Wispr Flow (no auto-editing/prose cleanup)
- Younger project — smaller community, fewer integrations
- Branding/logo not open-source, so forks must rebrand
- No cloud sync or mobile app (desktop-only)

## Resources
- [GitHub repo](https://github.com/cjpais/handy)
- [handy.computer](https://handy.computer)
- [Releases](https://github.com/cjpais/Handy/releases)
