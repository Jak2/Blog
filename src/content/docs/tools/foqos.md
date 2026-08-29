---
title: Foqos
description: Privacy-focused, open-source iOS app blocker using Screen Time API with NFC/QR-triggered focus sessions
order: 1
---

# Foqos

**[awaseem/foqos](https://github.com/awaseem/foqos)**

![Stars](https://img.shields.io/github/stars/awaseem/foqos?style=flat-square) ![License](https://img.shields.io/github/license/awaseem/foqos?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/awaseem/foqos?style=flat-square)

## Overview

Foqos is a free, open-source iOS app blocker built on Apple's Screen Time API — a privacy-first alternative to paid focus apps like Brick, Opal, Unpluq, and Blok, with no cloud sync, analytics, or account required.

## What is it?

An app offering multiple ways to start a focus session — manual activation, NFC tag scan, QR/barcode scan, timer, or pause timer — plus physical unlock via NFC/QR with optional strict unlock rules. It supports Lock Screen widgets and Dynamic Island Live Activities, iOS Shortcuts integration for automation, session history/focus streaks/profile insights, and even 3D-printable NFC accessories for physical trigger points.

## Why use it?

Commercial focus-blocker apps like Brick or Opal charge subscriptions and often require account creation with cloud sync of usage data. Foqos runs entirely local-first — no account, no analytics, no cloud — while matching the same physical-trigger workflow (tap an NFC tag to start/end a session) that makes those apps effective at breaking the habit of just disabling the blocker.

## Installation

Download from the App Store, grant Screen Time permissions, create a blocking profile, choose a session-start strategy, and activate.

## Basic Usage

Set up a blocking profile (which apps/sites to restrict), pick a trigger (manual, NFC tag, QR code, or timer), then start a session — restricted apps stay blocked until the session ends via the same trigger method or a strict unlock rule.

## Key Features

- Multiple session triggers: manual, NFC, QR/barcode, timer, pause timer
- Physical unlock via NFC tags or QR codes, with optional strict unlock rules
- Lock Screen widgets and Dynamic Island Live Activity support
- Local-first — no cloud sync, analytics, or account required
- iOS Shortcuts (App Intents) integration for automation
- Session history, focus streaks, and profile insights
- 3D-printable NFC accessories available

## Top 5 Use Cases

1. Blocking distracting apps during dedicated work/study sessions
2. Bedtime routines with NFC-triggered device lockdown
3. Physical-trigger habit breaking (tap a tag to start/end focus)
4. Automating focus sessions via iOS Shortcuts
5. Privacy-conscious digital wellness without cloud-synced usage data

## Competitors

- Brick/Opal/Unpluq/Blok — paid, subscription-based app blockers with similar physical-trigger mechanics, vs. Foqos's free, open-source, local-first model.
- Apple Screen Time (native) — built-in but less flexible triggering (no NFC/QR) than Foqos's session-start options.

## Pros

- MIT licensed, free and open-source (755+ stars, 127+ forks)
- No account, cloud sync, or analytics — genuinely local-first
- Physical NFC/QR triggers make sessions harder to casually bypass
- iOS Shortcuts integration for custom automation

## Cons

- iOS-only — no Android equivalent
- Relies on Apple's Family Controls/Screen Time API, so capabilities are bounded by what Apple exposes
- Smaller community/polish than established commercial competitors

## Resources

- [GitHub Repository](https://github.com/awaseem/foqos)
