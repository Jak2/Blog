---
title: God's Eye View
description: Interactive 3D globe visualizing real-time flights, ships, satellites, and other live geospatial data, with voice control
order: 1
---

# God's Eye View

**[bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view)**

![Stars](https://img.shields.io/github/stars/bilawalsidhu/gods-eye-view?style=flat-square) ![License](https://img.shields.io/github/license/bilawalsidhu/gods-eye-view?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/bilawalsidhu/gods-eye-view?style=flat-square)

## Overview

God's Eye View is an interactive 3D globe web app visualizing real-time geospatial data — live aircraft, ships, satellites, earthquakes, traffic, and public cameras — navigable from orbital altitude down to street level, with voice control powered by OpenAI's Realtime API.

## What is it?

A photorealistic 3D globe built on Google Maps' Photorealistic 3D Tiles and CesiumJS, rendering 13 live data layers (flights, vessels, satellites, wildfires, CCTV feeds, radio stations, and more). It offers voice control with 28 integrated navigation/annotation tools, multiple sensor view modes (night vision, thermal/FLIR, CRT, noir), a cockpit mode for riding along with tracked aircraft, 3D aircraft models that scale in detail on approach, persistent annotations (routes, measurements, boundaries), and a scene director for recording cinematic camera tours.

## Why use it?

Live geospatial data (flight trackers, ship trackers, seismic feeds) usually lives in separate single-purpose dashboards. God's Eye View unifies 13 of those feeds into one explorable 3D environment with voice-driven navigation, turning scattered OSINT-style data sources into a single interactive view rather than juggling multiple tabs.

## Installation

```bash
cp .env.example .env
# add GOOGLE_MAPS_API_KEY to .env
npm install
npm run dev -- --host localhost --port 4173
```

Requires Node.js 24.14+ or 26.x.

## Basic Usage

Configure API keys (Google Maps required; others for specific layers), launch the dev server, and navigate the globe by mouse or voice command — toggle data layers, switch sensor modes, or enter cockpit mode to follow a tracked aircraft.

## Key Features

- Photorealistic 3D globe via Google Maps 3D Tiles + CesiumJS
- 13 live data layers: flights, vessels, satellites, fires, CCTV, radio, more
- Voice control with 28 integrated tools (OpenAI Realtime API)
- Sensor modes: night vision, thermal/FLIR, CRT, noir
- Cockpit mode with terrain-following aircraft camera
- Persistent annotations: routes, measurements, boundary polygons
- Scene director for recording cinematic camera tours

## Top 5 Use Cases

1. Real-time geospatial intelligence exploration and OSINT research
2. Educational visualization of global aviation/maritime/satellite infrastructure
3. Cinematic Earth-observation capture via the scene director
4. Flight/maritime tracking demos with a unified 3D view
5. Voice-driven navigation experiments using the Realtime API integration

## Competitors

- FlightRadar24/MarineTraffic — single-domain live trackers, vs. this project's unified multi-layer 3D globe.
- Cesium ion apps (generic) — raw CesiumJS gives full control but no pre-built live data layers or voice control out of the box.

## Pros

- MIT licensed, active community (12.3k+ stars, 2.5k+ forks)
- Unifies many live data feeds into one explorable interface
- Voice-driven navigation is a distinctive interaction model
- Explicit responsible-data stance — avoids facial recognition/named-person tracking

## Cons

- Requires multiple third-party API keys (Google Maps, OpenSky, AISStream, NASA FIRMS, TomTom, OpenAI) to unlock full functionality
- Live data quality/coverage depends entirely on the underlying free public feeds
- Photorealistic 3D tiles and voice API usage can incur real API costs at scale

## Resources

- [GitHub Repository](https://github.com/bilawalsidhu/gods-eye-view)
