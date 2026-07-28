---
title: RAG vs CAG vs KAG vs MAG
description: Comparing the four LLM knowledge-augmentation strategies — retrieval, caching, knowledge graphs, and multi-agent/memory — and when to reach for each.
order: 1
---

# RAG vs CAG vs KAG vs MAG

## Overview

All four acronyms describe ways to give an LLM knowledge it wasn't trained on, without retraining it. They differ in *where* that knowledge lives and *how* it gets into the model's context at inference time.

- **RAG** — Retrieval-Augmented Generation: fetch relevant chunks from an external index (usually a vector DB) per query.
- **CAG** — Cache-Augmented Generation: preload the entire knowledge source into the context window once, and reuse the cached KV-state for every query.
- **KAG** — Knowledge-Augmented Generation: ground generation in a structured knowledge graph instead of (or alongside) unstructured document chunks.
- **MAG** — this term is not standardized. It shows up inconsistently as "Memory-Augmented Generation" (agents with persistent/episodic memory) or "Multi-Agent Generation" (multiple specialized agents collaborating, sometimes each with its own retrieval). Treat any "MAG" claim skeptically and check what the source actually means — unlike RAG/CAG/KAG, it has no single widely-cited definition or reference paper.

**Ambiguity note:** RAG, CAG, and KAG have reasonably consistent definitions across sources (CAG traces to the paper ["Don't Do RAG: When Cache-Augmented Generation is All You Need for Knowledge Tasks"](https://arxiv.org/abs/2412.15605); KAG traces to Ant Group's ["KAG: Boosting LLMs in Professional Domains via Knowledge Augmented Generation"](https://arxiv.org/abs/2409.13731)). MAG has no equivalent anchor paper and is used loosely — some vendors even use it for "Multimodal-Augmented Generation." This doc treats MAG as Memory/Multi-Agent-Augmented Generation, the two most common readings.

## What is each?

### RAG — Retrieval-Augmented Generation
At query time, embed the query, search a vector index (or hybrid keyword+vector index) for the top-k relevant chunks, and stuff those chunks into the prompt alongside the question. The model generates an answer grounded in the retrieved text.

### CAG — Cache-Augmented Generation
Load the entire reference corpus into a long-context model once, and cache the resulting key-value (KV) attention state (via prompt caching, e.g. Anthropic/OpenAI prompt caching or a self-hosted KV cache). Every subsequent query reuses that cache — no retrieval step, no index to maintain. Works only when the corpus is small enough to fit in the context window and is stable enough to make caching worthwhile.

### KAG — Knowledge-Augmented Generation
Ground the model in a structured knowledge graph (entities + relationships) instead of, or in addition to, raw document chunks. Combines graph traversal / logical-form reasoning with LLM generation, so multi-hop questions ("what did X's company's competitor do in Y") can be answered via graph edges rather than hoping the right chunks got retrieved together.

### MAG — Memory/Multi-Agent-Augmented Generation
- **Memory-Augmented Generation**: agents maintain persistent memory (episodic, working, or long-term) across sessions — e.g. remembering prior conversations, decisions, or user preferences, distinct from a one-shot knowledge base.
- **Multi-Agent-Augmented Generation**: multiple specialized agents (each potentially with its own retrieval/tools) collaborate, critique, or hand off sub-tasks, and the final answer is synthesized from that collaboration.

## Why the distinction matters

Picking the wrong one wastes money and latency budget, or ships wrong answers:
- Using RAG for a small, stable knowledge base pays a retrieval-latency tax for no benefit — CAG would answer faster and simpler.
- Using CAG for a large or fast-changing corpus either won't fit in context or requires expensive full-cache invalidation on every update.
- Using RAG (unstructured chunks) for multi-hop relational questions ("who reports to the person who approved X") often fails because the answer isn't in one chunk — KAG's graph traversal handles this natively.
- Treating "MAG" as a settled term in a spec or vendor pitch is a red flag — ask what they actually mean (memory persistence vs. agent orchestration are very different builds).

## How they compare

| Approach | Knowledge store | Strengths | Weaknesses | Best use case |
|---|---|---|---|---|
| RAG | Vector/hybrid index, updated incrementally | Scales to huge, frequently-changing corpora; cheap to update | Retrieval latency per query; irrelevant/missed chunks hurt quality; index maintenance overhead | Large, fast-moving knowledge bases (docs, support tickets, news) |
| CAG | Full corpus cached in context (KV cache) | Very low per-query latency after first load; simpler architecture, no index | Bounded by context window size; cache invalidation needed on any corpus change; not cost-effective for huge or volatile data | Small-to-medium, stable reference material (product manuals, policy docs, a fixed codebase) |
| KAG | Knowledge graph + optional chunk index | Strong multi-hop reasoning; explicit entity relationships reduce hallucination; auditable reasoning paths | Requires building/maintaining a graph (upfront cost); more complex pipeline than RAG | Professional/regulated domains needing precise relational reasoning (legal, medical, finance) |
| MAG (memory) | Persistent agent memory store | Personalization, continuity across sessions | Memory drift, staleness, privacy/retention concerns | Long-running assistants, personal agents |
| MAG (multi-agent) | Distributed across specialized agents | Parallelizes complex tasks, specialization improves per-subtask quality | Coordination overhead, harder to debug, higher cost (multiple LLM calls) | Complex workflows needing division of labor (research + writing + fact-checking agents) |

## Basic Usage

- **RAG**: embed docs → store in vector DB (Pinecone, Chroma, pgvector) → on query, embed + similarity-search → inject top-k into prompt → generate.
- **CAG**: concatenate corpus into one long prompt → call the model once with prompt caching enabled → subsequent queries reuse the cached prefix, appending only the new question.
- **KAG**: build/import a knowledge graph (Neo4j, or frameworks like Ant Group's OpenSPG) → at query time, resolve entities, traverse relevant subgraph, optionally combine with chunk retrieval → generate with graph facts as grounding.
- **MAG (memory)**: after each interaction, write a summary/fact to a memory store (vector DB, key-value store, or structured log) → on the next session, retrieve relevant memories and inject into context.
- **MAG (multi-agent)**: define agent roles and a coordinator (LangGraph, CrewAI, AutoGen, or hand-rolled) → coordinator routes sub-tasks to agents → agent outputs are merged/critiqued into a final response.

## Key Features

- **RAG**: dynamic freshness, scalable index, works with any corpus size, supports citations back to source chunks.
- **CAG**: near-zero query latency after cache warms, no retrieval infra, deterministic context (nothing missed by a bad similarity search).
- **KAG**: relational/multi-hop reasoning, structured facts reduce hallucination, graph is inspectable/auditable.
- **MAG (memory)**: continuity across sessions, personalization, can combine short-term (working) and long-term memory.
- **MAG (multi-agent)**: task decomposition, specialization, self-critique loops between agents.

## Top 5 Use Cases

1. **Enterprise document Q&A over a large, changing corpus** → RAG.
2. **Customer-support bot answering from a fixed, small product manual** → CAG.
3. **Legal/medical assistant needing precise entity-relationship reasoning** → KAG.
4. **Personal assistant that remembers your preferences across weeks** → MAG (memory).
5. **Research pipeline where one agent searches, one drafts, one fact-checks** → MAG (multi-agent), often combined with RAG or KAG per sub-agent.

## Competitors / Alternatives

- **Fine-tuning**: bake knowledge into model weights instead of prompting it in — best for stable, deeply-integrated behavior, worst for frequently-changing facts.
- **Long-context prompting without caching**: simplest option, but pays full compute cost every call (CAG is the caching optimization of this).
- **Hybrid RAG+KAG**: retrieve chunks AND traverse a graph, common in production systems that need both breadth and relational precision.
- **Tool-use/function-calling**: instead of pre-loaded knowledge, let the model call live APIs/databases at query time — good when data must be real-time and can't be pre-indexed at all.

## Pros

- **RAG**: scales to any corpus size; knowledge updates without retraining; supports source citations.
- **CAG**: fast, simple, no index infra, deterministic context inclusion.
- **KAG**: best-in-class multi-hop/relational accuracy; reduces hallucination via structured facts.
- **MAG**: enables personalization (memory) or complex task decomposition (multi-agent) that single-shot RAG/CAG/KAG can't do alone.

## Cons

- **RAG**: retrieval quality is a bottleneck (missed/irrelevant chunks); added latency and infra to maintain.
- **CAG**: hard context-window ceiling; cache must be rebuilt on corpus change; not viable for huge or volatile data.
- **KAG**: upfront graph-construction cost; more moving parts than plain RAG; graph quality directly bounds answer quality.
- **MAG**: memory can drift/go stale and raises privacy questions; multi-agent adds coordination complexity, cost, and failure surface.

## Resources

- [Don't Do RAG: When Cache-Augmented Generation is All You Need for Knowledge Tasks (arXiv)](https://arxiv.org/abs/2412.15605)
- [KAG: Boosting LLMs in Professional Domains via Knowledge Augmented Generation (arXiv)](https://arxiv.org/abs/2409.13731)
- [RAG vs CAG vs KAG: The AI Architecture Decision Every Tech Leader Will Face in 2026 (NovelVista)](https://www.novelvista.com/blogs/ai-and-ml/rag-cag-kag-comparison-for-enterprise-ai)
- [RAG vs CAG: Choosing Cache-Augmented Generation in 2026 (FutureAGI)](https://futureagi.com/blog/rag-vs-cag-cache-augmented-generation-2026/)
- [RAG vs KAG: Comparison and Differences (Plain Concepts)](https://www.plainconcepts.com/rag-vs-kag/)
- [What is Knowledge Augmented Generation (KAG)? (Portkey)](https://portkey.ai/blog/what-is-knowledge-augmented-generation/)
- [GitHub — hhhuang/CAG reference implementation](https://github.com/hhhuang/CAG)
