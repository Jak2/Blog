---
title: Dify
description: Open-source visual platform for building and shipping LLM applications
order: 1
---

# Dify

**[langgenius/dify](https://github.com/langgenius/dify)**

## Overview

Dify is an open-source LLM application development platform combining a visual workflow builder, RAG pipelines, agent tooling, and model management into one system for taking an AI app from prototype to production.

## What is it?

A self-hostable (Docker) or cloud platform with a visual workflow canvas for chaining LLM calls, tools, and logic; a Prompt IDE for crafting and comparing prompts across models; a RAG pipeline for document ingestion/retrieval (PDF, PPT, and more); and agent capabilities via Function Calling and ReAct with 50+ built-in tools. Backend APIs expose everything for integration into existing business systems.

## Why use it?

Hand-wiring an LLM app's prompt chains, retrieval, tool calls, and monitoring from scratch is slow and repetitive across projects. Dify bundles all of that into one visual, production-oriented platform — supporting hundreds of LLMs (GPT, Mistral, Llama3, and any OpenAI-compatible model) so teams aren't locked into a single provider.

## Installation

```bash
git clone https://github.com/langgenius/dify
cd dify/docker
cp .env.example .env
docker compose up -d
```

Requires Docker v2.24.0+, 2+ CPU cores, 4GB+ RAM. Dashboard at `http://localhost/install`.

## Basic Usage

After setup, build an app via the visual workflow canvas — chain prompts, RAG retrieval, and tool calls — then expose it through Dify's backend APIs for integration into an existing product.

## Key Features

- Visual workflow builder for chaining LLM calls, tools, and logic
- RAG pipeline with document ingestion (PDF, PPT, and more)
- Agent capabilities: Function Calling and ReAct with 50+ built-in tools
- Prompt IDE for crafting/comparing prompts across models
- LLMOps: application monitoring and performance analysis
- Supports hundreds of LLMs including OpenAI-compatible endpoints
- Self-hostable via Docker, Kubernetes, Terraform, or Azure DevOps

## Top 5 Use Cases

1. Building a production RAG chatbot without hand-wiring retrieval/generation
2. Prototyping and comparing prompts/models before committing to one
3. Building multi-step LLM agent workflows visually
4. Self-hosting an LLM app platform to avoid vendor lock-in
5. Monitoring and iterating on a deployed LLM app's real-world performance

## Competitors

- **LangChain/LangGraph** — code-first framework, more flexible but no visual builder or hosted ops layer out of the box.
- **Flowise** — similar visual-workflow approach, smaller ecosystem and community than Dify.
- **n8n** — general-purpose automation/workflow tool with AI nodes, vs. Dify's LLM-app-specific focus (RAG, prompt IDE, agent tooling).

## Pros

- Very large, active community (152k+ stars)
- Full stack in one platform — workflow, RAG, agents, monitoring
- Broad model support, not locked to one provider
- Self-hostable for data control

## Cons

- License is a modified Apache 2.0 with additional conditions, not plain Apache — worth reading before certain commercial/resale use
- Self-hosting requires meaningful infra (Docker Compose stack, 4GB+ RAM minimum)
- Visual workflow builder can be less flexible than a code-first framework for complex custom logic

## Resources

- [GitHub Repository](https://github.com/langgenius/dify)
