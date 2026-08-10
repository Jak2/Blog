# Adding a GitHub repo to this blog

Instructions for any AI agent (Claude, Cursor, Copilot, etc). When the user
gives a GitHub repo link and asks to add it to the blog, do the following:

## 0. Check for duplicates/forks first

Before adding anything, grep `src/content/docs/github/repos.md` for the repo
name and any known aliases. If it's a fork or republish of a project already
listed (same content under a different org/user — check the README's install
commands/attribution for the giveaway), do NOT create a new entry or page.
Instead, fold a one-line mention of the new fork into the existing repo's
page (e.g. in its Installation or Overview section) and skip steps 2-3.

## 1. Research the repo

Fetch the repo's README/description, license, primary language, and enough
context to write an honest, useful summary — not marketing copy. Note what
it competes with and its real tradeoffs.

## 2. Add a short entry to `src/content/docs/github/repos.md`

Match the existing entry format in that file: heading, repo link, shields.io
badges (stars/license/last-commit), one-paragraph description, bullet list
(`Use case`, `Stack`, `Good to know`), separated by `---`.

Add a link to the full writeup at the end of the entry, e.g.:
`[Full writeup →](/docs/<category>/<repo-slug>)`

## 3. Create a full dedicated page for the repo

Path: `src/content/docs/<category>/<repo-slug>.md`

- Infer the category folder from what the repo actually does. Reuse an
  existing category folder (`ai/`, `google/`, `tools/`, `github/`, etc.) if
  it fits; create a new one only if nothing fits.
- Create the folder if it doesn't exist yet — no need to ask.
- Use `slug-case` for the filename (lowercase, hyphens).
- Follow the exact structure of `src/content/docs/ai/openalice.md` as the
  reference template:

```markdown
---
title: <Repo/Project Name>
description: <one-line description>
order: 1
---

# <Repo/Project Name>

**[owner/repo](https://github.com/owner/repo)**

## Overview

## What is it?

## Why use it?

## Installation

## Basic Usage

## Key Features

## Top 5 Use Cases

## Competitors

## Pros

## Cons

## Resources

- [GitHub Repository](https://github.com/owner/repo)
```

## 3.5. Add comparisons

For every repo added, check whether it has direct competitors/alternatives —
either named explicitly by the user, or ones you notice yourself (same
problem space: CRM, LLM routing, video generation, etc).

- Add a `## Comparison` section (or extend `## Competitors`) in the new
  repo's page listing those alternatives with a one-line differentiator each.
- **Update the existing pages of those alternatives too**, adding a mention
  of the new repo back — comparisons should be bidirectional. E.g. adding
  Twenty CRM should update SuiteCRM's page to mention Twenty, and vice versa.
- Do this for every future repo added, not just when explicitly asked.

## 3.6. Keep sorted files sorted

`autosort.config.json` (project root) lists md files whose `##` sections get
auto-sorted alphabetically/numerically. If you edited a file listed there
(e.g. `src/content/docs/github/repos.md`), run `npm run sort` afterward
instead of manually ordering entries. Add a file's path to that config's
`files` array to opt it into autosorting.

## 4. Do not push to git

Commit locally only if explicitly asked. The user pushes changes themselves.

## 5. Report back

List: the short entry added to `repos.md`, and the new file path created.
