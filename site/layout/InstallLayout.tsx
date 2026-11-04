import type { ReactNode } from 'react';
import type { Locale } from '../config/site';
import { getLocalizedPath, useTranslations } from '../i18n/translations';
import { SiteHeader } from './SiteHeader';
import { Toc } from './Toc';
import '../styles/install-layout.css';

const label = (lang: Locale, en: string, es: string, ru: string) => (lang === 'es' ? es : lang === 'ru' ? ru : en);

/** Header + compact "Getting started / Browse" sidebar + content + fixed TOC (same as astro InstallLayout). */
export function InstallLayout({ lang, children }: { lang: Locale; children: ReactNode }) {
  const t = useTranslations(lang);
  const toc = [
    { id: 'step-1', text: t('install.toc1') },
    { id: 'step-2', text: t('install.toc2') },
    { id: 'step-3', text: t('install.toc3') },
    { id: 'step-4', text: t('install.toc4') },
    { id: 'quick-reference', text: t('install.toc6') },
  ];
  const Svg = ({ d }: { d: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: d }} />
  );
  return (
    <div className="docs-shell">
      <SiteHeader lang={lang} path="/install" />
      <div className="docs-body">
        <aside className="sidebar sidebar--install">
          <div className="sidebar--install__inner">
            <div className="sidebar--install__section">
              <span className="sidebar--install__label">{label(lang, 'Getting Started', 'Primeros Pasos', 'Начало работы')}</span>
              <nav className="sidebar--install__nav">
                <a href={getLocalizedPath('/install', lang)} className="sidebar--install__link sidebar--install__link--active" aria-current="page">
                  <span className="sidebar--install__icon"><Svg d='<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>' /></span>
                  {t('nav.install')}
                </a>
              </nav>
            </div>
            <div className="sidebar--install__section">
              <span className="sidebar--install__label">{label(lang, 'Browse', 'Explorar', 'Обзор')}</span>
              <nav className="sidebar--install__nav">
                <a href={getLocalizedPath('/docs/glass-button', lang)} className="sidebar--install__link">
                  <span className="sidebar--install__icon"><Svg d='<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>' /></span>
                  {t('nav.components')}
                </a>
                <a href={getLocalizedPath('/sections', lang)} className="sidebar--install__link">
                  <span className="sidebar--install__icon"><Svg d='<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>' /></span>
                  {t('nav.sections')}
                </a>
                <a href={getLocalizedPath('/templates', lang)} className="sidebar--install__link">
                  <span className="sidebar--install__icon"><Svg d='<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>' /></span>
                  {t('nav.templates')}
                </a>
              </nav>
            </div>
          </div>
        </aside>
        <main className="docs-main">
          <div className="docs-content">{children}</div>
        </main>
        <Toc title={t('sidebar.onThisPage')} fixed={toc} />
      </div>
    </div>
  );
}
