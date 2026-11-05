/** MCP server definition: tools exposed to AI agents (Claude, Cursor, Codex, …). */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import {
  PKG, VERSION, SITE, components, findComponent, searchComponents, readSource, extractProps,
  categoryList, sectionCategoryList, templates, designTokens, stats, type ComponentEntry,
} from './data';

const text = (t: string) => ({ content: [{ type: 'text' as const, text: t }] });
const json = (v: unknown) => text(JSON.stringify(v, null, 2));
const notFound = (slug: string) => {
  const near = searchComponents(slug.replace(/-/g, ' '), undefined, 5).map((c) => c.slug);
  return { ...text(`Component "${slug}" not found.${near.length ? ` Did you mean: ${near.join(', ')}?` : ''} Use search_components to find slugs.`), isError: true };
};

const brief = (c: ComponentEntry) => ({
  slug: c.slug,
  name: c.name,
  category: c.category,
  ...(c.sectionCategory ? { sectionCategory: c.sectionCategory } : {}),
  description: c.description,
  import: c.importStatement,
  ...(c.peer ? { requires: `npm install ${c.peer}` } : {}),
});

const SETUP = `npm install ${PKG}

// Once, in your root layout (Next.js app/layout.tsx) or entry (Vite src/main.tsx):
import '${PKG}/global.css'; // design tokens + base styles (dark default, light via <html data-theme="light">)
import '${PKG}/styles.css'; // component styles (scoped, no collisions)`;

