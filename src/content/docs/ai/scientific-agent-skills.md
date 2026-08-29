---
title: Scientific Agent Skills
description: 163 validated agent skills turning AI coding agents into research assistants across biology, chemistry, and medicine
order: 1
---

# Scientific Agent Skills

**[K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)**

![Stars](https://img.shields.io/github/stars/K-Dense-AI/scientific-agent-skills?style=flat-square) ![License](https://img.shields.io/github/license/K-Dense-AI/scientific-agent-skills?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/K-Dense-AI/scientific-agent-skills?style=flat-square)

## Overview

Scientific Agent Skills is an open-source library of 163 validated skills that turn AI coding agents into research assistants — covering bioinformatics, cheminformatics, clinical research, and machine learning workflows across genomics, drug discovery, proteomics, and more.

## What is it?

A skills library unifying access to 100+ scientific databases (PubChem, ChEMBL, UniProt, ClinicalTrials.gov, NCBI, PDB, Ensembl, FDA, and more) behind a single lookup interface, plus 70+ optimized skills wrapping specialized Python packages (RDKit, Scanpy, PyTorch Lightning, BioPython, DeepChem, PyMC, GeoPandas). Compatible with Cursor, Claude Code, Codex, and Google Antigravity via the open Agent Skills standard, distributed as a portable plugin package (`plugin.json` root + `skills/` directory). Notable capabilities include individual-level querying of the 1000 Genomes cohort, live pathogen surveillance, regulatory genomics predictions, and full-text access to an 11M+ paper corpus via Paperclip.

## Why use it?

Scientific research workflows span dozens of specialized databases and libraries, each with its own API quirks — a general-purpose coding agent doesn't know ChEMBL's query syntax or how to call Scanpy correctly out of the box. This library packages that domain expertise as installable skills, so an agent can run a real bioinformatics/cheminformatics workflow instead of guessing at library usage from training data alone.

## Installation

```bash
# via npx
npx skills add K-Dense-AI/scientific-agent-skills

# via GitHub CLI
gh skill install K-Dense-AI/scientific-agent-skills
```

Manual install for plugin clients: symlink the repo into `~/.cursor/plugins/local/` or the equivalent host directory.

## Basic Usage

Install the skill bundle into a supported agent (Cursor, Claude Code, Codex, Antigravity), then ask the agent to perform a domain task (e.g. "run ADMET prediction on this compound" or "pull variant annotations for this gene") — the relevant skill handles the database/library interaction.

## Key Features

- 163 ready-to-use skills across bioinformatics, cheminformatics, clinical research, ML
- 100+ scientific databases unified behind one lookup interface
- 70+ optimized skills for specialized Python packages (RDKit, Scanpy, PyTorch Lightning, etc.)
- Multi-domain: genomics, drug discovery, proteomics, medical imaging, materials science, geospatial
- Agent Skills standard compatibility (Cursor, Claude Code, Codex, Antigravity)
- Weekly security scanning (Cisco AI Defense Skill Scanner) with a published security report

## Top 5 Use Cases

1. Drug discovery: virtual screening, lead optimization, ADMET prediction
2. Genomics analysis: RNA-seq, single-cell, variant annotation, population queries
3. Clinical research: trial landscape analysis, evidence review, PK/PD modeling
4. Multi-omics integration across transcriptomics/proteomics/metabolomics
5. Literature review and evidence-traceable scientific writing

## Competitors

- [Anthropic Skills](/docs/ai/anthropic-skills) — official general-purpose skill catalog, vs. this repo's deep domain-specific scientific focus.
- Manual API/library integration — full control but requires re-implementing database access and query logic per project.

## Pros

- MIT licensed, large adoption (37.8k+ stars, 3.6k+ forks, 190k+ active users)
- Deep, validated domain coverage rather than shallow API wrappers
- Weekly security scanning with a public security report
- Broad agent-platform compatibility via the open Agent Skills standard

## Cons

- Individual skills may carry different licenses — review per-skill metadata before use
- Domain breadth (163 skills) means evaluating which apply to your specific research question takes some navigation
- Scientific/regulatory workflows still require expert review — skills automate access, not judgment

## Resources

- [GitHub Repository](https://github.com/K-Dense-AI/scientific-agent-skills)
