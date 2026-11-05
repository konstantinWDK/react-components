import { notFound } from 'next/navigation';
import type { Locale } from '../config/site';
import { siteConfig } from '../config/site';
import { docsComponents, getComponentBySlug, categories } from '../data/registry';
import { demoMeta, SPACIOUS_PREVIEW } from '../demos/meta';
import { DemoRenderer } from '../demos/DemoRenderer';
import HardcodedPreview from '../demos/HardcodedPreview';
import { HARDCODED_SLUGS } from '../demos/hardcoded-slugs';
import { useTranslations, getLocalizedPath } from '../i18n/translations';
import { getLocalizedCategory, getLocalizedComponent } from '../i18n/catalog';
import { DocsLayout } from '../layout/DocsLayout';
import { CodeBlock } from './CodeBlock';
import { readComponentSource } from './source';
import '../styles/preview-renderer.css';
import '../styles/doc-page.css';

const Arrow = ({ dir }: { dir: 'prev' | 'next' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'prev' ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'} />
  </svg>
);

export function DocPage({ slug, lang }: { slug: string; lang: Locale }) {
  const raw = getComponentBySlug(slug);
  const meta = demoMeta[slug];
  if (!raw || !meta) notFound();

  const t = useTranslations(lang);
  const comp = getLocalizedComponent(raw, lang);
  const rawCategory = categories.find((c) => c.id === comp.category);
  const category = rawCategory ? getLocalizedCategory(rawCategory, lang) : null;

  const idx = docsComponents.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? docsComponents[idx - 1] : null;
  const next = idx < docsComponents.length - 1 ? docsComponents[idx + 1] : null;

  const usage = `import { ${meta.file} } from '${siteConfig.packageName}/${meta.category}';\n\n${meta.usage}`;
  const src = readComponentSource(meta.category, meta.file);
  const path = `/docs/${slug}`;

  return (
    <DocsLayout lang={lang} path={path}>
      <div className="doc-page anim-fade-in">
        <nav className="doc-nav" aria-label={t('nav.components')}>
          {prev ? (
            <a href={getLocalizedPath(`/docs/${prev.slug}`, lang)} className="doc-nav-link doc-nav-link--prev"><Arrow dir="prev" /><span>{prev.name}</span></a>
          ) : <span />}
          {next ? (
            <a href={getLocalizedPath(`/docs/${next.slug}`, lang)} className="doc-nav-link doc-nav-link--next"><span>{next.name}</span><Arrow dir="next" /></a>
          ) : <span />}
        </nav>

        <nav className="breadcrumb" aria-label={t('a11y.breadcrumb')}>
          <a href={getLocalizedPath('/', lang)}>{t('nav.home')}</a>
          <span className="breadcrumb__sep">›</span>
          <span>{category?.name}</span>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{comp.name}</span>
        </nav>

        <header className="doc-header">
          <div className="doc-header__meta">
            <span className="doc-category-badge">{category?.name}</span>
            {comp.tags.map((tag) => <span key={tag} className="doc-tag">{tag}</span>)}
          </div>
          <h1 className="doc-title">{comp.name}</h1>
          <p className="doc-description">{comp.description}</p>
        </header>

        <section className="doc-section anim-slide-up" id="section-preview">
          <h2 className="doc-section__title visually-hidden">{t('doc.livePreview')}</h2>
          <div className="preview-container">
            {HARDCODED_SLUGS.has(slug) && !['buttons', 'feedback'].includes(meta.category) ? (
              <div className="preview-renderer"><HardcodedPreview slug={slug} /></div>
            ) : (
            <div className="preview-renderer">
              <div
                className={[
                  'preview-demo preview-demo--row preview-demo--wrap',
                  meta.category === 'buttons' && 'preview-demo--buttons',
                  SPACIOUS_PREVIEW.has(slug) && 'preview-demo--spacious',
                ].filter(Boolean).join(' ')}
              >
                <DemoRenderer category={meta.category} slug={slug} />
              </div>
            </div>
            )}
          </div>
        </section>

        <section className="doc-section anim-slide-up" id="section-usage" style={{ animationDelay: '0.1s' }}>
          <div className="usage-header">
            <h2 className="doc-section__title" style={{ marginBottom: 0, borderBottom: 'none' }}>{t('doc.usage')}</h2>
            <p className="doc-section__subtitle">{t('doc.usageDesc')}</p>
          </div>
          <div className="usage-code-wrapper" data-nosnippet="">
            <CodeBlock code={usage} lang="tsx" title="tsx" id={`usage-${slug}`} />
          </div>
        </section>

        <section className="doc-section anim-slide-up" id="section-code" style={{ animationDelay: '0.2s' }}>
          <h2 className="doc-section__title">{t('doc.manualInstall')}</h2>
          <div className="manual-box">
            <p>
              {t('doc.manualInstallDesc')} <code>src/components/{meta.file}.tsx</code> + <code>{meta.file}.css</code>:
            </p>
          </div>
          <div data-nosnippet="" style={{ marginTop: 'var(--sp-4)', display: 'grid', gap: 'var(--sp-4)' }}>
            {src.tsx && <CodeBlock code={src.tsx} lang="tsx" title={`${meta.file}.tsx`} id={`code-${slug}`} />}
            {src.css && <CodeBlock code={src.css} lang="css" title={`${meta.file}.css`} id={`css-${slug}`} />}
          </div>
        </section>

        <section className="doc-section" id="section-info">
          <h2 className="doc-section__title">{t('doc.quickInfo')}</h2>
          <dl className="props-list">
            <div className="props-row"><dt>{t('doc.category')}</dt><dd>{category?.name}</dd></div>
            <div className="props-row"><dt>{t('doc.filename')}</dt><dd><code>{meta.file}.tsx</code></dd></div>
            <div className="props-row"><dt>{t('doc.dependencies')}</dt><dd>{t('doc.depsNone')}</dd></div>
            <div className="props-row"><dt>{t('doc.tags')}</dt><dd className="tags-row">{comp.tags.map((tag) => <span key={tag} className="doc-tag">{tag}</span>)}</dd></div>
          </dl>
        </section>
      </div>
    </DocsLayout>
  );
}
