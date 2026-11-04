import type { ReactNode } from 'react';
import { RootShell } from '../../site/layout/RootShell';
import { LANG_PARAMS, asLocale } from '../../site/lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => LANG_PARAMS;

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <RootShell lang={asLocale(lang)}>{children}</RootShell>;
}
