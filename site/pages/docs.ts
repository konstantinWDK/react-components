import { docsComponents, getComponentBySlug } from '../data/registry';
import { getComponentSeoMeta } from '../i18n/catalog';
import { buildMetadata } from '../lib/seo';
import type { Locale } from '../config/site';

export { DocPage } from '../docs/DocPage';

export const docParams = () => docsComponents.map((c) => ({ slug: c.slug }));

export function docMetadata(slug: string, lang: Locale) {
  const comp = getComponentBySlug(slug);
  if (!comp) return {};
  const seo = getComponentSeoMeta(comp, lang);
  return buildMetadata({ path: `/docs/${slug}`, lang, title: seo.title, description: seo.description });
}
