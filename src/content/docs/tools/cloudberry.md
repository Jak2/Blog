---
title: Apache Cloudberry
description: Open-source MPP data warehouse database, evolved from Pivotal Greenplum, for large-scale analytics and AI/ML workloads
order: 1
---

# Apache Cloudberry

**[apache/cloudberry](https://github.com/apache/cloudberry)**

![Stars](https://img.shields.io/github/stars/apache/cloudberry?style=flat-square) ![License](https://img.shields.io/github/license/apache/cloudberry?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/apache/cloudberry?style=flat-square)

## Overview

Apache Cloudberry is an open-source massively parallel processing (MPP) database for data warehousing and large-scale analytics, evolved from Pivotal Greenplum Database — built on a newer PostgreSQL kernel and positioned as an open alternative to proprietary MPP warehouses.

## What is it?

A distributed, PostgreSQL-kernel-based database engineered for OLAP and data-warehouse workloads at scale, with support for AI/ML pipeline infrastructure alongside traditional analytics. It's currently an Apache Incubator project (not yet a fully endorsed top-level ASF project), with a growing ecosystem of related repos — backup utilities, Go client libraries, and PXF (Platform Extension Framework) connectors for external data sources.

## Why use it?

Proprietary MPP data warehouses lock you into vendor pricing and licensing for large-scale analytics. Cloudberry inherits Greenplum's mature MPP architecture on a newer PostgreSQL base, under the Apache 2.0 license — giving teams a self-hostable, open path to distributed OLAP without a commercial license, plus the PostgreSQL ecosystem's tooling and SQL compatibility.

## Installation

Docker-based sandbox environments available for quick testing; source builds documented for Linux (RHEL/Rocky/Ubuntu) and macOS.

```bash
# Docker sandbox — see repo docs for exact compose/setup steps
git clone https://github.com/apache/cloudberry
```

## Basic Usage

Deploy via the Docker sandbox for evaluation or build from source for production, connect via standard PostgreSQL clients/drivers, and load data through PXF connectors or native ingestion for distributed OLAP querying.

## Key Features

- Massively parallel processing architecture for distributed query execution
- Built on a newer PostgreSQL kernel with enterprise capabilities
- Data warehouse and OLAP functionality at scale
- Support for AI/ML workload infrastructure, not just traditional BI
- Ecosystem: backup utilities, Go libraries, PXF connectors for external data
- Cross-platform: Linux and macOS

## Top 5 Use Cases

1. Enterprise data warehousing without proprietary licensing costs
2. Large-scale analytics/OLAP querying across distributed data
3. AI/ML pipeline infrastructure needing a scalable analytical backend
4. Migrating off Greenplum to an actively developed open-source successor
5. Connecting external data sources via PXF for federated analytics

## Competitors

- Greenplum — Cloudberry's proprietary/commercial predecessor and namesake lineage, vs. Cloudberry's fully open Apache 2.0 governance.
- ClickHouse — columnar OLAP database with strong single-query performance, different architecture than Cloudberry's PostgreSQL-based MPP model.
- Snowflake/BigQuery — managed cloud data warehouses, vs. Cloudberry's self-hosted, open-source model.

## Pros

- Apache 2.0 licensed — fully open, no proprietary licensing costs
- Inherits Greenplum's mature MPP architecture on a modern PostgreSQL base
- PostgreSQL compatibility brings existing tooling/driver ecosystem
- Growing connector ecosystem (PXF) for external data integration

## Cons

- Apache Incubator status — not yet a fully endorsed top-level ASF project
- Smaller community (1.4k+ stars) than established managed warehouses
- Self-hosted MPP clusters require real operational/infrastructure investment

## Resources

- [GitHub Repository](https://github.com/apache/cloudberry)
