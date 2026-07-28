---
title: Invio
description: Self-hosted invoicing app — create an invoice, share a link, get paid, with no bloat and no subscription
order: 1
---

# Invio

**[kittendevv/invio](https://github.com/kittendevv/invio)**

## Overview

Invio is a self-hosted invoicing application built around one idea: create an invoice, share a link, get paid. It skips the feature bloat of most invoicing SaaS products and focuses on a lightweight, no-nonsense flow you run on your own infrastructure.

## What is it?

A free, open-source invoicing web app with a separate backend and frontend, packaged for self-hosting via Docker Compose. Clients open a secure link to view and pay an invoice — no account or login required on their end.

## Why use it?

Commercial invoicing tools (Invoice Ninja hosted plans, FreshBooks, Bonsai, etc.) charge subscriptions or per-invoice fees and hold your billing data on their servers. Invio is aimed at freelancers, small studios, and self-hosters who want full data ownership, zero recurring cost, and a simple deploy-and-forget setup rather than a sprawling accounting suite.

## Installation

The repo ships Docker support (docker-compose files) and a Supervisor config for process management. The project points users to a Quick Start guide in its docs for the exact deployment steps rather than a single copy-paste command. Check the repo README for the latest setup instructions before deploying, since exact commands weren't fully documented in the fetched README summary.

## Basic Usage

1. Deploy the backend and frontend containers (Docker Compose).
2. Log in as the invoice owner and create an invoice.
3. Share the generated secure link with your client.
4. The client opens the link, views the invoice, and pays — no signup needed.

## Key Features

- Minimal, no-bloat invoice creation flow
- Self-hosted — you own and control all invoice/client data
- Client access via secure link, no account creation required
- Free and open source under the Unlicense (no subscription, no per-invoice fee)
- Docker Compose deployment with Supervisor-managed processes

## Top 5 Use Cases

- Freelancers who want to bill clients without paying a monthly SaaS fee
- Small agencies/studios wanting an internal, self-hosted billing tool
- Privacy-conscious users who don't want client financial data on a third-party server
- Developers who want a simple invoicing component to embed in an internal tools stack
- Homelab/self-hoster setups already running Docker who want one more lightweight service

## Competitors

- **Invoice Ninja** — much more feature-rich (quotes, expenses, time tracking, recurring invoices), also self-hostable but heavier
- **FreshBooks / Bonsai / QuickBooks** — commercial, cloud-only, subscription-based
- **Crater** — another open-source, self-hosted invoicing app with a broader feature set
- **InvoicePlane** — long-running open-source PHP invoicing tool, more traditional accounting features

## Pros

- Extremely simple, fast to deploy and understand
- Unlicense means essentially no usage restrictions
- No vendor lock-in or recurring fees
- Full data ownership when self-hosted

## Cons

- Smaller/newer project (955 stars, 87 forks at time of research) — less battle-tested than Invoice Ninja
- Minimal by design, so it likely lacks advanced features like recurring billing, expense tracking, or multi-currency reporting found in bigger tools
- Requires you to run and maintain your own Docker infrastructure
- Documentation for installation lives outside the README (external Quick Start guide), so setup friction may be higher than a single-command tool

## Resources

- [GitHub Repository](https://github.com/kittendevv/invio)
- [xTom: Comparing the 6 Best Self-Hosted Invoicing Apps](https://xtom.com/blog/comparing-the-6-best-self-hosted-invoicing-apps/)
- [AlternativeTo: Open Source Invoice Ninja Alternatives](https://alternativeto.net/software/invoice-ninja/?license=opensource)
