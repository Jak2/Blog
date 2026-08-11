---
title: book-to-skill
description: Converts books/docs into on-demand-loading agent skills instead of context-dumping
order: 1
---

# book-to-skill

**[virgiliojr94/book-to-skill](https://github.com/virgiliojr94/book-to-skill)**

## Overview

book-to-skill converts a technical book, document, or knowledge source (PDF, EPUB, DOCX, HTML, RTF, MOBI, plain text) into a structured agent skill — mental models, per-chapter reference files, a glossary, patterns, and cheat sheets — instead of just dumping the whole document into an agent's context window.

## What is it?

A skill/converter for Claude Code, GitHub Copilot CLI, and Amp. It extracts and restructures a source document into modular files the agent can load on demand: only pull in the chapter/section actually relevant to the current question, rather than paying context/token cost for the entire book every time.

## Why use it?

Dumping a whole PDF into context to answer one question is expensive and imprecise — most of the tokens are irrelevant to the actual query. book-to-skill's chapter-level structure lets an agent fetch just what's needed, reporting 24-51x fewer tokens spent versus raw context-dumping for a single-question lookup.

## Installation

```bash
git clone https://github.com/virgiliojr94/book-to-skill.git ~/.claude/skills/book-to-skill
```

## Basic Usage

```bash
/book-to-skill <path|folder|glob> [skill-name]
```

Point it at a book, folder, or glob of documents; it generates the skill files, which the agent then loads on demand during future sessions.

## Key Features

- Multi-format input: PDF, EPUB, DOCX, HTML, RTF, MOBI, plain text
- Generates modular skill output: mental models, chapter files, glossary, cheat sheets
- On-demand chapter loading instead of full-document context dumps
- Fully local processing — no upload to external services
- Works with technical books, internal docs, design systems, research collections

## Top 5 Use Cases

1. Turning a reference textbook into a queryable Claude Code skill
2. Converting internal documentation into agent-accessible knowledge without re-reading it every session
3. Building a design-system or style-guide skill an agent can consult on demand
4. Cutting token spend on repeated Q&A against the same long document
5. Bootstrapping a research-paper collection into structured, per-topic agent skills

## Competitors

- Raw context-dumping (pasting/attaching the whole PDF) — the default, no-tooling approach this project is built to beat on token cost.
- Generic document Q&A / RAG systems — more general-purpose but not tailored to the Claude Code/Copilot CLI/Amp skill format specifically.

## Pros

- Large, measured token savings for repeated queries against the same source
- Local-only processing — no data leaves the machine
- Broad format support
- MIT licensed, free to use/modify

## Cons

- Conversion quality depends on how cleanly the source document's structure extracts (scanned/poorly-formatted PDFs may parse worse)
- Skill format is specific to a few agent tools (Claude Code, Copilot CLI, Amp) — not a universal RAG solution
- One-time conversion step adds friction versus just attaching a file

## Resources

- [GitHub Repository](https://github.com/virgiliojr94/book-to-skill)
