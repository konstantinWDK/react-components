import type { ReactNode } from 'react';
import { LOCALES, siteConfig, DEFAULT_LOCALE, type Locale } from '../config/site';
import { StarGoalBanner } from './StarGoalBanner';
import { GitHubStarPrompt } from './GitHubStarPrompt';
import '../../src/styles/global.css';

/** <html>/<body> for one locale. Mirrors astro BaseLayout (JSON-LD, analytics, banners). */
export function RootShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  const locale = LOCALES[lang];
  const gtmId = siteConfig.googleTagManagerId;
  const gaId = siteConfig.googleAnalyticsId;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.seo[lang]?.description || siteConfig.seo[DEFAULT_LOCALE].description,
        inLanguage: locale.htmlLang,
      },
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.svg`,
        sameAs: [siteConfig.github, siteConfig.npm],
      },
    ],
  };

  return (
    <html lang={locale.htmlLang} dir={locale.dir} suppressHydrationWarning>
      <head>
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        {gaId && !gtmId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');` }} />
          </>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <StarGoalBanner lang={lang} />
        {children}
        <GitHubStarPrompt lang={lang} />
      </body>
    </html>
  );
}
