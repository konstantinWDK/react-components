'use client';

import type { CSSProperties } from 'react';
import './LogoWallGrid.css';

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

interface Logo { name: string; src?: string; href?: string }

/**
 * LogoWallGrid — Static grid of customer wordmarks with hairline dividers and
 * an optional headline stat. Logos render as text wordmarks by default; pass
 * image URLs to use real logos.
 *
 * @param {string} title - Small heading above the grid.
 * @param {Array<{name: string, src?: string, href?: string}>} logos - Customers.
 * @param {number} columns - Columns on desktop (3|4|6).
 * @param {string} variant - Grid style (divided|cards|plain).
 * @param {string} size - Vertical rhythm (sm|md|lg).
 * @param {string} className - Extra CSS class.
 */
export interface LogoWallGridProps {
  title?: string;
  logos?: Logo[];
  columns?: 3 | 4 | 6;
  variant?: 'divided' | 'cards' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LogoWallGrid({
  title = 'Powering 12,000+ teams, from startups to the Fortune 500',
  logos = [
    { name: 'Northwind' }, { name: 'Lumen' }, { name: 'Orbitly' }, { name: 'Civic' },
    { name: 'Driftly' }, { name: 'Acme' }, { name: 'Helix' }, { name: 'Nimbus' },
  ],
  columns = 4,
  variant = 'divided',
  size = 'md',
  className = '',
}: LogoWallGridProps) {
  const id = `lwg-${Math.random().toString(36).slice(2, 8)}`;
  const glyphs = [
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/>',
    '<path d="M12 3 21 20H3z"/>',
    '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M4 12h16"/>',
    '<path d="M4 18 12 4l8 14M8 12h8"/>',
  ];
  return (
    <>
      <div className="cq-logo-wall-grid-cq" data-rk-c72122="">
      <section className={`lwg lwg--${variant} lwg--${size} ${className}`} aria-labelledby={id} style={st(`--lwg-cols:${columns}`)} data-rk-c72122="">
        <div className="lwg__inner" data-rk-c72122="">
          <h2 id={id} className="lwg__title" data-rk-c72122="">{title}</h2>
          <ul className="lwg__grid" data-rk-c72122="">
            {logos.map((l, i) => {
              const inner = l.src
                ? <img src={l.src} alt={l.name} loading="lazy" decoding="async" data-rk-c72122="" />
                : (
                  <span className="lwg__word" data-rk-c72122="">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: glyphs[i % glyphs.length] }} data-rk-c72122=""></svg>
                    {l.name}
                  </span>
                );
              return (
                <li className="lwg__cell" data-rk-c72122="">
                  {l.href ? <a href={l.href} className="lwg__link" data-rk-c72122="">{inner}</a> : inner}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      </div>
    </>
  );
}

export default LogoWallGrid;
