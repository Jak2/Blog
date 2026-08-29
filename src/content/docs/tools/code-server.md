---
title: code-server
description: Run VS Code on any remote machine and access it through the browser
order: 1
---

# code-server

**[coder/code-server](https://github.com/coder/code-server)**

![Stars](https://img.shields.io/github/stars/coder/code-server?style=flat-square) ![License](https://img.shields.io/github/license/coder/code-server?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/coder/code-server?style=flat-square)

## Overview

code-server runs VS Code on a remote machine and serves it through the browser — the full VS Code editing experience, accessible from any device without installing a local editor or syncing environments.

## What is it?

A Node.js/TypeScript server that packages Microsoft's VS Code to run headless on a Linux server and stream the UI over WebSocket to any browser. Extensions, terminal, debugging, and the full editor UI work as they would locally, but computation (compiling, testing, downloading dependencies) happens on the server instead of the client device.

## Why use it?

Keeping dev environments in sync across machines — laptop, desktop, a borrowed device — is a recurring source of friction. code-server puts the environment on one server and lets you reach it from a browser tab, so heavy compute (builds, test suites, large downloads) runs on server resources instead of draining a laptop battery, and switching devices means opening a URL, not reinstalling toolchains.

## Installation

```bash
curl -fsSL https://code-server.dev/install.sh | sh
```

Manual installation, cloud-provider deployment, and devcontainer integration also supported. Minimum: 1GB RAM, 2 vCPUs.

## Basic Usage

Install and start code-server on a remote Linux machine, then open the served URL in any browser to get a full VS Code session running against that machine's filesystem and terminal.

## Key Features

- Full VS Code UI, extensions, terminal, and debugging in the browser
- Consistent environment across any device with a browser
- Server-side compute for builds/tests/downloads — spares local battery/resources
- Automated install script plus manual, cloud, and devcontainer deployment options
- Powers team-based remote dev infrastructure via the coder/coder platform

## Top 5 Use Cases

1. Remote development from underpowered or shared devices
2. Consistent team dev environments provisioned centrally
3. Offloading compute-heavy builds/tests to server hardware
4. Cross-device coding without per-device toolchain setup
5. Cloud-hosted development environments for onboarding or ephemeral work

## Competitors

- GitHub Codespaces — hosted, managed VS Code in the cloud, vs. code-server's self-hosted, infrastructure-agnostic approach.
- Gitpod — ephemeral cloud dev environments, vs. code-server's persistent self-hosted server model.
- JetBrains Gateway/Fleet — similar remote-dev concept for JetBrains IDEs, different editor entirely.

## Pros

- MIT licensed, very large community (79.1k+ stars, 6.8k+ forks)
- Self-hostable — no vendor lock-in or per-seat cloud pricing
- Full VS Code extension compatibility
- Low minimum requirements (1GB RAM, 2 vCPUs) to run the server

## Cons

- Requires managing your own server infrastructure and updates
- Browser-based editing has minor UX differences from native VS Code
- Network latency affects responsiveness more than a local editor

## Resources

- [GitHub Repository](https://github.com/coder/code-server)
