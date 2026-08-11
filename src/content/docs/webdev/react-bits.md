---
title: React Bits
description: Large library of copy-paste-ready animated React components
order: 1
---

# React Bits

**[DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)**

## Overview

React Bits is a large, actively growing library of animated React components — text effects, animated backgrounds, and UI elements — built to be copy-pasted or CLI-installed rather than pulled in as a monolithic dependency.

## What is it?

165+ components, each offered in multiple variants (JS/TS, CSS/Tailwind), fully customizable via props. Rather than importing a package, most components are meant to be added directly into your codebase (shadcn-style), so you own and can modify the code instead of depending on an external library's API surface.

## Why use it?

Hand-building striking scroll/text/background animations from scratch is slow. React Bits gives you a large catalog of already-polished effects to drop in, with the shadcn/jsrepo install flow meaning you get the actual component source in your repo — not a black-box dependency — which makes customization straightforward.

## Installation

```bash
npx shadcn@latest add @react-bits/BlurText-TS-TW
```

Or copy a component's code directly from its page on the React Bits site — no install step required.

## Basic Usage

```jsx
import BlurText from "./components/BlurText";

<BlurText text="Hello, world!" />
```

Each component ships with its own props for customizing timing, easing, and appearance.

## Key Features

- 165+ animated components across text, background, and UI categories
- JS/TS × CSS/Tailwind variant matrix per component
- shadcn CLI and jsrepo install flow — code lands in your repo, not `node_modules`
- Free creative tools (Background Studio, Shape Magic) for generating custom variants
- Official ports for Vue (vue-bits.dev) and Svelte (sveltebits.xyz)

## Top 5 Use Cases

1. Adding polished hero text/background animation to a landing page fast
2. Building a portfolio site with a large, varied animation vocabulary without custom-coding each effect
3. Prototyping animated UI ideas before committing to a custom implementation
4. Extending a shadcn/ui-based design system with animated equivalents
5. Cross-framework projects that want the same component vocabulary in Vue or Svelte

## Competitors

- **[shadcn/ui](/docs/webdev/shadcn-ui)** — same install philosophy (copy code into your repo), but focused on structural/functional components rather than animation-first ones; React Bits complements it more than replaces it.
- **Framer Motion / React Spring** — animation *libraries* you compose yourself, versus React Bits's pre-built, ready-to-use components; more control, more setup.
- **[GSAP](/docs/webdev/gsap)** — several React Bits components use GSAP under the hood for the actual animation engine; GSAP is lower-level, React Bits is the packaged result.
- **[Uiverse](/docs/webdev/uiverse)** — broader, framework-agnostic, community-submitted CSS elements vs. React Bits's curated, React-specific animated components.

## Pros

- Huge, varied catalog — fast to find something close to what you need
- Code-ownership install model avoids black-box dependency risk
- Multiple variant options (JS/TS, CSS/Tailwind) fit different stacks
- Free for personal and commercial use

## Cons

- MIT + Commons Clause license — read the Commons Clause terms if reselling the components themselves as a product
- Component quality/complexity varies since it's a large, community-fed catalog
- Copy-paste model means updates to a component don't propagate automatically — you own the fork

## Resources

- [GitHub Repository](https://github.com/DavidHDev/react-bits)
