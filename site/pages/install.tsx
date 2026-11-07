import type { Locale } from '../config/site';
import { siteConfig } from '../config/site';
import { useTranslations, getLocalizedPath } from '../i18n/translations';
import { buildMetadata } from '../lib/seo';
import { InstallLayout } from '../layout/InstallLayout';
import { CodeBlock } from '../docs/CodeBlock';
import { InstallTabs } from '../docs/InstallTabs';
import '../styles/install-page.css';

const pkg = siteConfig.packageName;

const newProject = `# 1. Create a React project (Vite + TypeScript)
npm create vite@latest my-app -- --template react-ts

# 2. Navigate into the project
cd my-app

# 3. Install the component library
npm install ${pkg}

# 4. Start the dev server
npm run dev`;

const importAll = `// Import components from the package root
import { GlassButton, GlassAlert, Badge } from '${pkg}';

export function App() {
  return (
    <GlassAlert type="success" title="Welcome">
      <GlassButton>Click me</GlassButton> <Badge variant="info">New</Badge>
    </GlassAlert>
  );
}`;

const importCategory = `// Import by category (recommended for smaller bundles)
import { GlassButton, GlowButton, LoadingButton } from '${pkg}/buttons';
import { GlassAlert, GlassModal, Badge } from '${pkg}/feedback';`;

const importCss = `// main.tsx (Vite) or app/layout.tsx (Next.js) — once per app
import '${pkg}/global.css'; // design tokens, reset and fonts
import '${pkg}/styles.css'; // component styles`;

