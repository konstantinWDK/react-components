#!/usr/bin/env node
/**
 * extract-css.mjs — Ports the <style> blocks of astro-component-kit components
 * into plain .css files next to their React counterparts.
 *
 * Usage:
 *   node scripts/extract-css.mjs <category> [--force] [--src ../astro-components]
 *
 * What it does per component:
 *   - concatenates every <style> block of the .astro file
 *   - unwraps Astro's `:global(...)` selectors (React CSS is global anyway)
 *   - prefixes @keyframes names with the component slug so animations from
 *     different components never collide once everything ships in one bundle
 *   - writes src/components/lib/<category>/<Name>.css (skips existing files
 *     unless --force, so hand-tuned CSS is never overwritten)
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const category = args.find((a) => !a.startsWith('--'));
const force = args.includes('--force');
const srcIdx = args.indexOf('--src');
const astroRoot = path.resolve(srcIdx > -1 ? args[srcIdx + 1] : '../astro-components');

if (!category) {
  console.error('Usage: node scripts/extract-css.mjs <category> [--force] [--src <astro repo>]');
  process.exit(1);
}

const inDir = path.join(astroRoot, 'src/components/lib', category);
const outDir = path.resolve('src/components/lib', category);
fs.mkdirSync(outDir, { recursive: true });

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** Replace `:global(<selector>)` with `<selector>`, handling nested parens. */
function unwrapGlobal(css) {
  let out = '';
  let i = 0;
  while (i < css.length) {
    if (css.startsWith(':global(', i)) {
      i += ':global('.length;
      let depth = 1;
      let inner = '';
      while (i < css.length && depth > 0) {
        const ch = css[i];
        if (ch === '(') depth++;
        if (ch === ')') depth--;
        if (depth > 0) inner += ch;
        i++;
      }
      out += inner;
    } else {
      out += css[i++];
    }
  }
  return out;
}

function prefixKeyframes(css, prefix) {
  const names = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]);
  if (!names.length) return css;
  const unique = [...new Set(names)];
  return css
    .split('\n')
    .map((line) => {
      if (!/@keyframes|animation/.test(line)) return line;
      let l = line;
      for (const n of unique) {
        if (n.startsWith(prefix + '-')) continue;
        l = l.replace(new RegExp(`(?<![\\w-])${n}(?![\\w-])`, 'g'), `${prefix}-${n}`);
      }
      return l;
    })
    .join('\n');
}

function dedent(css) {
  const lines = css.replace(/^\n+|\s+$/g, '').split('\n');
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min)).join('\n') + '\n';
}

const files = fs.readdirSync(inDir).filter((f) => f.endsWith('.astro'));
let written = 0;
for (const file of files) {
  const name = file.replace(/\.astro$/, '');
  const target = path.join(outDir, `${name}.css`);
  if (fs.existsSync(target) && !force) continue;

  const src = fs.readFileSync(path.join(inDir, file), 'utf8');
  const blocks = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  if (!blocks.length) continue;

  let css = blocks.map(dedent).join('\n');
  css = unwrapGlobal(css);
  css = prefixKeyframes(css, kebab(name));

  const header = `/* ${name} — ported from astro-component-kit (${category}/${file}) */\n\n`;
  fs.writeFileSync(target, header + css);
  written++;
}
console.log(`${category}: ${written} css file(s) written to ${path.relative(process.cwd(), outDir)}`);
