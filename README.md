# ⚛ React Component Kit

> Sister project of [astro-component-kit](https://astrocomponents.dev): the same accessible, dark-first glassmorphism components, rewritten for **React 18/19**.
> Same design tokens, same class names, same visual output: only the rendering layer changes.

## Status

| Category | Astro | React |
|----------|:-----:|:-----:|
| Buttons | 22 | ✅ 22 |
| Feedback, Forms, Cards, Layout, Navigation, Overlays, Typography, Data, Charts, E-commerce, App, Sections, Templates | ✔ | ⏳ pending |

## Install & use

```bash
npm install react-component-kit
```

```tsx
import 'react-component-kit/global.css';  // design tokens (required once)
import 'react-component-kit/styles.css';  // component styles

import { GlassButton, LoadingButton } from 'react-component-kit/buttons';

<GlassButton variant="primary" onClick={save}>Save</GlassButton>
<LoadingButton isLoading={pending}>Submit</LoadingButton>
```

Theme: dark by default; add `data-theme="light"` to `<html>` for the light theme.
Every file ships with `'use client'`, so it works in Next.js App Router.

## Develop

```bash
npm install
npm run dev        # playground at http://localhost:5173
npm run build      # library → dist/ (ESM + .d.ts + styles.css + global.css)
npm run typecheck
```

## Porting conventions (Astro → React)

Each component is **self-contained**: `Name.tsx` + `Name.css` in its category folder, no shared internal imports, so it stays copy-paste friendly like the Astro version.

| Astro | React |
|-------|-------|
| `interface Props` + `Astro.props` | `export interface NameProps extends HTMLAttributes<HTMLElement>`, defaults in destructuring, `...rest` forwarded |
| `<slot />` | `children` |
| `<slot name="icon">` | a `ReactNode` prop (`icon`), keeping the Astro default as fallback |
| `class` / `class:list` | `className` built with `[...].filter(Boolean).join(' ')`; user `className` appended |
| `style={\`--x: ${v}\`}` | `style={{ '--x': v, ...style } as CSSProperties}` |
| `<style>` (scoped) | `Name.css` imported by the component: **same BEM class names** |
| `:global(.x)` | `.x` |
| `@keyframes spin` | `@keyframes <component-slug>-spin` (avoids collisions in the single bundle) |
| `<script>` + `querySelectorAll` + `astro:after-swap` | React event handlers / refs / state. Pointer-tracking effects write to `el.style` directly (no re-render per move) |
| `define:vars` | CSS custom properties via `style` |
| `Math.random()` ids | `useId()` (SSR-safe) |
| `href` → `<a>` | same, plus `aria-disabled` instead of an invalid `disabled` on links |
| `<div>` inside `<button>` | `<span>` (valid HTML) |

### Porting a new category

```bash
node scripts/extract-css.mjs feedback   # copies <style> blocks → src/components/lib/feedback/*.css
```

Then write each `Name.tsx` following the table above, add `index.ts` barrel, export it from `src/components/index.ts`, add the `./feedback` entry to `package.json#exports`, and add demos in `playground/demos/`.

## License

MIT © konstantinwdk
