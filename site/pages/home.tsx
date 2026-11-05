import type { ReactNode } from 'react';
import type { Locale } from '../config/site';
import { siteConfig } from '../config/site';
import { buildMetadata } from '../lib/seo';
import { categories, components, allComponents, allSections } from '../data/registry';
import { getLocalizedPath } from '../i18n/translations';
import { getLocalizedCategory } from '../i18n/catalog';
import { SiteHeader } from '../layout/SiteHeader';
import { WhyBento } from '../home/WhyBento';
import { TemplatesPromo } from '../home/TemplatesPromo';
import { SectionRenderer } from '../docs/SectionRenderer';
import { CopyCommand, CubesHero, HomeEffects, SectionsCarouselNav } from '../home/HomeClient';
import { CyberpunkButton, GlowButton, LiquidButton, MagneticButton, NeonBorderButton, RetroArcadeButton, RippleButton, ShimmerButton } from '../../src/components/lib/buttons';
import { KpiStatTile, GaugeChart, ActivityRings, MeterGauge, WaffleChart, BulletChart, PieChart, FunnelChart } from '../../src/components/lib/charts';
import { InteractiveTiltCard } from '../../src/components/lib/cards';
import { OTPInput, NeumorphicSwitch, SearchReveal, StepperInput, PasswordStrengthInput, GlassInlineToggleGroup } from '../../src/components/lib/forms';
import { AvatarGroupStack, ProgressListSmall } from '../../src/components/lib/data';
import { FloatingTabBar } from '../../src/components/lib/navigation';
import { HackerDecodeText } from '../../src/components/lib/typography';
import pkg from '../../package.json';
import '../styles/home.css';

/*
 * Port of astro-components/src/components/home/HomePage.astro — same blocks, order and demo widgets.
 */

type Tri = Record<Locale, string>;
const tr = (lang: Locale, t: Tri) => t[lang];

const PKG = siteConfig.packageName;

export const homeMetadata = (lang: Locale) =>
  buildMetadata({
    path: '/',
    lang,
    title: tr(lang, {
      en: 'React Components Kit — Free UI Components & Templates for React',
      es: 'React Components Kit — Componentes UI y Plantillas Gratis para React',
      ru: 'React Components Kit — Бесплатные UI-компоненты и шаблоны для React',
    }),
  });

const ADVANTAGES: Record<Locale, { eyebrow: string; title: string; items: [string, string][] }> = {
  en: {
    eyebrow: 'Advantages',
    title: 'Why developers choose React Components Kit',
    items: [
      ['Works with every React stack', 'Vite, Next.js (App and Pages Router), Remix or plain React 18/19. Every module ships with "use client", SSR-safe ids and no global side effects, so components render on the server and hydrate cleanly.'],
      ['Copy-paste or npm install', 'Install the package and import by category, or copy a single component into your project. Every component is a self-contained .tsx + .css pair with no internal imports.'],
      ['Typed, native-first API', 'Every component exports its Props interface and forwards native HTML attributes: onClick, aria-*, className, style. Buttons render a real <button> or <a>, modals use the native <dialog>.'],
      ['Design system ready', 'CSS custom properties, consistent spacing scale, typography system, and color palette — everything is pre-configured. Customize once, apply everywhere.'],
      ['Open source & MIT licensed', 'Free for personal and commercial use. Contribute components, report bugs, or fork the entire library. Built by developers, for developers.'],
    ],
  },
  es: {
    eyebrow: 'Ventajas',
    title: 'Por qué los desarrolladores eligen React Components Kit',
    items: [
      ['Funciona con cualquier stack de React', 'Vite, Next.js (App y Pages Router), Remix o React 18/19 sin más. Cada módulo incluye "use client", ids seguros para SSR y ningún efecto global, así que se renderizan en el servidor y se hidratan sin problemas.'],
      ['Copiar y pegar o npm install', 'Instala el paquete e importa por categorías, o copia un único componente en tu proyecto. Cada componente es una pareja .tsx + .css autónoma, sin imports internos.'],
      ['API tipada y nativa', 'Cada componente exporta su interfaz Props y reenvía los atributos HTML nativos: onClick, aria-*, className, style. Los botones generan un <button> o <a> real y los modales usan el <dialog> nativo.'],
      ['Listo para tu sistema de diseño', 'Variables CSS, escala de espaciado coherente, sistema tipográfico y paleta de color: todo viene configurado. Personalízalo una vez y aplícalo en todas partes.'],
      ['Código abierto y licencia MIT', 'Gratis para uso personal y comercial. Aporta componentes, reporta errores o haz un fork de toda la librería. Hecho por desarrolladores, para desarrolladores.'],
    ],
  },
  ru: {
    eyebrow: 'Преимущества',
    title: 'Почему разработчики выбирают React Components Kit',
    items: [
      ['Работает с любым стеком React', 'Vite, Next.js (App и Pages Router), Remix или чистый React 18/19. Каждый модуль содержит "use client", безопасные для SSR id и не имеет глобальных побочных эффектов — компоненты рендерятся на сервере и корректно гидратируются.'],
      ['Копируй или npm install', 'Установите пакет и импортируйте по категориям или скопируйте один компонент в проект. Каждый компонент — самодостаточная пара .tsx + .css без внутренних импортов.'],
      ['Типизированный нативный API', 'Каждый компонент экспортирует интерфейс Props и пробрасывает нативные HTML-атрибуты: onClick, aria-*, className, style. Кнопки — настоящие <button> или <a>, модальные окна — нативный <dialog>.'],
      ['Готово для дизайн-системы', 'CSS-переменные, единая шкала отступов, типографика и цветовая палитра — всё уже настроено. Настройте один раз и применяйте везде.'],
      ['Открытый код и лицензия MIT', 'Бесплатно для личного и коммерческого использования. Предлагайте компоненты, сообщайте об ошибках или форкните всю библиотеку. Создано разработчиками для разработчиков.'],
    ],
  },
};

