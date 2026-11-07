import type { Locale } from '../config/site';
import { categories, sectionCategories, components, templates } from '../data/registry';
import { getLocalizedCategory, getLocalizedSectionCategory } from '../i18n/catalog';
import { useTranslations } from '../i18n/translations';

export interface SidebarGroup {
  id: string;
  name: string;
  icon: string;
  isNew: boolean;
  items: { name: string; raw: string }[];
}

export interface SidebarData {
  componentGroups: SidebarGroup[];
  sectionGroups: SidebarGroup[];
  templates: { slug: string; name: string; pages: number }[];
  labels: Record<string, string>;
}

const NEW_CATEGORIES = new Set(['ecommerce']);

/** Serializable sidebar model, built on the server (only ported items are listed). */
export function getSidebarData(lang: Locale): SidebarData {
  const t = useTranslations(lang);
  const componentGroups = categories
    .filter((c) => c.id !== 'sections')
    .map((c) => ({
      id: c.id,
      name: getLocalizedCategory(c, lang).name,
      icon: c.icon,
      isNew: NEW_CATEGORIES.has(c.id),
      items: components.filter((x) => x.category === c.id).map((x) => ({ name: x.name, raw: `/docs/${x.slug}` })),
    }))
    .filter((g) => g.items.length > 0);

  const sectionGroups = sectionCategories
    .map((sc) => ({
      id: `s-${sc.id}`,
      name: getLocalizedSectionCategory(sc, lang).name,
      icon: sc.icon,
      isNew: false,
      items: components.filter((x) => x.category === 'sections' && x.sectionCategory === sc.id).map((x) => ({ name: x.name, raw: `/sections/${x.slug}` })),
    }))
    .filter((g) => g.items.length > 0);

  const tpl = templates.map((x) => ({ slug: x.slug, name: (x.name as unknown as Record<string, string>)[lang], pages: x.pages.length }));

  const keys = ['sidebar.navLabel', 'sidebar.getStarted', 'sidebar.search', 'sidebar.results', 'sidebar.noResultsFor', 'sidebar.clear', 'sidebar.viewAll', 'sidebar.new', 'sidebar.pages', 'sidebar.explore', 'sidebar.exploreLabel', 'nav.install', 'nav.mcp', 'nav.templates', 'nav.components', 'nav.sections'] as const;
  const labels = Object.fromEntries(keys.map((k) => [k, t(k)]));
  return { componentGroups, sectionGroups, templates: tpl, labels };
}
