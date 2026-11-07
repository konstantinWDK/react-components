import type { Locale } from '../config/site';
import { useTranslations, getLocalizedPath } from '../i18n/translations';
import { buildMetadata } from '../lib/seo';
import { DocsLayout } from '../layout/DocsLayout';
import { CodeBlock } from '../docs/CodeBlock';
import { InstallTabs } from '../docs/InstallTabs';
import { docsComponents, sectionComponents, templates } from '../data/registry';
import '../styles/install-page.css';
import '../styles/mcp-page.css';

/** Remote MCP server (Streamable HTTP). Legacy SSE clients use /sse. Same config as mcp/landing.ts. */
const MCP_URL = 'https://mcp.reactcomponents.dev/mcp';
const SSE_URL = 'https://mcp.reactcomponents.dev/sse';
const NAME = 'react-components';
const json = (o: unknown) => JSON.stringify(o, null, 2);

const CLIENTS: { id: string; hint: Record<Locale, string>; code: string; lang: string; title: string }[] = [
  {
    id: 'Claude Code',
    hint: { en: 'Run in your terminal:', es: 'Ejecútalo en tu terminal:', ru: 'Выполните в терминале:' },
    code: `claude mcp add --transport http ${NAME} ${MCP_URL}`,
    lang: 'bash',
    title: 'terminal',
  },
  {
    id: 'Cursor',
    hint: { en: 'Add to ~/.cursor/mcp.json (or .cursor/mcp.json in the project):', es: 'Añádelo a ~/.cursor/mcp.json (o .cursor/mcp.json en el proyecto):', ru: 'Добавьте в ~/.cursor/mcp.json (или .cursor/mcp.json в проекте):' },
    code: json({ mcpServers: { [NAME]: { url: MCP_URL } } }),
    lang: 'json',
    title: '.cursor/mcp.json',
  },
  {
    id: 'VS Code',
    hint: { en: 'Add to .vscode/mcp.json (GitHub Copilot agent mode):', es: 'Añádelo a .vscode/mcp.json (modo agente de GitHub Copilot):', ru: 'Добавьте в .vscode/mcp.json (режим агента GitHub Copilot):' },
    code: json({ servers: { [NAME]: { type: 'http', url: MCP_URL } } }),
    lang: 'json',
    title: '.vscode/mcp.json',
  },
  {
    id: 'Claude Desktop',
    hint: { en: 'Settings → Connectors → Add custom connector, and paste this URL:', es: 'Ajustes → Conectores → Añadir conector personalizado, y pega esta URL:', ru: 'Настройки → Коннекторы → Добавить свой коннектор, и вставьте URL:' },
    code: MCP_URL,
    lang: 'text',
    title: 'URL',
  },
  {
    id: 'Codex',
    hint: { en: 'Add to ~/.codex/config.toml:', es: 'Añádelo a ~/.codex/config.toml:', ru: 'Добавьте в ~/.codex/config.toml:' },
    code: `[mcp_servers.${NAME.replace('-', '_')}]\nurl = "${MCP_URL}"`,
    lang: 'toml',
    title: '~/.codex/config.toml',
  },
  {
    id: 'Windsurf',
    hint: { en: 'Add to ~/.codeium/windsurf/mcp_config.json (works for most other clients too):', es: 'Añádelo a ~/.codeium/windsurf/mcp_config.json (sirve también para la mayoría de clientes):', ru: 'Добавьте в ~/.codeium/windsurf/mcp_config.json (подходит и для большинства других клиентов):' },
    code: json({ mcpServers: { [NAME]: { serverUrl: MCP_URL } } }),
    lang: 'json',
    title: 'mcp_config.json',
  },
];

const TOOLS: [string, Record<Locale, string>][] = [
  ['search_components', { en: 'Find components and sections by keyword', es: 'Busca componentes y secciones por palabra clave', ru: 'Поиск компонентов и секций по ключевому слову' }],
  ['list_components', { en: 'Everything in a category', es: 'Todo lo que hay en una categoría', ru: 'Всё содержимое категории' }],
  ['get_component', { en: 'Props interface, usage example and import', es: 'Interfaz de props, ejemplo de uso e import', ru: 'Интерфейс props, пример и импорт' }],
  ['get_component_code', { en: 'Full .tsx + .css source to copy', es: 'Código fuente .tsx + .css completo para copiar', ru: 'Полный исходник .tsx + .css' }],
  ['list_categories', { en: 'Categories, entry points and counts', es: 'Categorías, entry points y conteos', ru: 'Категории, точки входа и количество' }],
  ['list_templates', { en: 'All multi-page templates with live previews', es: 'Todas las plantillas multipágina con demo', ru: 'Все многостраничные шаблоны с демо' }],
  ['get_template', { en: 'Next.js App Router files for every page', es: 'Archivos de Next.js App Router para cada página', ru: 'Файлы Next.js App Router для каждой страницы' }],
  ['get_design_tokens', { en: 'Colors, surfaces, radii and theming', es: 'Colores, superficies, radios y temas', ru: 'Цвета, поверхности, радиусы и темы' }],
  ['get_library_info', { en: 'Install, CSS imports and peer dependencies', es: 'Instalación, imports de CSS y peer dependencies', ru: 'Установка, импорт CSS и peer-зависимости' }],
];