const MARQUEE: Record<Locale, string[]> = {
  en: ['REACT', 'TYPESCRIPT', 'ZERO DEPS', 'NEXT.JS READY', 'OPEN SOURCE', 'MIT LICENSE', 'ACCESSIBLE', 'PERFORMANT'],
  es: ['REACT', 'TYPESCRIPT', 'CERO DEPENDENCIAS', 'LISTO PARA NEXT.JS', 'CÓDIGO ABIERTO', 'LICENCIA MIT', 'ACCESIBLE', 'RÁPIDO'],
  ru: ['REACT', 'TYPESCRIPT', 'БЕЗ ЗАВИСИМОСТЕЙ', 'ГОТОВО ДЛЯ NEXT.JS', 'ОТКРЫТЫЙ КОД', 'ЛИЦЕНЗИЯ MIT', 'ДОСТУПНО', 'БЫСТРО'],
};

const UI = {
  en: { copyInstall: 'Copy install command', copy: 'Copy command', prev: 'Previous section', next: 'Next section', marquee: 'Highlights', explore: 'Explore all components', license: 'MIT License' },
  es: { copyInstall: 'Copiar comando de instalación', copy: 'Copiar comando', prev: 'Sección anterior', next: 'Sección siguiente', marquee: 'Destacados', explore: 'Explorar todos los componentes', license: 'Licencia MIT' },
  ru: { copyInstall: 'Скопировать команду установки', copy: 'Скопировать команду', prev: 'Предыдущая секция', next: 'Следующая секция', marquee: 'Главное', explore: 'Все компоненты', license: 'Лицензия MIT' },
};

