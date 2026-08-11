---
title: emilkowalski/skills
description: Nine AI agent skills for animation and design craft, from Emil Kowalski (Sonner/Vaul author)
order: 1
---

# emilkowalski/skills

**[emilkowalski/skills](https://github.com/emilkowalski/skills)**

## Overview

A set of nine AI agent skills by Emil Kowalski focused specifically on animation and interface craft — teaching an agent proper easing curves, durations, and visual treatments so generated interfaces stop making the small motion/design mistakes that compound into mediocre UI.

## What is it?

Nine specialized skills: `emil-design-eng` (the primary animation/design skill), `animate` (proper curves/duration/properties), `review-animations` (strict review against established principles), `improve-animations` (audits a codebase for animation upgrades), `find-animation-opportunities` (where motion actually helps UX), `animation-vocabulary` (precise language for better AI output), `apple-design` (web-adapted principles from Apple's WWDC talks), `pick-ui-library` (recommends trusted libraries over generic picks), and `ask-sonner` (usage guide for the Sonner toast library).

## Why use it?

AI agents often pick the wrong easing function or an over-generic visual treatment, and those small choices compound into interfaces that feel off. These skills encode a working animation-engineer's judgment — grounded in Apple's own design talks and the author's experience building widely-used UI libraries (Sonner, Vaul) — so an agent applies that judgment consistently instead of guessing per session.

## Installation

```bash
npx skills@latest add emilkowalski/skills
```

## Basic Usage

Install the skills, then let Claude Code (or another supported agent) invoke the relevant one automatically during animation/design work — e.g. `animate` when adding a transition, `review-animations` when auditing existing motion, `ask-sonner` when integrating toast notifications.

## Key Features

- Nine focused skills covering animation authoring, review, auditing, and vocabulary
- `apple-design` skill translates WWDC design talks into web-applicable principles
- `pick-ui-library` steers toward trusted libraries instead of reinventing components
- `ask-sonner` gives direct guidance for the author's own Sonner toast library
- MIT licensed, 28k+ stars, 1.6k+ forks

## Top 5 Use Cases

1. Getting correct easing/duration choices on agent-generated animations
2. Auditing an existing codebase for animation improvements
3. Deciding where motion actually improves UX vs. where it's noise
4. Applying Apple-style design principles to a web interface
5. Integrating Sonner toasts with author-level guidance baked into the agent

## Competitors

- **[taste-skill](/docs/webdev/taste-skill)** — broader scope (layout, typography, spacing, motion) with tunable dials, vs. this project's narrower, deeper focus on animation specifically.
- **[impeccable](/docs/webdev/impeccable)** — command-driven full design-review system with deterministic anti-pattern detectors, covering more than animation alone.

## Pros

- Deep, narrow focus written by a practitioner known for shipping widely-used animation-heavy libraries
- Large, active community (28k+ stars)
- MIT licensed
- Simple one-command install via the `skills` CLI

## Cons

- Animation/motion-specific — doesn't cover general layout, typography, or color decisions
- `ask-sonner` skill is tied to one specific library
- Effectiveness depends on the host agent correctly triggering the right skill for the task

## Resources

- [GitHub Repository](https://github.com/emilkowalski/skills)
