---
title: Infisical
description: Open-source secrets, certificate, and privileged access management platform
order: 1
---

# Infisical

**[infisical/infisical](https://github.com/infisical/infisical)**

## Overview

Infisical is an open-source security infrastructure platform for managing secrets, certificates, and privileged access — a self-hostable alternative to HashiCorp Vault or Doppler with a polished UI, CLI, and SDKs on top.

## What is it?

A centralized secrets manager (Node.js/Go backend, TypeScript frontend, PostgreSQL) covering secret storage/versioning/rotation, syncing to platforms like GitHub, Vercel, and AWS, dynamic secret generation, git-leak scanning for 140+ secret types, a Kubernetes operator/agent for injection, a certificate management module (private/external CA, ACME/EST), a key management system (KMS), and privileged access management with session recording.

## Why use it?

Teams that outgrow scattered `.env` files but don't want to pay for or run heavyweight HashiCorp Vault get a middle path: a modern, self-hostable dashboard with audit logs, access control, and rotation, plus a genuinely usable UI and CLI instead of Vault's steeper operational learning curve.

## Installation

```bash
git clone https://github.com/infisical/infisical.git
cd infisical
cp .env.example .env   # configure DB, encryption keys, etc.
docker compose -f docker-compose.prod.yml up
```

Access the dashboard at `http://localhost:80`. A managed cloud version is also available if you don't want to self-host.

## Basic Usage

1. Deploy via Docker Compose (or use Infisical Cloud).
2. Create a project and environments (dev/staging/prod).
3. Add secrets through the dashboard, CLI, or SDK.
4. Sync secrets to CI/CD, Kubernetes, or `.env` files via integrations.
5. Set access policies and review audit logs.

## Key Features

- Centralized secrets dashboard with versioning and point-in-time recovery
- Dynamic secrets generation for databases/services
- Git-leak scanning (140+ secret types) and honey tokens for intrusion detection
- Kubernetes operator/agent for secret injection
- Certificate lifecycle management (issuance, renewal, revocation, ACME/EST)
- Key management system (KMS) for encryption/decryption
- Privileged access management with session recording
- Multiple auth methods: Kubernetes, GCP, Azure, AWS, OIDC

## Top 5 Use Cases

- Centralizing env vars/API keys across a team with audit logs and access control
- Injecting secrets into CI/CD pipelines and Kubernetes clusters
- Rotating database credentials automatically
- Managing internal TLS certificates alongside secrets in one platform
- Replacing scattered `.env` files with a versioned, access-controlled source of truth

## Competitors

- **HashiCorp Vault** — the incumbent open-source standard; more powerful but a steeper operational/learning curve
- **AWS Secrets Manager / Azure Key Vault** — cloud-native, fully managed, but locked to one cloud provider
- **Doppler** — polished SaaS UX similar to Infisical's, but closed-source and cloud-only

## Pros

- MIT licensed core (enterprise features gated separately, clearly marked in the `ee` directory)
- Covers secrets, certs, and KMS in one platform instead of stitching together separate tools
- Both self-hosted (Docker/Kubernetes/Helm) and managed cloud options
- Actively developed with a large, real-world adoption footprint

## Cons

- Full feature set (SSO, some PAM/cert features) is enterprise-licensed, not MIT
- Self-hosting a secrets platform means the security burden is fully on you (patching, backups, key custody)
- More moving parts than a minimal `.env` setup — overkill for a solo project
- Migrating off Vault or another incumbent secrets manager takes real migration effort

## Resources

- [GitHub Repository](https://github.com/infisical/infisical)
