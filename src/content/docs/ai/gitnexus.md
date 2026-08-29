---
title: GitNexus
description: Zero-server code intelligence engine building interactive knowledge graphs of codebases for AI agents, entirely client-side
order: 1
---

# GitNexus

**[abhigyanpatwari/GitNexus](https://github.com/abhigyanpatwari/GitNexus)**

![Stars](https://img.shields.io/github/stars/abhigyanpatwari/GitNexus?style=flat-square) ![License](https://img.shields.io/github/license/abhigyanpatwari/GitNexus?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/abhigyanpatwari/GitNexus?style=flat-square)

## Overview

GitNexus is a zero-server code intelligence engine that builds interactive knowledge graphs of a codebase — running entirely client-side in the browser or via CLI, so an AI agent can understand code architecture, dependencies, and call chains without uploading source to any external server.

## What is it?

A Tree-sitter-based multi-language parser (14+ languages: TypeScript, Python, Java, Go, Rust, C#, and more) that constructs a knowledge graph tracking dependencies, call chains, clusters, and execution flows, queryable via Cypher. It ships 17 MCP tools for impact analysis, symbol context, code tracing, and coordinated rename operations; process detection to identify execution flows from entry points through call hierarchies; hybrid search (BM25 + semantic vectors + reciprocal rank fusion); auto-installed agent skills for Cursor, Claude Code, Codex, and Antigravity; a web UI with graph visualization (Sigma.js) and AI chat; and multi-repo support with cross-repo contract extraction.

## Why use it?

Handing a codebase to an AI agent by dumping files into context loses the actual structure — what calls what, what a change's blast radius is. GitNexus builds that structure explicitly as a queryable graph, entirely locally (native or WASM), so an agent gets precise impact analysis and symbol context instead of re-deriving architecture from scattered file reads on every request.

## Installation

```bash
# Quick start
npx gitnexus analyze          # index current repo
npx gitnexus setup            # configure MCP for detected editors

# Global CLI
npm install -g gitnexus
```

Docker Compose (official signed images), Render Blueprint one-click deploy, and full self-hosted Kubernetes options also available.

## Basic Usage

Run `npx gitnexus analyze` in a repo to build the knowledge graph, then `npx gitnexus setup` to wire MCP tools into your editor — an agent (or the web UI) can then query impact analysis, trace call chains, or plan a multi-file rename against the graph.

## Key Features

- Multi-language parsing via Tree-sitter for 14+ languages
- Knowledge graph tracking dependencies, call chains, clusters, execution flows
- 17 MCP tools: impact analysis, symbol context, code tracing, rename operations
- Process detection identifying execution flows from entry points
- Hybrid search: BM25, semantic vectors, reciprocal rank fusion
- Auto-installed agent skills for Cursor, Claude Code, Codex, Antigravity
- Web UI with graph visualization (Sigma.js) and AI chat
- Multi-repo support with cross-repo contract extraction

## Top 5 Use Cases

1. Pre-commit impact analysis before making a code change
2. Refactoring planning via explicit dependency mapping
3. Blast-radius estimation for large modifications
4. Multi-file coordinated renames across a codebase
5. Cross-repo service dependency tracking in a microservices setup

## Competitors

- [Archify](/docs/ai/archify) — generates visual architecture diagrams from a codebase, vs. GitNexus's queryable knowledge graph with MCP tools for agent-driven analysis.
- Sourcegraph — hosted/enterprise code intelligence platform, vs. GitNexus's zero-server, client-side/self-hosted model.

## Pros

- Large, active community (46.4k+ stars, 5.1k+ forks)
- Zero-server option keeps source code fully local/private
- Deep MCP integration (17 tools) built specifically for agent workflows
- Multi-language and multi-repo support out of the box

## Cons

- PolyForm Noncommercial 1.0.0 license — commercial/SaaS use requires a separate license from akonlabs.com
- Building a full knowledge graph adds setup/indexing time vs. a plain grep-based approach
- Extended language support (e.g. OCaml) gated behind the commercial offering

## Resources

- [GitHub Repository](https://github.com/abhigyanpatwari/GitNexus)
