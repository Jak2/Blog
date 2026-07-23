# Markdown Documentation Engine

A modern, filesystem-driven documentation site built with **Astro** and **Tailwind CSS**. Write your docs in Markdown, and let your folder structure become your navigation.

![Astro](https://img.shields.io/badge/Astro-3.5+-purple?style=flat-square&logo=astro)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3+-blue?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

- **Filesystem-based routing** — Your folder structure = your sidebar navigation
- **Markdown first** — Write content in `.md` files, no code required
- **Client-side search** — Instant search across all docs from the navbar (`Ctrl+K`)
- **Table of Contents** — Right sidebar with scroll spy highlighting for h1-h3 headings
- **Dark mode** — Toggle with system preference detection
- **Responsive design** — Mobile-friendly with collapsible sidebar
- **Scroll offset** — Headings land below the fixed navbar when navigating via TOC or search
- **Zero JavaScript by default** — Static generation with Astro
- **Tailwind CSS** — Fully customizable styling
- **Syntax highlighting** — Code blocks with language support
- **SEO ready** — Meta descriptions and proper heading structure

## Quick Start

> **Note:** This project's directory sits on an NTFS drive (`fuseblk`), which
> doesn't support exec permission bits and breaks `npm install` for packages
> with native binaries (esbuild, sharp) — `EACCES` errors. `node_modules` is
> a symlink to an ext4-backed store as a workaround. **Do not run `npm i`
> directly in this folder** — it will delete the symlink. Instead run:
> ```bash
> bash install-deps.sh
> ```
> See [NODE_MODULES_NTFS_FIX.md](NODE_MODULES_NTFS_FIX.md) for details.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:4321`

## Project Structure

```
blog/
├── public/
│   └── favicon.svg              # Site favicon
├── src/
│   ├── components/
│   │   ├── Navbar.astro          # Header with search & dark mode toggle
│   │   ├── Sidebar.astro         # Auto-generated navigation
│   │   └── TableOfContents.astro # Right sidebar TOC with scroll spy
│   ├── content/
│   │   └── docs/                # YOUR MARKDOWN FILES GO HERE
│   │       ├── getting-started/
│   │       │   ├── index.md     # Section landing page
│   │       │   ├── install.md
│   │       │   └── faq.md
│   │       └── guides/
│   │           ├── index.md
│   │           └── advanced.md
│   ├── layouts/
│   │   └── BaseLayout.astro     # Main page wrapper
│   ├── pages/
│   │   ├── index.astro          # Home page (/)
│   │   └── docs/
│   │       └── [...slug].astro  # Dynamic docs routes
│   └── styles/
│       └── global.css           # Global styles & Tailwind
├── astro.config.mjs             # Astro configuration
├── tailwind.config.cjs          # Tailwind configuration
├── postcss.config.cjs           # PostCSS configuration
└── package.json
```

## How It Works

### Adding Content

1. **Create a new page**: Add a `.md` file to `src/content/docs/`
   ```
   src/content/docs/my-page.md  →  /docs/my-page
   ```

2. **Create a new section**: Add a folder with an `index.md`
   ```
   src/content/docs/tutorials/
   ├── index.md      →  /docs/tutorials
   ├── basics.md     →  /docs/tutorials/basics
   └── advanced.md   →  /docs/tutorials/advanced
   ```

3. **Control page order**: Use `order` in frontmatter
   ```markdown
   ---
   title: Getting Started
   description: Learn how to get started
   order: 1
   ---
   ```

### Frontmatter Options

| Property      | Type   | Description                    |
|---------------|--------|--------------------------------|
| `title`       | string | Page title (required)          |
| `description` | string | SEO meta description           |
| `order`       | number | Sort order in sidebar (lower = first) |

## Customization

### Colors

Edit `tailwind.config.cjs` to change the color scheme:

```javascript
colors: {
  'docs-accent': '#6366f1',      // Primary accent (indigo)
  'docs-bg': '#ffffff',           // Light mode background
  'docs-bg-dark': '#0f172a',      // Dark mode background
  'docs-sidebar': '#f8fafc',      // Sidebar background
  // ... more colors
}
```

### Typography

The project uses Inter for body text and JetBrains Mono for code. Modify in `tailwind.config.cjs`:

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Consolas', 'monospace'],
}
```

### Custom CSS

Add styles to `src/styles/global.css` using Tailwind layers:

```css
@layer components {
  .my-custom-class {
    @apply text-blue-500 font-bold;
  }
}
```

## Architecture Overview

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a detailed explanation of:
- Request flow from URL to rendered page
- How the sidebar is dynamically built
- How client-side search works (build-time index, runtime scoring)
- Component communication patterns
- File responsibilities

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a full history of changes.

## Deployment

This static site works with any hosting provider:

- **Cloudflare Pages** — Connect repo, set build command to `npm run build`, output to `dist`
- **Netlify** — Same as above
- **Vercel** — Auto-detects Astro
- **GitHub Pages** — Use the Astro GitHub Pages adapter

### Build Command

```bash
npm run build
```

Output directory: `dist/`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Tech Stack

- **[Astro](https://astro.build)** — Static site generator
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first CSS
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** — Prose styling for Markdown

## License

MIT License - feel free to use this for your own documentation projects!

---

Built with Astro and Tailwind CSS
