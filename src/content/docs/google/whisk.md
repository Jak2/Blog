---
title: Whisk
description: Google Labs' AI tool for remixing images by subject, scene, and style instead of text prompts
order: 2
---

# Whisk

## Overview
Whisk is a Google Labs experiment that lets you generate new images by combining other images — a subject, a scene, and a style — instead of writing a long text prompt.

## What is it?
An image-remixing tool where you drag and drop up to three reference images (subject, scene, style). Gemini converts those images into a detailed prompt behind the scenes, which Imagen 3 then renders into a new image.

## Why use it?
- Prompting by example is often faster and more intuitive than describing a complex scene in words.
- Good for "I want something like this, but in that style" workflows that are awkward to type out.
- Iterating on a look (same subject, different style/scene) is quick.

## Installation (how to access)
Hosted web app at [labs.google/whisk](https://labs.google/whisk). No install. Available in 100+ countries as of its 2025 expansion, but notably still unavailable in some markets (UK and India were reported excluded). Sign in with a Google account.

## Basic Usage
1. Go to labs.google/whisk and sign in.
2. Upload/select an image for the subject, one for the scene, and one for the style (you can also generate placeholders instead of uploading).
3. Whisk derives a prompt from the combination and generates a new image via Imagen 3.
4. Refine by swapping any one of the three inputs and regenerating.

## Key Features
- Image-as-prompt workflow (subject + scene + style)
- Gemini-generated intermediate prompts (no manual prompt writing required)
- Imagen 3 rendering
- Fast iteration by swapping a single input image

## Top 5 Use Cases
1. Concept art exploration (same character, different settings/styles)
2. Marketing/creative asset ideation
3. Style-transfer style experiments without manual masking
4. Quickly visualizing "what if X looked like Y" combinations
5. Generating reference images for further editing in other tools

## Competitors
- Midjourney (text-prompt-first, more mature stylistic control)
- Adobe Firefly (style reference features, tighter Creative Cloud integration)
- Google Mixboard (board/ideation-focused rather than single-image remix)
- Stable Diffusion + ControlNet/IP-Adapter (open-source equivalent of image-conditioned generation)

## Pros
- No prompt-engineering skill needed — the images do the talking
- Free to use
- Broad geographic availability (100+ countries)

## Cons
- Less precise control than a well-crafted text prompt
- Still a Labs experiment — no SLA, features/availability can change
- Not available in every country (e.g., UK, India excluded at last check)
- Output quality tied to Imagen 3's current limitations (text rendering, hands, etc.)

## Resources
- [Official site](https://labs.google/whisk)
- [Google Labs blog announcement](https://blog.google/innovation-and-ai/models-and-research/google-labs/whisk/)
- [Google Labs hub](https://labs.google/)