const TEXT = {
  en: {
    pageTitle: 'Installation Guide',
    pageDesc: 'Step-by-step guide to install React Components Kit in any React project (Vite, Next.js, Remix). Choose npm, yarn, or pnpm.',
    badge: 'Getting Started',
    title: 'Installation Guide',
    desc: 'Add free, accessible UI components to your React project in under 2 minutes. Zero runtime dependencies, fully typed. MIT licensed — free forever.',
    step1Title: 'Prerequisites',
    step1Desc: "You need a React 18 or 19 project. If you don't have one yet, create it:",
    nodeReq: 'Node.js 20+ required.',
    step2Title: 'Install the library',
    step2Desc: 'Choose your preferred package manager:',
    step3Title: 'Import the styles',
    step3Badge: 'Required',
    step3Desc: 'Components ship plain CSS. Import the design tokens and the component styles once, at the root of your app:',
    step4Title: 'Import and use components',
    step4Desc: 'You have two import styles — import everything or import by category (recommended for better tree-shaking):',
    optionA: 'Option A: Root import (simple)',
    optionB: 'Option B: Category imports (recommended)',
    nextTip: 'Using Next.js App Router? Every component already ships with "use client", so you can import them from Server Components.',
    quickRef: 'Quick reference',
    readyTitle: 'Ready to build?',
    readyDesc: 'Browse the component library and start copying components into your project.',
    browseBtn: 'Browse Components',
    viewSectionsBtn: 'View Sections',
    task: 'Task', cmd: 'Command / Import', rInstall: 'Install library', rTokens: 'Import design tokens', rStyles: 'Import component styles', rBrowse: 'Browse components', rSections: 'Browse sections', rMcp: 'Use with AI editors (MCP)',
  },
  es: {
    pageTitle: 'Guía de Instalación',
    pageDesc: 'Guía paso a paso para instalar React Components Kit en cualquier proyecto React (Vite, Next.js, Remix) con npm, yarn o pnpm.',
    badge: 'Primeros Pasos',
    title: 'Guía de Instalación',
    desc: 'Añade componentes UI gratuitos y accesibles a tu proyecto React en menos de 2 minutos. Cero dependencias en tiempo de ejecución y tipado completo. Licencia MIT — libre para siempre.',
    step1Title: 'Requisitos Previos',
    step1Desc: 'Necesitas un proyecto con React 18 o 19. Si aún no tienes uno, créalo fácilmente:',
    nodeReq: 'Se requiere Node.js 20+.',
    step2Title: 'Instalar la librería',
    step2Desc: 'Elige tu gestor de paquetes favorito:',
    step3Title: 'Importar los estilos',
    step3Badge: 'Obligatorio',
    step3Desc: 'Los componentes usan CSS puro. Importa los tokens de diseño y los estilos de los componentes una sola vez, en la raíz de tu app:',
    step4Title: 'Importar y usar componentes',
    step4Desc: 'Puedes importar todo desde la raíz o importar por categorías (recomendado para un menor bundle):',
    optionA: 'Opción A: Importación raíz (simple)',
    optionB: 'Opción B: Importación por categoría (recomendado)',
    nextTip: '¿Usas el App Router de Next.js? Todos los componentes incluyen "use client", así que puedes importarlos desde Server Components.',
    quickRef: 'Referencia rápida',
    readyTitle: '¿Listo para construir?',
    readyDesc: 'Explora la biblioteca de componentes y empieza a copiarlos en tu proyecto.',
    browseBtn: 'Explorar Componentes',
    viewSectionsBtn: 'Ver Secciones',
    task: 'Tarea', cmd: 'Comando / Import', rInstall: 'Instalar librería', rTokens: 'Importar tokens globales', rStyles: 'Importar estilos de componentes', rBrowse: 'Ver componentes', rSections: 'Ver secciones', rMcp: 'Usar con editores de IA (MCP)',
  },
  ru: {
    pageTitle: 'Руководство по установке',
    pageDesc: 'Пошаговое руководство по установке React Components Kit в любой проект React (Vite, Next.js, Remix) через npm, yarn или pnpm.',
    badge: 'Начало работы',
    title: 'Руководство по установке',
    desc: 'Добавьте бесплатные и доступные UI-компоненты в ваш проект React менее чем за 2 минуты. Без зависимостей, с полной типизацией. Лицензия MIT — бесплатно навсегда.',
    step1Title: 'Требования',
    step1Desc: 'Вам потребуется проект на React 18 или 19. Если его еще нет, создайте новый:',
    nodeReq: 'Требуется Node.js 20+.',
    step2Title: 'Установка библиотеки',
    step2Desc: 'Выберите удобный пакетный менеджер:',
    step3Title: 'Импорт стилей',
    step3Badge: 'Обязательно',
    step3Desc: 'Компоненты используют обычный CSS. Импортируйте дизайн-токены и стили компонентов один раз в корне приложения:',
    step4Title: 'Импорт и использование компонентов',
    step4Desc: 'Доступны два стиля импорта — корневой или по категориям (рекомендуется для минимального бандла):',
    optionA: 'Вариант А: Корневой импорт (быстро)',
    optionB: 'Вариант Б: Импорт по категориям (рекомендуется)',
    nextTip: 'Используете App Router в Next.js? Все компоненты уже содержат "use client", их можно импортировать из серверных компонентов.',
    quickRef: 'Быстрая справка',
    readyTitle: 'Готовы к разработке?',
    readyDesc: 'Изучите каталог компонентов и используйте их в своих проектах прямо сейчас.',
    browseBtn: 'Каталог компонентов',
    viewSectionsBtn: 'Секции страниц',
    task: 'Задача', cmd: 'Команда / Импорт', rInstall: 'Установка библиотеки', rTokens: 'Импорт дизайн-токенов', rStyles: 'Импорт стилей компонентов', rBrowse: 'Все компоненты', rSections: 'Все секции', rMcp: 'Использовать с ИИ-редакторами (MCP)',
  },
};

export const installMetadata = (lang: Locale) => buildMetadata({ path: '/install', lang, title: TEXT[lang].pageTitle, description: TEXT[lang].pageDesc });

