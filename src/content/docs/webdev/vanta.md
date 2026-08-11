---
title: Vanta
description: Drop-in animated 3D/generative backgrounds rendered via three.js or p5.js
order: 1
---

# Vanta

**[tengbao/vanta](https://github.com/tengbao/vanta)**

## Overview

Vanta adds animated, interactive 3D backgrounds to a webpage with just a few lines of code. It renders through either three.js (WebGL) or p5.js, giving a set of ready-made generative effects (waves, clouds, birds, net, fog, and more) instead of requiring custom shader/3D work.

## What is it?

A thin layer over three.js/p5.js exposing pre-built visual effects as simple JS functions. Point an effect at a DOM element, pass a few config parameters (color, speed, mouse-reactivity), and it renders an animated, interactive background scene in that element — no shader code required.

## Why use it?

Static hero images/videos are cheap but flat. Vanta gives an interactive, generative alternative — mouse/touch-reactive 3D backgrounds — without needing three.js/shader expertise, at the cost of a single library rather than hand-building a WebGL scene.

## Installation

```bash
npm i vanta three
```

## Basic Usage

```javascript
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

const effect = WAVES({
  el: "#hero",
  THREE,
  color: 0x1a1a2e,
  waveSpeed: 0.8,
});
```

React, Vue, and Angular integration examples are provided in the project's documentation.

## Key Features

- Multiple pre-built generative effects (waves, net, birds, fog, clouds, and more), browsable at vantajs.com
- Renders via three.js (WebGL) or p5.js depending on effect
- Mouse/touch-reactive by default
- Fully customizable via parameters (color, speed, scale)
- Framework integration examples for React/Vue/Angular

## Top 5 Use Cases

1. Interactive hero-section background for a landing page
2. Generative art backgrounds for portfolio or agency sites
3. Adding a distinctive, non-static visual identity without custom shader work
4. Mouse-reactive ambient backgrounds for product pages
5. Quick prototyping of a "digital art" aesthetic before investing in custom WebGL

## Competitors

- Hand-rolled three.js/shader scenes — full control, much more setup and expertise required.
- **[GSAP](/docs/webdev/gsap)** — animates DOM/SVG/canvas properties; not a generative-background renderer, but can be combined with Vanta for foreground element animation.
- **[Shader Gradient](/docs/webdev/shadergradient)** — also a drop-in WebGL background, but focused on animated GLSL gradients rather than Vanta's scene effects (waves, net, birds); pick based on gradient vs. scene-effect look.
- Static video/image backgrounds — cheaper on bundle size and simpler, but not interactive or generative.

## Pros

- Fast to add a distinctive, interactive background with minimal code
- Multiple effects to choose from out of the box
- MIT licensed, straightforward customization
- Good framework integration documentation

## Cons

- ~120kb minified+gzipped since it pulls in a full 3D/canvas renderer — meaningfully heavier than Lenis or GSAP alone
- WebGL-based effects can be demanding on lower-end devices/mobile battery
- Limited to the effect set Vanta ships — deeper customization requires dropping to three.js directly

## Resources

- [GitHub Repository](https://github.com/tengbao/vanta)
