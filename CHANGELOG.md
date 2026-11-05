# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added — complete catalogue
- All remaining categories ported from the Astro kit: forms, cards, navigation, layout, overlays, data, typography, charts, e-commerce and app (290 components in total).
- 51 full-page sections (`react-component-kit-ui/sections`) with their own pages on reactcomponents.dev (`/sections/<slug>`), real miniatures in the catalog and the home spotlight.
- 3 multi-page templates (`react-component-kit-ui/templates/ecommerce`, `/ecommerce-editorial`, `/saas-hotel`) with live previews (`/preview/…`) and detail pages showing the Next.js files to create.
- Root components `Galaxy3D`, `AnimatedGalaxy`, `LogoWithGalaxy`.
- Astro-style scoped CSS (`data-rk-*` + `:where()`), so component styles never collide.

### Fixed (also present in the Astro kit)
- `AreaChart` / `BarChart` / `DonutChart` never rendered: ApexCharts cannot parse CSS variables (colours are now resolved first) and the donut total used a non-existent `seriesGlobals` field.
- `GlassModal` centring; `StickySidebarWrapper` `class:list` typo.


### Added — reactcomponents.dev website
- New Next.js (static export) website replicating astrocomponents.dev: same header menu, sidebar with search, docs page per component (live preview, usage, TSX + CSS source, quick info), installation guide, sections and templates catalogs, and the full home page (3D galaxy, particle background, carousels, interaction lab).
- Three languages with the same URLs as the Astro site: English at `/`, Spanish at `/es/`, Russian at `/ru/`, with hreflang alternates and a multilingual sitemap.
- Component metadata, descriptions and translations reused from the Astro registry.

### Changed
- All library components now carry `'use client'` in their source, so they can be copied straight into a Next.js App Router project.

## [0.1.0] - 2026-11-04

First public release of **React Component Kit**: the React port of [astro-component-kit](https://astrocomponents.dev).

### Added
- **Buttons** (`react-component-kit-ui/buttons`), 22 components: AnimatedIconButton, BorderDrawButton, CyberpunkButton, DoubleBorderButton, GhostOutlineButton, GlassButton, GlowButton, LiquidButton, LoadingButton, MagneticButton, MinimalPillButton, NeonBorderButton, NeumorphicButton, PulseButton, RetroArcadeButton, RetroShadowButton, RippleButton, ShimmerButton, ShinyButton, SlideRevealButton, ThreeDPushButton, TiltGlowButton.
- **Feedback** (`react-component-kit-ui/feedback`), 22 components: AnimatedCheckmark, Badge, CircleProgress, ConfettiFeedback, CyberGlitchAlert, EmptyStateCard, GlassAlert, GlassModal, GlassProgress, IndicatorBadgeMinimal, NeonSpinner, ProgressRingCounter, PulseDot, RatingPill, ShakeErrorGroup, SimpleTooltip, SkeletonList, Spotlight, StepProgress, ToastNotif, ToastNotificationGroup, TypingIndicator.
- Shared design tokens (`global.css`) with dark (default) and light (`data-theme="light"`) themes.
- ESM build with one entry per category, `.d.ts` types, `'use client'` banner for Next.js App Router.
- Playground / docs site (reactcomponents.dev) with search and theme toggle.
- `check-css` guard against class / keyframe collisions between components.

### Changed (vs. the Astro kit)
- `GlassModal` is controlled (`open` / `onClose` / `onConfirm`) and centered correctly despite the global margin reset.
- Link-rendered buttons use `aria-disabled` instead of an invalid `disabled` attribute.
- `LiquidButton` uses `useId()` and `ConfettiFeedback` a deterministic layout (SSR-safe, no hydration mismatch).
