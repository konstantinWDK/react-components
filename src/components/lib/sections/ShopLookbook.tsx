'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import ProductMedia from '../ecommerce/ProductMedia';
import { formatMoney } from '../ecommerce/cart-store';
import type { Product } from '../ecommerce/types';
import { bindAddToCart } from '../ecommerce/cart-store';
import './ShopLookbook.css';

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

interface Spot { x: number; y: number; product: Product; href?: string }

/**
 * ShopLookbook — "Shop the look": a large editorial image with numbered hotspots. Each hotspot
 * opens a small product card (name, price, link and add to bag) and highlights it in the side list.
 *
 * @param {string} eyebrow - Small label. Default 'Lookbook'.
 * @param {string} title - Heading (use *asterisks* for italics). Default 'Shop the *look*'.
 * @param {string} text - Intro copy.
 * @param {{icon?: string, hue?: number, image?: string, alt?: string}} media - Scene visual.
 * @param {Array<{x: number, y: number, product: Product, href?: string}>} spots - Hotspots; x/y in % of the image.
 * @param {string} currency - ISO currency. Default 'EUR'.
 * @param {string} locale - Number format locale. Default 'en-GB'.
 * @param {string} cartKey - Cart storage key. Default 'ack-cart'.
 * @param {string} variant - Layout (image-left|image-right). Default 'image-left'.
 * @param {string} id - Base id. Default 'lookbook'.
 * @param {string} className - Extra class.
 *
 * Accessibility: hotspots are buttons with full labels and aria-expanded; the same products are
 * listed as plain links next to the image, so the look is usable without the hotspots.
 */
export interface ShopLookbookProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  media?: { icon?: string; hue?: number; image?: string; alt?: string };
  spots?: Spot[];
  currency?: string;
  locale?: string;
  cartKey?: string;
  variant?: 'image-left' | 'image-right';
  id?: string;
  className?: string;
}

export function ShopLookbook({
  eyebrow = 'Lookbook',
  title = 'Shop the *look*',
  text = 'A Sunday uniform: a soft overshirt, a tote that goes everywhere and the mug that starts the day.',
  media = { icon: 'jacket', hue: 22 },
  spots = [
    { x: 38, y: 34, product: { slug: 'linen-overshirt', name: 'Linen Overshirt', price: 145, category: 'clothing', icon: 'shirt', hue: 30 } },
    { x: 66, y: 62, product: { slug: 'field-tote', name: 'Field Tote', price: 120, category: 'bags', icon: 'bag', hue: 18 } },
    { x: 24, y: 76, product: { slug: 'kiln-mug', name: 'Kiln Mug', price: 32, category: 'objects', icon: 'mug', hue: 14 } },
  ],
  currency = 'EUR',
  locale = 'en-GB',
  cartKey = 'ack-cart',
  variant = 'image-left',
  id = 'lookbook',
  className = '',
}: ShopLookbookProps) {
  const money = { currency, locale };
  const parts = title.split(/\*(.+?)\*/g);
  const total = spots.reduce((n, s) => n + s.product.price, 0);

  // Client-side behaviour: runs once after mount.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    bindAddToCart(document);
    
      document.querySelectorAll<HTMLElement>('[data-lookbook]:not([data-bound])').forEach((lb) => {
        lb.dataset.bound = '';
        const dots = Array.from(lb.querySelectorAll<HTMLButtonElement>('[data-spot]'));
        const rows = Array.from(lb.querySelectorAll<HTMLElement>('[data-row]'));
        const close = () => {
          dots.forEach((d) => {
            d.setAttribute('aria-expanded', 'false');
            const p = document.getElementById(d.getAttribute('aria-controls') || '');
            if (p) p.hidden = true;
          });
          rows.forEach((r) => r.classList.remove('is-active'));
        };
        dots.forEach((d, i) => {
          d.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = d.getAttribute('aria-expanded') !== 'true';
            close();
            if (!open) return;
            d.setAttribute('aria-expanded', 'true');
            const p = document.getElementById(d.getAttribute('aria-controls') || '');
            if (p) p.hidden = false;
            rows[i]?.classList.add('is-active');
          });
          rows[i]?.addEventListener('mouseenter', () => d.classList.add('is-hint'));
          rows[i]?.addEventListener('mouseleave', () => d.classList.remove('is-hint'));
        });
        document.addEventListener('click', (e) => { if (!lb.contains(e.target as Node)) close(); });
        lb.addEventListener('keydown', (e) => {
          if (e.key !== 'Escape') return;
          const open = dots.find((d) => d.getAttribute('aria-expanded') === 'true');
          close();
          open?.focus();
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="slb-cq" data-rk-e29b78="">
      <section className={cx(['slb', `slb--${variant}`, className])} data-lookbook data-rk-e29b78="">
        <div className="slb__stage" data-rk-e29b78="">
          <ProductMedia image={media.image} alt={media.alt ?? ''} icon={media.icon} hue={media.hue} ratio="4 / 5" variant="soft" size="lg" />
          {spots.map((s, i) => (
            <div key={i} className="slb__spot" style={st(`left: ${s.x}%; top: ${s.y}%`)} data-rk-e29b78="">
              <button type="button" className="slb__dot" aria-expanded="false" aria-controls={`${id}-pop-${i}`} aria-label={`${i + 1}: ${s.product.name}, ${formatMoney(s.product.price, money)}`} data-spot={i} data-rk-e29b78="">{i + 1}</button>
              <div className={cx(['slb__pop', { 'slb__pop--left': s.x > 60 }])} id={`${id}-pop-${i}`} hidden data-pop data-rk-e29b78="">
                <p className="slb__pop-name" data-rk-e29b78="">{s.product.name}</p>
                <p className="slb__pop-price" data-rk-e29b78="">{formatMoney(s.product.price, money)}</p>
                <div className="slb__pop-actions" data-rk-e29b78="">
                  <a href={s.href ?? '#'} data-rk-e29b78="">View</a>
                  <button type="button" data-add-to-cart={JSON.stringify({ id: s.product.slug, name: s.product.name, price: s.product.price, icon: s.product.icon, hue: s.product.hue, variant: s.product.colors?.[0]?.name })} data-cart-key={cartKey} data-open-cart="false" data-added-label="Added" data-rk-e29b78=""><span data-label data-rk-e29b78="">Add to bag</span></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      
        <div className="slb__copy" data-rk-e29b78="">
          {eyebrow && <p className="slb__eyebrow" data-rk-e29b78="">{eyebrow}</p>}
          <h2 className="slb__title" data-rk-e29b78="">{parts.map((p, i) => (i % 2 ? <em data-rk-e29b78="">{p}</em> : p))}</h2>
          {text && <p className="slb__text" data-rk-e29b78="">{text}</p>}
          <ol className="slb__list" data-rk-e29b78="">
            {spots.map((s, i) => (
              <li key={i} className="slb__row" data-row={i} data-rk-e29b78="">
                <span className="slb__row-num" aria-hidden="true" data-rk-e29b78="">{String(i + 1).padStart(2, '0')}</span>
                <a className="slb__row-name" href={s.href ?? '#'} data-rk-e29b78="">{s.product.name}</a>
                <span className="slb__row-price" data-rk-e29b78="">{formatMoney(s.product.price, money)}</span>
              </li>
            ))}
          </ol>
          <p className="slb__total" data-rk-e29b78=""><span data-rk-e29b78="">The complete look</span><strong data-rk-e29b78="">{formatMoney(total, money)}</strong></p>
        </div>
      </section>
      </div>
    </>
  );
}

export default ShopLookbook;
