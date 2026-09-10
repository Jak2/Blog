// Search index served as one static file instead of being inlined into every
// page — at this repo's page count inlining costs ~590KB per page.
const mods = import.meta.glob('/src/content/docs/**/*.md', { eager: true }) as Record<string, any>;

function fileToRoute(filePath: string): string {
  const rel = filePath.replace(/^\/src\/content\/docs/, '');
  let route = '/docs' + rel.replace(/\.md$/, '');
  route = route.replace(/\/index$/, '') || '/docs';
  return route.replace(/\/+/g, '/');
}

export function GET() {
  const searchIndex = Object.entries(mods).map(([path, mod]) => {
    const title = mod.frontmatter?.title || path.split('/').pop()?.replace('.md', '') || '';
    const headings = (mod.getHeadings?.() || []).map((h: any) => h.text);
    const rawContent = mod.rawContent?.() || mod.compiledContent?.() || '';
    const plainText = rawContent
      .replace(/<[^>]+>/g, '')
      .replace(/[#*_~`>\[\]()!|]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      title,
      route: fileToRoute(path),
      headings,
      excerpt: plainText.slice(0, 200),
    };
  });

  return new Response(JSON.stringify(searchIndex), {
    headers: { 'Content-Type': 'application/json' },
  });
}
