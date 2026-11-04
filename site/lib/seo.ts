import type { Metadata } from 'next';
import { siteConfig, LOCALES, type Locale } from '../config/site';
import { getLocalizedPath } from '../i18n/translations';

/** Builds Next metadata with canonical + hreflang alternates, mirroring the Astro BaseLayout. */
export function buildMetadata({ path, lang, title, description }: { path: string; lang: Locale; title?: string; description?: string }): Metadata {
  const seo = siteConfig.seo[lang];
  const pageTitle = title ?? seo.title;
  const fullTitle = pageTitle.includes(siteConfig.name) ? pageTitle : `${pageTitle} — ${siteConfig.name}`;
  const desc = description ?? seo.description;
  const canonical = `${siteConfig.url}${getLocalizedPath(path, lang)}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description: desc,
    keywords: seo.keywords,
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical,
      languages: {
        en: `${siteConfig.url}${getLocalizedPath(path, 'en')}`,
        es: `${siteConfig.url}${getLocalizedPath(path, 'es')}`,
        ru: `${siteConfig.url}${getLocalizedPath(path, 'ru')}`,
        'x-default': `${siteConfig.url}${getLocalizedPath(path, 'en')}`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: fullTitle,
      description: desc,
      siteName: siteConfig.name,
      locale: LOCALES[lang].ogLocale,
      alternateLocale: Object.values(LOCALES).filter((l) => l.code !== lang).map((l) => l.ogLocale),
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description: desc },
    icons: { icon: '/favicon.svg' },
    verification: siteConfig.googleSearchConsoleVerification ? { google: siteConfig.googleSearchConsoleVerification } : undefined,
  };
}

export const LANG_PARAMS = [{ lang: 'es' }, { lang: 'ru' }];
export const asLocale = (l: string): Locale => (l === 'es' || l === 'ru' ? l : 'en');
