---
title: GSAP
description: Framework-agnostic JavaScript animation engine used across millions of sites
order: 1
---

# GSAP

**[greensock/GSAP](https://github.com/greensock/GSAP)**

## Overview

GSAP (GreenSock Animation Platform) is a framework-agnostic JavaScript animation engine for CSS, SVG, canvas, WebGL, and framework-rendered DOM (React, Vue). It's the low-level workhorse behind a large share of the web's high-end animation work — reportedly running on 12M+ sites.

## What is it?

A high-precision property-manipulation engine: it updates any numeric/color/transform value over time with tight sequencing control, working around cross-browser inconsistencies so animations behave consistently everywhere. The core ships lean; optional plugins (ScrollTrigger for scroll-driven animation, MorphSVG, and others) are registered as needed.

## Why use it?

Where CSS animations and transitions hit their ceiling — complex sequencing, precise timing control, scroll-linked triggers, SVG morphing — GSAP handles it with a consistent API and far more control than native browser primitives, at meaningfully better performance than older approaches (its own docs claim up to 20x faster property updates than jQuery-era techniques).

## Installation

```bash
npm install gsap
```

Also available via CDN or UMD build for non-bundler setups.

## Basic Usage

```javascript
import gsap from "gsap";

gsap.to(".box", { x: 300, duration: 1, ease: "power2.out" });
```

Plugins like ScrollTrigger are imported and registered separately:

```javascript
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

## Key Features

- Animates CSS, SVG, canvas, WebGL, colors, and framework-rendered DOM
- Precise sequencing via timelines
- Zero runtime dependencies
- Plugin ecosystem: ScrollTrigger, MorphSVG, Draggable, and more
- Consistent cross-browser behavior GSAP handles internally

## Top 5 Use Cases

1. Scroll-driven storytelling/animation sequences (via ScrollTrigger)
2. Complex multi-element animation timelines that CSS transitions can't express
3. SVG shape morphing and icon animation
4. Synchronizing animation with smooth-scroll libraries like [Lenis](/docs/webdev/lenis)
5. Powering pre-built component animation under the hood (as several [React Bits](/docs/webdev/react-bits) components do)

## Competitors

- **Framer Motion** — React-specific, more idiomatic for React component animation, less powerful for arbitrary timeline sequencing outside React.
- **[Anime.js](/docs/webdev/anime-js)** — lighter-weight, simpler API, smaller feature set than GSAP's full plugin ecosystem.
- **Native CSS animations/transitions** — zero dependency, but no fine-grained sequencing, scroll-linking, or morphing without significant extra JS.
- **[transitions.dev](/docs/webdev/transitions-dev)** — thin wrapper over the native View Transitions API, much lighter but far less capable than GSAP's full timeline/plugin system.

## Pros

- Extremely mature, battle-tested across huge scale (12M+ sites)
- Framework-agnostic — not locked into React or any one stack
- Powerful plugin ecosystem for scroll, morphing, dragging
- Strong cross-browser consistency handled internally

## Cons

- Steeper learning curve than CSS transitions or simpler libraries
- License is GreenSock's own "no charge" standard license, not a standard OSI license — worth reading before certain commercial redistribution scenarios
- Can be overkill for simple hover/fade effects that CSS alone handles fine

## Resources

- [GitHub Repository](https://github.com/greensock/GSAP)
