#!/usr/bin/env node
// Sorts "## Heading" sections (separated by `---`) alphabetically/numerically
// within each file listed in autosort.config.json. First section (intro,
// before the first `---`) is left in place. Idempotent — safe to rerun.
const fs = require("fs");
const path = require("path");

const root = __dirname + "/..";
const configPath = path.join(root, "autosort.config.json");
const { files } = JSON.parse(fs.readFileSync(configPath, "utf8"));

for (const relPath of files) {
  const filePath = path.join(root, relPath);
  const raw = fs.readFileSync(filePath, "utf8");

  let frontmatter = "";
  let body = raw;
  const fmMatch = raw.match(/^---\n[\s\S]*?\n---\n/);
  if (fmMatch) {
    frontmatter = fmMatch[0];
    body = raw.slice(frontmatter.length);
  }

  const blocks = body.split(/\n---\n/).map((b) => b.trim());
  const [preamble, ...entries] = blocks;

  entries.sort((a, b) => {
    const headingA = (a.match(/^##\s+(.+)$/m) || [, a])[1];
    const headingB = (b.match(/^##\s+(.+)$/m) || [, b])[1];
    return headingA.localeCompare(headingB, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

  const sorted =
    frontmatter + [preamble, ...entries].join("\n\n---\n\n") + "\n";

  if (sorted !== raw) {
    fs.writeFileSync(filePath, sorted);
    console.log(`sorted: ${relPath}`);
  } else {
    console.log(`already sorted: ${relPath}`);
  }
}
