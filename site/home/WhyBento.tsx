import type { Locale } from '../config/site';
import { getLocalizedPath } from '../i18n/translations';
import { counts } from '../data/registry';
import '../styles/why-bento.css';

/** "Build faster with free React components" bento grid (port of WhyBento.astro, copy adapted to React). */

type Stat = [string, string];
interface Item {
  icon: string;
  tag: string;
  title: string;
  text: string;
  stats: Stat[];
  link: string;
  linkLabel: string;
  wide?: boolean;
}

const icons = {
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  feather: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><path d="M16 8 2 22M17.5 15H9"/>',
  access: '<circle cx="12" cy="4.5" r="2"/><path d="M5 8.5 12 10l7-1.5M12 10v4m0 0-3 7m3-7 3 7"/>',
  palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7h2A5.6 5.6 0 0 0 22 11c0-5-4.5-9-10-9z"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
};

const content = (c: number, s: number): Record<Locale, Item[]> => ({
  en: [
    { icon: icons.bolt, tag: 'Ship in minutes', title: 'Lightning-fast development', text: 'Install from npm or copy-paste any component straight into your React app. No CSS framework to configure — ship client and landing pages in minutes, not weeks.', stats: [['10×', 'Ship speed'], ['0 min', 'Setup'], ['React 19', 'Ready']], link: '/docs/glass-button', linkLabel: 'Browse components', wide: true },
    { icon: icons.feather, tag: 'Zero bloat', title: 'Zero runtime dependencies', text: 'Only React as a peer dependency and plain CSS. No Tailwind, no CSS-in-JS runtime.', stats: [['0', 'Dependencies'], ['ESM', 'Tree-shakeable']], link: '/install', linkLabel: 'Install guide' },
    { icon: icons.access, tag: 'WCAG 2.2 AA', title: 'Accessible by default', text: 'Keyboard navigation, visible focus rings, ARIA where it matters and 4.5:1 contrast.', stats: [['≥4.5:1', 'Contrast'], ['44px', 'Targets']], link: '/docs/glass-modal', linkLabel: 'See an example' },
    { icon: icons.palette, tag: 'Curated styles', title: 'Next-gen aesthetics', text: 'Glass, neon, neumorphic and dark-gold themes with fluid micro-interactions.', stats: [['6+', 'Styles'], ['60fps', 'Motion']], link: '/docs/neumorphic-button', linkLabel: 'View styles' },
    { icon: icons.sliders, tag: 'CSS tokens', title: 'Total customization', text: 'Typed props, native HTML attributes and CSS custom properties — re-theme everything from one file.', stats: [['100%', 'Tokenized'], ['Strict', 'TypeScript']], link: '/docs/loading-button', linkLabel: 'Explore props' },
    { icon: icons.chart, tag: 'MIT · Free forever', title: 'A library that keeps growing', text: 'Production components, SVG charts, full page sections and multi-page templates across 13 categories, maintained in the open and updated every week.', stats: [[`${c}`, 'Components'], [`${s}`, 'Sections'], ['MIT', 'License']], link: '/sections', linkLabel: 'Browse sections', wide: true },
  ],
  es: [
    { icon: icons.bolt, tag: 'Lanza en minutos', title: 'Desarrollo ultrarrápido', text: 'Instálalo desde npm o copia y pega cualquier componente en tu app React. Sin frameworks de CSS que configurar: publica landings y webs de clientes en minutos, no semanas.', stats: [['10×', 'Más rápido'], ['0 min', 'Configuración'], ['React 19', 'Compatible']], link: '/docs/glass-button', linkLabel: 'Ver componentes', wide: true },
    { icon: icons.feather, tag: 'Cero peso', title: 'Sin dependencias en runtime', text: 'Solo React como peer dependency y CSS puro. Sin Tailwind ni CSS-in-JS en tiempo de ejecución.', stats: [['0', 'Dependencias'], ['ESM', 'Tree-shaking']], link: '/install', linkLabel: 'Guía de instalación' },
    { icon: icons.access, tag: 'WCAG 2.2 AA', title: 'Accesible por defecto', text: 'Navegación por teclado, anillos de foco visibles, ARIA donde importa y contraste 4.5:1.', stats: [['≥4.5:1', 'Contraste'], ['44px', 'Objetivos táctiles']], link: '/docs/glass-modal', linkLabel: 'Ver un ejemplo' },
    { icon: icons.palette, tag: 'Estilos curados', title: 'Estética de nueva generación', text: 'Glassmorphism, neón, neumorfismo y dorado oscuro con microinteracciones fluidas.', stats: [['6+', 'Estilos'], ['60fps', 'Animación']], link: '/docs/neumorphic-button', linkLabel: 'Ver estilos' },
    { icon: icons.sliders, tag: 'Tokens CSS', title: 'Personalización total', text: 'Props tipadas, atributos HTML nativos y variables CSS: cambia el tema de todo desde un solo archivo.', stats: [['100%', 'Tokenizado'], ['Estricto', 'TypeScript']], link: '/docs/loading-button', linkLabel: 'Explorar props' },
    { icon: icons.chart, tag: 'MIT · Gratis siempre', title: 'Una librería que no deja de crecer', text: 'Componentes de producción, gráficos SVG, secciones de página completas y plantillas multipágina en 13 categorías, mantenidos en abierto y actualizados cada semana.', stats: [[`${c}`, 'Componentes'], [`${s}`, 'Secciones'], ['MIT', 'Licencia']], link: '/sections', linkLabel: 'Ver secciones', wide: true },
  ],
  ru: [
    { icon: icons.bolt, tag: 'Запуск за минуты', title: 'Молниеносная разработка', text: 'Установите из npm или скопируйте любой компонент прямо в React-приложение. Без настройки CSS-фреймворков — лендинги и клиентские сайты за минуты, а не недели.', stats: [['10×', 'Быстрее'], ['0 мин', 'Настройка'], ['React 19', 'Готово']], link: '/docs/glass-button', linkLabel: 'Смотреть компоненты', wide: true },
    { icon: icons.feather, tag: 'Ничего лишнего', title: 'Без runtime-зависимостей', text: 'Только React как peer-зависимость и обычный CSS. Без Tailwind и CSS-in-JS.', stats: [['0', 'Зависимостей'], ['ESM', 'Tree-shaking']], link: '/install', linkLabel: 'Установка' },
    { icon: icons.access, tag: 'WCAG 2.2 AA', title: 'Доступность по умолчанию', text: 'Навигация с клавиатуры, видимый фокус, ARIA там, где нужно, и контраст 4.5:1.', stats: [['≥4.5:1', 'Контраст'], ['44px', 'Цели касания']], link: '/docs/glass-modal', linkLabel: 'Пример' },
    { icon: icons.palette, tag: 'Отборные стили', title: 'Эстетика нового поколения', text: 'Стекло, неон, неоморфизм и тёмное золото с плавными микровзаимодействиями.', stats: [['6+', 'Стилей'], ['60fps', 'Анимация']], link: '/docs/neumorphic-button', linkLabel: 'Стили' },
    { icon: icons.sliders, tag: 'CSS-токены', title: 'Полная кастомизация', text: 'Типизированные props, нативные HTML-атрибуты и CSS-переменные — меняйте тему из одного файла.', stats: [['100%', 'Токены'], ['Strict', 'TypeScript']], link: '/docs/loading-button', linkLabel: 'Props' },
    { icon: icons.chart, tag: 'MIT · Бесплатно', title: 'Библиотека, которая растёт', text: 'Готовые компоненты, SVG-графики, полные секции страниц и многостраничные шаблоны в 13 категориях — открытая разработка и обновления каждую неделю.', stats: [[`${c}`, 'Компоненты'], [`${s}`, 'Секции'], ['MIT', 'Лицензия']], link: '/sections', linkLabel: 'Смотреть секции', wide: true },
  ],
});