export function InstallPage({ lang }: { lang: Locale }) {
  const t = useTranslations(lang);
  const x = TEXT[lang];
  return (
    <InstallLayout lang={lang}>
      <div className="install-page">
        <nav className="breadcrumb" aria-label={t('a11y.breadcrumb')}>
          <a href={getLocalizedPath('/', lang)}>{t('nav.home')}</a>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{t('nav.install')}</span>
        </nav>

        <header className="install-header">
          <span className="install-header__badge">{x.badge}</span>
          <h1 className="install-header__title">{x.title}</h1>
          <p className="install-header__desc">{x.desc}</p>
        </header>

        <section className="install-section anim-slide-up" id="step-1">
          <div className="step-badge">{t('install.step')} 1</div>
          <h2 className="step-title">{x.step1Title}</h2>
          <p className="step-desc">{x.step1Desc}</p>
          <div className="code-block-wrap"><CodeBlock code={newProject} lang="bash" id="prereq-new-project" /></div>
          <div className="info-box info-box--tip">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            <div><strong>{x.nodeReq}</strong> {t('install.checkWith')} <code>node --version</code>.</div>
          </div>
        </section>

        <section className="install-section anim-slide-up" id="step-2" style={{ animationDelay: '0.1s' }}>
          <div className="step-badge">{t('install.step')} 2</div>
          <h2 className="step-title">{x.step2Title}</h2>
          <p className="step-desc">{x.step2Desc}</p>
          <InstallTabs
            panels={{
              npm: <div className="code-block-wrap"><CodeBlock code={`npm install ${pkg}`} lang="bash" id="install-npm" /></div>,
              yarn: <div className="code-block-wrap"><CodeBlock code={`yarn add ${pkg}`} lang="bash" id="install-yarn" /></div>,
              pnpm: <div className="code-block-wrap"><CodeBlock code={`pnpm add ${pkg}`} lang="bash" id="install-pnpm" /></div>,
            }}
          />
        </section>

        <section className="install-section anim-slide-up" id="step-3" style={{ animationDelay: '0.2s' }}>
          <div className="step-badge">{t('install.step')} 3 <span className="step-badge__optional">{x.step3Badge}</span></div>
          <h2 className="step-title">{x.step3Title}</h2>
          <p className="step-desc">{x.step3Desc}</p>
          <div className="code-block-wrap"><CodeBlock code={importCss} lang="tsx" id="usage-import-css" /></div>
        </section>

        <section className="install-section anim-slide-up" id="step-4" style={{ animationDelay: '0.3s' }}>
          <div className="step-badge">{t('install.step')} 4</div>
          <h2 className="step-title">{x.step4Title}</h2>
          <p className="step-desc">{x.step4Desc}</p>
          <h3 className="step-subtitle">{x.optionA}</h3>
          <div className="code-block-wrap"><CodeBlock code={importAll} lang="tsx" id="usage-import-all" /></div>
          <h3 className="step-subtitle" style={{ marginTop: 'var(--sp-6)' }}>{x.optionB}</h3>
          <div className="code-block-wrap"><CodeBlock code={importCategory} lang="tsx" id="usage-import-category" /></div>
          <div className="info-box info-box--tip" style={{ marginTop: 'var(--sp-6)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
            <div>{x.nextTip}</div>
          </div>
        </section>

        <section className="install-section anim-slide-up" id="quick-reference" style={{ animationDelay: '0.5s' }}>
          <h2 className="step-title">{x.quickRef}</h2>
          <div className="ref-table">
            <table>
              <thead><tr><th>{x.task}</th><th>{x.cmd}</th></tr></thead>
              <tbody>
                <tr><td>{x.rInstall}</td><td><code>npm install {pkg}</code></td></tr>
                <tr><td>{x.rTokens}</td><td><code>import &apos;{pkg}/global.css&apos;</code></td></tr>
                <tr><td>{x.rStyles}</td><td><code>import &apos;{pkg}/styles.css&apos;</code></td></tr>
                <tr><td>{x.rBrowse}</td><td><a href={getLocalizedPath('/docs/glass-button', lang)}>{t('nav.components')} →</a></td></tr>
                <tr><td>{x.rSections}</td><td><a href={getLocalizedPath('/sections', lang)}>{t('nav.sections')} →</a></td></tr>
                <tr><td>{x.rMcp}</td><td><a href={getLocalizedPath('/mcp', lang)}>{t('nav.mcp')} →</a></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="install-cta anim-slide-up">
          <h2>{x.readyTitle}</h2>
          <p>{x.readyDesc}</p>
          <div className="install-cta__actions">
            <a href={getLocalizedPath('/docs/glass-button', lang)} className="cta-btn cta-btn--primary">
              {x.browseBtn}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href={getLocalizedPath('/sections', lang)} className="cta-btn cta-btn--secondary">{x.viewSectionsBtn}</a>
          </div>
        </div>
      </div>
    </InstallLayout>
  );
}
