import type { Locale } from '../config/site';
import { allSections, sectionCategories, isPorted } from '../data/registry';
import { useTranslations, getLocalizedPath } from '../i18n/translations';
import { getLocalizedSectionCategory, getLocalizedComponent } from '../i18n/catalog';
import { buildMetadata } from '../lib/seo';
import { DocsLayout } from '../layout/DocsLayout';
import { SectionsGrid } from '../docs/SectionsGrid';
import '../styles/sections-catalog.css';

const COPY = {
  en: { title: 'Section Templates', desc: 'Complete page sections: heroes, features, pricing, CTAs, testimonials, and more.', all: 'All Sections', sections: 'Sections', cats: 'Categories' },
  es: { title: 'Secciones de Página', desc: 'Bloques completos listos para landing pages: héroes, bento grids, precios, testimonios, llamadas a la acción y preguntas frecuentes.', all: 'Todas las secciones', sections: 'Secciones', cats: 'Categorías' },
  ru: { title: 'Секции страниц', desc: 'Полноразмерные секции страниц: главные экраны, бенто-сетки, тарифы, отзывы, призывы к действию и FAQ.', all: 'Все секции', sections: 'Секций', cats: 'Категорий' },
};

export const sectionsMetadata = (lang: Locale) => buildMetadata({ path: '/sections', lang, title: COPY[lang].title, description: COPY[lang].desc });

export function SectionsCatalogPage({ lang }: { lang: Locale }) {
  const t = useTranslations(lang);
  const c = COPY[lang];
  const sections = allSections.map((s) => getLocalizedComponent(s, lang));
  const cats = sectionCategories.map((sc) => getLocalizedSectionCategory(sc, lang));
  const tabs = [
    { id: 'all', name: c.all, count: sections.length },
    ...cats.map((cat) => ({ id: cat.id, name: cat.name, count: sections.filter((s) => s.sectionCategory === cat.id).length })),
  ];
  const cards = sections.map((s) => ({
    slug: s.slug,
    name: s.name,
    description: s.description,
    category: s.sectionCategory ?? '',
    categoryLabel: cats.find((x) => x.id === s.sectionCategory)?.name ?? 'Section',
    tags: s.tags,
    href: isPorted(s.slug) ? getLocalizedPath(`/sections/${s.slug}`, lang) : null,
  }));

  return (
    <DocsLayout lang={lang} path="/sections">
      <div className="doc-page">
        <nav className="breadcrumb" aria-label={t('a11y.breadcrumb')}>
          <a href={getLocalizedPath('/', lang)}>{t('nav.home')}</a>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{t('nav.sections')}</span>
        </nav>
        <header className="sections-header">
          <span className="sections-header__badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
            {sections.length} {c.sections} · {sectionCategories.length} {c.cats}
          </span>
          <h1 className="sections-header__title">{c.title}</h1>
          <p className="sections-header__desc">{c.desc}</p>
        </header>
        <SectionsGrid
          tabs={tabs}
          cards={cards}
          labels={{ filter: t('a11y.filterSections'), view: t('doc.viewSection'), soon: t('common.comingSoon'), soonDesc: t('common.comingSoonDesc') }}
        />
      </div>
    </DocsLayout>
  );
}
