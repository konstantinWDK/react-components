# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
