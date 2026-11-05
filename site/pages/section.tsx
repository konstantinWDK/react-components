import { notFound } from 'next/navigation';
import type { Locale } from '../config/site';
import { siteConfig } from '../config/site';
import { allSections, sectionCategories } from '../data/registry';
import { demoMeta } from '../demos/meta';
import { useTranslations, getLocalizedPath } from '../i18n/translations';
import { getLocalizedComponent, getLocalizedSectionCategory, getComponentSeoMeta } from '../i18n/catalog';
import { buildMetadata } from '../lib/seo';
import { DocsLayout } from '../layout/DocsLayout';
import { CodeBlock } from '../docs/CodeBlock';
import { readComponentSource } from '../docs/source';
import { SectionRenderer } from '../docs/SectionRenderer';
import '../styles/section-page.css';

export const sectionParams = () => allSections.filter((s) => demoMeta[s.slug]).map((s) => ({ slug: s.slug }));

export function sectionMetadata(slug: string, lang: Locale) {
  const s = allSections.find((x) => x.slug === slug);
  if (!s) return {};
  const seo = getComponentSeoMeta(s, lang);
  return buildMetadata({ path: `/sections/${slug}`, lang, title: seo.title, description: seo.description });
}

const Arrow = ({ dir }: { dir: 'prev' | 'next' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'prev' ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'} />
  </svg>
);

/** Port of SectionSlugPage.astro. */
export function SectionPage({ slug, lang }: { slug: string; lang: Locale }) {
  const raw = allSections.find((s) => s.slug === slug);
  const meta = demoMeta[slug];
  if (!raw || !meta) notFound();
  const t = useTranslations(lang);
  const section = getLocalizedComponent(raw, lang);
  const rawCat = sectionCategories.find((c) => c.id === raw.sectionCategory);
  const sectionCategory = rawCat ? getLocalizedSectionCategory(rawCat, lang) : null;

  const list = allSections.filter((s) => demoMeta[s.slug]);
  const idx = list.findIndex((s) => s.slug === slug);
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx < list.length - 1 ? list[idx + 1] : null;

  const usage = `import { ${meta.file} } from '${siteConfig.packageName}/sections';\n\n${meta.usage}`;
  const src = readComponentSource(meta.category, meta.file);

  return (
    <DocsLayout lang={lang} path={`/sections/${slug}`}>
      <div className="doc-page anim-fade-in">
        <nav className="doc-nav" aria-label={t('nav.sections')}>
          {prev ? <a href={getLocalizedPath(`/sections/${prev.slug}`, lang)} className="doc-nav-link doc-nav-link--prev"><Arrow dir="prev" /><span>{prev.name}</span></a> : <span />}
          {next ? <a href={getLocalizedPath(`/sections/${next.slug}`, lang)} className="doc-nav-link doc-nav-link--next"><span>{next.name}</span><Arrow dir="next" /></a> : <span />}
        </nav>

        <nav className="breadcrumb" aria-label={t('a11y.breadcrumb')}>
          <a href={getLocalizedPath('/', lang)}>{t('nav.home')}</a>
          <span className="breadcrumb__sep">›</span>
          <a href={getLocalizedPath('/sections', lang)}>{t('nav.sections')}</a>
          {sectionCategory && (<><span className="breadcrumb__sep">›</span><span className="breadcrumb__current">{sectionCategory.name}</span></>)}
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{section.name}</span>
        </nav>

        <header className="section-header">
          <span className="section-header__badge">{sectionCategory?.name ?? 'Section'}</span>
          <h1 className="section-header__title">{section.name}</h1>
          <p className="section-header__desc">{section.description}</p>
          <div className="section-header__tags">{section.tags.map((tag) => <span key={tag} className="section-header__tag">{tag}</span>)}</div>
        </header>

        <section className="doc-section anim-slide-up" id="section-preview">
          <div className="section-preview-full">
            <div className="section-preview-full__label">{t('doc.livePreview')}</div>
            <SectionRenderer slug={slug} />
          </div>
        </section>

        <section className="doc-section anim-slide-up" id="section-usage" style={{ animationDelay: '0.1s' }}>
          <h2 className="doc-section__title">{t('doc.usage')}</h2>
          <p className="doc-section__subtitle">{t('doc.usageDesc')}</p>
          <CodeBlock code={usage} lang="tsx" id={`usage-${slug}`} />
        </section>

        <section className="doc-section anim-slide-up" id="section-code" style={{ animationDelay: '0.2s' }}>
          <h2 className="doc-section__title">{t('doc.manualInstall')}</h2>
          <div className="manual-box">
            <p>{t('doc.manualInstallDesc')} <code>src/components/sections/{meta.file}.tsx</code> + <code>{meta.file}.css</code>:</p>
          </div>
          <div style={{ marginTop: 'var(--sp-4)', display: 'grid', gap: 'var(--sp-4)' }}>
            {src.tsx && <CodeBlock code={src.tsx} lang="tsx" title={`${meta.file}.tsx`} id={`code-${slug}`} />}
            {src.css && <CodeBlock code={src.css} lang="css" title={`${meta.file}.css`} id={`css-${slug}`} />}
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
