import type { Locale } from '../config/site';
import { useTranslations, type TranslationKey } from '../i18n/translations';

/** Top menu, same order as astrocomponents.dev. */
export const NAV_ITEMS: { key: TranslationKey; path: string; match: (p: string) => boolean }[] = [
  { key: 'nav.home', path: '/', match: (p) => p === '/' },
  { key: 'nav.install', path: '/install', match: (p) => p.startsWith('/install') },
  { key: 'nav.mcp', path: '/mcp', match: (p) => p.startsWith('/mcp') },
  { key: 'nav.components', path: '/install', match: (p) => p.startsWith('/docs') },
  { key: 'nav.sections', path: '/sections', match: (p) => p.startsWith('/sections') },
  { key: 'nav.templates', path: '/templates', match: (p) => p.startsWith('/templates') },
];

export const navLabels = (lang: Locale) => {
  const t = useTranslations(lang);
  return NAV_ITEMS.map((i) => ({ ...i, label: t(i.key) }));
};
