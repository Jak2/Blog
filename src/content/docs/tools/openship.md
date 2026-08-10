---
title: Openship
description: Self-hostable order routing and fulfillment platform connecting storefronts to shipping/fulfillment channels
order: 1
---

# Openship

**[openshiporg/openship](https://github.com/openshiporg/openship)**

## Overview

Openship is an open-source order router: it connects sales channels (Shopify, WooCommerce, custom APIs) to fulfillment destinations (supplier stores, 3PLs, dropship suppliers) and forwards orders automatically based on rules you define, instead of routing them by hand or paying a SaaS middleman.

## What is it?

A self-hosted order-routing and fulfillment platform built as a Next.js app on top of KeystoneJS 6 (GraphQL admin/backend) and PostgreSQL. Orders flow in from connected "shops," get matched at the variant level against connected "channels," and get forwarded automatically — with real-time sync, tracking, error handling, and analytics on top.

## Why use it?

Multi-channel sellers who fulfill from more than one warehouse, supplier, or 3PL end up either manually re-keying orders or paying for a proprietary middleware layer. Openship gives you that routing logic as self-hosted, inspectable code, with product/variant matching handled for you instead of maintained in a spreadsheet.

## Installation

```bash
git clone https://github.com/openshiporg/openship.git
cd openship
npm install
cp .env.example .env   # set DATABASE_URL (Postgres) and SESSION_SECRET (32+ chars)
npm run dev
```

Visit `/init` on first run to create the admin user, then connect shops and channels through the dashboard.

## Basic Usage

1. Connect a shop (Shopify, WooCommerce, custom webhook).
2. Connect one or more channels (supplier store, 3PL, email, Google Sheets).
3. Match products/variants between the shop and channel.
4. Orders placed on the shop route automatically to the matched channel.
5. Track fulfillment status and errors from the dashboard.

## Key Features

- Automatic order routing with real-time sync
- Shopify/WooCommerce/custom API/webhook shop integrations
- Channel integrations: supplier stores, 3PLs, email, Google Sheets, dropshipping
- Variant-level product matching
- Order tracking, automated workflows, error handling, analytics

## Top 5 Use Cases

- Multi-channel sellers who need orders auto-routed to the right warehouse/3PL
- Dropshipping operations connecting a storefront to supplier fulfillment
- Marketplace integration (Amazon, eBay) alongside a primary storefront
- 3PL coordination without manual re-entry of orders
- Self-hosting an order-routing layer instead of a proprietary SaaS

## Competitors

- **Shopify Flow / native multi-location fulfillment** — built-in but Shopify-only, closed-source
- **CartRover / Deliverr / other 3PL middleware** — commercial SaaS equivalents
- **Proprietary order management systems (OMS)** — closed-source, subscription-priced

## Pros

- Self-hosted, fully open-source — no per-order or per-seat SaaS fee
- Variant-level product matching handles the tedious part of multi-channel routing
- Modern stack (Next.js, GraphQL, Postgres) that's easy to extend
- Part of a broader Openfront ecosystem (e-commerce, restaurant) if you need adjacent tools

## Cons

- AGPL-3.0 license — copyleft, can complicate closed-source commercial use
- Requires running and maintaining your own Postgres instance and background workers
- Newer/smaller ecosystem than established commercial OMS platforms
- Self-hosting means you own uptime, backups, and security patching

## Resources

- [GitHub Repository](https://github.com/openshiporg/openship)
