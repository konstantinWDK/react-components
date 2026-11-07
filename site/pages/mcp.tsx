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

/** Input parameters per tool (from mcp/tools.ts). */
const PARAMS: Record<string, string> = {
  search_components: 'query, category?, limit?',
  list_components: 'category',
  get_component: 'slug',
  get_component_code: 'slug',
  list_categories: '—',
  list_templates: '—',
  get_template: 'slug, page?',
  get_design_tokens: '—',
  get_library_info: '—',
};

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


/** Long-form docs: how it works, verification, FAQ. */
const DOCS: Record<Locale, {
  whatTitle: string; whatP: string[]; flowTitle: string; flow: [string, string][];
  verifyTitle: string; verifyDesc: string; verifyAsk: string; verifyAskText: string; verifyCli: string; verifyHealth: string;
  toolsDesc: string; thTool: string; thParams: string; thDesc: string; paramsNote: string;
  faqTitle: string; faq: [string, string][];
  tocWhat: string; tocVerify: string; tocFaq: string;
}> = {
  en: {
    whatTitle: 'What is MCP?',
    whatP: [
      'The Model Context Protocol (MCP) is an open standard that lets AI assistants call external tools. Instead of guessing component names or props from training data, your assistant asks this server and gets the real, current answer.',
      'The server is read-only and public: it serves the catalog, props, source code and templates of the kit. It never reads your project or your files.',
    ],
    flowTitle: 'How it works',
    flow: [
      ['Connect', 'Add the server URL to your editor once (config below).'],
      ['Ask', 'Describe what you want to build in plain language.'],
      ['Discover', 'The agent calls search_components / list_templates to find the right pieces.'],
      ['Read', 'It calls get_component for props and imports, or get_component_code for the full source.'],
      ['Write', 'It writes the code into your project with the correct imports and CSS.'],
    ],
    verifyTitle: 'Check the connection',
    verifyDesc: 'After adding the config, restart your editor (or reload MCP servers) and check that the tools are available.',
    verifyAsk: 'Ask your assistant',
    verifyAskText: 'Which react-components MCP tools do you have? Call get_library_info.',
    verifyCli: 'In Claude Code you can list the configured servers:',
    verifyHealth: 'Check that the server is up (returns JSON with version and counts):',
    toolsDesc: 'Tools your assistant can call. Parameters marked with ? are optional.',
    thTool: 'Tool', thParams: 'Parameters', thDesc: 'Returns',
    paramsNote: 'slug accepts a kebab-case slug ("glass-button") or a component name ("GlassButton").',
    faqTitle: 'FAQ and troubleshooting',
    faq: [
      ['Do I need to install the npm package?', `No. The agent can either add react-component-kit-ui and import components from it, or copy a single component's .tsx + .css into your project with get_component_code. Tell it which one you prefer.`],
      ['Is it free? Do I need an API key?', 'Yes, it is free and open. No account, no key and no sign-up.'],
      ['My client only supports SSE', 'Use https://mcp.reactcomponents.dev/sse instead of /mcp. The tools are the same.'],
      ['My client only supports local (stdio) servers', 'Wrap the remote server with mcp-remote: command "npx", args ["-y", "mcp-remote", "https://mcp.reactcomponents.dev/mcp"].'],
      ['Opening /mcp in the browser shows "Method not allowed"', 'That is expected: /mcp only accepts POST requests from MCP clients. Open https://mcp.reactcomponents.dev/ for the server landing page.'],
      ['I get error 429', 'The server allows 120 requests per minute per IP. Wait a minute and try again.'],
      ['The agent does not use the tools', 'Mention the kit explicitly, e.g. "use the react-components MCP", and check that the server shows as connected in your editor.'],
    ],
    tocWhat: 'What is MCP?', tocVerify: 'Check the connection', tocFaq: 'FAQ',
  },
  es: {
    whatTitle: '¿Qué es MCP?',
    whatP: [
      'Model Context Protocol (MCP) es un estándar abierto que permite a los asistentes de IA usar herramientas externas. En lugar de adivinar nombres de componentes o props, tu asistente consulta este servidor y obtiene la respuesta real y actualizada.',
      'El servidor es público y de solo lectura: sirve el catálogo, las props, el código fuente y las plantillas del kit. Nunca lee tu proyecto ni tus archivos.',
    ],
    flowTitle: 'Cómo funciona',
    flow: [
      ['Conectar', 'Añade la URL del servidor a tu editor una sola vez (configuración más abajo).'],
      ['Pedir', 'Describe lo que quieres construir en lenguaje natural.'],
      ['Descubrir', 'El agente llama a search_components / list_templates para encontrar las piezas adecuadas.'],
      ['Leer', 'Llama a get_component para ver props e imports, o a get_component_code para el código completo.'],
      ['Escribir', 'Escribe el código en tu proyecto con los imports y el CSS correctos.'],
    ],
    verifyTitle: 'Comprueba la conexión',
    verifyDesc: 'Después de añadir la configuración, reinicia tu editor (o recarga los servidores MCP) y comprueba que las herramientas están disponibles.',
    verifyAsk: 'Pregúntale a tu asistente',
    verifyAskText: '¿Qué herramientas del MCP react-components tienes? Llama a get_library_info.',
    verifyCli: 'En Claude Code puedes listar los servidores configurados:',
    verifyHealth: 'Comprueba que el servidor está activo (devuelve JSON con la versión y los totales):',
    toolsDesc: 'Herramientas que tu asistente puede llamar. Los parámetros con ? son opcionales.',
    thTool: 'Herramienta', thParams: 'Parámetros', thDesc: 'Devuelve',
    paramsNote: 'slug acepta un slug en kebab-case ("glass-button") o el nombre del componente ("GlassButton").',
    faqTitle: 'Preguntas frecuentes y problemas',
    faq: [
      ['¿Tengo que instalar el paquete de npm?', 'No. El agente puede instalar react-component-kit-ui e importar desde ahí, o copiar el .tsx + .css de un solo componente en tu proyecto con get_component_code. Dile cuál prefieres.'],
      ['¿Es gratis? ¿Necesito API key?', 'Sí, es gratis y abierto. Sin cuenta, sin clave y sin registro.'],
      ['Mi cliente solo admite SSE', 'Usa https://mcp.reactcomponents.dev/sse en lugar de /mcp. Las herramientas son las mismas.'],
      ['Mi cliente solo admite servidores locales (stdio)', 'Envuelve el servidor remoto con mcp-remote: command "npx", args ["-y", "mcp-remote", "https://mcp.reactcomponents.dev/mcp"].'],
      ['Al abrir /mcp en el navegador sale "Method not allowed"', 'Es normal: /mcp solo acepta peticiones POST de clientes MCP. Abre https://mcp.reactcomponents.dev/ para ver la página del servidor.'],
      ['Me da error 429', 'El servidor permite 120 peticiones por minuto por IP. Espera un minuto y vuelve a intentarlo.'],
      ['El agente no usa las herramientas', 'Menciona el kit explícitamente, por ejemplo "usa el MCP de react-components", y comprueba que el servidor aparece como conectado en tu editor.'],
    ],
    tocWhat: '¿Qué es MCP?', tocVerify: 'Comprobar conexión', tocFaq: 'Preguntas frecuentes',
  },
  ru: {
    whatTitle: 'Что такое MCP?',
    whatP: [
      'Model Context Protocol (MCP) — открытый стандарт, который позволяет ИИ-ассистентам вызывать внешние инструменты. Вместо того чтобы угадывать названия компонентов и props, ассистент спрашивает этот сервер и получает актуальный ответ.',
      'Сервер публичный и только для чтения: он отдаёт каталог, props, исходный код и шаблоны набора. Он никогда не читает ваш проект и файлы.',
    ],
    flowTitle: 'Как это работает',
    flow: [
      ['Подключение', 'Один раз добавьте URL сервера в редактор (конфигурация ниже).'],
      ['Запрос', 'Опишите обычными словами, что хотите создать.'],
      ['Поиск', 'Агент вызывает search_components / list_templates, чтобы найти нужные части.'],
      ['Чтение', 'Вызывает get_component для props и импортов или get_component_code для полного кода.'],
      ['Код', 'Пишет код в ваш проект с правильными импортами и CSS.'],
    ],
    verifyTitle: 'Проверка подключения',
    verifyDesc: 'После добавления конфигурации перезапустите редактор (или перезагрузите MCP-серверы) и проверьте, что инструменты доступны.',
    verifyAsk: 'Спросите ассистента',
    verifyAskText: 'Какие инструменты MCP react-components тебе доступны? Вызови get_library_info.',
    verifyCli: 'В Claude Code можно вывести список настроенных серверов:',
    verifyHealth: 'Проверьте, что сервер работает (возвращает JSON с версией и количеством):',
    toolsDesc: 'Инструменты, которые может вызывать ассистент. Параметры с ? необязательны.',
    thTool: 'Инструмент', thParams: 'Параметры', thDesc: 'Возвращает',
    paramsNote: 'slug принимает slug в kebab-case ("glass-button") или имя компонента ("GlassButton").',
    faqTitle: 'Вопросы и решение проблем',
    faq: [
      ['Нужно ли устанавливать npm-пакет?', 'Нет. Агент может установить react-component-kit-ui и импортировать из него или скопировать .tsx + .css одного компонента в проект через get_component_code. Скажите, что предпочитаете.'],
      ['Это бесплатно? Нужен API-ключ?', 'Да, бесплатно и открыто. Без аккаунта, ключа и регистрации.'],
      ['Мой клиент поддерживает только SSE', 'Используйте https://mcp.reactcomponents.dev/sse вместо /mcp. Инструменты те же.'],
      ['Мой клиент поддерживает только локальные (stdio) серверы', 'Оберните удалённый сервер в mcp-remote: command "npx", args ["-y", "mcp-remote", "https://mcp.reactcomponents.dev/mcp"].'],
      ['При открытии /mcp в браузере — "Method not allowed"', 'Это нормально: /mcp принимает только POST-запросы от MCP-клиентов. Страница сервера — https://mcp.reactcomponents.dev/.'],
      ['Ошибка 429', 'Сервер допускает 120 запросов в минуту с одного IP. Подождите минуту и повторите.'],
      ['Агент не использует инструменты', 'Явно упомяните набор, например «используй MCP react-components», и проверьте, что сервер подключён в редакторе.'],
    ],
    tocWhat: 'Что такое MCP?', tocVerify: 'Проверка', tocFaq: 'Вопросы',
  },
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
  const d = DOCS[lang];
  const toc = [
    { id: 'what-is-mcp', text: d.tocWhat },
    { id: 'setup', text: x.tocSetup },
    { id: 'verify', text: d.tocVerify },
    { id: 'prompts', text: x.tocPrompts },
    { id: 'tools', text: x.tocTools },
    { id: 'faq', text: d.tocFaq },
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

        <section className="install-section anim-slide-up" id="what-is-mcp">
          <h2 className="step-title">{d.whatTitle}</h2>
          {d.whatP.map((p) => <p className="step-desc" key={p}>{p}</p>)}
          <h3 className="step-subtitle">{d.flowTitle}</h3>
          <ol className="mcp-flow">
            {d.flow.map(([title, text], i) => (
              <li className="mcp-flow__step" key={title}>
                <span className="mcp-flow__num">{i + 1}</span>
                <div><strong>{title}</strong><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

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

        <section className="install-section anim-slide-up" id="verify">
          <h2 className="step-title">{d.verifyTitle}</h2>
          <p className="step-desc">{d.verifyDesc}</p>
          <h3 className="step-subtitle">{d.verifyAsk}</h3>
          <div className="code-block-wrap"><CodeBlock code={d.verifyAskText} lang="text" title="prompt" /></div>
          <p className="mcp-note">{d.verifyCli}</p>
          <div className="code-block-wrap"><CodeBlock code="claude mcp list" lang="bash" title="terminal" /></div>
          <p className="mcp-note">{d.verifyHealth}</p>
          <div className="code-block-wrap"><CodeBlock code="curl https://mcp.reactcomponents.dev/health" lang="bash" title="terminal" /></div>
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
          <p className="step-desc">{d.toolsDesc}</p>
          <div className="ref-table mcp-table">
            <table>
              <thead><tr><th>{d.thTool}</th><th>{d.thParams}</th><th>{d.thDesc}</th></tr></thead>
              <tbody>
                {TOOLS.map(([name, desc]) => (
                  <tr key={name}><td><code>{name}</code></td><td><code className="mcp-table__params">{PARAMS[name]}</code></td><td>{desc[lang]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mcp-note">{d.paramsNote}</p>
        </section>

        <section className="install-section anim-slide-up" id="faq">
          <h2 className="step-title">{d.faqTitle}</h2>
          <div className="mcp-faq">
            {d.faq.map(([q, a]) => (
              <details className="mcp-faq__item" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
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
