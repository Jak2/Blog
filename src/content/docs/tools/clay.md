---
title: Clay
description: A high-performance, dependency-free 2D UI layout library for C, with a React-like declarative API
order: 1
---

# Clay

**[nicbarker/clay](https://github.com/nicbarker/clay)**

## Overview

Clay is a single-header C library for laying out 2D user interfaces — a flexbox-like layout engine with a declarative, React-like macro-based API, designed for microsecond-level performance and use in game engines, embedded UIs, or any renderer-agnostic context.

## What is it?

A ~4.8k line, zero-dependency `clay.h` header providing a full layout system: flexbox-style sizing, text wrapping, scrolling containers, aspect-ratio scaling, and a built-in animation API for transitions. It doesn't render anything itself — it outputs a sorted list of render commands your own renderer (any 3D/2D engine) consumes. It compiles to a 15kb WASM build for browser use, and has official Odin and Rust bindings plus community Go ports.

## Why use it?

Native/game UI layout is traditionally either hand-rolled pixel math or a heavy dependency (a full browser engine, Qt, etc.). Clay gives web-developer-familiar flexbox semantics and declarative syntax in plain C with essentially no runtime cost or dependency footprint, so it drops into any renderer.

## Installation

1. Download/clone `clay.h`.
2. In exactly one source file, `#define CLAY_IMPLEMENTATION` before including it.
3. Provide a text-measurement callback and a memory arena.
4. Call the documented initialization functions in order before your layout/render loop.

## Basic Usage

1. Initialize Clay with a static memory arena sized to your expected element count.
2. Each frame: set layout dimensions and update pointer/input state.
3. Declare your UI tree using `CLAY()` macros (nesting like JSX/React components).
4. Wrap repeated UI in ordinary C functions for reusable "components."
5. Retrieve the sorted render command list and feed it to your own renderer.

## Key Features

- Microsecond-scale layout performance
- Flexbox-like model: text wrap, scrolling, aspect-ratio scaling
- Single header, ~4.8k lines, zero dependencies
- Compiles to a 15kb WASM build for the browser
- Static arena allocation — no dynamic allocation during layout
- Renderer-agnostic output (sorted render primitives)
- Built-in animation/transition API
- Browser-devtools-style debug inspector
- Official Odin and Rust bindings, community Go ports

## Top 5 Use Cases

- In-game UI (HUDs, menus, inventory screens) in custom game engines
- Embedded/immediate-mode UIs where a full browser/Qt stack is too heavy
- Tooling UIs for engine editors that need to stay renderer-agnostic
- WASM-based UI layout in performance-sensitive web apps
- Cross-language projects needing one shared C layout core with Rust/Odin/Go bindings

## Competitors

- **Dear ImGui** — the dominant immediate-mode C++ UI library for tools/engines; more mature ecosystem but heavier and C++-first, whereas Clay is a minimal C header with a flexbox-style model.
- **Yoga (Facebook)** — a standalone flexbox layout engine (used by React Native); Clay is comparable in scope but smaller, single-header, and includes more built-in extras like animation and a debug inspector.
- **Nuklear** — another single-header immediate-mode GUI library for C; Nuklear bundles widget rendering, while Clay deliberately stays layout-only and renderer-agnostic.

## Pros

- Extremely lightweight: one header, no dependencies
- Fast enough for real-time game/engine UI (microsecond layout)
- Familiar flexbox/React-like mental model lowers the learning curve
- Renderer-agnostic — works with any engine or graphics backend
- Multi-language bindings (Odin, Rust, community Go)

## Cons

- C API means more manual setup (arenas, callbacks) than higher-level UI frameworks
- Layout-only — you must supply your own renderer and widget styling/behavior
- Younger project than ImGui/Yoga, so fewer battle-tested integrations and examples
- Static arena sizing requires knowing/estimating element counts up front

## Resources

- [GitHub Repository](https://github.com/nicbarker/clay)
