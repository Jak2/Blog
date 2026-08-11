---
title: Anime.js
description: Lightweight JavaScript animation library for CSS, SVG, DOM, and JS object properties
order: 1
---

# Anime.js

**[juliangarnier/anime](https://github.com/juliangarnier/anime)**

## Overview

Anime.js is a lightweight JavaScript animation library with a simple, unified API for animating CSS properties, SVG, DOM attributes, and plain JavaScript objects.

## What is it?

A small (no dependency) animation engine that works across CSS transforms/properties, SVG path/attribute animation, and arbitrary JS object tweening under one API, with built-in staggering, easing functions, and looping/alternating playback.

## Why use it?

Most animation needs don't require a full timeline/scroll-animation platform like GSAP — Anime.js covers CSS/SVG/DOM/object animation with a much smaller footprint and simpler API, making it a good fit when you want solid animation capability without the larger dependency and plugin ecosystem.

## Installation

```bash
npm install animejs
```

```js
import { animate, stagger } from 'animejs';
```

Also ships as ESM, UMD, CJS, and IIFE builds for non-bundler usage.

## Basic Usage

```js
import { animate } from 'animejs';

animate('.box', {
  translateX: 250,
  rotate: '1turn',
  duration: 800,
  easing: 'easeInOutQuint',
});
```

## Key Features

- Unified API across CSS, SVG, DOM attributes, and JS objects
- Staggered animations with customizable delays
- Rich easing function set
- Looping and alternating playback support
- Multiple build formats (ESM, UMD, CJS, IIFE) for any bundler or none

## Top 5 Use Cases

1. Coordinated multi-element animations (staggered lists, grids)
2. SVG path/shape animation without a separate SVG-specific library
3. Lightweight page/UI motion where a full animation platform (GSAP) is overkill
4. Animating arbitrary JS object values (e.g. driving a canvas or WebGL scene)
5. Simple, dependency-light micro-interactions on marketing/landing pages

## Competitors

- **[GSAP](/docs/webdev/gsap)** — far larger feature set (ScrollTrigger, morphing, plugin ecosystem), heavier; Anime.js is the lighter-weight alternative for simpler needs.
- **[transitions.dev](/docs/webdev/transitions-dev)** — built on the native View Transitions API for page/state transitions specifically, rather than general-purpose property animation.
- Native CSS animations/transitions — zero dependency, but no JS-driven sequencing, staggering, or SVG path animation.

## Pros

- MIT licensed, large and mature community (72k+ stars)
- Small footprint compared to full animation platforms
- One API covers CSS, SVG, DOM, and JS object animation
- Multiple distribution formats for flexible integration

## Cons

- No scroll-linked animation or plugin ecosystem comparable to GSAP's ScrollTrigger/MorphSVG
- Less suited to very complex, long timeline sequencing than a dedicated platform
- v4's ES module-first API is a breaking change from earlier versions

## Resources

- [GitHub Repository](https://github.com/juliangarnier/anime)
- [animejs.com](https://animejs.com/)
