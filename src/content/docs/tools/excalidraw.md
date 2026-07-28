---
title: Excalidraw
description: Open-source virtual whiteboard for sketching hand-drawn style diagrams and wireframes
order: 1
---

# Excalidraw

**[excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)**

![Stars](https://img.shields.io/github/stars/excalidraw/excalidraw?style=flat-square) ![License](https://img.shields.io/github/license/excalidraw/excalidraw?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/excalidraw/excalidraw?style=flat-square)

## Overview

Excalidraw is an open-source virtual whiteboard for sketching diagrams, wireframes, and visual notes with a distinctive hand-drawn look. It ships as a hosted web app at excalidraw.com, an embeddable React/npm component, and a self-hostable Docker deployment. MIT licensed.

## What is it?

A canvas-based drawing tool built with React and TypeScript. Instead of clean vector shapes, everything renders with a sketchy, hand-drawn aesthetic (via the Rough.js library), which makes quick diagrams feel informal and low-pressure rather than "finished." Drawings can be exported as PNG, SVG, or the native `.excalidraw` JSON format, and the whole app works offline as a PWA.

## Why use it?

- Zero setup — open excalidraw.com and start drawing, no account required.
- Real-time multiplayer collaboration with end-to-end encryption, useful for remote whiteboarding sessions.
- Embeddable in your own product via the `@excalidraw/excalidraw` npm package (used by Obsidian, Notion, and others).
- Self-hostable when you need data control or an offline/internal deployment.
- Lightweight compared to full diagramming suites — good for fast, disposable sketches rather than polished diagrams.

## Installation

**Use the hosted app:** just visit excalidraw.com — nothing to install.

**Embed as a React component:**
```bash
npm install react react-dom @excalidraw/excalidraw
```
```jsx
import { Excalidraw } from "@excalidraw/excalidraw";

function App() {
  return <Excalidraw />;
}
```

**Self-host with Docker:**
```bash
git clone https://github.com/excalidraw/excalidraw.git
cd excalidraw
docker-compose up --build -d
```
The repo also includes a plain `Dockerfile` if you'd rather build/run without compose. Once running, the app is served locally and behaves the same as excalidraw.com.

**Local dev build (Yarn):**
```bash
git clone https://github.com/excalidraw/excalidraw.git
cd excalidraw
yarn
yarn start
```

## Basic Usage

- Pick a tool (rectangle, ellipse, arrow, line, free-draw, text) from the left toolbar or via keyboard shortcuts (`r`, `o`, `a`, `l`, `x`, `t`).
- Draw on the infinite canvas; drag to pan, scroll/pinch to zoom.
- Select elements to change stroke color, fill style, sloppiness, and stroke width.
- `Ctrl/Cmd+Z` to undo, `Shift+Ctrl/Cmd+Z` to redo.
- Export via the menu: PNG/SVG image, copy to clipboard, or save as `.excalidraw` JSON for later editing.
- Share a live collaborative session by clicking "Share" — generates an end-to-end encrypted room link.

## Key Features

- Hand-drawn sketch rendering style (via Rough.js)
- Real-time multiplayer collaboration, end-to-end encrypted
- Shape library system (import/share reusable shape sets)
- Image embedding directly on the canvas
- Multiple export formats: PNG, SVG, clipboard, `.excalidraw` JSON
- Dark mode and customizable canvas background
- Undo/redo, zoom, and infinite panning
- Offline-capable PWA
- Multi-language/localization support
- Embeddable React component for building it into other products

## Top 5 Use Cases

- Quick system/architecture diagrams during design discussions
- Remote whiteboarding in place of a physical whiteboard for distributed teams
- Wireframing UI mockups before committing to a design tool
- Embedding a lightweight drawing surface inside another app (e.g., note-taking apps like Obsidian)
- Teaching/explaining concepts visually in real time during a call

## Competitors

- **tldraw** — similar open-source whiteboard, more polished/modern default look
- **Miro** — commercial, feature-heavy collaborative whiteboard SaaS
- **draw.io / diagrams.net** — free diagramming tool, more structured/technical style than hand-drawn
- **Figma / FigJam** — commercial design and whiteboarding suite
- **Whimsical** — commercial flowchart/wireframe/whiteboard tool

## Pros

- Free, MIT licensed, fully open source
- No account needed for basic hosted use
- Fast and lightweight — loads instantly, minimal learning curve
- Easy to self-host via Docker
- Embeddable in other apps via npm package
- Active project with broad third-party integration (Notion, Obsidian, CodeSandbox)

## Cons

- Hand-drawn style isn't appropriate for formal/polished documentation
- Fewer structured diagramming features (no auto-layout, limited flowchart-specific tooling) compared to draw.io
- Real-time collaboration requires either trusting excalidraw.com's infra or running your own backend for self-hosted collab
- Not built for large, complex technical diagrams — better suited to quick sketches

## Resources

- GitHub: [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)
- Hosted app: [excalidraw.com](https://excalidraw.com)
- npm package: [@excalidraw/excalidraw](https://www.npmjs.com/package/@excalidraw/excalidraw)
