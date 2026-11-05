/**
 * Data layer for the React Components Kit MCP server.
 * Single source of truth = the repository itself: the docs registry (site/data), the demo
 * metadata (site/demos/meta.ts) and the real component sources (src/components/lib).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import registry from '../site/data/registry.json' with { type: 'json' };
import snippets from '../site/data/template-snippets.json' with { type: 'json' };
import pkg from '../package.json' with { type: 'json' };
import { demoMeta, ENTRY_OVERRIDES } from '../site/demos/meta';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LIB = path.join(ROOT, 'src/components/lib');

export const PKG = pkg.name;
export const VERSION = pkg.version;
export const SITE = 'https://reactcomponents.dev';

type Lang = 'en' | 'es' | 'ru';
type L = Record<Lang, string>;

export interface ComponentEntry {
  slug: string;
  name: string;
  description: string;
  category: string;
  sectionCategory?: string;
  tags: string[];
  file: string;
  folder: string;
  entry: string;
  peer?: string;
  importStatement: string;
  docsUrl: string;
  usage: string;
}

const cats = registry.categories as { id: string; name: string; description: string }[];
const sectionCats = registry.sectionCategories as { id: string; name: string; description: string }[];

export const components: ComponentEntry[] = (registry.components as { slug: string; name: string; description: string; category: string; sectionCategory?: string; tags: string[] }[])
  .filter((c) => demoMeta[c.slug])
  .map((c) => {
    const meta = demoMeta[c.slug];
    const special = ENTRY_OVERRIDES[meta.file];
    const entry = special?.entry ?? (meta.category === '.' ? '' : meta.category);
    const importPath = entry ? `${PKG}/${entry}` : PKG;
    return {
      ...c,
      file: meta.file,
      folder: meta.category,
      entry,
      peer: special?.peer,
      importStatement: `import { ${meta.file} } from '${importPath}';`,
      docsUrl: `${SITE}/${c.category === 'sections' ? 'sections' : 'docs'}/${c.slug}/`,
      usage: meta.usage,
    };
  });

export const findComponent = (slug: string) => {
  const s = slug.trim().toLowerCase();
  return components.find((c) => c.slug === s || c.file.toLowerCase() === s.replace(/[^a-z0-9]/g, '') || c.name.toLowerCase() === s);
};

export function searchComponents(query: string, category?: string, limit = 20) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return components
    .filter((c) => !category || c.category === category || c.sectionCategory === category)
    .map((c) => {
      const hay = { name: c.name.toLowerCase(), slug: c.slug, tags: c.tags.join(' ').toLowerCase(), desc: c.description.toLowerCase() };
      let score = 0;
      for (const w of words) {
        if (hay.name.includes(w)) score += 5;
        if (hay.slug.includes(w)) score += 3;
        if (hay.tags.includes(w)) score += 2;
        if (hay.desc.includes(w)) score += 1;
      }
      return { c, score: words.length ? score : 1 };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.c);
}

/** Raw source files of a component (.tsx + .css). */
export function readSource(c: ComponentEntry) {
  const dir = c.folder === '.' ? LIB : path.join(LIB, c.folder);
  const read = (ext: string) => {
    const p = path.join(dir, `${c.file}.${ext}`);
    return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
  };
  // helper modules such as cart-store.ts are components in the registry too
  return { tsx: read('tsx') ?? read('ts'), css: read('css') };
}

/** The exported `<Name>Props` interface (plus any types it is declared next to). */
export function extractProps(tsx: string | null, file: string): string | null {
  if (!tsx) return null;
  const start = tsx.search(new RegExp(`export interface ${file}Props\\b`));
  if (start < 0) return null;
  let depth = 0;
  for (let i = tsx.indexOf('{', start); i < tsx.length; i++) {
    if (tsx[i] === '{') depth++;
    else if (tsx[i] === '}' && --depth === 0) return tsx.slice(start, i + 1);
  }
  return null;
}

export function categoryList() {
  return cats.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
    count: components.filter((x) => x.category === c.id).length,
    import: c.id === 'sections' ? `${PKG}/sections` : `${PKG}/${c.id}`,
  }));
}

export const sectionCategoryList = () =>
  sectionCats.map((c) => ({ id: c.id, name: c.name, description: c.description, count: components.filter((x) => x.sectionCategory === c.id).length }));

interface TemplateRaw {
  slug: string;
  name: L;
  tagline: L;
  description: L;
  highlights: Record<Lang, string[]>;
  previewBase: string;
  pages: { id: string; path: string; name: L; description: L }[];
  newComponents: string[];
  reusedComponents: string[];
}
type Snip = Record<string, { pages: Record<string, { file: string; code: string }>; storeConfigExample: string }>;

export const templates = (registry.templates as unknown as TemplateRaw[]).map((t) => ({
  slug: t.slug,
  name: t.name.en,
  tagline: t.tagline.en,
  description: t.description.en,
  highlights: t.highlights.en,
  import: `${PKG}/templates/${t.slug}`,
  livePreview: `${SITE}${t.previewBase}`,
  docsUrl: `${SITE}/templates/${t.slug}/`,
  pages: t.pages.map((p) => ({
    id: p.id,
    name: p.name.en,
    description: p.description.en,
    livePreview: `${SITE}${t.previewBase}${p.path}`,
    nextjsFile: (snippets as Snip)[t.slug]?.pages[p.id]?.file,
    code: (snippets as Snip)[t.slug]?.pages[p.id]?.code,
  })),
  configExample: (snippets as Snip)[t.slug]?.storeConfigExample,
  newComponents: t.newComponents,
  reusedComponents: t.reusedComponents,
}));

export const designTokens = () => fs.readFileSync(path.join(ROOT, 'src/styles/global.css'), 'utf8');

export const stats = () => ({
  name: 'React Components Kit',
  package: PKG,
  version: VERSION,
  components: components.filter((c) => c.category !== 'sections').length,
  sections: components.filter((c) => c.category === 'sections').length,
  templates: templates.length,
  categories: cats.length,
});
