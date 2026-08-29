---
title: Plane
description: Open-source project management platform — self-hostable alternative to Jira, Linear, and ClickUp
order: 1
---

# Plane

**[makeplane/plane](https://github.com/makeplane/plane)**

![Stars](https://img.shields.io/github/stars/makeplane/plane?style=flat-square) ![License](https://img.shields.io/github/license/makeplane/plane?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/makeplane/plane?style=flat-square)

## Overview

Plane is a modern, open-source project management platform — a self-hostable alternative to Jira, Linear, Monday.com, and ClickUp for tracking issues, running sprints, and managing product roadmaps.

## What is it?

A full project-management suite: Work Items (rich-text task editor, file uploads, sub-properties, issue linking), Cycles (sprint management with burn-down charts), Modules (breaking large projects into components), Views (customizable filtered/saved/shared views), Pages (AI-enhanced note-taking that converts notes into tasks), and Analytics (real-time trend visualization). Available as Plane Cloud (hosted) or self-hosted via Docker Compose/Kubernetes.

## Why use it?

Jira's complexity and Linear/ClickUp's per-seat SaaS pricing push teams toward either overhead or lock-in. Plane gives a comparable feature set — sprints, roadmaps, custom views, AI-assisted notes — self-hostable under AGPLv3, so teams keep full data control and avoid recurring per-seat costs at scale.

## Installation

```bash
# Self-hosted via Docker Compose — see repo docs for full setup
git clone https://github.com/makeplane/plane
```

Or sign up instantly at [app.plane.so](https://app.plane.so) for the hosted Plane Cloud option.

## Basic Usage

Create a workspace, add projects, break work into Cycles (sprints) and Modules, track Work Items through customizable Views, and use Pages for AI-assisted notes that convert directly into tracked tasks.

## Key Features

- Work Items with rich-text editor, file uploads, sub-properties, issue linking
- Cycles: sprint management with burn-down charts and progress tracking
- Modules: breaking complex projects into manageable components
- Customizable, saveable, shareable filtered Views
- Pages: AI-enhanced note-taking with task conversion
- Real-time Analytics and trend visualization
- Self-hosted (Docker/Kubernetes) or hosted (Plane Cloud)

## Top 5 Use Cases

1. Issue and bug tracking for engineering teams
2. Sprint/cycle planning with burn-down tracking
3. Product roadmap management across multiple projects
4. Self-hosted alternative to Jira/Linear for data-control-conscious teams
5. Turning meeting notes directly into tracked work items via Pages

## Competitors

- Jira — far larger ecosystem/marketplace, but heavier and proprietary vs. Plane's open-source, self-hostable model.
- Linear — polished, fast SaaS UX, vs. Plane's self-hosted, no-per-seat-lock-in alternative.
- ClickUp/Monday.com — broader all-in-one work platforms, more complexity than Plane's more focused issue/sprint/roadmap scope.

## Pros

- Very large, active community (58.5k+ stars, 5.6k+ forks)
- Self-hostable with full data control, no forced per-seat SaaS pricing
- AI-enhanced note-taking with direct task conversion
- Modern, polished UI comparable to Linear/ClickUp

## Cons

- AGPLv3 license — copyleft obligations to check before commercial/hosted resale use
- Self-hosting requires real infra (Docker/Kubernetes, PostgreSQL, Redis)
- Smaller third-party integration ecosystem than Jira's marketplace

## Resources

- [GitHub Repository](https://github.com/makeplane/plane)
- [app.plane.so](https://app.plane.so)
