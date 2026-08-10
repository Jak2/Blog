---
title: MySigMail
description: Open-source email signature builder with a visual editor and hosted SaaS version
order: 1
---

# MySigMail

**[antonreshetov/mysigmail](https://github.com/antonreshetov/mysigmail)**

## Overview

MySigMail is an open-source, visual email signature builder that outputs signatures compatible with Gmail, Outlook, Apple Mail, and similar clients — without needing to hand-write HTML tables like signature building traditionally requires.

## What is it?

A Vue.js/TypeScript web app with a visual editor for building email signatures: fonts, colors, avatar shapes, social icons, templates, and add-ons like disclaimers or call-to-action blocks. It's self-hostable from source, and also runs as a hosted product at mysigmail.com with extra SaaS features (signature management, analytics, design presets).

## Why use it?

Building a cross-client-compatible email signature by hand is fiddly HTML/CSS work that breaks easily across mail clients. MySigMail handles that compatibility layer and gives a template-driven visual editor instead, while staying open source if you want to self-host rather than use the SaaS.

## Installation

```bash
git clone https://github.com/antonreshetov/mysigmail
cd mysigmail
bun install
bun run dev
```

Requires [Bun](https://bun.sh) as the package manager. Optional AWS S3 credentials can be set via environment variables for avatar/image uploads.

## Basic Usage

1. Clone and run locally with Bun (or use the hosted app at mysigmail.com).
2. Pick a template as a starting point.
3. Customize fonts, colors, avatar shape, and social icons.
4. Add optional elements like a disclaimer or call-to-action.
5. Export/copy the generated signature HTML into your mail client.

## Key Features

- Visual, no-code signature editor
- Customizable fonts, colors, avatar shapes, social icons
- Pre-built templates
- Disclaimer and CTA add-ons
- Optional S3-backed image hosting
- Self-hostable or usable as a hosted SaaS

## Top 5 Use Cases

- Individuals wanting a polished signature without writing HTML
- Small teams standardizing signatures via shared templates
- Agencies building client email signatures quickly
- Self-hosters who want signature-building without a third-party SaaS
- Adding marketing CTAs/disclaimers to outbound company email

## Competitors

- **WiseStamp**, **Newoldstamp**, **HubSpot Signature Generator** — commercial, closed-source signature generators with similar visual editors but no self-hosting option.
- **MySignature** — another SaaS-first signature builder, not open source.

MySigMail's differentiator versus all of these is being open source and self-hostable, in addition to offering the same kind of hosted convenience via mysigmail.com.

## Pros

- Open source (self-hostable) with a hosted SaaS option too
- Modern stack (Vue, TypeScript, Vite, Bun) — fast local dev
- No-code visual editor covers the common customization needs
- Commercial licensing available if AGPL doesn't fit

## Cons

- AGPL-3.0 license requires care in commercial/closed-source contexts (commercial license available on request)
- Requires Bun specifically for local development
- Advanced SaaS features (analytics, management) are only on the hosted mysigmail.com product
- Smaller ecosystem/community than established commercial competitors

## Resources

- [GitHub Repository](https://github.com/antonreshetov/mysigmail)
- [Live site](https://mysigmail.com/)
