---
title: Repos
description: Curated open-source repositories worth knowing about
order: 1
---
# Repos

A running list of open-source projects worth bookmarking — what they do, why they're useful, and when to reach for them.

---

## Agency

**[tobias-walle/agency](https://github.com/tobias-walle/agency)**

![Stars](https://img.shields.io/github/stars/tobias-walle/agency?style=flat-square) ![License](https://img.shields.io/github/license/tobias-walle/agency?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/tobias-walle/agency?style=flat-square)

A Rust, Lazygit-inspired terminal orchestrator that runs any CLI coding agent (Claude Code, Codex, Gemini CLI, OpenCode) in isolated git-worktree + tmux sessions.

- **Use case:** Running and managing several parallel coding-agent sessions without manual worktree/tmux juggling
- **Stack:** Rust, tmux, daemon + client over Unix socket, MIT
- **Good to know:** Agent-agnostic — no built-in memory/scheduling like Kiro Crew, just session orchestration

[Full writeup →](/docs/ai/agency)

---

## Agent Browser

**[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)**

![Stars](https://img.shields.io/github/stars/vercel-labs/agent-browser?style=flat-square) ![License](https://img.shields.io/github/license/vercel-labs/agent-browser?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/vercel-labs/agent-browser?style=flat-square)

Rust-native browser automation CLI built for AI agents — ref-based element selection, snapshot workflows, and an MCP server mode instead of raw DOM/screenshot scripting.

- **Use case:** Letting an LLM agent drive a real browser (navigate, click, fill forms, scrape) via deterministic refs instead of brittle selectors
- **Stack:** Rust daemon, npm/Homebrew/Cargo install, Apache-2.0, MCP server mode
- **Good to know:** No Node.js required for the daemon itself; supports local Chrome plus cloud providers (Browserbase, Browserless, Kernel, AgentCore)

[Full writeup →](/docs/ai/agent-browser)

---

## agentmemory

**[rohitg00/agentmemory](https://github.com/rohitg00/agentmemory)**

![Stars](https://img.shields.io/github/stars/rohitg00/agentmemory?style=flat-square) ![License](https://img.shields.io/github/license/rohitg00/agentmemory?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/rohitg00/agentmemory?style=flat-square)

Easy-to-use memory layer for AI agents, built on vector databases.

- **Use case:** Giving an LLM agent persistent, searchable long-term memory (facts, conversation history, embeddings) without hand-rolling vector DB plumbing.
- **Stack:** Python, vector DB backends (e.g. Chroma/Postgres-based).
- **Good to know:** Aimed at agent frameworks that need drop-in memory rather than building retrieval from scratch.

[Full writeup →](/docs/ai/agentmemory)

---

## agents-cli

**[google/agents-cli](https://github.com/google/agents-cli)**

![Stars](https://img.shields.io/github/stars/google/agents-cli?style=flat-square) ![License](https://img.shields.io/github/license/google/agents-cli?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/google/agents-cli?style=flat-square)

Google's CLI and skills that turn any coding assistant into an expert at scaffolding, evaluating, and deploying ADK agents on Google Cloud's Gemini Enterprise Agent Platform.

- **Use case:** Building and shipping production agents on Google Cloud with a full eval/deploy pipeline
- **Stack:** Python, uv/uvx, Apache-2.0, works alongside Claude Code/Codex/Antigravity
- **Good to know:** Not a coding agent itself — a skill/tool layer for existing coding agents

[Full writeup →](/docs/ai/agents-cli)

---

## AI Website Cloner Template

**[JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)**

![Stars](https://img.shields.io/github/stars/JCodesMore/ai-website-cloner-template?style=flat-square) ![License](https://img.shields.io/github/license/JCodesMore/ai-website-cloner-template?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/JCodesMore/ai-website-cloner-template?style=flat-square)

A GitHub template that has an AI coding agent recreate any website as a clean Next.js app via a five-phase clone pipeline (recon, foundation, component specs, parallel build, QA).

- **Use case:** Migrating a legacy/platform-locked site into a modern Next.js codebase
- **Stack:** Next.js 16, React 19, TypeScript, shadcn/ui, Tailwind v4, MIT
- **Good to know:** Best results with Claude Code + Opus 5; supports 13 agent platforms including Kiro

[Full writeup →](/docs/ai/ai-website-cloner-template)

---

## AI Youtube Shorts Generator (AutoShorts AI)

**[SaarD00/AI-Youtube-Shorts-Generator](https://github.com/SaarD00/AI-Youtube-Shorts-Generator)**

![Stars](https://img.shields.io/github/stars/SaarD00/AI-Youtube-Shorts-Generator?style=flat-square) ![License](https://img.shields.io/github/license/SaarD00/AI-Youtube-Shorts-Generator?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/SaarD00/AI-Youtube-Shorts-Generator?style=flat-square)

A Python pipeline that turns a single topic into a fully edited faceless YouTube Short/TikTok — Gemini scriptwriting, Pexels stock footage with mid-scene A/B splits, edge-tts voiceover, and FFmpeg assembly.

- **Use case:** Batch-producing faceless short-form videos with no filming or manual editing
- **Stack:** Python, Google Gemini, edge-tts, Pexels API, FFmpeg
- **Good to know:** Single-video generator only — no scheduling or publishing built in

[Full writeup →](/docs/ai/ai-youtube-shorts-generator)

---

## AppFlowy

**[AppFlowy-IO/AppFlowy](https://github.com/AppFlowy-IO/AppFlowy)**

![Stars](https://img.shields.io/github/stars/AppFlowy-IO/AppFlowy?style=flat-square) ![License](https://img.shields.io/github/license/AppFlowy-IO/AppFlowy?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/AppFlowy-IO/AppFlowy?style=flat-square)

Open-source, self-hostable workspace app combining docs, databases, and Kanban boards with built-in AI — a privacy-first alternative to Notion, built with Flutter and Rust for native cross-platform performance.

- **Use case:** Self-hosted team wiki, docs, and project management
- **Stack:** Flutter, Rust
- **Good to know:** AGPLv3 licensed; direct alternative to Notion

[Full writeup →](/docs/tools/appflowy)

---

## Awesome CLI Coding Agents

**[bradagi/awesome-cli-coding-agents](https://github.com/bradagi/awesome-cli-coding-agents)**

![Stars](https://img.shields.io/github/stars/bradagi/awesome-cli-coding-agents?style=flat-square) ![License](https://img.shields.io/github/license/bradagi/awesome-cli-coding-agents?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/bradagi/awesome-cli-coding-agents?style=flat-square)

A curated, actively updated directory of 100+ terminal-native AI coding agents plus the harnesses/orchestrators that run them in parallel.

- **Use case:** Surveying or comparing the CLI coding agent landscape before adopting a tool
- **Stack:** Markdown awesome-list (no code)
- **Good to know:** Includes Claude Code, Aider, Cursor CLI, and dozens of orchestrators like Claude Squad and Crystal

[Full writeup →](/docs/ai/awesome-cli-coding-agents)

---

## Awesome Free LLM APIs

**[open-free-llm-api/awesome-freellm-apis](https://github.com/open-free-llm-api/awesome-freellm-apis)**

![Stars](https://img.shields.io/github/stars/open-free-llm-api/awesome-freellm-apis?style=flat-square) ![License](https://img.shields.io/github/license/open-free-llm-api/awesome-freellm-apis?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/open-free-llm-api/awesome-freellm-apis?style=flat-square)

Curated, daily-refreshed directory of 400+ free LLM API models across 30+ providers, with rate limits, credit-card requirements, and one-click config snippets for tools like Claude Code, Cursor, and Codex.

- **Use case:** Finding and configuring a genuinely free LLM API key in under a minute
- **Stack:** Static/curated data + companion site (freellm.net), no install required
- **Good to know:** It's a reference list, not software — pair with a gateway like OmniRoute if you want automatic switching

[Full writeup →](/docs/ai/awesome-freellm-apis)

---

## Chatwoot

**[chatwoot/chatwoot](https://github.com/chatwoot/chatwoot)**

![Stars](https://img.shields.io/github/stars/chatwoot/chatwoot?style=flat-square) ![License](https://img.shields.io/github/license/chatwoot/chatwoot?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/chatwoot/chatwoot?style=flat-square)

Open-source, self-hostable omnichannel customer support platform — unified inbox for chat, email, WhatsApp, Telegram, and social, with an AI agent and help-center portal built in.

- **Use case:** Self-hosted customer support inbox across channels
- **Stack:** Ruby on Rails, Vue.js
- **Good to know:** MIT licensed; direct alternative to Intercom/Zendesk

[Full writeup →](/docs/tools/chatwoot)

---

## Clay

**[nicbarker/clay](https://github.com/nicbarker/clay)**

![Stars](https://img.shields.io/github/stars/nicbarker/clay?style=flat-square) ![License](https://img.shields.io/github/license/nicbarker/clay?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/nicbarker/clay?style=flat-square)

A single-header, zero-dependency C library for microsecond 2D UI layout with a declarative, React-like API — renderer-agnostic, compiles to 15kb WASM, with Odin and Rust bindings.

- **Use case:** UI layout for game engines, embedded, or renderer-agnostic apps
- **Stack:** C99/C++20, WASM
- **Good to know:** Alternative to Dear ImGui / Yoga; layout-only, you supply the renderer

[Full writeup →](/docs/tools/clay)

---

## Colibrì

**[JustVugg/colibri](https://github.com/JustVugg/colibri)**

![Stars](https://img.shields.io/github/stars/JustVugg/colibri?style=flat-square) ![License](https://img.shields.io/github/license/JustVugg/colibri?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/JustVugg/colibri?style=flat-square)

Pure C, zero-dependency inference engine that runs frontier MoE models (744B–2.8T parameters) on consumer hardware by treating disk, RAM, and VRAM as one memory-tiered hierarchy, streaming experts from storage instead of requiring full VRAM residency.

- **Use case:** Run/study frontier-scale open-weight MoE models locally without a GPU cluster
- **Stack:** Pure C, CPU/CUDA/Metal, Python launcher/tooling
- **Good to know:** Apache-2.0 licensed; throughput is disk-bound — needs large fast local storage

[Full writeup →](/docs/ai/colibri)

---

## Databasement

**[David-Crty/databasement](https://github.com/David-Crty/databasement)**

![Stars](https://img.shields.io/github/stars/David-Crty/databasement?style=flat-square) ![License](https://img.shields.io/github/license/David-Crty/databasement?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/David-Crty/databasement?style=flat-square)

Self-hosted database backup manager with a web UI covering MySQL, PostgreSQL, MongoDB, SQL Server, SQLite, Redis and more, with scheduling, retention policies, cross-server restore, and remote agents for firewalled networks.

- **Use case:** Centralized backup/restore across mixed database engines, self-hosted
- **Stack:** PHP, single Docker container (web server + queue worker + scheduler)
- **Good to know:** MIT licensed; ships a REST API and MCP server for AI-agent-driven backup ops

[Full writeup →](/docs/tools/databasement)

---

## Handwrite

**[yashlamba/handwrite](https://github.com/yashlamba/handwrite)**

![Stars](https://img.shields.io/github/stars/yashlamba/handwrite?style=flat-square) ![License](https://img.shields.io/github/license/yashlamba/handwrite?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/yashlamba/handwrite?style=flat-square)

Converts your own handwriting samples into a real, installable TTF font, using Potrace vectorization and Fontforge packaging — useful for authentic-looking documents or accessibility for dysgraphia.

- **Use case:** Turning handwriting samples into a reusable digital font
- **Stack:** Python, Fontforge, Potrace
- **Good to know:** Direct alternative to Text-to-Handwriting, but produces a real font instead of images/PDFs

[Full writeup →](/docs/tools/handwrite)

---

## HyperFrames

**[heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)**

![Stars](https://img.shields.io/github/stars/heygen-com/hyperframes?style=flat-square) ![License](https://img.shields.io/github/license/heygen-com/hyperframes?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/heygen-com/hyperframes?style=flat-square)

Open-source, Apache 2.0-licensed framework from HeyGen for turning plain HTML/CSS into deterministic MP4 videos via headless Chrome and FFmpeg, with a 19-skill agent pack for AI coding tools.

- **Use case:** AI-agent-driven video production (product launches, PR changelogs, data viz) with no React/build step
- **Stack:** Node.js 22+, headless Chrome, FFmpeg, GSAP/Lottie/Three.js adapters, AWS Lambda for distributed rendering
- **Good to know:** Inspired by and directly competes with Remotion; repo uses Git LFS for ~240MB of test fixtures

[Full writeup →](/docs/ai/hyperframes)

---

## iFixAi

**[ifixai-ai/iFixAi](https://github.com/ifixai-ai/iFixAi)**

![Stars](https://img.shields.io/github/stars/ifixai-ai/iFixAi?style=flat-square) ![License](https://img.shields.io/github/license/ifixai-ai/iFixAi?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/ifixai-ai/iFixAi?style=flat-square)

AI-assisted troubleshooting/repair tool.

- **Use case:** Diagnosing and fixing issues with AI assistance instead of manual debugging.
- **Good to know:** Newer/smaller project — read the README on the repo for current scope and setup before adopting.

[Full writeup →](/docs/ai/ifixai)

---

## Infisical

**[infisical/infisical](https://github.com/infisical/infisical)**

![Stars](https://img.shields.io/github/stars/infisical/infisical?style=flat-square) ![License](https://img.shields.io/github/license/infisical/infisical?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/infisical/infisical?style=flat-square)

Open-source secrets management platform — think "self-hostable Vault/Doppler" with a polished UI, CLI, and SDKs.

- **Use case:** Centralizing env vars/API keys across a team and syncing them into CI, Kubernetes, or `.env` files, with audit logs and access control.
- **Stack:** Next.js frontend, NestJS backend, PostgreSQL.
- **Good to know:** Offers both a managed cloud version and self-hosted (Docker Compose / Helm) deployment.

[Full writeup →](/docs/tools/infisical)

---

## Kiro

**[kirodotdev/Kiro](https://github.com/kirodotdev/Kiro)**

![Stars](https://img.shields.io/github/stars/kirodotdev/Kiro?style=flat-square) ![License](https://img.shields.io/github/license/kirodotdev/Kiro?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/kirodotdev/Kiro?style=flat-square)

Amazon/AWS's agentic IDE and CLI, using spec-driven development to turn natural-language prompts into structured requirements and implementation plans, plus hooks, steering files, and MCP support.

- **Use case:** Spec-first feature development with a reviewable plan before code changes
- **Stack:** Desktop app (macOS/Windows/Linux) + CLI, AWS-backed
- **Good to know:** No LICENSE file in the repo; runs on `kiro-cli`, which Kiro Crew also depends on

[Full writeup →](/docs/ai/kiro)

---

## Kiro Crew

**[kirodotdev/KiroCrew](https://github.com/kirodotdev/KiroCrew)**

![Stars](https://img.shields.io/github/stars/kirodotdev/KiroCrew?style=flat-square) ![License](https://img.shields.io/github/license/kirodotdev/KiroCrew?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/kirodotdev/KiroCrew?style=flat-square)

A persistent, self-learning agent workspace (Gateway) that runs `kiro-cli` unattended and stays reachable from desktop, web dashboard, CLI, Slack, Discord, and more.

- **Use case:** Long-running, scheduled, or unattended agent tasks that persist across sessions
- **Stack:** Python/TypeScript, Gateway + ACP runtime, Apache-2.0
- **Good to know:** Complementary to Kiro (not a competitor) — every install path runs `kiro-cli` underneath

[Full writeup →](/docs/ai/kirocrew)

---

## LobeHub

**[lobehub/lobehub](https://github.com/lobehub/lobehub)**

![Stars](https://img.shields.io/github/stars/lobehub/lobehub?style=flat-square) ![License](https://img.shields.io/github/license/lobehub/lobehub?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/lobehub/lobehub?style=flat-square)

Open-source "Chief Agent Operator" platform (formerly Lobe Chat) for hiring, scheduling, and getting reports from a team of AI agents, built on a broad multi-model, plugin-extensible chat foundation.

- **Use case:** Self-hosted multi-agent operations platform beyond a single disposable chat window
- **Stack:** TypeScript, deployable to Vercel/Docker/Zeabur/Sealos/Alibaba Cloud
- **Good to know:** License shows as unassigned on GitHub; product direction is shifting quickly from chat UI to agent operations

[Full writeup →](/docs/ai/lobehub)

---

## MaxKB

**[1Panel-dev/maxkb](https://github.com/1Panel-dev/maxkb)**

![Stars](https://img.shields.io/github/stars/1Panel-dev/maxkb?style=flat-square) ![License](https://img.shields.io/github/license/1Panel-dev/maxkb?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/1Panel-dev/maxkb?style=flat-square)

Open-source, GPLv3-licensed platform for building enterprise-grade RAG chatbots and agentic workflows, deployable via a single Docker command, with MCP tool-use and native multi-modal support.

- **Use case:** Self-hosted RAG chatbot for customer service, internal knowledge bases, or education
- **Stack:** Django/Python, Vue.js, PostgreSQL + pgvector, LangChain
- **Good to know:** GPLv3 (copyleft); SSO/access control gated behind a Pro tier

[Full writeup →](/docs/ai/maxkb)

---

## Moonshine

**[moonshine-ai/moonshine](https://github.com/moonshine-ai/moonshine)**

![Stars](https://img.shields.io/github/stars/moonshine-ai/moonshine?style=flat-square) ![License](https://img.shields.io/github/license/moonshine-ai/moonshine?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/moonshine-ai/moonshine?style=flat-square)

On-device voice AI toolkit — low-latency speech-to-text, intent recognition, and text-to-speech, positioned as a faster/lighter alternative to Whisper.

- **Use case:** Building real-time voice agents (STT, TTS, multi-turn voice interaction) that run fully on-device across iOS/Android/desktop/web
- **Stack:** C++ core with Python/Swift/Java/JS bindings, MIT
- **Good to know:** Competes directly with OpenAI Whisper — flexible input windows vs Whisper's fixed 30s chunks, ~74ms latency vs Whisper Large V3's 11s+, smaller model (245M vs 1.5B params) with competitive WER

[Full writeup →](/docs/ai/moonshine)

---

## MySigMail

**[antonreshetov/mysigmail](https://github.com/antonreshetov/mysigmail)**

![Stars](https://img.shields.io/github/stars/antonreshetov/mysigmail?style=flat-square) ![License](https://img.shields.io/github/license/antonreshetov/mysigmail?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/antonreshetov/mysigmail?style=flat-square)

Open-source visual email signature builder producing cross-client-compatible signatures (Gmail, Outlook, Apple Mail), self-hostable via Bun or usable as the hosted SaaS at mysigmail.com.

- **Use case:** Building and managing email signatures without hand-writing HTML
- **Stack:** Vue.js, TypeScript, Vite, Bun
- **Good to know:** AGPL-3.0 with a commercial license option; live hosted version at mysigmail.com

[Full writeup →](/docs/tools/mysigmail)

---

## ntfy

**[binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)**

![Stars](https://img.shields.io/github/stars/binwiederhier/ntfy?style=flat-square) ![License](https://img.shields.io/github/license/binwiederhier/ntfy?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/binwiederhier/ntfy?style=flat-square)

Simple pub-sub push notification service. Send notifications to your phone or desktop via a plain HTTP PUT/POST — no account, no SDK, no app-specific setup.

- **Use case:** Fire-and-forget alerts from scripts, cron jobs, CI pipelines, or home servers (e.g. `curl -d "backup done" ntfy.sh/mytopic`).
- **Stack:** Go (server), companion apps for Android/iOS/CLI.
- **Good to know:** Free public instance at `ntfy.sh`, or self-host the server binary in minutes. Pairs with the ntfy-android app below for a fully self-hosted mobile setup.

[Full writeup →](/docs/tools/ntfy)

---

## ntfy-android

**[binwiederhier/ntfy-android](https://github.com/binwiederhier/ntfy-android)**

![Stars](https://img.shields.io/github/stars/binwiederhier/ntfy-android?style=flat-square) ![License](https://img.shields.io/github/license/binwiederhier/ntfy-android?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/binwiederhier/ntfy-android?style=flat-square)

Official Android client for ntfy. Subscribes to topics on any ntfy server (public or self-hosted) and surfaces them as native push notifications.

- **Use case:** Receiving ntfy alerts on your phone without relying on Firebase/Google push infra — supports a Firebase-free build.
- **Stack:** Kotlin, Android.
- **Good to know:** Available on Google Play, F-Droid, and GitHub releases.

[Full writeup →](/docs/tools/ntfy-android)

---

## OmniParser

**[microsoft/OmniParser](https://github.com/microsoft/OmniParser)**

![Stars](https://img.shields.io/github/stars/microsoft/OmniParser?style=flat-square) ![License](https://img.shields.io/github/license/microsoft/OmniParser?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/microsoft/OmniParser?style=flat-square)

Parses UI screenshots into structured, labeled elements (icons/text/buttons with bounding boxes) so vision-based GUI agents can ground actions accurately instead of guessing pixel coordinates.

- **Use case:** Giving a computer-use/GUI agent a reliable, structured view of a screenshot to click/type against
- **Stack:** Python, YOLOv9-based detector (MIT) + caption models (MIT), CC-BY-4.0 overall, Gradio demo
- **Good to know:** v2.0 adds better detection and works with OpenAI/DeepSeek/Qwen/Anthropic models on top; a parsing layer, not a full agent — pair it with an LLM to act on the output

[Full writeup →](/docs/ai/omniparser)

---

## OmniRoute

**[diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)**

![Stars](https://img.shields.io/github/stars/diegosouzapw/OmniRoute?style=flat-square) ![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/diegosouzapw/OmniRoute?style=flat-square)

Self-hosted, MIT-licensed AI gateway that puts one OpenAI-compatible endpoint in front of many LLM providers (including free tiers) with automatic fallback and built-in token compression, aimed at coding-agent CLIs.

- **Use case:** Stretching free-tier LLM quotas and avoiding manual provider-switching for coding agents
- **Stack:** Node.js/npm CLI, Docker, Electron, MCP/A2A support
- **Good to know:** README is heavily marketing-driven — verify claimed provider/contributor/savings numbers independently

[Full writeup →](/docs/ai/omniroute)

---

## OpenHuman

**[tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman)**

![Stars](https://img.shields.io/github/stars/tinyhumansai/openhuman?style=flat-square) ![License](https://img.shields.io/github/license/tinyhumansai/openhuman?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/tinyhumansai/openhuman?style=flat-square)

Open-source project for building humanlike AI agents/personas.

- **Use case:** Prototyping AI agents that need persistent identity, personality, or humanlike behavior instead of stateless chatbot responses.
- **Good to know:** Newer/smaller project — check the README for current scope, setup, and API surface before adopting.

[Full writeup →](/docs/ai/openhuman)

---

## Openship

**[openshiporg/openship](https://github.com/openshiporg/openship)**

![Stars](https://img.shields.io/github/stars/openshiporg/openship?style=flat-square) ![License](https://img.shields.io/github/license/openshiporg/openship?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/openshiporg/openship?style=flat-square)

Open-source order routing and fulfillment platform. Connects storefronts (Shopify, WooCommerce, etc.) to your shipping/fulfillment channels and lets you define custom routing rules between them.

- **Use case:** Self-host your own order-routing layer instead of paying for a SaaS middleman (e.g. multi-channel sellers who need orders auto-routed to the right warehouse/3PL).
- **Stack:** Next.js, Keystone.js, GraphQL, PostgreSQL.
- **Good to know:** Designed to be self-hosted; expect to run your own DB and background workers.

[Full writeup →](/docs/tools/openship)

---

## PinchTab

**[pinchtab/pinchtab](https://github.com/pinchtab/pinchtab)**

![Stars](https://img.shields.io/github/stars/pinchtab/pinchtab?style=flat-square) ![License](https://img.shields.io/github/license/pinchtab/pinchtab?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/pinchtab/pinchtab?style=flat-square)

Small Go binary that gives AI agents direct, token-efficient HTTP control over Chrome — headless/headed navigation, saved profiles, structured extraction, and whole-site audits with visual diffing.

- **Use case:** Token-efficient browser automation and site auditing for AI agents
- **Stack:** Go, HTTP API + MCP server
- **Good to know:** Apache-2.0 licensed; local-first security defaults (loopback bind, disabled sensitive endpoints)

[Full writeup →](/docs/tools/pinchtab)

---

## SideScreen

**[tranvuongquocdat/SideScreen](https://github.com/tranvuongquocdat/SideScreen)**

![Stars](https://img.shields.io/github/stars/tranvuongquocdat/SideScreen?style=flat-square) ![License](https://img.shields.io/github/license/tranvuongquocdat/SideScreen?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/tranvuongquocdat/SideScreen?style=flat-square)

Turns an Android tablet into a low-latency extended display for macOS over USB-C or WiFi, with true window-dragging and touch support — filling the gap Apple's Sidecar leaves for Android devices.

- **Use case:** Extending a Mac's workspace with a spare Android tablet, including headless-Mac setups
- **Stack:** Swift (macOS), Kotlin (Android), H.265 hardware encoding, ADB
- **Good to know:** Requires bypassing macOS Gatekeeper manually since the app isn't notarized

[Full writeup →](/docs/tools/sidescreen)

---

## SuiteCRM

**[SuiteCRM/SuiteCRM](https://github.com/SuiteCRM/SuiteCRM)**

![Stars](https://img.shields.io/github/stars/SuiteCRM/SuiteCRM?style=flat-square) ![License](https://img.shields.io/github/license/SuiteCRM/SuiteCRM?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/SuiteCRM/SuiteCRM?style=flat-square)

Mature, enterprise-ready open-source CRM (a SugarCRM Community Edition fork) on a PHP/LAMP stack, with a decade of built-out modules, point-and-click customization, and a large extensions/partner ecosystem.

- **Use case:** Feature-complete, self-hosted enterprise CRM with commercial support available
- **Stack:** PHP, Apache/IIS, MySQL/MariaDB
- **Good to know:** AGPL-3.0 licensed; direct competitor to Twenty — legacy depth vs. modern code-first UX

[Full writeup →](/docs/crm/suitecrm)

---

## SurfSense

**[MODSetter/SurfSense](https://github.com/MODSetter/SurfSense)**

![Stars](https://img.shields.io/github/stars/MODSetter/SurfSense?style=flat-square) ![License](https://img.shields.io/github/license/MODSetter/SurfSense?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/MODSetter/SurfSense?style=flat-square)

Open-source NotebookLM alternative that pairs a self-hosted knowledge base with live web-research connectors (Reddit, YouTube, TikTok, Google Maps, Google Search, and more) exposed as a REST API and MCP server for AI agents.

- **Use case:** Self-hosted research/knowledge-base platform with live social and web data for agents
- **Stack:** Python, Docker, MCP server, LiteLLM/OpenAI-spec model support
- **Good to know:** Actively developed, not yet production-ready per its own README; license shows as unassigned on GitHub

[Full writeup →](/docs/ai/surfsense)

---

## Text-to-Handwriting

**[saurabhdaware/text-to-handwriting](https://github.com/saurabhdaware/text-to-handwriting)**

![Stars](https://img.shields.io/github/stars/saurabhdaware/text-to-handwriting?style=flat-square) ![License](https://img.shields.io/github/license/saurabhdaware/text-to-handwriting?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/saurabhdaware/text-to-handwriting?style=flat-square)

Renders typed text as handwriting-style images and exportable PDFs entirely client-side — a fast, no-install way to fake a handwritten document. Project is archived but still usable.

- **Use case:** Quick handwriting-style document generation from typed text
- **Stack:** JavaScript, html2canvas, jsPDF
- **Good to know:** Archived (no active maintenance); direct alternative to Handwrite, which builds a real reusable font instead

[Full writeup →](/docs/tools/text-to-handwriting)

---

## turbovec

**[RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec)**

![Stars](https://img.shields.io/github/stars/RyanCodrai/turbovec?style=flat-square) ![License](https://img.shields.io/github/license/RyanCodrai/turbovec?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/RyanCodrai/turbovec?style=flat-square)

Fast vectorized operations library.

- **Use case:** Performance-sensitive numeric/array workloads where you'd otherwise hand-roll SIMD-style loops.
- **Good to know:** Smaller, newer project — check open issues and recent commits before depending on it in production.

[Full writeup →](/docs/tools/turbovec)

---

## Twenty

**[twentyhq/twenty](https://github.com/twentyhq/twenty)**

![Stars](https://img.shields.io/github/stars/twentyhq/twenty?style=flat-square) ![License](https://img.shields.io/github/license/twentyhq/twenty?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/twentyhq/twenty?style=flat-square)

Open-source CRM with a Notion-like UI, built on TypeScript/NestJS/React/PostgreSQL, where objects, views, and workflows are defined as code and shipped like a normal app deploy rather than configured through admin screens.

- **Use case:** Modern, self-hosted or cloud CRM for teams that want code-native customization
- **Stack:** TypeScript, NestJS, React, PostgreSQL, Redis
- **Good to know:** Direct competitor to SuiteCRM — modern stack and UX vs. mature/legacy feature depth

[Full writeup →](/docs/crm/twenty)

---

## VUZA

**[AliRash3ed/VUZA-Free-AI-Video-Creator-and-Pinterest-Video-Scraper](https://github.com/AliRash3ed/VUZA-Free-AI-Video-Creator-and-Pinterest-Video-Scraper)**

![Stars](https://img.shields.io/github/stars/AliRash3ed/VUZA-Free-AI-Video-Creator-and-Pinterest-Video-Scraper?style=flat-square) ![License](https://img.shields.io/github/license/AliRash3ed/VUZA-Free-AI-Video-Creator-and-Pinterest-Video-Scraper?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/AliRash3ed/VUZA-Free-AI-Video-Creator-and-Pinterest-Video-Scraper?style=flat-square)

A free, open-source faceless video creator: AI keyword extraction, multi-source media scraping (including a built-in Pinterest video scraper, plus Pexels/Pixabay), free voiceover, and styled subtitles — positioned as a working $0 alternative to Pictory AI/InVideo AI.

- **Use case:** Generating faceless videos from scripts without paying for stock-footage APIs
- **Stack:** Python (Flask), Playwright, edge-tts, FFmpeg
- **Good to know:** Depends on scraping Pinterest, which can break if Pinterest changes its site

[Full writeup →](/docs/ai/vuza)

---

## Wigolo

**[KnockOutEZ/wigolo](https://github.com/KnockOutEZ/wigolo)**

![Stars](https://img.shields.io/github/stars/KnockOutEZ/wigolo?style=flat-square) ![License](https://img.shields.io/github/license/KnockOutEZ/wigolo?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/KnockOutEZ/wigolo?style=flat-square)

Local-first web search, fetch, crawl, extract, and research MCP server for AI coding agents — no API keys, no cloud, $0 per query for core tools, with explainable scoring and byte-pinned source citations.

- **Use case:** Give any MCP-compatible agent web search/research without a metered API bill
- **Stack:** Node.js, MCP server + REST, on-device rerank/embedding models
- **Good to know:** AGPL-3.0 licensed, public beta; complements browser-control tools like PinchTab

[Full writeup →](/docs/ai/wigolo)

---

## YouTube Automation Agent

**[darkzOGx/youtube-automation-agent](https://github.com/darkzOGx/youtube-automation-agent)**

![Stars](https://img.shields.io/github/stars/darkzOGx/youtube-automation-agent?style=flat-square) ![License](https://img.shields.io/github/license/darkzOGx/youtube-automation-agent?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/darkzOGx/youtube-automation-agent?style=flat-square)

A Node.js dashboard that runs an entire YouTube channel with AI agents — trending-topic discovery, scripting, thumbnails, video production, SEO, scheduled publishing, and analytics — with fallback simulation for any unconfigured step.

- **Use case:** Hands-off, always-on channel operation rather than single-video generation
- **Stack:** Node.js/Express, multi-provider AI (OpenAI/Gemini/OpenRouter/etc.), FFmpeg, SQLite
- **Good to know:** Needs YouTube Data API access via a Google account — more setup than a plain generator script

[Full writeup →](/docs/ai/youtube-automation-agent)

---

## YouTube for AI Agents

**[JCodesMore/youtube-for-ai-agents](https://github.com/JCodesMore/youtube-for-ai-agents)**

![Stars](https://img.shields.io/github/stars/JCodesMore/youtube-for-ai-agents?style=flat-square) ![License](https://img.shields.io/github/license/JCodesMore/youtube-for-ai-agents?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/JCodesMore/youtube-for-ai-agents?style=flat-square)

A Claude Code/MCP plugin that lets an AI agent search, watch, summarize, transcript-navigate, download, and clip YouTube videos conversationally — no API keys needed. Consumption tooling, not a video generator.

- **Use case:** Letting an agent research and extract clips from existing YouTube content inside a coding/agent session
- **Stack:** MCP, youtubei.js, youtube-transcript-plus, ytdlp-nodejs
- **Good to know:** Built on an unofficial YouTube client, so it can break if YouTube changes its internal API

[Full writeup →](/docs/ai/youtube-for-ai-agents)
