---
title: Repos
description: Curated open-source repositories worth knowing about
order: 1
---

# Repos

A running list of open-source projects worth bookmarking — what they do, why they're useful, and when to reach for them.

---

## Openship

**[openshiporg/openship](https://github.com/openshiporg/openship)**

![Stars](https://img.shields.io/github/stars/openshiporg/openship?style=flat-square) ![License](https://img.shields.io/github/license/openshiporg/openship?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/openshiporg/openship?style=flat-square)

Open-source order routing and fulfillment platform. Connects storefronts (Shopify, WooCommerce, etc.) to your shipping/fulfillment channels and lets you define custom routing rules between them.

- **Use case:** Self-host your own order-routing layer instead of paying for a SaaS middleman (e.g. multi-channel sellers who need orders auto-routed to the right warehouse/3PL).
- **Stack:** Next.js, Keystone.js, GraphQL, PostgreSQL.
- **Good to know:** Designed to be self-hosted; expect to run your own DB and background workers.

---

## ntfy

**[binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)**

![Stars](https://img.shields.io/github/stars/binwiederhier/ntfy?style=flat-square) ![License](https://img.shields.io/github/license/binwiederhier/ntfy?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/binwiederhier/ntfy?style=flat-square)

Simple pub-sub push notification service. Send notifications to your phone or desktop via a plain HTTP PUT/POST — no account, no SDK, no app-specific setup.

- **Use case:** Fire-and-forget alerts from scripts, cron jobs, CI pipelines, or home servers (e.g. `curl -d "backup done" ntfy.sh/mytopic`).
- **Stack:** Go (server), companion apps for Android/iOS/CLI.
- **Good to know:** Free public instance at `ntfy.sh`, or self-host the server binary in minutes. Pairs with the ntfy-android app below for a fully self-hosted mobile setup.

---

## ntfy-android

**[binwiederhier/ntfy-android](https://github.com/binwiederhier/ntfy-android)**

![Stars](https://img.shields.io/github/stars/binwiederhier/ntfy-android?style=flat-square) ![License](https://img.shields.io/github/license/binwiederhier/ntfy-android?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/binwiederhier/ntfy-android?style=flat-square)

Official Android client for ntfy. Subscribes to topics on any ntfy server (public or self-hosted) and surfaces them as native push notifications.

- **Use case:** Receiving ntfy alerts on your phone without relying on Firebase/Google push infra — supports a Firebase-free build.
- **Stack:** Kotlin, Android.
- **Good to know:** Available on Google Play, F-Droid, and GitHub releases.

---

## turbovec

**[RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec)**

![Stars](https://img.shields.io/github/stars/RyanCodrai/turbovec?style=flat-square) ![License](https://img.shields.io/github/license/RyanCodrai/turbovec?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/RyanCodrai/turbovec?style=flat-square)

Fast vectorized operations library.

- **Use case:** Performance-sensitive numeric/array workloads where you'd otherwise hand-roll SIMD-style loops.
- **Good to know:** Smaller, newer project — check open issues and recent commits before depending on it in production.

---

## iFixAi

**[ifixai-ai/iFixAi](https://github.com/ifixai-ai/iFixAi)**

![Stars](https://img.shields.io/github/stars/ifixai-ai/iFixAi?style=flat-square) ![License](https://img.shields.io/github/license/ifixai-ai/iFixAi?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/ifixai-ai/iFixAi?style=flat-square)

AI-assisted troubleshooting/repair tool.

- **Use case:** Diagnosing and fixing issues with AI assistance instead of manual debugging.
- **Good to know:** Newer/smaller project — read the README on the repo for current scope and setup before adopting.

---

## Infisical

**[infisical/infisical](https://github.com/infisical/infisical)**

![Stars](https://img.shields.io/github/stars/infisical/infisical?style=flat-square) ![License](https://img.shields.io/github/license/infisical/infisical?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/infisical/infisical?style=flat-square)

Open-source secrets management platform — think "self-hostable Vault/Doppler" with a polished UI, CLI, and SDKs.

- **Use case:** Centralizing env vars/API keys across a team and syncing them into CI, Kubernetes, or `.env` files, with audit logs and access control.
- **Stack:** Next.js frontend, NestJS backend, PostgreSQL.
- **Good to know:** Offers both a managed cloud version and self-hosted (Docker Compose / Helm) deployment.

---

## OpenHuman

**[tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman)**

![Stars](https://img.shields.io/github/stars/tinyhumansai/openhuman?style=flat-square) ![License](https://img.shields.io/github/license/tinyhumansai/openhuman?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/tinyhumansai/openhuman?style=flat-square)

Open-source project for building humanlike AI agents/personas.

- **Use case:** Prototyping AI agents that need persistent identity, personality, or humanlike behavior instead of stateless chatbot responses.
- **Good to know:** Newer/smaller project — check the README for current scope, setup, and API surface before adopting.

---

## agentmemory

**[rohitg00/agentmemory](https://github.com/rohitg00/agentmemory)**

![Stars](https://img.shields.io/github/stars/rohitg00/agentmemory?style=flat-square) ![License](https://img.shields.io/github/license/rohitg00/agentmemory?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/rohitg00/agentmemory?style=flat-square)

Easy-to-use memory layer for AI agents, built on vector databases.

- **Use case:** Giving an LLM agent persistent, searchable long-term memory (facts, conversation history, embeddings) without hand-rolling vector DB plumbing.
- **Stack:** Python, vector DB backends (e.g. Chroma/Postgres-based).
- **Good to know:** Aimed at agent frameworks that need drop-in memory rather than building retrieval from scratch.
