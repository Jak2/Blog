---
title: Markdoc
description: Markdown-based documentation authoring framework built by Stripe, with custom tags, AST transforms, and React rendering
order: 1
---

# Markdoc

**[markdoc/markdoc](https://github.com/markdoc/markdoc)**

![Stars](https://img.shields.io/github/stars/markdoc/markdoc?style=flat-square) ![License](https://img.shields.io/github/license/markdoc/markdoc?style=flat-square) ![Last commit](https://img.shields.io/github/last-commit/markdoc/markdoc?style=flat-square)

## Overview

Markdoc is a Markdown-based documentation framework built by Stripe to power its own docs infrastructure — extending plain Markdown with custom tags and an AST pipeline so content stays readable while supporting rich, component-driven pages.

## What is it?

A toolchain that parses Markdown (plus Markdoc's custom-tag syntax) into an AST, lets you transform that tree programmatically, and renders it through a pluggable renderer — React included. Written in TypeScript, it's designed for building custom documentation platforms rather than shipping a fixed theme.

## Why use it?

Plain Markdown can't express interactive components, conditional content, or custom validation without dropping into raw HTML/JSX, which breaks portability and readability. Markdoc keeps content in clean Markdown while giving authors custom tags for components, and gives engineers an AST they can validate, transform, and render through their own framework — the same approach Stripe uses for docs read by millions of developers.

## Installation

```bash
npm install @markdoc/markdoc
# or
yarn add @markdoc/markdoc
```

## Basic Usage

```js
import Markdoc from '@markdoc/markdoc';

const ast = Markdoc.parse(content);
const content_ = Markdoc.transform(ast, config);
const html = Markdoc.renderers.react(content_, React);
```

## Key Features

- Markdown-based syntax extended with custom tags
- AST parsing and programmatic transformation
- Pluggable renderers, with React support included
- TypeScript throughout
- Built for custom documentation platforms, not a fixed theme

## Top 5 Use Cases

1. Building a custom documentation site with component-rich Markdown
2. Enforcing content validation/schemas across a large docs corpus
3. Powering API/developer documentation at scale (Stripe's original use case)
4. Adding interactive React components inline in Markdown content
5. Transforming Markdown content programmatically before rendering

## Competitors

- MDX — JSX-in-Markdown, more flexible but mixes code and content directly rather than Markdoc's tag-based AST approach.
- Docusaurus/Astro Starlight — full documentation site generators with built-in theming, vs. Markdoc's lower-level parse/transform/render toolkit.

## Pros

- MIT licensed, solid community (8.4k+ stars, 249+ forks)
- Battle-tested at scale by Stripe's own documentation
- Clean separation of content (Markdown) from rendering logic
- Framework-agnostic renderer pipeline, not locked to React

## Cons

- Lower-level toolkit than a full docs-site generator — more setup required
- Custom-tag syntax is an added authoring convention beyond plain Markdown
- Smaller ecosystem than MDX for pre-built component integrations

## Resources

- [GitHub Repository](https://github.com/markdoc/markdoc)
- [markdoc.dev](https://markdoc.dev)
