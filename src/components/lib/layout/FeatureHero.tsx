'use client';

import type { CSSProperties, ReactNode } from 'react';
import './FeatureHero.css';

/** class:list → className */
function cx(...args: unknown[]): string {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (typeof v === 'object') for (const [k, on] of Object.entries(v as Record<string, unknown>)) if (on) out.push(k);
  };
  args.forEach(walk);
  return out.join(' ');
}

/** "a: b; --c: d" → style object */
function st(css: string | undefined): CSSProperties {
  const o: Record<string, string> = {};
  for (const decl of String(css ?? '').split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (k) o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  return o as CSSProperties;
}

/**
 * FeatureHero — A visually striking hero section with animated gradient background and glassmorphism overlay.
 *
 * Features a full-screen hero with subtle gradient background, glass-effect card overlay,
 * and customizable title, subtitle, and action slots. Designed for landing pages and
 * product showcase sections.
 *
 * @param {string} title - Main headline text. Default: 'Experience the Next Dimension of Design'.
 * @param {string} subtitle - Supporting description text. Default: 'Build stunning interfaces faster than ever with our premium component ecosystem.'.
 * @param {string} gradientFrom - Start color of the background gradient. Default: 'rgba(99,102,241,0.15)'.
 * @param {string} gradientTo - End color of the background gradient. Default: 'transparent'.
 * @param {string} className - Additional CSS class to apply.
 *
 * @example
 * ```astro
 * <FeatureHero
 *   title="Ship Faster with Premium Components"
 *   subtitle="200+ production-ready UI components for Astro."
 * >
 *   <a href="/docs">Browse Components</a>
 * </FeatureHero>
 * ```
 */
export interface FeatureHeroProps {
  title?: string;
  subtitle?: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
  children?: ReactNode;
}

export function FeatureHero({
  title = 'Experience the Next Dimension of Design',
  subtitle = 'Build stunning interfaces faster than ever with our premium component ecosystem.',
  gradientFrom = 'rgba(99,102,241,0.15)',
  gradientTo = 'transparent',
  className = '',
  children
}: FeatureHeroProps) {
  return (
    <>
      <div className="cq-feature-hero-cq" data-rk-4c81ec="">
      <section className={cx(['feature-hero', className])} data-rk-4c81ec="">
        <div className="feature-hero__bg" aria-hidden="true" data-rk-4c81ec="">
          <div className="feature-hero__gradient" style={st(`--gradient-from: ${gradientFrom}; --gradient-to: ${gradientTo}`)} data-rk-4c81ec=""></div>
        </div>
        <div className="feature-hero__overlay" aria-hidden="true" data-rk-4c81ec=""></div>
        <div className="feature-hero__inner" data-rk-4c81ec="">
          <h1 className="feature-hero__title" data-rk-4c81ec="">{title}</h1>
          <p className="feature-hero__subtitle" data-rk-4c81ec="">{subtitle}</p>
          <div className="feature-hero__actions" data-rk-4c81ec="">
            {children}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default FeatureHero;
