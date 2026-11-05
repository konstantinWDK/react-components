'use client';

import { useEffect, useRef } from 'react';
import ProductCardMinimal from '../ecommerce/ProductCardMinimal';
import type { Product } from '../ecommerce/types';
import './ShopProductRail.css';

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

/**
 * ShopProductRail — Horizontal, scroll-snapping product carousel of ProductCardMinimal cards with
 * numbered items, prev/next buttons and a progress line.
 *
 * @param {string} eyebrow - Small label. Default 'Just in'.
 * @param {string} title - Heading. Default 'New this *week*'.
 * @param {Product[]} products - Products to show.
 * @param {string} productBase - Product URL prefix (`${productBase}${slug}/`). Default '#'.
 * @param {{label: string, href: string}} link - "View all" link (optional).
 * @param {boolean} numbered - Show "N° 01" on cards. Default true.
 * @param {string} currency - ISO currency. Default 'EUR'.
 * @param {string} locale - Number format locale. Default 'en-GB'.
 * @param {string} cartKey - Cart storage key. Default 'ack-cart'.
 * @param {string} id - Rail id (unique per page). Default 'product-rail'.
 * @param {string} size - Card width (sm|md|lg). Default 'md'.
 * @param {string} className - Extra class.
 *
 * Accessibility: the rail is a labelled region (role="region") scrollable with keyboard;
 * buttons have labels and disable at the ends; snapping is disabled with reduced motion.
 */
export interface ShopProductRailProps {
  eyebrow?: string;
  title?: string;
  products?: Product[];
  productBase?: string;
  link?: { label: string; href: string };
  numbered?: boolean;
  currency?: string;
  locale?: string;
  cartKey?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ShopProductRail({
  eyebrow = 'Just in',
  title = 'New this *week*',
  products = [
    { slug: 'linen-overshirt', name: 'Linen Overshirt', price: 145, category: 'clothing', badge: 'New', sizes: ['S', 'M', 'L'], colors: [{ name: 'Oat', hex: '#d9cbb3' }, { name: 'Ink', hex: '#22252b' }], icon: 'shirt', hue: 30 },
    { slug: 'merino-crew', name: 'Merino Crew Knit', price: 160, category: 'clothing', sizes: ['S', 'M', 'L'], colors: [{ name: 'Sage', hex: '#8a9a7b' }], icon: 'jacket', hue: 95 },
    { slug: 'field-tote', name: 'Field Tote', price: 120, category: 'bags', colors: [{ name: 'Rust', hex: '#9c3d1c' }], icon: 'bag', hue: 18 },
    { slug: 'ash-vase', name: 'Ash Vase', price: 68, category: 'objects', icon: 'bottle', hue: 40 },
    { slug: 'dune-loafer', name: 'Dune Loafer', price: 210, category: 'shoes', sizes: ['39', '40', '41', '42'], icon: 'sneaker', hue: 28 },
  ],
  productBase = '#',
  link = { label: 'View all', href: '#' },
  numbered = true,
  currency = 'EUR',
  locale = 'en-GB',
  cartKey = 'ack-cart',
  id = 'product-rail',
  size = 'md',
  className = '',
}: ShopProductRailProps) {
  const parts = title.split(/\*(.+?)\*/g);
  const plainTitle = title.replace(/\*/g, '');
  const hrefFor = (slug: string) => (productBase === '#' ? '#' : `${productBase}${slug}/`);

  // Ported from the Astro <script>: runs once after mount (DOM logic kept as in the Astro kit).
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    document.querySelectorAll<HTMLElement>('[data-rail]:not([data-bound])').forEach((rail) => {
        rail.dataset.bound = '';
        const track = rail.querySelector<HTMLElement>('[data-track]')!;
        const prev = rail.querySelector<HTMLButtonElement>('[data-prev]')!;
        const next = rail.querySelector<HTMLButtonElement>('[data-next]')!;
        const bar = rail.querySelector<HTMLElement>('[data-progress]')!;
        const step = () => (track.querySelector<HTMLElement>('.spr__slide')?.offsetWidth ?? 300) + 16;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const update = () => {
          const max = track.scrollWidth - track.clientWidth;
          prev.disabled = track.scrollLeft <= 2;
          next.disabled = track.scrollLeft >= max - 2;
          const visible = track.clientWidth / track.scrollWidth;
          bar.style.width = `${Math.max(10, visible * 100)}%`;
          bar.style.transform = `translateX(${max > 0 ? (track.scrollLeft / max) * ((1 / Math.max(visible, 0.1)) - 1) * 100 : 0}%)`;
        };
        prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }));
        next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' }));
        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={cx(['spr', `spr--${size}`, className])} data-rail data-rk-14294a="">
        <header className="spr__head" data-rk-14294a="">
          <div data-rk-14294a="">
            {eyebrow && <p className="spr__eyebrow" data-rk-14294a="">{eyebrow}</p>}
            <h2 className="spr__title" data-rk-14294a="">{parts.map((p, i) => (i % 2 ? <em data-rk-14294a="">{p}</em> : p))}</h2>
          </div>
          <div className="spr__controls" data-rk-14294a="">
            {link && <a className="spr__all" href={link.href} data-rk-14294a="">{link.label}</a>}
            <button type="button" className="spr__arrow" aria-label="Previous products" aria-controls={id} data-prev data-rk-14294a="">←</button>
            <button type="button" className="spr__arrow" aria-label="Next products" aria-controls={id} data-next data-rk-14294a="">→</button>
          </div>
        </header>
        <ul className="spr__track" id={id} role="region" aria-label={plainTitle} tabIndex={0} data-track data-rk-14294a="">
          {products.map((p, i) => (
            <li key={i} className="spr__slide" data-rk-14294a="">
              <ProductCardMinimal product={p} href={hrefFor(p.slug)} index={numbered ? i + 1 : undefined} currency={currency} locale={locale} cartKey={cartKey} />
            </li>
          ))}
        </ul>
        <div className="spr__progress" aria-hidden="true" data-rk-14294a=""><span data-progress data-rk-14294a=""></span></div>
      </section>
    </>
  );
}

export default ShopProductRail;
