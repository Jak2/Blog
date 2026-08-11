---
title: Paymenter
description: Open-source billing and webshop platform for hosting companies
order: 1
---

# Paymenter

**[Paymenter/Paymenter](https://github.com/Paymenter/Paymenter)**

## Overview

Paymenter is a self-hosted billing and webshop platform built specifically for hosting companies — subscription management, invoicing, and payment processing without the licensing cost or vendor lock-in of commercial billing panels.

## What is it?

A PHP application with an admin dashboard for managing customers, products, subscriptions, and invoices, plus a customer-facing storefront. Built to integrate with hosting control panels and payment gateways so a hosting provider can run their whole billing/order pipeline on one open platform.

## Why use it?

Hosting providers traditionally pay recurring license fees for closed platforms like WHMCS or Blesta. Paymenter offers the same core workflow (webshop, subscriptions, invoicing) as MIT-licensed, self-hosted software with no per-seat or per-client fees and full source access for customization.

## Installation

Requires PHP 8.3+, Composer, Apache/Nginx, and MariaDB.

```bash
composer install
php artisan migrate --seed
php artisan serve
```

Full setup steps: [paymenter.org/docs/getting-started/introduction](https://paymenter.org/docs/getting-started/introduction/). Live demo: demo.paymenter.org.

## Basic Usage

Configure products/services and payment gateways from the admin dashboard, then point customers at the storefront to purchase and manage their subscriptions — invoices, renewals, and payment collection are handled automatically from there.

## Key Features

- Customer-facing webshop/storefront
- Subscription and recurring billing management
- Invoicing and payment gateway integrations
- Admin dashboard with user/customer management
- Extensible architecture for hosting-panel integrations

## Top 5 Use Cases

1. Billing/invoicing backbone for a web hosting or VPS business
2. Replacing a paid WHMCS/Blesta license with a self-hosted alternative
3. Selling any subscription-based digital service with recurring billing needs
4. Customizing checkout/billing flow beyond what closed platforms allow
5. Running a small hosting reseller business without ongoing panel licensing costs

## Competitors

- **WHMCS** — the dominant commercial hosting billing platform; closed-source, recurring license cost, much larger ecosystem of hosting-panel integrations.
- **Blesta** — another commercial billing platform aimed at hosting providers, similar licensing model to WHMCS.

## Pros

- MIT licensed, fully self-hosted, no recurring license fee
- Purpose-built for hosting businesses rather than generic e-commerce
- Active development, modern PHP stack
- Full source access for custom integrations

## Cons

- Smaller ecosystem/integration library than WHMCS's decades of third-party modules
- Self-hosting means you own uptime, security patching, and backups
- Newer, smaller project (2.2k stars) — less battle-tested at scale than incumbents

## Resources

- [GitHub Repository](https://github.com/Paymenter/Paymenter)
