---
title: witr
description: CLI/TUI that traces processes, ports, containers, and files back to what started them
order: 1
---

# witr

**[pranshuparmar/witr](https://github.com/pranshuparmar/witr)**

## Overview

witr ("why is this running?") is a command-line and terminal UI tool that traces any process, port, container, or file lock back to its origin — showing the full causal/supervision chain instead of leaving you to guess why something is running.

## What is it?

A Go-based diagnostic tool with an interactive TUI dashboard (tabbed views for processes, ports, containers, file locks) plus scriptable query modes by process name, PID, port, file, or container. It detects container runtimes (Docker, Podman, Kubernetes) and flags health issues like root processes, dangerous capabilities, or memory problems.

## Why use it?

When something unexpected is running or holding a port/file, tracing it back manually through `ps`, `lsof`, and container inspection commands is slow and error-prone across different runtimes. witr unifies that into one tool that walks the ancestry chain automatically and surfaces it visually or via scriptable query.

## Installation

```bash
curl -fsSL https://witr.dev/install.sh | bash
```

Also available via Homebrew, APT, Conda, Winget, npm, and 10+ other package managers, or as prebuilt binaries/build-from-source (Go).

## Basic Usage

```bash
witr                 # launch interactive TUI dashboard
witr port 8080       # trace what's using a port
witr pid 1234        # trace a process by PID
```

## Key Features

- Interactive TUI with tabs for processes, ports, containers, file locks
- Query by process name, PID, port, file, or container
- Cross-platform: Linux, macOS, Windows, FreeBSD
- Container runtime detection (Docker, Podman, Kubernetes, others)
- Process ancestry/supervision-chain visualization
- Health warnings for root processes, dangerous capabilities, memory issues

## Top 5 Use Cases

1. Incident response — quickly identifying why an unexpected process/port is active
2. Tracing deployment-time system dependencies before/after a rollout
3. DevOps container/process monitoring across mixed runtimes
4. Security auditing for unusual process ancestry chains
5. General "what's holding this file/port" troubleshooting during development

## Competitors

- `ps`/`lsof`/`docker inspect` combined manually — the baseline witr unifies into one tool.
- `htop`/`btop` — general process monitoring, but no ancestry-tracing or cross-runtime container correlation.

## Pros

- Apache 2.0 licensed, actively growing (21.2k+ stars)
- Single tool replaces several manual commands across process/port/container/file lookups
- True cross-platform support including Windows and FreeBSD
- Built-in health/security warnings, not just raw process data

## Cons

- TUI-first design — less scriptable than pure single-purpose CLI tools for some workflows
- Newer project — smaller ecosystem/track record than `lsof`/`ps`
- Container detection depth depends on runtime support keeping pace with new tooling

## Resources

- [GitHub Repository](https://github.com/pranshuparmar/witr)
