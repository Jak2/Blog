---
title: Databasement
description: Self-hosted database backup manager with a web UI — schedule, back up, and restore MySQL, PostgreSQL, MongoDB, SQL Server, SQLite, Redis and more
order: 1
---

# Databasement

**[David-Crty/databasement](https://github.com/David-Crty/databasement)**

## Overview

Databasement is a modern, self-hosted database backup management application. It gives teams a single web UI to schedule, run, monitor, and restore backups across MySQL, PostgreSQL, MariaDB, Microsoft SQL Server, MongoDB, SQLite, Firebird, and Redis/Valkey — instead of stitching together `cron` jobs and ad-hoc dump scripts per database engine.

## What is it?

A single Docker container (built-in web server, queue worker, and scheduler) that manages database backup jobs end to end: connect to a server (including through an SSH tunnel or a remote agent for firewalled networks), configure a schedule and retention policy, choose storage (local, S3-compatible, Azure Blob, Samba/SMB, SFTP/FTP), and monitor job status with failure notifications to Slack, Discord, Telegram, and more.

## Why use it?

Most teams handle database backups with scattered shell scripts, one per engine, with no shared UI, retention policy, or alerting. Databasement centralizes this: one interface for every supported database engine, GFS or time-based retention, cross-server restore (prod → staging), and multi-tenant RBAC for teams — while staying self-hosted so backup data and credentials never leave your infrastructure.

## Installation

Quick start with Docker:

```bash
docker run -d \
  --name databasement \
  -p 2226:2226 \
  -e DB_CONNECTION=sqlite \
  -e DB_DATABASE=/data/database.sqlite \
  -e ENABLE_QUEUE_WORKER=true \
  -v ./databasement-data:/data \
  davidcrty/databasement:1
```

Then open `http://localhost:2226` and create the first admin account. Docker Compose, Kubernetes + Helm, and native Ubuntu installs are also documented for production deployments.

## Basic Usage

1. Deploy the container and create an admin account.
2. Add a database server connection (direct, via SSH tunnel, or via a remote agent for isolated networks).
3. Configure a backup schedule (daily/weekly) and retention policy (time-based or GFS).
4. Pick a storage backend (local, S3, Azure Blob, Samba, SFTP/FTP).
5. Monitor jobs in real time and get notified on failure; restore to the same or a different server when needed.

## Key Features

- Multi-database support: MySQL, PostgreSQL, MariaDB, SQL Server, MongoDB, SQLite, Firebird, Redis/Valkey
- SSH tunnel and remote-agent support for firewalled/isolated database networks
- Scheduled backups with flexible retention (time-based or GFS)
- Cross-server and scheduled restores (e.g. nightly prod → staging refresh)
- Multiple compression options: gzip, zstd, or AES-256 encrypted
- Built-in Adminer data browser for inspecting supported databases
- Multi-tenant orgs, RBAC, OAuth/SSO login, optional 2FA
- REST API and MCP server for scripting, CI/CD, and AI-assistant-driven backup management

## Top 5 Use Cases

- Centralizing backup management across a stack that mixes MySQL, PostgreSQL, MongoDB, etc.
- Backing up databases in firewalled/private networks via the remote agent, without opening inbound ports
- Automating a nightly prod → staging database refresh via scheduled restores
- Self-hosted, compliance-friendly alternative to SaaS backup services (data and credentials stay in-house)
- Letting AI coding agents manage backups/restores via the MCP server as part of ops workflows

## Competitors

- **pgBackRest / Percona XtraBackup** — engine-specific backup tools, no unified multi-engine UI
- **BorgBackup / Restic** — general-purpose backup tools, not database-schema-aware
- **Cronicle + custom dump scripts** — the DIY approach Databasement replaces
- **Commercial DBaaS backup features** (RDS snapshots, Atlas backups) — cloud-native, not self-hosted or portable across engines

Not a direct competitor to [Twenty](/docs/crm/twenty) or [SuiteCRM](/docs/crm/suitecrm) (those are CRMs, this is infrastructure tooling), but relevant to teams self-hosting either CRM's underlying MySQL/PostgreSQL database — Databasement can back up the database behind a self-hosted SuiteCRM or Twenty instance.

## Pros

- One UI for eight+ database engines instead of per-engine scripts
- MIT licensed — no copyleft constraints
- Remote agent enables backups behind firewalls with no inbound ports
- REST API + MCP server make it scriptable and AI-agent-friendly
- Simple single-container deployment, with Kubernetes/Helm available for scale

## Cons

- Self-hosted only — no managed/cloud-hosted offering
- Newer project (relative to established backup tooling), smaller community
- Redis/Valkey support is backup-only, no restore
- Requires operational trust in a single tool for a critical function (backups) — evaluate before wide production rollout

## Resources

- [GitHub Repository](https://github.com/David-Crty/databasement)
- [Documentation](https://david-crty.github.io/databasement/)
- [Live Demo](https://databasement-demo.crty.dev/)