/** Section spotlight slides. */
const SECTION_SLIDES: { slug: string; name: string; cat: Tri; summary: Tri }[] = [
  { slug: 'stats-dashboard-section', name: 'Stats Dashboard Section', cat: { en: 'Stats & Metrics', es: 'Métricas', ru: 'Метрики' }, summary: { en: 'KPI tiles, stacked area and ranked bar charts in one analytics block.', es: 'Tarjetas KPI, áreas apiladas y ranking en barras en un solo bloque.', ru: 'KPI-плитки, накопительные области и рейтинг в одном блоке.' } },
  { slug: 'pricing-toggle-cards', name: 'Pricing Toggle Cards', cat: { en: 'Pricing & Plans', es: 'Precios', ru: 'Тарифы' }, summary: { en: 'Three tiers with an accessible monthly/yearly switch and featured plan.', es: 'Tres planes con interruptor mensual/anual accesible y plan destacado.', ru: 'Три тарифа с переключателем месяц/год и выделенным планом.' } },
  { slug: 'hero-dashboard-preview', name: 'Hero Dashboard Preview', cat: { en: 'Hero', es: 'Hero', ru: 'Hero' }, summary: { en: 'SaaS hero with a live dashboard mockup built from SVG charts.', es: 'Hero SaaS con maqueta de dashboard hecha con gráficos SVG.', ru: 'SaaS-hero с макетом дашборда из SVG-графиков.' } },
  { slug: 'feature-tabs-showcase', name: 'Feature Tabs Showcase', cat: { en: 'Features', es: 'Características', ru: 'Возможности' }, summary: { en: 'WAI-ARIA tabs with arrow-key navigation and stat panels.', es: 'Pestañas WAI-ARIA con navegación por flechas y paneles de métricas.', ru: 'Вкладки WAI-ARIA с навигацией стрелками и панелями цифр.' } },
  { slug: 'testimonial-carousel', name: 'Testimonial Carousel', cat: { en: 'Testimonials', es: 'Testimonios', ru: 'Отзывы' }, summary: { en: 'Scroll-snap reviews with ratings, prev/next controls and no autoplay.', es: 'Opiniones con scroll-snap, estrellas y controles, sin autoplay.', ru: 'Отзывы со scroll-snap, рейтингом и кнопками, без автопрокрутки.' } },
  { slug: 'integrations-grid', name: 'Integrations Grid', cat: { en: 'Features', es: 'Características', ru: 'Возможности' }, summary: { en: 'Integrations directory with category filters and status badges.', es: 'Directorio de integraciones con filtros y estados de disponibilidad.', ru: 'Каталог интеграций с фильтрами и статусами.' } },
];

