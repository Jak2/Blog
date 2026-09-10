# Changelog

All notable changes to this project are documented in this file.

---

## [Unreleased]

### Added
- **Folder index pages** — Any folder under `src/content/docs/` is now a
  browsable URL. `getStaticPaths()` emits every ancestor folder route in
  addition to one route per markdown file; folders without an `index.md` render
  an auto-generated card grid of their direct children (subfolders show a page
  count, pages show their description). `index.md` is now optional.
- **`SidebarTree.astro`** — Recursive sidebar branch component. Navigation now
  nests to unlimited depth instead of stopping at two levels
- **Natural-numeric sidebar sort** — Children sort via
  `localeCompare(…, { numeric: true })`, so `86-` precedes `115-` instead of
  sorting as plain text
- **`src/pages/search-index.json.ts`** — Search index served as a standalone
  endpoint at `/search-index.json`
- **Software engineering knowledge map content** — `src/content/docs/software-engineer/`
  split into 115 numbered subfolders, one page per concept (~1,800 pages)

### Changed
- **Search index loading** — The navbar now fetches `/search-index.json` lazily
  on first search focus/keystroke and caches it in memory, instead of embedding
  the full index in a `<script type="application/json">` tag on every page
- **Sidebar rendering strategy** — Sub-branches render their children only when
  on the active path; all other folders render as links to their index page.
  `<details>` ships its contents even when closed, so rendering every branch
  inlined the whole tree into every page

### Fixed
- **404 on folder URLs** — Routes were generated per markdown file only, so any
  directory URL (e.g. `/docs/software-engineer/01-fundamental-engineering-principles`,
  `/docs/ai`, `/docs`) had no page and 404'd
- **Unreachable nested pages** — The sidebar rendered only two levels, leaving
  pages inside subfolders with no link anywhere in the navigation
- **Build output size** — Combined effect of the search-index and sidebar
  changes: `dist/` 1.4 GB → 232 MB, per-page HTML 708 KB → 128 KB, build time
  91s → 52s (2,066 pages)

---

## Earlier

### Added
- **Client-side search** — Search bar in the center of the top navbar
  - Build-time search index generated from all markdown files (titles, headings, content excerpts)
  - Weighted scoring: title matches (10), heading matches (5), content matches (2)
  - Keyboard shortcut: `Ctrl+K` / `Cmd+K` to focus, `Escape` to close
  - Debounced input (150ms), max 8 results with match highlighting
  - Dropdown shows page title, matched heading, and content excerpt
- **Table of Contents (right sidebar)** — Displays h1, h2, h3 headings for the current page
  - Scroll spy via IntersectionObserver highlights the active heading
  - Indented hierarchy (h1 flush, h2 indented, h3 more indented)
  - Page title from frontmatter included as first TOC entry
- **Scroll-to-target offset** — CSS variable `--navbar-height` applied via `scroll-margin-top` on all `[id]` elements so headings land below the fixed navbar
- **Previous/Next page navigation** — Bottom-of-page links to adjacent docs pages
- **Font size scaling** — Global base font increased by 2% (`html { font-size: 102% }`); both sidebars receive an additional 2% bump (`font-size: 1.02em`)

### Changed
- **Navbar** — Now a 3-section layout: logo (left), search bar (center), actions (right)
- **Sidebar header** — "Blog" link points to home page (`/`) instead of `/docs`
- **`[...slug].astro`** — Prepends frontmatter title as an h1 heading to the headings array for TOC display

### Fixed
- **`getStaticPaths()` error** — Added required static path generation for the dynamic `[...slug]` route
- **Invalid route parameter** — Changed slug from array to string for Astro rest params
- **Headings hidden behind navbar** — Added `scroll-padding-top` and `scroll-margin-top` using CSS variable

---

## [0.1.0] — Initial Release

### Added
- Astro static site generator with Tailwind CSS integration
- Filesystem-based routing (`src/content/docs/` maps to `/docs/*`)
- Dynamic catch-all route (`pages/docs/[...slug].astro`) with `getStaticPaths()`
- 3-column responsive layout (left sidebar, main content, right TOC)
- Left sidebar auto-generated from markdown file tree with collapsible sections
- Dark mode toggle with localStorage persistence and system preference detection
- Mobile responsive design with hamburger menu and slide-in sidebar overlay
- Markdown rendering with custom prose styles (headings, code blocks, tables, callouts)
- Custom Tailwind theme with docs-specific color tokens
- Inter + JetBrains Mono font loading
- Home page with hero section
