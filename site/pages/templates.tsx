import type { Locale } from '../config/site';
import { templates } from '../data/registry';
import { useTranslations, getLocalizedPath } from '../i18n/translations';
import { buildMetadata } from '../lib/seo';
import { DocsLayout } from '../layout/DocsLayout';
import { TemplateFrame } from '../docs/TemplateFrame';
import '../styles/templates-catalog.css';

type L = Record<Locale, string>;
type LA = Record<Locale, string[]>;

const UPCOMING = [
  { en: 'SaaS landing', es: 'Landing SaaS', ru: 'SaaS-лендинг' },
  { en: 'Admin dashboard', es: 'Panel de administración', ru: 'Админ-панель' },
  { en: 'Blog & magazine', es: 'Blog y revista', ru: 'Блог и журнал' },
];

export const templatesMetadata = (lang: Locale) => {
  const t = useTranslations(lang);
  return buildMetadata({ path: '/templates', lang, title: t('templates.seoTitle'), description: t('templates.desc') });
};

/** Port of TemplatesCatalogPage.astro. */
export function TemplatesCatalogPage({ lang }: { lang: Locale }) {
  const t = useTranslations(lang);
  return (
    <DocsLayout lang={lang} path="/templates">
      <div className="doc-page">
        <nav className="breadcrumb" aria-label={t('a11y.breadcrumb')}>
          <a href={getLocalizedPath('/', lang)}>{t('nav.home')}</a>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{t('nav.templates')}</span>
        </nav>

        <header className="tpl-header">
          <span className="tpl-header__badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
            {t('templates.badge')} · {templates.length}
          </span>
          <h1 className="tpl-header__title">{t('templates.title')}</h1>
          <p className="tpl-header__desc">{t('templates.desc')}</p>
        </header>

        <div className="tpl-list">
          {templates.map((tpl) => {
            const components = tpl.newComponents.length + tpl.reusedComponents.length;
            const href = getLocalizedPath(`/templates/${tpl.slug}`, lang);
            const name = (tpl.name as unknown as L)[lang];
            return (
              <article key={tpl.slug} className="tpl-card">
                <div className="tpl-card__frame">
                  <TemplateFrame src={tpl.previewBase} title={`${name} — ${t('templates.livePreview')}`} eager />
                </div>
                <div className="tpl-card__body">
                  <div className="tpl-card__chips">
                    <span>{tpl.pages.length} {t('templates.pagesCount')}</span>
                    <span>{components} {t('templates.componentsCount')}</span>
                  </div>
                  <h2 className="tpl-card__title"><a href={href}>{name}</a></h2>
                  <p className="tpl-card__tagline">{(tpl.tagline as unknown as L)[lang]}</p>
                  <ul className="tpl-card__list">
                    {(tpl.highlights as unknown as LA)[lang].slice(0, 4).map((h) => <li key={h}>{h}</li>)}
                  </ul>
                  <div className="tpl-card__actions">
                    <a className="tpl-btn tpl-btn--primary" href={href}>{t('templates.view')}</a>
                    <a className="tpl-btn" href={tpl.previewBase} target="_blank" rel="noopener">
                      {t('templates.openPreview')}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <section className="tpl-soon" aria-label={t('templates.soon')}>
          <p>{t('templates.soon')}</p>
          <ul>{UPCOMING.map((u) => <li key={u.en}>{u[lang]}</li>)}</ul>
        </section>
      </div>
    </DocsLayout>
  );
}
