---
title: shadcn/ui
description: Copy-paste, accessible React components built on Radix UI and Tailwind CSS
order: 1
---

# shadcn/ui

**[shadcn-ui/ui](https://github.com/shadcn-ui/ui)**

## Overview

shadcn/ui is a set of beautifully designed, accessible React components you copy directly into your codebase rather than install as an opaque npm dependency — a foundation for building your own component library instead of adopting a pre-built one wholesale.

## What is it?

A component distribution model (not a traditional npm package): a CLI adds component source files into your project, built on Radix UI primitives for accessibility/behavior and Tailwind CSS for styling. Because the code lives in your repo, you own and can freely modify every component.

## Why use it?

Traditional component libraries (MUI, Chakra) ship as versioned dependencies — customizing deeply means fighting the library's theming API or forking it. shadcn/ui sidesteps that by giving you the actual component source, pre-built on solid accessibility primitives (Radix) and a styling system you already control (Tailwind), so customization is just editing code.

## Installation

```bash
npx shadcn@latest init
npx shadcn@latest add button
```

## Basic Usage

```tsx
import { Button } from "@/components/ui/button";

<Button variant="outline">Click me</Button>
```

Each `add` command copies the component's source into your project — edit freely afterward.

## Key Features

- Copy-paste distribution — full source ownership, no black-box dependency
- Built on Radix UI for accessible, unstyled behavior primitives
- Tailwind CSS styling, fully themeable via design tokens
- CLI-driven install per component, not an all-or-nothing bundle
- Large official component set covering most common UI patterns
- Framework support beyond plain React (Next.js, Vite, and others)

## Top 5 Use Cases

1. Building a custom design system without starting from zero
2. Admin dashboards and internal tools needing accessible, consistent components fast
3. Projects that need deep component customization without fighting a library's API
4. Teams standardizing on Tailwind that want accessible primitives underneath
5. Foundation layer for other copy-paste component sets (e.g. [mapcn](/docs/webdev/mapcn), [React Bits](/docs/webdev/react-bits)) that build on the same CLI distribution model

## Competitors

- **[mapcn](/docs/webdev/mapcn)** — uses the same shadcn CLI distribution model, scoped specifically to map components rather than general UI.
- **[Uiverse](/docs/webdev/uiverse)** — free community-submitted individual elements, framework-agnostic, vs. shadcn/ui's structured, accessible, React-specific component system.
- MUI/Chakra UI — traditional installed component libraries with less deep customization but faster all-in-one setup.

## Pros

- Full source ownership — no version lock-in, no black-box upgrades
- Strong accessibility foundation via Radix UI
- Very large community and ecosystem (121k+ stars) — most gaps already have a community-built component
- Tailwind-based theming integrates cleanly with an existing Tailwind project

## Cons

- Copy-paste model means no centralized dependency updates — you own maintenance/bugfixes per component
- Tied to React + Tailwind conventions; less useful outside that stack
- Larger initial footprint than a single lightweight component if you only need one thing

## Resources

- [GitHub Repository](https://github.com/shadcn-ui/ui)
- [ui.shadcn.com](https://ui.shadcn.com/)
