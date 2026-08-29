---
title: DSPy
description: Stanford NLP framework for programming — not prompting — language models, with automatic prompt/weight optimization
order: 1
---

# DSPy

**[stanfordnlp/dspy](https://github.com/stanfordnlp/dspy)**

![Stars](https://img.shields.io/github/stars/stanfordnlp/dspy?style=flat-square) ![License](https://img.shields.io/github/license/stanfordnlp/dspy?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/stanfordnlp/dspy?style=flat-square)

## Overview

DSPy is a Stanford NLP framework for building AI systems by writing structured Python code instead of hand-tuning prompt strings — then automatically optimizing that code's prompts and weights against a metric, rather than manually iterating on wording.

## What is it?

A declarative programming model where classifiers, RAG pipelines, and agent loops are composed from modular Python building blocks. DSPy's optimizers (compilers, in its terminology) search over prompt phrasing and few-shot examples — and can tune model weights — to improve a pipeline's measured performance on a task, replacing brittle hand-written prompts with reusable, testable code grounded in peer-reviewed LM optimization research.

## Why use it?

Hand-tuned prompts are fragile — they drift when you swap models, and improving them means manual trial and error with no systematic feedback loop. DSPy treats prompt/weight tuning as an optimization problem: define the pipeline structure and a metric, and let DSPy's compilers search for what actually improves results, instead of you guessing at phrasing.

## Installation

```bash
pip install dspy
# or latest from main:
pip install git+https://github.com/stanfordnlp/dspy.git
```

## Basic Usage

Define a DSPy module (a Predict/ChainOfThought/ReAct-style component or a composition of them) with typed inputs/outputs, wire modules into a pipeline, then run a DSPy optimizer against labeled examples and a metric to automatically improve the pipeline's prompts.

## Key Features

- Modular composition of classifiers, RAG pipelines, and agent loops in Python
- Automatic prompt optimization ("compiling") against a defined metric
- Support for optimizing model weights, not just prompt text
- Declarative, reusable code in place of brittle hand-written prompt strings
- Research-backed optimization algorithms from peer-reviewed papers
- Works across multiple LM providers

## Top 5 Use Cases

1. Building AI classifiers and NLP pipelines with systematic evaluation
2. Knowledge-intensive question-answering / RAG systems
3. Multi-stage language model programs (retrieve → reason → generate)
4. Automating prompt improvement instead of manual prompt engineering
5. Research and experimentation on LM pipeline optimization techniques

## Competitors

- LangChain/LangGraph — code-first orchestration framework, but manual prompt authoring rather than DSPy's automatic prompt/weight optimization.
- [Dify](/docs/ai/dify) — visual no-code LLM app builder, vs. DSPy's code-first, optimization-driven approach for developers.
- Manual prompt engineering — full control but no systematic, metric-driven improvement loop.

## Pros

- MIT licensed, very large community (37.7k+ stars, 3.3k+ forks)
- Automatic, metric-driven prompt/weight optimization instead of manual tuning
- Modular, testable Python code instead of opaque prompt strings
- Backed by published research on LM program optimization

## Cons

- Steeper conceptual learning curve than writing a prompt directly
- Optimization runs require labeled examples and a defined metric upfront
- Compiled/optimized prompts can be less human-readable than hand-written ones

## Resources

- [GitHub Repository](https://github.com/stanfordnlp/dspy)
- [dspy.ai](https://dspy.ai)