export function createMcpServer() {
  const server = new McpServer(
    { name: 'react-components-kit', version: VERSION },
    {
      instructions: `React Components Kit (${PKG}) — ${stats().components} React 18/19 components, ${stats().sections} page sections and ${stats().templates} multi-page templates. Plain CSS + design tokens, no Tailwind, zero runtime dependencies, TypeScript, SSR-safe ('use client' on every module).
Workflow: search_components → get_component (props + usage + import) → get_component_code only if the user wants to copy the source instead of installing from npm.
Always remind the user of the one-time CSS imports from get_library_info.`,
    },
  );

  server.registerTool(
    'search_components',
    {
      title: 'Search components',
      description: 'Search React components and page sections by keyword (e.g. "button", "pricing", "kpi chart", "cart", "modal", "hero"). Returns slug, description and the import statement.',
      inputSchema: {
        query: z.string().describe('Keywords, e.g. "glass button" or "testimonial"'),
        category: z.string().optional().describe('Optional category id (see list_categories), e.g. "charts", "sections", "hero"'),
        limit: z.number().int().min(1).max(50).optional().describe('Max results (default 15)'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ query, category, limit }) => {
      const res = searchComponents(query, category, limit ?? 15);
      return res.length ? json(res.map(brief)) : text(`No results for "${query}". Try broader keywords or list_categories.`);
    },
  );

  server.registerTool(
    'list_components',
    {
      title: 'List components in a category',
      description: 'List every component (or section) in a category with slug, description and import statement.',
      inputSchema: { category: z.string().describe('Category id from list_categories, e.g. "buttons", "forms", "charts", "sections"') },
      annotations: { readOnlyHint: true },
    },
    async ({ category }) => {
      const res = components.filter((c) => c.category === category || c.sectionCategory === category);
      return res.length ? json(res.map(brief)) : { ...text(`Unknown category "${category}". Use list_categories.`), isError: true };
    },
  );

  server.registerTool(
    'get_component',
    {
      title: 'Get component details',
      description: 'Full details for a component: import statement, TypeScript props interface, usage example, peer dependency and docs link. Accepts a slug ("glass-button") or a component name ("GlassButton").',
      inputSchema: { slug: z.string().describe('Component slug or name') },
      annotations: { readOnlyHint: true },
    },
    async ({ slug }) => {
      const c = findComponent(slug);
      if (!c) return notFound(slug);
      const props = extractProps(readSource(c).tsx, c.file);
      return text(
        [
          `# ${c.name}`,
          c.description,
          '',
          `Category: ${c.category}${c.sectionCategory ? ` / ${c.sectionCategory}` : ''} · Tags: ${c.tags.join(', ')}`,
          `Docs + live preview: ${c.docsUrl}`,
          '',
          '## Install',
          '```bash',
          `npm install ${PKG}${c.peer ? ` ${c.peer}` : ''}`,
          '```',
          '',
          '## Import',
          '```tsx',
          c.importStatement,
          '```',
          '',
          '## Usage',
          '```tsx',
          c.usage,
          '```',
          ...(props ? ['', '## Props', '```ts', props, '```'] : []),
          '',
          `Remember the one-time CSS imports: '${PKG}/global.css' and '${PKG}/styles.css'.`,
        ].join('\n'),
      );
    },
  );

  server.registerTool(
    'get_component_code',
    {
      title: 'Get component source code',
      description: 'Complete TypeScript (.tsx) and CSS source of a component, to copy into a project without npm. The CSS reads the design tokens from get_design_tokens.',
      inputSchema: { slug: z.string().describe('Component slug or name') },
      annotations: { readOnlyHint: true },
    },
    async ({ slug }) => {
      const c = findComponent(slug);
      if (!c) return notFound(slug);
      const { tsx, css } = readSource(c);
      const out = [`# ${c.file} — source (${PKG}@${VERSION})`, ''];
      out.push(`## ${c.file}.tsx`, '```tsx', tsx ?? '// not found', '```');
      if (css) out.push('', `## ${c.file}.css`, '```css', css, '```');
      out.push('', 'Notes: needs the design tokens (get_design_tokens). Some components import small helpers (e.g. ../utils); prefer `npm install ' + PKG + '` when possible.');
      return text(out.join('\n'));
    },
  );

  server.registerTool(
    'list_categories',
    {
      title: 'List categories',
      description: 'All component categories (with entry points and counts) and the page-section categories.',
      annotations: { readOnlyHint: true },
    },
    async () => json({ componentCategories: categoryList(), sectionCategories: sectionCategoryList() }),
  );

  server.registerTool(
    'list_templates',
    {
      title: 'List templates',
      description: 'Multi-page production templates (Nova Store e-commerce, Forma editorial shop, Lobby SaaS hotel PMS) with pages and live previews.',
      annotations: { readOnlyHint: true },
    },
    async () =>
      json(templates.map((t) => ({ slug: t.slug, name: t.name, tagline: t.tagline, import: t.import, livePreview: t.livePreview, pages: t.pages.map((p) => p.id) }))),
  );

  server.registerTool(
    'get_template',
    {
      title: 'Get template',
      description: 'Template specification and ready-to-paste Next.js App Router files for every page (or one page). Slugs: "ecommerce", "ecommerce-editorial", "saas-hotel".',
      inputSchema: {
        slug: z.string().describe('Template slug'),
        page: z.string().optional().describe('Optional page id to return only that page (see list_templates)'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ slug, page }) => {
      const t = templates.find((x) => x.slug === slug.trim().toLowerCase());
      if (!t) return { ...text(`Unknown template "${slug}". Available: ${templates.map((x) => x.slug).join(', ')}`), isError: true };
      const pages = page ? t.pages.filter((p) => p.id === page) : t.pages;
      if (!pages.length) return { ...text(`Unknown page "${page}". Pages: ${t.pages.map((p) => p.id).join(', ')}`), isError: true };
      const out = [
        `# ${t.name} — ${t.tagline}`, t.description, '',
        ...t.highlights.map((h) => `- ${h}`), '',
        `Import: \`${t.import}\` · Live preview: ${t.livePreview} · Docs: ${t.docsUrl}`, '',
        '## Setup', '```tsx', SETUP, '```',
      ];
      if (t.configExample && !page) out.push('', '## Configuration', '```ts', t.configExample, '```');
      for (const p of pages) {
        out.push('', `## Page: ${p.name} (${p.id})`, p.description, `Preview: ${p.livePreview}`);
        if (p.code) out.push('', `\`${p.nextjsFile}\``, '```tsx', p.code, '```');
      }
      return text(out.join('\n'));
    },
  );

  server.registerTool(
    'get_design_tokens',
    {
      title: 'Get design tokens',
      description: 'The CSS design tokens (colors, surfaces, radii, spacing, typography) and how to re-theme or switch dark/light.',
      annotations: { readOnlyHint: true },
    },
    async () =>
      text(
        [
          '# Design tokens (global.css)',
          'Dark theme is the default; light theme: `<html data-theme="light">`. Re-theme by overriding the custom properties (e.g. --c-primary, --c-primary-light, --c-bg, --c-text-1) on :root or any wrapper — every component, including translucent accents, follows them.',
          '',
          '```css',
          designTokens(),
          '```',
        ].join('\n'),
      ),
  );

  server.registerTool(
    'get_library_info',
    {
      title: 'Library info and setup',
      description: 'Overview of React Components Kit: version, counts, install command, required CSS imports, entry points and optional peer dependencies.',
      annotations: { readOnlyHint: true },
    },
    async () => {
      const s = stats();
      return text(
        [
          `# React Components Kit v${s.version}`,
          `${s.components} components, ${s.sections} page sections and ${s.templates} multi-page templates for React 18 & 19. Plain CSS + design tokens (no Tailwind), zero runtime dependencies, TypeScript, SSR-safe (Next.js App Router, Vite, Remix…). MIT.`,
          '',
          '## Setup',
          '```tsx',
          SETUP,
          '```',
          '',
          '## Entry points',
          ...categoryList().map((c) => `- \`${c.import}\` — ${c.name} (${c.count})`),
          ...templates.map((t) => `- \`${t.import}\` — template: ${t.name}`),
          `- \`${PKG}/apexcharts\` — AreaChart, BarChart, DonutChart (needs \`npm install apexcharts\`)`,
          `- \`${PKG}/three\` — Galaxy3D (needs \`npm install three\`)`,
          '',
          `Docs: ${SITE} · npm: https://www.npmjs.com/package/${PKG} · GitHub: https://github.com/konstantinWDK/react-components`,
        ].join('\n'),
      );
    },
  );

  return server;
}
