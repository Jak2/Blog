---
title: turbovec
description: Rust vector search index using TurboQuant quantization for extreme memory compression at FAISS-beating speed
order: 1
---

# turbovec

**[RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec)**

## Overview

turbovec is a high-performance vector search index that implements Google Research's TurboQuant quantization algorithm. It compresses embedding vectors aggressively (down to 2-4 bits per dimension) to shrink memory footprint while keeping search speed and accuracy competitive with — and, per the project's own benchmarks, faster than — FAISS.

## What is it?

A Rust core with Python bindings (via maturin) implementing a data-oblivious quantizer with per-coordinate calibration, hand-optimized SIMD search kernels (NEON on ARM, AVX-512/AVX2 on x86), online ingestion (no training phase), incremental persistence, and runtime filtered search.

## Why use it?

Vector search at scale is usually memory-bound: a 31GB float32 embedding corpus needs 31GB of RAM to search quickly. turbovec claims to fit that same corpus into ~4GB via quantization while still searching faster than FAISS, and does it without a separate training step — vectors are indexed the moment they're added, which matters for privacy-focused or local-only RAG systems that can't ship data to a hosted vector DB.

## Installation

```bash
pip install turbovec
```

## Basic Usage

```python
import turbovec

index = turbovec.Index(dim=768, bits=4)
index.add(vector_id, embedding)
results = index.search(query_embedding, k=10)
index.sync()  # persist incremental changes
```

(Check the repo for the exact current API surface — this is illustrative based on the documented feature set.)

## Key Features

- TurboQuant quantization: 2-bit or 4-bit compression per dimension
- Online ingestion — no training phase, index immediately
- Hand-optimized SIMD kernels: NEON (ARM), AVX-512/AVX2 (x86), scalar fallback
- Incremental `sync()` persistence — only changed data is written
- Runtime filtered search (allowlist filtering inside the SIMD kernel)
- Fully local — no external services, no data transmission

## Top 5 Use Cases

- Privacy-focused RAG systems that must keep embeddings entirely local
- Memory-constrained environments running large vector corpora
- Low-latency search where FAISS-level or better throughput matters
- Systems needing stable vector IDs that survive deletions
- Prototyping vector search without standing up a managed vector database

## Competitors

- **FAISS** — the established baseline; turbovec's own benchmarks claim it's slower and requires a separate training phase
- **turboquant-py** — a community reimplementation of the same underlying algorithm
- **Managed vector DBs (Pinecone, Weaviate, Qdrant, etc.)** — solve the same retrieval problem but require running/paying for external infrastructure, the opposite of turbovec's local-only design

## Pros

- MIT licensed, permissive for any use
- Dramatic memory reduction (reported ~8x) without giving up search speed
- No training step — simpler operational model than most quantized indexes
- Rust core with real SIMD optimization, not just a Python wrapper around a naive algorithm

## Cons

- Newer, smaller project — check open issues and commit recency before depending on it in production
- Quantization is inherently lossy; accuracy tradeoffs should be validated against your own recall requirements
- Python bindings only for now — no documented bindings for other languages
- Being single/small-team maintained, bus factor and long-term support are unproven

## Resources

- [GitHub Repository](https://github.com/RyanCodrai/turbovec)
