'use client';

import { useId } from 'react';
import './HeroMinimalCentered.css';

/**
 * HeroMinimalCentered — Typography-first centered hero with an announcement pill,
 * two CTAs and a row of trust signals. No imagery, loads instantly.
 *
 * @param {string} announcement - Text in the top pill (empty to hide).
 * @param {string} announcementHref - Link for the pill.
 * @param {string} title - Main headline. Wrap a word in *asterisks* to highlight it.
 * @param {string} subtitle - Supporting paragraph.
 * @param {{label: string, href: string}} primary - Primary CTA.
 * @param {{label: string, href: string}} secondary - Secondary CTA.
 * @param {string[]} trust - Short trust signals under the CTAs.
 * @param {string} variant - Background treatment (default|glow|grid).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface HeroMinimalCenteredProps {
  announcement?: string;
  announcementHref?: string;
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  trust?: string[];
  variant?: 'default' | 'glow' | 'grid';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HeroMinimalCentered({
  announcement = 'New: 50 sections & 45 SVG charts',
  announcementHref = '#',
  title = 'Build landing pages that *feel* expensive',
  subtitle = 'Accessible, zero-dependency React components with a dark, refined aesthetic. Copy, paste, ship.',
  primary = { label: 'Browse components', href: '#' },
  secondary = { label: 'Read the docs', href: '#' },
  trust = ['MIT licensed', 'WCAG AA', 'No runtime JS required'],
  variant = 'glow',
  size = 'lg',
  className = '',
}: HeroMinimalCenteredProps) {
  const id = `hmc-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const parts = title.split(/\*(.+?)\*/);
  return (
    <>
      <section className={`hmc hmc--${variant} hmc--${size} ${className}`} aria-labelledby={id} data-rk-9ae33e="">
        <div className="hmc__bg" aria-hidden="true" data-rk-9ae33e=""></div>
        <div className="hmc__inner" data-rk-9ae33e="">
          {announcement && (
            <a className="hmc__pill" href={announcementHref} data-rk-9ae33e="">
              <span className="hmc__dot" aria-hidden="true" data-rk-9ae33e=""></span>
              {announcement}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" data-rk-9ae33e=""><path d="M5 12h14M13 6l6 6-6 6" data-rk-9ae33e="" /></svg>
            </a>
          )}
          <h1 id={id} className="hmc__title" data-rk-9ae33e="">
            {parts.map((p, i) => (i % 2 ? <em data-rk-9ae33e="">{p}</em> : p))}
          </h1>
          <p className="hmc__subtitle" data-rk-9ae33e="">{subtitle}</p>
          <div className="hmc__actions" data-rk-9ae33e="">
            <a className="hmc__btn hmc__btn--primary" href={primary.href} data-rk-9ae33e="">{primary.label}</a>
            <a className="hmc__btn hmc__btn--ghost" href={secondary.href} data-rk-9ae33e="">{secondary.label}</a>
          </div>
          {trust.length > 0 && (
            <ul className="hmc__trust" data-rk-9ae33e="">
              {trust.map((t, __i: number) => (
                <li key={__i} data-rk-9ae33e="">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-9ae33e=""><path d="M20 6 9 17l-5-5" data-rk-9ae33e="" /></svg>
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

export default HeroMinimalCentered;