export function WhyBento({ lang }: { lang: Locale }) {
  const items = content(counts.components, counts.sections)[lang];
  return (
    <ul className="why-bento">
      {items.map((it, i) => (
        <li key={it.title} className={`why-bento__card ${it.wide ? 'why-bento__card--wide' : ''}`} style={{ ['--i' as string]: i }}>
          <div className="why-bento__glow" aria-hidden="true" />
          <div className="why-bento__top">
            <span className="why-bento__icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: it.icon }} />
            </span>
            <span className="why-bento__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <span className="why-bento__tag">{it.tag}</span>
          <h3 className="why-bento__title">{it.title}</h3>
          <p className="why-bento__text">{it.text}</p>
          <dl className="why-bento__stats">
            {it.stats.map(([v, l]) => (
              <div key={l} className="why-bento__stat">
                <dt>{l}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {it.wide && i === 0 && (
            <pre className="why-bento__visual why-bento__code" aria-hidden="true">
              <code>
                <span className="k">import</span> {'{'} <span className="t">GlassButton</span> {'}'} <span className="k">from</span>
                {'\n  '}<span className="s">&apos;react-component-kit-ui&apos;</span>;{'\n\n'}
                &lt;<span className="t">GlassButton</span> <span className="a">onClick</span>={'{'}<span className="n">ship</span>{'}'} /&gt;
              </code>
            </pre>
          )}
          {it.wide && i !== 0 && (
            <div className="why-bento__visual why-bento__bars" aria-hidden="true">
              {[22, 30, 34, 41, 47, 55, 63, 72, 84, 100].map((h, b) => (
                <span key={b} style={{ ['--h' as string]: `${h}%`, ['--d' as string]: `${b * 60}ms` }} />
              ))}
            </div>
          )}
          <a className="why-bento__link" href={getLocalizedPath(it.link, lang)}>
            {it.linkLabel}
            <span className="why-bento__sr"> — {it.title}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
