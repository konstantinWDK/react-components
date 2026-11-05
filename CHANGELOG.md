# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-11-05

First public release of **React Components Kit**: the complete Astro Components Kit catalogue for React 18 & 19, with the docs site at [reactcomponents.dev](https://reactcomponents.dev).

### Added
- **290 components** in 13 entry points: `buttons`, `forms`, `cards`, `feedback`, `navigation`, `layout`, `overlays`, `data`, `typography`, `charts` (44 pure-SVG charts), `ecommerce`, `app` and `sections` (51 full-page sections).
- **3 multi-page templates**: `templates/ecommerce` (Nova Store), `templates/ecommerce-editorial` (Forma) and `templates/saas-hotel` (Lobby), themed with the corporate sky-blue palette.
- Optional-peer entry points: `apexcharts` (AreaChart, BarChart, DonutChart) and `three` (Galaxy3D) — never resolved unless you import them.
- Design tokens (`global.css`) with dark (default) and light (`data-theme="light"`) themes; every component reads them, including translucent accents (`color-mix`).
- Scoped component CSS (`data-rk-*` + `:where()`), so styles never leak or collide; one `styles.css` bundle.
- ESM build, `.d.ts` types (also for `moduleResolution: "node"` via `typesVersions`), `'use client'` on every module, SSR-safe ids (`useId`).
- Docs site (EN/ES/RU): live preview, usage and full source for every component, section and template.

### Fixed (also present in the Astro kit)
- `AreaChart`, `BarChart` and `DonutChart` never rendered (CSS variables passed to ApexCharts, wrong donut total field).
- `GlassModal` centring; `StickySidebarWrapper` `class:list` typo.
