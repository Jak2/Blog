---
title: Twenty
description: Open-source, TypeScript-based CRM built like the rest of your stack — objects, views, workflows, and agents you define as code
order: 1
---

# Twenty

**[twentyhq/twenty](https://github.com/twentyhq/twenty)**

## Overview

Twenty bills itself as "the open alternative to Salesforce, designed for AI." It's a modern, open-source CRM that treats CRM data model (objects, fields, views) as something you build, ship, and version like the rest of your engineering stack, rather than something you configure through a legacy admin panel.

## What is it?

A monorepo CRM built on TypeScript, NestJS, PostgreSQL, Redis, and React. It ships a Notion-like UI for managing contacts, deals, and pipelines, plus a CLI (`create-twenty-app`) and SDK for defining custom objects, fields, and views as code, and publishing them to a workspace like an app deployment. It also bakes in AI agents and chat as first-class product surfaces.

## Why use it?

Traditional CRMs (Salesforce, HubSpot, and most open-source alternatives) push customization through point-and-click admin UIs that don't version well and are hard to test or review. Twenty's "CRM as code" model lets a technical team define objects and workflows in TypeScript, code-review them, and deploy them the same way they deploy the rest of their product — appealing to startups and technical teams who find legacy CRM customization painful.

## Installation

- **Cloud**: sign up at [twenty.com](https://twenty.com) for a hosted workspace, no infra to manage.
- **Build an app**: `npx create-twenty-app my-app`, then define objects with `twenty-sdk/define` and ship with `npx twenty app:publish --private`.
- **Self-hosting**: run via [Docker Compose](https://docs.twenty.com/developers/self-host/capabilities/docker-compose), or clone the repo and follow the [local setup guide](https://docs.twenty.com/developers/contribute/capabilities/local-setup) to contribute.

## Basic Usage

1. Spin up a workspace (cloud or self-hosted).
2. Use the built-in UI to manage contacts, companies, deals, and pipelines.
3. Scaffold custom objects/fields with the CLI when the built-ins aren't enough.
4. Publish app changes like a normal deploy (`twenty app:publish`).
5. Wire up AI agents and chat for automating CRM workflows.

## Key Features

- Objects, views, workflows, and agents as extensible, code-defined building blocks
- Notion-like UI: clean tables, kanban boards, and record views
- CLI/SDK for defining and publishing custom CRM objects as code
- Native AI agents and chat baked into the product
- GraphQL API, NestJS + BullMQ + PostgreSQL + Redis backend
- Self-hosting via Docker Compose, or fully managed cloud

## Top 5 Use Cases

- Startups wanting a modern, fast, customizable CRM without vendor lock-in
- Technical teams that want CRM customization to go through code review and version control
- Replacing Salesforce/HubSpot for sales pipeline and contact management at a lower cost
- Building CRM-adjacent internal tools (support views, ops trackers) on the same object model
- Embedding AI agents directly into CRM workflows (lead triage, follow-up drafting)

## Competitors / Comparison

- **SuiteCRM** — see the direct [Twenty vs SuiteCRM comparison](/docs/crm/suitecrm#comparison-suitecrm-vs-twenty) below.
- **HubSpot / Salesforce** — dominant commercial CRMs, closed-source, expensive at scale
- **EspoCRM, Odoo CRM** — other open-source CRM options with more traditional admin-panel customization

### Twenty vs SuiteCRM

Twenty and [SuiteCRM](/docs/crm/suitecrm) solve the same problem — open-source CRM — from opposite ends of the tooling spectrum:

| | **Twenty** | **SuiteCRM** |
|---|---|---|
| Stack | TypeScript, NestJS, React, PostgreSQL, Redis | PHP, Apache/IIS, MySQL/MariaDB (LAMP) |
| Age / maturity | Younger, fast-moving, v2-era rewrite | Mature, 10+ years, SugarCRM Community Edition fork |
| UI/UX | Notion-like, modern, minimal | Traditional enterprise admin-panel UI |
| Customization model | Objects/fields/views defined as code, versioned, deployed like an app | Studio/Module Builder point-and-click configuration |
| Self-hosting complexity | Docker Compose, single modern stack | LAMP stack, PHP version compatibility matrix, more moving parts |
| Extension ecosystem | Newer, smaller, code-first apps/SDK | Large, mature extensions directory, established partner network |
| License | Not fully OSI-clear (NOASSERTION on GitHub — check repo LICENSE) | AGPL-3.0, unambiguous copyleft |
| Best for | Startups/technical teams wanting modern UX and code-native customization | Enterprises needing a feature-complete, battle-tested legacy CRM with a large partner/support ecosystem |

If you need something that looks and feels like a 2026 SaaS product and you're comfortable customizing via code, Twenty fits. If you need the breadth of modules, workflows, and integrations a CRM accumulates over a decade, and PHP/LAMP hosting isn't a blocker, SuiteCRM is the safer bet.

## Pros

- Modern, fast, genuinely pleasant UI compared to most CRMs
- Code-native customization is reviewable, testable, and versionable
- Active, well-funded open-source project with a large community (50k+ GitHub stars)
- Flexible deployment: cloud, Docker Compose, or local dev

## Cons

- Younger project — smaller extension/plugin ecosystem than legacy CRMs
- License is not a standard OSI license per GitHub's detection (verify terms before commercial self-hosting)
- Requires comfort with TypeScript/Node tooling to get the most out of the code-as-config model
- Fewer out-of-the-box modules than a decade-mature CRM like SuiteCRM

## Resources

- [GitHub Repository](https://github.com/twentyhq/twenty)
- [Documentation](https://docs.twenty.com)
- [Website](https://twenty.com)
