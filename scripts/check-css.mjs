#!/usr/bin/env node
/**
 * check-css.mjs — Every component stylesheet ends up in one global bundle, so a
 * root class (or @keyframes) defined in two different files silently overrides
 * the other. This script fails if that happens.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/components/lib');
const owners = new Map(); // name -> Set(files)
const add = (name, file) => (owners.get(name) ?? owners.set(name, new Set()).get(name)).add(file);

for (const cat of fs.readdirSync(root)) {
  const dir = path.join(root, cat);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.css'))) {
    const rel = `${cat}/${f}`;
    // Scoped rules (Astro-style :where([data-rk-…])) cannot leak, so only unscoped rules can collide.
    const css = fs.readFileSync(path.join(dir, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^[^{}@]*\[data-rk-[^{}]*\{[^{}]*\}/gm, '');
    for (const m of css.matchAll(/^\s*\.([a-zA-Z][\w-]*)/gm)) add(`.${m[1]}`, rel);
    for (const m of css.matchAll(/@keyframes\s+([\w-]+)/g)) add(`@keyframes ${m[1]}`, rel);
  }
}

const ALLOWED = new Set(['.sr-only']); // identical a11y utility
const clashes = [...owners].filter(([name, files]) => files.size > 1 && !ALLOWED.has(name));
if (clashes.length) {
  console.error('CSS name collisions between components:');
  for (const [name, files] of clashes) console.error(`  ${name}: ${[...files].join(', ')}`);
  process.exit(1);
}
console.log(`check-css: ${owners.size} class/keyframe names, no collisions`);
