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

| Category | Import | Components |
|----------|--------|:----------:|
| **Buttons** | `react-component-kit-ui/buttons` | 22 |
| **Feedback** | `react-component-kit-ui/feedback` | 22 |
| Forms, Cards, Layout, Navigation, Overlays, Typography, Data, Charts, E-commerce, App, Sections, Templates | | 🚧 in progress |

<details>
<summary><strong>Buttons</strong> (22)</summary>

`AnimatedIconButton` · `BorderDrawButton` · `CyberpunkButton` · `DoubleBorderButton` · `GhostOutlineButton` · `GlassButton` · `GlowButton` · `LiquidButton` · `LoadingButton` · `MagneticButton` · `MinimalPillButton` · `NeonBorderButton` · `NeumorphicButton` · `PulseButton` · `RetroArcadeButton` · `RetroShadowButton` · `RippleButton` · `ShimmerButton` · `ShinyButton` · `SlideRevealButton` · `ThreeDPushButton` · `TiltGlowButton`

All buttons render a `<button>` by default, or an `<a>` when `href` is set (with `aria-disabled` instead of an invalid `disabled`).
Common props: `variant`, `size` (`'sm' | 'md' | 'lg'`), `disabled`, `href`, `type`, plus any native attribute.
</details>

<details>
<summary><strong>Feedback</strong> (22)</summary>

`AnimatedCheckmark` · `Badge` · `CircleProgress` · `ConfettiFeedback` · `CyberGlitchAlert` · `EmptyStateCard` · `GlassAlert` · `GlassModal` · `GlassProgress` · `IndicatorBadgeMinimal` · `NeonSpinner` · `ProgressRingCounter` · `PulseDot` · `RatingPill` · `ShakeErrorGroup` · `SimpleTooltip` · `SkeletonList` · `Spotlight` · `StepProgress` · `ToastNotif` · `ToastNotificationGroup` · `TypingIndicator`

Interactive components are controlled through props:
- `GlassModal`: `open`, `onClose`, `onConfirm`. Built on native `<dialog>` (Esc, focus trap, backdrop click).
- `ToastNotif`: `show` toggles the enter/leave animation.
- `ToastNotificationGroup`: `onAction`, `onDismiss`; unmounts itself after dismissing.
- `ShakeErrorGroup`: change its `key` to replay the shake.
- `StepProgress`: `steps`, `activeIndex`.
</details>

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

### Porting a component from the Astro kit

```bash
node scripts/extract-css.mjs forms --src ../astro-components
```

Then write each `Name.tsx` following these rules:

| Astro | React |
|-------|-------|
| `interface Props` + `Astro.props` | `export interface NameProps extends HTMLAttributes<…>`, defaults in destructuring, `...rest` forwarded |
| `<slot />` / `<slot name="x">` | `children` / a `ReactNode` prop with the Astro default as fallback |
| `class:list` | `[…].filter(Boolean).join(' ')`, user `className` appended |
| `style={\`--x: ${v}\`}` | `style={{ '--x': v, ...style } as CSSProperties}` |
| scoped `<style>` | `Name.css` imported by the component, same class names |
| `:global(.x)` | `.x` |
| `@keyframes spin` | `@keyframes <component-slug>-spin` (done by the script) |
| `<script>` + `querySelectorAll` | React handlers / refs / state; pointer-tracking writes to `el.style` (no re-render per move) |
| `Math.random()` ids | `useId()` |
| `<div>` inside `<button>` | `<span>` (valid HTML) |

Finally: add the category barrel, export it from `src/components/index.ts`, add the `./<category>` entry to `package.json#exports`, then register the docs page:

1. `site/demos/meta.ts` → `slug: { file, category, usage }` (the slug must match the Astro registry).
2. `site/demos/<category>.tsx` → the live preview (same examples as `PreviewRenderer.astro`).
3. `site/demos/DemoRenderer.tsx` → add the category loader.

The page, sidebar entry, SEO metadata and sitemap entry are generated automatically in EN/ES/RU.

---

## 🚢 Deployment & releases

- **Website** (reactcomponents.dev): Docker + Coolify, see [COOLIFY.md](./COOLIFY.md).
- **npm package**: see [PUBLISHING.md](./PUBLISHING.md) and [CHANGELOG.md](./CHANGELOG.md).

---

## 🤝 Contributing

PRs are welcome. Please run `npm run typecheck && npm run build` before opening one, and keep components self-contained and accessible.

## 📄 License

[MIT](./LICENSE) © konstantinwdk
