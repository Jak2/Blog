---
title: Open SaaS
description: Free, open-source, production-ready SaaS boilerplate built on Wasp with auth, payments, and AI-tool integration
order: 1
---

# Open SaaS

**[wasp-lang/open-saas](https://github.com/wasp-lang/open-saas)**

![Stars](https://img.shields.io/github/stars/wasp-lang/open-saas?style=flat-square) ![License](https://img.shields.io/github/license/wasp-lang/open-saas?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/wasp-lang/open-saas?style=flat-square)

## Overview

Open SaaS is a free, open-source, production-ready SaaS boilerplate that bundles the infrastructure every SaaS product needs — auth, payments, email, file storage, admin dashboard — built on the Wasp full-stack framework.

## What is it?

A typed React + Node.js + Prisma + PostgreSQL starter (via Wasp) shipping email verification and social login (Google, GitHub, Slack, Microsoft), payments through Stripe/Polar.sh/Lemon Squeezy, email via SendGrid/MailGun/SMTP, AWS S3 file storage, a ShadCN UI-based admin dashboard, background job scheduling, Plausible/Google Analytics integration, Playwright end-to-end tests, and AI-ready configuration for Claude Code, Cursor, and other AI coding tools. Docs site built with Astro/Starlight.

## Why use it?

Every new SaaS reimplements the same non-differentiating plumbing — auth, billing, email, admin panel — before touching the actual product. Open SaaS ships that plumbing pre-wired and typed end-to-end via Wasp, and adds AI-tool-ready configuration so an agent can extend the codebase productively from day one, rather than rebuilding boilerplate the template already solved.

## Installation

```bash
npm i -g @wasp.sh/wasp-cli
wasp new -t saas
```

## Basic Usage

Scaffold a new project with the `saas` template, configure environment variables for your chosen auth/payment/email providers, then build product features on top of the pre-wired auth, billing, and admin infrastructure.

## Key Features

- Auth: email verification plus Google/GitHub/Slack/Microsoft social login
- Payments: Stripe, Polar.sh, Lemon Squeezy
- Email: SendGrid, MailGun, or SMTP
- AWS S3 file storage integration
- ShadCN UI components with an admin dashboard
- Background job scheduling and queue management
- Analytics: Plausible or Google Analytics
- AI-ready: preconfigured for Claude Code, Cursor, and other AI coding tools
- Playwright end-to-end testing set up out of the box

## Top 5 Use Cases

1. Launching a SaaS MVP without rebuilding auth/billing/email from scratch
2. Typed full-stack JavaScript projects wanting Prisma + PostgreSQL out of the box
3. AI-assisted development where an agent extends a pre-wired codebase
4. Startups needing production-ready infrastructure on day one
5. Teams standardizing on Wasp's full-stack framework conventions

## Competitors

- ShipFast — similar SaaS boilerplate concept, paid/closed-source vs. Open SaaS's free MIT-licensed template.
- create-t3-app — typed full-stack starter without SaaS-specific billing/auth wiring pre-built in.
- Supabase starter templates — BaaS-centric approach vs. Open SaaS's self-hosted Wasp/Prisma/PostgreSQL stack.

## Pros

- MIT licensed, fully free and open-source, active community (15.7k+ stars, 1.9k+ forks)
- Multiple payment provider options, not locked to one
- AI-tool-ready configuration for Claude Code/Cursor out of the box
- End-to-end typed stack (React, Node.js, Prisma, PostgreSQL) via Wasp

## Cons

- Tied to Wasp's framework conventions — less flexible than assembling your own stack
- Multiple integrated providers (payments, email, storage, analytics) mean more accounts/config to set up
- Smaller ecosystem than more established frameworks like Next.js-based starters

## Resources

- [GitHub Repository](https://github.com/wasp-lang/open-saas)
