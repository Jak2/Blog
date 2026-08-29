---
title: Pic Smaller
description: Free, browser-based batch image compressor — processes files locally via WASM, nothing uploaded to a server
order: 1
---

# Pic Smaller

**[joye61/pic-smaller](https://github.com/joye61/pic-smaller)**

![Stars](https://img.shields.io/github/stars/joye61/pic-smaller?style=flat-square) ![License](https://img.shields.io/github/license/joye61/pic-smaller?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/joye61/pic-smaller?style=flat-square)

## Overview

Pic Smaller is a free, browser-based batch image compression tool that does all processing locally on-device via WebAssembly — no image ever gets uploaded to a server.

## What is it?

A Next.js web app using WebAssembly, Web Workers, and browser codecs to batch-compress JPEG, PNG, WebP, GIF, SVG, and AVIF, plus decode/convert HEIC/HEIF images to JPEG, PNG, WebP, or AVIF. It supports resizing and cropping, multiple input methods (file picker, folder picker, drag-and-drop, clipboard paste), an interactive split-view to compare original vs. compressed, and batch download as a ZIP or individual files.

## Why use it?

Most online image compressors upload your files to a server, which is a non-starter for sensitive or private images and adds latency for large batches. Pic Smaller runs the entire compression pipeline in-browser via WASM, so files never leave the device — while still handling batch workflows and format conversion a native app would offer.

## Installation

```bash
git clone https://github.com/joye61/pic-smaller.git
cd pic-smaller
npm ci
npm run dev
```

Or just use the hosted web app directly — no install needed for end users.

## Basic Usage

Drop images (or a folder) into the browser tab, choose target format/quality/dimensions, compare original vs. compressed in the split-view, then download individually or as a ZIP.

## Key Features

- Batch compression: JPEG, PNG, WebP, GIF, SVG, AVIF
- HEIC/HEIF decoding and conversion to JPEG/PNG/WebP/AVIF
- Resize and crop alongside compression
- Multiple input methods: file picker, folder picker, drag-and-drop, clipboard paste
- Interactive split-view comparing original vs. compressed
- Batch ZIP download or individual file export
- 100% local/on-device processing — no server upload

## Top 5 Use Cases

1. Optimizing images for web deployment without a build-step plugin
2. Batch-processing entire photo libraries privately, in-browser
3. Converting HEIC photos (from iPhone) to web-friendly formats
4. Quick one-off compression without installing desktop software
5. Comparing compression quality/size tradeoffs via the split-view

## Competitors

- TinyPNG/Squoosh — Squoosh is also browser/WASM-based and similar in spirit; TinyPNG uploads to a server, which Pic Smaller avoids entirely.
- ImageOptim (desktop) — native app requiring install, vs. Pic Smaller's zero-install browser workflow.

## Pros

- MIT licensed, solid community (2.9k+ stars, 390+ forks)
- Fully local processing — meaningful privacy advantage over server-upload tools
- Broad format support including HEIC/HEIF and AVIF
- No install required for end users; open-source for self-hosting/customization

## Cons

- Browser/WASM performance ceiling below a native desktop compressor for very large batches
- No CLI/automation path — browser-only workflow
- A separate flagship Desktop edition exists for more professional workflows, implying feature gaps in the web version

## Resources

- [GitHub Repository](https://github.com/joye61/pic-smaller)
