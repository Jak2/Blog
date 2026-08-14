---
title: Ian Xiaohei Illustrations
description: Agent skill that generates hand-drawn Chinese-annotated illustrations from article text
order: 1
---

# Ian Xiaohei Illustrations

**[helloianneo/ian-xiaohei-illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations)**

## Overview

A Codex/Claude agent skill that turns an article's abstract concepts, workflows, and metaphors into hand-drawn illustrations featuring a recurring character, Xiaohei (小黑), who actively participates in the depicted action rather than sitting as decoration.

## What is it?

Given article text, the skill produces a shot list of 4-8 illustration concepts, then generates each as a 16:9 landscape PNG — white background, hand-drawn line art, minimal red/orange/blue Chinese text annotations. It also supports editing an existing illustration or generating a single concept on demand.

## Why use it?

Knowledge/methodology/AI-workflow content benefits from visual diagrams that clarify a cognitive action, but hand-illustrating each one is slow and requires a consistent visual style. This skill automates concept extraction and generation in one consistent hand-drawn aesthetic, tuned specifically for explaining ideas rather than decorating a page.

## Installation

```bash
git clone https://github.com/helloianneo/ian-xiaohei-illustrations.git
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R ./ian-xiaohei-illustrations "${CODEX_HOME:-$HOME/.codex}/skills/"
```

## Basic Usage

Invoke the skill against an article and it proposes a shot list of illustration concepts, generating each as a PNG once approved — or ask it to edit an existing image or produce a single concept directly.

## Key Features

- Extracts 4-8 illustration concepts (shot list) from article text automatically
- Consistent hand-drawn line-art style with a recurring character (Xiaohei)
- 16:9 landscape PNG output, minimal Chinese-language annotations
- Supports editing existing illustrations, not just generating new ones
- Tuned for knowledge/methodology/AI-workflow content specifically

## Top 5 Use Cases

1. Generating consistent diagram-style illustrations for a blog/newsletter series
2. Visualizing abstract workflows or methodologies for technical writing
3. Producing a full illustration set for a long article in one pass
4. Editing/iterating on a previously generated illustration
5. Adding Chinese-annotated visuals to bilingual or Chinese-language content

## Competitors

- **Manual illustration/Midjourney prompting** — more creative flexibility, but no consistent character/style system or article-to-shot-list automation.
- **[taste-skill](/docs/webdev/taste-skill)** — general design-taste skill for UI/layout work, not illustration generation; different problem domain entirely.

## Pros

- Consistent visual identity (recurring character, fixed style) across a whole content series
- Automates the concept-extraction step, not just image generation
- MIT licensed
- Active community (9.4k+ stars)

## Cons

- Style is fixed and narrow (hand-drawn, Chinese-annotated) — not general-purpose illustration
- Requires a Codex-compatible agent setup to run as a skill
- Best suited to knowledge/methodology content, less useful for other illustration needs

## Resources

- [GitHub Repository](https://github.com/helloianneo/ian-xiaohei-illustrations)
