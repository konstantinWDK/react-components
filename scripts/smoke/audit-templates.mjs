// Checks every template preview page: JS errors + visible content height.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let pw; try { pw = require('playwright'); } catch { pw = require('../../../astro-components/node_modules/playwright'); }
const base = process.argv[2] ?? 'http://localhost:5200';
const paths = [
  '/preview/ecommerce/', '/preview/ecommerce/shop/', '/preview/ecommerce/product/aurora-headphones/', '/preview/ecommerce/checkout/',
  '/preview/ecommerce-editorial/', '/preview/ecommerce-editorial/shop/', '/preview/ecommerce-editorial/bag/', '/preview/ecommerce-editorial/checkout/',
  '/preview/saas-hotel/', '/preview/saas-hotel/sign-in/', '/preview/saas-hotel/app/', '/preview/saas-hotel/app/reservations/',
  '/preview/saas-hotel/app/rooms/', '/preview/saas-hotel/app/guests/', '/preview/saas-hotel/app/reports/', '/preview/saas-hotel/app/settings/',
  '/preview/agency/', '/preview/agency/services/', '/preview/agency/services/ads/', '/preview/agency/work/', '/preview/agency/work/casa-alba-hotels/', '/preview/agency/pricing/',
  '/preview/agency/about/', '/preview/agency/contact/',
  '/preview/portfolio/', '/preview/portfolio/projects/', '/preview/portfolio/projects/tidy/', '/preview/portfolio/blog/',
  '/preview/portfolio/blog/instanced-meshes-for-ui/', '/preview/portfolio/contact/',
  '/templates/ecommerce/', '/es/templates/saas-hotel/', '/ru/templates/ecommerce-editorial/',
  '/templates/agency/', '/es/templates/portfolio/',
];
const browser = await pw.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
for (const p of paths) {
  const errors = [];
  const onErr = (e) => errors.push(e.message.split('\n')[0]);
  const onCon = (m) => m.type() === 'error' && !/favicon|Failed to load resource/.test(m.text()) && errors.push(m.text().split('\n')[0]);
  page.on('pageerror', onErr); page.on('console', onCon);
  await page.goto(base + p, { waitUntil: 'networkidle', timeout: 60000 }).catch((e) => errors.push('NAV ' + e.message));
  await page.waitForTimeout(500);
  const h = await page.evaluate(() => document.body.scrollHeight);
  console.log(`${errors.length ? '✗' : '✓'} ${p}  h=${h}${errors.length ? '  ' + errors.slice(0, 2).join(' | ') : ''}`);
  page.off('pageerror', onErr); page.off('console', onCon);
}
await browser.close();
