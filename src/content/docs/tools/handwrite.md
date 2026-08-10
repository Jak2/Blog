---
title: Handwrite
description: Converts your handwriting samples into a custom digital TTF font
order: 1
---

# Handwrite

**[yashlamba/handwrite](https://github.com/yashlamba/handwrite)**

## Overview

Handwrite turns a page of your own handwriting into a real, installable TTF font. Fill out a form with handwriting samples, and it vectorizes each character and packages the result into a font file you can use in Word, LibreOffice, or anywhere else fonts work.

## What is it?

A web tool (hosted at yashlamba.github.io/handwrite) plus the pipeline behind it: samples go through the Potrace algorithm for vectorization, then get assembled into a font via Fontforge's Python scripting API. The output is a normal TTF you install like any other font.

## Why use it?

Typed assignments that still need to "look handwritten," or genuinely wanting your own handwriting available digitally, are the core motivations. It's also called out as useful for people with dysgraphia who want consistent, readable output that still reads as personal rather than a generic system font.

## Installation

No local install is required for normal use — the hosted form does the work. For self-hosting or contributing, clone the repo and follow the Fontforge/Python setup in the README; a PyPI package is also published for the underlying pipeline.

## Basic Usage

1. Open the hosted Handwrite form.
2. Fill in the handwriting sample template (print, scan/photograph, upload).
3. Wait for processing (Potrace vectorization + Fontforge packaging).
4. Download the generated TTF and install it like any font.

## Key Features

- Generates a genuine installable TTF font from handwriting samples
- Works with Microsoft Word and LibreOffice
- Potrace-based vectorization of handwritten glyphs
- Fontforge/Python pipeline for font assembly
- Simple form-based workflow, no design tooling needed

## Top 5 Use Cases

- Making typed documents look personally handwritten
- Accessibility support for people with dysgraphia
- Personal branding/notes that want a consistent "handwritten" digital font
- Digitizing a signature-adjacent personal font for creative projects
- Students wanting a reusable custom font instead of re-handwriting each assignment

## Competitors

- [Text-to-Handwriting](/docs/tools/text-to-handwriting) — a direct alternative that renders typed text as handwriting-style *images*/PDFs rather than producing an installable font; simpler for one-off documents, but not reusable as a system font the way Handwrite's TTF output is.
- Calligraphr — commercial/freemium handwriting-to-font web app with a similar template-based workflow.
- FontStruct — general font-building tool, not handwriting-specific.

## Pros

- Produces a real, reusable font file rather than a one-off image
- Free and open source (MIT)
- No design software needed — just samples and a form
- Genuinely useful accessibility angle for dysgraphia

## Cons

- Font quality depends heavily on sample legibility and scan quality
- Only covers Latin handwriting/character sets typical of the sample template
- Less turnkey than commercial competitors like Calligraphr
- Project is a smaller community effort — expect occasional rough edges

## Resources

- [GitHub Repository](https://github.com/yashlamba/handwrite)
- [Live tool](https://yashlamba.github.io/handwrite/)
