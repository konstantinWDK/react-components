import { notFound } from 'next/navigation';
import type { Locale } from '../config/site';
import { siteConfig } from '../config/site';
import { templates, allComponents } from '../data/registry';
import snippets from '../data/template-snippets.json';
import { demoMeta } from '../demos/meta';
import { previewProps, sectionPreviewProps } from '../demos/generated-meta';
import { useTranslations, getLocalizedPath } from '../i18n/translations';
import { getLocalizedComponent } from '../i18n/catalog';
import { buildMetadata } from '../lib/seo';
import { DocsLayout } from '../layout/DocsLayout';
import { CodeBlock } from '../docs/CodeBlock';
import { TemplateFrame } from '../docs/TemplateFrame';
import { TemplateMini } from '../docs/TemplateMini';
import '../styles/template-page.css';
import '../styles/templates-catalog.css';

type L = Record<Locale, string>;
interface TplPage { id: string; path: string; name: L; description: L; file: string }
interface Tpl { slug: string; name: L; tagline: L; description: L; highlights: Record<Locale, string[]>; previewBase: string; pages: TplPage[]; newComponents: string[]; reusedComponents: string[] }
type Snip = Record<string, { pages: Record<string, { file: string; code: string }>; storeConfigExample: string }>;

const getTpl = (slug: string) => (templates as unknown as Tpl[]).find((t) => t.slug === slug);

export const templateParams = () => templates.map((t) => ({ slug: t.slug }));

export function templateMetadata(slug: string, lang: Locale) {
  const tpl = getTpl(slug);
  if (!tpl) return {};
  const t = useTranslations(lang);
  return buildMetadata({ path: `/templates/${slug}`, lang, title: `${tpl.name[lang]} — ${t('templates.title')}`, description: tpl.tagline[lang] });
}

