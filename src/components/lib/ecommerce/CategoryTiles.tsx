'use client';

import type { CSSProperties } from 'react';
import ProductMedia from './ProductMedia';
import type { StoreCategory } from './types';
import './CategoryTiles.css';

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

type Tile = StoreCategory & { href: string; count?: number };

/**
 * CategoryTiles — Grid of shop categories with illustration, item count and arrow link.
 *
 * @param {string} title - Section heading (optional). Default 'Shop by category'.
 * @param {string} subtitle - Supporting copy (optional).
 * @param {Array<StoreCategory & { href: string, count?: number }>} categories - Tiles to show.
 * @param {number} columns - Desktop columns (2–6). Default 4.
 * @param {string} variant - Tile style (glass|image|minimal). Default 'glass'.
 * @param {string} size - Tile height (sm|md|lg). Default 'md'.
 * @param {string} countLabel - Suffix after the count. Default 'products'.
 * @param {string} className - Extra class.
 *
 * Accessibility: each tile is a single link with a visible name; art is decorative.
 */
export interface CategoryTilesProps {
  title?: string;
  subtitle?: string;
  categories?: Tile[];
  columns?: number;
  variant?: 'glass' | 'image' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  countLabel?: string;
  className?: string;
}

export function CategoryTiles({
  title = 'Shop by category',
  subtitle,
  categories = [
    { id: 'audio', name: 'Audio', href: '#', count: 18, icon: 'headphones', hue: 38 },
    { id: 'wearables', name: 'Wearables', href: '#', count: 12, icon: 'watch', hue: 200 },
    { id: 'bags', name: 'Bags', href: '#', count: 9, icon: 'backpack', hue: 150 },
    { id: 'home', name: 'Home', href: '#', count: 24, icon: 'lamp', hue: 20 },
  ],
  columns = 4,
  variant = 'glass',
  size = 'md',
  countLabel = 'products',
  className = '',
}: CategoryTilesProps) {
  const cols = Math.min(6, Math.max(2, columns));
  return (
    <>
      <section className={cx(['cat-tiles', `cat-tiles--${variant}`, `cat-tiles--${size}`, className])} style={st(`--ct-cols: ${cols}`)} data-rk-00c0aa="">
        {(title || subtitle) && (
          <header className="cat-tiles__head" data-rk-00c0aa="">
            {title && <h2 className="cat-tiles__title" data-rk-00c0aa="">{title}</h2>}
            {subtitle && <p className="cat-tiles__subtitle" data-rk-00c0aa="">{subtitle}</p>}
          </header>
        )}
        <ul className="cat-tiles__grid" data-rk-00c0aa="">
          {categories.map((c, __i: number) => (
            <li key={__i} data-rk-00c0aa="">
              <a className="cat-tile is-hoverable" href={c.href} data-rk-00c0aa="">
                <ProductMedia icon={c.icon} hue={c.hue} ratio="auto" size="sm" variant={variant === 'minimal' ? 'flat' : 'glow'} className="cat-tile__media" />
                <span className="cat-tile__text" data-rk-00c0aa="">
                  <span className="cat-tile__name" data-rk-00c0aa="">{c.name}</span>
                  {c.count !== undefined && <span className="cat-tile__count" data-rk-00c0aa="">{c.count} {countLabel}</span>}
                </span>
                <span className="cat-tile__arrow" aria-hidden="true" data-rk-00c0aa="">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" data-rk-00c0aa=""><path d="M7 17 17 7M8 7h9v9" data-rk-00c0aa="" /></svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default CategoryTiles;
