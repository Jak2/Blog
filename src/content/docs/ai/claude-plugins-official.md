---
title: Claude Code Plugins
description: Anthropic's official, curated plugin marketplace for Claude Code — internal and vetted third-party plugins
order: 1
---

# Claude Code Plugins

**[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)**

![Stars](https://img.shields.io/github/stars/anthropics/claude-plugins-official?style=flat-square) ![License](https://img.shields.io/github/license/anthropics/claude-plugins-official?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/anthropics/claude-plugins-official?style=flat-square)

## Overview

Claude Code Plugins is Anthropic's official, managed marketplace for Claude Code plugins — a curated collection of internal plugins and vetted third-party/community plugins, each meeting security and quality standards before approval.

## What is it?

A two-tier repository: `/plugins` for Anthropic-developed plugins, `/external_plugins` for partner and community submissions. Each plugin follows a standard structure (`.claude-plugin/plugin.json` manifest, optional `.mcp.json` for MCP server config, `commands/`, `agents/`, `skills/`, `README.md`), supports skill-bundle distribution without requiring a full manifest, and has immutable plugin names once published (a `displayName` field handles UI relabeling).

## Why use it?

Installing arbitrary third-party Claude Code extensions carries real trust risk — Anthropic explicitly notes it doesn't control external code bundled into third-party plugins. This marketplace is the vetted middle ground: plugins here passed a quality/security bar before listing, versus pulling an unreviewed plugin from an arbitrary repo.

## Installation

```bash
/plugin install {plugin-name}@claude-plugins-official
```

Or browse via `/plugin > Discover` inside Claude Code.

## Basic Usage

Open `/plugin > Discover` in Claude Code, browse internal or external plugins by category, and install the one you need — commands, agents, skills, and MCP integrations become available immediately.

## Key Features

- Two-tier system: internal Anthropic plugins vs. reviewed external plugins
- Security/quality standards enforced before listing
- Skill-bundle support without a full plugin.json manifest
- Immutable plugin slugs with a separate `displayName` for UI changes
- MCP server integration bundled directly into plugins
- Auto-migration for plugin renames to prevent broken installs

## Top 5 Use Cases

1. Extending Claude Code with vetted commands, agents, and skills
2. Integrating external tools/services into Claude Code via MCP-backed plugins
3. Bundling and sharing a team's own reusable skills/agents as a plugin
4. Discovering community-built Claude Code extensions in one trusted place
5. Adding custom slash commands and automation without writing a plugin from scratch

## Competitors

- [Anthropic Skills](/docs/ai/anthropic-skills) — the underlying Agent Skills spec/catalog; this marketplace is the distribution and discovery layer that plugins (including skill bundles) install through.
- **[Cursor Plugins](/docs/ai/cursor-plugins)** — Cursor's equivalent official plugin marketplace, for a different coding agent.

## Pros

- Official, Anthropic-managed — security/quality bar before listing
- Apache 2.0 licensed, large community (35.3k+ stars, 4.0k+ forks)
- Clean plugin structure covering commands, agents, skills, and MCP in one manifest
- Immutable naming prevents silent plugin identity changes

## Cons

- Vetting covers listing standards, not a guarantee against all third-party plugin risk — Anthropic explicitly disclaims control over external plugin code
- External plugin quality/maintenance still varies by author
- Plugin ecosystem is newer/smaller than more established package registries

## Resources

- [GitHub Repository](https://github.com/anthropics/claude-plugins-official)
- [Plugin development docs](https://code.claude.com/docs/en/plugins)
