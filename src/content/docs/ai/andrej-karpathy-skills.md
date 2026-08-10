---
title: Andrej Karpathy Skills
description: A single CLAUDE.md file distilling Andrej Karpathy's observations on LLM coding pitfalls into four actionable principles.
order: 1
---

# Andrej Karpathy Skills

**[multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)**

## Overview

Not a tool or library — a single `CLAUDE.md` (plus a `.cursor/rules/` variant) that encodes four behavioral guidelines for coding agents, derived from a widely-shared [X post by Andrej Karpathy](https://x.com/karpathy/status/2015883857489522876) diagnosing common LLM coding failure modes.

## What is it?

A prompt/instructions file you drop into a project (or install as a Claude Code plugin) that steers the agent toward: surfacing assumptions instead of silently guessing, writing minimal code instead of over-engineering, making surgical edits instead of drive-by refactors, and working toward verifiable success criteria instead of vague imperative instructions. It's config, not code — there's no runtime component.

## Why use it?

Karpathy's post named four recurring LLM-agent failure patterns: unfounded assumptions run silently, bloated/overcomplicated code, unrelated code changed as a side effect, and no clear definition of "done." This repo turns each into a concrete rule an agent can be instructed to follow, so you don't have to re-write the same guardrails in every project's instructions file.

## Installation

**Option A — Claude Code plugin:**
```bash
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

**Option B — per-project `CLAUDE.md`:**
```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
# or append to an existing file:
echo "" >> CLAUDE.md
curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md
```

**Option C — Cursor:** the repo ships a committed `.cursor/rules/karpathy-guidelines.mdc` rule file; see `CURSOR.md` in the repo for setup.

Note: the README's install commands point at `raw.githubusercontent.com/forrestchang/...` rather than `multica-ai/...` — this repo (under the `multica-ai` org) appears to be a fork/republish of forrestchang's original; the content is otherwise identical to what's documented here. Another republish exists under [swarmclawai/andrej-karpathy-skills](https://github.com/swarmclawai/andrej-karpathy-skills), with an added CLI that adapts the same guidelines to 40+ agent tool formats — same content, more distribution options.

## Basic Usage

There's nothing to "run" — merge the guidelines into your project's `CLAUDE.md` (or equivalent agent-instructions file) alongside your own project-specific rules. The agent then applies the four principles automatically on every task in that project.

## Key Features

- **Think Before Coding** — state assumptions explicitly, present multiple interpretations when ambiguous, push back on overcomplex asks, stop and ask when genuinely confused.
- **Simplicity First** — minimum code for what was asked; no speculative abstractions, flexibility, or error handling for impossible cases.
- **Surgical Changes** — touch only what the task requires; don't refactor or "improve" adjacent code; match existing style; only clean up dead code your own change created.
- **Goal-Driven Execution** — convert vague asks ("fix the bug") into verifiable goals ("write a failing test, then make it pass") so the agent can loop to a checkable finish line.
- Designed to be merged with, not replace, project-specific instructions.

## Top 5 Use Cases

1. Bootstrapping a new project's `CLAUDE.md`/agent-instructions file with sane defaults instead of writing guardrails from scratch.
2. Reining in an agent that has been over-engineering or scope-creeping on a codebase.
3. Standardizing behavior across a team's multiple repos via the Claude Code plugin install.
4. Getting the same discipline in Cursor via the bundled `.mdc` rule.
5. Using it as a template/reference for writing your own house style of agent instructions.

## Competitors

- Hand-written project `CLAUDE.md`/`AGENTS.md` instructions (the default, no-dependency alternative — this repo just gives you a well-tested starting point).
- Other community "agent constitution" style prompt repos (various `AGENTS.md` templates circulating on GitHub).
- Built-in agent guardrails/system prompts from the tool vendor itself (less customizable, but zero setup).

## Pros

- Zero runtime cost — it's a static instructions file, not a dependency or service.
- Addresses well-known, specific failure modes rather than vague "be careful" advice.
- Easy to install (plugin, curl, or manual copy) and easy to merge with existing instructions.
- MIT-licensed per the README.

## Cons

- Effectiveness depends entirely on the underlying model actually following instructions consistently — it's guidance, not enforcement.
- Repo's install commands reference a different GitHub org (`forrestchang`) than the one hosting this fork (`multica-ai`), which is worth double-checking before relying on the plugin marketplace command as written.
- GitHub's API reports no machine-detected license file even though the README claims MIT — verify licensing before redistributing.
- No test suite or way to verify the guidelines are "installed correctly" beyond checking the file's presence.

## Resources

- [Repository](https://github.com/multica-ai/andrej-karpathy-skills)
- [Original Karpathy X post on LLM coding pitfalls](https://x.com/karpathy/status/2015883857489522876)
- [Companion project: Multica — platform for running/managing coding agents with reusable skills](https://github.com/multica-ai/multica)
