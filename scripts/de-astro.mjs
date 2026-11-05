#!/usr/bin/env node
/**
 * de-astro.mjs — removes Astro branding from ported code and sample copy.
 *
 * Used by astro2react.mjs / gen-site-meta.mjs on generated output, and as a CLI over existing files:
 *   node scripts/de-astro.mjs src site/demos site/data/registry.json [--check]
 *
 * It rewrites user-visible sample text (subtitles, install commands, URLs, brand names, promo codes),
 * drops "ported from astro-component-kit" headers and Astro-specific comments. Real code identifiers
 * are never touched. Deliberate links to the Astro edition (SisterSiteLink, footer) live outside
 * the scanned paths.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/** Ordered: specific phrases first, generic word last. */
const RULES = [
  // headers / comments added by the port
  [/^\/\* [\w-]+ — ported from astro-component-kit \([^)]*\) \*\/\n\n?/gm, ''],
  [/^\/\* ported from astro[^*]*\*\/\n?/gm, ''],
  [/\/\*\* ([\w-]+) — ported from astro-component-kit\. \*\//g, '/** $1 */'],
  [/\/\/ Ported from the Astro <script>: runs once after mount \(DOM logic kept as in the Astro kit\)\./g, '// Client-side behaviour: runs once after mount.'],
  [/^(\s*\/\/ ?)([\w-]+)\.astro — /gm, '$1$2 — '],
  [/\(Astro-style scoped CSS\)/g, '(scoped CSS)'],
  [/Astro Components Design System/g, 'React Components Kit — Design System'],

  // commands, packages, URLs
  [/npm create astro@latest -- --template kit/g, 'npm create vite@latest my-app -- --template react-ts'],
  [/npm create astro@latest/g, 'npm create vite@latest'],
  [/npx astro-component-kit mcp install <client>/g, 'npx react-component-kit-ui mcp install <client>'],
  [/astro-component-kit/g, 'react-component-kit-ui'],
  [/mcp\.astrocomponents\.dev/g, 'mcp.reactcomponents.dev'],
  [/astrocomponents\.dev/g, 'reactcomponents.dev'],
  [/github\.com\/konstantinWDK\/astro-components/g, 'github.com/konstantinWDK/react-components'],
  [/\/astro-components\b/g, '/react-components'],
  [/discord\.gg\/astro\w*/gi, 'discord.gg/reactkit'],

  // product / framework wording
  [/Astro Components Kit/g, 'React Components Kit'],
  [/Astro Components/g, 'React Components'],
  [/Astro Kit/g, 'React Kit'],
  [/AstroKit/g, 'ReactKit'],
  [/ASTRO 5 PRODUCTION SUITE/g, 'REACT 19 PRODUCTION SUITE'],
  [/ASTRO 5 SUITE/g, 'REACT 19 SUITE'],
  [/Astro 5\.x/g, 'React 19'],
  [/Astro 5/g, 'React 19'],
  [/React 5\.x/g, 'React 18 & 19'],
  [/Astro Content Collections/g, 'React Server Components'],
  [/standalone \.astro file/g, 'standalone .tsx file'],
  [/\.astro file/g, '.tsx file'],
  [/\bASTRO10\b/g, 'REACT10'],
  [/\bASTRO\b/g, 'REACT'],
  [/\bAstro\b(?!\.\w|\w)/g, 'React'],
  [/\bastro-components\b/g, 'react-components'],
  [/\bastro\b(?![.\w/-])/g, 'react'],
];

export function deAstro(text) {
  let out = text;
  for (const [re, rep] of RULES) out = out.replace(re, rep);
  return out;
}

function walk(p, files) {
  const st = fs.statSync(p);
  if (st.isDirectory()) for (const f of fs.readdirSync(p)) walk(path.join(p, f), files);
  else if (/\.(tsx?|css|json|mjs)$/.test(p)) files.push(p);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const files = [];
  for (const a of args.filter((x) => !x.startsWith('--'))) walk(path.resolve(a), files);
  let changed = 0;
  for (const f of files) {
    const s = fs.readFileSync(f, 'utf8');
    const out = deAstro(s);
    if (out !== s) {
      changed++;
      if (!check) fs.writeFileSync(f, out);
      else console.log('  would change', path.relative(process.cwd(), f));
    }
  }
  console.log(`de-astro: ${changed} file(s) ${check ? 'need changes' : 'updated'} of ${files.length}`);
  if (check && changed) process.exit(1);
}
