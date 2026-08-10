---
title: iFixAi
description: Independent auditing platform that grades whether AI agents actually do what they claim, in under 120 seconds
order: 1
---

# iFixAi

**[ifixai-ai/iFixAi](https://github.com/ifixai-ai/iFixAi)**

## Overview

iFixAi is an independent auditing platform for AI agents. Instead of just measuring technical metrics like latency or token efficiency, it asks a more business-facing question — does this agent actually do what it's supposed to? — and returns a letter-grade (A–F) assessment within about 120 seconds.

## What is it?

A Python CLI/tool that runs 45 inspections across five core pillars (fabrication, manipulation, deception, unpredictability, opacity) plus 11 premium categories, against any HTTP endpoint, bare model API, or custom agent implementation. It supports single-judge or multi-judge (ensemble) grading across different AI providers to reduce single-model bias in the audit itself.

## Why use it?

Most eval/red-teaming/observability tooling for AI agents scores technical properties — injection resilience, latency, token cost — without answering whether the agent is honest or aligned with business/policy goals. iFixAi is positioned to fill that operational-assurance gap: fabrication and deception checks, policy/governance validation, and compliance-oriented checks (EU AI Act, ISO 42001, NIST AI RMF) rather than pure technical benchmarking.

## Installation

```bash
pip install "ifixai[openai]"   # or [anthropic], [gemini], etc.
ifixai setup                    # interactive configuration wizard
ifixai run                      # run a diagnostic
```

## Basic Usage

1. Install with the extras matching your model provider.
2. Run `ifixai setup` to configure provider keys and judge model(s).
3. Point it at your agent (HTTP endpoint, model API, or custom adapter).
4. Choose a suite: smoke (3 tests), strategic (8), core (32), extended (13), or all (45).
5. Review the letter-grade report with per-pillar breakdowns.

## Key Features

- Three execution modes: guided CLI wizard, explicit flags for automation/CI, or an integrated plugin/skill inside agent environments (Claude Code, Codex, Cursor, VS Code, Windsurf, Cline, Continue, Zed)
- 45 inspections across 5 pillars + 11 premium categories
- Letter-grade (A–F) scoring with weighted pillar breakdowns and mandatory minimums
- Multi-judge ensemble grading across different AI providers
- Multiple suite sizes to trade off speed vs. coverage

## Top 5 Use Cases

- Pre-production red-teaming/audit of an AI agent before shipping
- Validating an agent enforces business policy and organizational constraints, not just technical correctness
- Regulatory compliance checks (EU AI Act, ISO 42001, NIST AI RMF) as part of a release process
- CI-integrated agent quality gates using the explicit-flag automation mode
- Comparing agent behavior across model providers via multi-judge grading

## Competitors

- **Eval/red-teaming/observability tools generally** (e.g. Langfuse, promptfoo, Giskard) — typically focused on technical metrics rather than business-outcome/fabrication-deception auditing, which is the gap iFixAi's own docs claim to fill
- **Manual red-teaming / internal QA processes** — slower, less standardized, no letter-grade output

## Pros

- Apache 2.0, fully open source
- Fast turnaround (~120s) makes it usable as a CI gate, not just a one-off audit
- Multi-judge ensemble reduces single-model bias in the grading itself
- Broad provider and IDE/agent-environment integration out of the box

## Cons

- Newer/smaller project — verify grading methodology and pillar weighting match your own risk model before relying on it for compliance claims
- Multi-judge mode means paying for calls to multiple model providers, adding cost
- Letter grades are a simplification — worth reading the underlying pillar breakdown rather than trusting the grade alone
- "Independent auditing" claims are self-reported by the project; no third-party validation of its own scoring accuracy was found

## Resources

- [GitHub Repository](https://github.com/ifixai-ai/iFixAi)
