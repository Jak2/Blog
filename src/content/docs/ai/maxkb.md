---
title: MaxKB
description: Open-source platform for building enterprise-grade RAG chatbots and agentic workflows with MCP tool-use support
order: 1
---

# MaxKB

**[1Panel-dev/maxkb](https://github.com/1Panel-dev/maxkb)**

## Overview

MaxKB ("Max Knowledge Brain") is an open-source, enterprise-oriented platform for building RAG-powered chatbots and agentic workflows. Built by the team behind 1Panel, it combines document ingestion/RAG pipelines, a visual workflow engine, and MCP tool-use, and is commonly deployed for intelligent customer service, internal knowledge bases, academic research, and education.

## What is it?

A Django (Python) backend + Vue.js frontend application backed by PostgreSQL with pgvector, distributed as a single Docker container. It lets you upload or crawl documents, automatically chunks and vectorizes them for retrieval-augmented Q&A, and layers a workflow engine and function library on top so you can orchestrate more complex agent behavior (not just single-turn Q&A) and expose/consume MCP tools. It's model-agnostic, supporting both private models (DeepSeek, Llama, Qwen) and hosted APIs (OpenAI, Claude, Gemini), with native multi-modal text/image/audio/video support.

## Why use it?

Teams that want a self-hosted, GPL-licensed knowledge-base chatbot with minimal setup — a single `docker run` gets a working RAG chatbot with an admin UI — without adopting a heavier general-purpose LLM app framework like LangChain directly, or a more workflow-centric platform like Dify. Its "zero-coding" integration path is aimed at quickly bolting Q&A capability onto existing business systems.

## Installation

```bash
docker run -d --name=maxkb --restart=always -p 8080:8080 \
  -v ~/.maxkb:/var/lib/postgresql/data \
  -v ~/.python-packages:/opt/maxkb/app/sandbox/python-packages \
  1panel/maxkb
```

Access the web UI at `http://your_server_ip:8080` with default credentials `admin` / `MaxKB@123..` (change immediately after first login).

## Basic Usage

1. Log in to the web UI and create a knowledge base.
2. Upload documents or point it at online sources to crawl; MaxKB auto-splits and vectorizes the content.
3. Create an application/agent that references the knowledge base and pick an LLM (local or hosted).
4. Use the workflow engine to add branching logic, function calls, or MCP tool-use for more complex tasks.
5. Embed the resulting chatbot into an existing system via the provided integration options.

## Key Features

- RAG pipeline: document upload/crawling, automatic chunking, vectorization, hallucination reduction
- Agentic workflow engine with a function library and MCP tool-use
- Zero-coding integration into third-party business systems
- Model-agnostic: private models (DeepSeek, Llama, Qwen) and hosted APIs (OpenAI, Claude, Gemini)
- Native multi-modal input/output: text, image, audio, video
- Single-container Docker deployment with an offline-install path for restricted networks
- SSO/access control available in the Pro tier

## Top 5 Use Cases

- Self-hosted customer-service chatbot grounded in company documentation
- Internal enterprise knowledge base with cited Q&A
- Academic research assistants over a curated document set
- Educational Q&A tools deployed on-premise for data-privacy reasons
- Quickly bolting a RAG chatbot onto an existing system via its zero-coding integration

## Competitors

- **LangChain** — a code-first framework MaxKB is itself built upon; no out-of-the-box UI or workflow engine
- **Dify.AI** — comparable workflow/RAG/agent platform with SSO and stronger observability; more feature-complete per MaxKB's own comparison table
- **Flowise** — visual LLM app builder with RAG support but no built-in agent or observability layer
- **[LobeHub](/docs/ai/lobehub)** — broader multi-agent "operations" platform rather than a focused RAG/knowledge-base chatbot
- **[SurfSense](/docs/ai/surfsense)** — overlaps on the knowledge-base/RAG side, but SurfSense's differentiator is live web-research connectors rather than enterprise workflow/customer-service deployment

## Pros

- Very fast time-to-working-chatbot (single Docker command)
- Broad model support including fully private/local models
- Native multi-modal support out of the box
- Built on well-understood, stable stack (Django, PostgreSQL/pgvector, LangChain)
- Active project with high adoption (Trendshift-featured, large Docker pull count)

## Cons

- GPLv3 license — copyleft, which can complicate closed-source/commercial redistribution
- SSO/access control gated behind the Pro tier per its own feature comparison
- Less workflow-orchestration depth than Dify per the project's own comparison table
- Default admin credentials must be changed manually — a footgun if deployment is rushed
- Primarily documented for RAG/chatbot use cases; less suited to general multi-agent orchestration than LobeHub

## Resources

- [GitHub Repository](https://github.com/1Panel-dev/maxkb)
- [Documentation](https://maxkb.cn/docs/)
