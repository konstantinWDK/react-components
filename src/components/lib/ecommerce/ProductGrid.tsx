'use client';

import type { CSSProperties } from 'react';
import StoreProductCard from './StoreProductCard';
import type { Product } from './types';
import './ProductGrid.css';

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
 * ProductGrid — Responsive grid of StoreProductCard tiles with an empty state.
 * Works on its own or as the target of FilterSidebar / ProductToolbar (same `id`).
 *
 * @param {Product[]} products - Products to render.
 * @param {string} id - Grid id; FilterSidebar and ProductToolbar point at it. Default 'product-grid'.
 * @param {string} productBase - Product URL prefix; links become `${productBase}${slug}/`. Default '#'.
 * @param {Record<string, string>} categoryNames - Category id → label for the card eyebrow.
 * @param {number} columns - Desktop columns (2–5). Default 4.
 * @param {string} cardVariant - StoreProductCard variant (glass|minimal|bordered). Default 'glass'.
 * @param {string} cardSize - StoreProductCard size (sm|md|lg). Default 'md'.
 * @param {string} currency - ISO currency. Default 'USD'.
 * @param {string} locale - Number format locale. Default 'en-US'.
 * @param {string} cartKey - Cart storage key. Default 'ack-cart'.
 * @param {boolean} openCart - Open the drawer after adding (false = toast). Default true.
 * @param {string} emptyTitle - Empty state heading. Default 'No products match'.
 * @param {string} emptyText - Empty state copy.
 * @param {string} className - Extra class.
 *
 * Accessibility: cards keep their own headings; the empty state is a polite status message.
 */
export interface ProductGridProps {
  products?: Product[];
  id?: string;
  productBase?: string;
  categoryNames?: Record<string, string>;
  columns?: number;
  cardVariant?: 'glass' | 'minimal' | 'bordered';
  cardSize?: 'sm' | 'md' | 'lg';
  currency?: string;
  locale?: string;
  cartKey?: string;
  openCart?: boolean;
  emptyTitle?: string;
  emptyText?: string;
  className?: string;
}

export function ProductGrid({
  products = [
    { slug: 'aurora-headphones', name: 'Aurora Wireless Headphones', price: 189, compareAt: 229, category: 'audio', rating: 4.8, reviews: 312, badge: '-18%', badgeVariant: 'warning', icon: 'headphones', hue: 38 },
    { slug: 'orbit-watch', name: 'Orbit Smart Watch', price: 249, category: 'wearables', rating: 4.6, reviews: 198, badge: 'New', badgeVariant: 'info', icon: 'watch', hue: 205 },
    { slug: 'trail-backpack', name: 'Trail 24L Backpack', price: 119, category: 'bags', rating: 4.7, reviews: 87, icon: 'backpack', hue: 150 },
    { slug: 'halo-lamp', name: 'Halo Desk Lamp', price: 79, category: 'home', rating: 4.5, reviews: 54, icon: 'lamp', hue: 25 },
  ],
  id = 'product-grid',
  productBase = '#',
  categoryNames = { audio: 'Audio', wearables: 'Wearables', bags: 'Bags', home: 'Home' },
  columns = 4,
  cardVariant = 'glass',
  cardSize = 'md',
  currency = 'USD',
  locale = 'en-US',
  cartKey = 'ack-cart',
  openCart = true,
  emptyTitle = 'No products match',
  emptyText = 'Try removing a filter or widening the price range.',
  className = '',
}: ProductGridProps) {
  const cols = Math.min(5, Math.max(2, columns));
  const hrefFor = (slug: string) => (productBase === '#' ? '#' : `${productBase}${slug}/`);
  return (
    <>
      <div className={cx(['p-grid-wrap', className])} data-rk-b3bd9c="">
        <div className="p-grid" id={id} style={st(`--pg-cols: ${cols}`)} data-product-list data-rk-b3bd9c="">
          {products.map((p, i) => (
            <StoreProductCard key={i} product={p} href={hrefFor(p.slug)} categoryLabel={categoryNames[p.category] ?? ''} variant={cardVariant} size={cardSize} currency={currency} locale={locale} cartKey={cartKey} openCart={openCart} />
          ))}
        </div>
        <div className="p-grid__empty" role="status" data-product-empty hidden data-rk-b3bd9c="">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" data-rk-b3bd9c=""><circle cx="11" cy="11" r="7" data-rk-b3bd9c="" /><path d="m20 20-3.5-3.5M8 11h6" data-rk-b3bd9c="" /></svg>
          <p data-rk-b3bd9c=""><strong data-rk-b3bd9c="">{emptyTitle}</strong></p>
          <p data-rk-b3bd9c="">{emptyText}</p>
        </div>
      </div>
    </>
  );
}

export default ProductGrid;
