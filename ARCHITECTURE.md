# Architecture Guide

This document explains how the documentation engine works internally — the request flow, file responsibilities, and how components communicate with each other.

---

## Table of Contents

1. [High-Level Overview](#high-level-overview)
2. [Request Flow](#request-flow)
3. [File Responsibilities](#file-responsibilities)
4. [Component Communication](#component-communication)
5. [Data Flow Diagrams](#data-flow-diagrams)
6. [Key Concepts](#key-concepts)

---

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER REQUEST                              │
│                     (e.g., /docs/guides)                        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ASTRO ROUTER                                │
│         pages/docs/[...slug].astro (catch-all route)            │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LAYOUT SYSTEM                               │
│                    layouts/BaseLayout.astro                      │
│    ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│    │   Navbar    │  │   Sidebar   │  │    Main Content     │   │
│    │  component  │  │  component  │  │   (from markdown)   │   │
│    └─────────────┘  └─────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     RENDERED HTML                                │
│              (Served to browser as static page)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow

### Step-by-Step: What happens when you visit `/docs/getting-started/install`

```
1. URL Request
   └── /docs/getting-started/install

2. Astro Router Matches
   └── pages/docs/[...slug].astro
       └── slug = ["getting-started", "install"]

3. Page Component Executes
   └── import.meta.glob() loads ALL markdown files
   └── Finds matching file: content/docs/getting-started/install.md
   └── Extracts frontmatter (title, description)

4. Layout Wraps Content
   └── BaseLayout.astro receives the page
       ├── Navbar.astro (header with dark mode toggle)
       ├── Sidebar.astro (dynamically built from markdown files)
       └── <slot /> (receives markdown content as HTML)

5. Static HTML Generated
   └── Complete page sent to browser
   └── Client-side JS hydrates (dark mode, mobile menu)
```

---

## File Responsibilities

### Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro configuration — site URL, integrations (Tailwind) |
| `tailwind.config.cjs` | Tailwind configuration — colors, fonts, typography plugin |
| `postcss.config.cjs` | PostCSS plugins — processes Tailwind directives |
| `package.json` | Dependencies and npm scripts |

### Source Files

#### `src/pages/` — Route Definitions

```
pages/
├── index.astro              # Home page (/)
└── docs/
    └── [...slug].astro      # Catch-all for /docs/* routes
```

**`index.astro`** — Landing Page
- Renders the home page at `/`
- Contains hero section, feature cards, CTA buttons
- Uses BaseLayout for consistent structure

**`[...slug].astro`** — Dynamic Documentation Router
- Catches ALL routes under `/docs/*`
- The `[...slug]` syntax means "any path segments"
- Examples:
  - `/docs` → slug = undefined
  - `/docs/guides` → slug = ["guides"]
  - `/docs/getting-started/install` → slug = ["getting-started", "install"]

```javascript
// How it resolves markdown files:
const slug = Astro.params?.slug;  // ["getting-started", "install"]
const route = '/docs/' + slug.join('/');  // "/docs/getting-started/install"
// Finds: content/docs/getting-started/install.md
```

---

#### `src/layouts/` — Page Structure

**`BaseLayout.astro`** — The Master Template

```
┌────────────────────────────────────────────────────────────┐
│                         <head>                              │
│  - Meta tags, fonts, favicon                               │
│  - Dark mode initialization script                          │
└────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────┐
│                        Navbar                               │
│  [Logo]                              [GitHub] [🌙] [☰]     │
└────────────────────────────────────────────────────────────┘
┌──────────────┬─────────────────────────────┬───────────────┐
│              │                             │               │
│   Sidebar    │       Main Content          │  TOC (2xl+)   │
│   (lg+)      │       <slot />              │   Optional    │
│              │                             │               │
│  - Section 1 │  ┌─────────────────────┐   │               │
│    - Page A  │  │  Article Header     │   │               │
│    - Page B  │  │  ─────────────────  │   │               │
│  - Section 2 │  │                     │   │               │
│    - Page C  │  │  Markdown Content   │   │               │
│              │  │                     │   │               │
│              │  │  ─────────────────  │   │               │
│              │  │  Prev/Next Nav      │   │               │
│              │  └─────────────────────┘   │               │
└──────────────┴─────────────────────────────┴───────────────┘
```

**Key Features:**
- Imports global CSS (`styles/global.css`)
- Renders Navbar and Sidebar components
- Provides `<slot />` for page content
- Provides `<slot name="toc" />` for table of contents
- Dark mode script runs before page renders (prevents flash)

---

#### `src/components/` — Reusable UI Pieces

**`Navbar.astro`** — Site Header

```
Responsibilities:
├── Logo/Site title (links to /)
├── GitHub link (external)
├── Dark mode toggle
│   ├── Sun icon (visible in dark mode)
│   └── Moon icon (visible in light mode)
├── Mobile menu button (visible < lg breakpoint)
└── Mobile sidebar overlay
    ├── Slide-in panel
    ├── Close button
    └── Clones sidebar content
```

**Client-Side JavaScript:**
```javascript
// Theme Management
- Reads localStorage for saved theme
- Falls back to system preference (prefers-color-scheme)
- Toggles 'dark' class on <html>
- Persists choice to localStorage

// Mobile Menu
- Opens overlay on hamburger click
- Clones sidebar content into mobile panel
- Closes on: X button, backdrop click, Escape key
- Prevents body scroll when open
```

---

**`Sidebar.astro`** — Navigation Builder

This is the most complex component. It dynamically generates navigation from your markdown files.

```
┌─────────────────────────────────────────────────────────────┐
│                    BUILD PROCESS                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. SCAN FILES                                               │
│     import.meta.glob('/src/content/docs/**/*.md')           │
│     └── Returns all .md files with their modules             │
│                                                              │
│  2. EXTRACT METADATA                                         │
│     For each file:                                           │
│     ├── file path: /src/content/docs/guides/install.md     │
│     ├── route: /docs/guides/install                         │
│     ├── title: from frontmatter or filename                 │
│     └── order: from frontmatter (default: 999)              │
│                                                              │
│  3. BUILD TREE                                               │
│     Flat list → Nested tree structure                        │
│     {                                                        │
│       children: {                                            │
│         "getting-started": {                                 │
│           __meta: { title, route },                         │
│           children: {                                        │
│             "install": { __meta: {...} },                   │
│             "faq": { __meta: {...} }                        │
│           }                                                  │
│         }                                                    │
│       }                                                      │
│     }                                                        │
│                                                              │
│  4. RENDER HTML                                              │
│     Tree → <details> with <summary> and <ul>                │
│     ├── Collapsible sections for folders                    │
│     ├── Links for pages                                     │
│     └── Active state highlighting                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Key Functions:**

```javascript
fileToRoute(filePath)
// "/src/content/docs/guides/install.md" → "/docs/guides/install"
// "/src/content/docs/guides/index.md" → "/docs/guides"

titleFromModule(module, filePath)
// Uses frontmatter.title if available
// Falls back to filename: "install" → "Install"
// Special case: "index" → parent folder name

buildTree(pages)
// Converts flat array of pages into nested tree
// Used for recursive rendering

isActive(route)
// Checks if current URL matches this route
// Used for highlighting active page

hasActiveChild(node)
// Checks if any descendant is active
// Used to auto-expand parent sections
```

---

#### `src/styles/` — Styling

**`global.css`** — Global Styles

```css
/* Layer 1: Tailwind Base */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Layer 2: Base Overrides */
@layer base {
  - Smooth scrolling
  - Focus ring styles (accessibility)
  - Custom scrollbar styling
  - Text selection colors
}

/* Layer 3: Component Styles */
@layer components {
  .prose h1, h2, h3, h4 { ... }  // Heading styles
  .prose p { ... }                // Paragraph styles
  .prose code { ... }             // Inline code
  .prose pre { ... }              // Code blocks
  .prose table { ... }            // Tables
  .callout-info { ... }           // Info callout box
  .callout-warning { ... }        // Warning callout box
}

/* Layer 4: Utilities */
@layer utilities {
  .transition-theme { ... }       // Color transitions
  .scrollbar-hide { ... }         // Hide scrollbar
}
```

---

#### `src/content/docs/` — Your Content

This is where your markdown files live. The structure directly maps to URLs:

```
content/docs/
├── getting-started/
│   ├── index.md        →  /docs/getting-started
│   ├── install.md      →  /docs/getting-started/install
│   └── faq.md          →  /docs/getting-started/faq
└── guides/
    ├── index.md        →  /docs/guides
    └── advanced.md     →  /docs/guides/advanced
```

**Frontmatter Schema:**
```yaml
---
title: Page Title          # Required: shown in sidebar and <h1>
description: SEO text      # Optional: meta description
order: 1                   # Optional: sort order (lower = first)
---
```

---

## Component Communication

### Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      AT BUILD TIME                               │
└─────────────────────────────────────────────────────────────────┘

                    ┌─────────────────┐
                    │  Markdown Files │
                    │  (content/docs) │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │   Sidebar   │  │ [...slug]   │  │  Astro      │
    │  Component  │  │    Page     │  │  Build      │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           │                │                │
           │  Navigation    │  Content       │  Static
           │  Tree          │  HTML          │  Assets
           │                │                │
           └────────────────┼────────────────┘
                            │
                            ▼
                    ┌─────────────────┐
                    │   BaseLayout    │
                    │   (combines)    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Static HTML    │
                    │    Output       │
                    └─────────────────┘
```

### Runtime Flow (Client-Side)

```
┌─────────────────────────────────────────────────────────────────┐
│                      AT RUNTIME                                  │
└─────────────────────────────────────────────────────────────────┘

    User loads page
          │
          ▼
    ┌─────────────┐
    │  Dark Mode  │  ← Reads localStorage / system preference
    │   Script    │  → Adds 'dark' class to <html> immediately
    └─────────────┘
          │
          ▼
    ┌─────────────┐
    │   Navbar    │  ← User clicks theme toggle
    │   Script    │  → Toggles 'dark' class
    └─────────────┘    → Saves to localStorage
          │
          ▼
    ┌─────────────┐
    │  CSS Rules  │  ← dark: variants activate
    │  (Tailwind) │  → Colors/backgrounds change
    └─────────────┘
```

---

## Key Concepts

### 1. Static Site Generation (SSG)

All pages are pre-rendered at build time:
- No server required at runtime
- Fast page loads (just HTML/CSS/JS)
- Can be hosted on any CDN

### 2. Catch-All Routes

The `[...slug]` syntax captures any path:
```
/docs              → slug = undefined
/docs/a            → slug = ["a"]
/docs/a/b/c        → slug = ["a", "b", "c"]
```

### 3. import.meta.glob()

Astro's way to import multiple files at once:
```javascript
const mods = import.meta.glob('/src/content/docs/**/*.md', { eager: true });
// Returns: { "/src/content/docs/install.md": { default: Component, frontmatter: {...} } }
```

### 4. Component Slots

Astro's slot system allows content injection:
```astro
<!-- BaseLayout.astro -->
<main>
  <slot />  <!-- Default slot -->
</main>
<aside>
  <slot name="toc" />  <!-- Named slot -->
</aside>

<!-- Usage -->
<BaseLayout>
  <p>This goes in default slot</p>
  <nav slot="toc">This goes in named slot</nav>
</BaseLayout>
```

### 5. Dark Mode Strategy

Uses class-based dark mode (`darkMode: 'class'` in Tailwind):
```html
<html class="dark">  <!-- Dark mode active -->
  <body class="bg-white dark:bg-slate-900">
```

---

## Adding New Features

### Add a New Page

1. Create `src/content/docs/my-page.md`
2. Add frontmatter with title
3. Write content in Markdown
4. Page automatically appears in sidebar

### Add a New Section

1. Create folder: `src/content/docs/my-section/`
2. Add `index.md` with section overview
3. Add additional `.md` files
4. Section appears as collapsible group

### Customize Sidebar Order

Add `order` to frontmatter:
```yaml
---
title: First Page
order: 1
---
```

### Add New Component

1. Create `src/components/MyComponent.astro`
2. Import in layout or page: `import MyComponent from '../components/MyComponent.astro'`
3. Use in template: `<MyComponent />`

---

## Summary

| Concern | File(s) |
|---------|---------|
| Routing | `pages/docs/[...slug].astro` |
| Layout | `layouts/BaseLayout.astro` |
| Navigation | `components/Sidebar.astro` |
| Header/Theme | `components/Navbar.astro` |
| Styling | `styles/global.css` + `tailwind.config.cjs` |
| Content | `content/docs/**/*.md` |
| Config | `astro.config.mjs` |

The architecture follows a clear separation:
- **Pages** define routes
- **Layouts** define structure
- **Components** define reusable UI
- **Content** defines documentation
- **Styles** define appearance

Everything comes together at build time to produce fast, static HTML pages.
