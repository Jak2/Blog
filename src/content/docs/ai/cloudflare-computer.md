---
title: Cloudflare Computer
description: SQLite-backed virtual filesystem in a Durable Object, for agent code execution across pluggable backends
order: 1
---

# Cloudflare Computer

**[cloudflare/computer](https://github.com/cloudflare/computer)**

## Overview

Cloudflare Computer is a virtual filesystem hosted in a Durable Object, with SQLite as the authoritative state store. It exposes a single API surface for agents to read/write files and execute code, backed by three pluggable execution environments.

## What is it?

A filesystem + execution runtime for agentic workloads on Cloudflare's edge. Three backends plug into the same API: **Container** (a FUSE-mounted sandbox for full binaries/environments), **Isolate Shell** (a `bash`-like shell running inside a Worker), and **Isolate JavaScript** (running ECMAScript modules directly). All three share the same durable, SQLite-backed filesystem, so state persists and stays consistent regardless of which backend executed a given operation.

## Why use it?

Agents that need to run code or manipulate files typically need to choose between heavyweight containers (slow to spin up) or restrictive sandboxes (limited capability). Computer gives one filesystem abstraction with lazy backend connection — pay for a full container only when a task actually needs one, fall back to a lighter Worker-based shell or JS isolate otherwise — with SQLite giving it durable, authoritative state instead of ephemeral scratch space.

## Installation

```bash
npm install @cloudflare/computer
```

Preview status — expect breaking API changes; not for production use per the project's own README.

## Basic Usage

```ts
import { Computer } from "@cloudflare/computer";

const computer = new Computer(/* Durable Object binding */);
await computer.fs.writeFile("/workspace/hello.txt", "hi");
const result = await computer.exec("isolate-shell", "cat /workspace/hello.txt");
```

See the repo's worked examples for filesystem and runtime usage patterns.

## Key Features

- SQLite-backed virtual filesystem as the single source of truth
- Three pluggable execution backends: Container (FUSE), Isolate Shell, Isolate JavaScript
- Lazy backend connection — no cost until a backend is actually used
- Durable relative imports and workspace-scoped file operations
- Benchmarked competitive on metadata-heavy filesystem operations vs. traditional disk I/O

## Top 5 Use Cases

1. Running agent-generated code against a durable, versionable filesystem on the edge
2. Prototyping multi-backend execution (lightweight shell vs. full container) without switching APIs
3. Building coding-agent sandboxes that need to persist state across sessions
4. Experimenting with edge-native code execution for agent tool-calling
5. Research/prototype work exploring Durable Object-based compute patterns

## Competitors

- Traditional containerized sandboxes (e.g. gVisor/Firecracker-based agent sandboxes, Daytona, E2B) — heavier-weight but more production-proven.
- Serverless execution platforms (AWS Lambda, Cloudflare Workers directly) — general-purpose compute without the unified filesystem/backend abstraction Computer adds.

## Pros

- Unified API across radically different execution backends
- Durable, authoritative state via SQLite instead of ephemeral scratch disks
- Cloudflare edge distribution — low latency, no separate infra to manage
- MIT licensed

## Cons

- Explicitly preview/unstable — README states not for production use
- Tied to Cloudflare's platform (Durable Objects, Workers)
- Smaller ecosystem/track record than established sandbox providers (E2B, Daytona)

## Resources

- [GitHub Repository](https://github.com/cloudflare/computer)
