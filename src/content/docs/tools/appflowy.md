---
title: AppFlowy
description: Open-source, privacy-first workspace app — a self-hostable alternative to Notion
order: 1
---

# AppFlowy

**[AppFlowy-IO/AppFlowy](https://github.com/AppFlowy-IO/AppFlowy)**

## Overview

AppFlowy is an open-source workspace application — docs, databases, Kanban boards, and AI features — built as a privacy-respecting, self-hostable alternative to Notion. A single Flutter + Rust codebase ships native apps across desktop, mobile, and web.

## What is it?

A cross-platform "all-in-one workspace" combining rich documents, database grids, and Kanban-style project boards, with built-in AI capabilities and full sync across devices. Unlike Notion, it can be fully self-hosted, keeping data under the user's own control.

## Why use it?

Teams and individuals who like Notion's workflow but want to own their data — either for privacy, compliance, or just not wanting a critical workspace locked to someone else's cloud — get a comparable feature set with a self-hosting option and native (not just web/Electron) performance.

## Installation

- **Desktop**: download from GitHub Releases, Flathub, Snapcraft, or Sourceforge (macOS, Windows, Linux)
- **Mobile**: App Store (iOS) or Play Store (Android 10+)
- **Self-hosted server**: follow the guided self-hosting docs to run your own backend
- **From source**: clone the repo and build with Flutter + Rust toolchains per the contributor docs

## Basic Usage

1. Install a client (desktop/mobile) or point it at a self-hosted/cloud workspace.
2. Create a workspace and add documents, database grids, or Kanban boards.
3. Use templates to bootstrap common setups (notes, project trackers, wikis).
4. Invite collaborators and sync across devices.
5. Optionally use built-in AI features for writing/summarizing within docs.

## Key Features

- Rich document editor with nested pages
- Database/grid views for structured data
- Kanban boards for task and project management
- Built-in AI assistance
- Cross-device sync
- Fully self-hostable backend
- Native performance via Flutter + Rust (not Electron)

## Top 5 Use Cases

- Self-hosted team wiki/knowledge base instead of Notion
- Personal task and project management with database views
- Privacy-conscious teams (legal, healthcare, security) needing full data control
- Cross-platform note-taking with native desktop/mobile apps
- Building lightweight internal tools on top of its database/grid features

## Competitors

- **Notion** — the dominant closed-source, cloud-only workspace app AppFlowy directly positions itself against; Notion has a larger ecosystem/integrations but no self-hosting or open-source option.
- **Obsidian** — local-first note-taking, but lacks AppFlowy's structured database/Kanban/project-management features.
- **Anytype** — another open-source, local-first Notion alternative with a similar privacy pitch.
- **Logseq** — open-source outliner/note tool, more knowledge-graph focused than project/database management.

## Pros

- Fully open source and self-hostable (real data ownership)
- Native performance across desktop, mobile, and web from one codebase
- Combines docs + databases + Kanban in one app, like Notion
- Active development and growing template/plugin ecosystem

## Cons

- AGPLv3 license is copyleft — a consideration for commercial derivatives
- Self-hosting adds operational overhead compared to Notion's fully managed cloud
- Feature parity with Notion's most advanced integrations/marketplace is still catching up
- Flutter-based UI can feel a little different from native platform conventions

## Resources

- [GitHub Repository](https://github.com/AppFlowy-IO/AppFlowy)
