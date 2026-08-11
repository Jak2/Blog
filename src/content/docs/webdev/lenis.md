---
title: Lenis
description: Lightweight smooth-scroll library that wraps native browser scroll
order: 1
---

# Lenis

**[darkroomengineering/lenis](https://github.com/darkroomengineering/lenis)**

## Overview

Lenis is a lightweight, dependency-free smooth-scroll library. Rather than replacing the browser's scroll behavior with a custom implementation, it wraps native scroll — so sticky positioning, anchor links, and accessibility features keep working the way users and screen readers expect.

## What is it?

A small JavaScript library (a few KB, zero dependencies) that intercepts scroll input and applies easing on top of native scroll, producing the smooth/inertial feel used across many agency-style sites. It supports vertical, horizontal, and nested scrolling, with official adapters for React, Vue, and Framer.

## Why use it?

Older smooth-scroll libraries (Locomotive Scroll and similar) tend to fully hijack scrolling, which breaks sticky elements, anchor links, and native accessibility behavior. Lenis's "runs on native scroll" approach avoids that tradeoff while still delivering the smooth feel, and it's small enough not to be a meaningful weight cost.

## Installation

```bash
npm i lenis
```

## Basic Usage

```javascript
import Lenis from 'lenis';

const lenis = new Lenis({ autoRaf: true });
lenis.on('scroll', (e) => console.log(e));
```

## Key Features

- A few KB, zero runtime dependencies
- Wraps native scroll instead of replacing it — accessibility and anchor links keep working
- Vertical, horizontal, and nested scroll support
- React, Vue, and Framer adapters
- Optional scroll-snapping plugin
- Tight sync with GSAP ScrollTrigger for scroll-driven animation

## Top 5 Use Cases

1. Adding an agency-style smooth scroll feel to a marketing/portfolio site
2. Driving scroll-linked animations in combination with GSAP ScrollTrigger
3. Parallax effects synced to actual scroll position
4. Smooth scrolling inside a React/Vue app without abandoning native scroll semantics
5. WebGL scenes (Three.js) that need to stay in sync with page scroll

## Competitors

- **Locomotive Scroll** — older, more established, but hijacks scroll more aggressively and has known accessibility tradeoffs Lenis was built to avoid.
- **Native CSS `scroll-behavior: smooth`** — zero-dependency baseline, but no easing control, no scroll-driven animation hooks.
- **[GSAP](/docs/webdev/gsap)'s ScrollTrigger alone** — handles scroll-triggered animation but not the smoothing itself; commonly paired with Lenis rather than competing with it.

## Pros

- Genuinely lightweight, zero dependencies
- Preserves native scroll behavior and accessibility
- Clean integration with GSAP
- Actively maintained, framework adapters included

## Cons

- Smooth scrolling by nature adds a layer of custom scroll handling — can introduce edge cases with certain browser extensions or assistive tech setups
- Requires JS to be enabled; no smooth scroll without it (same as any JS scroll library)
- Configuration/tuning needed to get easing feel right for a given site

## Resources

- [GitHub Repository](https://github.com/darkroomengineering/lenis)
