---
title: mapcn
description: shadcn-style copy-paste map components built on MapLibre GL
order: 1
---

# mapcn

**[AnmolSaini16/mapcn](https://github.com/AnmolSaini16/mapcn)**

## Overview

mapcn brings the shadcn/ui "copy-paste, own the code" model to maps — a set of themeable, accessible map components built on MapLibre GL that you install directly into your project's source tree instead of pulling in as an opaque npm dependency.

## What is it?

A collection of React map components (markers, popups, controls, styled base layers) distributed via a CLI that copies component source into your codebase, matching the shadcn/ui pattern. Styling is Tailwind-based and themeable to match the rest of a shadcn-based design system.

## Why use it?

Most map libraries (react-map-gl, Mapbox GL React wrappers) hand you a map instance and leave all UI chrome, styling, and dark-mode theming to you. mapcn ships pre-styled, accessible components that already look native next to shadcn/ui, and because the code lands in your repo, you can edit it freely instead of fighting a black-box package.

## Installation

```bash
npx shadcn@latest add https://mapcn.dev/r/map.json
```

Requires an existing shadcn/ui + Tailwind setup.

## Basic Usage

```tsx
import { Map, Marker, Popup } from "@/components/ui/map";

<Map center={[-122.4, 37.8]} zoom={12}>
  <Marker position={[-122.4, 37.8]}>
    <Popup>San Francisco</Popup>
  </Marker>
</Map>
```

## Key Features

- Copy-paste distribution via shadcn CLI — full source ownership, no opaque dependency
- Built on MapLibre GL (open-source, no Mapbox API key required)
- Tailwind-themeable, matches shadcn/ui design tokens out of the box
- Accessible markers/popups/controls
- Dark mode support matching the rest of a shadcn app

## Top 5 Use Cases

1. Adding a themed map to a shadcn/ui dashboard or admin panel
2. Store-locator or location-picker UI that needs to match existing design tokens
3. Avoiding Mapbox API key/billing lock-in via MapLibre
4. Prototyping map UI you intend to heavily customize afterward
5. Replacing a bespoke Mapbox React wrapper with maintainable, owned component code

## Competitors

- **react-map-gl** — the standard Mapbox/MapLibre React wrapper; unstyled primitives, no pre-built UI chrome or shadcn theming.
- **Mapbox GL JS directly** — full control, but requires an API key and all UI built from scratch.
- **[shadcn/ui](/docs/webdev/shadcn-ui)** — the general-purpose component system mapcn extends the same CLI distribution model from, scoped down to maps specifically.

## Pros

- Full source ownership — no version-lock or black-box upgrades
- Matches shadcn/ui aesthetic without custom theming work
- MapLibre-based — no Mapbox API key requirement
- Accessible by default

## Cons

- Copy-paste model means no centralized bugfix/update stream — you own maintenance
- Tied to Tailwind + shadcn/ui conventions; less useful outside that stack
- Newer project — smaller community than react-map-gl

## Resources

- [GitHub Repository](https://github.com/AnmolSaini16/mapcn)
