---
title: OpenAlice
description: Local AI trading workspace that maps trading work onto dev-team tooling — git repos, issue boards, and terminals
order: 1
---

# OpenAlice

**[TraderAlice/OpenAlice](https://github.com/TraderAlice/OpenAlice)**

## Overview

OpenAlice bills itself as "your one-person Wall Street" — a local trading workspace that pairs AI coding agents with financial market tools. Instead of inventing new trading-specific UI paradigms, it reuses infrastructure developers already know: workspaces, git repositories, issue tracking, and persistent terminal sessions.

## What is it?

An experimental, actively-developed platform for running an AI trading agent that covers equities, crypto, commodities, forex, and macro research. It structures trading work as directory-based git repos with persistent terminals, a markdown-backed issue board for tracking work items, a memory graph ("Tracked Entities") for tickers/themes/sectors/theses, and an Inbox for scheduled report delivery. Trading actions themselves are modeled like git operations — staged, committed, and approval-gated before execution.

## Why use it?

Traditional trading terminals (Bloomberg, TradingView, broker apps) don't give an AI agent a structured, versioned, reviewable workflow. OpenAlice's git-like approval gate for trades and issue-tracker-style research organization make it easier to let an AI agent do research and propose trades while a human retains a clear review/approval checkpoint before anything executes — appealing to solo traders or small teams who want an "agent-operable" research and execution loop.

## Installation

Multiple install paths are documented:

- **macOS**: signed desktop app builds
- **Windows**: desktop beta build, or build from source
- **Linux / contributors**: clone the repo and install with `pnpm` (it's a pnpm + Turbo monorepo)
- **Docker**: Compose deployment for an always-on machine
- **Remote**: SSH-based deployment to a remote host

Check the repo README for exact commands, since precise CLI steps weren't fully captured from the fetched summary.

## Basic Usage

1. Set up a workspace (a git-backed directory with a persistent terminal).
2. Ask research questions; the agent pulls market data (equities, crypto, fundamentals, technicals, news).
3. Track entities of interest (tickers, sectors, themes, theses) in the memory graph.
4. Create issues for research/trading tasks and optionally schedule automated runs.
5. Review agent output and reports in the Inbox.
6. Approve staged trades before they execute — trading is modeled as a git-like commit/approval flow.

## Key Features

- Workspaces: directory-based git repos with persistent terminal sessions
- Issue Board: markdown-backed work items with status and scheduling
- Tracked Entities: a memory graph for tickers, themes, sectors, and theses
- Inbox: report delivery and scheduled run output
- Market data coverage: equities, crypto, fundamentals, technical indicators, news
- "Trading as Git": staged, committed, approval-gated trading operations
- Beta broker integrations: Alpaca, IBKR, Longbridge, CCXT

## Top 5 Use Cases

- Solo traders wanting an AI research assistant with persistent memory of their theses
- Building automated, scheduled market research reports across asset classes
- Prototyping AI-agent-driven trading strategies with a human-in-the-loop approval gate
- Multi-asset macro research (equities + crypto + forex + commodities) in one workspace
- Developers/quant hobbyists who want git-native version control over their trading research and decisions

## Competitors

- **QuantConnect / Lean** — algorithmic trading backtesting and live execution framework
- **Freqtrade** — open-source crypto trading bot framework
- **TradingView + Pine Script** — charting and strategy scripting, no native AI agent workflow
- **Bloomberg Terminal / Koyfin** — commercial research terminals, no AI-agent-native workflow
- **AutoGPT / other AI-agent frameworks adapted for finance** — more generic agent tooling without trading-specific structure

## Pros

- Novel "trading as git" model gives a clear, auditable approval gate before execution
- Broad asset-class coverage (equities, crypto, commodities, forex, macro) in one tool
- Persistent memory graph keeps research context across sessions instead of starting from scratch
- Multiple deployment options (desktop, Docker, remote/SSH)
- Beta support for several real brokers (Alpaca, IBKR, Longbridge, CCXT)

## Cons

- Explicitly experimental — the project itself warns not to use it for live trading with real funds unless risks are fully understood
- AGPL-3.0 license is copyleft, which can complicate commercial/closed-source use
- Newer project, so broker integrations are in beta and may be unstable
- Requires comfort with dev tooling (git, pnpm, Docker) — not a plug-and-play consumer trading app
- Financial/market data accuracy and AI-agent trading decisions carry real monetary risk if misused

## Resources

- [GitHub Repository](https://github.com/TraderAlice/OpenAlice)
