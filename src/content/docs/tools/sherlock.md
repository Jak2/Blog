---
title: Sherlock
description: CLI OSINT tool that finds social media accounts by username across 400+ sites
order: 1
---

# Sherlock

**[sherlock-project/sherlock](https://github.com/sherlock-project/sherlock)**

## Overview

Sherlock is a CLI tool that hunts for social media accounts tied to a given username across 400+ networks simultaneously, built for digital reconnaissance and investigative work.

## What is it?

A Python-based username scanner: give it one or more usernames, and it checks each against its database of sites, reporting where an account with that exact name exists. Supports batch processing, proxying, and site filtering.

## Why use it?

Manually checking a username across hundreds of platforms one by one is impractical. Sherlock automates that sweep, giving OSINT investigators, security researchers, and forensic analysts a fast way to map a username's footprint across the web.

## Installation

```bash
pipx install sherlock-project
```

Also available via Docker, and packaged for Fedora, Debian, Ubuntu, Homebrew, Kali, and BlackArch.

## Basic Usage

```bash
sherlock username123
```

Supports multiple usernames in one run, export to text/CSV/XLSX/JSON, proxy support, timeout/site-filter customization, and optional NSFW site inclusion.

## Key Features

- Searches 400+ social networks simultaneously
- Batch processing of multiple usernames in one run
- Export to text, CSV, XLSX, or JSON
- Proxy support for anonymized searches
- Customizable site filtering, timeout, and local/remote data source
- Direct browser integration for viewing results

## Top 5 Use Cases

1. OSINT investigations mapping a target's presence across platforms
2. Penetration testing reconnaissance phases
3. Forensic investigation of a username's digital footprint
4. Verifying whether a username is available/taken across many sites at once
5. Security research into account-enumeration/impersonation risks

## Competitors

- Manual per-site username checking — the baseline this tool automates away.
- Maigret and similar OSINT username-search forks — comparable scope, different site database/maintenance cadence.

## Pros

- MIT licensed, huge community (88.8k+ stars), actively maintained
- Very wide site coverage (400+)
- Multiple install paths and export formats
- Batch and proxy support built in

## Cons

- Site coverage/accuracy depends on each target site's detection logic staying current — breaks when sites change
- False positives/negatives possible depending on site behavior
- No built-in correlation across results — output is a list, not an investigation report

## Resources

- [GitHub Repository](https://github.com/sherlock-project/sherlock)