const PROMPTS: Record<Locale, [string, string][]> = {
  en: [
    ['E-commerce', 'Add a product page with ProductBuyBox and a CartDrawer from react-components'],
    ['Dashboard', 'Build a revenue dashboard with KPI stat tiles and a zero-dependency SVG line chart'],
    ['Templates', 'Scaffold the agency template in my Next.js app with all its pages'],
    ['Theming', 'Show me the design tokens and switch my app to light mode'],
  ],
  es: [
    ['E-commerce', 'Añade una página de producto con ProductBuyBox y un CartDrawer de react-components'],
    ['Dashboard', 'Crea un dashboard de ingresos con tarjetas KPI y un gráfico de líneas SVG sin dependencias'],
    ['Plantillas', 'Monta la plantilla de agencia en mi app Next.js con todas sus páginas'],
    ['Temas', 'Enséñame los design tokens y pasa mi app a modo claro'],
  ],
  ru: [
    ['E-commerce', 'Добавь страницу товара с ProductBuyBox и CartDrawer из react-components'],
    ['Дашборд', 'Собери дашборд выручки с KPI-карточками и SVG-графиком без зависимостей'],
    ['Шаблоны', 'Разверни шаблон агентства в моём Next.js-приложении со всеми страницами'],
    ['Темы', 'Покажи дизайн-токены и переключи приложение на светлую тему'],
  ],
};

const TEXT = {
  en: {
    pageTitle: 'MCP Server for Claude, Cursor and Copilot',
    pageDesc: 'Connect Claude, Cursor, VS Code Copilot, Codex or any MCP client to React Components Kit: search, read and use every component, section and template from your AI editor.',
    badge: 'MCP server · no API key',
    title: 'Use the kit from your AI editor',
    desc: 'The official Model Context Protocol server lets Claude, Cursor, Copilot and other agents search the catalog, read props and source code, and scaffold full templates.',
    endpoint: 'Endpoint (Streamable HTTP)',
    legacy: 'Older clients that only support SSE can use',
    setupTitle: 'Connect your editor',
    setupDesc: 'Pick your client and copy the config. No account or API key needed.',
    promptsTitle: 'Try these prompts',
    promptsDesc: 'Once connected, just ask. The agent picks the right tools by itself.',
    toolsTitle: 'Available tools',
    sComponents: 'Components', sSections: 'Sections', sTemplates: 'Templates', sTools: 'Tools',
    tocSetup: 'Connect your editor', tocPrompts: 'Example prompts', tocTools: 'Tools',
    browse: 'Browse Components', templatesBtn: 'View Templates',
  },
  es: {
    pageTitle: 'Servidor MCP para Claude, Cursor y Copilot',
    pageDesc: 'Conecta Claude, Cursor, VS Code Copilot, Codex o cualquier cliente MCP a React Components Kit: busca, lee y usa todos los componentes, secciones y plantillas desde tu editor con IA.',
    badge: 'Servidor MCP · sin API key',
    title: 'Usa el kit desde tu editor con IA',
    desc: 'El servidor oficial de Model Context Protocol permite a Claude, Cursor, Copilot y otros agentes buscar en el catálogo, leer props y código fuente y montar plantillas completas.',
    endpoint: 'Endpoint (Streamable HTTP)',
    legacy: 'Los clientes antiguos que solo admiten SSE pueden usar',
    setupTitle: 'Conecta tu editor',
    setupDesc: 'Elige tu cliente y copia la configuración. No necesitas cuenta ni API key.',
    promptsTitle: 'Prueba estos prompts',
    promptsDesc: 'Una vez conectado, solo tienes que pedirlo. El agente elige las herramientas adecuadas.',
    toolsTitle: 'Herramientas disponibles',
    sComponents: 'Componentes', sSections: 'Secciones', sTemplates: 'Plantillas', sTools: 'Herramientas',
    tocSetup: 'Conecta tu editor', tocPrompts: 'Prompts de ejemplo', tocTools: 'Herramientas',
    browse: 'Ver Componentes', templatesBtn: 'Ver Plantillas',
  },
  ru: {
    pageTitle: 'MCP-сервер для Claude, Cursor и Copilot',
    pageDesc: 'Подключите Claude, Cursor, VS Code Copilot, Codex или любой MCP-клиент к React Components Kit: ищите, читайте и используйте все компоненты, секции и шаблоны прямо из ИИ-редактора.',
    badge: 'MCP-сервер · без API-ключа',
    title: 'Используйте набор из ИИ-редактора',
    desc: 'Официальный сервер Model Context Protocol позволяет Claude, Cursor, Copilot и другим агентам искать по каталогу, читать props и исходный код и разворачивать готовые шаблоны.',
    endpoint: 'Endpoint (Streamable HTTP)',
    legacy: 'Старые клиенты, поддерживающие только SSE, могут использовать',
    setupTitle: 'Подключите редактор',
    setupDesc: 'Выберите клиент и скопируйте конфигурацию. Аккаунт и API-ключ не нужны.',
    promptsTitle: 'Попробуйте эти промпты',
    promptsDesc: 'После подключения просто попросите. Агент сам выберет нужные инструменты.',
    toolsTitle: 'Доступные инструменты',
    sComponents: 'Компонентов', sSections: 'Секций', sTemplates: 'Шаблонов', sTools: 'Инструментов',
    tocSetup: 'Подключение', tocPrompts: 'Примеры промптов', tocTools: 'Инструменты',
    browse: 'Все компоненты', templatesBtn: 'Все шаблоны',
  },
};

