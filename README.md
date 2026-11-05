# ⚛ React Component Kit

> A free, open-source, accessible UI component library for **React 18 & 19**.
> Dark-first glassmorphism design, zero runtime dependencies, fully typed.
>
> **🌐 Browse components** at [reactcomponents.dev](https://reactcomponents.dev)
> **📦 Install** with `npm install react-component-kit-ui`, or **copy-paste** a single component.
>
> Sister project of [Astro Component Kit](https://astrocomponents.dev): same design system, same class names, same look. Built for React.

![License: MIT](https://img.shields.io/badge/License-MIT-6366f1.svg)
![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb.svg)
![npm](https://img.shields.io/npm/v/react-component-kit-ui.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-34d399.svg)

---

## ✨ Features

- 🎨 **Dark & light theme**: dark first, with opt-in `data-theme="light"` and shared CSS design tokens
- ♿ **Accessible**: WCAG 2.1 AA targets, ARIA roles, keyboard support, native `<dialog>` for modals
- 🧩 **Self-contained components**: each one is a `.tsx` + `.css` pair with no internal imports, so you can copy a single file into your project
- ⚡ **Zero runtime dependencies**: only `react` as a peer dependency, plain CSS (no Tailwind, no CSS-in-JS)
- 🔷 **Fully typed**: every component exports its `Props` interface and forwards native HTML attributes (`onClick`, `aria-*`, `className`, `style`…)
- ▲ **Next.js ready**: every module ships with `'use client'`; SSR-safe (no `Math.random()` ids, uses `useId()`)
- 🌳 **Tree-shakeable**: import per category (`react-component-kit-ui/buttons`)

---

## 🚀 Quick Start

### 1. Install

```bash
npm install react-component-kit-ui
```

### 2. Import the styles once (e.g. in `main.tsx` or `app/layout.tsx`)

```tsx
import 'react-component-kit-ui/global.css'; // design tokens, reset, fonts (required)
import 'react-component-kit-ui/styles.css'; // component styles
```

> Already have your own reset? `global.css` is optional as long as you define the `--c-*`, `--r-*` and `--sp-*` tokens (see [Design tokens](#-design-tokens)).

### 3. Use components

```tsx
import { GlassButton, LoadingButton } from 'react-component-kit-ui/buttons';
import { GlassAlert, GlassModal, Badge } from 'react-component-kit-ui/feedback';

export function Example() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <>
      <GlassAlert type="success" title="Saved">Your changes were stored.</GlassAlert>

      <GlassButton onClick={() => setOpen(true)}>Delete project</GlassButton>
      <LoadingButton isLoading={saving} onClick={save}>Save</LoadingButton>
      <Badge variant="success" dot pulse>Live</Badge>

      <GlassModal open={open} onClose={() => setOpen(false)} onConfirm={remove} title="Delete project?">
        This action cannot be undone.
      </GlassModal>
    </>
  );
}
```

Or import everything from the root: `import { GlassButton, Badge } from 'react-component-kit-ui'`.

### Option B: copy & paste

Every component is self-contained. Copy `GlassButton.tsx` + `GlassButton.css` from
[`src/components/lib/buttons/`](./src/components/lib/buttons) into your project, and include the tokens from
[`src/styles/global.css`](./src/styles/global.css).

---

## 📚 Components

**290 components, 51 full-page sections and 3 multi-page templates**, the complete Astro Components Kit catalogue ported to React.

| Category | Import | Items |
|----------|--------|:-----:|
| Buttons | `react-component-kit-ui/buttons` | 22 |
| Forms | `react-component-kit-ui/forms` | 24 |
| Cards | `react-component-kit-ui/cards` | 22 |
| Feedback | `react-component-kit-ui/feedback` | 22 |
| Navigation | `react-component-kit-ui/navigation` | 23 |
| Layout | `react-component-kit-ui/layout` | 22 |
| Overlays | `react-component-kit-ui/overlays` | 23 |
| Data display | `react-component-kit-ui/data` | 23 |
| Typography | `react-component-kit-ui/typography` | 24 |
| Charts (pure SVG) | `react-component-kit-ui/charts` | 44 |
| Charts (ApexCharts) | `react-component-kit-ui/apexcharts` | 3 |
| E-commerce | `react-component-kit-ui/ecommerce` | 25 |
| App & dashboard | `react-component-kit-ui/app` | 13 |
| Sections | `react-component-kit-ui/sections` | 51 |
| Templates | `react-component-kit-ui/templates/ecommerce` · `/templates/ecommerce-editorial` · `/templates/saas-hotel` | 3 |

Browse every component with a live preview, usage and full source at [reactcomponents.dev](https://reactcomponents.dev).

```tsx
import { StoreHomePage, demoStore } from 'react-component-kit-ui/templates/ecommerce';

// app/page.tsx (Next.js)
export default function Page() {
  return <StoreHomePage store={{ ...demoStore, name: 'My Shop' }} />;
}
```

Everything has zero runtime dependencies except two optional peers, which live in their own entry points so your bundler never looks for a package you did not install:

| Entry point | Components | Install |
|-------------|------------|---------|
| `react-component-kit-ui/apexcharts` | `AreaChart`, `BarChart`, `DonutChart` | `npm install apexcharts` |
| `react-component-kit-ui/three` | `Galaxy3D` | `npm install three` |

The other 44 charts in `react-component-kit-ui/charts` are pure SVG.

### How styles stay isolated

Like Astro's scoped styles, every component's CSS is scoped to its own markup with a `data-rk-<hash>` attribute and `:where()` selectors, so it never leaks into your app (and keeps the original specificity). Global design tokens live in `global.css`.

---

## 🎨 Design tokens

All components read CSS custom properties defined in `global.css`. Override them to brand the kit:

```css
:root {
  --c-primary: #6366f1;        /* brand color */
  --c-primary-light: #818cf8;
  --c-bg: #050505;             /* page background */
  --c-text-1: #ffffff;         /* headings */
  --c-text-2: #a3a3a3;         /* body */
  --r-md: 12px;                /* radius scale: --r-sm/md/lg/xl/full */
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

Light theme: add `data-theme="light"` to `<html>`.

---

## 🛠 Development

```bash
git clone https://github.com/konstantinWDK/react-components.git
cd react-components
npm install
npm run dev          # website (Next.js) → http://localhost:3000
```

| Script | What it does |
|--------|--------------|
| `npm run dev` | Website (Next.js) with hot reload |
| `npm run build` | Library build → `dist/` (ESM, `.d.ts`, `styles.css`, `global.css`) |
| `npm run build:site` | Static website → `out/` (what reactcomponents.dev serves) |
| `npm run typecheck` | TypeScript strict check |
| `npm run check-css` | Fails if two components define the same class / `@keyframes` |
| `npm run pack:check` | Build + list the files that would be published to npm |

### Project structure

```
src/
├── components/
│   ├── index.ts                 # root barrel
│   └── lib/
│       ├── buttons/
│       │   ├── GlassButton.tsx  # component + exported Props
│       │   ├── GlassButton.css  # its styles (same BEM classes as the Astro kit)
│       │   └── index.ts         # category barrel → react-component-kit-ui/buttons
│       └── feedback/ …
└── styles/global.css            # design tokens + reset (shared with the Astro kit)
app/                             # Next.js routes: (en)/… at the root, [lang]/… for /es and /ru
site/                            # reactcomponents.dev (same structure as astrocomponents.dev)
├── config/site.ts               # site name, URL, SEO copy per locale
├── i18n/                        # translations (copied from the Astro kit, adapted to React)
├── data/registry.json           # component/section/template metadata exported from the Astro kit
├── demos/
│   ├── meta.ts                  # ported slugs → source file + usage snippet
│   └── <category>.tsx           # live previews (one lazy chunk per category)
├── layout/ docs/ home/ pages/   # header, sidebar, docs page, home, catalogs
└── styles/                      # site CSS ported from the Astro pages
scripts/
├── extract-css.mjs              # port <style> blocks from the Astro kit
└── check-css.mjs                # class / keyframe collision guard
```

### Porting from the Astro kit

The library is generated from [astro-component-kit](https://github.com/konstantinWDK/astro-components) by a source-to-source converter, then type-checked and visually audited:

```bash
node scripts/astro2react.mjs forms                       # .astro → .tsx + scoped .css
python3 scripts/port-fixes.py                            # hand fixes re-applied after a --force regeneration
node scripts/gen-site-meta.mjs                           # website metadata, usage snippets, previews
node scripts/gen-hardcoded-previews.mjs                  # hand-written demos from PreviewRenderer.astro
npx tsx --tsconfig scripts/smoke/tsconfig.json --import ./scripts/smoke/register.mjs scripts/smoke/ssr-smoke.tsx  # SSR smoke test
node scripts/smoke/audit-pages.mjs http://localhost:5200  # browser audit of every docs page (needs a served build)
```

What the converter does: frontmatter → typed props with defaults, `class:list` → `className`, SVG/HTML attribute names, `style` strings → objects, `set:html`, `<slot>` → `children` / named props, keys for `.map()`, Astro-style scoped CSS, and client `<script>` blocks → a mount effect. `buttons/` and `feedback/` are hand-written ports.

## 🚢 Deployment & releases

- **Website** (reactcomponents.dev): Docker + Coolify, see [COOLIFY.md](./COOLIFY.md).
- **npm package**: see [PUBLISHING.md](./PUBLISHING.md) and [CHANGELOG.md](./CHANGELOG.md).

---

## 🤝 Contributing

PRs are welcome. Please run `npm run typecheck && npm run build` before opening one, and keep components self-contained and accessible.

## 📄 License

[MIT](./LICENSE) © konstantinwdk
