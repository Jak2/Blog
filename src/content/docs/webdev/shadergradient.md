---
title: Shader Gradient
description: Customizable 3D animated GLSL gradients for React, Framer, and Figma
order: 1
---

# Shader Gradient

**[ruucm/shadergradient](https://github.com/ruucm/shadergradient)**

## Overview

Shader Gradient renders customizable, animated 3D gradients using GLSL shaders, exposed as a React component (with Framer and Figma variants too). It's built for the moving-gradient hero/background look without hand-writing shader code.

## What is it?

A React Three Fiber-based renderer: a `ShaderGradientCanvas` wraps a `ShaderGradient` component, and props (or a URL query string) control mesh type (plane, sphere, waterPlane), colors, animation speed, camera position, and lighting. The v2 core is intentionally lean — just the renderer — with UI controls split into a separate package.

## Why use it?

Flat CSS gradients are cheap but static; hand-writing GLSL shaders for a moving gradient effect requires real shader/WebGL expertise. Shader Gradient packages that as configurable React props, and its URL-query-string config support means gradient presets can be shared/tweaked without touching code.

## Installation

```bash
npm i @shadergradient/react @react-three/fiber three three-stdlib camera-controls
```

## Basic Usage

```jsx
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

<ShaderGradientCanvas>
  <ShaderGradient type="waterPlane" color1="#ff5005" animate="on" />
</ShaderGradientCanvas>
```

Configurations can also be loaded directly from a URL query string.

## Key Features

- GLSL shader-based 3D gradients, not flat CSS gradients
- Configurable mesh type: plane, sphere, waterPlane
- Camera position, lighting, and color control via props
- URL-string config loading and camera update callbacks
- Lean v2 core; separate package for UI controls
- Framer and Figma integrations alongside the React package

## Top 5 Use Cases

1. Animated hero/background gradient for a landing page
2. Design-tool prototyping of gradient looks in Figma before shipping to React
3. Framer sites wanting a shader-based moving gradient without custom code
4. Product marketing pages wanting a distinctive, non-flat gradient treatment
5. Sharing/tweaking gradient presets via URL query string across a team

## Competitors

- **[Vanta](/docs/webdev/vanta)** — also a drop-in generative WebGL background, but effect-scene-focused (waves, net, birds) rather than gradient-focused; pick based on whether you want a gradient look or a scene effect.
- Flat/CSS gradients — zero dependency, static, no animation or 3D depth.
- Hand-rolled Three.js/GLSL shaders — full control, much more setup than a packaged component.

## Pros

- No shader-writing expertise required to get a shader-quality gradient
- Cross-tool support (React, Framer, Figma)
- Lean core package in v2
- Shareable config via URL string

## Cons

- Pulls in React Three Fiber + three.js — meaningful bundle weight for a background effect
- Smaller project (2.1k stars) than Vanta or GSAP — less community troubleshooting content
- GPU/WebGL rendering cost on lower-end devices

## Resources

- [GitHub Repository](https://github.com/ruucm/shadergradient)
