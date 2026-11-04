import type { Locale } from '../config/site';
import { templates } from '../data/registry';
import { getLocalizedPath, useTranslations } from '../i18n/translations';
import '../styles/templates-promo.css';

/** Home block announcing the multi-page templates (port of TemplatesPromo.astro). */
const COPY = {
  en: {
    eyebrow: 'Coming soon · Complete templates',
    title: 'Not just components.',
    highlight: 'Whole sites, ready to ship.',
    text: 'Templates assemble library components into complete, multi-page sites. The three Astro templates are being ported to React: E-commerce Store, Editorial Boutique and SaaS Hotel.',
    pagesLabel: 'pages', componentsLabel: 'components', themesLabel: 'Light & dark',
    pages: ['Store home', 'Category', 'Product page', 'Checkout'],
    included: (n: number) => `${n} templates · E-commerce Store, E-commerce 2 Editorial, SaaS Hotel`,
    cta: 'Explore templates',
    soon: 'Coming next: SaaS landing · Dashboard · Blog',
  },
  es: {
    eyebrow: 'Próximamente · Plantillas completas',
    title: 'No solo componentes.',
    highlight: 'Sitios enteros, listos para publicar.',
    text: 'Las plantillas combinan componentes de la librería en sitios completos de varias páginas. Las tres plantillas de Astro se están portando a React: tienda e-commerce, boutique editorial y hotel SaaS.',
    pagesLabel: 'páginas', componentsLabel: 'componentes', themesLabel: 'Claro y oscuro',
    pages: ['Home de tienda', 'Categoría', 'Ficha de producto', 'Checkout'],
    included: (n: number) => `${n} plantillas · Tienda e-commerce, E-commerce 2 Editorial, Hotel SaaS`,
    cta: 'Ver plantillas',
    soon: 'Después: landing SaaS · Dashboard · Blog',
  },
  ru: {
    eyebrow: 'Скоро · Готовые шаблоны',
    title: 'Не только компоненты.',
    highlight: 'Целые сайты, готовые к запуску.',
    text: 'Шаблоны собирают компоненты библиотеки в полноценные многостраничные сайты. Три шаблона Astro переносятся на React: интернет-магазин, редакционный бутик и SaaS для отеля.',
    pagesLabel: 'страниц', componentsLabel: 'компонентов', themesLabel: 'Светлая и тёмная',
    pages: ['Главная магазина', 'Категория', 'Карточка товара', 'Оформление заказа'],
    included: (n: number) => `Шаблонов: ${n} · интернет-магазин, E-commerce 2 Editorial, SaaS-отель`,
    cta: 'Смотреть шаблоны',
    soon: 'Далее: SaaS-лендинг · Дашборд · Блог',
  },
};

const PAGE_ICONS = [
  '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  '<path d="M6 7h12l-1 13H7z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/>',
  '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
];

export function TemplatesPromo({ lang }: { lang: Locale }) {
  const copy = COPY[lang];
  const t = useTranslations(lang);
  const tpl = templates[0];
  const componentCount = tpl.newComponents.length + tpl.reusedComponents.length;
  const Win = ({ name }: { name: string }) => (
    <div className="tpl-promo__placeholder">
      <span className="tpl-promo__placeholder-bar"><i /><i /><i /></span>
      <span className="tpl-promo__placeholder-name">{name}</span>
      <span className="tpl-promo__placeholder-badge">{t('common.comingSoon')}</span>
    </div>
  );

  return (
    <section className="section tpl-promo" id="templates" aria-labelledby="tpl-promo-title">
      <div className="container">
        <div className="tpl-promo__panel">
          <div className="tpl-promo__glow" aria-hidden="true" />
          <div className="tpl-promo__copy">
            <span className="tpl-promo__eyebrow"><span className="tpl-promo__pulse" aria-hidden="true" />{copy.eyebrow}</span>
            <h2 className="tpl-promo__title" id="tpl-promo-title">{copy.title} <em>{copy.highlight}</em></h2>
            <p className="tpl-promo__text">{copy.text}</p>
            <p className="tpl-promo__included">{copy.included(templates.length)}</p>
            <ul className="tpl-promo__pages">
              {copy.pages.map((p, i) => (
                <li key={p}>
                  <a href={getLocalizedPath('/templates', lang)}>
                    <span className="tpl-promo__page-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: PAGE_ICONS[i] }} />
                    </span>
                    {p}
                  </a>
                </li>
              ))}
            </ul>
            <dl className="tpl-promo__stats">
              <div><dt>{copy.pagesLabel}</dt><dd>{tpl.pages.length}</dd></div>
              <div><dt>{copy.componentsLabel}</dt><dd>{componentCount}</dd></div>
              <div><dt>{copy.themesLabel}</dt><dd aria-hidden="true">◐</dd></div>
            </dl>
            <div className="tpl-promo__ctas">
              <a className="tpl-promo__btn tpl-promo__btn--primary" href={getLocalizedPath('/templates', lang)}>
                {copy.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
            <p className="tpl-promo__soon">{copy.soon}</p>
          </div>

          <div className="tpl-promo__stage" aria-hidden="true">
            <div className="tpl-promo__win tpl-promo__win--main"><Win name={copy.pages[0]} /></div>
            <div className="tpl-promo__win tpl-promo__win--product"><Win name={copy.pages[2]} /></div>
            <div className="tpl-promo__win tpl-promo__win--checkout"><Win name={copy.pages[3]} /></div>
            <span className="tpl-promo__chip tpl-promo__chip--cart">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Added to cart
            </span>
            <span className="tpl-promo__chip tpl-promo__chip--code">&lt;StoreHomePage /&gt;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