/** Port of TemplateDetailPage.astro. */
export function TemplatePage({ slug, lang }: { slug: string; lang: Locale }) {
  const tpl = getTpl(slug);
  if (!tpl) notFound();
  const t = useTranslations(lang);
  const snip = (snippets as Snip)[slug];

  const resolve = (slugs: string[]) =>
    slugs
      .map((s) => allComponents.find((c) => c.slug === s))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((c) => {
        const isSection = c.category === 'sections';
        const demo = isSection ? { props: sectionPreviewProps[c.slug] } : previewProps[c.slug] ?? {};
        return {
          slug: c.slug,
          name: c.name,
          description: getLocalizedComponent(c, lang).description,
          href: getLocalizedPath(`${isSection ? '/sections' : '/docs'}/${c.slug}`, lang),
          isSection,
          folder: demoMeta[c.slug]?.category ?? c.category,
          props: demo.props,
          maxWidth: (demo as { maxWidth?: string }).maxWidth,
        };
      });
  const newItems = resolve(tpl.newComponents);
  const reused = resolve(tpl.reusedComponents);
  const groups = [
    { id: 'new-sections', title: t('templates.newSections'), desc: t('templates.newSectionsDesc'), items: newItems.filter((c) => c.isSection), canvas: 1280 },
    { id: 'new-components', title: t('templates.newComponents'), desc: t('templates.newComponentsDesc'), items: newItems.filter((c) => !c.isSection), canvas: 720 },
  ].filter((g) => g.items.length > 0);
  const sourceUrl = `${siteConfig.github}/tree/main/src/components/lib/templates/${tpl.slug}`;
  const ext = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
  );

  return (
    <DocsLayout lang={lang} path={`/templates/${slug}`}>
      <div className="doc-page">
        <nav className="breadcrumb" aria-label={t('a11y.breadcrumb')}>
          <a href={getLocalizedPath('/', lang)}>{t('nav.home')}</a>
          <span className="breadcrumb__sep">›</span>
          <a href={getLocalizedPath('/templates', lang)}>{t('nav.templates')}</a>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{tpl.name[lang]}</span>
        </nav>

        <header className="td-header">
          <span className="td-header__badge">{t('templates.badge')}</span>
          <h1 className="td-header__title">{tpl.name[lang]}</h1>
          <p className="td-header__tagline">{tpl.tagline[lang]}</p>
          <p className="td-header__desc">{tpl.description[lang]}</p>
          <div className="td-header__stats">
            <span><strong>{tpl.pages.length}</strong> {t('templates.pagesCount')}</span>
            <span><strong>{newItems.filter((c) => !c.isSection).length + reused.length}</strong> {t('templates.componentsCount')}</span>
            <span><strong>0</strong> deps</span>
          </div>
          <div className="td-header__actions">
            <a className="tpl-btn tpl-btn--primary" href={tpl.previewBase} target="_blank" rel="noopener">{t('templates.openPreview')}{ext}</a>
            <a className="tpl-btn" href={sourceUrl} target="_blank" rel="noopener">{t('templates.source')}</a>
          </div>
        </header>

        <section className="doc-section" id="preview">
          <h2 className="doc-section__title" id="live-preview">{t('templates.livePreview')}</h2>
          <TemplateFrame src={tpl.previewBase} title={`${tpl.name[lang]} — ${t('templates.livePreview')}`} height={900} eager />
        </section>

        <section className="doc-section">
          <h2 className="doc-section__title" id="pages">{t('templates.pages')}</h2>
          <p className="doc-section__subtitle">{t('templates.pagesDesc')}</p>
          <div className="td-pages">
            {tpl.pages.map((p) => (
              <article key={p.id} className="td-page">
                <TemplateFrame src={`${tpl.previewBase}${p.path}`} title={p.name[lang]} height={1100} />
                <div className="td-page__body">
                  <h3><a className="td-page__link" href={`${tpl.previewBase}${p.path}`} target="_blank" rel="noopener">{p.name[lang]}</a></h3>
                  <p>{p.description[lang]}</p>
                  <code>{snip.pages[p.id]?.file}</code>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="doc-section">
          <h2 className="doc-section__title" id="included">{t('templates.highlights')}</h2>
          <ul className="td-highlights">{tpl.highlights[lang].map((h) => <li key={h}>{h}</li>)}</ul>
        </section>

        <section className="doc-section">
          <h2 className="doc-section__title" id="install">{t('templates.install')}</h2>
          <ol className="td-steps">
            <li>
              <h3>{t('templates.step1')}</h3>
              <CodeBlock code={`npm install ${siteConfig.packageName}`} lang="bash" id={`tpl-${tpl.slug}-install`} />
            </li>
            <li>
              <h3>{t('templates.step2')}</h3>
              <div className="td-files">
                {tpl.pages.map((p) => (
                  <div key={p.id}>
                    <p className="td-files__name"><code>{snip.pages[p.id]?.file}</code></p>
                    <CodeBlock code={snip.pages[p.id]?.code ?? ''} lang="tsx" id={`tpl-${tpl.slug}-${p.id}`} />
                  </div>
                ))}
              </div>
            </li>
            <li>
              <h3>{t('templates.step3')}</h3>
              <p>{t('templates.step3Desc')}</p>
              <CodeBlock code={snip.storeConfigExample} lang="tsx" id={`tpl-${tpl.slug}-config`} />
            </li>
          </ol>
        </section>

        {groups.map((g) => (
          <section key={g.id} className="doc-section">
            <h2 className="doc-section__title" id={g.id}>{g.title} <span className="td-count">{g.items.length}</span></h2>
            <p className="doc-section__subtitle">{g.desc}</p>
            <div className={`td-prev-grid ${g.canvas === 1280 ? 'td-prev-grid--sections' : ''}`}>
              {g.items.map((c) => (
                <article key={c.slug} className="td-prev">
                  <TemplateMini slug={c.slug} folder={c.folder} canvas={g.canvas} isSection={c.isSection} props={c.props} maxWidth={c.maxWidth} />
                  <div className="td-prev__body">
                    <span className="td-prev__kind">{c.isSection ? t('templates.kindSection') : t('templates.kindComponent')}</span>
                    <h3 className="td-prev__name"><a className="td-prev__link" href={c.href}>{c.name}</a></h3>
                    <p className="td-prev__desc">{c.description}</p>
                    <span className="td-prev__cta" aria-hidden="true">{c.isSection ? t('templates.viewSection') : t('templates.viewComponent')} →</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section className="doc-section">
          <h2 className="doc-section__title" id="reused-components">{t('templates.reused')}</h2>
          <p className="doc-section__subtitle">{t('templates.reusedDesc')}</p>
          <ul className="td-comps td-comps--compact">
            {reused.map((c) => <li key={c.slug}><a href={c.href}><strong>{c.name}</strong></a></li>)}
          </ul>
        </section>
      </div>
    </DocsLayout>
  );
}
