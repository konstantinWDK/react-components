import type { ReactNode } from 'react';
import type { Locale } from '../config/site';
import { useTranslations } from '../i18n/translations';
import { SiteHeader } from './SiteHeader';
import { Sidebar } from './Sidebar';
import { Toc } from './Toc';
import { getSidebarData } from './sidebar-data';
import '../styles/docs-layout.css';

/** Header + left sidebar + content + right TOC. `path` is the locale-free route (e.g. /docs/glass-button). */
export function DocsLayout({ lang, path, toc, children }: { lang: Locale; path: string; toc?: { id: string; text: string }[]; children: ReactNode }) {
  const t = useTranslations(lang);
  return (
    <div className="docs-shell">
      <SiteHeader lang={lang} path={path} />
      <div className="docs-body">
        <Sidebar lang={lang} path={path} data={getSidebarData(lang)} />
        <main className="docs-main">
          <div className="docs-content">{children}</div>
        </main>
        <Toc title={t('sidebar.onThisPage')} fixed={toc} />
      </div>
    </div>
  );
}
