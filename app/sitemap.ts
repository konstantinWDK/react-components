import type { MetadataRoute } from 'next';
import { siteConfig, SUPPORTED_LOCALES } from '../site/config/site';
import { docsComponents } from '../site/data/registry';
import { getLocalizedPath } from '../site/i18n/translations';

export const dynamic = 'force-static';

/** Every page in every locale, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/install', '/sections', '/templates', ...docsComponents.map((c) => `/docs/${c.slug}`)];
  return paths.flatMap((p) =>
    SUPPORTED_LOCALES.map((lang) => ({
      url: `${siteConfig.url}${getLocalizedPath(p, lang)}`,
      changeFrequency: 'weekly' as const,
      priority: p === '/' ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(SUPPORTED_LOCALES.map((l) => [l, `${siteConfig.url}${getLocalizedPath(p, l)}`])) },
    })),
  );
}