const Arrow = ({ size = 16, w = 2.5 }: { size?: number; w?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
export function HomePage({ lang }: { lang: Locale }) {
  const t = (x: Tri) => tr(lang, x);
  const ui = UI[lang];
  const adv = ADVANTAGES[lang];
  const marquee = MARQUEE[lang];
  const href = (p: string) => getLocalizedPath(p, lang);

  const heroCards: { slug: string; depth: 'near' | 'mid' | 'far'; inner?: string; node: ReactNode }[] = [
    { slug: 'kpi-stat-tile', depth: 'near', inner: 'flush', node: <KpiStatTile label={t({ en: 'Active users', es: 'Usuarios activos', ru: 'Активные пользователи' })} value="12.4k" change={8.2} period={t({ en: 'vs last week', es: 'vs semana pasada', ru: 'к прошлой неделе' })} trend={[6, 7, 6.5, 8, 7.8, 9.2, 10.1, 9.8, 11.4, 12.4]} variant="ghost" size="sm" /> },
    { slug: 'avatar-group-stack', depth: 'far', node: <AvatarGroupStack /> },
    { slug: 'otp-input', depth: 'mid', node: <OTPInput id="hero-otp" length={4} label={t({ en: 'Verification code', es: 'Código de verificación', ru: 'Код подтверждения' })} /> },
    { slug: 'gauge-chart', depth: 'mid', inner: 'chart', node: <GaugeChart variant="ghost" size="sm" title={t({ en: 'Uptime', es: 'Disponibilidad', ru: 'Аптайм' })} subtitle="" value={99.9} max={100} prefix="" suffix="%" label={t({ en: 'of SLA target', es: 'del objetivo SLA', ru: 'от цели SLA' })} color="#38bdf8" /> },
    { slug: 'progress-list-small', depth: 'far', inner: 'flush', node: <ProgressListSmall /> },
    { slug: 'neumorphic-switch', depth: 'near', node: <NeumorphicSwitch id="hero-switch" label={t({ en: 'Live preview', es: 'Vista en vivo', ru: 'Живой просмотр' })} checked /> },
  ];

  const track1: { slug: string; label: string; node: ReactNode; minWidth?: number }[] = [
    { slug: 'shimmer-button', label: 'Shimmer Button', node: <ShimmerButton variant="primary" size="md">Deploy Project</ShimmerButton> },
    { slug: 'cyberpunk-button', label: 'Cyber Button', node: <CyberpunkButton size="sm" label="EXECUTE">CYBER RUN</CyberpunkButton> },
    { slug: 'liquid-button', label: 'Liquid Button', node: <LiquidButton size="sm" color="#8b5cf6">Fluid Flow</LiquidButton> },
    { slug: 'retro-arcade-button', label: 'Arcade Button', node: <RetroArcadeButton variant="yellow" size="sm">START 1P</RetroArcadeButton> },
    { slug: 'glow-button', label: 'Glow Button', node: <GlowButton color="#d4a017" size="sm">GLOW PULSE</GlowButton> },
    { slug: 'search-reveal', label: 'Search Reveal', minWidth: 260, node: <SearchReveal id="car-search" placeholder="Search library..." /> },
    { slug: 'stepper-input', label: 'Stepper Input', node: <StepperInput id="car-step" value={3} min={1} max={10} /> },
    { slug: 'floating-tab-bar', label: 'Floating Tab Bar', node: <FloatingTabBar /> },
  ];

  const track2: { slug: string; label: string; width: number; node: ReactNode }[] = [
    { slug: 'kpi-stat-tile', label: 'KPI Stat Tile', width: 300, node: <KpiStatTile label="Monthly revenue" value="$84.2k" change={12.4} /> },
    { slug: 'gauge-chart', label: 'Gauge Chart', width: 320, node: <GaugeChart variant="ghost" size="sm" title="Sales goal" subtitle="November" /> },
    { slug: 'activity-rings', label: 'Activity Rings', width: 440, node: <ActivityRings variant="ghost" size="sm" /> },
    { slug: 'funnel-chart', label: 'Funnel Chart', width: 440, node: <FunnelChart variant="ghost" size="sm" stages={[{ label: 'Visited', value: 48200 }, { label: 'Trial', value: 6400 }, { label: 'Paid', value: 1240 }]} /> },
    { slug: 'meter-gauge', label: 'Meter Gauge', width: 320, node: <MeterGauge variant="ghost" size="sm" /> },
    { slug: 'waffle-chart', label: 'Waffle Chart', width: 440, node: <WaffleChart variant="ghost" size="sm" /> },
    { slug: 'bullet-chart', label: 'Bullet Chart', width: 400, node: <BulletChart variant="ghost" size="sm" metrics={[{ label: 'Revenue ($k)', value: 270, target: 250, ranges: [150, 225, 300] }, { label: 'NPS', value: 44, target: 50, ranges: [30, 50, 70] }]} /> },
    { slug: 'pie-chart', label: 'Pie Chart', width: 480, node: <PieChart variant="ghost" size="sm" /> },
  ];

  const viewLabel = t({ en: 'View', es: 'Ver', ru: 'Открыть' });
  const exploreLabel = t({ en: 'Explore Template Code', es: 'Ver código de la plantilla', ru: 'Открыть код шаблона' });

  return (
    <>
      <HomeEffects />

      <div className="brutal-line brutal-line--1" aria-hidden="true" />
      <div className="brutal-line brutal-line--2" aria-hidden="true" />
      <div className="brutal-block brutal-block--1" aria-hidden="true" />

      <SiteHeader lang={lang} path="/" />

      <main>
        {/* ==================== HERO ==================== */}
        <section className="hero">
          <CubesHero />
          <div className="hero__scene">

            {heroCards.map((card, i) => (
              <a key={card.slug} href={href(`/docs/${card.slug}`)} className={`showcase-card showcase-card--${i + 1} is-${card.depth}`} aria-label={card.slug}>
                <div className="showcase-card__body">
                  <div className={`showcase-card__inner ${card.inner ? `showcase-card__inner--${card.inner}` : ''}`} inert>
                    {card.node}
                  </div>
                </div>
              </a>
            ))}

            <div className="hero__content">
              <div className="hero__title-wrap">
                <h1 className="hero__title">
                  <span className="hero__title-row">
                    <span className="hero__title-main" data-title-line="1">
                      {'REACT'.split('').map((l, i) => <span key={i} className="hero__l">{l}</span>)}&nbsp;
                      {'KIT'.split('').map((l, i) => <span key={`k${i}`} className="hero__l">{l}</span>)}
                    </span>
                  </span>
                  <span className="hero__title-row">
                    <span className="hero__title-main" data-title-line="2">
                      {'COMPONENTS'.split('').map((l, i) => <span key={i} className="hero__l">{l}</span>)}
                    </span>
                  </span>
                </h1>
                <a className="hero-version" href={siteConfig.npm} target="_blank" rel="noopener noreferrer" aria-label={`${t({ en: 'Current version', es: 'Versión actual', ru: 'Текущая версия' })} v${pkg.version} — npm`}>
                  <span className="hero-version__bubble"><span className="hero-version__dot" aria-hidden="true" />v{pkg.version}</span>
                </a>
              </div>

              <p className="hero__subtitle">
                {t({ en: 'Free open-source UI components for React. Zero dependencies. Copy, paste, ship.', es: 'Componentes UI gratuitos y de código abierto para React. Cero dependencias. Copia, pega y publica.', ru: 'Бесплатные open-source UI компоненты для React. Без зависимостей. Копируй, вставляй и публикуй.' })}
              </p>

              <div className="hero__install-wrap">
                <div className="hero__install">
                  <svg className="hero__install-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  <code className="hero__install-code">$ npm install {PKG}</code>
                  <CopyCommand className="hero__copy-btn" text={`npm install ${PKG}`} label={ui.copyInstall} />
                </div>
              </div>

              <div className="hero__actions">
                <a href={href('/docs/glass-button')} className="hero__cta-btn">
                  {t({ en: 'Browse All Components', es: 'Explorar todos los componentes', ru: 'Все компоненты' })}
                  <Arrow />
                </a>
              </div>
            </div>

            <div className="showcase-glow showcase-glow--1" />
            <div className="showcase-glow showcase-glow--2" />
          </div>
        </section>

        {/* ==================== CATEGORIES ==================== */}
        <section className="section section--categories" id="categories">
          <div className="container">
            <div className="section__header-row">
              <div>
                <span className="section__eyebrow">{t({ en: 'Explore the Collection', es: 'Explora la Colección', ru: 'Обзор коллекции' })}</span>
                <h2 className="section__title">{t({ en: 'Browse by category', es: 'Explorar por categoría', ru: 'Обзор по категориям' })}</h2>
                <p className="section__subtitle section__subtitle--wide">{t({ en: 'Pick a category, copy the code, ship.', es: 'Elige una categoría, copia el código y listo.', ru: 'Выберите категорию, скопируйте код — готово.' })}</p>
              </div>
              <div className="categories-count-pill" aria-hidden="true">
                <span className="categories-count-pill__number">{categories.length}</span>
                <span className="categories-count-pill__text">{t({ en: 'Categories Available', es: 'Categorías disponibles', ru: 'Доступных категорий' })}</span>
              </div>
            </div>

            <div className="category-grid">
              {categories.map((cat) => {
                const loc = getLocalizedCategory(cat, lang);
                const portedItems = components.filter((c) => c.category === cat.id);
                const total = allComponents.filter((c) => c.category === cat.id).length;
                const first = portedItems[0]?.slug;
                const link = cat.id === 'sections' ? href('/sections') : first ? href(`/docs/${first}`) : null;
                const noun = cat.id === 'sections'
                  ? t({ en: 'sections', es: 'secciones', ru: 'секций' })
                  : t({ en: 'components', es: 'componentes', ru: 'компонентов' });
                const countLabel = portedItems.length === total
                  ? `${total} ${noun}`
                  : `${portedItems.length}/${total} ${noun}`;
                const inner = (
                  <>
                    <span className="category-card__icon-box" aria-hidden="true">
                      <span className="category-card__icon" dangerouslySetInnerHTML={{ __html: cat.icon }} />
                    </span>
                    <span className="category-card__body">
                      <span className="category-card__name">{loc.name}</span>
                      <span className="category-card__count">{countLabel}</span>
                    </span>
                  </>
                );
                return link ? (
                  <a key={cat.id} href={link} className="category-card">{inner}</a>
                ) : (
                  <span key={cat.id} className="category-card" style={{ opacity: 0.55 }}>{inner}</span>
                );
              })}
            </div>
          </div>
        </section>

        <TemplatesPromo lang={lang} />

        {/* ==================== WHY ==================== */}
        <section className="section section--why" id="why">
          <div className="container">
            <div className="section__header-row">
              <div>
                <span className="section__eyebrow">{t({ en: 'Why React Components Kit', es: '¿Por qué React Components Kit?', ru: 'Почему React Components Kit?' })}</span>
                <h2 className="section__title">{t({ en: 'Build faster with free React components', es: 'Desarrolla más rápido con componentes React gratuitos', ru: 'Создавайте быстрее с бесплатными компонентами React' })}</h2>
                <p className="section__subtitle section__subtitle--wide">
                  {t({ en: 'Stop reinventing the wheel. Production-ready UI building blocks designed for peak performance, WCAG AA accessibility, and aesthetic perfection — out of the box.', es: 'Deja de reinventar la rueda. Bloques de UI listos para producción diseñados para máximo rendimiento, accesibilidad WCAG AA y estética impecable.', ru: 'Не изобретайте велосипед заново. Готовые UI блоки для максимальной производительности, доступности WCAG AA и безупречного дизайна.' })}
                </p>
              </div>
              <div className="why-badge-pill" aria-hidden="true">
                <span className="why-badge-pill__pulse" />
                <span className="why-badge-pill__text">{t({ en: 'Engineered for React 19', es: 'Optimizado para React 19', ru: 'Разработано для React 19' })}</span>
              </div>
            </div>
            <WhyBento lang={lang} />
          </div>
        </section>

        {/* ==================== COMPONENT CAROUSEL ==================== */}
        <section className="section section--carousel" id="components">
          <div className="container">
            <span className="section__eyebrow">{t({ en: 'Component Library', es: 'Librería de Componentes', ru: 'Библиотека компонентов' })}</span>
            <h2 className="section__title">{t({ en: 'Production-ready React components', es: 'Componentes React listos para producción', ru: 'Компоненты React для продакшена' })}</h2>
            <p className="section__subtitle section__subtitle--wide">
              {t({ en: 'From buttons and cards to modals and forms — every component is crafted with attention to detail, performance, and user experience.', es: 'Desde botones y tarjetas hasta modales y formularios: cada componente está diseñado con atención al detalle, rendimiento y experiencia.', ru: 'От кнопок и карточек до модальных окон и форм — каждый компонент создан с вниманием к деталям и скорости.' })}
            </p>

            <div className="carousel-wrap">
              <div className="carousel-track" id="carouselTrack">
                {[...track1, ...track1].map((s, i) => (
                  <div key={i} className="carousel-slide" aria-hidden={i >= track1.length ? true : undefined}>
                    <div className="carousel-card" style={s.minWidth ? { minWidth: s.minWidth } : undefined}>{s.node}</div>
                    <a href={href(`/docs/${s.slug}`)} className="carousel-card__label" tabIndex={i >= track1.length ? -1 : undefined}>{s.label} →</a>
                  </div>
                ))}
              </div>
            </div>

            <div className="carousel-wrap carousel-wrap--reverse">
              <div className="carousel-track carousel-track--reverse" id="carouselTrack2">
                {[...track2, ...track2].map((s, i) => (
                  <div key={i} className="carousel-slide" aria-hidden={i >= track2.length ? true : undefined}>
                    <div className="carousel-card carousel-card--chart" style={{ width: s.width }}>{s.node}</div>
                    <a href={href(`/docs/${s.slug}`)} className="carousel-card__label" tabIndex={i >= track2.length ? -1 : undefined}>{s.label} →</a>
                  </div>
                ))}
              </div>
            </div>

            <div className="carousel-cta">
              <a href={href('/docs/glass-button')} className="btn-primary">{ui.explore}<Arrow /></a>
            </div>
          </div>
        </section>

        {/* ==================== SECTIONS SPOTLIGHT ==================== */}
        <section className="section section--sections-carousel" id="sections-spotlight">
          <div className="container sections-carousel__header-container">
            <div className="sections-carousel__header-left">
              <span className="sections-carousel__badge">
                <span className="badge-pulse-dot" aria-hidden="true" />
                {t({ en: 'Production Sections', es: 'Secciones para Producción', ru: 'Секции для продакшена' })}
              </span>
              <h2 className="sections-carousel__title">{t({ en: 'Full-page layouts, ready to copy & paste', es: 'Diseños de página completa, listos para copiar y pegar', ru: 'Полностраничные блоки, готовые к копированию' })}</h2>
              <p className="sections-carousel__subtitle">
                {t({ en: 'Beyond individual UI components — responsive landing sections: metrics dashboards, pricing, heroes, feature tabs, testimonials and integrations.', es: 'Más allá de componentes individuales: secciones de landing responsivas: dashboards de métricas, precios, heroes, pestañas de características, testimonios e integraciones.', ru: 'Больше, чем просто компоненты — адаптивные секции лендингов: дашборды метрик, тарифы, hero-блоки, вкладки возможностей, отзывы и интеграции.' })}
              </p>
            </div>
            <div className="sections-carousel__header-right">
              <SectionsCarouselNav prev={ui.prev} next={ui.next} />
              <a href={href('/sections')} className="sections-carousel__all-link">
                <span>{t({ en: `All ${allSections.length} Sections`, es: `Ver las ${allSections.length} secciones`, ru: `Все ${allSections.length} секции` })}</span>
                <Arrow />
              </a>
            </div>
          </div>

          <div className="sections-carousel__track-wrapper">
            <div className="sections-carousel__track" id="sectionsTrack">
              {SECTION_SLIDES.map((slide) => {
                const link = href(`/sections/${slide.slug}`);
                return (
                  <article key={slide.slug} className="sections-carousel__slide">
                    <header className="slide-card__header">
                      <div className="slide-card__info">
                        <span className="slide-card__category-pill">{t(slide.cat)}</span>
                        <h3 className="slide-card__title">{slide.name}</h3>
                        <p className="slide-card__summary">{t(slide.summary)}</p>
                      </div>
                      <a href={link} className="slide-card__action" aria-label={`${viewLabel}: ${slide.name}`}>
                        <span>{viewLabel}</span>
                        <Arrow size={14} />
                      </a>
                    </header>
                    <div className="slide-card__viewport">
                      <div className="slide-card__miniature" inert aria-hidden="true">
                        <SectionRenderer slug={slide.slug} />
                      </div>
                      <div className="slide-card__glass-fade">
                        <a href={link} className="slide-card__explore-btn">
                          <span>{exploreLabel}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></svg>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== ADVANTAGES ==================== */}
        <section className="section section--advantages" id="advantages">
          <div className="container">
            <span className="section__eyebrow">{adv.eyebrow}</span>
            <h2 className="section__title">{adv.title}</h2>
            <div className="advantages-list">
              {adv.items.map(([heading, text], i) => (
                <div key={heading} className="advantage-item">
                  <div className="advantage-item__number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="advantage-item__content">
                    <h3>{heading}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== INTERACTION LAB ==================== */}
        <section className="section section--lab" id="interactions">
          <div className="container">
            <span className="section__eyebrow">{t({ en: 'Interaction lab', es: 'Laboratorio de interacciones', ru: 'Лаборатория взаимодействий' })}</span>
            <h2 className="section__title">{t({ en: 'Don’t just look — play with them', es: 'No solo mires: juega con ellos', ru: 'Не просто смотрите — попробуйте' })}</h2>
            <p className="section__subtitle section__subtitle--wide">
              {t({ en: 'Every tile is a live component. Move, hover and click: the micro-interactions ship with the code you copy.', es: 'Cada tarjeta es un componente real. Mueve, pasa el ratón y haz clic: las microinteracciones vienen en el código que copias.', ru: 'Каждая плитка — живой компонент. Двигайте, наводите и кликайте: микровзаимодействия уже в коде, который вы копируете.' })}
            </p>
            <div className="lab-grid" data-lab="">
              {[
                { cls: 'tilt', slug: 'interactive-tilt-card', name: 'Interactive Tilt Card', hint: t({ en: 'Move your cursor', es: 'Mueve el cursor', ru: 'Двигайте курсор' }), node: <InteractiveTiltCard title={t({ en: 'Tilt me', es: 'Inclíname', ru: 'Наклони меня' })} description={t({ en: '3D perspective that follows your cursor with a soft glare.', es: 'Perspectiva 3D que sigue al cursor con un brillo suave.', ru: '3D-перспектива следует за курсором с мягким бликом.' })} /> },
                { cls: 'decode', slug: 'hacker-decode-text', name: 'Hacker Decode Text', hint: t({ en: 'Hover the text', es: 'Pasa el ratón', ru: 'Наведите на текст' }), node: <HackerDecodeText text={`REACT KIT ${pkg.version}`} tag="p" className="lab-decode" /> },
                { cls: 'ripple', slug: 'ripple-button', name: 'Ripple Button', hint: t({ en: 'Click', es: 'Haz clic', ru: 'Нажмите' }), node: <RippleButton variant="primary" size="md">{t({ en: 'Click me', es: 'Haz clic', ru: 'Нажми' })}</RippleButton> },
                { cls: 'magnetic', slug: 'magnetic-button', name: 'Magnetic Button', hint: t({ en: 'Get close', es: 'Acércate', ru: 'Поднесите курсор' }), node: <MagneticButton variant="secondary" size="md">{t({ en: 'Magnetic', es: 'Magnético', ru: 'Магнит' })}</MagneticButton> },
                { cls: 'password', slug: 'password-strength-input', name: 'Password Strength Input', hint: t({ en: 'Type a password', es: 'Escribe una contraseña', ru: 'Введите пароль' }), node: <PasswordStrengthInput id="lab-password" label={t({ en: 'Password', es: 'Contraseña', ru: 'Пароль' })} placeholder={t({ en: 'Try something strong…', es: 'Prueba algo seguro…', ru: 'Попробуйте надёжный…' })} /> },
                { cls: 'neon', slug: 'neon-border-button', name: 'Neon Border Button', hint: t({ en: 'Hover', es: 'Pasa el ratón', ru: 'Наведите' }), node: <NeonBorderButton size="md">{t({ en: 'Neon', es: 'Neón', ru: 'Неон' })}</NeonBorderButton> },
                { cls: 'toggle', slug: 'glass-inline-toggle-group', name: 'Glass Toggle Group', hint: t({ en: 'Pick one', es: 'Elige una', ru: 'Выберите' }), node: <GlassInlineToggleGroup name="lab-view" size="sm" defaultValue="week" options={[{ label: t({ en: 'Day', es: 'Día', ru: 'День' }), value: 'day' }, { label: t({ en: 'Week', es: 'Semana', ru: 'Неделя' }), value: 'week' }, { label: t({ en: 'Month', es: 'Mes', ru: 'Месяц' }), value: 'month' }]} /> },
              ].map((tile) => (
                <article key={tile.slug} className={`lab-tile lab-tile--${tile.cls}`}>
                  <div className="lab-tile__stage">{tile.node}</div>
                  <footer className="lab-tile__meta">
                    <span className="lab-tile__hint">{tile.hint}</span>
                    <a className="lab-tile__link" href={href(`/docs/${tile.slug}`)}>{tile.name}<span aria-hidden="true"> →</span></a>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== MARQUEE ==================== */}
        <section className="brutal-marquee" aria-label={ui.marquee}>
          <div className="brutal-marquee__track">
            {[...marquee, ...marquee].map((item, i) => (
              <span key={i} style={{ display: 'contents' }}>
                <span className="brutal-marquee__item" aria-hidden={i >= marquee.length ? true : undefined}>{item}</span>
                <span className="brutal-marquee__sep" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* ==================== INSTALL ==================== */}
        <section className="section section--install" id="install">
          <div className="container install-inner">
            <span className="section__eyebrow">{t({ en: 'Get Started', es: 'Primeros Pasos', ru: 'Начало работы' })}</span>
            <h2 className="section__title">{t({ en: 'Install in seconds', es: 'Instala en segundos', ru: 'Установка за секунды' })}</h2>
            <p className="install-subtitle">{t({ en: `Add ${PKG} to your project with a single command.`, es: `Añade ${PKG} a tu proyecto con un solo comando.`, ru: `Добавьте ${PKG} в ваш проект одной командой.` })}</p>
            <div className="install-code-block">
              <code className="install-code">$ npm install {PKG}</code>
              <CopyCommand className="install-copy-btn" text={`npm install ${PKG}`} label={ui.copy} size={16} />
            </div>
            <p className="install-note">{t({ en: 'Then import any component and start building.', es: 'Luego importa cualquier componente y empieza a crear.', ru: 'Затем импортируйте любой компонент и начните сборку.' })}</p>
          </div>
        </section>

        {/* ==================== CTA ==================== */}
        <section className="cta-section">
          <div className="container cta-inner">
            <h2 className="cta-title">{t({ en: 'Ready to build something beautiful?', es: '¿Listo para construir algo extraordinario?', ru: 'Готовы создать нечто потрясающее?' })}</h2>
            <p className="cta-subtitle">{t({ en: 'Open source and free forever. Install it or copy and paste into your React project.', es: 'De código abierto y gratis para siempre. Instálalo o copia y pega en tu proyecto React.', ru: 'Open source и бесплатно навсегда. Установите или скопируйте в свой проект React.' })}</p>
            <a href={href('/docs/glass-button')} className="btn-primary">{t({ en: 'Get Started', es: 'Comenzar', ru: 'Начать' })}<Arrow /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>
            {t({ en: 'Built with ❤️ for the React community', es: 'Creado con ❤️ para la comunidad de React', ru: 'Создано с ❤️ для сообщества React' })} ·{' '}
            <a href={siteConfig.github} target="_blank" rel="noopener">GitHub</a> ·{' '}
            <a href={siteConfig.sister.url} target="_blank" rel="noopener">{siteConfig.sister.name}</a>
          </p>
          <p className="footer__license">{ui.license}</p>
        </div>
      </footer>
    </>
  );
}
