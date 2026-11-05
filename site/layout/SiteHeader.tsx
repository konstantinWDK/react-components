'use client';

import { useState } from 'react';
import type { Locale } from '../config/site';
import { siteConfig } from '../config/site';
import { getLocalizedPath, useTranslations } from '../i18n/translations';
import { NAV_ITEMS } from './nav';
import { LanguagePicker } from './LanguagePicker';
import { SisterSiteLink } from './SisterSiteLink';

export const GitHubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

/** Sticky docs header: logo, main menu, language picker, GitHub. `path` is the locale-free route. */
export function SiteHeader({ lang, path }: { lang: Locale; path: string }) {
  const t = useTranslations(lang);
  const [open, setOpen] = useState(false);
  const p = path.replace(/\/$/, '') || '/';
  return (
    <header className="docs-header">
      <div className="docs-header__inner">
        <a href={getLocalizedPath('/', lang)} className="docs-header__brand">
          <img src="/logo-animated.svg" alt="React Kit Components" className="brand-logo" />
        </a>
        <button className="site-menu-toggle" aria-label={t('a11y.menu')} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" /></svg>
        </button>
        <nav className={`docs-header__nav ${open ? 'is-open' : ''}`} id="site-nav">
          {NAV_ITEMS.map((item) => (
            <a key={item.key} href={getLocalizedPath(item.path, lang)} className={item.match(p) ? 'active' : undefined} aria-current={item.match(p) ? 'page' : undefined}>
              {t(item.key)}
            </a>
          ))}
          <LanguagePicker lang={lang} path={path} />
          <SisterSiteLink lang={lang} path={path} />
          <a href={siteConfig.github} target="_blank" rel="noopener" className="gh-link">
            <GitHubIcon />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
