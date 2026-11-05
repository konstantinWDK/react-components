'use client';

import { useId } from 'react';
import type { CSSProperties } from 'react';
import './FeatureIconGrid.css';

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

interface Feature { icon: string; title: string; text: string; href?: string }

const icons: Record<string, string> = {
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  sparkles: '<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/><path d="M19 17v4M17 19h4"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
};

/**
 * FeatureIconGrid — Classic 3-column feature grid with SVG icons, titles,
 * descriptions and optional "learn more" links. Cards light up on hover/focus.
 *
 * @param {string} eyebrow - Small label above the heading.
 * @param {string} title - Section heading.
 * @param {string} subtitle - Section description.
 * @param {Array<{icon: string, title: string, text: string, href?: string}>} features - Feature cards.
 *   `icon` is one of: bolt, shield, layers, chart, globe, code, sparkles, lock, users.
 * @param {number} columns - Max columns on desktop (2|3|4).
 * @param {string} variant - Card style (card|plain|bordered).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface FeatureIconGridProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: Feature[];
  columns?: 2 | 3 | 4;
  variant?: 'card' | 'plain' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FeatureIconGrid({
  eyebrow = 'Features',
  title = 'Everything you need, nothing you don’t',
  subtitle = 'A focused toolkit that keeps your pages fast, accessible and on-brand.',
  features = [
    { icon: 'bolt', title: 'Zero runtime JS', text: 'Components render to static HTML and CSS. Interactivity is progressive and tiny.', href: '#' },
    { icon: 'shield', title: 'Accessible by default', text: 'Semantic markup, focus rings, ARIA where it matters and 4.5:1 contrast everywhere.', href: '#' },
    { icon: 'layers', title: 'Design tokens', text: 'Colors, spacing and radii come from CSS custom properties you can re-theme in one file.' },
    { icon: 'chart', title: 'SVG charts', text: '45 dependency-free charts with tooltips, legends and data-table fallbacks.' },
    { icon: 'globe', title: 'i18n ready', text: 'Every string is a prop. Ship English, Spanish and Russian docs out of the box.' },
    { icon: 'code', title: 'Copy & paste', text: 'No package lock-in. Grab the source from the docs and own every line.' },
  ],
  columns = 3,
  variant = 'card',
  size = 'md',
  className = '',
}: FeatureIconGridProps) {
  const id = `fig-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <>
      <section className={`fig fig--${variant} fig--${size} ${className}`} aria-labelledby={id} style={st(`--fig-cols:${columns}`)} data-rk-d09f2e="">
        <div className="fig__inner" data-rk-d09f2e="">
          <header className="fig__head" data-rk-d09f2e="">
            <p className="fig__eyebrow" data-rk-d09f2e="">{eyebrow}</p>
            <h2 id={id} className="fig__title" data-rk-d09f2e="">{title}</h2>
            <p className="fig__subtitle" data-rk-d09f2e="">{subtitle}</p>
          </header>
          <ul className="fig__grid" data-rk-d09f2e="">
            {features.map((f, __i: number) => (
              <li key={__i} className="fig__card" data-rk-d09f2e="">
                <span className="fig__icon" aria-hidden="true" data-rk-d09f2e="">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icons[f.icon] ?? icons.sparkles }} data-rk-d09f2e=""></svg>
                </span>
                <h3 className="fig__card-title" data-rk-d09f2e="">{f.title}</h3>
                <p className="fig__text" data-rk-d09f2e="">{f.text}</p>
                {f.href && (
                  <a className="fig__link" href={f.href} data-rk-d09f2e="">
                    Learn more<span className="fig__sr" data-rk-d09f2e=""> about {f.title}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-d09f2e=""><path d="M5 12h14M13 6l6 6-6 6" data-rk-d09f2e="" /></svg>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default FeatureIconGrid;