export const mcpMetadata = (lang: Locale) => buildMetadata({ path: '/mcp', lang, title: TEXT[lang].pageTitle, description: TEXT[lang].pageDesc });

export function McpPage({ lang }: { lang: Locale }) {
  const t = useTranslations(lang);
  const x = TEXT[lang];
  const toc = [
    { id: 'setup', text: x.tocSetup },
    { id: 'prompts', text: x.tocPrompts },
    { id: 'tools', text: x.tocTools },
  ];
  const stats: [number, string][] = [
    [docsComponents.length, x.sComponents],
    [sectionComponents.length, x.sSections],
    [templates.length, x.sTemplates],
    [TOOLS.length, x.sTools],
  ];
  return (
    <DocsLayout lang={lang} path="/mcp" toc={toc}>
      <div className="install-page mcp-page">
        <nav className="breadcrumb" aria-label={t('a11y.breadcrumb')}>
          <a href={getLocalizedPath('/', lang)}>{t('nav.home')}</a>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{t('nav.mcp')}</span>
        </nav>

        <header className="install-header">
          <span className="install-header__badge mcp-badge"><span className="mcp-badge__dot" aria-hidden="true" />{x.badge}</span>
          <h1 className="install-header__title">{x.title}</h1>
          <p className="install-header__desc">{x.desc}</p>
        </header>

        <div className="mcp-stats">
          {stats.map(([n, label]) => (
            <div className="mcp-stat" key={label}>
              <div className="mcp-stat__value">{n}</div>
              <div className="mcp-stat__label">{label}</div>
            </div>
          ))}
        </div>

        <div className="code-block-wrap">
          <CodeBlock code={MCP_URL} lang="text" title={x.endpoint} id="mcp-endpoint" />
        </div>
        <p className="mcp-note mcp-note--endpoint">{x.legacy} <code>{SSE_URL}</code>.</p>

        <section className="install-section anim-slide-up" id="setup">
          <h2 className="step-title">{x.setupTitle}</h2>
          <p className="step-desc">{x.setupDesc}</p>
          <div className="mcp-tabs">
            <InstallTabs
              panels={Object.fromEntries(
                CLIENTS.map((c) => [
                  c.id,
                  <div key={c.id}>
                    <p className="mcp-note">{c.hint[lang]}</p>
                    <div className="code-block-wrap"><CodeBlock code={c.code} lang={c.lang} title={c.title} /></div>
                  </div>,
                ]),
              )}
            />
          </div>
        </section>

        <section className="install-section anim-slide-up" id="prompts" style={{ animationDelay: '0.1s' }}>
          <h2 className="step-title">{x.promptsTitle}</h2>
          <p className="step-desc">{x.promptsDesc}</p>
          <div className="mcp-grid mcp-grid--prompts">
            {PROMPTS[lang].map(([tag, text]) => (
              <article className="mcp-card" key={tag}>
                <span className="mcp-card__tag">{tag}</span>
                <p className="mcp-card__text">“{text}”</p>
              </article>
            ))}
          </div>
        </section>

        <section className="install-section anim-slide-up" id="tools" style={{ animationDelay: '0.2s' }}>
          <h2 className="step-title">{x.toolsTitle}</h2>
          <div className="mcp-grid">
            {TOOLS.map(([name, desc]) => (
              <div className="mcp-card" key={name}>
                <code className="mcp-card__name">{name}</code>
                <p className="mcp-card__text mcp-card__text--plain">{desc[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="install-cta anim-slide-up">
          <div className="install-cta__actions">
            <a href={getLocalizedPath('/docs/glass-button', lang)} className="cta-btn cta-btn--primary">
              {x.browse}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href={getLocalizedPath('/templates', lang)} className="cta-btn cta-btn--secondary">{x.templatesBtn}</a>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
