'use client';

import ProductMedia from './ProductMedia';
import ProductRating from './ProductRating';
import { formatMoney } from './cart-store';
import type { Product } from './types';
import './StoreHero.css';

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

interface Cta { label: string; href: string }

/**
 * StoreHero — Shop landing hero: headline, CTAs, quick stats and a featured product
 * stage with floating price and rating chips.
 *
 * @param {string} eyebrow - Small label above the title. Default 'New season · 2026'.
 * @param {string} title - Headline. Default 'Gear that feels'.
 * @param {string} highlight - Gradient part of the headline. Default 'made for you'.
 * @param {string} subtitle - Supporting copy.
 * @param {{label: string, href: string}} primary - Main CTA.
 * @param {{label: string, href: string}} secondary - Secondary CTA (optional).
 * @param {Array<{value: string, label: string}>} stats - Proof points below the CTAs.
 * @param {Product} product - Featured product shown on the stage.
 * @param {string} productHref - Featured product link.
 * @param {string} currency - ISO currency. Default 'USD'.
 * @param {string} locale - Number format locale. Default 'en-US'.
 * @param {string} variant - Layout (split|centered). Default 'split'.
 * @param {string} size - Vertical rhythm (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: one h1; decorative stage art is aria-hidden; the featured product is a real link.
 */
export interface StoreHeroProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primary?: Cta;
  secondary?: Cta;
  stats?: Array<{ value: string; label: string }>;
  product?: Product;
  productHref?: string;
  currency?: string;
  locale?: string;
  variant?: 'split' | 'centered';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StoreHero({
  eyebrow = 'New season · 2026',
  title = 'Gear that feels',
  highlight = 'made for you',
  subtitle = 'Thoughtfully designed audio, wearables and everyday carry. Free shipping over $75 and 30-day returns on everything.',
  primary = { label: 'Shop the collection', href: '#' },
  secondary = { label: 'Explore new arrivals', href: '#' },
  stats = [
    { value: '4.9/5', label: 'from 12k reviews' },
    { value: '48h', label: 'average delivery' },
    { value: '30 days', label: 'free returns' },
  ],
  product = { slug: 'aurora-headphones', name: 'Aurora Wireless Headphones', price: 189, compareAt: 229, category: 'audio', rating: 4.8, reviews: 312, icon: 'headphones', hue: 38 },
  productHref = '#',
  currency = 'USD',
  locale = 'en-US',
  variant = 'split',
  size = 'md',
  className = '',
}: StoreHeroProps) {
  const money = { currency, locale };
  return (
    <>
      <section className={cx(['store-hero', `store-hero--${variant}`, `store-hero--${size}`, className])} data-rk-92f260="">
        <div className="store-hero__glow" aria-hidden="true" data-rk-92f260=""></div>
        <div className="store-hero__inner" data-rk-92f260="">
          <div className="store-hero__copy" data-rk-92f260="">
            {eyebrow && <p className="store-hero__eyebrow" data-rk-92f260=""><span aria-hidden="true" data-rk-92f260=""></span>{eyebrow}</p>}
            <h1 className="store-hero__title" data-rk-92f260="">{title} <em data-rk-92f260="">{highlight}</em></h1>
            {subtitle && <p className="store-hero__subtitle" data-rk-92f260="">{subtitle}</p>}
            <div className="store-hero__ctas" data-rk-92f260="">
              {primary && (
                <a className="store-hero__btn store-hero__btn--primary" href={primary.href} data-rk-92f260="">
                  {primary.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-rk-92f260=""><path d="M5 12h14M13 6l6 6-6 6" data-rk-92f260="" /></svg>
                </a>
              )}
              {secondary && <a className="store-hero__btn store-hero__btn--ghost" href={secondary.href} data-rk-92f260="">{secondary.label}</a>}
            </div>
            {stats.length > 0 && (
              <dl className="store-hero__stats" data-rk-92f260="">
                {stats.map((s, __i: number) => (
                  <div key={__i} data-rk-92f260=""><dt data-rk-92f260="">{s.label}</dt><dd data-rk-92f260="">{s.value}</dd></div>
                ))}
              </dl>
            )}
          </div>
      
          {product && (
            <div className="store-hero__stage" data-rk-92f260="">
              <div className="store-hero__ring" aria-hidden="true" data-rk-92f260=""></div>
              <a className="store-hero__product" href={productHref} data-rk-92f260="">
                <ProductMedia image={product.image} alt={product.name} icon={product.icon} hue={product.hue} size="lg" ratio="4 / 5" />
                <span className="store-hero__chip store-hero__chip--price" data-rk-92f260="">
                  <small data-rk-92f260="">{product.name}</small>
                  <strong data-rk-92f260="">{formatMoney(product.price, money)}</strong>
                  {product.compareAt && <s data-rk-92f260=""><span className="sr-only" data-rk-92f260="">Was </span>{formatMoney(product.compareAt, money)}</s>}
                </span>
                {product.rating !== undefined && (
                  <span className="store-hero__chip store-hero__chip--rating" data-rk-92f260="">
                    <ProductRating value={product.rating} count={product.reviews} />
                  </span>
                )}
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default StoreHero;
