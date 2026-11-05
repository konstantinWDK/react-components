/**
 * Visits every docs/section page of the static export and reports JS errors and empty previews.
 * Usage: node scripts/smoke/audit-pages.mjs http://localhost:5200 [filter]
 * Needs playwright (resolved from ../astro-components/node_modules if not installed here).
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('../../../astro-components/node_modules/playwright'); }

const base = process.argv[2] ?? 'http://localhost:5200';
const filter = process.argv[3];
const reg = JSON.parse(fs.readFileSync(new URL('../../site/data/registry.json', import.meta.url)));
const urls = reg.components
  .filter((c) => !filter || c.slug.includes(filter) || c.category === filter)
  .map((c) => ({ slug: c.slug, url: `${base}/${c.category === 'sections' ? 'sections' : 'docs'}/${c.slug}/` }));

const browser = await pw.chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const results = [];
const CONCURRENCY = 6;
let i = 0;
async function worker() {
  const page = await ctx.newPage();
  while (i < urls.length) {
    const { slug, url } = urls[i++];
    const errors = [];
    const onErr = (e) => errors.push(e.message.split('\n')[0]);
    const onCon = (m) => { if (m.type() === 'error' && !/favicon|Failed to load resource/.test(m.text())) errors.push(m.text().split('\n')[0]); };
    page.on('pageerror', onErr);
    page.on('console', onCon);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(400);
      const box = await page.evaluate(() => {
        const el = document.querySelector('.preview-demo, .section-preview-full');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const inner = el.querySelector('.dynamic-preview-container, .preview-demo__item') ?? el.firstElementChild;
        const ir = inner?.getBoundingClientRect();
        return { h: Math.round(r.height), innerH: Math.round(ir?.height ?? 0), text: (el.textContent || '').trim().length };
      });
      results.push({ slug, errors, box });
    } catch (e) {
      results.push({ slug, errors: [...errors, 'NAV: ' + e.message.split('\n')[0]], box: null });
    }
    page.off('pageerror', onErr);
    page.off('console', onCon);
  }
  await page.close();
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await browser.close();

const bad = results.filter((r) => r.errors.length || !r.box || r.box.innerH < 8);
console.log(`audit: ${results.length} pages, ${bad.length} with problems`);
for (const r of bad) console.log(`  ✗ ${r.slug}: ${r.errors.slice(0, 2).join(' | ') || ''} ${r.box ? `[preview inner h=${r.box.innerH}]` : '[no preview]'}`);
fs.writeFileSync(new URL('./audit-results.json', import.meta.url), JSON.stringify(results, null, 1));
