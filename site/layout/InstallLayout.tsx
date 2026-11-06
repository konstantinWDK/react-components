import type { ReactNode } from 'react';
import type { Locale } from '../config/site';
import { useTranslations } from '../i18n/translations';
import { DocsLayout } from './DocsLayout';

/** Installation page: same header and full docs sidebar as the component pages, with a fixed TOC. */
export function InstallLayout({ lang, children }: { lang: Locale; children: ReactNode }) {
  const t = useTranslations(lang);
  const toc = [
    { id: 'step-1', text: t('install.toc1') },
    { id: 'step-2', text: t('install.toc2') },
    { id: 'step-3', text: t('install.toc3') },
    { id: 'step-4', text: t('install.toc4') },
    { id: 'quick-reference', text: t('install.toc6') },
  ];
  return (
    <DocsLayout lang={lang} path="/install" toc={toc}>
      {children}
    </DocsLayout>
  );
}
