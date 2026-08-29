---
title: NautilusTrader
description: Rust-native, Python-controlled algorithmic trading engine for multi-asset, multi-venue strategy research and live deployment
order: 1
---

# NautilusTrader

**[nautechsystems/nautilus_trader](https://github.com/nautechsystems/nautilus_trader)**

![Stars](https://img.shields.io/github/stars/nautechsystems/nautilus_trader?style=flat-square) ![License](https://img.shields.io/github/license/nautechsystems/nautilus_trader?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/nautechsystems/nautilus_trader?style=flat-square)

## Overview

NautilusTrader is a Rust-native algorithmic trading engine with Python as the control plane, built so a strategy runs identically in backtesting research and live deployment — no rewrite between the two.

## What is it?

An event-driven trading system: a compiled Rust core handles performance-critical execution while strategies are written in Python (or Rust for max performance), with a deterministic architecture shared across research and production. It supports advanced order types (IOC, FOK, GTC, GTD, DAY, plus contingency orders OCO/OUO/OTO), nanosecond-resolution backtesting across multiple instruments, reinforcement-learning agent training, and a modular adapter architecture connecting 20+ exchanges/data providers — Binance, Coinbase, Kraken, Deribit, Interactive Brokers, Betfair, and DEX platforms like dYdX and Hyperliquid.

## Why use it?

Strategies that behave differently in backtest vs. live trading are a classic and costly failure mode. NautilusTrader's identical event-driven core across both environments removes that gap, while pairing Python's iteration speed for strategy logic with a Rust core (mimalloc, tokio async runtime) for the performance that high-frequency and multi-venue trading demand.

## Installation

```bash
pip install -U nautilus_trader
```

PyPI wheels require no Rust toolchain. Building from source needs rustup, clang, and uv. Requires Rust 1.98.0+ and Python 3.12–3.14; Redis optional for state persistence.

## Basic Usage

Define a strategy in Python against NautilusTrader's event-driven API, backtest it at nanosecond resolution across instruments/venues, then deploy the same strategy live through a supported exchange adapter without changing the strategy code.

## Key Features

- Dual-language: Python for strategy flexibility, Rust for performance-critical core
- Deterministic event-driven architecture identical across research and live trading
- Advanced order types including contingency orders (OCO, OUO, OTO)
- Nanosecond-resolution backtesting across multiple instruments
- Modular adapters for 20+ exchanges/data providers, including crypto DEXs
- Reinforcement-learning agent training support
- High-performance runtime: mimalloc allocator, tokio async

## Top 5 Use Cases

1. Algorithmic trading strategy research with backtest-to-live parity
2. High-frequency trading requiring nanosecond-precision simulation
3. Multi-asset, multi-venue strategy deployment (crypto, equities, forex, derivatives)
4. Machine learning / reinforcement-learning-driven trading systems
5. Connecting one strategy codebase across 20+ exchanges via adapters

## Competitors

- Backtrader / Zipline — pure-Python backtesting frameworks, simpler but without Rust-core performance or guaranteed backtest/live parity.
- QuantConnect (LEAN) — hosted/open-source quant platform with its own ecosystem, vs. NautilusTrader's self-hosted Rust/Python core.
- Freqtrade — crypto-focused, simpler bot framework, vs. NautilusTrader's broader multi-asset, multi-venue scope.
- **[Awesome Quant](/docs/tools/awesome-quant)** — curated directory of quant-finance tooling (NautilusTrader included), not a competing trading engine.

## Pros

- Large, active community (28.1k+ stars, 3.6k+ forks)
- Backtest and live share the same deterministic core — no strategy rewrite for deployment
- Rust performance core with Python ergonomics for strategy code
- Broad venue coverage including major crypto DEXs

## Cons

- LGPL-3.0-only license — different obligations than a permissive MIT/Apache license
- Building from source requires a Rust toolchain (rustup, clang, uv)
- Steeper learning curve than a pure-Python backtesting framework given the dual-language architecture

## Resources

- [GitHub Repository](https://github.com/nautechsystems/nautilus_trader)
