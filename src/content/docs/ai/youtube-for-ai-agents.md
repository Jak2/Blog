---
title: YouTube for AI Agents
description: Claude Code / MCP plugin that lets an AI agent search, watch, summarize, and clip YouTube videos conversationally
order: 1
---

# YouTube for AI Agents

**[JCodesMore/youtube-for-ai-agents](https://github.com/JCodesMore/youtube-for-ai-agents)**

## Overview

YouTube for AI Agents is a Claude Code plugin (also usable as a generic MCP server) that gives an AI agent direct YouTube access: search videos/channels/playlists, watch and summarize content, pull transcripts, download media, and cut custom clips or highlight reels — all through natural-language requests, no API keys required.

## What is it?

A Model Context Protocol (MCP) tool built on `youtubei.js` (an unofficial YouTube client), `youtube-transcript-plus`, and `ytdlp-nodejs`. It is **consumption/agent tooling, not a video generator** — it exists so an AI agent can watch and act on existing YouTube content, unlike the shorts-generation tools in this category which create new videos.

## Why use it?

Manually copy-pasting YouTube URLs and transcripts into a chat is tedious. This plugin lets an agent search for videos on a topic, watch/summarize them, jump to a specific timestamp, or extract a clip — directly inside a coding/agent session, without needing a YouTube Data API key or OAuth setup.

## Installation

```
/plugin marketplace add JCodesMore/jcodesmore-plugins
/plugin install youtube@jcodesmore-plugins
```

Restart Claude Code completely. Optionally run `/youtube:setup` to enable personalized search via YouTube cookies. Also works with Cursor, Codex, OpenCode, and Gemini CLI via MCP server configuration.

## Basic Usage

Ask conversationally:
- "find highly-rated videos on transformer architectures"
- "watch this and summarize it"
- "pull the transcript around the 5-minute mark"
- "cut a 30-second clip from 2:15 to 2:45"

## Key Features

- Search videos, channels, and playlists
- Watch and auto-summarize content
- Transcript extraction with timestamp navigation
- Video/audio download
- Custom clip and highlight-reel creation
- No API keys or Google account signup required

## Top 5 Use Cases

- Research: finding and summarizing videos on a topic without manual browsing
- Pulling accurate transcripts/quotes at specific timestamps
- Turning a long video into a highlight reel automatically
- Feeding video content into an agent workflow (e.g. writing notes from a lecture)
- Downloading clips for reference or further editing

## Competitors

- **[AI Youtube Shorts Generator](/docs/ai/ai-youtube-shorts-generator)**, **[VUZA](/docs/ai/vuza)**, **[YouTube Automation Agent](/docs/ai/youtube-automation-agent)** — not real competitors: those *generate* new faceless videos from scripts, this *consumes/analyzes* existing YouTube videos. Different problem entirely.
- Other MCP/YouTube-transcript tools built on `youtubei.js` or `yt-dlp`

## Pros

- No API keys or OAuth required to get started
- Works across multiple agent hosts (Claude Code, Cursor, Codex, OpenCode, Gemini CLI) via MCP
- Conversational interface fits naturally into agent workflows
- Apache-2.0, permissive license

## Cons

- Relies on an unofficial YouTube client (`youtubei.js`), which can break if YouTube changes its internal API
- Not affiliated with Google/YouTube — no guarantee of long-term stability
- Download/clip features may run into YouTube ToS considerations depending on use
- Personalized search requires exporting YouTube cookies, an extra manual step

## Resources

- [GitHub Repository](https://github.com/JCodesMore/youtube-for-ai-agents)
