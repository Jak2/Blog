---
title: Merchant Universal Cart Protocol (UCP)
description: Google's open standard for agentic commerce — letting AI surfaces like Search AI Mode and Gemini complete purchases directly
order: 1
---

# Merchant Universal Cart Protocol (UCP)

## Overview
UCP (Universal Commerce Protocol) is Google's open standard for "agentic commerce" — turning AI conversations into completed purchases. It lets merchants plug their catalog and checkout into AI surfaces (Search's AI Mode, Gemini) so a shopper can go from "find me X" to a completed order without leaving the AI interface.

## What is it?
An open, modular protocol that unifies product discovery and checkout across AI-powered surfaces. Merchants keep Merchant of Record status and own the customer relationship/data; Google provides the plumbing (discovery via existing Merchant Center feeds, payment tokenization, checkout UI/embed) that connects their catalog to conversational AI.

## Why use it?
- Capture high-intent shoppers who are already asking an AI assistant for product recommendations, before they bounce to a search results page.
- Reduce checkout friction/cart abandonment by completing the purchase inline.
- Avoid ceding the customer relationship to a platform — merchants retain order/customer data ownership.

## Installation
Not a library install — it's a merchant onboarding/integration process:
1. Join the UCP waitlist (as of writing, gated access).
2. Have an existing Google Merchant Center product feed (UCP reuses it for discovery).
3. Choose an integration path (see Basic Usage).
4. Implement payment tokenization for secure checkout.
Native SDKs are published on GitHub; REST APIs and Model Context Protocol (MCP) bindings are also supported for agent-to-merchant communication.

## Basic Usage
Two integration paths:
- **Native checkout** — deep integration giving full agentic capability; the AI surface drives checkout using the merchant's UCP endpoint directly.
- **Embedded checkout** — an iframe-based option for merchants who need to preserve a fully branded/custom checkout flow.

Roadmap items (not yet fully live): multi-item carts spanning merchants, loyalty-program account linking, and post-purchase tracking/returns support.

## Key Features
- Merchant-of-record and customer-data ownership stays with the merchant.
- Tokenized, secure payments.
- Modular/extensible design (capabilities and extensions can be added over time).
- Reuses existing Merchant Center product feeds — no separate catalog to maintain.
- REST + MCP bindings for AI-agent integration.

## Top 5 Use Cases
1. Conversational shopping in Google's AI Mode ("find me running shoes under $100" → buy inline).
2. Purchases initiated inside the Gemini app.
3. Merchants extending an existing branded checkout into AI surfaces via the embedded (iframe) path.
4. Future: loyalty-linked purchases (points/rewards applied automatically).
5. Future: multi-item, multi-merchant cart checkout in one flow.

## Competitors
- **ACP (Agentic Commerce Protocol)** — OpenAI + Stripe, powers ChatGPT's commerce flows (Instant Checkout was shut down in March 2026 after ~5 months of low sales, but ACP as a spec continues, with Shopify/Etsy merchant support).
- **AP2** — Google-initiated, now FIDO-governed protocol focused specifically on proving payment authorization; complements rather than replaces UCP.
- Notably, by April 2026 Amazon, Meta, Microsoft, Salesforce, and Stripe all joined UCP's Tech Council alongside Google/Shopify/Etsy/Target/Wayfair — suggesting UCP is consolidating as the leading discovery/cart layer, with ACP focused on checkout execution.

## Pros
- Backed by a broad, growing industry coalition (Google, Shopify, and now Amazon/Meta/Microsoft/Salesforce/Stripe).
- Merchants retain data ownership and customer relationship — unlike fully platform-mediated checkout.
- Reuses existing Merchant Center feeds, lowering integration lift for merchants already on Google Shopping.
- Flexible integration (native vs. embedded) accommodates both simple and heavily branded checkout needs.

## Cons
- Still early/waitlisted access as of mid-2026; not all features (multi-item cart, loyalty linking, returns) are live yet.
- Multiple competing/overlapping standards (UCP, ACP, AP2) mean merchants may need to support more than one.
- The comparable OpenAI/Stripe consumer surface (ChatGPT Instant Checkout) failed to gain traction and was discontinued, a cautionary signal for how quickly agentic-commerce adoption can stall.
- Documentation on the public landing page is light on concrete API/endpoint specifics.

## Resources
- Source: [developers.google.com/merchant/ucp](https://developers.google.com/merchant/ucp)
- [UCP vs ACP: 2026 technical comparison](https://dev.to/ucptools/ucp-vs-acp-in-2026-a-technical-comparison-of-ai-commerce-protocols-50j7)
- [Agentic Commerce Protocol (ACP) spec repo](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)
