---
title: transitions.dev
description: CSS View Transitions API helper library for smooth page/state transitions
order: 1
---

# transitions.dev

**[Jakubantalik/transitions.dev](https://github.com/Jakubantalik/transitions.dev)**

## Overview

transitions.dev is a lightweight helper library around the browser's native View Transitions API, making it easier to build smooth, animated transitions between page states or route changes without hand-rolling `document.startViewTransition` boilerplate and CSS.

## What is it?

A thin wrapper/utility layer over the native CSS View Transitions API — providing helper functions, presets, and framework-friendly hooks so a project can add polished transition effects (fades, morphs, shared-element transitions) using the browser's built-in mechanism instead of a heavier JS animation library.

## Why use it?

The native View Transitions API is powerful but low-level and verbose to wire up correctly (naming transition groups, scoping CSS, handling browser fallbacks). transitions.dev packages the common patterns so you get native-performance transitions (no JS-driven layout thrashing) with far less setup code than either raw API usage or a full animation library like Framer Motion.

## Installation

```bash
npm install transitions.dev
```

## Basic Usage

```ts
import { transition } from "transitions.dev";

transition(() => {
  document.querySelector("#content").innerHTML = newContent;
});
```

Wraps a DOM update in a native view transition, applying the library's default (or configured) animation automatically.

## Key Features

- Thin wrapper over the native View Transitions API — no virtual DOM or JS-driven animation engine
- Preset transition effects (fade, slide, morph)
- Small footprint compared to full animation libraries
- Works with any framework since it operates on real DOM updates
- Graceful degradation where the View Transitions API isn't supported

## Top 5 Use Cases

1. Smooth route transitions in an SPA without adopting a full animation library
2. Shared-element transitions (e.g. thumbnail to full image) using native browser support
3. Adding polish to state changes (tab switches, modal open/close) with minimal code
4. Reducing animation-library bundle size by leaning on browser-native transitions
5. Prototyping transition effects before committing to a heavier animation stack

## Competitors

- **[GSAP](/docs/webdev/gsap)** — full-featured JS animation engine; far more control and browser-compatibility, but heavier and JS-driven rather than native.
- **Framer Motion** — React-specific animation library with its own transition/layout system, not built on the native View Transitions API.
- Raw `document.startViewTransition` — no dependency at all, but requires hand-writing all the CSS/JS boilerplate this library abstracts.

## Pros

- Minimal footprint — thin layer over a native browser API
- Native-performance transitions (GPU-composited, no JS layout thrashing)
- Framework-agnostic — works with any DOM update
- Simple API for common transition patterns

## Cons

- Inherits View Transitions API browser support limits (not supported in all browsers, notably older Safari/Firefox)
- Less control/feature depth than a full animation library like GSAP or Framer Motion
- Newer, smaller project — limited track record

## Resources

- [GitHub Repository](https://github.com/Jakubantalik/transitions.dev)
