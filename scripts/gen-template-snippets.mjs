#!/usr/bin/env node
/**
 * Converts the Astro page snippets of each template (registry.json → templates[].pages[].code and
 * storeConfigExample) into Next.js App Router files: site/data/template-snippets.json.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformMarkup, newCtx } from './astro2react.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reg = JSON.parse(fs.readFileSync(path.join(root, 'site/data/registry.json'), 'utf8'));
const PKG = 'react-component-kit-ui';

const fileFor = (astroFile) => {
  const p = astroFile.replace(/^src\/pages\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
  return p ? `app/${p}/page.tsx` : 'app/page.tsx';
};

function convert(code) {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(code.trim());
  let fm = m ? m[1] : '';
  let markup = (m ? m[2] : code).trim();
  fm = fm.replace(/astro-component-kit/g, PKG).replace(/^\/\/ src\/pages\/[^\n]*\n/m, '');
  const usesParams = /Astro\.params/.test(fm + markup);
  fm = fm.replace(
    /export function getStaticPaths\(\) \{\s*return ([\s\S]*?)\.map\(\(p\) => \(\{ params: \{ slug: p\.slug \} \}\)\);\s*\}/,
    'export const generateStaticParams = () => $1.map((p) => ({ slug: p.slug }));',
  );
  fm = fm.replace(/const \{ slug \} = Astro\.params;\n?/, '');
  markup = markup.replace(/Astro\.params\.slug/g, 'slug');
  let jsx = transformMarkup(markup, newCtx()).trim();
  const lines = jsx.split('\n');
  const body = lines.length > 1 || jsx.startsWith('{/*') ? `(\n    <>\n${lines.map((l) => '      ' + l).join('\n')}\n    </>\n  )` : jsx;
  const imports = (fm.match(/^import[\s\S]*?;$/gm) ?? []).join('\n');
  const rest = fm.replace(/^import[\s\S]*?;$/gm, '').trim();
  const sig = usesParams
    ? `export default async function Page({ params }: { params: Promise<{ slug: string }> }) {\n  const { slug } = await params;\n  return ${body};\n}`
    : `export default function Page() {\n  return ${body};\n}`;
  return [imports, rest, sig].filter(Boolean).join('\n\n') + '\n';
}

const out = {};
for (const t of reg.templates) {
  out[t.slug] = {
    pages: Object.fromEntries(t.pages.map((p) => [p.id, { file: fileFor(p.file), code: convert(p.code) }])),
    storeConfigExample: convert(t.storeConfigExample),
  };
}
fs.writeFileSync(path.join(root, 'site/data/template-snippets.json'), JSON.stringify(out, null, 1));
console.log(`gen-template-snippets: ${Object.keys(out).length} templates`);
