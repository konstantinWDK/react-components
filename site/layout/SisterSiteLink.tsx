import type { Locale } from '../config/site';
import { siteConfig } from '../config/site';
import { getLocalizedPath } from '../i18n/translations';
import '../styles/sister-link.css';

/**
 * Header icon linking to the Astro version of the kit (astrocomponents.dev), with a tooltip bubble
 * on hover / keyboard focus. Every page of this site exists on the Astro site, so it links to the
 * same page there.
 */
const COPY: Record<Locale, { title: string; label: string }> = {
  en: { title: 'Also available for Astro', label: 'Astro version of this kit (astrocomponents.dev)' },
  es: { title: 'También disponible para Astro', label: 'Versión Astro de este kit (astrocomponents.dev)' },
  ru: { title: 'Также доступно для Astro', label: 'Версия этого набора для Astro (astrocomponents.dev)' },
};

export function SisterSiteLink({ lang, path }: { lang: Locale; path: string }) {
  const copy = COPY[lang];
  const href = `${siteConfig.sister.url}${getLocalizedPath(path, lang)}`;
  return (
    <a href={href} className="sister-link" aria-label={copy.label} aria-describedby="sister-link-tip" rel="noopener">
      {/* Astro logo (Simple Icons, CC0) */}
      <svg className="sister-link__icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8.358 20.162c-1.186-1.07-1.532-3.316-1.038-4.944.856 1.026 2.043 1.352 3.272 1.535 1.897.283 3.76.177 5.522-.678.202-.098.388-.229.608-.36.166.473.209.95.151 1.437-.14 1.185-.738 2.1-1.688 2.794-.38.277-.782.525-1.175.787-1.205.804-1.531 1.747-1.078 3.119l.044.148a3.158 3.158 0 0 1-1.407-1.188 3.31 3.31 0 0 1-.544-1.815c-.004-.32-.004-.642-.048-.958-.106-.769-.472-1.113-1.161-1.133-.707-.02-1.267.411-1.415 1.09-.012.053-.028.104-.045.165h.002zm-5.961-4.445s3.24-1.575 6.49-1.575l2.451-7.565c.092-.366.36-.614.662-.614.302 0 .57.248.662.614l2.45 7.565c3.85 0 6.491 1.575 6.491 1.575L16.088.727C15.93.285 15.663 0 15.303 0H8.697c-.36 0-.615.285-.784.727l-5.516 14.99z" />
      </svg>
      <span className="sister-link__text">Astro</span>
      <span className="sister-link__tip" id="sister-link-tip" role="tooltip">
        <strong>{copy.title}</strong>
        <small>astrocomponents.dev ↗</small>
      </span>
    </a>
  );
}
