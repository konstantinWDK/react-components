/**
 * Server-renders every docs/section preview exactly like the site does and reports crashes.
 * Run: npx tsx --import ./scripts/smoke/register.mjs scripts/smoke/ssr-smoke.tsx [filter]
 */
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { generatedMeta } from '../../site/demos/generated-meta';
import { AutoPreview } from '../../site/demos/AutoPreview';
import registry from '../../site/data/registry.json';

const filter = process.argv[2];
const MANUAL = new Set(['buttons', 'feedback']);
const failures: string[] = [];
let ok = 0;

for (const [slug, m] of Object.entries(generatedMeta)) {
  if (MANUAL.has(m.category) || (filter && !slug.includes(filter))) continue;
  const p = m.category === '.' ? `../../src/components/lib/${m.file}` : `../../src/components/lib/${m.category}/${m.file}`;
  const name = (registry.components as { slug: string; name: string }[]).find((c) => c.slug === slug)?.name ?? m.file;
  try {
    const mod = await import(p);
    const Comp = mod.default ?? mod[m.file];
    const wide = ['charts', 'ecommerce', 'app', 'sections'].includes(m.category);
    renderToString(createElement(AutoPreview, { slug, name, Comp, wide }));
    if (m.category === 'sections') renderToString(createElement(Comp));
    ok++;
  } catch (e) {
    failures.push(`${m.category}/${m.file} (${slug}): ${(e as Error).message.split('\n')[0]}`);
  }
}
console.log(`ssr-smoke: ${ok} ok, ${failures.length} failed`);
for (const f of failures) console.log('  ✗ ' + f);
process.exit(failures.length ? 1 : 0);
