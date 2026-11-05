/** Landing page served at https://mcp.reactcomponents.dev/ */
import { stats, PKG, SITE } from './data';

const MCP_URL = 'https://mcp.reactcomponents.dev/mcp';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const clients: { name: string; hint: string; code: string }[] = [
  { name: 'Claude Code', hint: 'Terminal', code: `claude mcp add --transport http react-components ${MCP_URL}` },
  { name: 'Cursor', hint: '~/.cursor/mcp.json', code: JSON.stringify({ mcpServers: { 'react-components': { url: MCP_URL } } }, null, 2) },
  { name: 'VS Code (Copilot)', hint: '.vscode/mcp.json', code: JSON.stringify({ servers: { 'react-components': { type: 'http', url: MCP_URL } } }, null, 2) },
  { name: 'Claude Desktop', hint: 'Settings → Connectors → Add custom connector', code: MCP_URL },
  { name: 'Windsurf / others', hint: 'Any client with remote MCP support (legacy SSE: /sse)', code: JSON.stringify({ mcpServers: { 'react-components': { serverUrl: MCP_URL } } }, null, 2) },
];

const tools: [string, string][] = [
  ['search_components', 'Find components and sections by keyword'],
  ['list_components', 'Everything in a category'],
  ['get_component', 'Props interface, usage example and import'],
  ['get_component_code', 'Full .tsx + .css source to copy'],
  ['list_categories', 'Categories, entry points and counts'],
  ['list_templates', 'Store, editorial shop and hotel SaaS'],
  ['get_template', 'Next.js App Router files for every page'],
  ['get_design_tokens', 'Colors, surfaces, radii and theming'],
  ['get_library_info', 'Install, CSS imports and peers'],
];

export function landingPage() {
  const s = stats();
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>React Components MCP</title>
<meta name="description" content="Model Context Protocol server for React Components Kit: let Claude, Cursor or Copilot search, read and use ${s.components} React components, ${s.sections} sections and ${s.templates} templates.">
<link rel="icon" href="${SITE}/favicon.svg" type="image/svg+xml">
<style>
:root{--bg:#03060b;--bg1:#070b12;--bg2:#0c1220;--line:rgba(148,197,255,.1);--text:#e6f0fa;--muted:#a9b8c9;--primary:#0ea5e9;--light:#38bdf8;--glow:rgba(56,189,248,.14)}
@media (prefers-color-scheme:light){:root{--bg:#f4f8fc;--bg1:#fff;--bg2:#e8f0f8;--line:rgba(15,40,70,.12);--text:#0b1220;--muted:#475569;--primary:#0369a1;--light:#0369a1;--glow:rgba(3,105,161,.1)}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;background-image:radial-gradient(60rem 30rem at 80% -10%,var(--glow),transparent 70%)}
main{max-width:920px;margin:0 auto;padding:56px 16px 72px}
a{color:var(--light)}
.badge{display:inline-flex;gap:8px;align-items:center;padding:4px 12px;border:1px solid var(--line);border-radius:999px;background:var(--bg1);color:var(--muted);font-size:13px}
.dot{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 10px #22c55e}
h1{font-size:clamp(2rem,6vw,3.2rem);line-height:1.1;margin:20px 0 12px;letter-spacing:-.02em}
h1 span{color:var(--light)}
.lead{color:var(--muted);font-size:1.1rem;max-width:44rem;margin:0}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin:32px 0}
.stat{background:var(--bg1);border:1px solid var(--line);border-radius:14px;padding:16px}
.stat b{display:block;font-size:1.6rem;color:var(--light)}
.stat small{color:var(--muted)}
h2{font-size:1.3rem;margin:44px 0 14px}
.endpoint{display:flex;flex-wrap:wrap;gap:10px;align-items:center;background:var(--bg1);border:1px solid var(--primary);border-radius:14px;padding:14px 16px}
.endpoint code{font-size:1rem;color:var(--text);word-break:break-all;flex:1}
button{font:inherit;font-size:13px;cursor:pointer;border:1px solid var(--line);background:var(--bg2);color:var(--text);border-radius:8px;padding:6px 12px;min-height:32px}
button:hover{border-color:var(--light)}
button:focus-visible{outline:2px solid var(--light);outline-offset:2px}
.client{background:var(--bg1);border:1px solid var(--line);border-radius:14px;margin:12px 0;overflow:hidden}
.client header{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:12px 16px;border-bottom:1px solid var(--line)}
.client header small{color:var(--muted);display:block;font-size:12px}
pre{margin:0;padding:14px 16px;overflow-x:auto;font:13.5px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--bg2)}
.tools{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;padding:0;list-style:none;margin:0}
.tools li{background:var(--bg1);border:1px solid var(--line);border-radius:12px;padding:12px 14px}
.tools code{color:var(--light);font-size:14px}
.tools span{display:block;color:var(--muted);font-size:14px}
.try{color:var(--muted)}
.try li{margin:6px 0}
footer{margin-top:56px;color:var(--muted);font-size:14px;display:flex;flex-wrap:wrap;gap:16px}
</style>
</head>
<body>
<main>
  <span class="badge"><span class="dot"></span>Online · Model Context Protocol · v${s.version}</span>
  <h1>React Components <span>MCP</span></h1>
  <p class="lead">Give your AI assistant the whole <a href="${SITE}">React Components Kit</a>: it can search the catalogue, read the props and usage of any component, copy its source and scaffold full Next.js templates — always with the real, current code.</p>

  <div class="stats">
    <div class="stat"><b>${s.components}</b><small>components</small></div>
    <div class="stat"><b>${s.sections}</b><small>page sections</small></div>
    <div class="stat"><b>${s.templates}</b><small>templates</small></div>
    <div class="stat"><b>${tools.length}</b><small>MCP tools</small></div>
  </div>

  <h2>Endpoint</h2>
  <div class="endpoint"><code>${MCP_URL}</code><button data-copy="${MCP_URL}">Copy</button></div>
  <p class="try">Streamable HTTP, no API key. Older clients can use the legacy SSE endpoint <code>/sse</code>.</p>

  <h2>Connect your client</h2>
  ${clients
    .map(
      (c) => `<section class="client"><header><div><strong>${c.name}</strong><small>${esc(c.hint)}</small></div><button data-copy="${esc(c.code).replace(/"/g, '&quot;')}">Copy</button></header><pre><code>${esc(c.code)}</code></pre></section>`,
    )
    .join('\n  ')}

  <h2>Tools</h2>
  <ul class="tools">
    ${tools.map(([n, d]) => `<li><code>${n}</code><span>${d}</span></li>`).join('\n    ')}
  </ul>

  <h2>Try asking</h2>
  <ul class="try">
    <li>“Build a pricing page with React Components Kit.”</li>
    <li>“Which props does GlassModal accept? Add one to my settings page.”</li>
    <li>“Scaffold the Nova Store e-commerce template in my Next.js app.”</li>
    <li>“Switch my dashboard to the light theme using the kit tokens.”</li>
  </ul>

  <footer>
    <a href="${SITE}">reactcomponents.dev</a>
    <a href="https://www.npmjs.com/package/${PKG}">npm</a>
    <a href="https://github.com/konstantinWDK/react-components">GitHub</a>
    <a href="/health">Status</a>
  </footer>
</main>
<script>
document.querySelectorAll('[data-copy]').forEach(function (b) {
  b.addEventListener('click', function () {
    navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () {
      var t = b.textContent; b.textContent = 'Copied ✓'; setTimeout(function () { b.textContent = t; }, 1400);
    });
  });
});
</script>
</body>
</html>`;
}
